![cf](http://i.imgur.com/7v5ASc8.png) express-mongo-rest-api
====

Create a rest API with Express that's backed by Mongo with two resources
 (for example, `/users` and `/birds`).

Highly suggested to **pair up** on this assignment.

##Description

Be sure to implement full REST operations for each resource (`GET`/`POST`/`PUT`/`DELETE`)

This is pretty open to interpretation. Write this from scratch, don't just copy and paste code 
from class or previous projects.

Finally, implement a non CRUD endpoint (meaning that is does not simply 
Create, Read, Update, or Destroy information in your database). 
When a user hits a url endpoint, the server will do something with the data 
that is not a CRUD operation and return the data. 

For example,  `/users/averageAge` might return the average age of all users. This could 
be something that happens in JavaScript, or using advanced features of Mongoose.

In your assignment submission add a comment that includes how long it 
took to complete and a reflection on the process.

## Bonus

* Make at least one of your resources queryable on a list `GET`,
eg `/birds&flightless=true` **2pts**

* Implement `PATCH` for one of your resources **2pts**

* Use Mongoose Promise API **1pt**

##Rubric
* Use of Express: **3pts**
* Use of Mongo: **3pts**
* Tests: **2pts**
* Project Organization: **2pts**