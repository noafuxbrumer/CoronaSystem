const express=require('express')
const router=express.Router()
const app=express()
const vacciens=require('../controller/Vacciens')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 

router.post('/addCoronaVacciens/:id',vacciens.AddCoronaVacciens);
router.get('/allVacciensById/:id',vacciens.AllVacciensById);

module.exports=router;