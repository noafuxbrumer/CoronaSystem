const express=require('express')
const router=express.Router()
const app=express()
const members=require('../controller/Members')
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 



 router.post('/addMember',members.AddMember);
 router.get('/getAllMembers',members.AllMember);
 router.post('/updateMember/:id',members.UpdateMember);
 router.delete('/deleteMember/:id',members.DeleteMember);

module.exports=router;