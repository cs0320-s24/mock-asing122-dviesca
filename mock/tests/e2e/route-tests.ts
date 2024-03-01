import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // load page without errors
  await page.goto('http://localhost:8000/');  
  // login to the page
  await expect(page.getByLabel('LoginButton')).toBeVisible()
  await page.getByLabel('LoginButton').click();
});

test('testing basic load', async ({ page }) => {

  // Input a file path to the command input
  await page.fill('repl-input', 'load_file <mock/src/components/mocked/CSVMap.ts>');

  // Submit 
  await page.click('button:has-text("Submit")');
  await page.getByLabel('LoginButton').click();

  // Check if the file was successfully loaded
  const fileLoadedMessage = await page.textContent('.repl-history');
  expect(fileLoadedMessage).toContain('File successfully loaded.');

  // TODO: check that table was corrrectly rendered
  const loadedFileTable = await page.$('table');
  expect(loadedFileTable).not.toBeNull();

});


// ERROR CHECKS
test('viewing without loading', async ({ page }) => {
  await page.fill('input[aria-label="Command input"]', 'view');
  // Submit command
  await page.click('button:has-text("Submit")');
  // Check error message being displayed
  const errorMessage = await page.textContent('.repl-history');
  expect(errorMessage).toContain('Error: No file loaded. Please load a file before attempting to view.');
});


test('searching without loading', async ({ page }) => {
  await page.fill('input[aria-label="Command input"]', 'search');
  // Submit the command
  await page.click('button:has-text("Submit")');
  // Check error message being displayed
  const errorMessage = await page.textContent('.repl-history');
  expect(errorMessage).toContain('Error: No file loaded. Please load a file before attempting to search.');
});
