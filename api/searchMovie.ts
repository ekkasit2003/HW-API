import express from "express";
import { dbconn } from "../dbconnents";


export const router = express.Router();

router.get('/', (req, res)=>{
    res.status(201).send('Get in searchMovie.ts');
});

// get 
router.get("/Search", (req, res) => {

    if (req.query.title) {

        const searchData = "%" + req.query.title + "%";

        const sql = `
            SELECT *
            FROM Movie
            INNER JOIN Creators ON Movie.mid = Creators.MovieID
            INNER JOIN Person ON Person.pid = Creators.PersonID
            WHERE title IS NOT NULL AND title LIKE ?`;
        const sql2 = `
            SELECT *
            FROM Movie
            INNER JOIN Star ON Movie.mid = Star.MovieID
            INNER JOIN Person ON Person.pid = Star.PersonID
            WHERE title IS NOT NULL AND title LIKE ?`;

        dbconn.query(sql, [searchData], (err, result1) => {
            if (err) throw err;
            dbconn.query(sql2, [searchData], (err, result2) => {
                if (err) throw err;
                const result = {
                    creators: result1,
                    star: result2
                };
                res.status(201).json(result);
            });
        });
    } else {
        res.status(201).send("error!");
    }
});