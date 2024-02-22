const express = require("express");
const connectToDatabase = require("./config/dbConnect");
const userRoute = require("./routes/userRoutes/routes");
const twiliootp = require("./routes/otpVerification/route");
const africaStakling = require("./routes/africastalking/route");
const resetSendPassword = require("./routes/passwordreset/route");
const resetPasswordByPhoneNumber = require("./routes/passwordresetphonewithNumber/route")

require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const App = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

// Connect to the database
(async () => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "https://atlas-ke.net"];
App.use(cors({
    origin: allowedOrigins,
    exposedHeaders: 'Set-Cookie'
}));

// Body parsing middleware
App.use(bodyParser.urlencoded({ extended: false }));
App.use(bodyParser.json());
App.use(cookieParser());

// Define routes
App.use("/api", userRoute);
App.use("/api/otp", twiliootp);
App.use("/api/otp/africa", africaStakling);
App.use("/api/resetPassword", resetSendPassword);
App.use("/api/resetPasswordPhoneNumber", resetPasswordByPhoneNumber);

// Start the server
App.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
