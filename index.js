const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const encryptAPI = require('./encrypt_api');
// Creates an Express compatible Feathers application
const PORT = 3000
const app = express(feathers());
// Parse HTTP JSON bodies
app.use(express.json());
// Parse URL-encoded params
app.use(express.urlencoded({ extended: true }));
// Add REST API support
app.configure(express.rest());

//authentication service
const encryptService = {
    generate: {
        create(data, params) {
            var result = {}
            if (data["password"] != null){
                let text = data["password"]
                let hash = encryptAPI.generate(text)
                result = {
                    encrypted_password: hash
                }
                console.log(hash)
            }
            return Promise.resolve(result);
        }
    }
  };
// Register a messages service with pagination
app.use('/auth/v1/encrypt/', encryptService.generate);
// Register a nicer error handler than the default Express one
app.use(express.errorHandler());

// Start the server
app.listen(PORT).on('listening', () =>
  console.log('Feathers server listening on port '+PORT)
);