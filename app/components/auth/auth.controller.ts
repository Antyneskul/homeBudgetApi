import express from 'express';
import { findUser, tokenForUser } from './auth.service';
import { IUser } from '../user/user.interface';


export const signIn = async (req: express.Request, res: express.Response) => {
    res.send({
        token: tokenForUser(req.user as IUser)
    });
};

export const signUp = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const {email, password} = req.body;

    try {
        const user = await findUser(email, password);

        res.send({
            success: true,
            message: `User with ${email}, was successfully created`,
            token: tokenForUser(user)
        });
    } catch (err) {
        next(err);
        res
            .status(422)
            .send({
                success: false,
                message: err
            });
    }
};
