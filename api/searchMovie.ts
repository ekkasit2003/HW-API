import express from "express";
import { dbconn } from "../dbconnents";
import { Movie } from "../model/all";
import mysql from "mysql";

export const router = express.Router();

router.get('/', (req, res)=>{
    res.status(201).send('Get in searchMovie.ts');
});

// get 
router.get("/Search", (req, res) => {
    
    if (req.query){
                
        const sql = `SELECT *
                    FROM Movie
                    INNER JOIN Star ON Movie.mid = Star.MovieID
                    INNER JOIN Person ON Person.pid = Star.PersonID
                    WHERE title IS NOT NULL AND title LIKE ?`;
        const sql2 = `SELECT *
                    FROM Movie
                    INNER JOIN Creators ON Movie.mid = Creators.MovieID
                    INNER JOIN Person ON Person.pid = Creators.PersonID
                    WHERE title IS NOT NULL AND title LIKE ?`;

        dbconn.query(sql, ["%" + req.query.title + "%"], (err, result1) => {
            if (err) throw err;
            dbconn.query(sql2, ["%" + req.query.title + "%"], (err, result2) => {
                if (err) throw err;
                const result = {
                    star: result1,
                    creators: result2
                }
                res.status(201).json(result);               
            });
        });
    } else {
        res.status(201).send("error!");
    }
});