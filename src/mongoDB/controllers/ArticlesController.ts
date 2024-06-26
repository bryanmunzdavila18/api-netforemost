import fs from "fs";
import { ArticlesType } from "../utils/Enums";
import formidable, { errors as formidableErrors } from "formidable";
import { MongoClient, ServerApiVersion } from "mongodb";

// Connection URL
const url =
  "mongodb+srv://root:supersecretpassword@atlascluster.p8ymqty.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Database Name
const dbName = "netforemost";

export const UploadArticles = async (req, res) => {
  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);
    const jsonData = JSON.parse(
      fs.readFileSync(files.data[0].filepath, "utf8")
    );

    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const ArtcilesCollection = db.collection("Articles");

    const insertResult = await ArtcilesCollection.insertMany(jsonData);
    console.log("Inserted documents =>", insertResult);

    const findResult = await ArtcilesCollection.find({}).toArray();
    console.log("Found documents =>", findResult);
    res.send({ insertResult, findResult });
  } catch (error) {
    res.status(500);
    res.send(`Internal Error => ${error}`);
  }
};

export const GetArticles = async (req, res) => {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const ArtcilesCollection = db.collection("Articles");

    const findResult = await ArtcilesCollection.find({}).toArray();
    console.log("Found documents =>", findResult);
    res.send(findResult);
  } catch (error) {
    res.status(500);
    res.send(`Internal Error => ${error}`);
  }
};
