// middleware/passport-setup.js

import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import User from '../models/user.model.js';

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/api/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ email: profile.emails[0].value });
    if (existingUser) {
        return done(null, existingUser);
    }
    const user = await new User({
        email: profile.emails[0].value,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        role: 'user',
        subscription: 'free',
        subscriptionStatus: 'trial',
    }).save();
    done(null, user);
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/api/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ email: profile.emails[0].value });
    if (existingUser) {
        return done(null, existingUser);
    }
    const user = await new User({
        email: profile.emails[0].value,
        firstName: profile.displayName.split(' ')[0],
        lastName: profile.displayName.split(' ')[1] || '',
        role: 'user',
        subscription: 'free',
        subscriptionStatus: 'trial',
    }).save();
    done(null, user);
}));
