Feature('Start with a Diamond');

Scenario('Buy a diamond', ({ I }) => {

    // Check the compare option
    function compareDiamonds() {
        I.click('//*[@id="body_table_results"]/tr[1]/td[9]/div/span[1]/img');
        I.click('//*[@id="body_table_results"]/tr[2]/td[9]/div/span[1]/img');
        I.click("#to_compare_diamonds_from_diamond_list");
    };

    function checkVideo() {
        if(I.seeElement('#diamond_detail_section .diamond_detail_tabs .video_tab', {'display':"none"})) {
            I.click('#diamond_detail_section .diamond_detail_tabs .video_tab');
            I.see('Actual video of the diamond');
        }
    };

    // ----------------------------------------------------
    // Functions of metal types filters
    // Option All
    async function checkAllMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
             if(elem !== '18ct White Gold' && elem !== '18ct Yellow Gold' && elem !== '18ct Rose Gold' && elem !== 'Platinum') {
                console.log('Error in values obtained from metal type filter option All');
             }
        }
    };
    // Option White Gold
    async function checkWhiteMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct White Gold") {
                console.log('Error in values obtained from metal type filter option White Gold');
            }
        }
    };
    // Option Yellow Gold
    async function checkYellowMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct Yellow Gold") {
                console.log('Error in values obtained from metal type filter option Yellow Gold');
            }
        }
    };
    // Option Rose Gold
    async function checkRoseMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "18ct Rose Gold") {
                console.log('Error in values obtained from metal type filter option Rose Gold');
            }
        }
    };
    // Option Rose Gold
    async function checkPlatinumMetal() {
        const metals = await I.grabTextFromAll('#ring_list_section .ring_item .metal_type');
        for (const elem of metals) {
            if(elem !== "Platinum") {
                console.log('Error in values obtained from metal type filter option Platinum');
            }
        }
    };
    // Functions of Price filter
    // 1000 and under
    async function checkPrice1000andUnder() {
        const prices = await I.grabTextFromAll('#ring_list_section .ring_item .price');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) > 1000) {
                console.log('Error in values obtained from Price filter option $1000 and under');
            }
        }
    };
    // 1000 and 2000
    async function checkPrice1000To2000() {
        const prices = await I.grabTextFromAll('#ring_list_section .ring_item .price');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) <= 1000 || ((elem.slice(elem.indexOf('$')+1)).replace(',', '')) > 2000 ) {
                console.log('Error in values obtained from Price filter option $1000 to $2000');
            }
        }
    };
    // 2000 and over
    async function checkPrice2000andOver() {
        const prices = await I.grabTextFromAll('#ring_list_section .ring_item .price');
        for (const elem of prices) {
            if(((elem.slice(elem.indexOf('$')+1)).replace(',', '')) < 2000) {
                console.log('Error in values obtained from Price filter option $2000 and over');
            }
        }
    };
    // Search input Ring design
    async function searchInputRingDesign() {
        I.fillField('#create_engage_ring_container .select_ring_container .search-section .input-group input', 'Allegro accent');
        I.pressKey('Enter');
        const results = await I.grabTextFromAll('#ring_list_section .ring_item .name');
        for (const elem of results) {
            if(!(elem.includes('Allegro Accent'))) {
                console.log('Error in values obtained from input search in Ring Design.');
            }
        }
    };


    
    // ----------------------------------------------------
    // ----------------------------------------------------
    // ----------------------------------------------------

    I.amOnPage("/");
    I.forceClick("Start With a Diamond");
    I.seeInCurrentUrl("/engagement-ring/create/diamond");

    // I.scrollTo("#body_table_results", 0, 100);
    
    // TO COMPARE DIAMONDS
    //------------------------------------------------------------------------------
    I.wait(2);
    compareDiamonds();

    // Choose Diamond
    I.click('//*[@id="body_table_comparison"]/tr[1]/td[9]/a/div'); //In the results table
    // I.click('//*[@id="body_table_results"]/tr[1]/td[10]/a/div');   //In the comparison table
    
    // Diamond detail
    I.see('Choose this diamond', 'a');
    // Video
    checkVideo();
    
    
    // Certificate
    // I.click('#diamond_detail_section .diamond_detail_tabs .certificate_tab');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('https://www.igi.org/reports/');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/');
    // I.click('#diamond_detail_section .diamond_detail_tabs .diamond_picture_tab');
    
    // I.click('#diamond_detail_section .diamond_detail_content_features .er_details_column_one a');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('https://www.igi.org/reports/');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/');
    // I.click('20% Deposit Available');
    // I.switchToNextTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/deposit');
    // I.closeCurrentTab();
    // I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/');
    I.click('Choose this diamond');
    I.see('CREATE YOUR RING');

    // Select Ring Design
    I.forceClick('#diamond_list_section .container_steps_title .step_2 .description_2 a');
    I.forceClick('//*[@id="diamond_list_section"]/div[1]/div[2]/div[3]/div[2]/a');

    // Filter metal type
    I.forceClick('#metal_type_1');
    checkAllMetal();
    I.forceClick('#metal_type_3');
    checkWhiteMetal();
    I.forceClick('#metal_type_3');
    I.forceClick('#metal_type_5');
    checkYellowMetal();
    I.forceClick('#metal_type_5');
    I.forceClick('#metal_type_4');
    checkRoseMetal();
    I.forceClick('#metal_type_4');
    I.forceClick('#metal_type_2');
    checkPlatinumMetal();
    I.forceClick('#metal_type_2');
    

    // Filter Price
    I.forceClick('#setting_price_range_2');
    checkPrice1000andUnder();
    I.forceClick('#setting_price_range_2');
    I.forceClick('#setting_price_range_3');
    checkPrice1000To2000();
    I.forceClick('#setting_price_range_3');
    I.forceClick('#setting_price_range_4');
    checkPrice2000andOver();
    I.forceClick('#setting_price_range_4');

    // Text Search input
    searchInputRingDesign();
    
    // Click in the first
    I.click('#ring_list_section .ring_item .ring_detail_link');


    // Delivery time
    I.checkOption('#include_express_job_id .pink_checkbox_icon');
    I.checkOption('#dont_include_express_job_id .pink_checkbox_icon');

    // Personalise your ring
    I.click('#personalise_ring_link .pink_checkbox_icon');
    I.see('PERSONALISE YOUR RING');
    // Claw Style
    I.click('#personalised_select_claw_style');
    I.click('#eagle_claw_link');
    I.see('Claw Style: Eagle');
    I.click('#personalised_select_claw_style');
    I.click('#square_claw_link');
    I.see('Claw Style: Square');
    I.click('#personalised_select_claw_style');
    I.click('#round_claw_link');
    I.see('Claw Style: Round');
    // Diamond setting
    I.click('#personalised_select_stone_setting');
    I.click('#low_height_link');
    I.see('Diamond Setting: Very Low');
    I.click('#personalised_select_stone_setting');
    I.click('#high_height_link');
    I.see('Diamond Setting: Medium-High');
    I.click('#personalised_select_stone_setting');
    I.click('#medium_height_link');
    I.see('Diamond Setting: Medium-Low');
    I.click('#save_store_personalisation');
    pause();
    // Button cancel
    I.click('Personalise your ring');
    I.see('PERSONALISE YOUR RING');
    I.click('#cancel_store_personalisation');



    // 20% Deposit Available
    I.click('#express_job_option .pink_checkbox_box_legend a');
    I.switchToNextTab();
    I.seeInCurrentUrl('https://novitadiamonds.com/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl('https://novitadiamonds.com/engagement-ring/create/');

    

    pause();

});















// INPUTS TYPE RANGE
// I.dragSlider("#search_form .diamond_filter_color_content .from", 100)