name: Compila APK MAIR GO!

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Scarica il progetto
        uses: actions/checkout@v4

      - name: Prepara Java
        uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '21'

      - name: Prepara Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Installa Capacitor
        run: npm install

      - name: Crea il progetto Android
        run: npx cap add android

      - name: Installa il selettore backup nativo
        run: |
          mkdir -p android/app/src/main/java/info/dandreart/mairgo
          cp native/android/MairBackupPlugin.java android/app/src/main/java/info/dandreart/mairgo/MairBackupPlugin.java
          cp native/android/MainActivity.java android/app/src/main/java/info/dandreart/mairgo/MainActivity.java

      - name: Sincronizza i file dell'app
        run: npx cap sync android

      - name: Compila l'APK
        run: |
          cd android
          chmod +x ./gradlew
          ./gradlew assembleDebug

      - name: Pubblica l'APK scaricabile
        uses: actions/upload-artifact@v4
        with:
          name: MAIR-GO-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk
