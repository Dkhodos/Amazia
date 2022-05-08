Write-Output "########  Building Client  ########"
Set-Location client
npm run build

Write-Output "########  Moving Files to Server  ########"
Remove-Item -LiteralPath ..\server\static -Force -Recurse
Move-Item static ../server

Write-Output "########  Uploading to GAE  ########"
Set-Location ../server
npm run deploy
