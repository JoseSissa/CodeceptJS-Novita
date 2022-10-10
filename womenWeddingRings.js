Feature('Wedding Rings');

Scenario('Wedding Rings', ({ I }) => {

    const waitResponseAndtext = (ringStyle) => {
        console.log('<<<<<<', ringStyle);
        // I.waitForText('Detail', 40, '//*[@id="body_table_results"]/tr[1]/td[10]/a/div');
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                for (let i = 0; i < 10; i++) {
                    let style = results[0].response.items[i].ring_styles.some(elem => elem.style_slug === ringStyle);
                    console.log(`>>>>>${i}`, results[0].response.items[i].ring_styles);
                    if(!style) {
                        console.log('Error, no corresponde el filtro seleccionado con la respuesa');
                        return false;
                    }
                }
                return true;                
            }
        }, 20);
    }

    I.amOnPage('/');
    I.forceClick("WOMEN's WEDDING RINGS");
    I.seeInCurrentUrl('/lab-grown-diamond-wedding-band-lab-diamond-wedding-band-lab-created-diamond-wedding-band');
    I.waitForElement('.jewellery_detail_link', 10);

    // Style Pave
    I.say('STYLE PAVE');
    I.forceClick('#jewellery_category_2');
    I.seeCheckboxIsChecked('#jewellery_category_2');
    waitResponseAndtext('pave');
    I.forceClick('#jewellery_category_2');

    // Style Eternity
    I.say('STYLE ETERNITY')
    I.forceClick('#jewellery_category_3');
    I.seeCheckboxIsChecked('#jewellery_category_3');
    waitResponseAndtext('eternity');
    I.forceClick('#jewellery_category_3');

    // Style Plain
    I.say('STYLE PLAIN')
    I.forceClick('#jewellery_category_4');
    I.seeCheckboxIsChecked('#jewellery_category_4');
    waitResponseAndtext('plain');
    I.forceClick('#jewellery_category_4');

    // Style Modern
    I.say('STYLE MODERN')
    I.forceClick('#jewellery_category_5');
    I.seeCheckboxIsChecked('#jewellery_category_5');
    waitResponseAndtext('modern');
    I.forceClick('#jewellery_category_5');
    
    // Style Vintage
    I.say('STYLE VINTAGE')
    I.forceClick('#jewellery_category_6');
    I.seeCheckboxIsChecked('#jewellery_category_6');
    waitResponseAndtext('vintage');
    I.forceClick('#jewellery_category_6');
    pause();

});