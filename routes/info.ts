export class User {
    created: string[];
    name: string;
    constCard: number[][];

    constructor(id: string) {
        let d = new Date();
        let date = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString();
        this.created = [date];
        this.name = id;
        this.constCard = new Array();
        this.RandomCard();
    }

    RandomCard() {
        let listBool = new Array(22);
        let list = new Array();
        let c: number = 0;
        let index: number = 0;

        listBool.fill(false, 0, 22);

        while (c <= 21) {
            index = 0;
            c = 0;
            let cardIndex = this.getRandom(0, listBool.length) % 23;

            if (listBool[cardIndex] == false) {
                list.push(cardIndex);
                listBool[cardIndex] = true;
            }

            for (let i in listBool) {
                if (listBool[i] == true) {
                    c++;
                }
            }
        }
        this.constCard.push(list);
    }

    getRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    //FIXME : card 날짜에 상관없이 쌓이니깐 고치기
    makeCard(date: string) {
        let d = new Date();
        let userdate: string = d.getFullYear().toString() + d.getMonth().toString() + d.getDate().toString();
        if (userdate == this.created[this.created.length - 1].toString()) {
            console.log(`userdate: ${userdate} == savedate: ${this.created[this.created.length - 1]}`)
        } else {
            this.created.push(userdate);
            this.RandomCard();
        }
    }

    getCard(date: string) {
        let cardCollection = new Array();
        let day = this.created;
        console.log(`constcard : ${this.constCard[0]}`);
        console.log(`day : ${day}`);
        for (let i in day) {
            if (day[i] == date) cardCollection.push(this.constCard[this.constCard.length - 1]);
        }

        console.log(`cardCollection: ${cardCollection}`);
        return cardCollection[cardCollection.length - 1];
    }
}
