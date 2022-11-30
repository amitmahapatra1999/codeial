const Post = require("../models/post_schema");

module.exports.Home = (req, res) => {
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
  Post.find({})
    .populate("user")
    .exec(function (err, posts) {
      if (err) {
        console.log(`Error fetching the posts: ${err}`);
      } else {
        return res.render("home", {
          title: "Codeial | Home",
          posts: posts,
        });
      }
    });
};
