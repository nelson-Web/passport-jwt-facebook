const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});


passport.use(
  "sign-in-facebook",
  new FacebookStrategy(
    {
      clientID: 257635703, // coloca tu propio clientID
      clientSecret: "3af7d2f763064",// coloca tu propio secret
      callbackURL: "http://localhost:3000/auth/facebook/callback",
      profileFields: ["email", "name", "photos","profileUrl"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findById(profile.id);
      if (user) {
        return done(null,false);
      } else {        
        const { email, first_name, last_name } = profile._json;
        const user = new User();
        (user.email = email),
          (user.firstname = first_name),
          (user.last_name = last_name);
        user._id = profile.id;
        user.imagen = profile.photos[0].value
        await user.save();
        done(null, profile);
      }
    }
  )
);
passport.use(
  "sign-up-facebook",
  new FacebookStrategy(
    {
      clientID: 2576357032629101111111117, // coloca tu propio clientID
      clientSecret: "3af7d2f7630645b43ef7791111111c148e3ce8d",// coloca tu propio secret
      callbackURL: "http://localhost:3000/auth/facebook/signin",
      profileFields: ["email", "name", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findById(profile.id);
      if (user) {
        done(null, user);
      } else {
        return done(null, false);
      }
    }
  )
);
