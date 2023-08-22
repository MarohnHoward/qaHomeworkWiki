import {
  WebDriver,
  By,
  Builder,
  Capabilities,
  until,
} from "selenium-webdriver";

interface IOptions {
  url: string;
  driver?: WebDriver;
}

export class PageObject {
  url: string;
  driver: WebDriver;
  constructor({ url, driver }: IOptions) {
    this.url = url;
    this.driver =
      driver || new Builder().withCapabilities(Capabilities.chrome()).build();
  }
}

export class GooglePage extends PageObject {
  searchBar = By.name("q");
  results = By.id("res");
  constructor() {
    super({ url: "https://google.com" });
  }
  async navigate() {
    await this.driver.get(this.url);
    await this.driver.wait(until.elementLocated(this.searchBar));
  }
  async getElement(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    const element = await this.driver.findElement(elementBy);
    await this.driver.wait(until.elementIsVisible(element));
    return element;
  }
  async sendKeys(elementBy: By, keys: any) {
    return (await this.getElement(elementBy)).sendKeys(keys);
  }
  async setInput(elementBy: By, keys: any) {
    const input = await this.getElement(elementBy);
    await input.clear();
    return this.sendKeys(this.searchBar, keys);
  }
  async search(searchTerm: string) {
    return this.setInput(this.searchBar, `${searchTerm}\n`);
  }
  async getText(elementBy: By) {
    return (await this.getElement(elementBy)).getText();
  }
  async getResults() {
    return this.getText(this.results);
  }
}
