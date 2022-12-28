require("dotenv").config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const modelRecipe = require('./models/Recipe.js')
const modelDiets = require('./models/Diets.js');

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY, DB_NAME, DATABASE_URL, LDB_URL, API_KEY,
} = process.env;



// const sequelize = new Sequelize(
//   DATABASE_URL
//     ? `${DATABASE_URL}`
//     : `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
//   {
//     logging: false, // set to console.log to see the raw SQL queries
//     native: false, // lets Sequelize know we can use pg-native for ~30% more speed
//     ssl: process.env.PORT ? true : false,
//     dialectOptions: process.env.PORT
//       ? {
//           ssl: { require: true, rejectUnauthorized: false },
//         }
//       : {},
//   }
// )


var sequelize = new Sequelize(
   DB_DEPLOY,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   
  }
);


// const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/food`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });


const basename = path.basename(__filename);


const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
modelRecipe(sequelize);
modelDiets(sequelize)

const { Recipe, Diets } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Recipe.belongsToMany(Diets, { through: "Diets_Recipes" })
Diets.belongsToMany(Recipe, { through: "Diets_Recipes" })

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};