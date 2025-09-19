import bcrypt from "bcryptjs";
import { APIKey } from "../models/apiKey.Schema.js";

const apiKey = async (req, res, next) => {
  try {
    const clientKey = req.headers["x-api-key"];
    if (!clientKey) {
      return res.status(401).json({
        message: "API key is required",
      });
    }
    const apiKeys = await APIKey.find({ status: true });
    let validKey = null;
    if (!apiKeys || apiKeys.length === 0) {
      return res.status(500).json({
        message: "No API keys configured",
      });
    }
    for (let key of apiKeys) {
      const match = await bcrypt.compare(clientKey, key.key);
      if (match) {
        validKey = key;
        break;
      }
    }
    if (!validKey) {
      return res.status(403).json({ error: "Invalid API key" });
    }
    req.apiKey = validKey;
    next();
  } catch (error) {
    return next(error);
  }
};
export default apiKey;
