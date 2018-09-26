# CLA Tracker Node App

## Overview
This app automatically monitors pull requests on github and determines whether an appropriate contributor license agreement (CLA) has been signed. 

If a CLA is required but has not been signed by the contributor the pull request status is set to failure and the user will be presented with a link to follow in order to sign up to the CLA. Once the CLA is signed the pull request status will be set to success. 

Details of which CLAs a user has signed and the CLA requirements for a particular github project are stored in a Redis database, which must be set up alongside the clatracker app.

## Requirements
[Node.js](https://nodejs.org/en/)\
[Redis](https://redis.io/download)

## Install
make sure you have Node and Redis installed

#### Run Redis Server
```
redis-server
```
a redis server should now be running on port 6379

#### Install clatracker app
In a new shell
```
git clone git@github.com:cla-tracker/clatracker.git
cd clatracker
npm install
```
clatracker should now be running on localhost:3000


#### Configure clatracker app (in the shell where you installed the clatracker app)
- Ensure that the clatracker app is externally visible
  - Find out the external IP address of your home network 
  - Go into your router settings and map an external port number to the port and interal IP address of the machine running the
  clatracker app.
  - We will refer to the external url as APP_URL

- Expose your Redis server by setting an environment variable\
```export REDIS_DEV_URL="redis://localhost:6379"```
- Create a test repo on github, or select an existing repo ensuring that you have write access
- Go into repository settings and select `Webhooks` and then `add webhook` and setup your webhook as follows:
  - `PayloadURL`: https://APP_URL/githublistener
  - `Content Type`: application/json *currently this app only supports application/json webhooks*
  - `Secret`:type a random string with high entropy we will refer to this as WEBHOOK_SECRET
  - `SSL Verification`: if running app locally for development you can disable ssl verification
  - Select `Let me select individual events` and then tick `Pull requests`
  - Tick `Active`
 - Expose your webhook secret to the clatracker app using an environment variable\
 ```export WEBHOOK_SECRET_TOKEN="WEBHOOK_SECRET"```
- Generate a github personal access token to authenticate any calls to the github API. You must ensure that user who creates this personal access token has write access to any repositories you want to hook up to the clatracker app
  - Select `Settings` from dropdown at top-right of screen
  - Select `Developer Settings`
  - Select `Personal Access Tokens`
  - Select `Generate New Token` and create a token as follows:
    - `Token description`: add any description
    - `Select scopes`: select all options under `repo`
- Expose the github personal access token to the clatracker app using environment variable\
```export GITHUB_PERSONAL_ACCESS_TOKEN="PERSONAL ACCESS TOKEN"```
- Create a Gitub OAUTH App
  -
 













