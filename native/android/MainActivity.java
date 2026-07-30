package info.dandreart.mairgo;

import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.widget.FrameLayout;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    private static final int STATUS_BAR_COLOR = Color.rgb(43, 33, 29);

    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(MairBackupPlugin.class);
        super.onCreate(savedInstanceState);

        configureStatusBar();
    }

    private void configureStatusBar() {
        Window window = getWindow();

        // Funziona nelle versioni Android precedenti ad Android 15.
        window.setStatusBarColor(STATUS_BAR_COLOR);

        // Mantiene bianche le icone della barra di stato.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            WindowInsetsController controller = window.getInsetsController();
            if (controller != null) {
                controller.setSystemBarsAppearance(
                        0,
                        WindowInsetsController.APPEARANCE_LIGHT_STATUS_BARS
                );
            }
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            View decorView = window.getDecorView();
            int flags = decorView.getSystemUiVisibility();
            flags &= ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR;
            decorView.setSystemUiVisibility(flags);
        }

        // Con target API 35 Android 15 rende la status bar trasparente e ignora
        // setStatusBarColor(). Questo pannello scuro viene quindi disegnato
        // realmente dietro alle icone, anche nella versione installata dal Play Store.
        if (Build.VERSION.SDK_INT >= 35) {
            addStatusBarBackground(window);
        }
    }

    private void addStatusBarBackground(Window window) {
        View decor = window.getDecorView();
        if (!(decor instanceof FrameLayout)) {
            return;
        }

        FrameLayout decorLayout = (FrameLayout) decor;
        View statusBarBackground = new View(this);
        statusBarBackground.setBackgroundColor(STATUS_BAR_COLOR);
        statusBarBackground.setClickable(false);
        statusBarBackground.setFocusable(false);
        statusBarBackground.setImportantForAccessibility(View.IMPORTANT_FOR_ACCESSIBILITY_NO);

        FrameLayout.LayoutParams params = new FrameLayout.LayoutParams(
                FrameLayout.LayoutParams.MATCH_PARENT,
                0,
                Gravity.TOP
        );
        decorLayout.addView(statusBarBackground, params);

        decor.setOnApplyWindowInsetsListener((view, insets) -> {
            int statusBarHeight;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                statusBarHeight = insets.getInsets(WindowInsets.Type.statusBars()).top;
            } else {
                statusBarHeight = insets.getSystemWindowInsetTop();
            }

            FrameLayout.LayoutParams layoutParams =
                    (FrameLayout.LayoutParams) statusBarBackground.getLayoutParams();
            if (layoutParams.height != statusBarHeight) {
                layoutParams.height = statusBarHeight;
                statusBarBackground.setLayoutParams(layoutParams);
            }
            statusBarBackground.bringToFront();
            return view.onApplyWindowInsets(insets);
        });

        decor.requestApplyInsets();
    }
}
