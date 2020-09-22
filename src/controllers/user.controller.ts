import {Request, Response} from 'express';
import User, { IUser } from '../models/users';
import jwt from 'jsonwebtoken';
import config from '../config/config'   


function createToken(user: IUser) {
    jwt.sign({id: user.id, email: user.email}, config.jwtSecret, {
        expiresIn: 84000
    })

}

export const signUp = async (req: Request, res:Response): Promise <Response>  => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'algo esta mal'});
    }

   const user = await User.findOne({ email: req.body.email })
   if (user) {
    return res.status(400).json({msg: 'el usuario ya existe'});
   }

  const newUser = new User(req.body);
  await newUser.save();

  return res.status(201).json(newUser);
};






export const signIn = async (req: Request, res:Response) => {
    
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({msg: 'algo esta mal'});
    }

    const user = await User.findOne({email: req.body.email})
    if (!user) {
        return res.status(400).json({msg: 'the user does not exixst'})
    }

    const isMatch = await user.comparePassword(req.body.password)
    if (isMatch) {
        return res.status(200).json({token: createToken(user)})
    }
    return res.status(400).json({msg:'puto'})


}
