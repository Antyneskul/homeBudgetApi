import { Router } from 'express';
import { addTransactions, deleteTransaction, getTransactions, updateTransaction } from './transaction.controller';

const transactionsRouter = Router();

transactionsRouter.get('/', getTransactions);
transactionsRouter.post('/', addTransactions);
transactionsRouter.put('/:id', updateTransaction);
transactionsRouter.delete('/:id', deleteTransaction);

export { transactionsRouter };
