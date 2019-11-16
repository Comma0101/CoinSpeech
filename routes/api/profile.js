const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
//GET api/profiles/user
//get current profile
//Access private

router.get('/me',auth, async (req,res) =>{
 try{
   const profile = await Profile.findOne({user:req.user.id})
   .populate('user',['name']);

   if(!profile){
     return res.status(400).json({msg:'there is no profile '});
   }
    res.json(profile);
}catch(err){
   console.error(err.message);
   res.status(500).send('Server error')
 }

});
//Post api/profile/
//create update profile
//Access private
router.post(
  '/',
  [
    auth,
    [
      check('description', 'description is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    console.log(req.user);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      description,
      bio
    }= req.body;
  //build profile Object
  const profileFields={};
  profileFields.user = req.user.id;
  if (description) profileFields.description = description;
  if (bio) profileFields.bio = bio;
  try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // not found then Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  //Post api/profile/
  //create update profile
  //Access public
  router.get('/', async (req,res) =>{
    try{
      const profiles = await Profile.find().populate('user', ['name']);
      res.json(profiles);

    }catch(err){
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  });
  //Post api/profile/user/:userid
  //create update profile
  //Access public
  router.get('/user/:user_id', async (req,res) =>{
    try{
      const profile = await Profile.find({user:req.params.user_id}).populate('user', ['name']);
      if(!profile) return res.status(400).json({msg:"no profile "});

      res.json(profile);

    }catch(err){
      console.error(err.message);
      if(err.kind == 'ObjectId'){
        return res.status(400).json({msg:" profile not found"});
      }
      res.status(500).send('Server Error')
    }
  });


// DELETE api/profile
// Delete profile, user & posts
// Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
  //  await Post.deleteMany({ user: req.user.id });
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Servers Error');
  }
});


module.exports = router;
