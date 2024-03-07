import express from "express";
import { dbconn } from "../dbconnents";
import { Movie } from "../model/all";
import mysql from "mysql";

export const router = express.Router();

router.get('/', (req, res)=>{
    res.status(201).send('Get in movie.ts');
});

// get 
router.get("/getMovieAll", (req, res) => {
    
    if (req.query){
                
        const sql = "SELECT * FROM `Movie`";
        dbconn.query(sql, (err, result) => {
            res.status(201).json(result);   
        });
    } else {
        res.status(201).send("error!");
    }
});

// post
router.post("/postMovie", (req, res) => {

    if (req.query){
                
        const movie: Movie = req.body;
        let sql = "INSERT INTO `Movie`(`title`, `genre`, `duration`, `rating`, `description`) VALUES (?,?,?,?,?)";
        sql = mysql.format(sql, [
            movie.title,
            movie.genre,
            movie.duration,
            movie.rating,
            movie.description
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
        let sql = "DELETE FROM `Movie` WHERE mid = ?";
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