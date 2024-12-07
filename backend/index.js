import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectionDB } from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
// import { Configuration, OpenAIApi } from "openai";

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 8000;

app.use("/api", userRoutes);
app.use("/api", postRoutes);

// app.post("/api/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     users.push({ username, password: hashedPassword });
//     res.json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// app.post("/api/login", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const user = users.find((u) => u.username === username);
//     if (user && (await bcrypt.compare(password, user.password))) {
//       const accessToken = jwt.sign({ username: user.username }, "SECRET_KEY", {
//         expiresIn: "30m",
//       });
//       res.json({ username: user.username, accessToken });
//     } else if (!user) {
//       res.status(404).json({ message: "User does not exists" });
//     } else {
//       res.status(401).json({ message: "Invalid credentials" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });
// const verify = async (req, res, next) => {
//   const authHeaders = req.headers.authorization;
//   if (authHeaders) {
//     const token = authHeaders.split(" ")[1];
//     jwt.verify(token, "SECRET_KEY", (err, user) => {
//       if (err) {
//         return res.status(403).json({ message: "token is invalid" });
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json({ message: "not authenticated!" });
//   }
// };
// app.get("/api/write", verify, (req, res) => {
//   res.json({ message: "Authenticated!, " + req.user.username });
// });
// app.get("/api/editor", verify, (req, res) => {
//   res.json({ message: "Authenticated!, " + req.user.username });
// });
// app.post("/api/askai", async (req, res) => {
//   try {
//     const { prompt } = req.body;
//     const response = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt,
//       maxTokens: 150,
//       // temperature: 0,
//     });
//     res.json({ message: response.data.choices[0].text });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
connectionDB().catch((error) => console.error(error));
app.listen(PORT, () => console.log(`listening on ${PORT}`));
