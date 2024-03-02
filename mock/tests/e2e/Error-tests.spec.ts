import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // load page without errors
  await page.goto('http://localhost:8000/');  
  // login to the page
  await page.getByLabel('Login').click();
});

test('viewing without loading', async ({ page }) => {
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  // Submit command
  await page.getByRole('button', { name: 'Submit' }).click();
  // Check error message being displayed
  await expect(page.getByText('Error: unable to view; no')).toBeVisible();
});


test('searching without loading', async ({ page }) => {
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <movies.csv> 1 1');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Error: unable to search; no')).toBeVisible();

});

test('loading invalid file path', async ({ page }) => {
  await page.fill('input[aria-label="Command input"]', 'load_file <invalid/path>');
  // Submit the command
  await page.click('button:has-text("Submit")');
  // Check error message being displayed
  const errorMessage = await page.textContent('.repl-history');
  expect(errorMessage).toContain('Error: unable to load file; invalid file path.');
});

test('loading file outside protected directory', async ({ page }) => {
    await page.fill('input[aria-label="Command input"]', 'load_file <../invalid/path>');
    // Submit the command
    await page.click('button:has-text("Submit")');
    // Check error message being displayed
    const errorMessage = await page.textContent('.repl-history');
    expect(errorMessage).toContain('Error: invalid load; unable to go outside protected directory');
    });

test('test subsequent invalid file after loading retention', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <invalid>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  //await page.getByText('Movie titleDirectorYearIMDBSocial NetworkDavid Fincher20107.8Eternal Sunshine').click();
  //await page.getByRole('cell', { name: 'Error: unable to view; no' }).click();
});
test('test loading an empty csv', async ({ page }) => {
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <empty.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Error: unable to load file;')).toBeVisible();
})

//searching for a column that is beyond the index
test('Searching by column num outside bounds', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('group', { name: 'Enter a command:' }).click();  
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('search <2000> <2004>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('File successfully loaded.')).toBeVisible();
});

test('Searching with a lowercase', async ({ page }) => {
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('group', { name: 'Enter a command:' }).click();
  await page.getByPlaceholder('Enter command here!').fill('search <Director> <aaron sorkin>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('No search found')).toBeVisible();
});