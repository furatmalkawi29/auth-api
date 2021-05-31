# auth-api


## About 

 Project basically allow a user to create an account as well as to handle Basic Authentication (user provides a username + password). When a “good” login happens, the user is considered to be “authenticated” and our auth-server generates a JWT signed “Token” which is returned to the application . 

User will be using that Token to re-authenticate his login using Bearer-authentication . then based on his role (admin,user,editor) he will be resirticted from using some routs and allowed to use others .

<hr>

## Author
Furat Malkawi

<hr>

## Links

* [Deployed App](https://auth-api-furat.herokuapp.com/)
* [Error Report](https://github.com/furatmalkawi29/auth-api/actions/)

<hr>

## Setup

1. `(.env)` file 

```
PORT = 4000

MONGOOSE_URI = mongodb://localhost:27017/things

MONGOOSE_TEST_URI = mongodb://localhost:27017/test

SECRET = (add your secret)

```

2. Install the following dependencies

```
npm init -y 

npm i cors dotenv express morgan mongoose base-64 bcrypt jsonwebtoken 

npm i -D jest supertest

npm i @code-fellows/supergoose 

mongod --dbpath=/Users/path/to/data/db


```

## Running the app 

1. clone the repo.

2. Enter the command `npm start`

3. Use endpoints :

   
  ### * `/signup`

<br>
  
- **Method** : POST 
- **Usage** : create a new user account using username and password 

- **Request body** : JSON 

```
{
    "username":"sara",
    "password":"123"
}
```

- **Response Body**  : JSON 
  
  
```
{
    "user": {
        "_id": "60ad8bcbb3b5320fe8e0b6c4",
        "username": "gogo",
        "password": "$2b$10$L51wC4CihCjTnTw3nsHCaOLU68Y9ETu3jet03s8HRv5AEElVYlHOm",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdvZ28iLCJpYXQiOjE2MjE5ODYyNTF9.Lf6ICMkl5HE6lmDiT6lEfryEulKA3lCxQeLPs7t8Oqc"
}
```


<br>


  ### * `/signin`

<br>
  
- **Method** : POST 
- **Usage** : Authenticate login credentials (username and password) 

- **Request headers authorization** :  submitted basic authentication credintial 

```

    username --> sara
    password --> 123

```

- **Response Body**  : JSON 
  
  
```
{
    "user": {
        "_id": "60ad8bcbb3b5320fe8e0b6c4",
        "username": "gogo",
        "password": "$2b$10$L51wC4CihCjTnTw3nsHCaOLU68Y9ETu3jet03s8HRv5AEElVYlHOm",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdvZ28iLCJpYXQiOjE2MjE5ODY3MTB9.Vy7ssKp03DlQfY2P31MocDfWV5D8g2Dbb19SVkIy_eQ"
}
```


  ### * `/users`

<br>
  
- **Method** : GET 
- **Usage** : double Authenticate login credential (token) and get array of usernames exist in database

- **Request headers authorization** :  submitted bearer token

```

    token --> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdvZ28iLCJpYXQiOjE2MjE5ODY3MTB9.Vy7ssKp03DlQfY2P31MocDfWV5D8g2Dbb19SVkIy_eQ

```

- **Response Body**  : JSON 
  
  
```
{
[
    "moo1",
    "moo2",
    "ca1",
    "ca7",
    "sara"
]
}
```
<br>

# Other Endpoints: (accessed allowed based on user role )
   * (/secret)
   * (/api/v1/food)
   * (/api/v1/food/:id)
   * (/api/v1/clothes)
   * (/api/v1/clothes/:id)

1. Test .    

* In terminal run :

```
npm test
```
<br>
<hr>

## UML Diagram

<br>

![](./uml0.jpg)
