const express = require("express");
const morgan = require("morgan");
const path = require("path");
const exphbs = require("express-handlebars").engine;
// const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const config = require('./config.json');
globalThis.config = config;

require('dotenv').config({override: true});

const app = express();
app.set("port", process.argv[2] || process.env.PORT || 4101);
app.set("views", path.join(__dirname, "views"));
app.set("public", path.join(__dirname, "public"));

app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    extname: ".hbs",
    helpers: require("./lib/handlebars"),
  })
);
app.set("view engine", ".hbs");

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
globalThis.listCategory = [];

//Routes
app.use(require("./routes"));
app.use('/file', require("./routes/file"));
app.use('/inventory', require("./routes/inventory"));

app.use((req, res) => {
    res.render("404");
});

//Starting the server
app.listen(app.get("port"), () => {
    console.log(`Server on port: ${app.get("port")}`);
    console.log(`Argument: ${process.argv[2]}`);
})
