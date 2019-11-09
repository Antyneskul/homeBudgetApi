import { Document } from "mongoose";

export interface ITransaction extends Document {
    type: string;
    amount: number;
    userId: string;
    category: string;
}
