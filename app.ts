import express from "express";
import bodyParser from "body-parser";
import { router as index } from "./api/index";
import { router as movie } from "./api/movie";
import { router as person } from "./api/person";
import { router as star } from "./api/star";
import { router as creators } from "./api/creators";
import { router as searchMovie } from "./api/searchMovie";

export const app = express();

app.use(bodyParser.text());
app.use(bodyParser.json());

app.use("/", index);
app.use("/movie", movie);
app.use("/person", person);
app.use("/star", star);
app.use("/creators", creators);
app.use("/searchMovie", searchMovie);