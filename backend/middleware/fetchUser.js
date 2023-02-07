var jwt = require('jsonwebtoken');

const JWT_SECRET = 'MehulB$hinemre';

const fetchUser = (req,res,next) =>{
    // Get user from JWT token and add ID to req obj
    const token = req.header('auth-token');

    if(!token){
        res.status(401).send({error : 'Access Denied'})
    }
    try {
        const data = jwt.verify(token , JWT_SECRET);
        console.log(data);
        req.user = data;
        console.log(req.user);
        next ();       
    } catch (error) {
        res.status(401).send({error : 'Access Denied'})
        
    }

 

}

module.exports = fetchUser;