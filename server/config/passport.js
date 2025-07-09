// import dotenv from 'dotenv';
// dotenv.config(); // must come before accessing process.env

// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL,
// }, async (accessToken, refreshToken, profile, done) => {
//   try {
//     let user = await User.findOne({ googleId: profile.id });

//     if (!user) {
//       user = await User.create({
//         googleId: profile.id,
//         email: profile.emails[0].value,
//         firstName: profile.name.givenName,
//         lastName: profile.name.familyName
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     done(null, { user, token });

//   } catch (err) {
//     done(err, null);
//   }
// }));


// import dotenv from 'dotenv';
// dotenv.config(); // must come before accessing process.env

// import passport from 'passport';
// import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL,
// },
// async (accessToken, refreshToken, profile, done) => {
//   try {
//     const googleId = profile.id;
//     const email = profile.emails?.[0]?.value;
//     const firstName = profile.name?.givenName || '';
//     const lastName = profile.name?.familyName || '';

//     if (!email) {
//       return done(new Error("Google account did not provide an email."), null);
//     }

//     // Check for existing user by email
//     let user = await User.findOne({ email });

//     if (user) {
//       // If user exists but no googleId, update it
//       if (!user.googleId) {
//         user.googleId = googleId;
//         await user.save();
//       }
//     } else {
//       // Create new user
//       user = await User.create({
//         googleId,
//         email,
//         firstName,
//         lastName
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email },
//       process.env.JWT_SECRET,
//       { expiresIn: '1d' }
//     );

//     done(null, { user, token });

//   } catch (err) {
//     console.error("Error in Google Strategy:", err);
//     done(err, null);
//   }
// }));
