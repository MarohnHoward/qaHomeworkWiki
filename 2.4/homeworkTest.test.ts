import {
  Builder,
  By,
  Capabilities,
  until,
  WebDriver,
  WebElement,
  Key,
} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();
const bernice: By = By.name("employee1");
const marnie: By = By.name("employee2");
const phillip: By = By.name("employee3");
const nameDisplay: By = By.id("employeeTitle");
const nameInput: By = By.name("nameEntry");
const phoneInput: By = By.name("phoneEntry");
const titleInput: By = By.name("titleEntry");
const saveButton: By = By.id("saveBtn");
const cancelButton: By = By.name("cancel");
const errorCard: By = By.css(".errorCard");

describe("Employee Manager 1.2", () => {
  beforeEach(async () => {
    await driver.get(
      "https://devmountain-qa.github.io/employee-manager/1.2_Version/index.html"
    );
  });
  afterAll(async () => {
    await driver.quit();
  });
  describe("handles unsaved, canceled, and saved changes correctly", () => {
    test("An unsaved change doesn't persist", async () => {
      /*
          This test follows these steps:
          1. Open Bernice Ortiz
          2. Edit the name input
          3. Open Phillip Weaver
          4. Open Bernice Ortiz
          5. Verify the name field is the original name
          */
      //  this fiinds bernice in the llist then clicks on her
      await driver.findElement(bernice).click();
      //   this waits until the name input is loaded onto the DOM
      await driver.wait(
        until.elementIsVisible(await driver.findElement(nameInput))
      );
      //   this clears the name input
      await driver.findElement(nameInput).clear();
      //   this adds text to the name input
      await driver.findElement(nameInput).sendKeys("Test Name");
      //   this finds phil in the list and clicks on him
      await driver.findElement(phillip).click();
      //   this waits until the nameDisplay is loaded on the DOM and checks to make sure Phil is on the display
      await driver.wait(
        until.elementTextContains(
          await driver.findElement(nameDisplay),
          "Phillip"
        )
      );
      //   this finds Bernice in the list and clicks on her
      await driver.findElement(bernice).click();
      //   this waits until Bernice gets lloaded onto the name display andd checks that it is  her
      await driver.wait(
        until.elementTextContains(
          await driver.findElement(nameDisplay),
          "Bernice"
        )
      );
      //   this checks to make sure that Bernice is the one in the name input
      expect(
        await (await driver.findElement(nameInput)).getAttribute("value")
      ).toBe("Bernice Ortiz");
    });

    test("A canceled change doesn't persist", async () => {
      /*
              This test follows these steps:
              1. Open Phillip Weaver
              2. Edit the name input
              3. Click cancel
              5. Verify the name field is the original name
              */
      await driver.findElement(phillip).click();
      await driver.wait(
        until.elementIsVisible(await driver.findElement(nameInput))
      );
      await driver.findElement(nameInput).clear();
      await driver.findElement(nameInput).sendKeys("Test Name");
      await driver.findElement(cancelButton).click();
      expect(
        await (await driver.findElement(nameInput)).getAttribute("value")
      ).toBe("Phillip Weaver");
    });

    test("A saved change persists", async () => {
      /*
              This test follows these steps:
              1. Open Bernice Ortiz
              2. Edit the name input
              3. Save the change
              4. Open Phillip Weaver
              5. Open Bernice Ortiz's old record
              5. Verify the name field is the edited name
              */
      await driver.findElement(bernice).click();
      await driver.wait(
        until.elementIsVisible(await driver.findElement(nameInput))
      );
      await driver.findElement(nameInput).clear();
      await driver.findElement(nameInput).sendKeys("Test Name");
      await driver.findElement(saveButton).click();
      await driver.findElement(phillip).click();
      await driver.wait(
        until.elementTextContains(
          await driver.findElement(nameDisplay),
          "Phillip"
        )
      );
      await driver.findElement(bernice).click();
      expect(
        await (await driver.findElement(nameInput)).getAttribute("value")
      ).toBe("Test Name");
    });
  });

  describe("handles error messages correctly", () => {
    test("shows an error message for an empty name field", async () => {
      /*
              This test follows these steps:
              1. Open Bernice Ortiz
              2. Clear the name input
              3. Save the change
              4. Verify the error is present
              */
      await driver.findElement(bernice).click();
      await driver.wait(
        until.elementIsVisible(await driver.findElement(nameInput))
      );
      await driver.findElement(nameInput).clear();
      await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
      await driver.findElement(saveButton).click();
      await driver.wait(until.elementLocated(errorCard));
      expect(await (await driver.findElement(errorCard)).getText()).toBe(
        "The name field must be between 1 and 30 characters long."
      );
    });
    test("lets you cancel out of an error message", async () => {
      /*
              This test follows these steps:
              1. Open Bernice Ortiz
              2. Clear the name input
              3. Save the change
              4. Verify the error is present
              5. Cancel the change
              6. Verify the error is gone
              */
      await driver.findElement(bernice).click();
      await driver.wait(
        until.elementIsVisible(await driver.findElement(nameInput))
      );
      await driver.findElement(nameInput).clear();
      await driver.findElement(nameInput).sendKeys(Key.SPACE, Key.BACK_SPACE);
      await driver.findElement(saveButton).click();
      await driver.wait(until.elementLocated(errorCard));
      expect(await (await driver.findElement(errorCard)).getText()).toBe(
        "The name field must be between 1 and 30 characters long."
      );
      await driver.findElement(nameInput).sendKeys(Key.SPACE);
      await driver.findElement(saveButton).click();
      driver.wait(() => true, 500);
      expect(await driver.findElements(errorCard)).toHaveLength(0);
    });
  });
});
