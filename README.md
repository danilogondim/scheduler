# Interview Scheduler

Interview Scheduler is a React application that allows users to book and cancel interviews.

This project was developed as part of Lighthouse Labs' Web Development Bootcamp program, and it is focused on building and testing a React application.

Interview Scheduler makes use of Storybook, Jest and Cypress to test components. The application was tested using unit, integration and end-to-end testing.

## Final Product

### Manual Navigation
!["Manual navigation"](https://github.com/danilogondim/scheduler/blob/master/docs/manual-navigation.gif?raw=true)

### Cypress end-to-end test
!["Cypress end-to-end test"](https://github.com/danilogondim/scheduler/blob/master/docs/cypress-test.gif?raw=true)


## Setup

1. Fork [the Interview Scheduler API repository](https://github.com/danilogondim/scheduler-api), then clone your fork of the repository and follow the repository's README.md instructions to set up the API server.
2. Fork this repository, then clone your fork of this repository in a different folder.
3. Install dependencies using the `npm install` command.
4. Run the API server.
5. Run the development web server using the `npm start` command.


## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Running Cypress Test Framework

Before running Cypress, make sure to run the API server in test mode by typing the following command in the server directory:

```sh
npm run test:server
```

After running the server in test mode:

```sh
npm run cypress
```

## Dependencies

- React
- Storybook
- Jest
- Cypress
- Axios
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- react-test-renderer
- prop-types
- classnames
