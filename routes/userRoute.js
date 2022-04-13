const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { route } = require('express/lib/application');
const {requireLogin} = require('../middleware/auth');

//Register user
router.post('/register', async (req, res)=>{
    const {name, email, password} = req.body;
    try {
        let user = await User.findOne({email}) //provjera da li postoji user u bazi sa istim mail-om
        if(user){
            return res.status(400).json({ error: 'User already exists!' });
        }
        const hashed_password = await bcrypt.hash(password, 10)// 10 je salt
        user = new User({
            name,
            email,
            password: hashed_password
        })
        await user.save();
        return res.status(201).json({message: 'User created successfully'})
        
    } catch (err) {
        console.log(err)
    }
})

//Login user
router.post('/login', async (req, res)=>{
    const {email, password} = req.body;
    try {
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: 'Invalid credentials!'})
        }
        const isMatched = await bcrypt.compare(password, user.password)//f-ja za poređenje unesene šifre i šifre iz baze
        if(!isMatched){
            return res.status(400).json({error: 'Invalid credentials!'})
        }
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"}); //dodjeljujemo token user-u koji je uspješno logovan
        return res.json({token});
    } catch (err) {
        console.log(err.message)
    }

})

//Protected route da testiramo verifikaciju token-a
router.get('/',requireLogin, async (req, res)=>{
    console.log(req.user)
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.json(user);
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;