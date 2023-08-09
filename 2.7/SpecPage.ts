import { By, WebDriver, until } from "selenium-webdriver";
export class SpecPage {
  driver: WebDriver;
  url = "https://google.com";
  searchInput = By.id("APjFqb");
  searchBtn = By.name("btnK");
  resultsContext = By.id("rcnt");
  resultText = By.className("VwiC3b yXK7lf MUxGbd yDYNvb lyLwlc");
  constructor(driver: WebDriver) {
    this.driver = driver;
  }
  async navigate() {
    await this.driver.get(this.url);
  }
  async doSearch(searchText: string) {
    await this.driver.findElement(this.searchInput).click();
    await this.driver.findElement(this.searchInput).sendKeys(searchText);
    await this.driver.findElement(this.searchBtn).click();
  }
  async getResults() {
    await this.driver.wait(until.elementLocated(this.resultsContext));
    return (
      await this.driver.findElement(this.resultText).getText()
    ).toLowerCase();
  }
}
