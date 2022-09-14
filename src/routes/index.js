
const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { getRecipes}  = require('../routes/getRecipes/getRecipes.js')
const { getDietTypes } = require('../routes/diets/getDiets.js')
const  createRecipe  = require('../routes/createRecipe/createRecipe.js')
const {getRecipeById} = require('../routes/getRecipeById/getRecipeById.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes/:id', getRecipeById)
router.use('/recipes', getRecipes)
router.use('/types', getDietTypes)
router.use('/createrecipe', createRecipe);



module.exports = router; 