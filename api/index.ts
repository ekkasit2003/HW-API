import express from "express";

export const router = express.Router();

router.get('/', (req, res)=>{
    res.status(201).send('Get in index.ts');
});
