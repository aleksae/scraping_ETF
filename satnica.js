

const fs = require('fs');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');



const USERNAME_SELECTOR = "#j_username";
const PASSWORD_SELECTOR = "#j_password";
const USERNAME = "";
const PASSWORD = "";
const CTA_SELECTOR = "#login";
const ISPITNI_ROK_SELECTOR = "#menu_nav1_item5";
const TABELA_RED_SELECTOR = '[id="pregledPrijavaMainForm:j_id420:1:j_id489"]';
const DVA_SELECTOR = '[id="pregledPrijavaMainForm:j_id420:2:j_id477"]';
const TABELA_SELECTOR = '[id="pregledPrijavaMainForm:j_id420"]';
const langmap = {
    "А": "A",
    "Б": "B",
    "В": "V",
    "Г": "G",
    "Д": "D",
    "Ђ": "Đ",
    "Е": "E",
    "Ж": "Ž",
    "З": "Z",
    "И": "I",
    "Ј": "J",
    "К": "K",
    "Л": "L",
    "Љ": "Lj",
    "М": "M",
    "Н": "N",
    "Њ": "Nj",
    "О": "O",
    "П": "P",
    "Р": "R",
    "С": "S",
    "Т": "T",
    "Ћ": "Ć",
    "У": "U",
    "Ф": "F",
    "Х": "H",
    "Ц": "C",
    "Ч": "Č",
    "Џ": "Dž",
    "Ш": "Š",
    "а": "a",
    "б": "b",
    "в": "v",
    "г": "g",
    "д": "d",
    "ђ": "đ",
    "е": "e",
    "ж": "ž",
    "з": "z",
    "и": "i",
    "ј": "j",
    "к": "k",
    "л": "l",
    "љ": "lj",
    "м": "m",
    "н": "n",
    "њ": "nj",
    "о": "o",
    "п": "p",
    "р": "r",
    "с": "s",
    "т": "t",
    "ћ": "ć",
    "у": "u",
    "ф": "f",
    "х": "h",
    "ц": "c",
    "ч": "č",
    "џ": "dž",
    "ш": "š",
}

function remapLang (str) {
    return str.replace(/[^\u0000-\u007E]/g, function(a){ 
        return langmap[a] || a; 
    });
}
async function run(){
    let value = false;
    let i = 0;
    while(!value){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.goto('https://student.etf.bg.ac.rs/');
       


        page.setViewport({width: 1366, height: 768});
        await page.click(USERNAME_SELECTOR);
        await page.keyboard.type(USERNAME);
        await page.click(PASSWORD_SELECTOR);
        await page.keyboard.type(PASSWORD);
        await page.click(CTA_SELECTOR);

        await page.waitForTimeout(1000);
        await page.click(ISPITNI_ROK_SELECTOR);
        await page.waitForTimeout(2000);
        let element = await page.$(TABELA_RED_SELECTOR)
        value = await page.evaluate(el => el.textContent, element)
        await page.waitForTimeout(1000);
        value = value.trim() != '';
        var today  = new Date();
        console.log(today.toLocaleString("en-US") + " - " + (value ? "Izasla je satnica" : "Nije izasla satnica"));
        i++;
        if(i==10 && value == ''){
            i=0;
            console.clear()
        }

        if(value){
            var params = {
                username: "Aleksa",
                avatar_url: "",
                content: "Stanje",
                embeds: [
                    {
                        "title": "Stanje",
                        "color": 15258703,
                        "thumbnail": {
                            "url": "",
                        },
                        "fields": [
                            {
                                "name": "Stanje",
                                "value": (value ? "Izasla je satnica" : "Nije izasla satnica"),
                                "inline": true
                            }
                        ]
                    }
                ]
            }
            fetch('', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(params)
            }).then(res => {
                console.log(res);
            });
        }
        await page.waitForTimeout(55000);
        await browser.close();
        

    }
   

   
    
    

    
}


run();