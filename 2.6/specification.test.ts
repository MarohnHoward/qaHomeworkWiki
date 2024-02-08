import { SpecPage } from "./SpecPage";
const chromedriver = require("chromedriver");
import { WebDriver, Builder, Capabilities } from "selenium-webdriver";

const driver: WebDriver = new Builder()
  .withCapabilities(Capabilities.chrome())
  .build();

const page = new SpecPage(driver, 'https://www.google.com/');

test("it works", async () => {
  await page.navigate();
  await page.search("purple");
  expect(await page.getResults()).toContain("purple");
});

afterAll(async () => {
  await driver.quit();
});