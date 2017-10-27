import * as express from 'express';
import {Request, Response} from "express";

export const router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response) => {

    res.render('index', {title: 'Today Tarot'});
});