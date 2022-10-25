const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());



const functions = {
        AddMember: (req, res) => {
            try {
                
                console.log(req.body)
                let { TZ, name, AddressMH, DateBirth, tel,mobilephone } = req.body;
                let newdate=DateBirth.toString()
                
                con.query(`insert into membershealth(TZ,NameMH,AddressMH,DateBirth,Tel,MobilePhone) 
                values('${TZ}','${name}','${AddressMH}','${newdate}','${tel}','${mobilephone}');`    
                    , (err, result) => {
                        if (err) {
                            console.log(err)
                            res.status(404).send('the details are not correct')
                        }
                        else {
                          
                                    res.send(result)
                                
                        }
                    })
    
            }
            catch (err) {
    
                console.log(err);
                res.sendStatus(500)
                res.send(err)
    
            }
        },
        
        AllMember: (req, res) => {
            try {
                
                con.query(`select * from  membershealth`, (err, result) => {
    
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
        UpdateMember : (req, res) => {
            try {
                let id=parseInt(req.params.id);
                let tz=req.body.tz;
                let name = req.body.name;
                let DateBirth=req.body.DateBirth;
                let address=req.body.address;
                let tel=req.body.tel;
                let mobilephone=req.params.mobilephone;
                con.query(`UPDATE membershealth
                SET  TZ=${tz},NameMH= ${name},  AddressMH= ${address},DateBirth=${DateBirth},Tel=${tel},MobilePhone=${mobilephone}
                WHERE IdMH =${id};`, (err, result) => {
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
    
        DeleteMember: (req, res) => {
            try {
                let id=parseInt(req.params.id);
                con.query(`delete from thedateofreceivingthevaccine
                where IdMHS=${id};`, (err, result) => {
                    if (err) {
                        res.status(404).send('the members are not correct')
                    }
                    else
                        res.send(result)
                })
            } catch (err) {
                console.log(err);
                res.sendStatus(500)
                res.send(err)
            }
            con.query(`delete from coronamembershealth
            where IdCMH=${id};`, (err, result) => {
                    if (err) {
                        res.status(404).send('the members are not correct')
                    }
                    else
                        res.send(result)
                })
            
            con.query(`delete from membershealth
            where IdMH=${id};`, (err, result) => {
                    if (err) {
                        res.status(404).send('the members are not correct')
                    }
                    else
                        res.send(result)
                })
            } 
        };
    
    
    
    module.exports = functions;