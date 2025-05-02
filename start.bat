@echo off
setlocal enabledelayedexpansion

color 0A
echo -----------------------------------------
echo    Node.js Sunucu Baslatma Sistemi
echo -----------------------------------------

cd /d "%~dp0"

if not exist "node_modules" (
    echo node_modules klasoru bulunamadi. Lutfen setup.bat ile gerekli modulleri yukleyin.
    pause
    exit /b
)

echo [INFO] Node.js sunucusu baslatiliyor...
node index.js

echo [✓] Node.js sunucu baslatildi!
pause
exit
