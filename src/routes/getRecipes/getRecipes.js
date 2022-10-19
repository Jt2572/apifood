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
        let allRecs = await Recipe.findAll()
        

    console.log(allRecs.length)
    
    allRecs.map(async r=> { 
                          //  console.log ( await Recipe.findOne({where: {name: r.name }}) )  
                           let newRec = await Recipe.findOne({where: {name: r.name }})

                                    newRec.dietTypes.map(async d=> {
                                    // console.log(d)
                                    let newD = await Diets.findOne({where: {name:d}}) 
                                     await newRec.addDiet(newD)
                                    // console.log(newD.id)     
                                  }
                                    )      


                           }) 
        
        
        // dt.map( async d=> await newRecipe.addDiet(d.id))
        
      }
    } catch (error) {
      console.log(error.message)
    }  

    let allRecs = await Recipe.findAll()
        

    console.log(allRecs.length)
    
    allRecs.map(async r=> { 
                          //  console.log ( await Recipe.findOne({where: {name: r.name }}) )  
                           let newRec = await Recipe.findOne({where: {name: r.name }})

                                    newRec.dietTypes.map(async d=> {
                                    // console.log(d)
                                    let newD = await Diets.findOne({where: {name:d}}) 
                                     await newRec.addDiet(newD)
                                    // console.log(newD.id)     
                                  }
                                    )      


                           }) 
                           

    // console.log(newRec.dietTypes)
    // newRec.dietTypes.map(async d=> {
    //   console.log(d)
    //   let newD = await Diets.findOne({where: {name:d}}) 
    //   await newRec.addDiet(newD)
    //   console.log(newD.id)     
    // }
    //   )

    // console.log(dr)
    // await newRec.addDiet(d.id)
    

    
    
    
    
    if (!name) {
      recsCreated =  await Recipe.findAll({include:Diets})
      // console.log(recsCreated)
    } else {
      recsCreated =  await Recipe.findAll({include:Diets})
      recsCreated.filter((n) => n.name.toLowerCase().includes(name.toLowerCase()));
      if (!recsCreated.length)
      res.json({ message: 'there`s no recipe' })
    }
    resp = await Recipe.findAll({include:Diets})
    
  return res.json(resp)
}