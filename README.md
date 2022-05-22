# Amazia

Client: React + Typescript + MUI + Redux Toolit
Server: Node + Typescript + Express + gcloud services (GEA, Datastore & Logging)

URL: https://adept-bridge-349115.el.r.appspot.com

## Description
The following quiz includes 10 question in which you need to recognize which emotion is primarily shown by the actor.

Please do your best to recognize as many emotions correctly as you can, good luck!!!

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
