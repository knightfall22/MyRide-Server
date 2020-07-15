const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Driver',
        unique:true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    sitNumber: {
        type: String,
        required: true         
    },
    insuranceCompany: {
        type: String,
        required: true         
    },
    insurancePolicy: {
        type: String,
        required: true         
    }

})

mongoose.model('Vehicle', vehicleSchema)