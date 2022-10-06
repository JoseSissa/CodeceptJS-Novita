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
    async function checkCarat() {
        const carat = await I.grabTextFromAll('#ring_list_section .ring_item .title');
        for (const elem of carat) {
            console.log(elem);
            // const ct = elem.substring(0, elem.indexOf('ct')-1);
            // console.log(ct);
            // if(parseFloat(elem) < parseFloat(params.caratFrom) || parseFloat(elem) > parseFloat(params.caratTo)) {
            //     console.log('Error in the values obtained from the Carat filter');
            //     I.dontSee(elem);
            // }
        };
    }

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
    I.fillField('#from_carat_value_input', 1.80);
    I.pressKey('Enter');
    I.fillField('#to_carat_value_input', 3.0);
    I.pressKey('Enter');
    checkCarat();
    I.fillField('#from_carat_value_input', 0.30);
    I.pressKey('Enter');
    I.fillField('#to_carat_value_input', 6.0);
    I.pressKey('Enter');

    // Filter Shapes
    // Round
    I.forceClick('#diamond_shape_2');
    checkRound();
    I.forceClick('#diamond_shape_2');
    // Pear
    I.forceClick('#diamond_shape_7');
    checkPear();
    I.forceClick('#diamond_shape_7');
    // Oval
    I.forceClick('#diamond_shape_5');
    checkOval();
    I.forceClick('#diamond_shape_5');
    // Emerald
    I.forceClick('#diamond_shape_6');
    checkEmerald();
    I.forceClick('#diamond_shape_6');
    // Cushion
    I.forceClick('#diamond_shape_4');
    checkCushion();
    I.forceClick('#diamond_shape_4');
    // Princess
    I.forceClick('#diamond_shape_3');
    checkPrincess();
    I.forceClick('#diamond_shape_3');
    // Radiant
    I.forceClick('#diamond_shape_8');
    checkRadiant();
    I.forceClick('#diamond_shape_8');
    // Asscher
    I.forceClick('#diamond_shape_9');
    checkAsscher();
    I.forceClick('#diamond_shape_9');

    pause();

});