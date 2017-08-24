@echo off

rem set PATH to include
SET PATH=%PATH%;c:\Matt\Workspace\x64\servers\php;c:\Matt\Workspace\x64\tools\ruby\bin;c:\Matt\Workspace\x64\tools\devkit\bin;c:\Matt\Workspace\x64\tools\devkit\mingw\bin;

rem If we're in the Node.js directory, change to the user's home dir.
cd /d "%~dp0"
jekyll build