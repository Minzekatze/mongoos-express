import express from "express";
import mongoose from "./db/mongoose.js";
import studentRoutes from "./routes/student.js";
import APIErrorHandler from "./middleware/errorHandler.js";
const PORT = process.env?.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/student", studentRoutes);

app.use(APIErrorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
