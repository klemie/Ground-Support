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

If they don't give you errors then installation of node was successful. **TypeScript**

```bash
npm i -g typescript
```

verify installation

```bash
tsc --version
```

**Python**

Go to [python](https://www.python.org/downloads/release/python-3100/) and install python >3.9

**Docker**

_Not necessary for MVP_

Go to there website and install ... (finish once docker is up and runner on local instance)

**MongoDB Atlas**

We will be cloud hosting for our development environment. Our database will be hosted by MongoDB itself on MongoDB
Atlas.

First go to [Atlas sign in](https://account.mongodb.com/account/login) and sign up for an account.

#### Dev Environment Setup

Now if you haven't already you can clone the repository

```bash
git clone https://github.com/UVicRocketry/Ground-Support.git
```

**Dependencies**

Next to get everything set up all node module dependencies must be installed.

To do this run

```bash
npm install && cd client && npm i && cd ../services/server && npm i
```

in the `/services/server` directory create a `.env` file

and paste

```ts
MONGO_USERNAME = '<mongo username>'
MONGO_PASSWORD = '<password>'
MONGO_DB_STRING = '<db name>'
SERVER_PORT = '<server port>'
```

This will install and update all dependencies and setup the environment variables

Now for telemetry

First navigate to `/services/telemetry/` and install all python dependencies with

```bash
pip install -r requirements.txt
```

**Create Database**

To use the app you must first create a remote database for your environment to do this go to mongoBD Atlas and create a
new dataBase.

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

In the `.env` file fill in the password and username with the credentials above

<p align="center">
    <img src="./assets/admin-user-creation.png" width=300/>
</p>

**Network Access**

In Here you can setup which IP addresses can access your database. For now click add new IP address and select
`add current ip address` button.

⚠️ Do not click allow access anywhere. That is reserved for he production version.

<p align="center">
    <img src="./assets/add-new-ip.png" width=300/>
</p>

Next click on the database tab on the left and click the `Connect` button for the `GroundSupport` database.

A popup will appear, click `connect your application`. This will give you a **Connection String**. All connection
strings are different.

<p align="center">
    <img src="./assets/connect-database.png" width=300/>
</p>

Paste that in `./services/server-service/src/config/config.ts` on line 5

```ts
const MONGO_URL = ``;
```

replace with environment variables

```ts
`mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@groundsupport.${MONGO_DB_STRING}.mongodb.net/`;
```

---

Depending on what type of development your doing you can either transpile just the backend, the frontend or both
concurrently.

**Create Database Local**

If you are JJ and scared of Hosting your data you can install a local database for development

To do that you will need mongo DBs data management application `Compass` to get it go to:
[Download](https://www.mongodb.com/try/download/community) and install the newest community addition.

Go through the installer. Choose the `Complete` option

<p align="center">
    <img src="./assets/local-ds-installation.png" width=300/>
</p>

Copy this Path

<p align="center">
    <img src="./assets/local-ds-path.png" width=300/>
</p>

alter the path to `MongoDB/Server/6.0/bin`

Navigate to that path in your favorite terminal

copy connection string into `.env` file

**Backend**

`Navigate` to ./services/server-service

```bash
npm run server
```

**Frontend**

`Navigate` to ./client/src

```bash
npm start
```

**Both**

`Navigate` to ./client/src

```bash
npm run both
```

**Telemetry Backend**

```bash
python3 gateway.py
```

### Non-technical installation

download the newest release ... (update when there is a release)

## Usage

The app contains

## Maintenance and Upkeep
