const mongoose = require('mongoose');

const user = new mongoose.Schema({
    first_name: { type: String, required: true, trim: true, },
    last_name: { type: String, required: true, trim: true, },
    email: { type: String, required: true, trim: true, lowercase: true, unique:true, },
    password: { type: String, required: true, },
    birthday: {type:Date, required: true, },
    gender: {type: String, enum:['male', 'female', 'other']},
    token: { type: String, required: true },
    verifyCode: { type:String },
    active: { type: Boolean, default: false }
}, { timestamps: true })

const userModel = mongoose.model("user", user)
module.exports = { userModel }