//authorization middleware , can be passed into routes for passing in the token 
const jwt = require('jsonwebtoken'); //importing  jwt token
const { request, response } = require('express');

const auth_ctrl = (request,response,next)=>
    {
        const token = request.get('Authorization').split(' ')[1]; //extracts the token out of the header in the request.
        let decoded_token;
        
        try{
           decoded_token = jwt.verify(token,'testingJWTtoken');//verify the token , secret key needs to be provided
             }
        catch(error){
            error.statusCode = 500;
            throw error
        } 
        if(!decoded_token){
            const error = new Error('not validated ');
            error.statusCode = 401;
            throw error;;
        }
        //if token is verified :
        request.userId = decoded_token.userId; //fetches the userId from token and uploads it to the request body for upcoming middlewares
        next(); 
    }

 module.exports = auth_ctrl;   