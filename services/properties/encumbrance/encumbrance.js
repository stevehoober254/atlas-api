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

//TODO
//get all resolved encumbrances
//get all  pending encumbrances 
//get all  rejected encumbrances

module.exports={
    getTotalEncumbrances,
    getAllEncumbrances
};