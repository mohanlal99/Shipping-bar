import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { configDotenv } from "dotenv";
import { shippingRoute } from "./routes/shipping.routes.js";

configDotenv();

const app = express();

// ✅ Add all allowed origins (Shopify admin, tunnel, local dev)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        "https://admin.shopify.com",
        "http://localhost:3000",
        "https://royal-shops-3.myshopify.com",
      ];

      // ✅ Allow any Cloudflare tunnel or local dev
      if (
        origin.includes("trycloudflare.com") ||
        allowedOrigins.some((allowed) => origin.startsWith(allowed))
      ) {
        return callback(null, true);
      }

      console.warn("❌ Blocked by CORS:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);


app.use(express.json());

app.use("/api/shipping", shippingRoute);

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/shopify";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Free Shipping Bar API is running!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
