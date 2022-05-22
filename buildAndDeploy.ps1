$ErrorActionPreference = "Stop" # Stop on failiure

Write-Output "########  Building Client  ########"
Set-Location client
npm run build

Write-Output "########  Moving Files to Server  ########"
Remove-Item -LiteralPath ..\server\static -Force -Recurse
Copy-Item static ../server -Recurse
Remove-Item -LiteralPath static -Force -Recurse

Write-Output "########  Uploading to GAE  ########"
Set-Location ../server
npm run deploy
cd..