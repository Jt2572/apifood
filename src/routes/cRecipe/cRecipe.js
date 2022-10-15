const { Router } = require('express');
const { Op } = require('sequelize');
const { Diets } = require('../../db');
const { types } = require('../../utils/dietTypes');

const router = Router();

router.post('/', async (req, res) => {
    var resp = []
    try {
        console.log(req.body)
        
        resp = await Diets.findAll({
            attributes: ['name']
        })


        // console.log(resp)

    } catch (error) {
        console.log(error.message)
    }
    res.send((resp))
})

module.exports = router;