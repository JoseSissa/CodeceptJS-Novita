Feature('Custom Engagement Rings');

Scenario('Custom Engagement Rings', async ({ I }) => {

    I.say('TEST - CUSTOM ENGAGEMENT RINGS');
    I.amOnPage("/");
    I.forceClick("CUSTOM ENGAGEMENT RINGS");
    I.seeInCurrentUrl("/custom-engagement-rings-custom-made-rings");
    
    // BUY NOW with just a 20% deposit
    I.say('BUY NOW with just a 20% deposit');
    I.waitForText('DESIGN YOUR OWN ENGAGEMENT RING', 10);
    I.click('BUY NOW with just a 20% deposit');
    I.wait(2);
    I.switchToNextTab();
    I.seeInCurrentUrl('/deposit');
    I.closeCurrentTab();
    I.seeInCurrentUrl("/custom-engagement-rings-custom-made-rings");
    I.waitForText('DESIGN YOUR OWN ENGAGEMENT RING', 10);

    // Book virtual appointment
    // I.say('BOOK VIRTUAL APPOINTMENT');
    // I.click('book virtual appointment');
    // I.seeInSource('<h2>Select a Date & Time</h2>');


    // BUY NOW with just a 20% deposit
    I.say('CONTACT PAGE');
    I.click('CONTACT US');
    I.wait(2);
    I.seeInCurrentUrl('/contact');
    I.fillField('#contact_message_form_name', 'Example Name');
    I.fillField('#contact_message_form_email', 'Example@mail.com');
    I.fillField('#contact_message_form_phone', '123456');
    I.fillField('#contact_message_form_message', 'Example Message');
    pause();
    


});