const Post = require("../models/post_schema");
const User = require("../models/user_schema");

module.exports.Home = async (req, res) => {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);

  // without population the user
  // Post.find({}, function (err, posts) {
  //   if (err) {
  //     console.log(`Error fetching the posts: ${err}`);
  //   } else {
  //     return res.render("home", {
  //       title: "Codeial | Home",
  //       posts: posts,
  //     });
  //   }
  // });

  // population the user of each post
  // Post.find({})
  //   .populate("user")
  //   .populate({
  //     path: "comments",
  //     populate: {
  //       path: "user",
  //     },
  //   })
  //   .exec(function (err, posts) {
  //     User.find({}, function (err, users) {
  //       return res.render("home", {
  //         title: "Codeial | Home",
  //         posts: posts,
  //         users: users,
  //       });
  //     });
  //   });

  // using async await

  try {
    let posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

    let users = await User.find({});

    return res.render("home", {
      title: "Codeial | Home",
      posts: posts,
      users: users,
    });
  } catch (err) {
    console.log(`Error: ${err}`);
    return;
  }
};
