import { Model, model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import { IUser } from './user.interface';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    password: String,
    sharedAccounts: [String]
});

UserSchema.pre('save', function (next) {
    const user = this as IUser;

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


export const User: Model<IUser> = model<IUser>('User', UserSchema);

