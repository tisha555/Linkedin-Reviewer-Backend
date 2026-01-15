import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import expertRoutes from "./routes/expertRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";
import systemRoutes from "./routes/systemRoutes.js";
import packageRoutes from "./routes/packageRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());

// routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/reviews", reviewRoutes);
app.use("/expert", expertRoutes);
app.use("/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/files", fileRoutes);
app.use("/", systemRoutes);
app.use("/packages", packageRoutes);
app.use("/payments", paymentRoutes);
app.use("/notifications", notificationRoutes);


// database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
