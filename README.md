# coinplan

## Installation ##
1. Install Node, npm, and git.
1. Clone this repository.
1. Run ```npm install``` in the project root directory.
1. Install PostgreSQL, start the PostgreSQL server, and connect to it via psql.
1. In psql, run ```CREATE DATABASE coinplan;``` to create the database.
1. Still in psql, run ```CREATE DATABASE coinplan_testing;``` to create a database for automated tests.
1. Create a .env file in the root directory of the project with the following, replacing (?) with the desired information: <br>
```
COINPLAN_SERVER_PORT=?              // The port that the server should run on. 3000 is a good default choice
COINPLAN_DB_USER=?                  // The user that should be used to connect to postgres
COINPLAN_DB_DATABASE=?              // The database you just created, so likely coinplan
COINPLAN_DB_TEST_DATABASE=?         // The test database you just created, so likely coinplan_testing
COINPLAN_DB_PASSWORD=?              // The password for your postgres user
COINPLAN_DB_HOST=?                  // The host for your postgres db, likely localhost
COINPLAN_DB_PORT=?                  // The port for your postgres db, likely 5432
COINPLAN_TOKEN_SECRET=?             // Token for authentication. Generate something secure and random
COINPLAN_LOG_FILE=?                 // Path to the log file, defaults to ./log.txt
```
8. Run ```npm run createdb``` to create the database schema.
1. Run ```npm start```
