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
      resp = await Diets.findAll()


    } catch (error) {
      console.log(error.message)
    }  

   

    
    
    
 
    
    
  return res.json(resp)
}