const express=require('express')
const router=express.Router()
const app=express()
const manufacturersVaccines=require('../controller/ManufacturersVaccines')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 



 router.get('/AllVacciens',manufacturersVaccines.AllVacciens);
 

module.exports=router;