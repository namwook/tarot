"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.router = express.Router();
/* GET home page. */
exports.router.get('/', (req, res) => {
    res.render('index', { title: 'Today Tarot' });
});
//# sourceMappingURL=index.js.map