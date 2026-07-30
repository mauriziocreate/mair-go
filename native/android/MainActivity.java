package info.dandreart.mairgo;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.WindowInsets;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MairBackupPlugin.class);
        super.onCreate(savedInstanceState);

        // Android 15 (SDK 35) disegna l'app sotto le barre di sistema (edge-to-edge).
        // Applichiamo lo spazio delle barre come padding, così il contenuto
        // (inclusa la barra con la X in alto) non finisce sotto la barra di stato.
        if (Build.VERSION.SDK_INT >= 30) {
            final View content = getWindow().getDecorView();
            content.setOnApplyWindowInsetsListener((v, insets) -> {
                android.graphics.Insets bars = insets.getInsets(WindowInsets.Type.systemBars());
                v.setPadding(bars.left, bars.top, bars.right, bars.bottom);
                return WindowInsets.CONSUMED;
            });
        }
    }
}
