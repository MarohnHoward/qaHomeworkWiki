import { Builder, By, Capabilities, WebDriver } from "selenium-webdriver";
import chromedriver from "chromedriver";
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

describe("practicing xpath searching", () => {
  beforeEach(async () => {
    await driver.get("https://www.amazon.com/");
  });
  afterAll(async () => {
    await driver.quit();
  });
  const searchBar = By.xpath('//input[@id="twotabsearchtextbox"]');
  const results = By.xpath('(//div[@class="sg-col-inner"])[3]');
  test("searching using xpath", async () => {
    await driver.findElement(searchBar).click();
    await driver.findElement(searchBar).sendKeys("baby yoda\n");
    const theResults = await driver.findElement(results).getText();
    expect(theResults).toContain("The Child");
  });
});
