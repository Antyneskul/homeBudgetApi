import '../services/passport';
import passport from 'passport';

export const requireAuth = passport.authenticate('jwt', {session: false});
export const requireSignIn = passport.authenticate('local', {session: false});
