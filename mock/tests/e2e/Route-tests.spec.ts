import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // load page without errors
  await page.goto('http://localhost:8000/');  
  // login to the page
  await page.getByLabel('Login').click();
});

test('test absolute minimal functionality', async ({ page }) => { 
  await page.goto('http://localhost:8000/');  
  // login to the page
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('test login logout login', async ({ page }) => {
  await expect(page.getByRole('group', { name: 'Enter a command:' })).toBeVisible();
  await expect(page.getByPlaceholder('Enter command here!')).toBeVisible();
  await expect(page.getByLabel('Sign Out')).toBeVisible();
  await page.getByLabel('Sign Out').click();
  await expect(page.getByLabel('Login')).toBeVisible();
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible();
  await expect(page.getByRole('group', { name: 'Enter a command:' })).toBeVisible();
  await expect(page.getByPlaceholder('Enter command here!')).toBeVisible();
});

/** testingt that complex interactions such as, loading incorrectly first, then
 * loading a invalid file, then loading correctly, then loading with no args,
 * then loading an invalid file, still maintains the initially well loaded file
 * DESIGN DECISION: We decided to unload the file if a new file is loaded
 * Point out that the given data is not representative of former command
*/

test('long loadtest', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Sign Out').click();
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_fille');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <>');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').fill('load_file <nonvalid>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies');
  await page.getByPlaceholder('Enter command here!').dblclick();
  await page.getByPlaceholder('Enter command here!').fill('load_file <moviesmovies.csv');
  await page.getByPlaceholder('Enter command here!').dblclick();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load kldsmflksdf');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <invalidfile>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view_file');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
});
