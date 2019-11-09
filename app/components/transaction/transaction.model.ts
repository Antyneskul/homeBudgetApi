import { model, Model, Schema } from 'mongoose';
import { ITransaction } from './transaction.interface';

const TransactionSchema: Schema = new Schema({
    type: {
        type: String,
        lowercase: true
    },
    category: String,
    amount: Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});


export const Transaction: Model<ITransaction> = model<ITransaction>('Transaction', TransactionSchema);

