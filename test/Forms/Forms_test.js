Feature('FORMS');

Scenario('FORMS: CONTACT, FEEDBACK, RING SIZE REQUEST', async ({ I }) => {
    waitTime = 300 //Seconds

    I.amOnPage("/");
    I.waitForText('CONTACT', waitTime)
    I.forceClick('CONTACT')
    I.seeInCurrentUrl('/contact')
    I.waitForText('CONTACT', waitTime)
    I.fillField('#contact_message_form_name', 'Testing')
    I.fillField('#contact_message_form_email', 'Testing@testing.com')
    I.fillField('#contact_message_form_phone', '1234567890')
    I.fillField('#contact_message_form_message', 'Test form, please ignore this request.')
    I.forceClick('//*[@id="contactForm"]/div[6]/div/div[2]/input')
    I.waitForText("Captcha validation wasn't success. Please try again.", waitTime)
    I.see("Captcha validation wasn't success. Please try again.")
    I.wait(2)

    // Feedback
    I.click('FEEDBACK')
    I.seeInCurrentUrl('/feedback')
    I.waitForText('FEEDBACK', waitTime)
    I.fillField('#feedback_message_form_name', 'Testing')
    I.fillField('#feedback_message_form_email', 'Testing@testing.com')
    I.fillField('#feedback_message_form_phone', '1234567890')
    I.fillField('#feedback_message_form_message', 'Test form, please ignore this request.')
    I.forceClick('//*[@id="contactForm"]/div[6]/div/div[2]/input')
    I.waitForText("Captcha validation wasn't success. Please try again.", waitTime)
    I.see("Captcha validation wasn't success. Please try again.")
    I.wait(2)

    // Ring size request
    I.forceClick('Find Your Ring Size', '//*[@id="main_menu_container"]/div[2]/div/div[4]/div/div[2]/div[1]/div[2]/ul/li[1]/a')
    I.seeInCurrentUrl('/guide-ring-size-chart-how-to-measure-ring-size')
    I.waitForText('HOW TO FIND YOUR RING SIZE', waitTime)
    I.click('REQUEST RING SIZER')
    I.fillField('#ring_sizer_request_form_name', 'Testing')
    I.fillField('#ring_sizer_request_form_email', 'Testing@testing.com')
    I.fillField('#ring_sizer_request_form_address', 'Testing-123')
    I.fillField('#ring_sizer_request_form_city', 'Testing')
    I.selectOption('#ring_sizer_request_form_province', 'Australian Capital Territory')
    I.fillField('#ring_sizer_request_form_postalCode', '4000')
    I.fillField('#ring_sizer_request_form_message', 'Test form, please ignore this request.')
})