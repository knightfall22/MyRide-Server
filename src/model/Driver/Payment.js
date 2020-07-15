const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Driver',
        unique: true
    },
    bankName: {
        type:String,
        require: true
    },
    accountName: {
        type: String,
        require: true        
    },

    accountNumber: {
        type: String,
        require: true 
    }
});

mongoose.model('Payment',paymentSchema)