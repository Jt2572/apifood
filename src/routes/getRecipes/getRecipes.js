const  { Diets }  = require('../../db');
const { types} = require ('../../utils/dietTypes.js')

module.exports.getRecipes = async (req,res) => {

   
    
    try {
           
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
