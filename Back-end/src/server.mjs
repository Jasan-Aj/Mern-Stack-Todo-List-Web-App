import express from "express";
import { router } from "./routes/todoes.mjs";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 3000

mongoose.connect("mongodb://localhost/mytodo")
.then(()=>console.log("DB sucessfully connected!"))
.catch((err)=> consolelog(err));

app.use(cors());
app.use(express.json())
app.use(router);

app.listen(port);