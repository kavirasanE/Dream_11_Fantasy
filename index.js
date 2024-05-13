const express = require('express');
const dotenv =require("dotenv")
const AddTeamRoutes = require("./routes/Routes.js");

const mongoose = require("mongoose");
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());

// Database Details
// const DB_USER = process.env.DB_USER;
// const DB_PWD = process.env.DB_PWD;
// const DB_URL = process.env.DB_URL;
// const DB_NAME = "testing";
// const DB_COLLECTION_NAME = "players";



const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
            // useFindAndModify: true
        });

        console.log(`Mongo Db Connected ${connect.connection.host}`);
    }
    catch (err) {
        console.log(err)
    }
}
connectDB();
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://"+DB_USER+":"+DB_PWD+"@"+DB_URL+"/?retryWrites=true&w=majority&appName=Cluster0";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// let db;

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });

//     db = client.db(DB_NAME);
    
//     console.log("You successfully connected to MongoDB!");
    
//   } catch(err){
//     console.log(err.message);
//   } 
//   finally {
//   }
// }


// Sample create document
async function sampleCreate() {
  const demo_doc = { 
    "demo": "doc demo",
    "hello": "world"
  };
  const demo_create = await db.collection(DB_COLLECTION_NAME).insertOne(demo_doc);
  
  console.log("Added!")
  console.log(demo_create.insertedId);
}


// Endpoints

app.use("/add-team", AddTeamRoutes)
app.use("/process",AddTeamRoutes)
app.get('/', async (req, res) => {
  res.send('Hello World!');
});


app.get('/demo', async (req, res) => {
  await sampleCreate();
  res.send({status: 1, message: "demo"});
});

//

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

// run();