# Project Details

**Project name**: The amazing front-end \
**Team members and contributions:** Domingo Viesca (dviesca) and Annika Singh (asing122)\
**Estimated time it took to complete project**: 22 hours
**Link to repo**: https://github.com/cs0320-s24/mock-asing122-dviesca

# Design Choices
## Relationships between classes/interfaces:
    This is a react application that serves as a frontent for a website that
    runs CSV operations. The main REPL occurs in the App component which 
    takes care of rendering what the front facing user sees such as loginButton
    and REPL. The component is the only thing that the user initially sees
    but upon being pressed more functionality goes to repl interface
    as more components are rendered and states change such as the program
    being run in brief/Verbose or whether some file is already loaded. The 
    repl also thus takes care of replInput and repl history which are the 
    components that appear post login and as commands are entered. The
    replHistory is re-rendered a lot as it keeps track of past command results
    and many times will render a lot of new components such as a table in the 
    the case of ViewCSV being called. 
    FunctinsMap is one of the central components that exists soley to 
    take in a string from input and return corresponding command components in
    the default package like loadCSV SearchCSV, ViewCSV etc.

    Particular choices: We chose to make search case sensitive, as many cases
    such as hashes/usernames/passwords are often case sensitive and thus it is
    most flexible/safe to assume the user is being as well.



## Data structures used, why you created it, and other high level explanations:
    We used a map that goes from a command string to a data structure that 
    represents command. This is so that a developer can easily add new 
    functionality more easily as opposed to having to understand and traverse
    a very long if else or switch statment. This also imroves runtime. 

# Errors/Bugs
## Reproduction steps: 
    {N/A}

# Tests
## Testing Suites:
    CSV-Shape-Tests.spec.ts: What this testfile focuses on is testing CSV's
    of many different shapes, such as very long, very wide, one dimensonal,
    empty etc.
    Error-tests.spec.ts: this test suite is aimed at making sure that the 
    site adequatley responds to invalid input, such as invalid files, invalid
    commands, misuse of commands (such as not loading and searching) and so on
    Route-tests.spec.ts: this test file focuses on longer and more routine 
    use of the site and that functionality is preserved as many different
    functionalities are mixed and matched

## How they are comprehensive:
    These testing suites are comprehensive as they interact with all components
    in multiple manners, intensities, and orders. This mimics how a large 
    pool of users, which includes naive users, might interact with the page.
    We used a lot of different data such as mocked CSV's and complex commands.

# How to
## Build and run program:
    Make sure everything installed (in terminal run): npm install
    Start the server (in terminal): npm start
    Open: go to the localhost server http page that is returned on terminal
    Sign in: click the sign in button
    Enter commands: click on the command box and enter one of the following 
    commands: "load_file <filename>", "view", "search <item> <header>"

## Run tests
    Start the server (in terminal): npm start
    Open test UI (in other therminal): npx playwright test --ui
    Run tests (in test UI): click on the green run test button

# Collaboration
Domingo: While I was sick I asked my former partner Zach Stellato (Zstellat)
for help in conceptual / technical understanding of how to run test such as
what the headers were and how the test/playwright UI was opened and used for 
effcicient testing