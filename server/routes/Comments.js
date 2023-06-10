const express = require('express');
const router = express.Router();
const {Comments} = require('../models')
const { validateToken } = require("../middlewares/AuthMiddleWare")

router.get("/:postId", async (req,res)=>{
    const payload = req.params.postId;

    const comments = await Comments.findAll({where : {PostId:payload}});
    res.json(comments);
})

router.post("/",validateToken, async (req,res)=>{
    const payload = req.body
    payload.username = req.user.username;
    await Comments.create(payload)
    res.json(payload)
})

router.delete("/:id", async (req,res)=>{
    const payload = req.params.id
    await Comments.destroy({where: {id: payload}})
    res.send('comment deleted successfully')
})

module.exports = router;