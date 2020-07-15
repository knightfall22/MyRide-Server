const express = require("express"),
     mongoose = require('mongoose'),
  requireDriverAuth = require('../../middleware/requireDriverAuth');
  

const Payment = mongoose.model('Payment'),
      Vehicle = mongoose.model('Vehicle');

const router = express.Router();

router.use(requireDriverAuth)

router.post('/driver/payment',async (req,res) => {
   const {bankName,accountName,accountNumber} = req.body;

   try {
    const payment = new Payment({ bankName, accountName,accountNumber,driverId: req.driver._id });
    await payment.save();
    res.send(payment);
  } 
  catch (err) {
    res.status(422).send({error: err.message})
  }
})

router.post('/driver/vehicle',async (req,res) => {
   const {
     color,
     registrationNumber,
     model,
     manufacturer,
     sitNumber,
     insuranceCompany,
     insurancePolicy,
   } = req.body;

   try {
    const vehicle = new Vehicle({
      color,
      registrationNumber,
      model,
      manufacturer,
      sitNumber,
      insuranceCompany,
      insurancePolicy,
      driverId: req.driver._id,
    });
    await vehicle.save();
    res.send(vehicle);
  } 
  catch (err) {
    res.status(422).send({error: err.message})
  }
})

module.exports = router