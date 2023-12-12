import mongoose from 'mongoose'
import  validator  from 'validator';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [24, "Name cannot exceed 24 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"],
      },
      password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [6, "Password should be greater than 8 characters"],
        select: false,
      },
      role: {
          type: String,
          enum: ['admin', 'supervisor','driver'],
        default: "admin",
  },
  vehicle: { 
      type: mongoose.Schema.Types.ObjectId,
     ref: 'Vehicle'
  },
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place'
  },
      age:  {
        type: Number,
        required: [true, "Please Enter Your Age"],
    },
    contact:  {
        type: Number,
        required: [true, "Please Enter Your Contact"],
    },
    image: {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = function(password)  {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model("User", userSchema)

export default User