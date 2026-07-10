@echo off
echo ============================================
echo   NOIR LABEL - Pushing Project to GitHub
echo ============================================
echo.
cd /d "%~dp0"

echo Checking if Git is installed...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed on this system!
    echo Please install Git from: https://git-scm.com/
    pause
    exit /b
)

echo Initializing Git repository...
git init

echo Setting remote repository...
git remote remove origin >nul 2>&1
git remote add origin https://github.com/yyyyyy12345612345-bit/test10.git

echo Staging files... (ignoring large node_modules/.next directories)
git add .

echo Committing files...
git commit -m "feat: initial commit of premium fashion e-commerce store"

echo Setting branch to main...
git branch -M main

echo Pushing to GitHub... (you may be asked to log in)
git push -u origin main

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Push failed. 
    echo If this is a private repository, please check your credentials or login prompts.
) else (
    echo.
    echo [SUCCESS] Project successfully pushed to GitHub!
)

pause
