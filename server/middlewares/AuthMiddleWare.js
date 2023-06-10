const {verify} = require('jsonwebtoken')

const validateToken = (req,res,next) => {
const accessToken = req.header("accessToken");
if(!accessToken) return res.json({error: 'Unauthorized'})
try {
    const validToken = verify(accessToken, "somesecret");
    req.user = validToken;
    if(validToken){
        return next();
    }
} catch (err) {
    res.json({error:err})
}
}

module.exports = {validateToken};