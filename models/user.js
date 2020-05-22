const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userschema = new schema({
                    email:{type:String,
                            required:true },
                    password:{type:String,
                              required:true, },
                    name: {type:String,
                            required:true,},
                    status:{type:String,
                            default:'new testing'},
                    posts:{type:[{type:schema.Types.ObjectId,
                                 ref:'Post'} ],
                            required:true},
                    });

const User = mongoose.model('User',userschema);

module.exports = User;