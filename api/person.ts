import express from "express";
import { dbconn } from "../dbconnents";
import { Person } from "../model/all";
import mysql from "mysql";

export const router = express.Router();

router.get('/', (req, res)=>{
    res.status(201).send('Get in person.ts');
});

// get 
router.get("/getPersonAll", (req, res) => {
    
    if (req.query){
                
        const sql = "SELECT * FROM `Person`";
        dbconn.query(sql, (err, result) => {
            res.status(201).json(result);   
        });
    } else {
        res.status(201).send("error!");
    }
});

// post
router.post("/postPerson", (req, res) => {

    if (req.query){
                
        const person: Person = req.body;
        let sql = "INSERT INTO `Person`(`name`, `birthday`, `gerder`, `occupation`, `biography`) VALUES (?,?,?,?,?)";
        sql = mysql.format(sql, [
            person.name,
            person.birthday,
            person.gerder,
            person.occupation,
            person.biography
        ]);
        dbconn.query(sql, (err, result) =>{
            if (err) throw err;
            res.status(201).json({
                affected_rows: result.affectedRows,
                last_idx: result.insertId
            });
        });
    } else {
        res.status(201).send("error!");
    }
});

// delete
router.delete("/delete/:id", (req, res) => {

    if (req.query){
                
        const id = req.params.id;
        let sql = "DELETE FROM `Person` WHERE pid = ?";
        sql = mysql.format(sql, [id]);
        dbconn.query(sql, (err, result) =>{
            if (err) throw err;
            res.status(201).json({
                affected_rows: result.affectedRows,
                last_idx: result.insertId
            });
        });
    } else {
        res.status(201).send("error!");
    }
});