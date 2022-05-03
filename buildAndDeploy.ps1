echo "########  Building Client  ########"
cd client
npm run build

echo "########  Moving Files to Server  ########"
del /q ..\server\static 
move static ../server

echo "########  Moving Files to Server  ########"
cd ..
cd server
npm run deploy
