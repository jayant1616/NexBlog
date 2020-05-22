const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const ctrl_0  = require('../controllers/ctrl_1');
const auth_ctrl = require('../controllers/auth_ctrl'); //authorisation controls
const token =require('../middleware/is-auth');

router.use('/testing',token,ctrl_0.ctrl_0);
router.use('/addpost',token,ctrl_0.ctrl_1);
router.get('/post/:postId',token,ctrl_0.ctrl_2);//route for viewing single post with a dynamic route

//routes for authentication
router.put('/signup',  
    //middleware for validation of incoming POST request
    /*[ body('password').trim().islength({min:5}) ] ,*/
    auth_ctrl.signup
    )
//route for signining-in the user:
router.post('/login', auth_ctrl.login) 
    
module.exports = {'router':router};
