// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});



// your first API endpoint...
let resObj = {};
app.get("/api/:date_string", (request, response) => {
  let date_string = request.params.date_string ;
 
 if (date_string.includes('-')) {
      resObj['unix'] =  new Date(date_string).getTime();
      resObj['utc']  = new Date(date_string).toUTCString();
 } 
  else {
       date_string = parseInt(date_string);
    resObj['unix'] =  new Date(date_string).getTime();
      resObj['utc']  = new Date(date_string).toUTCString();
       
  }
   
  if (!resObj['unix'] || !resObj['utc'] ) {
    response.json({error: 'Invalid Date'})
  }
  
  response.json(resObj);
});

// your second API endpoint that returns current date/timestamp if no input provided... 
app.get("/api", (request, response) => {
  resObj['unix'] =  new Date().getTime();
  resObj['utc']  = new Date().toUTCString();
  response.json(resObj);
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
