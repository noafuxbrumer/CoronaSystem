const con = require('./DB')
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const functions = {
    Register: (req, res) => {
        try {
            console.log(req.body)
            let { TZ, phone, password, numCourse, name } = req.body;

            con.query(`insert into STUDENTS(TZ,name,ID_COURSES,password,COUNT_COURSES,phone) 
            values(${TZ},'${name}',${numCourse},${password},1,'${phone}');`

                , (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send('the details are not correct')
                    }
                    else {
                        const sql = `select * from STUDENTS where ID =( select LAST_INSERT_ID())`;
                        con.query(sql, (err, result) => {
                            if (err) {
                                console.log(err)
                                res.status(404).send('the details are not correct')
                            }
                            else {
                                res.send(result)
                            }
                        })
                    }
                })

        }
        catch (err) {

            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },
    
    DisplayAllConversations: (req, res) => {
        try {
            let { id } = req.params;
            con.query(`select * from CONVERSATIONS where ID_STUDENT1=${id} or ID_STUDENT2=${id}`, (err, result) => {

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
    DisplayConversationsByCourse: (req, res) => {
        try {
            let id = parseInt(req.params.id)
            con.query(`select * from CONVERSATIONS
        where (ID_STUDENT1=${id} or ID_STUDENT2=${id} )
        and ID_COURSES=(select ID_COURSES from STUDENTS where ID=${id});`, (err, result) => {
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

    // AddNewConversation: (req, res) => {
    //     try {
    //         let date = Date.now()
    //         let count_minutes = parseInt(req.body.count_minutes)
    //         let id1 = parseInt(req.body.id1)
    //         let id2 = parseInt(req.body.id2)
    //         let idCourse = parseInt(req.body.idCourse)

    //         con.query(`insert into CONVERSATIONS(ID_STUDENT1,ID_STUDENT2,DATE_CONVERSATION,ID_COURSES,COUNT_MINUTES) values(${id1},${id2},'${date}',${idCourse},${id2}
    //           ${count_minutes});select * from CONVERSATIONS 
    //          where ID_STUDENT1 =last_insert_id() and ID_STUDENT2 =last_insert_id() and DATE_CONVERSATION=${date};`, (err, result) => {
    //             if (err) {
    //                 res.status(404).send('the details are not correct')
    //             }
    //             else
    //                 res.send(result)
    //         })
    //     } catch (err) {
    //         console.log(err);
    //         res.sendStatus(500)
    //         res.send(err)
    //     }
    // },
    levelOfCourse: (req, res) => {
        try {
            let id = parseInt(req.params.id)
            con.query(`select ID_COURSES from COURSES
        where ID_COURSES=(select ID_COURSES from STUDENTS where ID=${id})`, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct')
                }

                res.send(result)
            })
        } catch (err) {
            console.log(err);
            res.sendStatus(500)
            res.send(err)
        }
    },
    teacherOfCourse: (req, res) => {
        try {
            let id = parseInt(req.params.id)
            con.query(`select ID_TEACHER,NAME,phone from TEACHERS where ID_TEACHER=(select ID_TEACHER from COURSES
        where ID_COURSES=(select ID_COURSES from STUDENTS where ID=${id}))`, (err, result) => {
                if (err) {
                    res.status(404).send('the details are not correct')
                }

                res.send(result)
            })
        }
        catch (err) {
            console.log(err);
            res.sendStatus(500)
            res.send(err)
        }
    },
    AddNewConversation: (req, res) => {
        try {
            let { DATE_CONVERSATION, COUNT_MINUTES, ID_STUDENT1, ID_STUDENT2, ID_COURSES } = req.body;

            con.query(`insert into CONVERSATIONS(ID_STUDENT1,ID_STUDENT2,DATE_CONVERSATION,ID_COURSES,COUNT_MINUTES) 
            values(${ID_STUDENT1},${ID_STUDENT2},'${DATE_CONVERSATION}',${ID_COURSES},${COUNT_MINUTES})`

                , (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(404).send('the details are not correct')
                    }
                    else {
                        console.log(result)
                        const sql = `select * from CONVERSATIONS where ID_STUDENT1 =${ID_STUDENT1} and ID_STUDENT2 =${ID_STUDENT2} and DATE_CONVERSATION='${DATE_CONVERSATION}'`;
                        con.query(sql, (err, result) => {
                            console.log(result)
                            if (err) {
                                console.log(err)
                                res.status(404).send('the details are not correct')
                            }
                            else {
                                res.send(result)
                            }
                        })
                    }
                })

        }
        catch (err) {

            console.log(err);
            res.sendStatus(500)
            res.send(err)

        }
    },


};
module.exports = functions;