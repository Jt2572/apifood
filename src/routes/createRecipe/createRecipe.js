const { Router } = require("express")
const { Recipe, Diets } = require('../../db');
const { types } = require("../../utils/dietTypes");
const router = Router();

router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const {
      name,
      image,
      summary,
      score,
      healthScore,
      instructions,
      dietTypes,
      createdByUser,
    } = req.body;
    const newRecipe = await Recipe.create({
      name,
      image:
        image ||
        "https://p4.wallpaperbetter.com/wallpaper/314/740/853/vegetables-fork-spoon-plate-wallpaper-preview.jpg",
      summary,
      score,
      healthScore,
      dietTypes,
      instructions,
      createdByUser,
    });
 
    var dt=[];
    const diet = await Diets.findAll();
    if (!diet.length) {
      console.log('no diets')

      let diets = types.map(async (d) => {
        await Diets.findOrCreate({
          where: { name: d },
        });      
      });
      await Promise.all(diets)
    }

    for (let i=0; i<dietTypes.length ; i++) {
      dt.push( await Diets.findOne({where:{name:dietTypes[i]}}) )
    }

    dt.map( async d=> await newRecipe.addDiet(d.id))
    
    // let nr = await Recipe.findOne({
    //   where: {
    //     name: 'pan artesanal'
    //   },
    //   include: Diets
    // })
    // console.log(nr)    

  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
