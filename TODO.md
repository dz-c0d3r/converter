# TODO

## Backend

- Generate a random rate when the forex market is close or quota overrun.

## Bug to fix

- Handle failure backend response.
- Fix tooltip information display.
- A better handle for the amount input state.
- Custom display on mat-slider value.
- Handle the "s" plural of currencies label when value > 1.
- Is it correct what I did on Exchange Rate with Variation ?
- Fix `yarn test` to run unit tests
- Display the datetime of last http request to backend as last update or keep the timestamp from the API for the last rate change datetime ?

## task to do

- Add unit test for states, services and containers.
- Add e2e test.
- Add a global store the app.
- Make css transition to display change of currency rate.

## Code clean

- Split app.component.html content to a presentational components.
- Split converter.component.html content to a presentational components.
- Use a state validators to handle amount input instead of style set.
- Handle currencies label, code and symbol on state instead of unreadable condition on html templates.
- Remove the static Text from HTML by adding in a text reducer or why not use an internationalization lib?
