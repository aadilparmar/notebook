const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
const JWT_SECRET = "Aadilisgoodb@&%oy";
var jwt = require("jsonwebtoken");
const fetchuser=require('../middleware/fetchuser')
//ROUTE 1 :creating a new User using post "api/auth/createuser".No login required
router.post(
  "/createuser",
  [
    body("email", "enter valid email").isEmail(),
    body("name", "enter valid name").isLength({ min: 3 }),
    body("password", "enter valid password of 5 chars").isLength({ min: 3 }),
  ],
  async (req, res) => {
    //if there are errors return errors and the bad req
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already Exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);
//ROUTE 2 :Authenticate a User using post "api/auth/login".No login required
router.post(
  "/login",
  [
    body("email", "enter valid email").isEmail(),
    body("password", "Enter Password").exists(),
  ],
  async (req, res) => {
    //if there are errors return errors and the bad req
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ result: result.array });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Enter valid Login id or Password" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Enter valid Login id or Password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Sever error occured");
    }
  }
);

//ROUTE 3 : Getting user detail using post "api/auth/getuser". login required
router.post(
  "/getuser",fetchuser,async (req, res) => {
    try {
      let userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) { 
      console.error(error.message);
      res.status(500).send("Internal Sever error occured");
    }
  }
);
module.exports = router;
