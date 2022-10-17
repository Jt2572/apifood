require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const { Recipe, Diets } = require("../../db");


const apiId =  async  (id) => {
  console.log(id)
    try {

      // const api = await axios.get(
      //   `https://api.spoonacular.com/recipes/${id}/information?apiKey=${YOUR_API_KEY}`
      // );
      
      // const detail = api.data;

      let resp = await Recipe.findOne({where:{name:'Cauliflower, Brown Rice, and Vegetable Fried Rice'}})
      console.log(resp)
    
      return {
        id: id,
        image: detail.image,
        name: detail.title,
        diet: detail.diets,
        summary: detail.summary,
        score: detail.healthScore,     
        instructions: detail.instructions,
      };
    } catch (error) {
      console.log(error);
    }
    console.log(resp)
  };
  
  // const dbId = async (idRec) => {
  //   try {
  //     const idDb = await Recipe.findByPk(idRec, {
  //       include: {
  //         model: Diets,
  //         attributes: ["name"],
  //         through: { attributes: [] },
  //       },
  //     });


  //     return {
  //       id: idRec,
  //       image: idDb.image,
  //       name: idDb.name,
  //       score: idDb.score,
  //       summary: idDb.summary,
       
  //       instructions: idDb.instructions,
       
  //       diet: idDb.diets.map((d) => d.name),
  //     };
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  
  const allIds = async (idRec) => {
  
    try {
      if (idRec.includes("-")) {                         
        const db = await dbId(idRec);
        return db;
      }
      const api = await apiId(idRec);
      return api;
    } catch (error) {
      console.log(error);
    }
  };



module.exports.getRecipeById = async (req,res) => {

    try {
        const { id } = req.params;
        console.log(req.params)
        // const ids = await allIds(id);
        const ids = await Recipe.findOne({where:{id:id},include:Diets})
        console.log(ids)
        if (ids) {
          return res.send(ids);
        } else {
          return res.status(404).json({ msg: "ID Not Found" });
        }
      } catch (error) {
        console.log(error);
      }


    
}