# Simple REST API Exercise, back-end part

It was first part of recrutation task. I had to create simple REST API (almost CRUD, but without update) which would save data to JSON file. I built it on NestJS and deployed on Heroku. It wasn't that easy as I predited, because the Heroku filesystem is ephemeral. I had to save the `data.json` file somewhere else. I picked AWS S3. So, the API gets requests on Heroku and saves the file on AWS S3. [It is deployed](https://simple-rest-api-exercise.herokuapp.com/).

The second part of recrutation task was a [front-end part](https://github.com/tomekrozalski/simple-rest-api-exercise-front) which should consume the API.
