import express from 'express';
import {findUser, tokenForUser} from '../services/auth';

export const signIn = async (req: express.Request, res: express.Response) => {
    res.send({token: tokenForUser(req.user)});
};

export const signUp = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
