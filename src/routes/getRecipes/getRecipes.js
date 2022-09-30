require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const food = require('./food.json');
const { toId } = require('../../utils/toId.js')
const { Recipe, Diets } = require("../../db");
const { Op } = require("sequelize");

module.exports.getRecipes = async (req, res) => {
  const { name } = req.query;
  var cont = 0;
  var recsCreated = []
  var resp = []
  var msg = ''
  console.log(req.query)
  try {
    let recs = await Recipe.findAll()
    if (recs.length === 0) {
      cont++
      msg = 'recipes created'
      recs = food.results.map(r => {
        Recipe.create({
          name: r.title,
          image: r.image,
          summary: r.summary,
          score: r.healthScore,
          instructions: r.analyzedInstructions.steps,
          dietTypes: r.diets
        });
        console.log('r.diets ',r.diets)      
      })
      await Promise.all(recs)
    } else {
      msg = 'recipes in DB'
      console.log(cont)
      resp = await Recipe.findAll({
     
      })
      if (!name) {
        recsCreated=resp        
      } else  {
        recsCreated = resp.filter( (n) => n.name.toLowerCase().includes( name.toLowerCase() ) );        
        if (!recsCreated.length)          
          return res.json({message:'there`s no recipe'})        
      } 
    }
  } catch (error) {
    console.log(error.message)
  }
  res.json(recsCreated)
}