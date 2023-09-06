const fs = require('fs');
const puppeteer = require('puppeteer');



const USERNAME_SELECTOR = "#j_username";
const PASSWORD_SELECTOR = "#j_password";
const CTA_SELECTOR = "#login";
const ISPITNI_ROK_SELECTOR = "#menu_nav1_item3";
const TABELA_SVI_SELECTOR = '[id="main:tableRok:0:detailsSvi"]';
const TABELA_SELECTOR = '[id="main:tableSvi"]';

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
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.etf.bg.ac.rs/sr/studiranje/osnovne-akademske-studije/softversko-inzenjerstvo-si');

    //await page.screenshot({path: 'example.png', fullPage: true});
    //await page.pdf({path: 'example.pdf', format: 'A4'});

    //const html = await page.content();
    //const title = await page.evaluate(() => document.title);
    //const text = await page.evaluate(() => document.body.innerText);
    //const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href));
    //console.log(links);

    page.setViewport({width: 1366, height: 768});
    
    //await page.waitForNavigation();
    //await page.waitForSelector('#menu:nav1');
    
    
    //let next = await page.$('.next');
   
    const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('table tr td'))
        return tds.map(td => td.innerText)
    
    });
    let exit = [];
    const go = async () => {
        for(let i=0; i<data.length;i++){
            duzina = exit.length;
            let tmp = data[i];
            tmp = remapLang(tmp);
            const regex = /\d\d\w\d\d\d\w{2,5}/g;
            if (tmp.match(regex)) {
                if (tmp.indexOf("\n") > -1){
                    const myArray = tmp.split("\n");
                    for(let s=0; s<myArray.length; s++){
                        exit.push(myArray[s]);
                    }
                }else{
                    exit.push(tmp);
                }
            }
        }
    }
    go();

    fs.writeFile('si.json', JSON.stringify(exit), (err)=>{
        if(err) throw err;
        console.log('File saved');
    });


    await browser.close();
}


run();