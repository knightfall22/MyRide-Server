const express = require("express");
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')

const router = express.Router();

router.post('/user/signup',async (req,res) => {
    const {email,password,phoneNumber,fullName} = req.body;

    try {
      const user = new User({ email, password,phoneNumber,fullName });
      await user.save();

      const token = jwt.sign({userId: user._id}, 'ADF344@@t')
      res.header('Authorization',token).send({token});      
    } catch (error) {
       return res.status(422).send(error.message)
    }

})

router.post('/user/signin',async (req,res) => {
  const {email,password} = req.body;

  if (!email || !password) {
    return res.send({error:'Must provide email and password'}).status(422)
  }

  const user = await User.findOne({email})
  if (!user) {
    return res.send({ error: "Invalid password or email" }).status(402)
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "ADF344@@t");
    res.header('Authorization', token).send({ token });  

  } catch (error) {
     return res.status(404).send({ error: "Invalid password or email" });
  }
  
})

module.exports = router