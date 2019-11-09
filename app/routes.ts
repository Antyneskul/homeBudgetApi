import express from 'express';
import { requireSignIn } from './components/auth/auth.middleware';
import { signIn, signUp } from './components/auth/auth.controller';


const applyRoutes = (app: express.Express) => {
    app.post('/signin', requireSignIn, signIn);
    app.post('/signup', signUp);
};


export { applyRoutes };
