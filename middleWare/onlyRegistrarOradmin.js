const asyncHandler = require("express-async-handler");


const onlyRegistrarOrAdmin = asyncHandler(async (req, res, next) => {
   

            // Check if the user's role is "registry" or "admin"
            if (req.user.role !== "registry" && req.user.role !== "admin") {
                return res.status(403).json({ message: "User is not authorized" });
            }
            next();
           
});

module.exports = {onlyRegistrarOrAdmin};
