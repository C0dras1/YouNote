const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // hash passwords
const jwt = require('jsonwebtoken'); // authenticate users

const User = require('../models/user');

// create a user
router.post("/", async(req, res) => {
  const { username, password } = req.body;
  // simple validation for password
  if(password.length < 6) {
    res.status(500).json({msg: "Password length must be greater than 6 characters."});
    return;
  }

  let newUser = newUser({
    username,
    passwordHash: bcrypt.hashSync(password, 10),
    numNotes: 0
  });

  newUser
    .save()
    .then(user => {
      jwt.sign({
        username: newUser.username
      }, 'secret', (err,token) => {
        if(err) throw err;
        res.send({
          token,
          user: {
            username: user.username
          }
        });
      });
    }).catch(err => {
      console.log(err);
      res.status(500).json({msg: `User ${err.keyValue['username']} already exists. Try logging in.`})
    });
});

// login route
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({username})
    .then(user => {
      if(!user) {
        res.status(500).json({msg: "No User with that username: " + username});
        return;
      } else if (!bcrypt.compareSync(password, user.passwordHash)) {
        res.status(500).json({msg: "Invalid Password"});
      }

      jwt.sign({
        username: newUser.username
      }, 'secret', (err,token) => {
        if(err) throw err;
        res.send({
          token,
          user: {
            username: user.username
          }
        });
      });
    }).catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
})
