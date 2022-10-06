Feature('Engagement Rings Ready to Ship');

Scenario('Engagement Rings Ready to Ship', async ({ I }) => {

    
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
    I.seeInCurrentUrl("/engagement-ring/ready-to-ship");
    I.waitForText('ENGAGEMENT RINGS READY TO SHIP', 10);

    // Filter metal type
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