# Amazia

project description

## Dependencies
1. Install gcloud CLI
https://cloud.google.com/sdk/docs/install-sdk

2. Install dependencies 
```shell
cd server
npm i
cd ../client
npm i
```

## setup env for server
1. get `ds_key.json` from **admin** and add it to `project_root/server`.
2. create an .env file
```
PORT=5001
PROJECT_ID="{{ get from admin}}"
```

## Run server
```shell
cd server
npm run dev
```

## Run client
```shell
cd client
npm run dev
```

## Deploy
```shell
 ./buildAndDeploy.ps1
```