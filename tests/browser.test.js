const { Builder, By, until } = require('selenium-webdriver');
require('chromedriver');

jest.setTimeout(30000); // 30 sek

test('öppnar Google och söker på något', async () => {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('https://www.google.com');

    // Försök klicka bort cookie-popup
    try {
      const agreeButton = await driver.wait(
        until.elementLocated(By.css('button[aria-label="Godkänn alla"]')),
        5000
      );
      await agreeButton.click();
      await driver.sleep(1000);
    } catch {
      console.log('Cookie-popup hittades inte.');
    }

    const searchBox = await driver.wait(until.elementLocated(By.name('q')), 10000);
    await driver.wait(until.elementIsVisible(searchBox), 5000);
    await searchBox.sendKeys('OpenAI');
    await driver.sleep(1000); // vänta lite

    // Klicka på sökknappen
    const searchButton = await driver.findElement(By.name('btnK'));
    await searchButton.click();

    // Vänta på titel
    await driver.wait(until.titleContains('OpenAI'), 10000);
    const title = await driver.getTitle();
    console.log('SIDTITEL:', title);

    expect(title).toMatch(/OpenAI/i);
  } finally {
    await driver.quit();
  }
});
