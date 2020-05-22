const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');


const router = require('./routes/routes');

app = express();
// middleware for every request to set headers for access 
app.use(cors());
app.use( (request,response,next)=>{
        response.setHeader('Access-Control-Allow-Origin','*') //allow only certain origins to send requests 
        response.setHeader('Access-Control-Allow-Methods','POST','GET','PUT',); //allow given http methods
        response.setHeader('Allow-Control-Allow-Headers','Content-Type,Authorization',); //allow certain headers to be set by client
        next(); 
                                    } )

app.use(bodyparser.json()); //for parsing request in json 

//middleware for static images
app.use('/images',express.static(path.join(__dirname,'./images')));

app.use(router.router);

mongoose.connect('database link',{ useNewUrlParser: true }).
then(result=>{
    console.log(result);
    console.log('connected')
    app.listen(8080);
})