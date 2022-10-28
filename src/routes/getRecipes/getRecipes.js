require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const food = require('./food.json');
const { Recipe, Diets } = require("../../db");


module.exports.getRecipes = async (req, res) => {
  const { name } = req.query;
  var recsCreated = []

  
  
  try {
    


    let recs = await Recipe.findAll()

    if (recs.length === 0) {
      
      const resp = await axios.get(        
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
      );
        
      // console.log(resp.data)
        

          recs = resp.data.results?.map( async r => {
            await Recipe.create({
              name: r.title,
              image: r.image,
              summary: r.summary,
              score: r.healthScore,
              instructions: r.analyzedInstructions.steps,
              dietTypes: r.diets
            });
          })
          await Promise.all(recs)
        

        console.log('recipes created')

            }

  } catch (error) {
    console.log(error.message)
  }

  if (!name) {
    recsCreated = await Recipe.findAll()   
  } else {
    recsCreated = await Recipe.findAll()
    let filterRec = recsCreated.filter((n) => n.name.toLowerCase().includes(name.toLowerCase()));
    if (!filterRec.length) {
      res.json({ message: 'there`s no recipe' })
    } else {
      recsCreated = filterRec
    }
  } 
  return res.json(recsCreated)
}