import GoogleWBP from "./googleWBP";
const fs = require("fs");

const page = new GoogleWBP();
const searchTerm = "Mushoku Tensei";

test("the driver can search the web via the google search bar", async () => {
  await page.navigate();
  await page.search(searchTerm);
  const results = await page.getResults();
  expect(results).toContain(searchTerm);
  await fs.writeFile(
    `${__dirname}/google.png`,
    await page.driver.takeScreenshot(),
    "base64",
    (e) => {
      if (e) console.error(e);
      else console.log("Image saved successfully");
    }
  );
  await fs.writeFile(`${__dirname}/test.txt`, results, (e) => {
    if (e) console.error(e);
    else console.log("Text saved successfully");
  });
});

afterAll(async () => {
  await page.driver.quit();
});
