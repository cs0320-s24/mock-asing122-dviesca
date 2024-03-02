import { expect, test } from "@playwright/test";


/**
  The general shapes of tests in Playwright Test are:
    1. Navigate to a URL
    2. Interact with the page
    3. Assert something about the page against your expectations
  Look for this pattern in the tests below!
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    // ... you'd put it here.
    // TODO: Is there something we need to do before every test case to avoid repeating code?
  })

/**
 * Don't worry about the "async" yet. We'll cover it in more detail
 * for the next sprint. For now, just think about "await" as something 
 * you put before parts of your test that might take time to run, 
 * like any interaction with the page.
 */
test('on page load, i see a login button', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})

test('on page load, i dont see the input box until login', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command input')).toBeVisible()
})

test('after I type into the input box, its text changes', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command input')).toHaveValue(mock_input)
});

//The following tests assure that main functionality work as expected


//MODE
test('switch to verbose', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Command: mode verbose')).toBeVisible();
  await page.getByText('Output: Mode switched to').click();

});


test('switch to verbose then brief', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Command: mode verbose')).toBeVisible();
  await page.getByText('Output: Mode switched to').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Mode switched to brief.')).toBeVisible();

});

test('switch to brief when already in brief', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode brief');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Mode switched to brief.')).toBeVisible();

});
test('switch to verbose when already in verbose', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Command: mode verbose').first()).toBeVisible();
  await page.getByText('Output: Mode switched to').first().click();
  await page.getByText('Command: mode verbose').nth(1).click();
  await page.getByText('Output: Mode switched to').nth(1).click();
});




//LOAD
test('testing basic load', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  // check that box and fill table are present
  await expect(page.getByPlaceholder('Enter command here!')).toBeVisible();
  await page.getByRole('group', { name: 'Enter a command:' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  // enter a valid load command and file
  await page.getByPlaceholder('Enter command here!').fill('load_file <movies.csv>');
  // expect submit button to be visible
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();
  // expect file loaded success message to be visible
  await expect(page.getByText('File successfully loaded.')).toBeVisible();
  // expect text to go back to enter command here
  await page.getByPlaceholder('Enter command here!').click();

});

test('switch to verbose post load', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  await page.getByRole('group', { name: 'Enter a command:' }).click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <tv.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Command: load_file <tv.csv>')).toBeVisible();
  await page.getByText('Output: File successfully').click();
  await page.getByText('Command: mode verbose').click();
  await page.getByText('Output: Mode switched to').click();
});


//VIEW
test('load with subsequent view', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <tv.csv>');
  await page.getByPlaceholder('Enter command here!').press('Enter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await expect(page.getByText('File successfully loaded.')).toBeVisible();
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('File successfully loaded.')).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();
  await expect(page.getByRole('cell', { name: 'TV show' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Year started' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Year ended' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Veep' })).toBeVisible();
  await page.getByRole('cell', { name: '2012' }).click();
  await page.getByRole('cell', { name: '2019' }).click();
  await page.getByRole('cell', { name: 'Succession' }).click();
  await page.getByRole('cell', { name: '2018' }).click();
  await page.getByRole('cell', { name: '2023' }).first().click();
  await page.getByRole('cell', { name: 'Diplomat' }).click();
  await page.getByRole('cell', { name: '2023' }).nth(1).click();
  await expect(page.getByRole('cell', { name: '2012' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2019' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Succession' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2018' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2023' }).first()).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Diplomat' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2023' }).nth(1)).toBeVisible();
  await expect(page.getByRole('cell', { name: '-' })).toBeVisible();
});

//View Verbose
test('view when in verbose', async ({ page }) => {
  await page.goto('http://localhost:8000/');  
  await page.getByLabel('Login').click();
  await page.getByRole('group', { name: 'Enter a command:' }).click();
  await page.getByPlaceholder('Enter command here!').fill('load_file <tv.csv>');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('mode verbose');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Command: load_file <tv.csv>')).toBeVisible();
  await page.getByText('Output: File successfully').click();
  await page.getByText('Command: mode verbose').click();
  await page.getByText('Output: Mode switched to').click();
  await page.getByPlaceholder('Enter command here!').click();
  await page.getByPlaceholder('Enter command here!').fill('view');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Command: view')).toBeVisible();
  await expect(page.getByText('Output:', { exact: true })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'TV show' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Seinfeld' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Veep' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Succession' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Year started' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1989' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2012' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2018' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Year ended' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '1998' })).toBeVisible();
  await expect(page.getByRole('cell', { name: '2023' }).first()).toBeVisible();
  await expect(page.getByText('Output:', { exact: true })).toBeVisible();
  await expect(page.getByRole('table')).toBeVisible();

});



// //SEARCHCSV
// //TODO:
// test('TODO0', async ({ page }) => {
// });


// //SEARCHCSVBYCOLNAME
// //TODO:
// test('TODO1', async ({ page }) => {
// });

// //SEARCHCSVBYCOLINDEX
// //TODO:
// test('TODO2', async ({ page }) => {
// });



// //TODO:
// test('TODO3', async ({ page }) => {
// });
