import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
} from "selenium-webdriver";
const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

class EmployeePage {
  driver: WebDriver;
  url: string =
    "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html";
  //FILL OUT LOCATORS CONSTRUCTOR AND METHODS IN ORDER TO PASS THE TEST
  header = By.className("titleText");
  addEmployee = By.name("addEmployee");
  newEmployee = By.name("employee11");
  nameInput = By.name("nameEntry");
  phoneInput = By.name("phoneEntry");
  titleInput = By.name("titleEntry");
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
  async navigate() {
    return this.driver.get(this.url);
  }
}

describe("Employee Manger Test", () => {
  const emPage = new EmployeePage(driver);
  beforeEach(async () => {
    await emPage.navigate();
  });
  afterAll(async () => {
    await driver.quit();
  });
  test("adding an employee", async () => {
    await driver.wait(until.elementLocated(emPage.header));
    await driver.findElement(emPage.addEmployee).click();
    await driver.findElement(emPage.newEmployee).click();
    await driver.findElement(emPage.nameInput).click();
    await driver.findElement(emPage.nameInput).clear();
    await driver.findElement(emPage.nameInput).sendKeys("Change this");
    await driver.findElement(emPage.phoneInput).click();
    await driver.findElement(emPage.phoneInput).clear();
    await driver.findElement(emPage.phoneInput).sendKeys("Change this");
    await driver.findElement(emPage.titleInput).click();
    await driver.findElement(emPage.titleInput).clear();
    await driver.findElement(emPage.titleInput).sendKeys("Change this");
  });
});

/* this is a commment */
