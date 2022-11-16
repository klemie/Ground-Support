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

**MongoDB Atlas**

We will be cloud hosting for our development environment. Our database will be hosted by MongoDB itself on MongoDB Atlas. 

First go to [Atlas sign in](https://account.mongodb.com/account/login) and sign up for an account.

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

To use the app you must first create a local database for your environment to do this go to mongoBD Atlas and create a new dataBase.

<p align="center">
    <img src="./assets/Create%20a%20database.png" width="300"/>
</p>

Select the free option

<p align="center">
    <img src="./assets/select-free-database.png" width="300"/>
</p>

Select the AWS hosting service with a North american Server. And Name your cluster `GroundSupport`

Create an Admin User with the credentials
> Username: SupportAdmin

> Password: UVR2015

<p align="center">
    <img src="./assets/admin-user-creation.png" width=300/>
</p>

**Network Access**

In Here you can setup which IP adresses can access your database. For now click add new IP address and select `add current ip address` button. 

⚠️ Do not click allow access anywhere. That is reserved for he production version.

<p align="center">
    <img src="./assets/add-new-ip.png" width=300/>
</p>

Next click on the database tab on the left and click the `Connect` button for the `GroundSupport` database.

A popup will appear, click `connect your application`. This will give you a **Connection String**. All connection strings are different.

<p align="center">
    <img src="./assets/connect-database.png" width=300/>
</p>

Paste that in `./services/server-service/src/index.js` on line 5

```ts
mongoose.connect("{here}");
```

***

Depending on what type of development your doing you can either transpile just the backend, just the frontend or both concurrently.


**Backend**

`Note` Navigate to services/server-service
```bash
npm devStart
```
**Frontend**

`Note` Navigate to client/src

```bash
npm start
```

**Both**
```bash
npm
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
