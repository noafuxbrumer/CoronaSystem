const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const functions = {
    CoronaMemberById: (req, res) => {
        let id=parseInt(req.params.id);
            try {
                con.query(`select * from  coronamembershealth where IdCMH=${id}`, (err, result) => {
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
        UpdateCoronaMember : (req, res) => {
            try {
                let id=parseInt(req.params.id);
             let dateRecoveryIllness=req.body.dateRecoveryIllness;
             let dateReceiptPositiveCorona=req.body.dateReceiptPositiveCorona;
                con.query(`UPDATE coronamembershealth
                SET  DateRecoveryIllness= ${dateRecoveryIllness},DateReceiptPositiveCorona=${dateReceiptPositiveCorona}
                WHERE  IdCMH=${id};`, (err, result) => {
                    if (err) {
                        res.status(404).send('the details are not correct')
                    }
                    else
                        res.send(result)
                });
    
            } catch (err) {
                console.log(err);
                res.sendStatus(500)
                res.send(err)
            }
        },
        AddCoronaMember : (req, res) => {
            try {
                let id=parseInt(req.params.id);
                let { dateRecoveryIllness,dateReceiptPositiveCorona } = req.body;
                con.query(`insert into coronamembershealth
                SET IdCMH=${id} DateRecoveryIllness= ${dateRecoveryIllness},DateReceiptPositiveCorona=${dateReceiptPositiveCorona};`, (err, result) => {
                    if (err) {
                        res.status(404).send('the details are not correct')
                    }
                    else
                        res.send(result)
                });
    
            } catch (err) {
                console.log(err);
                res.sendStatus(500)
                res.send(err)
            }
        },
    

   


};
module.exports = functions;