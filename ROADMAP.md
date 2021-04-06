# RoadMap

## Backend

- Handle backend when Forex market is close. Check the route `http://localhost:3000/isOpen`
- Add swagger the API documentation.
- Use websockets instead of pooling. The 1forge API allows websockets with a licence.
- Get the base currencies exchange rate from the backend. `1 EUR = 1,xxx USD` && `1 USD = 0,8xxx EUR`

## frontend

- Add more currencies exchange rate. Check the route `http://localhost:3000/allCurrenciesPairs` for all available currencies
- Work on the responsive part of the app.

## Interesting libs to add

- add HuskyHooks (https://github.com/typicode/husky).
- add Storybook (https://github.com/storybookjs/storybook).
- add auto changelog norm SemVer (https://github.com/conventional-changelog/standard-version).
- check semantic-release (changeLog) lib
- add lint for scss (https://github.com/stylelint/stylelint).
- why not add immerjs to handle the state tree (https://immerjs.github.io/immer/)
