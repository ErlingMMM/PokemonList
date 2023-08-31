# Assignment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.



## Developer notes
-----------------------------------------------

## Install: 
Install node
Clone reposotory
Run <NPM i> in the console (command prompt in windows) 
Run app first entering cd <selected-folder-name> and than run <ng serve -o>
Go to http://localhost:4200/ in the browser. 


## Functionality: 
When entering the page, the user needs to enter user credentials. Without doing so, only the login page is presented. When logged in, the login page is not presented. USers may log out. When login for the first time with a new username (trainer name), the username is saved in the API. 
When the user login, the user gets redirected to the main page; the pokemon catalouge. 
In the main page, you can see all pokemons in a list with its image and name. You can go next/previous page to load 50 more pokemons. 
You can catch the pokemons by clicking the button for the given pokemon. 
Doing so, the item in the css container will turn from green to red and the pokemon and its image url would be saved in the API as a pokemon catched by the given trainer logged in the session. 

In the trainer page, the capchured pokemons saved in the API for the given logged in user, is displayed with its correct image and name. 
There is a button you can push to relase the pokemon. Doing so would make the pokemon disapair on the trainer page, and it is removed from the list of pokemons for the given trainer.  
