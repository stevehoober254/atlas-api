const Encumbarance  = require("../../../Models/Encumbarance")



//get total Encumbarances

const  getTotalEncumbrances= async()=>{
    const totalEncumbrances = await Encumbarance.countDocuments();
    return totalEncumbrances;
}

//return all encumbrances
const getAllEncumbrances = async () => {

    const  encumbrances = await Encumbarance.find({});
    return encumbrances;
}

module.exports={
    getTotalEncumbrances,
    getAllEncumbrances
};