const jwt = require('jsonwebtoken'),
      mongoose = require('mongoose'),
      USer = mongoose.model('User');

module.exports = (req,res,next) => {
    let token = req.header("Authorization");

    if (!token) {
        return res.status(401).send({error:'You must be loggin'})
    }

    jwt.verify(token, "ADF344@@t", async (err, payload) => {
      if (err) {
        return res.status(401).send({ error: "You must be loggin" });
      }

      const { userId } = payload;

      const user = await USer.findById(userId);
      req.user = user;
      next();
    });
}
