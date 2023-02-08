const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const { verifyToken } = require("./verifytoken.js");

//Create Post => /api/post/user/post
router.post("/user/post" , verifyToken , async(req , res, next)=>{
          try {
                   let {title , image , video} = req.body;
                   let newpost = new Post({
                    title , image , video , user:req.user.id
                   })
                   const post = await newpost.save()
                   res.status(200).json(post)
          } catch (error) {
                    return res.status(500).json("Une erreur est survenue !")
          }
})

// Get all posts => /api/post/allposts
router.get("/allposts", verifyToken, async(req, res)=> {
      try {
            Post.find().then(
                  (posts) => {
                        res.status(200).json(posts);
                  }
            )
      } catch (error) {
            return res.status(400).json("Une erreur est survenue !")
      }
})

// Get a post => /api/post/:id
router.get("/:id", async (req, res) => {
      try {
            const post = await Post.findById(req.params.id);
            res.status(200).json(post)
      } catch (error) {
            res.status(500).json(error)
      }
 });

//upload post by one user => /api/post/get/post/:id
router.get("/get/post/:id", async(req , res)=>{
      try {
            const mypost = await Post.find({ user: req.params.id });
            if (!mypost) {
                  return res.status(200).json("Vous n'avez aucun post !")
            }

            res.status(200).json(mypost)
      } catch (error) {
            res.status(500).json("Une erreur est survenue !")
      }
})

//update user post => /api/post/update/post/:id
router.put("/update/post/:id" , verifyToken , async(req ,res)=>{
      try {
            let post = await Post.findById(req.params.id);
            if (!post) {
                  return res.status(400).json("Aucun post n'a été trouvé")
            };

            post = await Post.findByIdAndUpdate(req.params.id, {
                  $set: req.body
            }, { returnDocument: "after" })
            let updatepost = await post.save();
            res.status(200).json(updatepost);
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
})

// Like => /api/post/:id/like
router.put("/:id/like" ,verifyToken, async(req , res)=>{
      try {
            const post = await Post.findById(req.params.id);
            if(!post.like.includes(req.user.id)){
                  if(post.dislike.includes(req.user.id)){
                        await post.updateOne({$pull:{dislike:req.user.id}})
                  }
                  await post.updateOne({$push:{like:req.user.id}})
                  return res.status(200).json("Vous aimez ce post !")
                  
            }else{
                  await post.updateOne({$pull:{like:req.user.id}});
                  return res.status(200).json("Vous n'aimez plus ce post !")
            }
            
      } catch (error) {
       return res.status(500).json("Une erreur est survenue !")     
      }
})

//Dislike => /api/post/:id/dislike
router.put("/:id/dislike" ,verifyToken, async(req , res)=>{
      try {
            const post = await Post.findById(req.params.id);
            if (!post.dislike.includes(req.user.id)) {
                  if (post.like.includes(req.user.id)) {
                        await post.updateOne({ $pull: { like: req.user.id } })
                  }
                  await post.updateOne({ $push: { dislike: req.user.id } })
                  return res.status(200).json("Vous n'aimez pas ce post !")
            } else {
                  await post.updateOne({ $pull: { dislike: req.user.id } });
                  return res.status(200).json("Le post n'est plus aimé !")
            }
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
})

//Comment => /api/post/comment/post
router.put("/comment/post" , verifyToken , async(req , res)=>{
      // try {
            const {comment , postid , profile} = req.body;
            const comments={
                  user:req.user.id,
                  username:req.user.username,
                  comment,
                  profile
            }
            const post = await Post.findById(postid);
            post.comments.push(comments);
            await post.save();
            res.status(200).json(post);
      // } catch (error) {
      //       return res.status(500).json("Une erreur est survenue !")
      // }
})

//Delete post => /api/post/delete/post/:id
router.delete("/delete/post/:id" , verifyToken , async(req , res)=>{
      try {
            const post = await Post.findById(req.params.id);
            // if(post.user === req.user.id){
                  const deletePost = await Post.findByIdAndDelete(req.params.id);
                  return res.status(200).json("Votre post a bien été supprimé !")
            // }
            // else{
                  return res.status(400).json("Vous n\'êtes pas autorisé à supprimer ce post !")
            // }
      } catch (error) {
            return res.status(500).json("Une erreur est survenue !")
      }
})

/// Get a Following user => /api/post/following/:id
router.get("/following/:id" , async(req , res)=>{
      try {
            const user = await User.findById(req.params.id);
            const followingUser = await Promise.all(
                  user.Following.map((item)=>{
                        return User.findById(item)
                  })
            )

            let followingList=[];
            followingUser.map((person)=>{
                  const {email, password , Following , Followers , ...others} = person._doc;
                  followingList.push(others);
            })

            res.status(200).json(followingList);
      } catch (error) {
           return res.status(500).json("Une erreur est survenue !")
      }
})

/// Get a Follower user => /api/post/followers/:id
router.get("/followers/:id" , async(req , res)=>{
      try {
            const user = await User.findById(req.params.id);
            const followersUser = await Promise.all(
                  user.Followers.map((item)=>{
                        return User.findById(item)
                  })
            )

            let followersList=[];
            followersUser.map((person)=>{
                  const {email, password, Following, Followers, ...others} = person._doc;
                  followersList.push(others);
            })

            res.status(200).json(followersList);
      } catch (error) {
           return res.status(500).json("Une erreur est survenue !")
      }
})

module.exports = router;