@echo off
title CRAFX DEV Local Development Server
echo Starting CRAFX DEV Local Server on http://localhost:5173 ...
start "" "http://localhost:5173"
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
