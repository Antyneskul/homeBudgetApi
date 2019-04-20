import express from 'express';
import {requireAuth, requireSignIn} from '../middlewares/auth';
import {signIn, signUp} from '../controllers/auth';

const applyRoutes = (app: express.Express) => {
    app.get('/', requireAuth, (req, res) => {
        res.send({hi: 'there'})
    });

    app.post('/signin', requireSignIn, signIn);
    app.post('/signup', signUp);
};


export { applyRoutes };
