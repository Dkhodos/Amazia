Write-Output "########  Building Client  ########"
Set-Location client
npm run build

Write-Output "########  Moving Files to Server  ########"
Remove-Item /q ..\server\static 
Move-Item static ../server

Write-Output "########  Moving Files to Server  ########"
Set-Location ../server
npm run deploy
