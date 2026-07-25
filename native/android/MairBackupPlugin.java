package info.dandreart.mairgo;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.provider.OpenableColumns;

import androidx.activity.result.ActivityResult;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.ActivityCallback;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

@CapacitorPlugin(name = "MairBackup")
public class MairBackupPlugin extends Plugin {

    @PluginMethod
    public void saveBackup(PluginCall call) {
        String sourceUri = call.getString("sourceUri");
        String fileName = call.getString("fileName", "Backup_MAIR_GO.backup");
        if (sourceUri == null || sourceUri.isEmpty()) {
            call.reject("File temporaneo mancante");
            return;
        }

        Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.setType("application/json");
        intent.putExtra(Intent.EXTRA_TITLE, fileName);
        intent.putExtra("sourceUri", sourceUri);
        startActivityForResult(call, intent, "saveBackupResult");
    }

    @ActivityCallback
    private void saveBackupResult(PluginCall call, ActivityResult result) {
        if (call == null) return;
        if (result.getResultCode() != Activity.RESULT_OK || result.getData() == null || result.getData().getData() == null) {
            JSObject ret = new JSObject();
            ret.put("cancelled", true);
            call.resolve(ret);
            return;
        }

        Uri destination = result.getData().getData();
        String sourceUri = call.getString("sourceUri");
        try (InputStream in = openSource(sourceUri);
             OutputStream out = getContext().getContentResolver().openOutputStream(destination, "w")) {
            if (in == null || out == null) throw new Exception("Impossibile aprire il file");
            copy(in, out);
            JSObject ret = new JSObject();
            ret.put("cancelled", false);
            ret.put("uri", destination.toString());
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Salvataggio non riuscito: " + e.getMessage(), e);
        }
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
            JSObject ret = new JSObject();
            ret.put("cancelled", true);
            call.resolve(ret);
            return;
        }

        Uri source = result.getData().getData();
        String originalName = queryName(source);
        String cacheName = "mair-import-" + System.currentTimeMillis() + ".backup";
        File destination = new File(getContext().getCacheDir(), cacheName);
        try (InputStream in = getContext().getContentResolver().openInputStream(source);
             OutputStream out = new FileOutputStream(destination)) {
            if (in == null) throw new Exception("Impossibile leggere il file scelto");
            copy(in, out);
            JSObject ret = new JSObject();
            ret.put("cancelled", false);
            ret.put("cacheName", cacheName);
            ret.put("originalName", originalName == null ? "backup" : originalName);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Apertura non riuscita: " + e.getMessage(), e);
        }
    }

    private InputStream openSource(String value) throws Exception {
        Uri uri = Uri.parse(value);
        if ("content".equalsIgnoreCase(uri.getScheme())) {
            return getContext().getContentResolver().openInputStream(uri);
        }
        if ("file".equalsIgnoreCase(uri.getScheme())) {
            return new FileInputStream(new File(uri.getPath()));
        }
        return new FileInputStream(new File(value));
    }

    private String queryName(Uri uri) {
        try (android.database.Cursor cursor = getContext().getContentResolver().query(uri, null, null, null, null)) {
            if (cursor != null && cursor.moveToFirst()) {
                int index = cursor.getColumnIndex(OpenableColumns.DISPLAY_NAME);
                if (index >= 0) return cursor.getString(index);
            }
        } catch (Exception ignored) {}
        return null;
    }

    private void copy(InputStream in, OutputStream out) throws Exception {
        byte[] buffer = new byte[64 * 1024];
        int count;
        while ((count = in.read(buffer)) != -1) out.write(buffer, 0, count);
        out.flush();
    }
}
