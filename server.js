import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import router from "./routes/authRoute.js";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();
await connectDB();

const app = express();

// rest api

// app.use("/api/v1/auth", router);

// middlewares
app.use(cors());
app.use(express.json()); // this is using instead of body-parser
app.use(morgan("dev")); // morgon : which url we are hitting it will share it.
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Wel come to this page");
});

app.use("/api/v1/auth", router);

app.get("/", (req, res) => {
  res.send("Wel come to this page");
});

// port
//react 3000, angular 4200 and for node 8000 or 8080

const PORT = process.env.PORT || 8080;

// run or listen

app.listen(PORT, () => {
  console.log(`Server is running  ${PORT}`.bgCyan.white);
});
