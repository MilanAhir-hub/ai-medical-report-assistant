import jwt from 'jsonwebtoken';
import tokenBlacklist from '../../models/tokenBlacklist.model.js';

export const protect = async (req, res, next) =>{
    const header = req.headers.authorization;

    if(!header || !header.startsWith("Bearer ")){
        return res.status(400).json({
            message: "Token missing"
        });
    }

    const token = header.split(' ')[1]; // ['Bearer', 'token...'] so token = index1

    //set token here for later use
    req.token = token;

    const blackListed = await tokenBlacklist.findOne({token});

    if(blackListed){
        return res.status(401).json({
            message: 'Token is blacklisted'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; //userId + role both into this
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Invalid or expired token'
        })
    }
};