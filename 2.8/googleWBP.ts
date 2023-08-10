import { By, WebDriver, until } from "selenium-webdriver";
import { BasePage } from "./basePage";

export default class GoogleWBP extends BasePage {
  searchInput = By.name("q");
  results = By.id("rso");
  constructor() {
    super({ url: "https://google.com" });
  }
  async search(input: string | number) {
    await this.click(this.searchInput);
    await this.setInput(this.searchInput, `${input}\n`);
  }
  async getResults() {
    return await this.getText(this.results);
  }
}
