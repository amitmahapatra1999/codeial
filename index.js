const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./config/mongoose");
const router = require("./routes/index");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const passportJWT = require("./config/passport-jwt-strategy");
const authMiddleware = require("./config/local-auth-middleware");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const flashMware = require("./config/flashmiddleware");

// setup sass middleware
app.use(
  sassMiddleware({
    /* Options */
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "extended",
    prefix: "/css", // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
  })
);

// setup body parser
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// setup cookie parser
app.use(cookieParser());

// setup static file access
app.use(express.static("./assets"));
app.use("/uploads", express.static(__dirname + "/uploads"));

// setup express layout
app.use(expressLayouts);
// extract style and script from child pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// setup the view engine to ejs
app.set("view engine", "ejs");
app.set("views", "./views");

// mongo store is used to store the session in te DB
app.use(
  session({
    name: "codeial",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost:27017/codeial",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(`Error connection Mongo Store: ${err}`);
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(authMiddleware.setAuthenticatedUser);

app.use(flash());
app.use(flashMware.setFlash);
// setup express router
app.use("/", router);

app.listen(PORT, function (err) {
  if (err) {
    console.log(`Error while starting the server: ${err}`);
    return;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
