import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import authRoutes from "./routes/AuthRoute.js";
import contactsRoutes from "./routes/ContactRoute.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: "https://react-chat-app-frontend-vc69.onrender.com",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
     allowedHeaders: 'Content-Type,Authorization',
    headers:{
      "Access-Control-Allow-Origin":'https://react-chat-app-frontend-vc69.onrender.com',
    },
  })
);
app.get('/', (req, res) => {
  res.send('hello');
});
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactsRoutes);
app.use("/api/messages", messagesRoutes);

const server = app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`.bgGreen);
});

setupSocket(server);

mongoose
  .connect(databaseURL)
  .then(() =>
    console.log(`DB connected succecfully to ${databaseURL}`.bgYellow)
  )
  .catch((err) => console.log(err.message));
