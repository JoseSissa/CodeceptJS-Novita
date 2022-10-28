Feature('ENGAGEMENT RINGS');

Scenario('SHOP NOW', async ({ I }) => {

    // -------------------------------------------------------------------------------------------
    // -------------------------------------------------------------------------------------------

    I.say('TEST - CUSTOM ENGAGEMENT RINGS');
    I.amOnPage("/");
    I.forceClick("ENGAGEMENT RINGS READY TO SHIP");
    I.waitForText('ENGAGEMENT RINGS READY TO SHIP', 30);
    I.seeInCurrentUrl("/engagement-ring/ready-to-ship");

})