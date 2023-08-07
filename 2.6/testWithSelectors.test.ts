import {
  Builder,
  By,
  Capabilities,
  WebDriver,
  until,
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

// describe("Filling in the blanks", () => {
//   beforeEach(async () => {
//     await driver.get(
//       "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html"
//     );
//   });
//   afterAll(async () => {
//     await driver.quit();
//   });

//   const hdrInput: By = By.name("hdrInput"); //fill in the blank
//   const mkeInput: By = By.name("mkeInput"); //fill in the blank
//   const oaiInput: By = By.name("oriInput"); //fill in the blank
//   const nameInput: By = By.name("namInput"); //fill in the blank
//   const clrBtn: By = By.id("clearBtn"); //fill in blank
//   const submitBtn: By = By.id("saveBtn"); //fill in blank
//   const errorMsg: By = By.id("validHeader"); // fill in blank
//   test("filling in the blanks for real", async () => {
//     await driver.findElement(hdrInput).sendKeys("Change this");
//     await driver.findElement(mkeInput).sendKeys("change this");
//     await driver.findElement(oaiInput).sendKeys("change this");
//     await driver.findElement(nameInput).sendKeys("change this");
//     await driver.findElement(submitBtn).click();
//     const theMessage = await driver.findElement(errorMsg).getText();
//     expect(theMessage).toContain("Errors Received:");
//     await driver.findElement(clrBtn).click();
//   });
// });

class PageObject {
  driver: WebDriver;
  url =
    "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html";
  hdrInput: By = By.name("hdrInput"); //fill in the blank
  mkeInput: By = By.name("mkeInput"); //fill in the blank
  oaiInput: By = By.name("oriInput"); //fill in the blank
  nameInput: By = By.name("namInput"); //fill in the blank
  clrBtn: By = By.id("clearBtn"); //fill in blank
  submitBtn: By = By.id("saveBtn"); //fill in blank
  errorMsg: By = By.id("validHeader"); // fill in blank
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
  async sendKeys(elementBy: By, keys: string) {
    await this.driver.wait(until.elementLocated(elementBy));
    return this.driver.findElement(elementBy).sendKeys(keys);
  }
  async getErrorMessage(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return this.driver.findElement(elementBy).getText();
  }
  async clickElement(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    return this.driver.findElement(elementBy).click();
  }
}
describe("Filling in the blanks, but with class! the describe", () => {
  beforeEach(async () => {
    await driver.get(
      "https://devmountain-qa.github.io/enter-wanted/1.4_Assignment/index.html"
    );
  });
  afterAll(async () => {
    await driver.quit();
  });
  test("Filling in the blanks, but with class! the test", async () => {
    const page = new PageObject(driver);
    await page.sendKeys(page.hdrInput, "Change This");
    await page.sendKeys(page.mkeInput, "Change This");
    await page.sendKeys(page.oaiInput, "Change This");
    await page.sendKeys(page.nameInput, "Change This");
    await page.clickElement(page.submitBtn);
    const theMessage = await page.getErrorMessage(page.errorMsg);
    expect(theMessage).toContain("Errors Received:");
    await driver.findElement(page.clrBtn).click();
  });
});
