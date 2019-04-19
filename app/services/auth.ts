import jwt from 'jsonwebtoken';
import {IUserModel, User} from '../db/models/user';

export const tokenForUser = (user: IUserModel) => {
    const timestamp = new Date().getTime();
    return jwt.sign({sub: user.id, iat: timestamp}, 'secret');
};


export const findUser = async (email: string, password: string) => {
    const validEmail = (email: string) => {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return email && regExp.test(email);
    };

    const validPassword = (password: string) => {
        const regExp = /^[A-Za-z]\w{7,15}$/;
        return password && regExp.test(password);
    };

    if (!validEmail(email) || !validPassword(password)) {
        throw 'You must provide valid email and password';
    }

    //See if a user with the given email exists
    let user = await User.findOne({email});
    //If a user with email does exists, return an error
    if (user) {
        throw 'User already exists';
    }
    //If a user with email does NOT exist, create and save a record
    const userModel = new User({
        email,
        password
    });

    user = await userModel.save();

    return user;
};
