var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from "fs";
import formidable from "formidable";
import { MongoClient, ServerApiVersion } from "mongodb";
// Connection URL
const url = "mongodb+srv://root:supersecretpassword@atlascluster.p8ymqty.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// Database Name
const dbName = "netforemost";
export const UploadArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const form = formidable({});
        const [fields, files] = yield form.parse(req);
        const jsonData = JSON.parse(fs.readFileSync(files.data[0].filepath, "utf8"));
        yield client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const ArtcilesCollection = db.collection("Articles");
        const insertResult = yield ArtcilesCollection.insertMany(jsonData);
        console.log("Inserted documents =>", insertResult);
        const findResult = yield ArtcilesCollection.find({}).toArray();
        console.log("Found documents =>", findResult);
        res.send({ insertResult, findResult });
    }
    catch (error) {
        res.status(500);
        res.send(`Internal Error => ${error}`);
    }
});
export const GetArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);
        const ArtcilesCollection = db.collection("Articles");
        const findResult = yield ArtcilesCollection.find({}).toArray();
        console.log("Found documents =>", findResult);
        res.send(findResult);
    }
    catch (error) {
        res.status(500);
        res.send(`Internal Error => ${error}`);
    }
});
//# sourceMappingURL=ArticlesController.js.map