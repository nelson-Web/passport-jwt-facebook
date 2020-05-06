const router = require("express").Router();
const passport = require("passport");
const User = require('../models/user')
const jwt = require('jsonwebtoken') //importamos el modulo para crear el token
//rutas para facebook
//rutas para facebook
router.get(
  "/auth/facebook",
  passport.authenticate("sign-in-facebook", {
    scope: ["email"],
  })
);

router.get("/auth/facebook/callback",passport.authenticate("sign-in-facebook", { session: true }),
  function (req, res) {
    if (req.user) { 
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      res.cookie('token', token)  
      console.log('el token es ',token);
          
      res.redirect(`http://localhost:8080/about`);
    } else {
      failureRedirect: `http://localhost:8080/`;
    }
  }
);

router.get(
  "/auth/facebook/signin",
  passport.authenticate("sign-up-facebook", { session: true }),
  function (req, res) {
    if (req.user) {
      const token = jwt.sign({id: req.user._id}, 'top_secret', {
        expiresIn: 60 * 60 * 24 // equivalente a 24 horas
      })
      res.cookie('token', token) 
      res.redirect(`http://localhost:8080/animales`);
    } else {
      failureRedirect: `http://localhost:8080/`;
    } 
  }
);

module.exports = router;
