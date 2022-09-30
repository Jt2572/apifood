const { Router } = require("express")
const { Recipe, Diets } = require('../../db');
const router = Router();

router.post("/",  async (req, res) => {
    
    const { name, summary, score, instructions, diets, image } = req.body;            
    
    try { 
       
        let recipeCreated = await Recipe.create({name, image: image ||
              "https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
               summary, score, instructions         
        });

        const diet = await Diets.findAll({
        where: { name: diets },
        });
      
        recipeCreated.addDiet(diet);            
        return res.json(recipeCreated);     

    }
    catch(e){
        console.log(e.message)
    }

})

module.exports = router;
