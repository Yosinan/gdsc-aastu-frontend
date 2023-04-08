const express = require("express");
const fs = require("fs/promises");
const bodyParser = require("body-parser");

const vipRoute = (req, res, next) => {
  const queryName = "vip_user";
  if (req.path === "/auth_only") {
    if (!req.query.name) {
      return res.status(401).send("enter a name that is in the query string.");
    }
    if (req.query.name !== expectedName) {
      return res.status(403).redirect("/protected.html");
    }
  }
  next();
};

(async () => {
  let db;
  try {
    const data = await fs.readFile("user.json", "utf-8");
    db = JSON.parse(data);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }

  const app = express();
  app.use(vipRoute);
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static("static"));

  app.post("/signin", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = database.find((user) => user.email === email);
    if (user) {
      if (user.password === password) {
        res.status(200).redirect("/index.html");
      } else {
        res.status(401).redirect("/incorrect_password.html");
      }
    } else {
      res.status(404).redirect("/signup.html");
    }
  });

  app.get("/auth_only", (req, res) => {
    res.status(200).redirect("/secret.html");
  });

  const PORT = process.env.PORT || 3300;
  app.listen(PORT, () => {
    console.log(`The server is up and running on port ${PORT}`);
  });
})();
