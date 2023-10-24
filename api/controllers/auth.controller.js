import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
export const signup = async(req,res,next)=>{
    // console.log(req.body);
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password,10);
    const newUser = new User({username, email, password:hashedPassword});
    try{
        await newUser.save()
        res.status(201).json("User created successfully");
    }
    catch(err){
        // console.log(err);
        // res.status(500).json(err.message); 
        // next(errorHandler(550, "Duplicate username or email"));
        next(err);
    }
};
