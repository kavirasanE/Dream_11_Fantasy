const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/dbConfig");
const { corsOptions } = require("./config/corsOptions");
const serverless = require('serverless-http');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({limit:'100mb'}));
app.use(express.urlencoded({limit:'100mb', extended: true }));
app.use(cookieParser());



app.get("/", (req, res) => {
  res.json({ message: "Hey this is my API running 🥳 - DB connected" });
});
// For mobile app
app.use("/register", require("./routes/api/register"));
app.use("/updatecredentials", require("./routes/api/updateCredentials"));
app.use("/applogin", require("./routes/api/appLogin"));
app.use("/userlogin", require("./routes/api/userLoginUpdates"));
app.use("/getdeviceinfo", require("./routes/api/getDeviceInfo"));
app.use("/updatestore", require("./routes/api/updateStore"));
app.use("/getunits", require("./routes/api/getUnits"));
app.use("/getsubcriptiontype", require("./routes/api/getSubcriptionTypes"));
// app.use("/getsubcriptiontype", require("./routes/api/getSubcriptionTypes"));
app.use(
  "/updatesubcriptionexpiry",
  require("./routes/api/updateSubcriptionExpiry")
);
app.use("/updatesubcription", require("./routes/api/updateSubcription"));
app.use("/logo", require("./routes/api/logo"));
app.use("/getmailinfo", require("./routes/api/getMailInfo"));

// For web portal
app.use("/alldevice", require("./routes/api/allDevice"));
app.use("/addsub", require("./routes/api/addSubcription"));
app.use("/subcriptiontype", require("./routes/api/getSubcriptionTypes"));


app.use('/dashboard', require('./routes/api/dashboard'))

// app.listen(PORT, () => {
//   console.log(`Server started on PORT ${PORT} `);
// });

connectDB
  .authenticate()
  .then(() =>
    app.listen(PORT, () => console.log(`server running on port ${PORT}`))
  )
  .catch((err) => console.log(`Error while connecting to DB - ${err}`));

// Export the Express API
module.exports = serverless(app);
