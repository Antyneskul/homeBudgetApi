import passport from 'passport';
import {User} from "../db/models/user";
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import {Strategy as LocalStrategy} from 'passport-local';

//Setup Options for JWT Strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'secret'
};

const localOptions = {usernameField: 'email'};
//Create local Strategy
const localLogin = new LocalStrategy(localOptions, async (email: string, password: string, done: Function) => {
    try {
        const user = await User.findOne({email});

        if (!user) {
            return done(null, false);
        }
        //compare passwords - is 'password' equal to user.password?
        user.comparePassword(password, (err: any, isMatch: boolean) => {
            if (err) {
                return done(err);
            }

            if (!isMatch) {
                return done(null, false);
            }

            return done(null, user);
        });
    } catch (err) {
        return done(err, false);
    }


});

//Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = User.findById(payload.sub);

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
});

//Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
