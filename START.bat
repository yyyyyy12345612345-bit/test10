@echo off
echo ============================================
echo   NOIR LABEL - Installing Dependencies
echo ============================================
echo.
cd /d "%~dp0"
echo Installing packages... (this may take 3-5 minutes)
npm install --legacy-peer-deps
echo.
echo ============================================
echo   Starting Development Server...
echo ============================================
echo.
echo Visit: http://localhost:3000
echo.
npm run dev
pause
