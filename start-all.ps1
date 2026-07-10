Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "       Starting EyeZora Services...       " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. Start Express Backend
Write-Host "[1/3] Starting Express Backend (Port 5000)..." -ForegroundColor Yellow
Start-Process powershell -WorkingDirectory "c:\Users\parve\OneDrive\Documents\EyeZora\backend" -ArgumentList "-NoExit", "-Command", "npm run dev"

# 2. Start FastAPI AI Proctoring Backend
Write-Host "[2/3] Starting FastAPI AI Proctoring Backend (Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -WorkingDirectory "c:\Users\parve\OneDrive\Documents\EyeZora\backend" -ArgumentList "-NoExit", "-Command", ".\venv\Scripts\uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

# 3. Start Next.js Frontend
Write-Host "[3/3] Starting Next.js Frontend (Port 3000)..." -ForegroundColor Yellow
Start-Process powershell -WorkingDirectory "c:\Users\parve\OneDrive\Documents\EyeZora\frontend" -ArgumentList "-NoExit", "-Command", "npm run dev"

Write-Host "==========================================" -ForegroundColor Green
Write-Host "✅ All processes launched in separate windows!" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:3000" -ForegroundColor Green
Write-Host "- Express Backend: http://localhost:5000" -ForegroundColor Green
Write-Host "- AI Backend: http://localhost:8000" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
