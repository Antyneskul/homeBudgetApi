import express from 'express';
import {signin, signup} from '../controllers/auth';
import {requireAuth, requireSignIn} from '../middlewares/auth';

const applyRoutes = (app: express.Express) => {
    app.get('/', requireAuth, (req, res) => {
        res.send({hi: 'there'})
    });
    app.post('/signin', requireSignIn, signin);
    app.post('/signup', signup);
};


export { applyRoutes };
