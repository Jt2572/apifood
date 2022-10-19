require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const food = require('./food.json');
  const { toId } = require('../../utils/toId.js')
const { Recipe, Diets } = require("../../db");
const { Op } = require("sequelize");
const { types } = require('../../utils/dietTypes.js')

module.exports.getRecipes = async (req, res) => {
  const { name } = req.query;  
  var recsCreated = []
  var resp = []
  
  try {
      // console.log(food.results[0])
      // resp=food.results[0].diets
      let diet=await Diets.findAll()
      
      if (!diet.length) {
        console.log('no diets')
        
        let diets = types.map(async (d) => {
          await Diets.findOrCreate({
            where: { name: d },
          });
        });
        await Promise.all(diets)        
        resp=await Diets.findAll()


      } else {
        let dietDb = await Diets.findOne({where:{name:'primal'}})
        resp=dietDb
        console.log(dietDb)
        
      }



    } catch (error) {
      console.log(error.message)
    }  

   

    
    
    
 
    
    
  return res.json(resp)
}