const express=require('express')
const router=express.Router()
const members=require('./Members')
const coronaMembers=require('./CoronaMembers')
const manufacturersVaccines=require('./ManufacturersVaccines')
const vacciens=require('./Vacciens')



router.get('/',(req,res)=>{
    res.send(' gettttttttttt')
})
router.use('/members',members);
router.use('/coronaMembers',coronaMembers);
router.use('/manufacturersVaccines',manufacturersVaccines);
router.use('/vacciens',vacciens);

module.exports=router;