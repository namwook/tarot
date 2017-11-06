import * as express from 'express';
import * as fs from 'fs';
import {Request, Response} from "express";
import * as path from 'path';
import {User} from "./info";


export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.send('rsc plz');
});

//FIXME: 카드 자리 중복 입력시에 제출 금지 -> 수정..
router.post('/', (req: Request, res: Response) => {

    let d = new Date();
    let todayDate = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString();

    const name = req.body.id.toString();
    const fst = req.body.fst;
    const sec = req.body.sec;
    const third = req.body.third;
    let list: number[];
    let randomFirstIndex: number;
    let randomSecIndex: number;
    let randomThirdIndex: number;

    //test
    let test = saveInfo(name, todayDate);
    console.log(test);

    //FIXME: 지금은 list로 전해져오지만 json을 통해서 list를 반환받아야함
    list = userInfoSearch(name, todayDate);

    console.log(`return list : ${list}`);

    randomFirstIndex = list[fst];
    randomSecIndex = list[sec];
    randomThirdIndex = list[third];

    const tarotContent = jsonRead("./public/json/tarot.json");

    let f_name = tarotContent.tarotName[randomFirstIndex];
    let s_name = tarotContent.tarotName[randomSecIndex];
    let t_name = tarotContent.tarotName[randomThirdIndex];

    let f_content = tarotContent.tarotMeaning[randomFirstIndex];
    let s_content = tarotContent.tarotMeaning[randomSecIndex];
    let t_content = tarotContent.tarotMeaning[randomThirdIndex];

    let resultTarot = jsonRead("./public/json/result.json");
    let result = resultTarot[getRandom(0, 3) % 3];

    res.render('users', {
        title: 'Today Tarot', name: name,
        past: f_content, present: s_content, future: t_content,
        past_name: f_name, present_name: s_name, future_name: t_name,
        img_past: '/images/' + f_name + '.jpg',
        img_present: '/images/' + s_name + '.jpg',
        img_future: '/images/' + t_name + '.jpg',
        result: result
    })
    ;

});

//FIXME: User정보를 JSON으로 저장.
function saveInfo(name: string, date: string) {
    console.log('=====================save info======================');
    let list: number[];
    type savedUser = { id: string, date: string, constCard: number[] };
    let savedName: Map<string, savedUser[]> = new Map<string, savedUser[]>();
    let userDataPath = path.join(__dirname, '..', 'public/userData');
    let sU: savedUser = {id: name, date: date, constCard: []};

    let user = new User(name);
    list = user.getCard(date);
    savedName.set(name, [sU]);
    savedName.get(name)[0].constCard = list;

    // User 정보를 'public/userData/현재 날짜' 디렉토리에 name.json 으로 저장한다
    let userMapIter = savedName.keys();

    for (let i = 0; i < savedName.size; i++) {
        let key = userMapIter.next().value;
        let data = JSON.stringify(savedName.get(key)[i]);
        let userDirName = path.join(userDataPath, savedName.get(name)[i].date);
        let userFileName = path.join(userDirName, savedName.get(name)[i].id + '.json');

        console.log(`data : ${data}`);
        console.log(`user file name is : ${userFileName}`);

        if (!fs.existsSync(userDirName)) fs.mkdirSync(userDirName);
        if (!fs.existsSync(userFileName)) fs.writeFileSync(userFileName, data, 'utf8');
    }
}


function userInfoSearch(name: string, todayDate: string) {
    console.log('=====================userinfosearch======================');

    let readJson = fs.readFileSync('./public/userData/' + todayDate + '/' + name + '.json', 'utf8');
    let rstCard: number[] = JSON.parse(readJson).constCard;

    console.log(`readJson id is : ${JSON.parse(readJson).id}`);
    console.log(`result card is : ${rstCard}`);

    return rstCard;
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function jsonRead(path: string) {
    let fileJson = fs.readFileSync(path, 'utf8');
    const fileJContent = JSON.parse(fileJson);
    return fileJContent;
}

