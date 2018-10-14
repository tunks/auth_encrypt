# auth_encrypt 
Simple plain text encryption , stores audit encrypt entity in Mongodb

---------------------------------------------
Clone repository to your local environment and switch into directory
 1. git clone https://github.com/tunks/auth_encrypt.git
 2. cd  auth_encrypt

 --------------------------------------------
To build & run
 1. Make sure nodejs is installed
 2. Build using the command:   
        npm install  
 3. Run using the command:
     npm start

-------------------------------------
Test endpoint
1. Request method is POST:
2. Request header content-type must be application/json

Endpoint: http://localhost:3000/auth/v1/encrypt

Send sample json request body to server=>
{"password": "mongo@123"}

Expected response from server=>
{"encrypted_password":"$2b$10$cmEmQhaM2t5X0o.xX7H14.fKY8mnPJ1ee1VsKuTjUSx3t6LtNG8AG"}


--------------------------------------
Configuration
1. To change mongo configuration, change the mongo url and database from the mongo_config.js file
2. To change the port, change the PORT in index.js