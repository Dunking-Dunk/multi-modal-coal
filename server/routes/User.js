import express from 'express'
import cloudinary from "cloudinary";

import User from '../models/User.js'
import Error from '../utils/Error.js'
import sendToken from '../utils/sendToken.js'
import { authenticatedUser } from '../middleware/Auth.js'

const router = express.Router(); 

router.post("/register", async (req, res) => {
    const { name, password, email, role,age,contact } = req.body;
  
    const user = await User.create({
      name,
      email,
        password,
        role,
        age,
        contact
    });
  
    sendToken(user, 201, res);
  });
  
  router.post("/login", async (req, res, next) => {
    const { password, email } = req.body;
  
    if (!password || !email)
      return next(new Error("Please enter email and password", 400));
  
    const user = await User.findOne({ email }).select("+password");
   
    if (!user) return next(new Error("Invalid email or password", 401));
    
    const isPasswordValid = await user.comparePassword(password);
  
    if (!isPasswordValid)
      return next(new Error("Invalid email or password", 401));
  
    sendToken(user, 201, res);
  });
  
router.post("/logout", async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
});

router.get("/me", authenticatedUser, async (req, res) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    user,
  });
});

router.get('/', authenticatedUser, async (req, res) => { 
  const users = await User.find({})

  res.status(200).json({
    success: true,
    users
  })
})

router.put('/:id', authenticatedUser, async (req, res) => { 
  const {id} = req.params;
  const user = await User.findByIdAndUpdate(id,{...req.body})

  res.status(201).json({
    success: true,
    user
  })
})

router.delete('/:id', authenticatedUser, async (req, res) => { 
  const { id } = req.params;
  
  await User.findByIdAndDelete(id)

  res.status(201).json({
    success: true,
    id
  })
})

router.post('/create', authenticatedUser, async (req, res, next) => {
  const { name, password, email, role, age, contact, image } = req.body;
  
  const existing = await User.findOne({ email: email })
  console.log(existing)
  if (existing) {
    return next(new Error('User already exist with the mail', 400))
  }
  
  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "multi-modal-coal-users",
  });

  
  const user = await User.create({
    name,
    password,
    email,
    age,
    role,
    contact,
    image: {
      public_id: result.public_id,
      url: result.secure_url
    }
  })

  res.status(201).json({
    success: true,
    user
  })
})


  
export default router