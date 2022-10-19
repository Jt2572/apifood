const  { Diets }  = require('../../db');
const { types} = require ('../../utils/dietTypes.js')

module.exports.getDietTypes = async (req,res) => {

  try {

    let dietsDB = await Diets.findAll()
    if (!dietsDB.length) { console.log('no diets')}
         
    let diets= types.map(async (d) => {
      await Diets.findOrCreate({
        where: { name: d },
      });
    });
    
      await Promise.all(diets)
    let response = await Diets.findAll()
    // console.log(response.map(r=>r))
    return res.json(response)
    
} catch (error) {
  console.log(error);
}

  
};
