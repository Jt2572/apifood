const { Router } = require("express")
const { Recipe, Diets } = require('../../db');
const router = Router();

router.post("/",  async (req, res) => {
    
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
          instructions,
          createdByUser,
        });
        const diet = await Diets.findAll({
          where: { name: dietTypes[0] },
        });
        
        console.log('dietTypes', dietTypes[0])
        console.log('diet', diet[0].id)
        newRecipe.addDiet( diet[0].id);
        
        let resp = await Recipe.findAll({
            where: { name: "pan dulce" },
            include: {
                model: Diets,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        })
        res
        // return res.status(200).send("Recipe created succesfully!");
        // console.log('resp ', resp.diets)
        for (let i=0; i<resp.length; i++) {
            // console.log("resp[i].diets[0].name ", resp[i].diets[0]&&  resp[10].dietTypes=resp[i].diets[0].name)    
            resp[i].diets[0]&&  (resp[i].dietTypes = resp[i].diets[0].name)
        }

        //  resp.map( (r,i)=> r.diets.length?  r.dietTypes=(r.diets.map(d=>d.name ) ) :console.log(r.name))
        // resp[10].dietTypes = resp[10].diets[0].name
        // console.log("resp[1].dietTypes ", resp[1].dietTypes)
        // console.log("resp[1].diets", resp[1].diets[0])
        
        res.send(resp[12]);
        return
        
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
