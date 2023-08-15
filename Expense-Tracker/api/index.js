const express = require('express');
const cors = require('cors');
require('dotenv').config();
const transaction = require('./models/transaction.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test',(req,res) => {
    res.json('Test OK1');
});

app.post('/api/transaction', async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const {name,desc,dateTime,price} = req.body;
    const trans = await transaction.create({name,desc,dateTime,price});
    res.json(req.body);
});

app.get('/api/transactions',async (req,res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const trans = await transaction.find();
    res.json(trans);
});

app.listen(3001);
