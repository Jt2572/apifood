require("dotenv").config();
const { YOUR_API_KEY } = process.env;
const axios = require("axios");
const food = require('./food.json');
const {Recipe,Diets} = require("../../db");

const apiResp = async () => {
  try {

    // const apiResponse = await axios.get(
    //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    
    // const apiRecipes = apiResponse.data.results && apiResponse.data.results.map(r => {

    
    
    const apiRecipes = food.results && food.results.map(r => {
         return {
          id: r.id,
          image: r.image,
          name: r.title,
          diet: r.diets,
          score: r.healthScore,
          summary: r.summary,          
         }
    })      
    return apiRecipes;   
    
  } catch (error) {
    console.log(error);
  }
};

const dbRecipes = async () => {
  try {
    const db = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const findRecipe = db.map((n) => ({
      id: n.id,
      image: n.image,
      name: n.name,
      diet: n.diets.map((d) => d.name),
      score: n.score,
      summary: n.summary,      
    }));
    return findRecipe;
  } catch (error) {
    console.log(error);
  }
};


const allRecipes = async () => {
  try {
    const api = await apiResp();
    const db = await dbRecipes();
    const all = [... api, ...db];
    return all;
  } catch (error) {
    console.log(error);
  }
};



const apiName = async (name) => {
  try {
    
    // const names = food.results.map((r) => {

    const apiResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    
    let apiNames = apiResponse.data.results && apiResponse.data.results.map(r => {
      return {
          id: r.id,
          image: r.image,
          name: r.title,
          diet: r.diets,
          score: r.healthScore,
          summary: r.summary,
      };
    });
        return apiNames.filter((n) =>
        // return names.filter((n) => n.score > name
          n.name.toLowerCase().includes(name.toLowerCase())
        );
   
  } catch (error) {
    console.log(error);
  }
};


const dbName = async (name) => {
  
  try {
    const names = await Recipe.findAll({
      where: { name},
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const dbNames = names.map((n) => ({
      id: n.id,
      image: n.image,
      name: n.name,
      diet: n.diets.map((d) => d.name),
      score: n.score,
      summary: n.summary,
   
    }));
    return dbNames;
  } catch (error) {
    console.log(error);
  }
};

const allNames = async (name) => {
  try {
    const api = await apiName(name);
    const db = await dbName(name);
    // const all = api.concat(db);
    all = [...api, ...db]
    return all;
  } catch (error) {
    console.log(error);
  }
};



module.exports.getRecipes = async(req,res)=>{
  const { name } = req.query;  
  
  try {
    const totalRecipes = await allRecipes();   
    if (!name) {      
          return res.json(totalRecipes);
    } else if (name) {
      const totalNames = await allNames(name);
      return res.json(totalNames);
    } else {
      return res.status(404).json({ message: "Recipe Not Found" });
    }
  } catch (error) {
    console.log(error.message);
  }
};
