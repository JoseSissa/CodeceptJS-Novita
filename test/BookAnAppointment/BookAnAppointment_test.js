Feature('BOOK AN APPOINTMENT');

Scenario('BOOK AN APPOINTMENT IN YOUR CAPITAL CITY', async ({ I }) => {
    const waitTime = 300 //seconds
    const cities = ['sydney', 'parramatta', 'melbourne', 'brisbane', 'adelaide', 'perth']

    I.amOnPage("/");
    I.waitForText('BOOK AN APPOINTMENT IN YOUR CAPITAL CITY', waitTime)

    I.forceClick('#virtual-booking-modal-trigger')
    I.waitForText('BOOK AN APPOINTMENT', waitTime)
    I.see('BOOK AN APPOINTMENT')
    // Type of appointment - Engagement/Wedding/Jewellery
    I.selectOption('#appointment_requirement', 'engagement-ring')
    I.forceClick('//*[@id="booking-placement-section"]/label[2]/div')
    I.fillField('#email_address', 'testing@testing.com')
    I.click('#send_email_code_btn')
    I.seeElement('#email_address_verify')
    // In-store
    I.forceClick('//*[@id="booking-placement-section"]/label[1]/div')
    for (const elem of cities) {
        I.selectOption('#city', elem)
    }
    I.see('Perth')
    I.fillField('#phone_number', '1234567890')
    I.click('#send_code_btn')
    I.seeElement('#phone_number_verify')

    // Type of appointment - Pickup/Cleaning/Resize
    I.selectOption('#appointment_requirement', 'pickup')
    for (const elem of cities) {
        I.selectOption('#city', elem)
    }
    I.see('Perth')
    I.fillField('#phone_number', '0987654321')
    I.seeElement('#send_code_btn')

    
    pause()


    
})