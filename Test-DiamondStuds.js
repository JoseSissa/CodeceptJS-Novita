Feature('Diamond Jewellery - Diamond Studs');

Scenario('Diamond Jewellery - Diamond Studs', async ({ I }) => {

    const waitResponseMetalType = (metalType) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;                 
                    // Analize the first 10 elements from response
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].metal_name.includes(metalType))) {
                            console.log(`Error in response, Metal filter, expected elements with Metal Name: ${metalType} but not found.`);
                            return false;
                        }
                    }
                }            
                return true;
            }
        }, 40);
    }
    const waitResponseType = (type) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total;                 
                    // Analize the first 10 elements from response
                    for (let i = 0; i < total; i++) {
                        if(!(results[0].response.items[i].type.toLowerCase().includes(type) || results[0].response.items[i].category_slug.toLowerCase().includes(type))) {
                            console.log(`Error in response, Type filter, expected elements with Type: ${metalType}, but not found.`);
                            return false;
                        }
                    }                    
                }            
                return true;
            }
        }, 20);
    }
    const waitResponseRingsPrice = (ringPrice) => {
        let results = [];
        I.waitForResponse(async res => {
            if(res.url().includes('/api/product/diamond-jewellery')) {
                results.push(await res.json());
                if(results[0].response.total > 0) {
                    const total = results[0].response.total > 10 ? 10 : results[0].response.total; 
                    for (let i = 0; i < total; i++) {
                        if(ringPrice == 'under') {
                            if(!(results[0].response.items[i].price <= 1000)) {
                                console.log(`Error in response, expected elements with price under $1000 but not found.`);
                                return false;
                            }
                        }else if(ringPrice == 'between') {
                            if(!(results[0].response.items[i].price > 1000 && results[0].response.items[0].width <= 2000)) {
                                console.log(`Error in response, expected elements with price between $1000 to $1500 but not found.`);
                                return false;
                            }
                        }else if(ringPrice == 'over') {
                            if(!(results[0].response.items[i].price > 2000)) {
                                console.log(`Error in response, expected elements with price above $1500 but not found.`);
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
    I.forceClick("DIAMOND STUDS");
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    I.waitForElement('.jewellery_detail_link', 10);

    // ------------------------ METAL FILTER -----------------------------------
    // METAL: 18ct White Gold
    I.say('FILTER METAL: 18ct White Gold');
    I.forceClick('#metal_type_3');
    I.seeCheckboxIsChecked('#metal_type_3');
    waitResponseMetalType('18ct White Gold');
    I.forceClick('#metal_type_3');

    // FILTER METAL: 18ct Yellow Gold
    I.say('FILTER METAL: 18ct Yellow Gold');
    I.forceClick('#metal_type_5');
    I.seeCheckboxIsChecked('#metal_type_5');
    waitResponseMetalType('18ct Yellow Gold');
    I.forceClick('#metal_type_5');   

    // FILTER METAL: Rose Gold
    I.say('FILTER METAL: Rose Gold');
    I.forceClick('#metal_type_4');
    I.seeCheckboxIsChecked('#metal_type_4');
    waitResponseMetalType('Rose Gold');
    I.forceClick('#metal_type_4');

    // FILTER METAL: Platinum
    I.say('FILTER METAL: Platinum');
    I.forceClick('#metal_type_6');
    I.seeCheckboxIsChecked('#metal_type_6');
    waitResponseMetalType('Platinum');
    I.forceClick('#metal_type_6');

    I.forceClick('#metal_type_1');

    // ------------------------ TYPE FILTER -----------------------------------
    // TYPE: RINGS
    I.forceClick('#jewellery_category_1')

    // FILTER TYPE: RINGS
    I.say('TYPE METAL: RINGS');
    I.forceClick('#jewellery_category_2');
    I.seeCheckboxIsChecked('#jewellery_category_2');
    waitResponseType('ring');
    I.forceClick('#jewellery_category_2');

    // FILTER TYPE: STUDS
    I.say('TYPE METAL: STUDS');
    I.forceClick('#earring_style_slug_1');
    I.seeCheckboxIsChecked('#earring_style_slug_1');
    waitResponseType('stud');
    I.forceClick('#earring_style_slug_1');

    // FILTER TYPE: EARRINGS
    I.say('TYPE METAL: EARRINGS');
    I.forceClick('#jewellery_category_3');
    I.seeCheckboxIsChecked('#jewellery_category_3');
    waitResponseType('earring');
    I.forceClick('#jewellery_category_3');
    
    // FILTER TYPE: BRACELETS
    I.say('TYPE METAL: BRACELETS');
    I.forceClick('#jewellery_category_4');
    I.seeCheckboxIsChecked('#jewellery_category_4');
    waitResponseType('bracelet');
    I.forceClick('#jewellery_category_4');
    
    // FILTER TYPE: NECKLACES
    I.say('TYPE METAL: NECKLACES');
    I.forceClick('#jewellery_category_5');
    I.seeCheckboxIsChecked('#jewellery_category_5');
    waitResponseType('necklace');
    I.forceClick('#jewellery_category_5');

    I.forceClick('#jewellery_category_1')

    // ------------------------ PRICE FILTER -----------------------------------
    // PRICE $1000 and Under
    I.say('PRICE $1000 and Under');
    I.forceClick('#jewellery_price_range_2');
    I.seeCheckboxIsChecked('#jewellery_price_range_2');
    waitResponseRingsPrice('under');
    I.forceClick('#jewellery_price_range_2');

    // PRICE BETWEEN $1000 to $2000
    I.say('PRICE BETWEEN $1000 to $2000');
    I.forceClick('#jewellery_price_range_3');
    I.seeCheckboxIsChecked('#jewellery_price_range_3');
    waitResponseRingsPrice('between');
    I.forceClick('#jewellery_price_range_3');

    // PRICE Over $2000
    I.say('PRICE OVER $2000');
    I.forceClick('#jewellery_price_range_4');
    I.seeCheckboxIsChecked('#jewellery_price_range_4');
    waitResponseRingsPrice('over');
    I.forceClick('#jewellery_price_range_4');
    
    I.forceClick('#jewellery_price_range_1');
    
})


    const res = 
    {
        "response":{
            "total":2,
            "elements_current_page":2,
            "items":[
                {
                    "width":null,
                    "length":null,
                    "avg_number":null,
                    "avg_total_weight":null,
                    "min_carat":1,
                    "avg_diamond_width":5.1,
                    "diamond_size":1,
                    "halo_diamond_avg_number":null,
                    "halo_diamonds_avg_carat_total_weight":null,
                    "halo_jewellery_diameter":null,
                    "color":"E\/F",
                    "clarity":"VS1\/VS2",
                    "certificate":null,
                    "min_cut_grade":"Excellent",
                    "number_diamonds":2,
                    "is_halo":null,
                    "id":22922,
                    "is_favorite":false,
                    "name":"1ct Total Lab Grown Diamond Studs<br\/>18ct Rose Gold,Colour E\/F, Clarity VS",
                    "short_name":"",
                    "price":1480,
                    "symbol_currency":"AU $","reference":"S1C4P18R",
                    "priority":320,
                    "slug":"s1c4p18r",
                    "description":"Perfectly matched stud earrings, featuring two round brilliant exceptionally cut lab grown diamonds, set in a secure 18ct gold four prong basket with guardian back post.. The diamonds have a total weight of at least 1ct, are F colour or better and VS clarity or better.",
                    "active":true,
                    "category_name":"Earring",
                    "category_slug":"earring",
                    "category_id":2,
                    "style_name":"Stud",
                    "style_slug":"stud",
                    "metal_name":"18ct Rose Gold",
                    "metal_abbreviation":"18ct",
                    "metal_slug":"18ct-rose-gold",
                    "type":"Stud Earrings",
                    "main_picture_url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18r_1.jpg",
                    "main_real_live_picture_url":null,
                    "pictures":
                    [
                        {
                            "id":4577,
                            "main_picture":true,
                            "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18r_1.jpg",
                            "list_order":null,
                            "carat":null,
                            "real_live_picture":null
                        },{
                            "id":4578,
                            "main_picture":false,
                            "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18r_2.jpg",
                            "list_order":null,
                            "carat":null,
                            "real_live_picture":null
                        }
                    ],
                    "main_video_url":null,
                    "videos":[],
                    "18ct-rose-gold":
                    {
                        "width":null,
                        "length":null,
                        "avg_number":null,
                        "avg_total_weight":null,
                        "min_carat":1,
                        "avg_diamond_width":5.1,
                        "diamond_size":1,
                        "halo_diamond_avg_number":null,
                        "halo_diamonds_avg_carat_total_weight":null,
                        "halo_jewellery_diameter":null,
                        "color":"E\/F","clarity":"VS1\/VS2",
                        "certificate":null,
                        "min_cut_grade":"Excellent",
                        "number_diamonds":2,
                        "is_halo":null,"id":22922,
                        "is_favorite":false,
                        "name":"1ct Total Lab Grown Diamond Studs<br\/>18ct Rose Gold, Colour E\/F, Clarity VS",
                        "short_name":"",
                        "price":1480,
                        "symbol_currency":"AU $",
                        "reference":"S1C4P18R",
                        "priority":320,"slug":"s1c4p18r",
                        "description":"Perfectly matched stud earrings, featuring two round brilliant exceptionally cut lab grown diamonds, set in a secure 18ct gold four prong basket with guardian back post.. The diamonds have a total weight of at least 1ct, are F colour or better and VS clarity or better.",
                        "active":true,
                        "category_name":"Earring",
                        "category_slug":"earring",
                        "category_id":2,
                        "style_name":"Stud",
                        "style_slug":"stud",
                        "metal_name":"18ct Rose Gold",
                        "metal_abbreviation":"18ct",
                        "metal_slug":"18ct-rose-gold",
                        "type":"Stud Earrings",
                        "main_picture_url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18r_1.jpg",
                        "main_real_live_picture_url":null,
                        "pictures":
                        [
                            {
                                "id":4577,
                                "main_picture":true,
                                "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18r_1.jpg",
                                "list_order":null,
                                "carat":null,
                                "real_live_picture":null
                            },{
                                "id":4578,
                                "main_picture":false,
                                "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18r_2.jpg",
                                "list_order":null,
                                "carat":null,
                                "real_live_picture":null
                            }
                        ],
                        "main_video_url":null,
                        "videos":[]
                    },
                    "18ct-white-gold": {
                        "width":null,
                        "length":null,
                        "avg_number":null,
                        "avg_total_weight":null,
                        "min_carat":1,
                        "avg_diamond_width":5.1,
                        "diamond_size":1,
                        "halo_diamond_avg_number":null,
                        "halo_diamonds_avg_carat_total_weight":null,
                        "halo_jewellery_diameter":null,
                        "color":"E\/F",
                        "clarity":"VS1\/VS2",
                        "certificate":null,
                        "min_cut_grade":"Excellent",
                        "number_diamonds":2,
                        "is_halo":null,
                        "id":22920,
                        "is_favorite":false,
                        "name":"1ct Total Lab Grown Diamond Studs<br\/>18ct White Gold, Colour E\/F, Clarity VS",
                        "short_name":"",
                        "price":1480,
                        "symbol_currency":"AU $",
                        "reference":"S1C4P18W",
                        "priority":1,
                        "slug":"s1c4p18w",
                        "description":"Perfectly matched stud earrings, featuring two round brilliant exceptionally cut lab grown diamonds, set in a secure 18ct gold four prong basket with guardian back post.. The diamonds have a total weight of at least 1ct, are F colour or better and VS clarity or better.",
                        "active":true,
                        "category_name":"Earring",
                        "category_slug":"earring",
                        "category_id":2,
                        "style_name":"Stud",
                        "style_slug":"stud",
                        "metal_name":"18ct White Gold",
                        "metal_abbreviation":"18ct",
                        "metal_slug":"18ct-white-gold",
                        "type":"Stud Earrings",
                        "main_picture_url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18w_1.jpg",
                        "main_real_live_picture_url":null,
                        "pictures":[
                            {
                                "id":4573,
                                "main_picture":true,
                                "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18w_1.jpg",
                                "list_order":null,
                                "carat":null,
                                "real_live_picture":null
                            },{
                                    "id":4574,
                                "main_picture":false,
                                "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18w_2.jpg",
                                "list_order":null,
                                "carat":null,
                                "real_live_picture":null
                            }
                        ],
                        "main_video_url":null,
                        "videos":[]
                    },
                    "18ct-yellow-gold":{
                        "width":null,
                        "length":null,
                        "avg_number":null,
                        "avg_total_weight":null,
                        "min_carat":1,
                        "avg_diamond_width":5.1,
                        "diamond_size":1,
                        "halo_diamond_avg_number":null,
                        "halo_diamonds_avg_carat_total_weight":null,
                        "halo_jewellery_diameter":null,
                        "color":"E\/F",
                        "clarity":"VS1\/VS2",
                        "certificate":null,
                        "min_cut_grade":"Excellent",
                        "number_diamonds":2,
                        "is_halo":null,
                        "id":22921,
                        "is_favorite":false,
                        "name":"1ct Total Lab Grown Diamond Studs<br\/>18ct Yellow Gold, Colour E\/F, Clarity VS",
                        "short_name":"",
                        "price":1480,
                        "symbol_currency":"AU $",
                        "reference":"S1C4P18Y",
                        "priority":250,
                        "slug":"s1c4p18y",
                        "description":"Perfectly matched stud earrings, featuring two round brilliant exceptionally cut lab grown diamonds, set in a secure 18ct gold four prong basket with guardian back post.. The diamonds have a total weight of at least 1ct, are F colour or better and VS clarity or better.",
                        "active":true,
                        "category_name":"Earring",
                        "category_slug":"earring",
                        "category_id":2,
                        "style_name":"Stud",
                        "style_slug":"stud",
                        "metal_name":"18ct Yellow Gold",
                        "metal_abbreviation":"18ct",
                        "metal_slug":"18ct-yellow-gold",
                        "type":"Stud Earrings",
                        "main_picture_url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18y_1.jpg",
                        "main_real_live_picture_url":null,
                        "pictures":[
                            {
                                "id":4575,"main_picture":true,
                                "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18y_1.jpg",
                                "list_order":null,
                                "carat":null,
                                "real_live_picture":null
                            },{
                                "id":4576,
                                "main_picture":false,
                                "url":"https:\/\/docs.manmadediamonds.com.au\/uploads\/earrings\/s1c4p18y_2.jpg",
                                "list_order":null,
                                "carat":null,
                                "real_live_picture":null
                            }
                        ],
                        "main_video_url":null,
                        "videos":[]
                    },
                    "cartTotal":0,
                    "shipping_date_message":"Shipping Time: 2 - 4 business days"
                }
            ]
        }
    }