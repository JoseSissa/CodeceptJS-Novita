Feature("TESTING PAGE URLs");

Scenario("TESTING PAGE URLs", async ({ I }) => {

    const waitTime = 60;

    I.amOnPage('/');
    // Links of Engagement Rings ---------------------------------------------->
    I.say('LINKS OF ENGAGEMENT RINGS')
    I.say('START WITH A DIAMOND')
    I.forceClick('Start With a Diamond')
    I.waitInUrl('/engagement-ring/create/diamond', waitTime)

    I.say('START WITH A RING DESIGND')
    I.waitForText('Start With a Diamond', waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[1]/div[1]/div[2]/ul/li[1]/a')
    I.forceClick('Start With a Ring Design')
    I.waitInUrl('/engagement-ring/create/ring', waitTime)

    I.say('BUY LOOSE DIAMOND')
    I.waitForText('BUY LOOSE DIAMONDS', waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[1]/div[2]/div/a')
    I.forceClick('BUY LOOSE DIAMONDS')
    I.waitInUrl('/buy-loose-diamond-start-buying', waitTime)

    I.say('CUSTOM ENGAGEMENT RINGS')
    I.waitForText('CUSTOM ENGAGEMENT RINGS', waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[1]/div[3]/div/a')
    I.forceClick('CUSTOM ENGAGEMENT RINGS')
    I.waitInUrl('/custom-engagement-rings-custom-made-rings', waitTime)

    I.say('ENGAGEMENT RINGS READY TO SHIP')
    I.waitForText('ENGAGEMENT RINGS READY TO SHIP', waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[1]/div[4]/div/a')
    I.forceClick('ENGAGEMENT RINGS READY TO SHIP')
    I.waitInUrl('/engagement-ring/ready-to-ship', waitTime)

    I.say('SHOP NOW')
    I.waitForText('SHOP NOW', waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[2]/div/div/div/a')
    I.forceClick('SHOP NOW', '//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[2]/div/div/div/a')
    I.waitInUrl('/engagement-ring/create/ring', waitTime)

    // Links of Weddings Rings ---------------------------------------------->
    I.say('LINKS OF WEDDINGS RINGS')
    I.say("WOMEN's WEDDINGS RINGS")
    I.waitForText("WOMEN's WEDDING RINGS", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[2]/div/div[1]/div[1]/div/a')
    I.forceClick("WOMEN's WEDDING RINGS")
    I.waitInUrl('/lab-grown-diamond-wedding-band-lab-diamond-wedding-band-lab-created-diamond-wedding-band', waitTime)
    I.say("MEN's WEDDING RINGS")
    I.waitForText("MEN's WEDDING RINGS", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[2]/div/div[1]/div[2]/div/a')
    I.forceClick("MEN's WEDDING RINGS")
    I.waitInUrl('/mens-wedding-bands-mens-wedding-rings-wedding-bands-for-men', waitTime)

    // Links of Diamond Jewellery ---------------------------------------------->
    I.say('LINKS OF DIAMOND JEWELLERY')
    I.say("DIAMOND STUDS")
    I.waitForText("DIAMOND STUDS", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[1]/div[1]/div/a')
    I.forceClick("DIAMOND STUDS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    I.say("DIAMOND EARRINGS")
    I.waitForText("DIAMOND EARRINGS", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[1]/div[2]/div/a')
    I.forceClick("DIAMOND EARRINGS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    I.say("TENNIS BRACELETS")
    I.waitForText("TENNIS BRACELETS", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[1]/div[3]/div/a')
    I.forceClick("TENNIS BRACELETS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    I.say("DIAMOND NECKLACES")
    I.waitForText("DIAMOND NECKLACES", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[1]/div[4]/div/a')
    I.forceClick("DIAMOND NECKLACES")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    I.say("DRESS RINGS")
    I.waitForText("DRESS RINGS", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[1]/div[5]/div/a')
    I.forceClick("DRESS RINGS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')
    I.say("SHOP NOW")
    I.waitForText("SHOP NOW", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[2]/div/div/div/a')
    I.forceClick("SHOP NOW", '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[2]/div/div/div/a')
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')

    // Links of Education ---------------------------------------------->
    I.say('LINKS OF EDUCATION - DIAMOND EDUCATION')
    I.say('DIAMOND EDUCATION - WHY LAB GROWN DIAMONDS')
    I.waitForText("Why Lab Grown Diamonds", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[1]/div/div[2]/ul/li[1]/a')
    I.forceClick('Why Lab Grown Diamonds')
    I.seeInCurrentUrl('/ethical-diamonds-ethical-lab-grown-diamonds-ethical-engagement-rings')
    I.say('DIAMOND EDUCATION - ABOUT LAB GROWN DIAMONDS')
    I.waitForText("About Lab Grown Diamonds", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[1]/div/div[2]/ul/li[2]/a')
    I.forceClick('About Lab Grown Diamonds')
    I.seeInCurrentUrl('/about-lab-diamonds')
    I.say('DIAMOND EDUCATION - COMPARISON LAB GROWN vs. MINED DIAMONDS')
    I.waitForText("Comparison Lab Grown vs. Mined Diamonds", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[1]/div/div[2]/ul/li[3]/a')
    I.forceClick('Comparison Lab Grown vs. Mined Diamonds')
    I.seeInCurrentUrl('/lab-diamonds-vs-real-diamonds-Lab-Grown-diamonds-vs-real-man-made-diamonds-vs-real')
    I.say('DIAMOND EDUCATION - SHAPES')
    I.waitForText("Shapes", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[1]/div/div[2]/ul/li[4]/a')
    I.forceClick('Shapes')
    I.seeInCurrentUrl('/diamond-shapes-types-of-diamond-cuts')
    I.say('DIAMOND EDUCATION - LEARN ABOUT THE 4Cs')
    I.waitForText("Learn About The 4Cs", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[1]/div/div[2]/ul/li[5]/a')
    I.forceClick('Learn About The 4Cs')
    I.seeInCurrentUrl('/diamond-4cs-diamond-4cs-chart-4-cs-of-diamonds-4cs-diamond')
    I.say('DIAMOND EDUCATION - CVD VS HPHT')
    I.waitForText("CVD VS HPHT", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[1]/div/div[2]/ul/li[6]/a')
    I.forceClick('CVD VS HPHT')
    I.seeInCurrentUrl('/hpht-vs-cvd-cvd-vs-hpht-cvd-vs-hpht-diamonds-vs-cvd')

    I.say('LINKS OF EDUCATION - RING EDUCATION')
    I.say('RING EDUCATION - FIND YOUR RING SIZE')
    I.waitForText("Find Your Ring Size", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[1]/div[2]/ul/li[1]/a')
    I.forceClick('Find Your Ring Size')
    I.seeInCurrentUrl('/guide-ring-size-chart-how-to-measure-ring-size')
    I.say('RING EDUCATION - PRECIOUS METAL GUIDE')
    I.waitForText("Precious Metal Guide", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[1]/div[2]/ul/li[2]/a')
    I.forceClick('Precious Metal Guide')
    I.seeInCurrentUrl('/precious-metals-guide-Platinum-White-Gold%E2%80%93Yellow-gold-Rose-gold')

    I.say('LINKS OF EDUCATION - HOW TO SHOP')
    I.waitForText("How To Shop", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[2]/div/a')
    I.forceClick('How To Shop')
    I.seeInCurrentUrl('/how-to-shop')

    I.say('LINKS OF EDUCATION - FAQs')
    I.waitForText("FAQs", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[3]/div/a')
    I.forceClick('FAQs', '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[3]/div/a')
    I.seeInCurrentUrl('/faq')

    I.say('LINKS OF EDUCATION - BLOG')
    I.waitForText("BLOG", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[4]/div/a')
    I.forceClick('BLOG')
    I.seeInCurrentUrl('/blog')

    I.say('LINKS OF EDUCATION - ABOUT LAB GROWN DIAMONDS')
    I.waitForText("ABOUT LAB GROWN DIAMONDS", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[3]/div/div/div/a')
    I.forceClick('ABOUT LAB GROWN DIAMONDS', '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[3]/div/div/div/a')
    I.seeInCurrentUrl('/about-lab-diamonds')

    // Links of Contact ---------------------------------------------->
    I.say('LINKS OF CONTACT - CONTACT US')
    I.waitForText("CONTACT US", waitTime, '//*[@id="main_menu_container"]/div[2]/div/div[5]/div/div[1]/div/div/ul/li[1]/div/div/a')
    I.forceClick('CONTACT US')
    I.seeInCurrentUrl('/contact')

    I.say('LINKS OF CONTACT - ABOUT US')
    I.waitForText("ABOUT US", waitTime)
    I.forceClick('ABOUT US')
    I.seeInCurrentUrl('/our_story')

    I.say('LINKS OF CONTACT - SHOWROOMS')

    I.say('AUSTRALIA - SIDNEY')
    I.waitForText("Sydney (NSW)", waitTime)
    I.forceClick('Sydney (NSW)')
    I.seeInCurrentUrl('/lab-grown-diamonds-sydney-lab-diamonds-sydney')

    I.say('AUSTRALIA - PARRAMATTA')
    I.waitForText("Parramatta (NSW)", waitTime)
    I.forceClick('Parramatta (NSW)')
    I.seeInCurrentUrl('/lab-grown-diamonds-parramatta-lab-diamonds-parramatta')

    I.say('AUSTRALIA - MELBOURNE')
    I.waitForText("Melbourne (VIC)")
    I.forceClick('Melbourne (VIC)')
    I.seeInCurrentUrl('/lab-grown-diamonds-melbourne-lab-diamonds-melbourne')

    I.say('AUSTRALIA - PERTH')
    I.waitForText("Perth (WA)", waitTime)
    I.forceClick('Perth (WA)')
    I.seeInCurrentUrl('/lab-grown-diamonds-perth-lab-diamonds-perth')

    I.say('AUSTRALIA - ADELAIDE')
    I.waitForText("Adelaide (SA)", waitTime)
    I.forceClick('Adelaide (SA)')
    I.seeInCurrentUrl('/lab-grown-diamonds-adelaide-lab-diamonds-adelaide')

    I.say('AUSTRALIA - BRISBANE')
    I.waitForText("Brisbane (QLD)", waitTime)
    I.forceClick('Brisbane (QLD)')
    I.seeInCurrentUrl('/lab-grown-diamonds-brisbane-lab-diamonds-brisbane')

    I.say('NEW ZEALAND')
    I.waitForText("New Zealand", waitTime)
    I.forceClick('New Zealand')
    I.seeInCurrentUrl('/lab-grown-diamonds-nz-lab-diamonds-nz-man-made-diamonds-nz')

    I.say('SINGAPORE')
    // I.waitForText("Singapore", waitTime, '.sublinks_contact .links .custom-ul-right')
    I.forceClick('Singapore')
    I.seeInCurrentUrl('/contact')    

    I.say('UK')
    // I.waitForText("UK", waitTime, '.sublinks_contact .links .custom-ul-right')
    I.forceClick('UK')
    I.seeInCurrentUrl('/contact')

    I.say('GERMANY')
    // I.waitForText("Germany", waitTime, '.sublinks_contact .links .custom-ul-right')
    I.forceClick('Germany')
    I.seeInCurrentUrl('/contact')

});