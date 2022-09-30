const { Sequelize, DataTypes } = require('sequelize');


// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo

  sequelize.define('recipe',  {

    id: { 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,    
      allowNull: false,
      primaryKey:true,     
      
    },       
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.STRING(2000),
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
    },
     
    instructions: {
      type: DataTypes.TEXT,
    },
    
    // diets: {
    //   type: DataTypes.ENUM["primal", "fodmap friendly", "whole 30"],
    // },
    
    image: {
      type: DataTypes.STRING,
    },
    
  }, {
    timestamps: false
  });
};