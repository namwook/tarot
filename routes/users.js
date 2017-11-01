"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
exports.router = express.Router();
exports.router.get('/', (req, res) => {
    res.send('respond with a resource');
});
//FIXME: 카드 자리 중복 입력시에 제출 금지 -> 수정..
exports.router.post('/', (req, res) => {
    const name = req.body.id;
    const fst = req.body.fst;
    const sec = req.body.sec;
    const third = req.body.third;
    if (fst == sec || fst == third || sec == third) {
        res.render('index', { title: 'Today Tarot', msg: '중복하여 카드를 선택하지 마세용...' });
    }
    else {
        // let c = userCheck(name);
        // if (c) { // 유저가 있다면,
        let list = randomCardO();
        console.log(list);
        let r_fst = list[fst];
        let r_sec = list[sec];
        let r_third = list[third];
        const tarotContent = jsonRead();
        let f_name = tarotContent.tarotName[r_fst];
        let s_name = tarotContent.tarotName[r_sec];
        let t_name = tarotContent.tarotName[r_third];
        let f_content = tarotContent.tarotMeaning[r_fst];
        let s_content = tarotContent.tarotMeaning[r_sec];
        let t_content = tarotContent.tarotMeaning[r_third];
        console.log('/images/' + f_name + '.jpg');
        res.render('users', {
            title: 'Today Tarot', name: name,
            past: f_content, present: s_content, future: t_content,
            past_name: f_name, present_name: s_name, future_name: t_name,
            img_past: '/images/' + f_name + '.jpg',
            img_present: '/images/' + s_name + '.jpg',
            img_future: '/images/' + t_name + '.jpg'
        });
    }
    // }
});
function userCheck(name) {
    let saveName;
    if (saveName.hasOwnProperty(name)) {
        saveName.push(name);
        return true;
    }
    else {
        // 또는 여기서 User 객체 생성......
        return false;
    }
}
// FIXME: O(n^2) 낮추기
function randomCard() {
    let list1 = [];
    let list2 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
    for (let i = 0; i < 22; i++) {
        let cardIndex = getRandom(0, list2.length);
        list1.push(list2[cardIndex]);
        list2.splice(cardIndex, 1);
    }
    return list1;
}
// FIXME: O(n+) 하는중 ..
function randomCardO() {
    let listBool = new Array(22);
    let list = new Array();
    let c = 0;
    let index = 0;
    listBool.fill(false, 0, 22);
    while (c <= 21) {
        index = 0;
        let cardIndex = getRandom(0, listBool.length) % 23;
        if (listBool[cardIndex] == false) {
            list.push(cardIndex);
            listBool[cardIndex] = true;
            console.log(list);
        }
        c = 0;
        for (let i in listBool) {
            if (listBool[i] == true) {
                c++;
            }
        }
    }
    return list;
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function jsonRead() {
    let fileJson = fs.readFileSync("./public/json/tarot.json", 'utf8');
    const fileJsonContent = JSON.parse(fileJson);
    return fileJsonContent;
}
//# sourceMappingURL=users.js.map