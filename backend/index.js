const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();
app.use(express.json()); //to accept JSON data from frontend
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const users = [];

app.post("/api/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign({ username: user.username }, "SECRET_KEY", {
        expiresIn: "1h",
      });
      res.json({ username: user.username, accessToken });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const verify = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split(" ")[1];
    jwt.verify(token, "SECRET_KEY", (err, user) => {
      if (err) {
        return res.status(403).json({ message: "token is invalid" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "not authenicated!" });
  }
};
app.get("/api/info", verify, (req, res) => {
  res.json({
    message: "this is protected route",
    user: req.user,
  });
});
// app.delete("/api/users/:userId", verify, (req, res) => {
//   const userId = parseInt(req.params.userId, 10);
//   if (req.user.id == userId || req.user.isAdmin) {
//     res.status(200).json({ message: "successfully deleted user!" });
//   } else {
//     res.status(403).json({ message: "Your are not allowed to  delete" });
//   }
// });
app.listen(PORT, () => console.log(`listening on ${PORT}`));
