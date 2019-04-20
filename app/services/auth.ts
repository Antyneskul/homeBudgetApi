import jwt from 'jsonwebtoken';
import {IUserModel, User} from '../db/models/user';
import {validEmail, validPassword} from '../utils/validation';

export const tokenForUser = (user: IUserModel) => {
    const timestamp = new Date().getTime();
    return jwt.sign({sub: user.id, iat: timestamp}, 'secret');
};


export const findUser = async (email: string, password: string) => {
    if (!validEmail(email) || !validPassword(password)) {
        throw 'You must provide valid email and password';
    }

    let user = await User.findOne({email});

    if (user) {
        throw 'User already exists';
    }

    const userModel = new User({
        email,
        password
    });

    user = await userModel.save();

    return user;
};
