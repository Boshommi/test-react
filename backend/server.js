import express from "express";
import mainRouter from "./router.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", mainRouter);

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
