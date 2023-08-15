//import {model, Schema} from "mongoose";
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const transSchema = new Schema({
    name: {type: String, required:true},
    price: {type: Number, required:true},
    dateTime: {type: Date, required:true},
    desc: {type: String, required:true},
});

const transModel = model('transaction', transSchema);

module.exports = transModel;