const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

 const functions = {
    AllVacciens: (req, res) => {
        try {
            
            con.query(`select * from  manufacturersvaccines`, (err, result) => {
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
  };
    
    
    
 module.exports = functions;