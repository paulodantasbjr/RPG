const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({msg: 'Access Denied'})

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch(err) {
        res.status(400).json({msg:'Invalid Token'}); 
    }
}