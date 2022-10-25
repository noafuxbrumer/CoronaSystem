const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

 const functions = {
   
    AllVacciensById: (req, res) => {
            try {
                let id=parseInt(req.params.id);
                con.query(`select * from thedateofreceivingthevaccine t join manufacturersvaccines m
                on m.IdMVS=t.IdMHS
                where Id=${id}`, (err, result) => {
                    if (err) {
                        res.status(404).send('the details are not correct')
                    }
    
                    res.send(result)
                })
            }
            catch {
                console.log(err);
                res.sendStatus(500)
                res.send(err)
    
            }
        },
        AddCoronaVacciens : (req, res) => {
            try {
                let id=parseInt(req.params.id);
                let {dateVaccine,idMHS}=req.body;
             con.query(`select * from thedateofreceivingthevaccine
                where Id=${id}
                having count(Id)<=4;`, (err, result) => {
                    if (err) {
                        res.status(404).send('the details are not correct')
                    }
                    else{
                    res.send(result)
                    con.query(`insert into thedateofreceivingthevaccine(Id,DateVaccine,IdMHS)values(${id},${dateVaccine},${idMHS})`, (err, result) => {
                        if (err) {
                            res.status(404).send('the details are not correct')
                        }
                        else{
                            
                            res.send(result)
                        }});
                    }
                });
    
            } catch (err) {
                console.log(err);
                res.sendStatus(500)
                res.send(err)
            }
        },
    

   


};
module.exports = functions;