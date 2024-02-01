import User from '../models/user.model.js'
import bcryptjs  from 'bcryptjs'
import { errorHandle } from '../ultils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password || username === '' || email === '' || password === ''){
        next(errorHandle(400, "All fields are required!"))
    }

    const hashPassword = bcryptjs.hashSync(password, 10)

    const newUser  = new User({
        username,
        email,
        password: hashPassword
    })

    try {
        await newUser.save();
        res.json('Sign Up Successfully!')
    } catch (error) {
        next(error)
    }
}



export const signin = async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        next(errorHandle(400, "All fields are required!"))
    }
    try {
        const validateUser = await User.findOne({email})
        if(!validateUser){
            next(errorHandle(404, 'User not found!'))
        }

        const validatePassword = bcryptjs.compareSync(password, validateUser.password);
        if(!validatePassword){
            next(errorHandle(404, 'Invalid password!'))
        }

        const token = jwt.sign({id: validateUser._id}, process.env.JWT_SECRET)

        const {password : pass, ...rest} = validateUser._doc;

        res.status(200)
        .cookie('access_token', token, {
            httpOnly: true
        })
        .json(rest)
    } catch (error) {
        next(error)
    }
}

export const google = async(req, res, next) => {
    const {name, email, googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;

            res.status(200).cookie('access_token', token,{
                httpOnly: true,
            }).json(rest)
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcryptjs.hashSync(generatePassword, 10);

            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });

            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const {password, ...rest} = newUser._doc;

            res.status(200)
            .cookie('access_token', token, {
                httpOnly: true
            }).json(rest)
        }
        
    } catch (error) {
        
    }
}
