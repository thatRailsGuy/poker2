package io.github.thatrailsguy.pokerhouse;

import android.app.Activity;
import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.view.ViewGroup;
import android.webkit.MimeTypeMap;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.webkit.WebViewAssetLoader;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;

/**
 * Hosts the Eleventy-built site, bundled under assets/www, in a WebView.
 *
 * Pages are served from https://appassets.androidplatform.net/ so root-relative links
 * ("/games/12/") resolve the same way they do on a web server. Nothing is fetched from
 * the network; links to other hosts open in the system browser.
 */
public class MainActivity extends Activity {

    private static final String ASSET_HOST = WebViewAssetLoader.DEFAULT_DOMAIN;
    private static final String START_URL = "https://" + ASSET_HOST + "/";

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        webView = new WebView(this);
        webView.setBackgroundColor(getColor(R.color.background));

        // WebView ignores its own padding (it still draws and takes touches from its top edge),
        // so the system-bar insets are applied to a wrapping container instead.
        FrameLayout container = new FrameLayout(this);
        container.setBackgroundColor(getColor(R.color.background));
        container.addView(webView, new FrameLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
        setContentView(container);

        // targetSdk 35 draws edge-to-edge; keep page content clear of the system bars.
        ViewCompat.setOnApplyWindowInsetsListener(container, (view, insets) -> {
            Insets bars = insets.getInsets(WindowInsetsCompat.Type.systemBars()
                    | WindowInsetsCompat.Type.displayCutout() | WindowInsetsCompat.Type.ime());
            view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            return WindowInsetsCompat.CONSUMED;
        });

        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(false);
        settings.setAllowContentAccess(false);

        WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .setDomain(ASSET_HOST)
                .addPathHandler("/", new SitePathHandler())
                .build();

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                if (ASSET_HOST.equals(uri.getHost())) {
                    return false;
                }
                try {
                    startActivity(new Intent(Intent.ACTION_VIEW, uri));
                } catch (ActivityNotFoundException ignored) {
                    // No app can handle the link; stay on the current page.
                }
                return true;
            }
        });

        if (savedInstanceState != null) {
            webView.restoreState(savedInstanceState);
        } else {
            webView.loadUrl(START_URL);
        }
    }

    @Override
    protected void onSaveInstanceState(@NonNull Bundle outState) {
        super.onSaveInstanceState(outState);
        webView.saveState(outState);
    }

    @Override
    @SuppressWarnings("deprecation")
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            super.onBackPressed();
        }
    }

    /**
     * Serves files from assets/www, mapping directory URLs ("games/12/") to their index.html
     * the way a static web server would. WebViewAssetLoader's built-in AssetsPathHandler
     * doesn't do that, and Eleventy emits every page as dir/index.html.
     */
    private class SitePathHandler implements WebViewAssetLoader.PathHandler {
        @Override
        public WebResourceResponse handle(@NonNull String path) {
            if (path.isEmpty() || path.endsWith("/")) {
                path += "index.html";
            } else if (!path.substring(path.lastIndexOf('/') + 1).contains(".")) {
                path += "/index.html";
            }

            String extension = path.substring(path.lastIndexOf('.') + 1);
            String mimeType = MimeTypeMap.getSingleton().getMimeTypeFromExtension(extension);
            if (mimeType == null) {
                mimeType = "application/octet-stream";
            }

            try {
                InputStream stream = getAssets().open("www/" + path);
                return new WebResourceResponse(mimeType, "utf-8", stream);
            } catch (IOException e) {
                return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found",
                        Collections.emptyMap(), new ByteArrayInputStream("Not found".getBytes()));
            }
        }
    }
}
