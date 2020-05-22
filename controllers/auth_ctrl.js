const express = require('express');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const encrypt = require('bcryptjs'); //encrypter
const jwt = require('jsonwebtoken');//JWT token

const User = require('../models/user');

//controls for signup
const signup = (request,response,next)=>
    {
        /*const errors = validationResult(request);
        if( !errors.isEmpty() )
        {
            throw new Error('validationn error');
        }*/
    
        const email=request.body.email;
        const name=request.body.name;
        const password = request.body.password;
        //password hashing 
        encrypt.hash(password,12)//hashes the password for storage in dtatbase
        .then( hash_password=>
            {
                user= new User(
                    {
                        email:email,
                        password:hash_password,
                        name:name,
                    }
                )
                user.save().then( result=>
                    {
                        console.log(result);
                        response.json({ message:'done',userId:result._id });
                    } )

            }
            )
    }

//controls for User Login:
const login = (request,response,next)=>
    {
        let email = request.body.email;
        let password = request.body.password;
        User.findOne({ email:email }).
        then( (user)=>
            {
                if(!user){
                    console.log('user not found!!');
                    const error= new Error('user not');
                    error.statusCode =401;
                    throw error; 
                }
                loaded_user = user;
                console.log(user);
                console.log(user.email,user.password)
                encrypt.compare(password,user.password).
                then( (is_equal)=> //is_equal is boolean
                {
                    if(!is_equal){
                            error = new Error('Password dont match');
                            error.statusCode= 401;
                            throw error;
                    }
                    //if password match , then creating JWT token
                    const token = jwt.sign(
                        {
                            //payload
                            email:loaded_user.email,
                            userId:loaded_user._id,
                        },
                        //secret key:
                        'your jwt key here',
                        {expiresIn:'1h',}//the token exires in 1h
                                            )
                    //return response:
                    response.json(
                        {token:token,userId:loaded_user._id.toString()} //passing in the token as response
                    )

                } ).catch( err=>console.log(err) )
            } )

    }

module.exports = {
    'signup':signup,
    'login':login
}