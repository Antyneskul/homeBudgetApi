import { Router } from 'express';
import { signIn, signUp } from './auth.controller';
import { requireSignIn } from './auth.middleware';


const authRouter = Router();

authRouter.post('/signin', requireSignIn, signIn);
authRouter.post('/signup', signUp);

export { authRouter };
