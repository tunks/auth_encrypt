'use strict';
const MongoConfig = require('./mongo_config')
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
var datetime = require('node-datetime');

const saltRounds = 10;

function saveEncryption(entity){
     let url = MongoConfig.URL
     let dbName = MongoConfig.DATABASE
     console.log(url);

     const insertDocuments = function(db, entity, callback) {
        // Get the documents collection
        const collection = db.collection('encrypt_entity');
        // Insert some documents
        collection.insertMany([entity], function(err, result) {
          console.log("Inserted entity into the database");
          callback(result);
        });

      }

     MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        //assert.equal(null, err);
        if(err != null){
          console.error("Failed to save record, mongo connection error");
          console.error(err);
        }
        else{
            console.log("Connected successfully to server");
            const db = client.db(dbName);
            //insert documents
            insertDocuments(db, entity, function() {
            client.close();
            });
        }
    });
}

module.exports = {
     generate: function(text, callback){
        var salt = bcrypt.genSaltSync(saltRounds);
        var hash = bcrypt.hashSync(text, salt);
        var created_timestamp = datetime.create().now()
        //save record to database
        saveEncryption({text: text, 
                        hash: hash, 
                        created_timestamp: created_timestamp})
        return hash;
    }
}