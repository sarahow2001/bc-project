# Northcoders News API

[NC News] is a backend JS project , creating various server endpoints .
This project is designed to show how several types of requests the server receives and how the server processes these requests in order to provide the required responses.

This project was planned using a TDD approach, as a result of which all parameters were carefully tested for success. 
An error results in a failed request response leading to a specific  error

these requests include:
-GET
-POST
-Patch
-DELETE


[Frontend project] (https://github.com/sarahow2001/FE-nc-news.git)

## Running this repository Locally 
### Requirements 
node - v17.3.0
PostgreSQL 12.9

### Cloning and Setup
## Clone the project 

```bash
git clone https://github.com/sarahow2001/bc-project.git
```
### Install the Dependencies 

``` bash
 npm install 
```
### ENV variables

1. Create 2 .env files to gain access to the testing or development Data-base 

2. the first .env development file should contain :
```
PGDATABASE=nc_news
```
3. the second .env.test file should contain:
```
PGDATABASE=nc_news_test
```
### Seed and Setup 

#### To setup local database

```bash
npm run setup-dbs
```
#### Start the Server
```bash
npm run start
```

## Tech Stack
**Server:** Node , Express
 