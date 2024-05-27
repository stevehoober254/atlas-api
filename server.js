const express = require("express");
const connectToDatabase = require("./config/dbConnect");
const userRoute = require("./routes/public/auth/routes");
const twiliootp = require("./routes/otpVerification/route");
const africaStakling = require("./routes/africastalking/route");
const resetSendPassword = require("./routes/passwordreset/route");
const registryRoute = require("./routes/registrar/route")
const adminRoute = require("./routes/admin/route")
const publicPropertyRoute = require("./routes/public/property/route")
const resetPasswordByPhoneNumber = require("./routes/passwordresetphonewithNumber/route")
const mpesaRoute = require('./routes/mpesa/route');

require('dotenv').config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const App = express();
const cors = require("cors");
const PORT = process.env.PORT || 4000;

// Connect to the database
(async () => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();

// CORS configuration
const allowedOrigins = ["http://localhost:3000", "https://atlas-ke.net", "http://localhost:3000/", "https://atlas-ke.net/"];
App.use(cors({
    origin: allowedOrigins,
    exposedHeaders: 'Set-Cookie'
}));
App.options('*', cors());

// Body parsing middleware
App.use(bodyParser.urlencoded({ extended: true, limit: "50mb", parameterLimit: 50000 }));
App.use(bodyParser.json({ limit: '50mb' }));
App.use(cookieParser());


// Define routes
App.use("/api", userRoute);
App.use("/api/public", publicPropertyRoute);
App.use("/api/registry", registryRoute);
App.use("/api/admin", adminRoute);
App.use("/api/otp", twiliootp);
App.use("/api/otp/africa", africaStakling);
App.use("/api/resetPassword", resetSendPassword);
App.use("/api/resetPasswordPhoneNumber", resetPasswordByPhoneNumber);
App.use("/api/mpesa", mpesaRoute)


// Server Check
App.use('/health', (req, res) => res.json({ message: 'Server is Running!' }))

// Start the server
App.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
