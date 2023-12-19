import express from 'express'
import cloudinary from "cloudinary";

import User from '../models/User.js'
import Vehicle from '../models/Vehicle.js';
import Place from '../models/Place.js';
import Error from '../utils/Error.js'
import sendToken from '../utils/sendToken.js'
import { authenticatedUser } from '../middleware/Auth.js'

const router = express.Router(); 

router.post("/register", async (req, res) => {
    const { name, password, email, role,age,contact,image } = req.body;
  
    const user = await User.create({
      name,
      email,
        password,
        role,
        age,
      contact,
        image
    });
  
    sendToken(user, 201, res);
});
  
router.post('/create', authenticatedUser, async (req, res, next) => {
  const { name, password, email, role, age, contact, image } = req.body;
  
  const existing = await User.findOne({ email: email })
 
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

  res.status(200).json({
    success: true,
    user
  })
})


  router.get('/assigndriver', authenticatedUser, async(req, res) => {

    const drivers = await User.find({role: 'driver', vehicle: null})
    res.status(200).json({
      success: true,
      drivers
    })
  })
  router.get('/assignsupervisor',authenticatedUser, async(req, res) => {

    const supervisor = await User.find({role: 'supervisor', supervisor: null})
    res.status(200).json({
      success: true,
      supervisor
    })
  })
  

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

router.get('/:id', authenticatedUser, async (req, res) => { 
  const user = await User.findById(req.params.id).populate('vehicle').populate('supervisor')

  res.status(200).json({
    success: true,
    user
  })
})

router.put('/:id', authenticatedUser, async (req, res,next) => { 
  const { id } = req.params;
  const { name, password, email, role, age, contact, image } = req.body;
  
  const existingUser = await User.findById(id)

  if (!existingUser) {
    return next(new Error("User doesn't exist", 400))
  }
  if (existingUser.image.public_id) {
    await cloudinary.v2.uploader.destroy(existingUser.image.public_id)
  }


  const result = await cloudinary.v2.uploader.upload(image, {
    folder: "multi-modal-coal-users",
  });

  const user = await User.findByIdAndUpdate(id,{
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
  },  {new: true, runValidators: true})

  res.status(200).json({
    success: true,
    user
  })
})

router.delete('/:id', authenticatedUser, async (req, res) => { 
  const { id } = req.params;
  
  const user = await User.findById(id)

  if (user.vehicle) {
    await Vehicle.findByIdAndUpdate(user.vehicle, {
        $unset: {driver: ''}
      })
  }

  if (user.supervisor) {
    await Place.findByIdAndUpdate(user.supervisor, {
        $unset: {supervisor: ''}
      })
  }

  await User.findByIdAndDelete(id)

  res.status(201).json({
    success: true,
    id
  })
})


export default router