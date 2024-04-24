//imports
var express = require('express');
var router = express.Router();
const User = require('../model/User');
const jwt = require("jsonwebtoken");


const timeout = 3600;

//Função para gerar o Token JWT
const generateToken = (params = {}, timeout = 3600) => {
    return jwt.sign(params, process.env.JWT_SECRET, {expiresIn: timeout});
}

//Rotas
router.post("/", (req, res) => {
    const {email, password} = req.body;
    
    //verificar se o usuario existe no banco
    const User = User.findOne({email, password});

    //verificar credeciais do usuário
    if(!user)
        return res.status(400).json({message: "Credenciais inválidas"});


    const now = Date.now;
    //Gerar o token JWT
    const resposta = {
        toke: generateToken({id: user.id}),
        user,
        loggedId: now,
        expireIn: new Date(now.getTime() + timeout * 1000)  
    }

    
});



module.exports = router;