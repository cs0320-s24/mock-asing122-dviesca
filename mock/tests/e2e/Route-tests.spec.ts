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

/**
 * Even through multiple load changes, verbose to verbose, to brief, views
 * and missing arguments, search should still return the same values every time
 * until load is called on a false file and cleared, where search returns 
 * a no file loaded error
 */

test('test long switching between mode and search', async ({ page }) => { 
    await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <Director> <Aaron Sorkin>');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').fill('search <Director> <Aaron sorkin>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('verbose');
  // await page.getByText('File successfully loaded.Enter a command:Submit').click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByText('Command: search <Director> <').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <Director> <Aaron Sorkin>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <Director> <Aaron Sorkin>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <Director> <Aaron Sorkin>');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').fill('search <Director> <Aaron sorkin>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  // await page.getByRole('table').nth(3).click();
  await page.getByRole('table').first().click();
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load(movies.csv');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').press('ArrowRight');
  await page.getByPlaceholder('Enter command here!').fill('');
  // await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <2> <2004>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('test(\'test absolute minimal functionality\', async ({ page }) => {    await page.goto(\'http://localhost:8000/\');     // login to the page   await expect(page.getByLabel(\'Login\')).toBeVisible');
  await page.getByPlaceholder('Enter command here!').click({
    clickCount: 3
  });


  await page.getByPlaceholder('Enter command here!').fill('load');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode x');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Command: modeOutput: Error:')).toBeVisible();
  await expect(page.getByText('Output: Error: invalid mode').first()).toBeVisible();
  await expect(page.getByText('Command: mode x')).toBeVisible();
  await expect(page.getByText('Output: Error: invalid mode').nth(1)).toBeVisible();
  await expect(page.getByText('Command: mode verbose').nth(1)).toBeVisible();
  await expect(page.getByText('Command: view').nth(3)).toBeVisible();
  await expect(page.getByText('Movie titleDirectorYearIMDBSocial NetworkDavid Fincher20107.8Eternal Sunshine').nth(3)).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load xxxxxx');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file xxx');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Output: Error: invalid load;').nth(1)).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Mode switched to brief.').nth(1)).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Movie titleDirectorYearIMDBSocial NetworkDavid Fincher20107.8Eternal Sunshine').nth(4)).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <>');
  await page.getByPlaceholder('Enter command here!').press('ArrowLeft');
  await page.getByPlaceholder('Enter command here!').fill('load_file <a>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  // await expect(page.getByRole('cell', { name: 'Error: unable to view; no' })).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <year> <2023>');
  await page.getByRole('button', { name: 'Submit' }).click();
  // await expect(page.locator('table:nth-child(22)')).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <2> <2024>');
  await page.getByRole('button', { name: 'Submit' }).click();
  // await expect(page.locator('table:nth-child(23)')).toBeVisible();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <Year> <2023>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.locator('table:nth-child(26) > tr > td:nth-child(2)')).toBeVisible();
  await expect(page.locator('table:nth-child(26) > tr > td:nth-child(3)')).toBeVisible();
  await expect(page.locator('table:nth-child(26) > tr > td:nth-child(4)')).toBeVisible();
  await expect(page.locator('table:nth-child(26) > tr > td:nth-child(5)')).toBeVisible();
  await page.getByLabel('Sign Out').click();
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <Year> <2023>');
  await page.getByRole('button', { name: 'Submit' }).click();
  // await expect(page.getByRole('cell', { name: 'Error: unable to search; no' })).toBeVisible();

})
