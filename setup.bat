@echo off
setlocal enabledelayedexpansion

color 0A
echo -----------------------------------------
echo    Node Modules Installation System
echo -----------------------------------------

cd /d "%~dp0"

if exist "node_modules" (
    echo [INFO] node_modules folder exists, deleting...
    rmdir /s /q node_modules
)

echo [INFO] Installing node_modules...
npm install

echo [INFO] Installing extra packages...
npm install discord.js
npm install mysql2

echo [✓] Installation completed!
pause
exit
