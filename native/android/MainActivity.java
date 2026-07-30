package info.dandreart.mairgo;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MairBackupPlugin.class);
        super.onCreate(savedInstanceState);

        // Barra di stato ben distinta: fondo scuro e icone bianche.
        // Il contenuto web continua a rispettare le safe-area già presenti nel CSS.
        Window window = getWindow();
        window.setStatusBarColor(Color.rgb(43, 33, 29));

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            View decorView = window.getDecorView();
            int flags = decorView.getSystemUiVisibility();
            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            decorView.setSystemUiVisibility(flags);
        }
    }
}
