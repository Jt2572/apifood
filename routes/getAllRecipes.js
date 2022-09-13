const { Router, query } = require('express');
// const { data } = require('../utils/utils')
const router = Router();

const rec = [
     {
        id:1,
        name: "Cafe",
        diet:['vegetarian'],
        score:5,
        image:'https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG',
        summary: "bebida saludable y energetica facil de preparar",
        steps:"comprar el cafe y el azucar, hervir el agua y mezclar todos los ingredientes en proporcion 1a x 4c "
    },
    {
        id:2,
        name: "Pan",
        diet:['vegetarian'],
        score:7,
        image:'https://lilluna.com/wp-content/uploads/2018/12/homemade-bread-resize-6-500x375.jpg',
        summary: "delicioso, economico y facil de preparar",
        steps:"comprar todos los ingredientes, mezclarlos, amasar muy bien, hornearlos, esperar a que reposen y listo.s "
    },

]



router.get('/', (req, res) => {
    let { q } = req.query
    try {
        if (req.query.q) {

            res.json(rec)

        } else {
            res.json(rec);
        }

    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
