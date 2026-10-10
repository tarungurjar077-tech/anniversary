@echo off
title Happy Anniversary My Cutie - Local Server
cd /d "%~dp0"
echo Starting Happy Anniversary My Cutie website...
start "" "http://localhost:3000"
call npm.cmd run dev
pause
