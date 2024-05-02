const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./user.model');
const app = express();
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4,
    
})
.then(() => {
    console.log("mongodb Connected!")
})
.catch((err) => {
    console.log("failed to Connect!", err)
})

app.post('/api/register', async (req, res) => {
    console.log(req.body);
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            res.json({ status: 'error', error: 'Duplicate email' });
            return;
        }
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({ status: 'ok' });
    } catch (err) {
        console.error(err);
        res.json({ status: 'error', error: 'Internal server error' });
    }
});

//Login Route
app.post('/api/login', async (req,res) => {
    const user = await User.findOne({ 
        email: req.body.email, 
        password: req.body.password, 
    });

    if(user) {

        const token = jwt.sign({
            name: user.name,
            email: user.email,
        }, "12345")

        return res.json({ status: 'ok', user: token })
    } else {
        return res.json({ status: 'error', user: false });
    }
});

app.listen(5001, () => {
    console.log("Server started on 3001");
});