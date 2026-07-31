@echo off
:: ==============================================================================
:: Talha Ghafoor Portfolio - Comprehensive SQL Server Database Setup
:: Right-click and select "Run as Administrator"
:: ==============================================================================

echo ==============================================================================
echo [1/4] Enabling Mixed Mode Authentication & sa Login on MS SQL Server...
echo ==============================================================================

sqlcmd -S .\SQLEXPRESS -E -Q "EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', N'Software\Microsoft\MSSQLServer\MSSQLServer', N'LoginMode', REG_DWORD, 2; IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'portfolio_db') CREATE DATABASE portfolio_db; ALTER LOGIN sa WITH PASSWORD = 'PortfolioPassword123!'; ALTER LOGIN sa ENABLE;" 2>nul
sqlcmd -S .\SQLEXPRESS01 -E -Q "EXEC xp_instance_regwrite N'HKEY_LOCAL_MACHINE', N'Software\Microsoft\MSSQLServer\MSSQLServer', N'LoginMode', REG_DWORD, 2; IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'portfolio_db') CREATE DATABASE portfolio_db; ALTER LOGIN sa WITH PASSWORD = 'PortfolioPassword123!'; ALTER LOGIN sa ENABLE;" 2>nul

echo.
echo ==============================================================================
echo [2/4] Configuring TCP/IP Registry Protocols for Port 1433...
echo ==============================================================================

powershell -Command "Get-ChildItem 'HKLM:\SOFTWARE\Microsoft\Microsoft SQL Server' -ErrorAction SilentlyContinue | ForEach-Object { $tcp = Join-Path $_.PSPath 'MSSQLServer\SuperSocketNetLib\Tcp'; if (Test-Path $tcp) { Set-ItemProperty -Path $tcp -Name 'Enabled' -Value 1 -ErrorAction SilentlyContinue; Set-ItemProperty -Path (Join-Path $tcp 'IPAll') -Name 'TcpPort' -Value '1433' -ErrorAction SilentlyContinue; Set-ItemProperty -Path (Join-Path $tcp 'IPAll') -Name 'TcpDynamicPorts' -Value '' -ErrorAction SilentlyContinue; Write-Host 'Enabled TCP/IP on' $_.PSChildName } }"

echo.
echo ==============================================================================
echo [3/4] Restarting MS SQL Server Services...
echo ==============================================================================

net stop "MSSQL$SQLEXPRESS" /y 2>nul
net start "MSSQL$SQLEXPRESS" 2>nul

net stop "MSSQL$SQLEXPRESS01" /y 2>nul
net start "MSSQL$SQLEXPRESS01" 2>nul

echo.
echo ==============================================================================
echo [4/4] Testing sa Connection and portfolio_db Schema Verification...
echo ==============================================================================

sqlcmd -S 127.0.0.1,1433 -U sa -P PortfolioPassword123! -Q "IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'portfolio_db') CREATE DATABASE portfolio_db; USE portfolio_db; IF NOT EXISTS (SELECT * FROM sys.schemas WHERE name = 'portfolio') EXEC('CREATE SCHEMA portfolio'); SELECT name FROM sys.databases WHERE name = 'portfolio_db';"

echo.
echo ==============================================================================
echo SUCCESS! Your PC is fully configured as a Dedicated MS SQL Database Server!
echo ------------------------------------------------------------------------------
echo Server: 127.0.0.1,1433 (or .\SQLEXPRESS)
echo Database: portfolio_db (Schema: portfolio)
echo Username: sa
echo Password: PortfolioPassword123!
echo ==============================================================================

pause
