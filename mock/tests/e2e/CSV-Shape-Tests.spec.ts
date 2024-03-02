import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
});

test('test regular on verbose', async ({ page }) => { 
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
    await expect(page.getByText('Command: load_file <movies.')).toBeVisible();
    await page.getByText('Output: File successfully').click();
    await expect(page.getByText('Output: File successfully')).toBeVisible();
    await expect(page.getByText('Command: mode verbose')).toBeVisible();
    await expect(page.getByText('Output: Mode switched to')).toBeVisible();
    await expect(page.getByText('Command: view')).toBeVisible();
    await expect(page.getByText('Output:', { exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Movie title' })).toBeVisible();
    await expect(page.getByText('Command: viewOutput:Movie')).toBeVisible();
    await expect(page.getByText('Movie titleDirectorYearIMDBSocial NetworkDavid Fincher20107.8Eternal Sunshine')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Director' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Year' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'IMDB' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Social Network' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'David Fincher' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '2010' })).toBeVisible();
    await expect(page.getByRole('cell', { name: '7.8' }).first()).toBeVisible();
})


  test('test single col verbose', async ({ page }) => { 
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file <oneCol>');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file <oneCol.csv>');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view');
    await expect(page.getByText('File successfully loaded.')).toBeVisible();
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('aabbccdd')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'aa' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'bb' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'cc' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'dd' })).toBeVisible();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode verbose');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('Command: load_file <oneCol.')).toBeVisible();
    await expect(page.getByText('Command: view')).toBeVisible();
    await expect(page.getByText('Output:', { exact: true })).toBeVisible();
})


  test('test single col on search', async ({ page }) => {
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file <oneCol.csv>');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode brief');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('search <aa> <bb>');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('cell', { name: 'bb' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
})

  test('test single col with view and search', async ({ page }) => {
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('load_file <oneCol.csv>');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('mode brief');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('search <aa> <bb>');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByRole('cell', { name: 'bb' })).toBeVisible();
    await expect(page.getByRole('table')).toBeVisible();
    await page.getByPlaceholder('Enter command here!').click();
    await page.getByPlaceholder('Enter command here!').fill('view');
    await page.getByRole('button', { name: 'Submit' }).click();
    await expect(page.getByText('aabbccdd')).toBeVisible();
    await expect(page.getByRole('cell', { name: 'aa' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'bb' }).nth(1)).toBeVisible();
    await expect(page.getByRole('cell', { name: 'cc' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'dd' })).toBeVisible();

})

