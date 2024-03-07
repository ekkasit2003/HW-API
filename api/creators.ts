import express from "express";
import { dbconn } from "../dbconnents";
import { Creators } from "../model/all";
import mysql from "mysql";

export const router = express.Router();

router.get('/', (req, res)=>{
    res.status(201).send('Get in star.ts');
});

// get 
router.get("/getcreatorsAll", (req, res) => {
    
    if (req.query){
                
        const sql = "SELECT * FROM `Creators`";
        dbconn.query(sql, (err, result) => {
            res.status(201).json(result);   
        });
    } else {
        res.status(201).send("error!");
    }
});

// post
router.post("/postCreators", (req, res) => {

    if (req.query){
                
        const creators: Creators = req.body;
        let sql = "INSERT INTO `Creators`(`MovieID`, `PersonID`, `role`) VALUES (?,?,?)";
        sql = mysql.format(sql, [
            creators.MovieID,
            creators.PersonID,
            creators.role
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
        let sql = "DELETE FROM `Creators` WHERE cid = ?";
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