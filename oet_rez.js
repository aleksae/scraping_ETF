

const fs = require('fs');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');




async function run(){
    let value = false;
    let i = 0;
    let n=[0,0,0];
    let pet=[0,0,0];
    let usm=[0,0,0];
    let data;
    while(!value){
        console.log("usao");
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        try {
            await page.goto('https://oet.etf.bg.ac.rs/19E071OE1-1.html', {waitUntil: 'load', timeout: 0});  
            if(await page.$('table') !== null )
            {
                value=true;
                data = await page.evaluate(() => {
                    const tds = Array.from(document.querySelectorAll('table tr td'))
                    return tds.map(td => td.innerText)
                  });
                let ciklus=0;
                let val = 17;
                for(let i=14; i<data.length; i++){
                    if(i==val+6*ciklus){
                        ciklus++;
                        if(data[i]=='N') n[0]++;
                        else if(data[i]=='5') pet[0]++;
                        else if(data[i]=='Усмени') usm[0]++;
                    }
                    //17,23,29
                    
                }
                console.log("П1");
                console.log("Н: "+n[0]);
                console.log("5: "+pet[0]);
                console.log("Усмени: "+usm[0]);
                let prolaznost_1 = usm[0]/(pet[0]+usm[0])*100
                let prolaznost_2 = usm[0]/(n[0]+pet[0]+usm[0])*100
                console.log("Пролазност (изашли): "+prolaznost_1+'%');
                console.log("Пролазност (сви): "+prolaznost_2+'%');
            }
            else value=false;
            //console.log(value);
        } catch(e) {
            console.log("Doslo je do greske!");
        }

        console.log("\n");

        try {
            await page.goto('https://oet.etf.bg.ac.rs/19E071OE1-2.html', {waitUntil: 'load', timeout: 0});  
            if(await page.$('table') !== null )
            {
                value=true;
                data = await page.evaluate(() => {
                    const tds = Array.from(document.querySelectorAll('table tr td'))
                    return tds.map(td => td.innerText)
                  });
                let ciklus=0;
                let val = 17;
                for(let i=14; i<data.length; i++){
                    if(i==val+6*ciklus){
                        ciklus++;
                        if(data[i]=='N') n[1]++;
                        else if(data[i]=='5') pet[1]++;
                        else if(data[i]=='Усмени') usm[1]++;
                    }
                    //17,23,29
                    
                }
                console.log("П2");
                console.log("Н: "+n[1]);
                console.log("5: "+pet[1]);
                console.log("Усмени: "+usm[1]);
                let prolaznost_1 = usm[1]/(pet[1]+usm[1])*100
                let prolaznost_2 = usm[1]/(n[1]+pet[1]+usm[1])*100
                console.log("Пролазност (изашли): "+prolaznost_1+'%');
                console.log("Пролазност (сви): "+prolaznost_2+'%');
            }
            else value=false;
            //onsole.log(value);
        } catch(e) {
            console.log("Doslo je do greske!");
        }

        console.log("\n");
        try {
            await page.goto('https://oet.etf.bg.ac.rs/19E071OE1-3.html', {waitUntil: 'load', timeout: 0});  
            if(await page.$('table') !== null )
            {
                value=true;
                data = await page.evaluate(() => {
                    const tds = Array.from(document.querySelectorAll('table tr td'))
                    return tds.map(td => td.innerText)
                  });
                let ciklus=0;
                let val = 17;
                for(let i=14; i<data.length; i++){
                    if(i==val+6*ciklus){
                        ciklus++;
                        if(data[i]=='N') n[2]++;
                        else if(data[i]=='5') pet[2]++;
                        else if(data[i]=='Усмени') usm[2]++;
                    }
                    //17,23,29
                    
                }
                console.log("П3");
                console.log("Н: "+n[2]);
                console.log("5: "+pet[2]);
                console.log("Усмени: "+usm[2]);
                let prolaznost_1 = usm[2]/(pet[2]+usm[2])*100
                let prolaznost_2 = usm[2]/(n[2]+pet[2]+usm[2])*100
                console.log("Пролазност (изашли): "+prolaznost_1+'%');
                console.log("Пролазност (сви): "+prolaznost_2+'%');
            }
            else value=false;
            //onsole.log(value);
        } catch(e) {
            console.log("Doslo je do greske!");
        }
        
        console.log("\n");
        console.log("Укупно");
        console.log("Н: "+(n[2]+n[1]+n[0]));
        console.log("5: "+(pet[2]+pet[1]+pet[0]));
        console.log("Усмени: "+(usm[2]+usm[1]+usm[0]));
        console.log("Пролазност (изашли): "+(((usm[2]+usm[1]+usm[0])/((pet[2]+pet[1]+pet[0])+(usm[2]+usm[1]+usm[0])))*100)+'%');
        console.log("Пролазност (сви): "+(((usm[2]+usm[1]+usm[0])/((n[2]+n[1]+n[0])+(pet[2]+pet[1]+pet[0])+(usm[2]+usm[1]+usm[0])))*100)+'%');
       

       
        
        await browser.close();
        console.log("kraj");
        
    
        
        await page.waitForTimeout(300000);

    }
   

   
    
    

    
}


run();