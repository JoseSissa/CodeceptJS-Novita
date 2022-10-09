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
                    console.log('>>>>>', results[0].response.items[0].ring_styles[0].style_slug);
                    if(results[0].response.items[0].ring_styles[0].style_slug != `${ringStyle}`) {
                        console.log('Error, no corresponde el filtro seleccionado con la respuesa');
                        return false;
                    }
                }
                return true;                
            }
        }, 40);
    }

    I.amOnPage('/');
    I.forceClick("WOMEN's WEDDING RINGS");
    I.seeInCurrentUrl('/lab-grown-diamond-wedding-band-lab-diamond-wedding-band-lab-created-diamond-wedding-band');
    I.wait(3);

    I.forceClick('#jewellery_category_2');
    I.seeCheckboxIsChecked('#jewellery_category_2');
    waitResponseAndtext('pave');
    I.forceClick('#jewellery_category_2');
    pause();
    I.forceClick('#jewellery_category_4');
    I.seeCheckboxIsChecked('#jewellery_category_3');
    waitResponseAndtext('eternity');
    // I.forceClick('#jewellery_category_3');
    pause();

});