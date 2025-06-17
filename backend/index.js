import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { rateLimit } from "express-rate-limit";
import { connectionDB } from "./src/config/db.js";
import userRoutes from "./src/routes/userRoutes.js";
import postRoutes from "./src/routes/postRoutes.js";
import helmet from "helmet";
// import { Configuration, OpenAIApi } from "openai";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

const PORT = process.env.PORT || 8000;

app.use(limiter);
app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);

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
