module.exports.Home = (req, res) => {
  // console.log(req.cookies);
  // res.cookie("user_id", 25);
  return res.render("home", {
    title: "Codeial | Home",
  });
};
