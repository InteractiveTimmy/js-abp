# js-abp

**This project is currently under development**
*Documentation may not be complete at this time*

## Description
JS-ABP is a JavaScript API boiler plate designed around a common problem I've encountered developing small applications. When developing small, API-centric applications that require CRUD functionality and a RESTful design, a lot of project time is consumed writing the views for users to interact with. This project branched off from the idea of simplifying this process.

### How It Works
JS-ABP is primarily an interaction layer between two or more middlewares. Once a `dataMiddleware` and `connectMiddleware` is loaded into an `Instance`, the application will use the `connectMiddleware` as an interface to perform CRUD operations via the `dataMiddleware`.

### Currently Supplied Middlewares

#### DataMiddlewares
 * **Instance** - Stores data in NodeJS's runtime memory

#### ConnectMiddlewares
 * **ExpressConnector** - Configures an `http.Server` via ExpressJS

## Installation
JS-ABP is pre-built as a *Typescript* library. After cloning the repository, you may begin modifying any content in the `/src/` directory as you see fit.

## Usage

### Building
At this time, there are two steps needed to build the project into a state that is usable via NodeJS. First, the command `npm run typescript` will build the *Typescript* files in the `/src/` folder into the `/dist/` folder as **.js** *ES6* files and **.d.ts** *Typescript Declaration* files.

### Running
To run the fully built project, simply run `npm start`. This will run the file located at `/index.js`.

### API

*Section is currently under development*

 * **Instance(DataMiddleware, ConnectMiddleware): Instance** - Class that is used to handle the middleware, requires
 * **Structure(name: string, ...keys: string[])** - Class that defines a structure. Middleware utilizes the information generated here

 Middleware is currently located under the following namespace: `Instance.middleware.${data || connect}.${middleware}`
