const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = 'MehulB$hinemre';

// ROUTE 1 : Create user using : POST "/api/auth/createuser" . Doesnt require Auth
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name ").isLength({ min: 3 }),
    body("password", "Password must be atleast 8 Characters").isLength({
      min: 8,
    }),
    body("email", "Enter a valid email ").isEmail(),
  ],
  async (req, res) => {
    // console.log(req.body);
    // const user = User(req.body)
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {


      let success = false
      let user = await User.findOne({
        email: req.body.email,
      });
      // console.log(user);

      if (user) {
       
        return res.status(400).json({success, error: "User with email exists " });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        id: user._id
      }
      const authToken = jwt.sign(data, JWT_SECRET)
  
      res.json({success : true, authToken })
      // .then(user => res.json(user)).catch(err => {console.log(err) ,res.json({
      //     error : 'Enter an unique value for email !' ,
      //     message : err.message
      // })});
      res.json({ user })
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured")
    }

  }

);

//ROUTE 2 : Authenticate user  POST /api/auth/login NO LOGIN REQUIRED
router.post(
  "/login",
  [
    body("email", "Enter a valid email ").isEmail(),
    body("password", "Password cannot be blank").exists()
  ],
  async (req, res) => {
     

    const errors = validationResult(req);
    let success = false
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: 'Please try to login with correct credentials' })

      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ error: 'Please try to login with correct credentials' })
      }

      const payLoad = {
        user: {
          id: user.id
        }
      }
      const authToken = jwt.sign(payLoad, JWT_SECRET)
      res.json({ success:true , authToken })


    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured")

    }
  })


// ROUTE 3 : Getting user details  POST /api/auth/getuser . Login required
router.post(
  "/getuser", fetchUser ,async (req, res) => {
    try {
      const userID = req.user._id;
      const user = await User.findById(userID).select("-password")
      res.send(user)

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured")
    }
  })


module.exports = router;
