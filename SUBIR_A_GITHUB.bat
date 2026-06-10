@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Subir EXCOMERCAFE a GitHub

cd /d "%~dp0"

echo.
echo ==========================================
echo   EXCOMERCAFE - Subir cambios a GitHub
echo ==========================================
echo.

call :find_git

if not defined GIT_EXE (
  echo No encontre Git instalado en esta computadora.
  echo.
  echo Instala "Git for Windows" y luego vuelve a dar doble clic a este archivo.
  echo Se abrira la pagina de descarga.
  echo.
  start "" "https://git-scm.com/download/win"
  pause
  exit /b 1
)

echo Git encontrado:
echo %GIT_EXE%
echo.

"%GIT_EXE%" rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo Preparando repositorio Git...
  "%GIT_EXE%" init
  "%GIT_EXE%" branch -M main
)

"%GIT_EXE%" config user.name >nul 2>&1
if errorlevel 1 "%GIT_EXE%" config user.name "EXCOMERCAFE"

"%GIT_EXE%" config user.email >nul 2>&1
if errorlevel 1 "%GIT_EXE%" config user.email "excomercafe@local"

"%GIT_EXE%" remote get-url origin >nul 2>&1
if errorlevel 1 (
  echo No hay repositorio remoto configurado.
  echo.
  echo Pega aqui la URL de GitHub.
  echo Ejemplo: https://github.com/usuario/repositorio.git
  echo.
  set /p REPO_URL=URL de GitHub: 
  if "%REPO_URL%"=="" (
    echo No se ingreso URL. Cancelado.
    pause
    exit /b 1
  )
  "%GIT_EXE%" remote add origin "%REPO_URL%"
)

echo Repositorio remoto:
"%GIT_EXE%" remote get-url origin
echo.

echo Quitando del control de Git archivos pesados o temporales si estaban agregados...
"%GIT_EXE%" rm -r --cached --ignore-unmatch -- node_modules electron/node_modules .codex-temp-npm .electron-cache .localappdata .npm-cache >nul 2>&1
"%GIT_EXE%" rm -r --cached --ignore-unmatch -- .github-upload-staging-* EXCOMERCAFE_GitHub_*.zip - >nul 2>&1

echo Agregando cambios...
"%GIT_EXE%" add -A

"%GIT_EXE%" diff --cached --quiet
if not errorlevel 1 (
  echo.
  echo No hay cambios nuevos para subir.
  echo Intentando asegurar que GitHub este actualizado...
  "%GIT_EXE%" push -u origin main
  if errorlevel 1 (
    echo.
    echo No se pudo subir a GitHub.
    echo.
    echo GitHub rechazo el acceso. Normalmente pasa por una de estas razones:
    echo 1. Iniciaste sesion con una cuenta sin permiso para este repositorio.
    echo 2. El repositorio pertenece a otra cuenta.
    echo 3. GitHub necesita que vuelvas a iniciar sesion.
    echo.
    echo Repositorio actual:
    "%GIT_EXE%" remote get-url origin
    echo.
    echo Solucion rapida:
    echo - Inicia sesion en GitHub con la cuenta que tiene permiso.
    echo - O agrega la cuenta actual como colaborador del repositorio.
    echo.
    pause
    exit /b 1
  )
  echo.
  echo Proceso terminado.
  pause
  exit /b 0
)

set COMMIT_MSG=Actualizacion EXCOMERCAFE %date% %time%

echo Creando registro de cambios...
"%GIT_EXE%" commit -m "%COMMIT_MSG%"
if errorlevel 1 (
  echo.
  echo No se pudo crear el commit.
  echo Revisa el mensaje anterior.
  pause
  exit /b 1
)

echo.
echo Subiendo a GitHub...
"%GIT_EXE%" push -u origin main
if errorlevel 1 (
  echo.
  echo No se pudo subir a GitHub.
  echo Si GitHub pide iniciar sesion, completa el acceso y vuelve a intentar.
  echo Tambien revisa que tengas permiso en el repositorio.
  pause
  exit /b 1
)

echo.
echo ==========================================
echo   Listo: proyecto subido a GitHub.
echo ==========================================
echo.
pause
exit /b 0

:find_git
set "GIT_EXE="

for %%G in (
  "git.exe"
  "%ProgramFiles%\Git\cmd\git.exe"
  "%ProgramFiles%\Git\bin\git.exe"
  "%ProgramFiles(x86)%\Git\cmd\git.exe"
  "%ProgramFiles(x86)%\Git\bin\git.exe"
  "%LocalAppData%\Programs\Git\cmd\git.exe"
  "%LocalAppData%\Programs\Git\bin\git.exe"
) do (
  if not defined GIT_EXE (
    for %%H in (%%~G) do (
      if exist "%%~H" set "GIT_EXE=%%~H"
    )
  )
)

if not defined GIT_EXE (
  for /d %%D in ("%LocalAppData%\GitHubDesktop\app-*") do (
    if not defined GIT_EXE if exist "%%~D\resources\app\git\cmd\git.exe" set "GIT_EXE=%%~D\resources\app\git\cmd\git.exe"
    if not defined GIT_EXE if exist "%%~D\resources\app\git\mingw64\bin\git.exe" set "GIT_EXE=%%~D\resources\app\git\mingw64\bin\git.exe"
  )
)

if not defined GIT_EXE (
  where git >nul 2>&1
  if not errorlevel 1 set "GIT_EXE=git"
)

exit /b 0
