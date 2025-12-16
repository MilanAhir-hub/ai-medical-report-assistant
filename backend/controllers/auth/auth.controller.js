import User from "../../models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import tokenBlacklistModel from "../../models/tokenBlacklist.model.js";

export const signup = async(req, res) =>{
    try {
        const {name, email, password, mobile} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({  // if process will be end here, use return otherwise not
                success: false,
                message: 'All fields are required!'
            })
        }

        //check existance of user
        const existUser = await User.findOne({email});

        if(existUser){
            return res.status(409).json({
                success: false,
                message: 'User already exists'
            })
        }

        //store hashPass
        const hashedPassword = await bcrypt.hash(password, 10); // 10 = salt rounds 

        //let create user in db
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            mobile: mobile
        });

        //send success response
        res.status(201).json({
            success: true,
            message: 'User created successfully!'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Registration failed!',
            error: error.message
        })
    }
}

export const login = async(req, res) =>{
   try {
     const {
         email,
         password
     } = req.body;

     if (!email || !password) {
         return res.status(400).json({
             success: false,
             message: "Email and password are required!"
         });
     }

     //find user using email
     const user = await User.findOne({email});

     if(!user){
        return res.status(401).json({
            success: false,
            message: "Email not found, kindly check your email and try again!"
        })
     }

     //compare both passwords
     const isMatch = await bcrypt.compare(password, user.password);
     if(!isMatch){
        return res.status(401).json({
            success: false,
            message: 'Invalid password, cannot login'
        });
     }

     //generate jwt token
     const token = jwt.sign({
        userId: user._id
     },
    process.env.JWT_SECRET,
    {
        expiresIn: '7d'
    }
);

    //let send success response
    res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user.id, //string id for frontend
            name: user.name,
            email: user.email
        }
    })

   } catch (error) {
    res.status(500).json({
        success: false,
        message: 'Login failed!',
        error: error.message
    })
   }
}

//logout stateless
export const logout =  async(req, res) =>{
    const token = req.token;

    await tokenBlacklistModel.create({
        token,
        expiresAt: new Date(req.user.exp * 1000) //JWT stores expiration in seconds, while JavaScript Date uses milliseconds. Multiplying by 1000 converts the JWT exp value into a valid Date object.
    });

    res.status(200).json({
        success: true,
        message: 'Logged out successfully!'
    });
}