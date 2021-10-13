const puppeteer = require("puppeteer");



(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const url = "https://www.topachat.com/pages/produits_cat_est_micro_puis_rubrique_est_wgfx_pcie_puis_f_est_824-11922.html"
    await page.goto(url);


    const data = await page.evaluate(() => {
        return [...document.querySelectorAll('.en-stock')]
            .map((x) => {
                let url = x.baseURI;
                let price = x.lastElementChild.innerText;
                let carteName = x.innerText.split('\n')[0];
                return {
                    name: carteName,
                    price: price,
                    url: url
                }


            })

    })

    let disponible = data.map(carte => {
        if (carte.name.includes('6900') || carte.name.includes('6800') || carte.name.includes('3070') || carte.name.includes('3080') || carte.name.includes('3090')) {
            return carte
        }
    }).filter(el => {
        return el != undefined
    })

    console.log(disponible)
    await browser.close()
})();


