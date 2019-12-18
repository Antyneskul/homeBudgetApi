import express from 'express';
import { IUser } from '../user/user.interface';
import { findAll, findBetweenDates } from './transaction.service';
import { ITransaction } from './transaction.interface';

const getTransactions = async (req: express.Request, res: express.Response) => {
    const {id: userId} = req.user as IUser;
    const {startDate, endDate} = req.query;

    let data: ITransaction[];

    try {
        data = (!startDate || !endDate)
            ? await findBetweenDates(userId, startDate, endDate)
            : await findAll(userId);

        res.send({
            data
        });
    } catch (err) {
        res.send(err.message);
    }
};


const addTransactions = () => {

};

const updateTransaction = () => {

};

const deleteTransaction = () => {
};


export { getTransactions, addTransactions, updateTransaction, deleteTransaction };
