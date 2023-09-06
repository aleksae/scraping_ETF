const fs = require('fs');
const puppeteer = require('puppeteer');



const USERNAME_SELECTOR = "#j_username";
const PASSWORD_SELECTOR = "#j_password";
const USERNAME = "";
const PASSWORD = "";
const CTA_SELECTOR = "#login";
const ISPITNI_ROK_SELECTOR = "#menu_nav1_item4";
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
    await page.click(TABELA_SVI_SELECTOR);
    await page.waitForTimeout(1000);

    let k=0;
    let exit=[];
    while(k<50 ){
        
        //await page.screenshot({path: 'loged_in'+k+'.png'});
        const data = await page.evaluate(() => {
            const tds = Array.from(document.querySelectorAll('[id="main:tableSvi"] tr td'))
            return tds.map(td => td.innerText)
        });
        const go = async () => {
            for(let i=0; i<data.length;i++){
                duzina = exit.length;
                let tmp = data[i];
                tmp = remapLang(tmp);
                const regex = /\d\d\w\d\d\d\w{2,5}/g;
                const regex2 = /\d\d:\d\d/g;
                const regex3 = /\d\d.\d\d.\d\d\d\d/g;
                const regex4 = /^[a-zA-Z]\w\w\w/g;
                if (tmp.match(regex)) {
                        exit.push({'sifra': tmp,'naziv':null,'datum':null, 'vreme': null});
                }
                else if (tmp.match(regex2) && exit[duzina-1]['vreme']==null){
                        exit[duzina-1]['vreme'] = tmp;
    
                }else if(tmp.match(regex3) && exit[duzina-1]['datum']==null){
                        exit[duzina-1]['datum'] = tmp;
    
                }else if(tmp.match(regex4) && tmp!="prvi deo" && exit[duzina-1]['naziv']==null){
                        exit[duzina-1]['naziv'] = tmp;
                }
            }
        }
        go();
        await page.click('.next');
        await page.waitForTimeout(1000);
        k++;
    }

    
    let poIspitu={};
    for(let i=0; i<exit.length; i++){
        poIspitu[exit[i]['sifra']] = {'datum':exit[i]['datum'], 'vreme':exit[i]['vreme'], 'naziv':exit[i]['naziv']};
    }
    let poDatumu={};
    for(let i=0; i<exit.length; i++){
        poDatumu[exit[i]['datum']]=[];
    }
    for(let i=0; i<exit.length; i++){
        poDatumu[exit[i]['datum']].push({'sifra':exit[i]['sifra'], 'vreme':exit[i]['vreme'], 'naziv':exit[i]['naziv']})
    }

    fs.writeFile('avgust2223.json', JSON.stringify(poIspitu), (err)=>{
        if(err) throw err;
        console.log('File saved');
    });
    fs.writeFile('avgust2223_po_datumu.json', JSON.stringify(poDatumu), (err)=>{
        if(err) throw err;
        console.log('File saved');
    });

    await browser.close();
}


run();