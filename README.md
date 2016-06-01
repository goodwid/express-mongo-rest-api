
## Game of Thrones characters and locations
### New and Improved! With user authentication and roles!
###### David and Yvonne

to run:
```
npm install
npm start
```
The defualt port is 9000.

### The following methods and endpoints are available:

##### User authentication with a token is required to access the following:

- GET
  - /people
  - /people/:id
  - /locations
  - /locations/:id
  - /people/dead
- POST
  - /people
  - /locations

##### Further, a token and admin rights must be added for the following:

- POST
  - /users/:id/roles/:role
- PUT  
  - /people/:id
  - /locations/:id
- DELETE  
  - /people/:id
  - /locations/:id
  - /users/:id

Pointing a browser at / will provide the opportunity to create a username and receive a valid token, which must be provided in the header for API calls.

Unit and end to end testing are available:
```
npm test
```
