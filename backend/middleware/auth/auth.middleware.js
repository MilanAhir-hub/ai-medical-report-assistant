import jwt from 'jsonwebtoken';
import tokenBlacklist from '../../models/tokenBlacklist.model.js';

export const protect = async (req, res, next) =>{
    const header = req.headers.authorization;
    // console.log("Auth Header:", header); // Debug log

    if(!header || !header.startsWith("Bearer ")){
        console.log("No Bearer token found");
        return res.status(400).json({
            message: "Token missing"
        });
    }

    const token = header.split(' ')[1]; // ['Bearer', 'token...'] so token = index1
    // console.log("Token:", token);

    //set token here for later use
    req.token = token;

    const blackListed = await tokenBlacklist.findOne({token});

    if(blackListed){
        console.log("Token is blacklisted");
        return res.status(401).json({
            message: 'Token is blacklisted'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Token verified:", decoded);

        req.user = decoded; //userId + role both into this
        next();
    } catch (error) {
        console.log("JWT Verification Error:", error.message);
        res.status(401).json({
            message: 'Invalid or expired token',
            error: error.message
        })
    }
};