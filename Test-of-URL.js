Feature('Diamond Jewellery - Diamond Studs');

Scenario('Diamond Jewellery - Diamond Studs', async ({ I }) => {

    I.amOnPage('/');

    // Links of Engagement Rings ---------------------------------------------->
    I.say('LINKS OF ENGAGEMENT RINGS')
    I.say('START WITH A DIAMOND')
    I.forceClick('Start With a Diamond')
    I.seeInCurrentUrl('/engagement-ring/create/diamond')

    I.say('START WITH A RING DESIGND')
    I.forceClick('Start With a Ring Design')
    I.seeInCurrentUrl('/engagement-ring/create/ring')

    I.say('BUY LOOSE DIAMOND')
    I.forceClick('BUY LOOSE DIAMONDS')
    I.seeInCurrentUrl('/buy-loose-diamond-start-buying')

    I.say('CUSTOM ENGAGEMENT RINGS')
    I.forceClick('CUSTOM ENGAGEMENT RINGS')
    I.seeInCurrentUrl('/custom-engagement-rings-custom-made-rings')

    I.say('ENGAGEMENT RINGS READY TO SHIP')
    I.forceClick('ENGAGEMENT RINGS READY TO SHIP')
    I.seeInCurrentUrl('/engagement-ring/ready-to-ship')

    I.say('SHOP NOW')
    I.forceClick('SHOP NOW', '//*[@id="main_menu_container"]/div[2]/div/div[1]/div/div[2]/div/div/div/a')
    I.seeInCurrentUrl('/engagement-ring/create/ring')

    // Links of Weddings Rings ---------------------------------------------->
    I.say('LINKS OF WEDDINGS RINGS')
    I.say("WOMEN's WEDDINGS RINGS")
    I.forceClick("WOMEN's WEDDING RINGS")
    I.seeInCurrentUrl('/lab-grown-diamond-wedding-band-lab-diamond-wedding-band-lab-created-diamond-wedding-band')

    I.say("MEN's WEDDING RINGS")
    I.forceClick("MEN's WEDDING RINGS")
    I.seeInCurrentUrl('/mens-wedding-bands-mens-wedding-rings-wedding-bands-for-men')

    // Links of Diamond Jewellery ---------------------------------------------->
    I.say('LINKS OF DIAMOND JEWELLERY')
    I.say("DIAMOND STUDS")
    I.forceClick("DIAMOND STUDS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')

    I.say("DIAMOND EARRINGS")
    I.forceClick("DIAMOND EARRINGS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')

    I.say("TENNIS BRACELETS")
    I.forceClick("TENNIS BRACELETS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')

    I.say("DIAMOND NECKLACES")
    I.forceClick("DIAMOND NECKLACES")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')

    I.say("DRESS RINGS")
    I.forceClick("DRESS RINGS")
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')

    I.say("SHOP NOW")
    I.forceClick("SHOP NOW", '//*[@id="main_menu_container"]/div[2]/div/div[3]/div/div[2]/div/div/div/a')
    I.seeInCurrentUrl('/lab-grown-diamond-earrings-lab-created-diamond-earrings-lab-grown-diamond-jewellery')

    // Links of Education ---------------------------------------------->
    I.say('LINKS OF EDUCATION - DIAMOND EDUCATION')
    I.say('DIAMOND EDUCATION - WHY LAB GROWN DIAMONDS')
    I.forceClick('Why Lab Grown Diamonds')
    I.seeInCurrentUrl('/ethical-diamonds-ethical-lab-grown-diamonds-ethical-engagement-rings')

    I.say('DIAMOND EDUCATION - ABOUT LAB GROWN DIAMONDS')
    I.forceClick('About Lab Grown Diamonds')
    I.seeInCurrentUrl('/about-lab-diamonds')

    I.say('DIAMOND EDUCATION - COMPARISON LAB GROWN vs. MINED DIAMONDS')
    I.forceClick('Comparison Lab Grown vs. Mined Diamonds')
    I.seeInCurrentUrl('/lab-diamonds-vs-real-diamonds-Lab-Grown-diamonds-vs-real-man-made-diamonds-vs-real')

    I.say('DIAMOND EDUCATION - SHAPES')
    I.forceClick('Shapes')
    I.seeInCurrentUrl('/diamond-shapes-types-of-diamond-cuts')

    I.say('DIAMOND EDUCATION - LEARN ABOUT THE 4Cs')
    I.forceClick('Learn About The 4Cs')
    I.seeInCurrentUrl('/diamond-4cs-diamond-4cs-chart-4-cs-of-diamonds-4cs-diamond')

    I.say('DIAMOND EDUCATION - CVD VS HPHT')
    I.forceClick('CVD VS HPHT')
    I.seeInCurrentUrl('/hpht-vs-cvd-cvd-vs-hpht-cvd-vs-hpht-diamonds-vs-cvd')

    I.say('LINKS OF EDUCATION - RING EDUCATION')
    I.say('RING EDUCATION - FIND YOUR RING SIZE')
    I.forceClick('Find Your Ring Size')
    I.seeInCurrentUrl('/guide-ring-size-chart-how-to-measure-ring-size')

    I.say('RING EDUCATION - PRECIOUS METAL GUIDE')
    I.forceClick('Precious Metal Guide')
    // I.waitInUrl('/precious-metals-guide-Platinum-White-Gold–Yellow-gold-Rose-gold', 10)
    I.seeInCurrentUrl('/precious-metals-guide-Platinum-White-Gold%E2%80%93Yellow-gold-Rose-gold')

    I.say('LINKS OF EDUCATION - HOW TO SHOP')
    I.forceClick('How To Shop')
    I.seeInCurrentUrl('/how-to-shop')

    I.say('LINKS OF EDUCATION - FAQs')
    I.forceClick('FAQs', '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[3]/div/a')
    I.seeInCurrentUrl('/faq')

    I.say('LINKS OF EDUCATION - BLOG')
    I.forceClick('BLOG')
    I.seeInCurrentUrl('/blog')

    I.say('LINKS OF EDUCATION - ABOUT LAB GROWN DIAMONDS')
    I.forceClick('ABOUT LAB GROWN DIAMONDS', '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[3]/div/div/div/a')
    I.seeInCurrentUrl('/about-lab-diamonds')

    // Links of Contact ---------------------------------------------->
    I.say('LINKS OF CONTACT - CONTACT US')
    I.forceClick('CONTACT US')
    I.seeInCurrentUrl('/contact')

    I.say('LINKS OF CONTACT - ABOUT US')
    I.forceClick('ABOUT US')
    I.seeInCurrentUrl('/our_story')

    I.say('LINKS OF CONTACT - SHOWROOMS')

    I.say('AUSTRALIA - SIDNEY')
    I.forceClick('Sydney (NSW)')
    I.seeInCurrentUrl('/lab-grown-diamonds-sydney-lab-diamonds-sydney')

    I.say('AUSTRALIA - PARRAMATTA')
    I.forceClick('Parramatta (NSW)')
    I.seeInCurrentUrl('/lab-grown-diamonds-parramatta-lab-diamonds-parramatta')

    I.say('AUSTRALIA - MELBOURNE')
    I.forceClick('Melbourne (VIC)')
    I.seeInCurrentUrl('/lab-grown-diamonds-melbourne-lab-diamonds-melbourne')

    I.say('AUSTRALIA - PERTH')
    I.forceClick('Perth (WA)')
    I.seeInCurrentUrl('/lab-grown-diamonds-perth-lab-diamonds-perth')

    I.say('AUSTRALIA - ADELAIDE')
    I.forceClick('Adelaide (SA)')
    I.seeInCurrentUrl('/lab-grown-diamonds-adelaide-lab-diamonds-adelaide')

    I.say('AUSTRALIA - BRISBANE')
    I.forceClick('Brisbane (QLD)')
    I.seeInCurrentUrl('/lab-grown-diamonds-brisbane-lab-diamonds-brisbane')

    I.say('SINGAPORE')
    I.forceClick('Singapore')
    I.seeInCurrentUrl('/contact')

    I.say('NEW ZEALAND')
    I.forceClick('New Zealand')
    I.seeInCurrentUrl('/lab-grown-diamonds-nz-lab-diamonds-nz-man-made-diamonds-nz')

    I.say('UK')
    I.forceClick('UK')
    I.seeInCurrentUrl('/contact')

    I.say('GERMANY')
    I.forceClick('Germany')
    I.seeInCurrentUrl('/contact')

});