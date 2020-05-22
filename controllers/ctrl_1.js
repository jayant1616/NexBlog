const express = require('express');
const Post = require('../models/test_1');

//handles feed page
const ctrl_0 = (request,response,next)=>{
            
    Post.find().
    then( result=>{ console.log('from ctrl_0',result);
                    response.status(200).json({ posts:result });
} )
}

//handles new post creation and saving in database
const ctrl_1 = (request,response,next)=>{
               let title=request.body.title;
               let content = request.body.content;

                const post = new Post({
                    title:title,
                    content:content,
                    imageURL:'/images/Pass.jpeg',
                    creator: {name:'test_2'} 
                });
                post.save().then( result=>{
                    console.log(result);
                    response.json({
                        post:result,
                    })
                } )}

//handles individual post                 
const ctrl_2 = (request,response,next)=>{
    postId = request.params.postId; //dynamically getting post id
    console.log(postId);
    Post.findById(postId).
    then(result=>{ console.log(result);
        response.json({
        post:result,messsage:'test_message'
                }) ;
})


}

module.exports  = {"ctrl_0":ctrl_0,
                    "ctrl_1":ctrl_1, 
                    "ctrl_2":ctrl_2,               }
                    