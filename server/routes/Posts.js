const express = require('express');
const router = express.Router();
const {Posts} = require('../models')

router.get("/", async (req,res)=>{
    const listOfPosts = await Posts.findAll();
    res.json(listOfPosts);
});

router.post("/", async (req,res)=>{
const payload = req.body;
await Posts.create(payload);
res.json(payload);
})

router.get("/byId/:id", async (req,res)=>{
    const payload = req.params.id;
    const post = await Posts.findByPk(payload);
    res.json(post);
})
module.exports = router;