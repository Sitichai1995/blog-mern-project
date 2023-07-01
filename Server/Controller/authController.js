const jwt = require("jsonwebtoken")
const { expressjwt: eJWT } = require("express-jwt");

 exports.login = async (req,res) => {
    //ข้อมูล username,password
    const {username,password} = req.body
    if(password === process.env.PASSWORD){
       const token = jwt.sign({username},process.env.JWT_SECRET,{expiresIn:"1d"})
       return res.json({token,username})
    }else{
        res.status(400).json ({
            error: "Invalid password"
        })
    }
   
}

exports.requireLogin = eJWT({
    secret: process.env.JWT_SECRET,
    algorithms:["HS256"],
    useProperty:"auth"
})