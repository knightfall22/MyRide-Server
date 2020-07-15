const express = require("express"),
     mongoose = require('mongoose'),
          jwt = require('jsonwebtoken'),
       Driver = mongoose.model('Driver');

const router = express.Router();

router.post('/driver/signup',async (req,res) => {
    const {email,password,phoneNumber,fullName,state,businessName,businessAddress} = req.body;

    try {
        const driver = new Driver( {email,password,state,phoneNumber,fullName,businessName,businessAddress});
        await driver.save();
  
        const token = jwt.sign({driverId: driver._id}, 'ADF344@@t')
        res.header('Authorization',token).send({token});      
      } catch (error) {
         return res.status(422).send(error.message)
      }  

})


router.post('/driver/signin',async (req,res) => {
    const {email,password} = req.body;
  
    if (!email || !password) {
      return res.status(422).send({error:'Must provide email and password'});
    }
  
    const driver = await Driver.findOne({email})
    if (!driver) {
      return res.status(402).send({ error: "Invalid password or email" });
    }

    if (!driver.registered) {
    return res.status(402).send({ error: "Your account has not been activated" });
    }
    try {
      await driver.comparePassword(password);
      const token = jwt.sign({ driverId: driver._id }, "ADF344@@t");
      res.header('Authorization', token).send({ token });  
  
    } catch (error) {
       return res.status(404).send({ error: "Invalid password or email" });
    }
    
  })



module.exports = router


