import { GooglePage } from "./PageObject";
import { Builder, Capabilities, WebDriver } from "selenium-webdriver";
const chromedriver = require("chromedriver");
const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

const page = new GooglePage();

test("do a search", async () => {
  await page.navigate();
  await page.search("Chicago Cubs");
  await page.getResults();
  await page.driver.quit();
});
