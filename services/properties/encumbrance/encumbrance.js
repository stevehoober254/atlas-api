const Encumbarance  = require("../../../Models/Encumbarance")



//get total Encumbarances

const  getTotalEncumbrances= async()=>{
    const totalEncumbrances = await Encumbarance.countDocuments();
    return totalEncumbrances;
}
module.exports={getTotalEncumbrances};