@echo off
setlocal enabledelayedexpansion

color 0A
echo -----------------------------------------
echo    Node.js Server Startup System
echo -----------------------------------------

cd /d "%~dp0"

if not exist "node_modules" (
    echo node_modules folder not found. Please install the required modules with setup.bat.
    pause
    exit /b
)

echo [INFO] Starting the Node.js server...
node index.js

echo [✓] Node.js server started!
pause
exit
