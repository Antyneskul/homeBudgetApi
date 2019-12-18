import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../user/user.model';

const sanitize = require('mongo-sanitize');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET // TODO: Move to .env
};

const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy(localOptions, async (email: string, password: string, done: Function) => {
    try {
        const user = await User.findOne({email: sanitize(email)});

        if (!user) {
            return done(null, false);
        }

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


const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(sanitize(payload.sub));

        if (user) {
            done(null, {id: user._id});
        } else {
            done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
});

passport.use(jwtLogin);
passport.use(localLogin);

export const requireAuth = passport.authenticate('jwt', {session: false});
export const requireSignIn = passport.authenticate('local', {session: false});
