Feature('Engagement Rings Ready to Ship');

Scenario('Engagement Rings Ready to Ship', async ({ I }) => {

    const waitTime = 300; //Seconds

    // /api/product/engagement-rings-ready-to-ship

    const checkTypeMetal = (typeMetal) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(!results[0].response.items[i].engring_metal_name.toLowerCase().includes(typeMetal)) {
                            console.log(`>>> Error in values obtained from METAL TYPE filter: option ${typeMetal.toUpperCase()}`);
                            return false;
                        }                        
                    }
                }else{
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkDiamondCarat = () => {
        I.fillField('#from_carat_value_input', 2)
        I.pressKey('Enter')
        I.fillField('#to_carat_value_input', 3)
        I.pressKey('Enter')
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(results[0].response.items[i].diamond_carat < 2 || results[0].response.items[i].diamond_carat > 3) {
                            console.log(`>>> Error in values obtained from CARAT filter.}`);
                            return false;
                        }
                    }
                }else{
                    console.log('No record was found according to the filter in the response.');
                    return true;
                }
                return true;
                
            }
        }, waitTime)
        // reset carat filter
        I.fillField("#from_carat_value_input", 0.30);
        I.pressKey("Enter");
        I.fillField("#to_carat_value_input", 6);
        I.pressKey("Enter");
    };
    const checkDiamondShape = () => {
        const shapes = ["2", "7", "5", "6", "4", "3", "8", "9"]
        const names = ["round", "pear", "oval", "emerald", "cushion", "princess", "radiant", "asscher"]
        for (let i = 0; i < shapes.length; i++) {
            I.forceClick(`#diamond_shape_${shapes[i]}`);
            
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                    results.push(await res.json());
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let j = 0; j < total; j++) {
                            console.log(results[0].response.items[j].diamond_shape_slug);
                            if(results[0].response.items[j].diamond_shape_slug != names[i]) {
                                console.log(`>>> Error in values obtained from SHAPE filter: option ${names[i].toUpperCase()}`);
                                return false;
                            }
                        }
                    }else{
                        console.log(`No record was found according to the filter DIAMOND SHAPE ${names[i].toUpperCase()} in the response.`);
                        return true;
                    }
                    return true;                    
                }
            }, waitTime)

            I.forceClick(`#diamond_shape_${shapes[i]}`);
        }
    };
    const checkDiamondColour = () => {
        const colour = {
            "D" : [0, -700],
            "E" : [80, -700],
            "F" : [100, -700],
            "G" : [180, -700],
            "H" : [230, -700],
            "I" : [280, -700],
            "J" : [330, -700],
            "K" : [400, -700],
            "L" : [450, -700],
            "M" : [600, 0],
        }
        for (const elem of Object.keys(colour)) {
            I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', colour[elem][0]);
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]', colour[elem][1]);
            if(elem == 'M') {
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', -700);
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', 700);
            }

            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                    results.push(await res.json());
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let i = 0; i < total; i++) {
                            if(results[0].response.items[i].diamond_colour_name != elem) {
                                console.log(`>>> Error in values obtained from COLOUR filter: option ${elem.toUpperCase()}`);
                                return false;
                            }
                        }
                    }else{
                        console.log(`No record was found according to the filter DIAMOND COLOUR OPTION: ${elem.toUpperCase()} in the response.`);
                        return true;
                    }
                    return true;
                }                
            }, waitTime)
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[7]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[4]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[4]/div[2]/div[1]/span/span[6]', -700);
        };
    };
    const checkDiamondClarity = () => {
        const clarity = {
            "FL" : [0, -700],
            "IF" : [80, -700],
            "VVS1" : [150, -700],
            "VVS2" : [200, -700],
            "VS1" : [250, -700],
            "VS2" : [350, -700],
            "SI1" : [400, -700],
            "SI2" : [450, -700],
            "I1" : [500, 0],
        }
        for (const elem of Object.keys(clarity)) {

            I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', clarity[elem][0]);
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]', clarity[elem][1]);
            if(elem == 'I1') {
                I.say('ENTRE A ESTOOOOOO')
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', -700);
                I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
                I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
                I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', 700);
            }
            
            let results = [];
            I.waitForResponse(async res => {
                if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                    if(results[0].response.total > 0) {
                        const total = results[0].response.total > 10 ? 10 : results[0].response.total
                        for (let i = 0; i < total; i++) {
                            if(results[0].response.items[i].clarity != elem) {
                                console.log(`>>> Error in values obtained from CLARITY filter: option ${elem.toUpperCase()}`);
                                return false;
                            }
                        }
                    }else{
                        console.log(`No record was found according to the filter DIAMOND CLARITY OPTION: ${elem.toUpperCase()} in the response.`);
                        return true;
                    }
                    return true;
                }                
            }, waitTime)

            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[7]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', 700);
            I.moveCursorTo('//*[@id="settings_search_form"]/div/div[5]/div[1]/div/div')
            I.click('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]')
            I.dragSlider('//*[@id="settings_search_form"]/div/div[5]/div[2]/div[1]/span/span[6]', -700);
        };
    };
    const checkDiamondStyle = (style) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(results[0].response.items[i].engring_style_name != style) {
                            console.log(`>>> Error in values obtained from DIAMOND STYLE filter: option ${style.toUpperCase()}`);
                            return false;
                        }
                    }
                }else{
                    console.log(`No record was found according to the filter DIAMOND STYLE OPTION: ${style.toUpperCase()} in the response.`);
                    return true;
                }
                return true;
            }
        }, waitTime)
    };
    const checkDiamondPrice = () => {
        I.fillField('#from_price_value_input', 10000)
        I.pressKey('Enter')
        I.fillField('#to_price_value_input', 40000)
        I.pressKey('Enter')
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/engagement-rings-ready-to-ship')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total
                    for (let i = 0; i < total; i++) {
                        if(results[0].response.items[i].diamond_carat < 10000 || results[0].response.items[i].diamond_carat > 40000) {
                            console.log(`>>> Error in values obtained from PRICE filter.}`);
                            return false;
                        }
                    }
                }else{
                    console.log(`No record was found according to the filter DIAMOND PRICE in the response.`);
                    return true;
                }
                return true;
                
            }
        }, waitTime)
        // reset carat filter
        I.fillField("#from_price_value_input", 1000);
        I.pressKey("Enter");
        I.fillField("#to_price_value_input", 63000);
        I.pressKey("Enter"); 
    };


    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------
    
    // Functions of metal types filters
    async function checkAllMetal() {
        I.wait(3);
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== '18ct White Gold' && elem !== '18ct Yellow Gold' && elem !== '18ct Rose Gold' && elem !== 'Platinum') {
                I.dontSee(elem);
                console.log('Error in values obtained from metal type filter option All');
            }
        };
    };
    // Option White Gold
    async function checkWhiteMetal() {
        I.wait(3);
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct White Gold") {
                console.log('Error in values obtained from metal type filter option White Gold');
            }
        }
    };
    // Option Yellow Gold
    async function checkYellowMetal() {
        I.wait(3);
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct Yellow Gold") {
                console.log('Error in values obtained from metal type filter option Yellow Gold');
            }
        }
    };
    // Option Rose Gold
    async function checkRoseMetal() {
        I.wait(3);
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct Rose Gold") {
                console.log('Error in values obtained from metal type filter option Rose Gold');
            }
        }
    };
    // Option Rose Gold
    async function checkPlatinumMetal() {
        I.wait(3);
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "Platinum") {
                console.log('Error in values obtained from metal type filter option Platinum');
            }
        }
    };
    // Filter Carat
    const checkCarat = async (min, max) => {
        const carat = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(Number(carat.substring(0, carat.indexOf('ct'))));
        if(Number(carat.substring(0, carat.indexOf('ct'))) < min ||  Number(carat.substring(0, carat.indexOf('ct'))) > max) {
            console.log('Error in values obtained from Carat filter.');
        }
        
    };

    // Filters shape
    const checkRound = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Round'));
        if(!shape.includes('Round')) {
            console.log('Error in values obtained from Shape filter - Round.');
        }
    };
    const checkPear = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Pear'));
        if(!shape.includes('Pear')) {
            console.log('Error in values obtained from Shape filter - Pear.');
        }
    };
    const checkOval = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Oval'));
        if(!shape.includes('Oval')) {
            console.log('Error in values obtained from Shape filter - Oval.');
        }
    };
    const checkEmerald = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Emerald'));
        if(!shape.includes('Emerald')) {
            console.log('Error in values obtained from Shape filter - Emerald.');
        }
    };
    const checkCushion = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Cushion'));
        if(!shape.includes('Cushion')) {
            console.log('Error in values obtained from Shape filter - Cushion.');
        }
    };
    const checkPrincess = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Princess'));
        if(!shape.includes('Princess')) {
            console.log('Error in values obtained from Shape filter - Princess.');
        }
    };
    const checkRadiant = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Radiant'));
        if(!shape.includes('Radiant')) {
            console.log('Error in values obtained from Shape filter - Radiant.');
        }
    };
    const checkAsscher = async () => {
        const shape = await I.grabTextFrom('#ring_list_section .ring_item .title');
        console.log(shape.includes('Asscher'));
        if(!shape.includes('Asscher')) {
            console.log('Error in values obtained from Shape filter - Asscher.');
        }
    };

    I.say('TEST - CUSTOM ENGAGEMENT RINGS');
    I.amOnPage("/");
    I.forceClick("ENGAGEMENT RINGS READY TO SHIP");
    I.waitForText('ENGAGEMENT RINGS READY TO SHIP', 30);
    I.seeInCurrentUrl("/engagement-ring/ready-to-ship");

    // -------------------------------------------- METAL TYPE FILTER --------------------------------------------
    I.say('FILTER CHECK - METAL TYPE')
    I.forceClick('#metal_type_1')

    // I.say('METAL TYPE - WHITE GOLD')
    // I.forceClick('#metal_type_3')
    // I.seeCheckboxIsChecked('#metal_type_3')
    // checkTypeMetal('white gold')
    // I.forceClick('#metal_type_3')

    // I.say('METAL TYPE - YELLOW GOLD')
    // I.forceClick('#metal_type_5')
    // I.seeCheckboxIsChecked('#metal_type_5')
    // checkTypeMetal('yellow gold')
    // I.forceClick('#metal_type_5')

    // I.say('METAL TYPE - ROSE GOLD')
    // I.forceClick('#metal_type_4')
    // I.seeCheckboxIsChecked('#metal_type_4')
    // checkTypeMetal('rose gold')
    // I.forceClick('#metal_type_4')

    // I.say('METAL TYPE - PLATINUM')
    // I.forceClick('#metal_type_2');
    // I.seeCheckboxIsChecked('#metal_type_2')
    // checkTypeMetal('platinum')
    // I.forceClick('#metal_type_2')

    // I.forceClick('#metal_type_1')
    // -------------------------------------------- DIAMOND CARAT FILTER --------------------------------------------
    // I.say('FILTER CHECK - DIAMOND CARAT')
    // I.moveCursorTo('//*[@id="settings_search_form"]/div/div[2]/div[1]/div/div')
    // checkDiamondCarat();
    // I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')

    // -------------------------------------------- DIAMOND SHAPE FILTER --------------------------------------------
    I.say('CHECKING SHAPE FILTER');
    // checkDiamondShape();
    // -------------------------------------------- DIAMOND COLOUR FILTER --------------------------------------------
    I.say('CHECKING COLOUR FILTER');
    // checkDiamondColour();
    //----------------------------------------------- CLARITY FILTER -----------------------------------------------
    I.say('CHECKING CLARITY FILTER');
    // checkDiamondClarity();
    //----------------------------------------------- RING SIZE -----------------------------------------------

    //----------------------------------------------- DIAMOND STYLE -----------------------------------------------
    I.say('CHECKING STYLE FILTER');

    // I.say('DIAMOND STYLE - SOLITAIRE')
    // I.moveCursorTo('//*[@id="settings_search_form"]/div/div[7]/div[1]/div/div')
    // I.forceClick('#engagement_ring_style_2')
    // I.seeCheckboxIsChecked('#engagement_ring_style_2')
    // checkDiamondStyle('Solitaire')
    // I.forceClick('#engagement_ring_style_2')

    // I.say('METAL STYLE - SIDE STONE')
    // I.forceClick('#engagement_ring_style_4')
    // I.seeCheckboxIsChecked('#engagement_ring_style_4')
    // checkDiamondStyle('Side Stone')
    // I.forceClick('#engagement_ring_style_4')

    // I.say('METAL STYLE - HALO')
    // I.forceClick('#engagement_ring_style_3')
    // I.seeCheckboxIsChecked('#engagement_ring_style_3')
    // checkDiamondStyle('Halo')
    // I.forceClick('#engagement_ring_style_3')

    // I.say('METAL STYLE - THREE STONE')
    // I.forceClick('#engagement_ring_style_5')
    // I.seeCheckboxIsChecked('#engagement_ring_style_5')
    // checkDiamondStyle('Three Stone')
    // I.forceClick('#engagement_ring_style_5')

    // I.forceClick('#engagement_ring_style_1')

    //----------------------------------------------- DIAMOND PRICE -----------------------------------------------
    I.say('FILTER CHECK - DIAMOND PRICE')
    I.moveCursorTo('//*[@id="settings_search_form"]/div/div[8]/div[1]/div/div')
    I.wait(4)
    checkDiamondPrice();
    I.moveCursorTo('//*[@id="header_desktop"]/section[1]/div/div[2]/a/img')


    

    pause();




    // I.say('FILTER METAL TYPE');
    // I.forceClick('#metal_type_1');
    // checkAllMetal();
    // I.forceClick('#metal_type_3');
    // checkWhiteMetal();
    // I.forceClick('#metal_type_3');
    // I.forceClick('#metal_type_5');
    // checkYellowMetal();
    // I.forceClick('#metal_type_5');
    // I.forceClick('#metal_type_4');
    // checkRoseMetal();
    // I.forceClick('#metal_type_4');
    // I.forceClick('#metal_type_2');
    // checkPlatinumMetal();
    // I.forceClick('#metal_type_2');











    // Filter Diamond Carat
    // I.wait(3);
    // I.fillField('#carat_value_inputs #from_carat_value_input', 1.80);
    // I.pressKey('Enter');
    // I.fillField('#carat_value_inputs #to_carat_value_input', 3.0);
    // I.pressKey('Enter');
    // checkCarat(1.8, 3.0);
    // I.fillField('#carat_value_inputs #from_carat_value_input', 0.30);
    // I.pressKey('Enter');
    // I.fillField('#carat_value_inputs #to_carat_value_input', 6.0);
    // I.pressKey('Enter');

    // Filter Shapes
    // Round
    I.forceClick('#diamond_shape_2');
    I.wait(3);
    checkRound();
    I.forceClick('#diamond_shape_2');
    // Pear
    I.forceClick('#diamond_shape_7');
    I.wait(3);
    checkPear();
    I.forceClick('#diamond_shape_7');
    // Oval
    I.forceClick('#diamond_shape_5');
    I.wait(3);
    checkOval();
    I.forceClick('#diamond_shape_5');
    // Emerald
    I.forceClick('#diamond_shape_6');
    I.wait(3);
    checkEmerald();
    I.forceClick('#diamond_shape_6');
    // Cushion
    I.forceClick('#diamond_shape_4');
    I.wait(3);
    checkCushion();
    I.forceClick('#diamond_shape_4');
    // Princess
    I.forceClick('#diamond_shape_3');
    I.wait(3);
    checkPrincess();
    I.forceClick('#diamond_shape_3');
    // Radiant
    I.forceClick('#diamond_shape_8');
    I.wait(3);
    checkRadiant();
    I.forceClick('#diamond_shape_8');
    // Asscher
    // I.forceClick('#diamond_shape_9');
    // I.wait(2);
    // checkAsscher();
    // I.forceClick('#diamond_shape_9');

    pause();


    
});