const express = require('express');
const router = express.Router();
const {Users} = require('../models')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const {validateToken} = require('../middlewares/AuthMiddleWare')

router.post("/", async (req,res)=>{
const {username,password} = req.body;
bcrypt.hash(password, 10).then(async (result)=>{
    await Users.create({username:username,password:result})
    res.json('SUCCESS');
})
})

router.post("/login", async (req,res)=>{
    const {username,password} = req.body;
    const user = await Users.findOne({where: {username:username}})
    if(!user) res.json({error:"User doesn't exist"})
    bcrypt.compare(password, user.password).then((result)=>{
        if(!result) res.json({error: 'wrong username or password'})

        const accessToken = sign({username:user.username, id:user.id}, "somesecret" );
        res.json(accessToken)
    })
    })

router.get("/auth",validateToken, async (req,res)=>{
res.json(req.user);
})

module.exports = router;