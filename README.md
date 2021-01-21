# user-text-service
---------------------

> User text service is used save, update and delete the user private text.

## How to get Started
----------------------

NOTE: 
  - Please ensure that Node js installed in your system

```shell
    $ git clone https://github.com/harikishanreddy/user-text-service.git
    $ cd user-text-service
    $ npm install
    $ npm run start
```

## Services Exposed
--------------------
 
Dfiirent services are exposed for user oepartions 

- ```/user/register``` : This service used to register new User
- ```/user/authenticate```: This service used to verify the user is valid or not
- ```/user/add-text```: This service used to add the user private text
- ```/user/update-text```: This Service used to update the User private text
- ```/user/delete-text```: This Service used to delete the user private text
- ```/user/text```: This Service used to view the user text

## How it works
----------------

- The new user has to register with the application using ```/user/register``` service, this service will create the record in ```pouchdb``` user database.
- ```pouchdb``` is the in memory No sql database.
- One the user register or if user is already exist need to authenticate by accessing ```/user/authenticate``` service.
- If the user is valid then it will generate the JWT token for the user and sends the same in response header as ```x-transaction-id```
- The user has to use this token in request headers as ```x-transaction-id``` to access the resources.
- After authentication user can now able to add the text using ```/user/add-text```. Ifd user want to update the existing text he can access  ```/user/update-text``` and to delete the existing text user can access ```/user/delete-text``` and to verify the text User can access ```/user/text```.

## Sample Postman collection
----------------------------
> [UserServiceCollection](https://www.getpostman.com/collections/0bcbebdba7a02558a201)

