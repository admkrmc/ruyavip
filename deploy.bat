@echo off
echo ========================================
echo Firebase Hosting Deploy Script
echo ========================================
echo.

echo [1/3] Building production version...
call npm run build
if %errorlevel% neq 0 (
    echo Build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Deploying to Firebase Hosting...
call firebase deploy --only hosting
if %errorlevel% neq 0 (
    echo Deploy failed!
    echo Please run: firebase login
    pause
    exit /b 1
)

echo.
echo ========================================
echo Deploy successful!
echo Your site is live at:
echo https://ruyavip-free.web.app
echo ========================================
pause
