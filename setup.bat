@echo off
setlocal enabledelayedexpansion

color 0A
echo -----------------------------------------
echo    Node Modules Yükleme Sistemi
echo -----------------------------------------

cd /d "%~dp0"

if exist "node_modules" (
    echo [INFO] node_modules klasoru mevcut, siliniyor...
    rmdir /s /q node_modules
)

echo [INFO] node_modules yukleniyor...
npm install

echo [INFO] Ekstra paketler yukleniyor...
npm install discord.js

echo [✓] Kurulum tamamlandi!
pause
exit
