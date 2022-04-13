const jwt = require('jsonwebtoken');

//Authentication middle
//exportovali smo f-ju requireLogin
exports.requireLogin = (req, res, next)=>{
    try {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1];
            //Verifikacija token-a
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            //Zakačimo token na request
            req.user = decode;
            
            next(); //prosleđujemo sledecoj f-ji
        } else{
            return res.status(400).json({message: "Unauthorized"})
        }
    } catch (err) {
        console.log("Something went wrong!")
    }
}