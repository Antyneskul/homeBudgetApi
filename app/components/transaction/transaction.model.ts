import { model, Model, Schema } from 'mongoose';
import { ITransaction } from './transaction.interface';

const TransactionSchema: Schema = new Schema({
    type: {
        type: String,
        lowercase: true
    },
    category: String,
    amount: Number,
    createdAt: Date,
    userId: {
        type: Schema.Types.ObjectId
    }
});


export const Transaction: Model<ITransaction> = model<ITransaction>('Transaction', TransactionSchema);

