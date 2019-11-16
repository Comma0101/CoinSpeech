const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth')
//GET api/auth
//Access Public

router.get('/',auth, async (req,res) =>{
  try{
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error')
  }
});
//Post api auth
//authenticate user get Token
router.post('/',[
  check('email',"please include a valid email ").isEmail(),
  check('password','password is required').exists()
],
async (req,res) =>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  //if user exists
  //encrypt password
  //return jsonwebtoken
  const {email,password} =  req.body;
  try{
    let user = await User.findOne({email});
    if (!user){
      return res.status(400)
      .json({errors:[{meg:"Invalid Credentials"}]});
    }
    //match the password
    const isMacth = await bcrypt.compare(password,user.password);
    if(!isMacth){
      return res.status(400)
      .json({errors:[{meg:"Invalid Credentials"}]});
    }
    

    const payload = {
      user:{
        id: user.id
      }
    }
    jwt.sign(payload,
      config.get('jwtSecret'),
      {expiresIn:360000},
      (err,token) =>{
        if(err) throw err;
        res.json({token});
      }
  );
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
