import { Transaction } from './transaction.model';

const sanitize = require('mongo-sanitize');


const findAll = async (userId: string) => {
    try {
        return await Transaction.find({userId: sanitize(userId)});
    } catch (err) {
        throw new Error(err.message);
    }
};

const findBetweenDates = async (userId: string, startDate: Date, endDate: Date = new Date()) => {
    let createdAtQuery: { $gte?: Date; $lte?: Date; } = {
        $gte: sanitize(startDate),
        $lte: sanitize(endDate)
    };

    if (!startDate) {
        createdAtQuery = {
            $lte: new Date()
        }
    }

    try {
        return await Transaction.find({
            createdAt: createdAtQuery
        });

    } catch (err) {
        throw new Error(err.message);
    }
};

export {
    findAll,
    findBetweenDates
}
