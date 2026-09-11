# DoseCare V2 Android wrapper

This directory is reserved for the Android packaging layer for the stable DoseCare V2 web/PWA build.

The Android app must load the local `dosecare-v2` web assets so pediatric dose calculation remains available offline. The source of truth for the calculator, dosing engine, and medicine database remains `dosecare-v2/`.

Build order:
1. Generate the Android wrapper project.
2. Bundle the complete `dosecare-v2/` directory as application assets.
3. Configure the WebView to load the bundled `index.html` and permit local relative navigation.
4. Run the debug APK build.
5. Install and verify online and offline calculations on Android.
