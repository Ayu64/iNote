const express=require('express');
const router=express.Router();
const User=require('../models/User');
const {body,validationResult }=require('express-validator');
const  bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const fetchuser=require('../middleware/fetchuser');


const JWT_SECRET='ayushisgoodb$oy';

//create a user using post :post"/api/auth/createUser".
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => { 
    success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    try {
        // Check if the user already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({success, error: "Sorry, a user with this email already exists" });
        }
        const salt =await bcrypt.genSalt(10)
        const secPass=await bcrypt.hash(req.body.password,salt);
        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        });

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken =jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
        
        // Return success message and user data
        // res.json({ message: "User created successfully", user: user });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

//route:2, create a user using post :post"/api/aut/login".
router.post('/login', [
    // body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannnot be blank').exists(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body; 


    try{
        let  user = await User.findOne({email});

        if(!user){
            success=false;
            return res.status(400).json({error:"User not found"});
        }

        const passwordCompare=await bcrypt.compare(password,user.password)
        if(!passwordCompare){
            success=false;
            return res.status(400).json({error:"please login with correct credentials"})
        }

        const data={
            user:{
                id:user.id
            }
        }
        const authtoken =jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success, authtoken});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server error");
    }
});

//route:3, create a user using post :post"/api/aut/getuser".
router.post('/getuser', fetchuser , async (req,res) =>{
    try {
        const userId=req.user.id;
        const user =await User.findById(userId).select('-password');
        res.send(user);
        
    } catch (error) {
        console.error(error.message);
        // res.status(500) .send("Internal server error");
        res.status(500).send("Internal Server error");

    }   
});


module.exports=router;  