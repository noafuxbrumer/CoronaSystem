const express=require('express')
const router=express.Router()
const app=express()
const coronaMembers=require('../controller/CoronaMembers')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 



 router.get('/getCoronaMemberById/:id',coronaMembers.CoronaMemberById);
 router.post('/addCoronaMember/:id',coronaMembers.AddCoronaMember);
 router.post('/updateCoronaMember/:id',coronaMembers.UpdateCoronaMember);

module.exports=router;