import {Document, Schema, Model, model} from 'mongoose';
import bcrypt from 'bcryptjs';
import {IUser} from '../../interfaces/user';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String
});

export interface IUserModel extends IUser, Document {
    comparePassword(candidatePassword: string, callback: Function): void
}

//On save Hook, encrypt password
UserSchema.pre('save', function (next) {
    const user = this as IUserModel;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }

            user.password = hash;
            next();
        })
    });
});

UserSchema.methods.comparePassword = function (candidatePassword: string, callback: Function) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    })
};


export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

