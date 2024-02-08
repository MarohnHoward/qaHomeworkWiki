// For this assignment you will need to fill out the locators for the variables below
// and use those variables to fill out the tests below. 
// Read what the test is supposed to do and insert the variables in the () after findElement.

import { Builder, By, Capabilities, until, WebDriver, WebElement, Key,} from "selenium-webdriver";

const chromedriver = require("chromedriver");

const driver: WebDriver = new Builder().withCapabilities(Capabilities.chrome()).build();

const bernice: By = By. //! DELETE THE COMMENT & FILL IN THE BLANK
const marnie: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const phillip: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const nameDisplay: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const nameInput: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const phoneInput: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const titleInput: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const saveButton: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const cancelButton: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK
const errorCard: By = By.//! DELETE THE COMMENT & FILL IN THE BLANK

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
        await driver.findElement().click();
        await driver.wait(
            until.elementIsVisible(await driver.findElement())
        );
        await driver.findElement().clear();
        await driver.findElement().sendKeys("Test Name");
        await driver.findElement().click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(),
            "Phillip"
            )
        );
        await driver.findElement().click();
        await driver.wait(
            until.elementTextContains(
            await driver.findElement(),
            "Bernice"
            )
        );
        expect(
            await (await driver.findElement()).getAttribute("")
        ).toBe("");
        });

        test("A canceled change doesn't persist", async () => {
            /*
            This test follows these steps:
            1. Open Phillip Weaver
            2. Edit the name input
            3. Click cancel
            5. Verify the name field is the original name
            */
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys("Test Name");
            await driver.findElement().click();
            expect(
                await (await driver.findElement()).getAttribute("")
            ).toBe("");
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
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys("Test Name");
            await driver.findElement().click();
            await driver.findElement().click();
            await driver.wait(
                until.elementTextContains(
                await driver.findElement(),
                "Phillip"
                )
            );
            await driver.findElement().click();
            expect(
                await (await driver.findElement()).getAttribute("value")
            ).toBe("Bernice Ortiz");
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
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement().click();
            await driver.wait(until.elementLocated());
            expect(await (await driver.findElement()).getText()).toBe(
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
            await driver.findElement().click();
            await driver.wait(
                until.elementIsVisible(await driver.findElement())
            );
            await driver.findElement().clear();
            await driver.findElement().sendKeys(Key.SPACE, Key.BACK_SPACE);
            await driver.findElement().click();
            await driver.wait(until.elementLocated());
            expect(await (await driver.findElement()).getText()).toBe(
                "The name field must be between 1 and 30 characters long."
            );
            await driver.findElement().sendKeys(Key.SPACE);
            await driver.findElement().click();
            driver.wait(() => true, 500);
            expect(await driver.findElements()).toHaveLength(0);
        });
    });
});