import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { UploadArticles, GetArticles, } from "./mongoDB/controllers/ArticlesController.js";
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.post("/upload", UploadArticles);
app.get("/articles", GetArticles);
app.listen(3000);
//# sourceMappingURL=index.js.map