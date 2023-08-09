import {
  By,
  Builder,
  WebDriver,
  until,
  Capabilities,
} from "selenium-webdriver";

export interface BasePageOptions {
  driver?: WebDriver;
  url?: string;
}

export class BasePage {
  driver: WebDriver;
  url: string;
  constructor(options?: BasePageOptions) {
    this.driver = options?.driver
      ? options.driver
      : new Builder().withCapabilities(Capabilities.chrome()).build();
    if (options?.url) this.url = options.url;
  }
  async navigate(url?: string) {
    if (url) return await this.driver.get(url);
    else if (this.url) return await this.driver.get(this.url);
    else
      return Promise.reject(
        "BasePage.navigate() needs a url defined on the page objects, or one passed in."
      );
  }
  async getElement(elementBy: By) {
    await this.driver.wait(until.elementLocated(elementBy));
    const element = await this.driver.findElement(elementBy);
    await this.driver.wait(until.elementIsVisible(element));
    return element;
  }
  async click(elementBy: By) {
    return (await this.getElement(elementBy)).click();
  }
  async setInput(elementBy: By, keys: any) {
    const input = await this.getElement(elementBy);
    await input.clear();
    return input.sendKeys(keys);
  }
  async getText(elementBy: By) {
    return (await this.getElement(elementBy)).getText();
  }
  async getAttribute(elementBy: By, attribute: string) {
    return (await this.getElement(elementBy)).getAttribute(attribute);
  }
}
