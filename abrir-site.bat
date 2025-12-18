@echo off
echo ========================================
echo   Starbots - Servidor Local
echo ========================================
echo.
echo Iniciando servidor na porta 8080...
echo.
echo Abra seu navegador em: http://localhost:8080
echo.
echo Pressione Ctrl+C para parar o servidor
echo.
cd /d "%~dp0"
python -m http.server 8080

