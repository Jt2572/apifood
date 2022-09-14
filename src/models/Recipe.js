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
    // code: { type: DataTypes.STRING, 
    //   unique: 'compositeIndex',    
    //   defaultValue: function () {
    //     return 'REC'
    //   }
    //  },
    
    // id: {
    //    type: DataTypes.INTEGER, 
    //    primaryKey:true,
    //    autoIncrement:true,
    //   defaultValue: function() {
    //     // return 'R'+Math.floor(Math.random()*100)
    //     return parseInt(this.id)  *5
        
    // }
       
    // },
      
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
//  diet : {
//   type: Sequelize.ARRAY[Sequelize.TEXT],
//  },
    
    instructions: {
      type: DataTypes.TEXT,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: false
  });
};