const express = require("express");
const router = express.Router();
const usersCtrl = require("../controllers/api/users");
const ensuredLoggedIn = require("../config/ensuredLoggedIn");
const User = require("../schemas/User");

// POST /api/users
// OLD WAY
// router.post("/", (req, res) => {});
const jwt = require("jsonwebtoken");

router.use(function (req, res, next) {
    // Check for the token being sent in a header or as a query parameter
    let token = req.get("Authorization") || req.query.token;
    if (token) {
      // Remove the 'Bearer ' if it was included in the token header
      token = token.replace("Bearer ", "");
      // Check if token is valid and not expired
      jwt.verify(token, process.env.SECRET, function (err, decoded) {
        // If valid token, decoded will be the token's entire payload
        // If invalid token, err will be set
        req.user = err ? null : decoded.user;
        // If your app cares... (optional)
        req.exp = err ? null : new Date(decoded.exp * 1000);
        return next();
      });
    } else {
      // No token was sent
      req.user = null;
      return next();
    }
});

router.post("/",async function create(req, res) {
    try {
      // Add the user to the database
      // then()
      const user = await User.create(req.body);
      // token will be a string
      const token = createJWT(user);
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
      res.json(token);
    } catch (err) {
      res.status(400).json(err);
    }
  } );

// POST /api/users/login
router.post("/login", async function login(req, res) {
    try {
      // Query our database to find a user with the email provided
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      // if we found the email, compare password
      // 1st argument from the credentials that the user typed in
      // 2nd argument what's stored in the database
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      // if everything checks out, create token, login!
      res.json(createJWT(user));
    } catch {
      res.status(400).json("Bad Credentials");
    }
  });

// GET /api/users/check-token
router.get("/check-token", ensuredLoggedIn, usersCtrl.checkToken);

module.exports = router;


  