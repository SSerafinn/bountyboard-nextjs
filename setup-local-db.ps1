# PostgreSQL Local Setup Script for Windows
# This script helps you set up a local PostgreSQL database

Write-Host "=== PostgreSQL Local Setup ===" -ForegroundColor Green

# Check if PostgreSQL is installed
$pgPath = Get-Command psql -ErrorAction SilentlyContinue
if (-not $pgPath) {
    Write-Host "PostgreSQL is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install PostgreSQL from: https://www.postgresql.org/download/windows/" -ForegroundColor Yellow
    Write-Host "After installation, make sure to add PostgreSQL to your PATH" -ForegroundColor Yellow
    exit 1
}

Write-Host "PostgreSQL found at: $($pgPath.Source)" -ForegroundColor Green

# Create database
Write-Host "Creating database 'bountyboard'..." -ForegroundColor Yellow
try {
    createdb -U postgres bountyboard
    Write-Host "Database 'bountyboard' created successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error creating database. You may need to:" -ForegroundColor Red
    Write-Host "1. Run as administrator" -ForegroundColor Yellow
    Write-Host "2. Set up PostgreSQL password" -ForegroundColor Yellow
    Write-Host "3. Create database manually using pgAdmin" -ForegroundColor Yellow
}

Write-Host "`nNext steps:" -ForegroundColor Cyan
Write-Host "1. Create a .env file with your DATABASE_URL" -ForegroundColor White
Write-Host "2. Run: npm run db:generate" -ForegroundColor White
Write-Host "3. Run: npm run db:push" -ForegroundColor White
Write-Host "4. Run: npm run db:seed" -ForegroundColor White
Write-Host "5. Run: npm run dev" -ForegroundColor White

Write-Host "`nExample .env file:" -ForegroundColor Cyan
Write-Host 'DATABASE_URL="postgresql://postgres:your_password@localhost:5432/bountyboard"' -ForegroundColor Gray 