Feature('Wedding Rings');

Scenario('Wedding Rings', ({ I }) => {

    const waitResponseMetalType = (metalType) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {                    
                    // Analize the first 10 elements from response
                    for (let i = 0; i < 10; i++) {
                        if(!(results[0].response.items[i].metal_name === metalType)) {
                            console.log(`Error in response, Metal filter, expected elements with Metal Name: ${metalType} but not found.`);
                            return false;
                        }
                    }
                }            
                return true;
            }
        }, 20);
    }
    const waitResponseStyleRing = (ringStyle) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                
                results.push(await res.json());
                // Analize the first 10 elements from response
                for (let i = 0; i < 10; i++) {
                    let style = results[0].response.items[i].ring_styles.some(elem => elem.style_slug === ringStyle);
                    if(!style) {
                        console.log(`Error in response, Style filter, expected elements with Ring styles: ${ringStyle} but not found.`);
                        return false;
                    }
                }
                return true;             
            }
        }, 20);
    }
    const waitResponseRingWidth = (ringWidth) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/wedding-bands')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    // Analize the first 10 elements from response
                    for (let i = 0; i < 10; i++) {
                        if(ringWidth == 'under') {
                            if(!(results[0].response.items[i].width < 2.0)) {
                                console.log(`Error in response, expected elements with width under 2mm not found.`);
                                return false;
                            }
                        }else if(ringWidth == 'between') {
                            if(!(results[0].response.items[i].width >= 2.0 && results[0].response.items[0].width < 2.6)) {
                                console.log(`Error in response, expected elements with width between 2 to 2.5mm not found.`);
                                return false;
                            }
                        }else if(ringWidth == 'above') {
                            if(!(results[0].response.items[i].width >= 2.6)) {
                                console.log(`Error in response, expected elements with width above 2.6mm not found.`);
                                return false;
                            }
                        }
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

    // ------------------------ METAL FILTER -----------------------------------
    // METAL: 18ct White Gold
    // I.say('FILTER METAL: 18ct White Gold');
    // I.forceClick('#metal_type_2');
    // I.seeCheckboxIsChecked('#metal_type_2');
    // waitResponseMetalType('18ct White Gold');
    // I.forceClick('#metal_type_2');

    // // FILTER METAL: 18ct Yellow Gold
    // I.say('FILTER METAL: 18ct Yellow Gold');
    // I.forceClick('#metal_type_3');
    // I.seeCheckboxIsChecked('#metal_type_3');
    // waitResponseMetalType('18ct Yellow Gold');
    // I.forceClick('#metal_type_3');

    // // FILTER METAL: 18ct Rose Gold
    // I.say('FILTER METAL: 18ct Rose Gold');
    // I.forceClick('#metal_type_4');
    // I.seeCheckboxIsChecked('#metal_type_4');
    // waitResponseMetalType('18ct Rose Gold');
    // I.forceClick('#metal_type_4');

    // // FILTER METAL: Platinum
    // I.say('FILTER METAL: Platinum');
    // I.forceClick('#metal_type_5');
    // I.seeCheckboxIsChecked('#metal_type_5');
    // waitResponseMetalType('Platinum');
    // I.forceClick('#metal_type_5');

    // I.forceClick('#metal_type_1');

    // ------------------------ STYLE FILTER -----------------------------------
    // Style Pave
    // I.say('STYLE PAVE');
    // I.forceClick('#jewellery_category_2');
    // I.seeCheckboxIsChecked('#jewellery_category_2');
    // waitResponseStyleRing('pave');
    // I.forceClick('#jewellery_category_2');

    // // Style Eternity
    // I.say('STYLE ETERNITY')
    // I.forceClick('#jewellery_category_3');
    // I.seeCheckboxIsChecked('#jewellery_category_3');
    // waitResponseStyleRing('eternity');
    // I.forceClick('#jewellery_category_3');

    // // Style Plain
    // I.say('STYLE PLAIN')
    // I.forceClick('#jewellery_category_4');
    // I.seeCheckboxIsChecked('#jewellery_category_4');
    // waitResponseStyleRing('plain');
    // I.forceClick('#jewellery_category_4');

    // // Style Modern
    // I.say('STYLE MODERN')
    // I.forceClick('#jewellery_category_5');
    // I.seeCheckboxIsChecked('#jewellery_category_5');
    // waitResponseStyleRing('modern');
    // I.forceClick('#jewellery_category_5');
    
    // // Style Vintage
    // I.say('STYLE VINTAGE')
    // I.forceClick('#jewellery_category_6');
    // I.seeCheckboxIsChecked('#jewellery_category_6');
    // waitResponseStyleRing('vintage');
    // I.forceClick('#jewellery_category_6');

    // I.forceClick('#jewellery_category_1');

    // ------------------------ WIDTH FILTER -----------------------------------
    // Width under 2mm
    I.say('WIDTH UNDER 2MM')
    I.forceClick('#jewellery_width_range_2');
    I.seeCheckboxIsChecked('#jewellery_width_range_2');
    waitResponseRingWidth('under');
    I.forceClick('#jewellery_width_range_2');

    // Width between 2 to 2.5mm
    I.say('WIDTH BETWEEN 2 TO 2.5MM')
    I.forceClick('#jewellery_width_range_3');
    I.seeCheckboxIsChecked('#jewellery_width_range_3');
    waitResponseRingWidth('between');
    I.forceClick('#jewellery_width_range_3');

    // Width above 2.6mm
    I.say('WIDTH ABOVE 2.6MM')
    I.forceClick('#jewellery_width_range_4');
    I.seeCheckboxIsChecked('#jewellery_width_range_4');
    waitResponseRingWidth('above');
    I.forceClick('#jewellery_width_range_4');

    I.forceClick('#jewellery_width_range_1');
    pause();

});