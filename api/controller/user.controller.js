import User from "../models/user.model.js";
import { errorHandle } from "../ultils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req, res) => {
  res.json({ message: 'API is working!' });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandle(403, 'You are not allowed to update this user'))
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandle(400, 'Password must be at least 6 characters'))
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10)
  }

  if (req.body.username) {
    if (req.body.username.length < 7) {
      return next(errorHandle(400, 'Username must be at least 7 characters'))
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandle(400, 'Username cannot contain spaces'))
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandle(400, 'Username must be lowercase'))
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandle(400, 'Username can only contain letters and numbers'))
    }
  }

  try {
    const updateUser1 = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture
      }
    }, { new: true })

    const { password, ...rest } = updateUser1._doc;
    res.status(200).json(rest)
  } catch (error) {
    next(error)
  }

}

export const deleteUser = async(req, res, next) =>{
  if(req.user.id !== req.params.userId){
    return next(errorHandle(403, 'You are not allowed to delete this user!'))
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has beeen deleted!')
  } catch (error) {
    next(error)
  }
}

export const signOut =  async(req, res, next ) => {
  try {
    res
    .clearCookie('access_token')
    .status(200)
    .json('User has been signed out!')
  } catch (error) {
    next(error)
  }
}