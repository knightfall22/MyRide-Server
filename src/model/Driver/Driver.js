const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      validator = require('validator')

const driverSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
  fullName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    minlength: [6, 'password too small'],
    required: true,
  },
  businessName: {
    type: String,
    required: true
  },
  businessAddress: {
    type: String,
    required:true
  },
  registered: {
    type: Boolean,
    default: false
  }

});

driverSchema.pre('save',function (next) {
  const user = this;
  if (!user.isModified('password')) {
      return next();
  }
  //Password encryption
  bcrypt.genSalt(12, (err,salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, (err,hash) => {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next()
    })
  })

})

//Test encrypted password against inputted password
driverSchema.methods.comparePassword = function (password) {
  const user = this;
  return new Promise ((resolve,reject) => {
    bcrypt.compare(password,user.password,(err,isMatch) => {
      if (err) {
        return reject(err)
      }
      if(!isMatch){
        return reject(false)
      }

      resolve(true)
    })
  })
} 


mongoose.model("Driver", driverSchema);
