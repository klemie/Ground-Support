# UVic Rocketry Ground Support Platform

The Ground Support application

## Installation

This section goes over instruction for the developer and non-software engineer installation process

### Developer installation
This section will go over environment dependencies and setup. 

#### Requirements

**NodeJS**

If you do not have Node please go to https://nodejs.org/en/download/ and install the latest stable version.

you can test if the installation worked by typing the commands 

```bash 
npm -v
``` 

```bash
node -version
```

If they don't give you errors then installation of node was successful.

**Yarn** 

```bash
npm install yarn
```

**Docker**

_Not necessary for MVP_

Go to there website and install ... (finish once docker is up and runner on local instance)

**MongoDB**



#### Dev Environment Setup

Now if you haven't already you can clone the repository 

```bash
git clone https://github.com/UVicRocketry/Ground-Support.git
```

**Node Installation**

Next to get everything set up all node module dependencies must be installed.

To do this run

```bash
npm install && cd client && npm install
```

This will install and update all dependencies

**Create Database**

To use the app you must first create a local database for your environment to do this

You can startup the backend by 

```bash
yarn watch ... (finish after MVP)
```

The frontend can be started through
```bash
npm start
```
### Non-technical installation

download the newest release ... (update when there is a release)

## Usage 

The app contains 

### API

The ground support system comes with an API for anyone to easily get flight data from the platform. The API is HTTP based.

All the user would need to do is make a request in the console or through a service like postman https://www.postman.com/

```JSON
GET .. (finish after MVP)
```

## Maintenance and Upkeep  
