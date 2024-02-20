const express = require("express");
const connectToDatabase = require("./config/dbConnect");
const userRoute = require("./routes/userRoutes/routes");
const twiliootp = require("./routes/otpVerification/route")
const africaStakling = require("./routes/africastalking/route")
const resetSendPassword = require("./routes/passwordreset/route")
 
require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser  = require("cookie-parser")
const App =  express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
// Configure bodyparser to handle post requests
App.use(cors({ origin: ["http://localhost:3000", "https://atlas-ke.net"] }));
App.use(bodyParser.urlencoded({extended: false}));
App.use(bodyParser.json());
App.use(cookieParser());

(async () => {
    try {
       await connectToDatabase();
      
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  })();

App.use(express.json());
App.use(cors());

App.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
App.use("/api",userRoute);
App.use("/api/otp",twiliootp);
App.use("/api/otp/africa",africaStakling)
App.use("/api/resetPassword",resetSendPassword)
App.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})