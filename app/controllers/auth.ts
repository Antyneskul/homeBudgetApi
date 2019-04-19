import express from 'express';
import {findUser, tokenForUser} from '../services/auth';
import {IUserModel} from '../db/models/user';


export interface IUserRequest extends express.Request {
    user: IUserModel
}

export const signin = async (req: express.Request, res: express.Response) => {
    res.send({token: tokenForUser(req.user)});
};


export const signup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

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
