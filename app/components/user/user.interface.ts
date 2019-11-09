import { Document } from 'mongoose';
import { ITransaction } from '../transaction/transaction.interface';

export interface IUser extends Document {
    password: string;
    email: string;
    transactions?: Array<ITransaction>;
    sharedAccounts: Array<string>;

    comparePassword(candidatePassword: string, callback: Function): void;
}
