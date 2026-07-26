package info.dandreart.mairgo;

import android.app.Activity;
import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.DocumentsContract;
import android.provider.OpenableColumns;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.charset.StandardCharsets;

@CapacitorPlugin(name = "MairBackup")
public class MairBackupPlugin extends Plugin {

    @PluginMethod
    public void saveBackup(PluginCall call) {
        String sourceUri = call.getString("sourceUri");
        String fileName = call.getString("fileName", "Backup_MAIR_GO.backup");
        if (sourceUri == null || sourceUri.isEmpty()) { call.reject("File temporaneo mancante"); return; }
        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, fileName);
        startActivityForResult(call, intent, "saveBackupResult");
    }

    @ActivityCallback
    private void saveBackupResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            JSObject ret = new JSObject(); ret.put("cancelled", true); call.resolve(ret); return;
        }
        Uri destination = result.getData().getData();
        String sourceUri = call.getString("sourceUri");
        try (InputStream in = openSource(sourceUri); OutputStream out = getContext().getContentResolver().openOutputStream(destination, "w")) {
            if (in == null || out == null) throw new Exception("Impossibile aprire il file");
            copy(in, out);
            JSObject ret = new JSObject(); ret.put("cancelled", false); ret.put("uri", destination.toString()); call.resolve(ret);
        } catch (Exception e) { call.reject("Salvataggio non riuscito: " + e.getMessage(), e); }
    }

    @PluginMethod
    public void saveBackupFolder(PluginCall call) {
        JSArray files = call.getArray("files");
        if (files == null || files.length() == 0) { call.reject("Nessun file da esportare"); return; }
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        startActivityForResult(call, intent, "saveBackupFolderResult");
    }

    @ActivityCallback
    private void saveBackupFolderResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            JSObject ret = new JSObject(); ret.put("cancelled", true); call.resolve(ret); return;
        }
        Uri treeUri = result.getData().getData();
        persistPermission(treeUri);
        try {
            String folderName = safeName(call.getString("folderName", "MAIR_GO_Backup"));
            Uri parentDoc = DocumentsContract.buildDocumentUriUsingTree(treeUri, DocumentsContract.getTreeDocumentId(treeUri));
            Uri folderUri = DocumentsContract.createDocument(getContext().getContentResolver(), parentDoc,
                    DocumentsContract.Document.MIME_TYPE_DIR, folderName);
            if (folderUri == null) throw new Exception("Impossibile creare la cartella scelta");
            JSArray files = call.getArray("files");
            for (int i = 0; i < files.length(); i++) {
                JSONObject item = files.getJSONObject(i);
                String name = safeName(item.optString("name", "parte_" + (i + 1) + ".mairpart"));
                String sourceUri = item.optString("uri", "");
                if (sourceUri.isEmpty()) throw new Exception("Origine mancante per " + name);
                String mime = name.endsWith(".mairindex") ? "application/json" : "application/octet-stream";
                Uri outUri = DocumentsContract.createDocument(getContext().getContentResolver(), folderUri, mime, name);
                if (outUri == null) throw new Exception("Impossibile creare " + name);
                try (InputStream in = openSource(sourceUri); OutputStream out = getContext().getContentResolver().openOutputStream(outUri, "w")) {
                    if (in == null || out == null) throw new Exception("Impossibile copiare " + name);
                    copy(in, out);
                }
            }
            JSObject ret = new JSObject(); ret.put("cancelled", false); ret.put("folderUri", folderUri.toString()); call.resolve(ret);
        } catch (Exception e) { call.reject("Esportazione cartella non riuscita: " + e.getMessage(), e); }
    }

    // Seleziona direttamente la cartella completa del backup. Evita il limite del picker HTML,
    // che su Android spesso non mostra o non seleziona manifest.mairindex insieme alle parti.
    @PluginMethod
    public void openBackupFolder(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_PERSISTABLE_URI_PERMISSION);
        startActivityForResult(call, intent, "openBackupFolderResult");
    }

    @ActivityCallback
    private void openBackupFolderResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            JSObject ret = new JSObject(); ret.put("cancelled", true); call.resolve(ret); return;
        }
        Uri treeUri = result.getData().getData();
        persistPermission(treeUri);
        try {
            JSArray names = listChildFileNames(treeUri);
            JSObject ret = new JSObject();
            ret.put("cancelled", false);
            ret.put("folderUri", treeUri.toString());
            ret.put("files", names);
            call.resolve(ret);
        } catch (Exception e) { call.reject("Lettura cartella non riuscita: " + e.getMessage(), e); }
    }

    // Legge una sola parte alla volta: con archivi da 1000 opere non carica l'intero backup in RAM.
    @PluginMethod
    public void readBackupPart(PluginCall call) {
        String folderUriText = call.getString("folderUri");
        String name = call.getString("name");
        if (folderUriText == null || name == null) { call.reject("Cartella o nome file mancante"); return; }
        try {
            Uri treeUri = Uri.parse(folderUriText);
            Uri fileUri = findChildByName(treeUri, name);
            if (fileUri == null) throw new Exception("File non trovato: " + name);
            try (InputStream in = getContext().getContentResolver().openInputStream(fileUri);
                 ByteArrayOutputStream out = new ByteArrayOutputStream()) {
                if (in == null) throw new Exception("Impossibile leggere " + name);
                copy(in, out);
                JSObject ret = new JSObject();
                ret.put("name", name);
                ret.put("text", out.toString(StandardCharsets.UTF_8.name()));
                call.resolve(ret);
            }
        } catch (Exception e) { call.reject("Lettura parte non riuscita: " + e.getMessage(), e); }
    }

    @PluginMethod
    public void openBackup(PluginCall call) {
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("*/*");
        intent.putExtra(Intent.EXTRA_MIME_TYPES, new String[]{"application/json", "application/octet-stream", "text/plain"});
        startActivityForResult(call, intent, "openBackupResult");
    }

    @ActivityCallback
    private void openBackupResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            JSObject ret = new JSObject(); ret.put("cancelled", true); call.resolve(ret); return;
        }
        Uri source = result.getData().getData();
        String originalName = queryName(source);
        String cacheName = "mair-import-" + System.currentTimeMillis() + ".backup";
        File destination = new File(getContext().getCacheDir(), cacheName);
        try (InputStream in = getContext().getContentResolver().openInputStream(source); OutputStream out = new FileOutputStream(destination)) {
            if (in == null) throw new Exception("Impossibile leggere il file scelto");
            copy(in, out);
            JSObject ret = new JSObject(); ret.put("cancelled", false); ret.put("cacheName", cacheName); ret.put("originalName", originalName == null ? "backup" : originalName); call.resolve(ret);
        } catch (Exception e) { call.reject("Apertura non riuscita: " + e.getMessage(), e); }
    }

    private JSArray listChildFileNames(Uri treeUri) throws Exception {
        JSArray names = new JSArray();
        Uri childrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(treeUri, DocumentsContract.getTreeDocumentId(treeUri));
        String[] projection = {DocumentsContract.Document.COLUMN_DISPLAY_NAME, DocumentsContract.Document.COLUMN_MIME_TYPE};
        try (Cursor cursor = getContext().getContentResolver().query(childrenUri, projection, null, null, null)) {
            if (cursor == null) throw new Exception("Impossibile aprire la cartella");
            int nameCol = cursor.getColumnIndex(DocumentsContract.Document.COLUMN_DISPLAY_NAME);
            int mimeCol = cursor.getColumnIndex(DocumentsContract.Document.COLUMN_MIME_TYPE);
            while (cursor.moveToNext()) {
                String mime = mimeCol >= 0 ? cursor.getString(mimeCol) : "";
                if (!DocumentsContract.Document.MIME_TYPE_DIR.equals(mime) && nameCol >= 0) names.put(cursor.getString(nameCol));
            }
        }
        return names;
    }

    private Uri findChildByName(Uri treeUri, String wantedName) throws Exception {
        Uri childrenUri = DocumentsContract.buildChildDocumentsUriUsingTree(treeUri, DocumentsContract.getTreeDocumentId(treeUri));
        String[] projection = {DocumentsContract.Document.COLUMN_DOCUMENT_ID, DocumentsContract.Document.COLUMN_DISPLAY_NAME};
        try (Cursor cursor = getContext().getContentResolver().query(childrenUri, projection, null, null, null)) {
            if (cursor == null) return null;
            int idCol = cursor.getColumnIndex(DocumentsContract.Document.COLUMN_DOCUMENT_ID);
            int nameCol = cursor.getColumnIndex(DocumentsContract.Document.COLUMN_DISPLAY_NAME);
            while (cursor.moveToNext()) {
                String display = nameCol >= 0 ? cursor.getString(nameCol) : "";
                if (wantedName.equalsIgnoreCase(display)) {
                    String documentId = cursor.getString(idCol);
                    return DocumentsContract.buildDocumentUriUsingTree(treeUri, documentId);
                }
            }
        }
        return null;
    }

    private void persistPermission(Uri treeUri) {
        try { getContext().getContentResolver().takePersistableUriPermission(treeUri, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION); }
        catch (Exception ignored) {}
    }

    private InputStream openSource(String value) throws Exception {
        Uri uri = Uri.parse(value);
        if ("content".equalsIgnoreCase(uri.getScheme())) return getContext().getContentResolver().openInputStream(uri);
        if ("file".equalsIgnoreCase(uri.getScheme())) return new FileInputStream(new File(uri.getPath()));
        return new FileInputStream(new File(value));
    }

    private String queryName(Uri uri) {
        try (Cursor cursor = getContext().getContentResolver().query(uri, null, null, null, null)) {
            if (cursor != null && cursor.moveToFirst()) { int index = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME); if (index >= 0) return cursor.getString(index); }
        } catch (Exception ignored) {}
        return null;
    }

    private String safeName(String value) { return value == null ? "file" : value.replaceAll("[\\\\/:*?\"<>|]", "_"); }
    private void copy(InputStream in, OutputStream out) throws Exception {
        byte[] buffer = new byte[64 * 1024]; int count;
        while ((count = in.read(buffer)) != -1) out.write(buffer, 0, count);
        out.flush();
    }
}
