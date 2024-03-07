import express from "express";
import { dbconn } from "../dbconnents";
import { Star } from "../model/all";
import mysql from "mysql";

export const router = express.Router();

router.get('/', (req, res)=>{
    res.status(201).send('Get in star.ts');
});

// get 
router.get("/getStarAll", (req, res) => {
    
    if (req.query){
                
        const sql = "SELECT * FROM `Star`";
        dbconn.query(sql, (err, result) => {
            res.status(201).json(result);   
        });
    } else {
        res.status(201).send("error!");
    }
});

// post
router.post("/postStar", (req, res) => {

    if (req.query){
                
        const star: Star = req.body;
        let sql = "INSERT INTO `Star`(`MovieID`, `PersonID`, `role`) VALUES (?,?,?)";
        sql = mysql.format(sql, [
            star.MovieID,
            star.PersonID,
            star.role
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
        let sql = "DELETE FROM `Star` WHERE sid = ?";
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