const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const cors = require('cors');

//Connect DB
mongoose.connect(process.env.MONGO_URI, {
    
    useNewUrlParser: true,
    
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB is connected!")
}).catch((err) => {
    console.log(err)
});

app.use(cors());
app.use(express.json()) //body parser
//Ovo je middleware
app.use('/auth', userRoute)
const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log("Server is running!"))