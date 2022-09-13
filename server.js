const axios = require('axios');
var express = require('express');
const app = express();
const cookieParser = require("cookie-parser");



const getAllRecipes = require('./routes/getAllRecipes.js')
// const getMisc = require('./routes/getMisc.js')
// const postUser = require('./routes/postUser.js')
// const getId = require('./routes/getId.js')
// const getU = require('./routes/getu.js')
// const getUsa = require('./routes/getusa.js')

const server = express();

server.use(express.json()) // middleware para interpretar datos

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
// server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.get('/', getAllRecipes)

// server.get('/misc', getMisc)

// server.get('/:id', getId)

// server.post('/', postUser)

// server.get('/',(req,res)=>{
//      res.status(300).json(['Franco', 'Toni', 'Martu']); 
// })

// app.get('/', async (req, res) => {

//     // const c = await axios.get('https://restcountries.com/v2/all')
//     // const c = await axios.get('./allCountries.json')    
//     let d = await axios.get('./allCountries.json')    


//     console.log('estoy en /')
//     // res.status(200).json({msg: 'estoy en barra'})  
//     res.status(200).json(d)  
// })


// app.get('/', (req, res) => {
//     return res.status(300).json(['Franco', 'Toni', 'Martu']);
//   });



// app.post('/users', (req,res) => {
//     const { name, lastName } = req.body
//     res.send(`Usuario ${name} ${lastName} creado con exito`)
// })

// app.get('/query', (req,res)=>{  // http://localhost:3000/query?name=Jairo&lastName=Torres%20Lujan
//     console.log('soy las querys',req.query)
//     const { name, lastName } = req.query;
//     res.json({name: name, lastName:lastName})
// })

module.exports= server
