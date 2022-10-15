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
    let recs = await Recipe.findAll()   

    if (recs.length === 0) {

      let diets = types.map(async (d) => {
        await Diets.findOrCreate({
          where: { name: d },
        });
      });
      await Promise.all(diets)

      recs = food.results.map(r => {
        Recipe.create({
          name: r.title,
          image: r.image,
          summary: r.summary,
          score: r.healthScore,
          instructions: r.analyzedInstructions.steps,
          dietTypes: r.diets
        });
        // console.log('r.diets ', r.diets)
      })
      await Promise.all(recs)      
      console.log('recipes created')
    }
  } catch (error) {
    console.log(error.message)
  }  
  
  resp = await Recipe.findAll()
  if (!name) {
    recsCreated = resp
    // console.log(recsCreated)
  } else {
    recsCreated = resp.filter((n) => n.name.toLowerCase().includes(name.toLowerCase()));
    if (!recsCreated.length)
      return res.json({ message: 'there`s no recipe' })
  }

  res.json(recsCreated)
}