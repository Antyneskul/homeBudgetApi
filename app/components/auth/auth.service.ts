import jwt from 'jsonwebtoken';
import { validEmail, validPassword } from '../../utils/validation';
import { User } from '../user/user.model';
import { IUser } from '../user/user.interface';

const sanitize = require('mongo-sanitize');

export const tokenForUser = (user: IUser) => jwt.sign({
    sub: user.id,
    iat: new Date().getTime()
}, process.env.JWT_SECRET as string);

export const findUser = async (email: string, password: string) => {
    if (!validEmail(email) || !validPassword(password)) {
        throw 'You must provide valid email and password';
    }

    let user = await User.findOne({email: sanitize(email)});

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
