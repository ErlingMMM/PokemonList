

# assignment3

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development Server

1. Run `ng serve` for a development server.
2. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code Scaffolding

- Run `ng generate component component-name` to generate a new component.
- You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running Unit Tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running End-to-End Tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further Help

To get more help on the Angular CLI, use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

## Developer Notes

### Install

1. Install Node.js.
2. Clone the repository.
3. Run `npm install` in the console (command prompt in Windows).
4. Run the app by navigating to the project folder with `cd <selected-folder-name>` and then running `ng serve -o`.
5. Visit [http://localhost:4200/](http://localhost:4200/) in your web browser.

### Functionality

- Upon entering the page, users must enter their credentials. Without doing so, only the login page is presented. Once logged in, the login page is no longer shown. Users can also log out.
- When a user logs in for the first time with a new username (trainer name), the username is saved in the API.
- After logging in, users are redirected to the main page, which is the Pokémon catalog.
- In the main page, users can view a list of all Pokémon with their images and names. Users can navigate between pages to load 50 more Pokémon.
- Users can capture Pokémon by clicking the button for a specific Pokémon. When they do, the corresponding item in the CSS container changes from green to red, and the Pokémon's name and image URL are saved in the API as caught by the logged-in trainer.
- In the trainer page, captured Pokémon saved in the API for the logged-in user are displayed with their correct images and names.
- There is a button to release Pokémon. Clicking it removes the Pokémon from the trainer's list, causing it to disappear from the trainer page and be removed from the list of Pokémon for the given trainer.

