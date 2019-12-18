import { Router } from 'express';
import { authRouter } from './components/auth/auth.router';
import { transactionsRouter } from './components/transaction/transaction.router';
import { requireAuth } from './components/auth/auth.middleware';

const router = Router();

router.use('/auth', authRouter);
router.use('/transactions', requireAuth, transactionsRouter);

export { router };
