const mongoose = require('mongoose'),
      bcrypt = require('bcrypt'),
      validator = require('validator')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    minlength: 1,
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
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    minlength: [6, 'password too small'],
    required: true,
  },
});

userSchema.pre('save',function (next) {
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
userSchema.methods.comparePassword = function (password) {
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
mongoose.model('User',userSchema)