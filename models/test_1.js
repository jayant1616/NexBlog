const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postschema = new schema({
            title:{type:String,
                    required:true,
                    },
            imageURL:{
                    type:String,
                    required:false,
                    },
            content:{
                    type: {type:String},
                    required:false,
            },
            creator:{type: Object,
                        required : String,     },
}
 ,{timestamps:true,} );

 const Post = mongoose.model('Post',postschema);

 module.exports = Post;
