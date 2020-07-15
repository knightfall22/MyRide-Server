const jwt = require('jsonwebtoken'),
      mongoose = require('mongoose'),
      Driver = mongoose.model('Driver');

module.exports = (req,res,next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).send({error:'Driver must be loggin'})
    }

    jwt.verify(token, "ADF344@@t", async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "Driver must be loggin" });
      }

      const { driverId } = payload;

      const driver = await Driver.findById(driverId);
      req.driver = driver;
      next();
    });
}
