import { Builder, By, Capabilities, WebDriver } from "selenium-webdriver";
// const chromedriver = require("chromedriver");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

describe("practicing css", () => {
  beforeEach(async () => {
    await driver.get("https://www.amazon.com/");
  });
  afterAll(async () => {
    await driver.quit();
  });

  const searchBox = By.id("APjFqb");
  const results = By.className("s-main-slot");

  test("searching for an item", async () => {
    await driver.findElement(searchBox).sendKeys("baby yoda\n");
    const resultsText = await driver.findElement(results).getText();
    expect(resultsText).toContain("The Child");
  });
});
