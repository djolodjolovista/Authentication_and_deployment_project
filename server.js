const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const userRoute = require('./routes/userRoute');
const cors = require('cors');
const path = require('path');

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

//Serve build
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> console.log("Server is running!"))