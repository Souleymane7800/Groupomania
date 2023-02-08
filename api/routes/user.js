const router = require("express").Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Importer le package pour utiliser les variables d'environnement
const dotenv = require('dotenv');
const { verifyToken } = require("./verifytoken");
const Post = require("../models/Post");

const result = dotenv.config();

// Créer un utilisateur...email unique dans la BD et password 6 caractères minimum et username min 4 caractères
// => /api/user/create/user
router.post("/create/user", 
      body("email").isEmail(), 
      body("password").isLength({ min: 6}),
      body("username").isLength({ min: 4}), 
      async(req, res) => {
            const error = validationResult(req);
            if(!error.isEmpty()){
                  return res.status(400).json("Une erreur est survenue !")
            }
            // try {
                         
            let user = await User.findOne({email:req.body.email});
            if(user){
                  return res.status(200).json("Merci de vous connecté avec le bon mot de passe")
            };
            // Chiffrage du password dans la BD et salage 10 fois
            const salt = await bcrypt.genSalt(10);
            const hashpassword = await bcrypt.hash(req.body.password, salt)

            // Creation du user dans la BD
            user = await User.create({
                  username:req.body.username,
                  email:req.body.email,
                  password:hashpassword,
                  isAdmin: false,
                  profile:req.body.profile
            })
            // Génération d'un token
            // Bloque la redirection*a voir si vraiment utile*
            // const accessToken = jwt.sign({
            //       id: user._id,
            //       username: user.username
            // }, process.env.JWT_TOKEN_KEY)
            await user.save();
            res.status(200).json()
      // } catch (error) {
      //           return res.status(400).json("Une erreur est survenue !")  
      // }

})


// Login => /api/user/login
router.post("/login",
      body("email").isEmail(), 
      body("password").isLength({ min: 6}),
      async(req, res) => {
            const error = validationResult(req);
            if(!error.isEmpty()){
                  return res.status(400).json("Une erreur est survenue !")
            }

            try {            

            const user = await User.findOne({email: req.body.email});
            if(!user){
                  return res.status(400).json("Utilisateur non trouvé !")
            }

            // On compare le password entré avec celle dans la BD
            const comparePassword = await bcrypt.compare(req.body.password, user.password);
            if(!comparePassword){
                  return res.status(400).json("Mauvais mot de passe !")
            }
            
            const accessToken = jwt.sign({
                  id: user._id,
                  username: user.username
            }, process.env.JWT_TOKEN_KEY);
            // On cache le password aux autres utilisateurs
            const {password, ...others} = user._doc
            res.status(200).json({others, accessToken});
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
      
})


// Following => /api/user/following/:id
router.put("/following/:id", verifyToken, async(req, res) => {
      if(req.params.id !== req.body.user){
            const user = await User.findById(req.params.id);
            const otherUser = await User.findById(req.body.user);

            if(!user.Followers.includes(req.body.user)){
                  await user.updateOne({ $push:{ Followers:req.body.user } });
                  await otherUser.updateOne({ $push:{ Following:req.params.id } });
                  return res.status(200).json("Vous suivez ce profil !");
            } else {
                  await user.updateOne({ $pull:{ Followers:req.body.user } });
                  await otherUser.updateOne({ $pull:{ Following:req.params.id } });
                  return res.status(200).json("Vous ne suivez plus ce profil !");
            }
      } else {
            return res.status(400).json("Vous ne pouvez pas vous suivre !")
      }
})

// Fetch post from following => /api/user/flw/:id
router.get("/flw/:id", verifyToken, async(req, res) => {
      try {
            const user = await User.findById(req.params.id);
            const followersPost = await Promise.all(
                  user.Following.map((item) => {
                        return Post.find({user: item})
                  })
            )
            const userPost = await Post.find({user: user._id});

            res.status(200).json(userPost.concat(...followersPost))
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
})

// Update User Profile => /api/user/update/:id
router.put("/update/:id", verifyToken, async(req, res) => {
      
      try {
            if (req.params.id === req.user.id) {
                  if (req.body.password) {
                        const salt = await bcrypt.genSalt(10);
                        const hashpassword = await bcrypt.hash(req.body.password, salt);
                        req.body.password = hashpassword;
                        const updateUser = await User.findByIdAndUpdate(req.params.id, {
                              $set: req.body
                        });
                        await updateUser.save();
                        res.status(200).json(updateUser);
                  }
            } else {
                  return res.status(400).json("Vous n\'êtes pas authorisé à modifier cet utilisateur !")
            }
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
})

// Delete User Account => /api/user/delete/:id
router.delete("/delete/:id", verifyToken, async(req, res) => {
      try {
            if(req.params.id !== req.user.id){
                  return res.status(400).json("Vous ne pouvez supprimer que votre propre compte !")
            } else {
                  await User.findByIdAndDelete(req.params.id);
                  return res.status(200).json("Votre compte a bien été supprimé !")
            }
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
})

// Get user details for post => /api/post/user/details/:id
router.get("/post/user/details/:id", async(req, res) => {
      try {
           const user = await User.findById(req.params.id);
           if(!user){
            return res.status(400).json("Utlisateur non trouvé !")
           }
           const {email, password, ...others} = user._doc;
           res.status(200).json(others); 
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
})

// Get user to follow => /api/all/user/:id
router.get("/all/user/:id", async (req, res) => {
      try {
            const allUser = await User.find();
            const user = await User.findById(req.params.id);
            const followingUser = await Promise.all(
                  user.Following.map((item) => {
                        return item;
                  })
            )
            let UserToFollow = allUser.filter((val) => {
                  return !followingUser.find((item) => {
                        return val._id.toString() === item;
                  })
            })
            let filterUser = await Promise.all(
                  UserToFollow.map((item) => {
                        const {email, Followers, Following, password, ...others} = item._doc;
                        return others;
                  })
            )
            res.status(200).json(filterUser)
      } catch (error) {
            
      }
})

module.exports = router;