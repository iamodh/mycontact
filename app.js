const express = require("express");
const dbConnect = require("./config/dbConnect");
const methodOverride = require("method-override");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("./public"));
app.use(methodOverride("_method"));
const PORT = 3000;
dbConnect();

const requestTime = (req, res, next) => {
  let today = new Date();
  let now = today.toLocaleTimeString();
  req.requestTime = now;
  next();
};

app.use(requestTime);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/loginRoutes"));
app.use("/contacts", require("./routes/contactRoutes"));

app.listen(PORT, () => {
  console.log(`Server listening from http://localhost:${PORT}`);
});
