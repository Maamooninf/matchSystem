# Awesome Project Build with TypeORM

Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file
3. Run `npm start` command
4. create .env file in the root directory and set values to :
   DEGREE_HASH = ? // number : the degree of hash of a password
   HASH_TOKEN = ? //string : string that jwt will hash a user's data with it
5. to use swagger connect to host/api-docs
6. to use api's you need to sign in (in User tag) and choose signin enter a data and you will get a token copy it then click a button called Authorize and paste a token
