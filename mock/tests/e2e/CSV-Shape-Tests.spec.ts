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


  test('test single col on verbose', async ({ page }) => { 

})
