# node-mongo-seed
A node seed project with mongo as a database.

## Setup
1. Run ```npm install``` from project root
2. Setup the Mongo database for your project
3. Change ```mongodb://localhost/local``` in './bin/todo-api.js' to your database location

## Test
The javascript testing is setup for TDD and uses the following components:
- Mocha as a testing framework
- FlareGun for test requests and assertion
- Joi for schema generation

To add tests, add files to the test directory. To run your tests, simply run ```npm test``` from the project root.

## Run
Run ```npm start``` from the project root.