"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const info_1 = require("./info");
exports.router = express.Router();
exports.router.get('/', (req, res) => {
    res.send('rsc plz');
});
//FIXME: 카드 자리 중복 입력시에 제출 금지 -> 수정..
exports.router.post('/', (req, res) => {
    let d = new Date();
    let todayDate = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString();
    const name = req.body.id.toString();
    const fst = req.body.fst;
    const sec = req.body.sec;
    const third = req.body.third;
    let list;
    let randomFirstIndex;
    let randomSecIndex;
    let randomThirdIndex;
    //FIXME: 지금은 list로 전해져오지만 json을 통해서 list를 반환받아야함
    list = userInfoSearch(name, todayDate);
    console.log(`return list : ${list}`);
    randomFirstIndex = list[fst];
    randomSecIndex = list[sec];
    randomThirdIndex = list[third];
    const tarotContent = jsonRead();
    let f_name = tarotContent.tarotName[randomFirstIndex];
    let s_name = tarotContent.tarotName[randomSecIndex];
    let t_name = tarotContent.tarotName[randomThirdIndex];
    let f_content = tarotContent.tarotMeaning[randomFirstIndex];
    let s_content = tarotContent.tarotMeaning[randomSecIndex];
    let t_content = tarotContent.tarotMeaning[randomThirdIndex];
    res.render('users', {
        title: 'Today Tarot', name: name,
        past: f_content, present: s_content, future: t_content,
        past_name: f_name, present_name: s_name, future_name: t_name,
        img_past: '/images/' + f_name + '.jpg',
        img_present: '/images/' + s_name + '.jpg',
        img_future: '/images/' + t_name + '.jpg'
    });
});
//FIXME: User정보를 JSON으로 저장.
function saveInfo(name, date) {
    let list;
    let savedName = new Map();
    //name을 매개로 date에 맞는 consCArd를 꺼내자
    let sU = { id: name, date: date, constCard: [] };
    // 저장된게 하나도 없으면 초기화
    if (savedName.size == 0) {
        let user = new info_1.User(name);
        list = user.getCard(date);
        savedName.set(name, [sU]);
        savedName.get(name)[0].constCard = list;
        // return list;
    }
    //이름 탐색
    /*let c = false;
    for (let i = 0; i < savedName.size; i++) {
        if (savedName.get(name)[i].id == name) {
            // FIXME: 정보를 Json에서 찾아야함.
            // 이미 name이 있을 경우,
            c = true;
            list = savedName.get(name)[0].constCard;
            // return list;
        }
    }

    if (!c) {
        let user = new User(name);
        list = user.getCard(date);
        savedName.set(name, [sU]);
        savedName.get(name)[0].constCard = list;
        // return list;
    }

    let data = JSON.stringify(savedName.get(name)[0]);

    //FIXME: writefilesync를 하면 연결을 재설정해야한다는 오류가난다... ㅠㅠ
    // let fileJson = fs.writeFileSync("./public/json/userInfo.json", data, 'utf8');
    */
}
function userInfoSearch(name, todayDate) {
    //FIXME: User 정보 Json File로 정리해서 꺼내서 탐색.
    let readJson = fs.readFileSync("./public/json/userInfo.json", 'utf8');
    let rstCard = JSON.parse(readJson).constCard;
    return rstCard;
}
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
            if (listBool[i] == true)
                c++;
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