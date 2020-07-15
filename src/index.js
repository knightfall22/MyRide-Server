require('./model/User')
require('./model/Driver/Driver')
require('./model/Driver/Payment')
require('./model/Driver/Vehicle')
const express = require("express");

const app = express();
const mongoose =require("mongoose");
const UserAuthRoutes = require('./routes/User/UserAuthRoutes');
const DriverAuthRoute = require('./routes/Driver/DriverAuthRoute');
const DetailRegistration = require('./routes/Driver/DetailRegistration');
const bodyPaser = require('body-parser')
const requireAuth = require('./middleware/requireAuth')
const cors = require('cors')

app.use(cors())
app.use(bodyPaser.json())
app.use(UserAuthRoutes)
app.use(DriverAuthRoute)
app.use(DetailRegistration)



const mongoURI = //Add Mongo DB Cloud URI
mongoose.connect(mongoURI,{ 
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',() => {
    console.log('Connected to mongo instance')   
})
mongoose.connection.on('error',(err) => {
    console.error('Error connecting to mongo',err)   
})

app.get('/',requireAuth,(req,res) => {
    res.send(`Your Email: ${req.user.password}`)
})

app.listen(3000,() => {
    console.log('Listening on PORT 3000');
    
})
