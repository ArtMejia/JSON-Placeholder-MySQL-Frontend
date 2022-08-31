//importing the express module
const express = require('express')
const bodyParser = require("body-parser");

//create an instance of express (creating the server)
const app = express()

//allows frontend to server static files
app.use(express.static('public'))
app.use(bodyParser.json());

//sets the port to listen to
app.listen(3500, () => {
    console.log('Server listening on port 3500');
})