# Rick and Morty Character Gallery

This is a Next.js application that displays a gallery of characters from the Rick and Morty TV show. Users can log in to access the pages of characters, view each character's original place by clicking on the card.

### Installation

1. Install the correct Node.js version specified in the `.nvmrc` file
   ```
   nvm install
   ```
   Switch to the node version specified in the `.nvmrc` file:
   ```
   nvm use
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Run the application locally:
   ```
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.


## Project Structure

This project follows a modular and component-based architecture. The main application logic is located in the `pages` directory, with the primary page being `information.tsx`. Components are organized in the `src/component` directory, separated by functionality (e.g., Header, Footer, CharacterGrid).

Utility functions are stored in `src/util`. The project uses GraphQL for data fetching, with Apollo Client as the GraphQL client. Styling is managed using Chakra UI, providing a consistent and responsive design throughout the application.

The codebase is written in TypeScript, ensuring type safety and improved developer experience.

## Testing Coverage

Testing is a crucial aspect of this project, ensuring robust code quality and functionality. We have implemented comprehensive test coverage:

- Unit Tests: All components have corresponding unit tests, thoroughly checking their individual functionalities and behaviors.

- End-to-End Tests: A thorough suite of Cypress E2E tests has been implemented, covering critical user flows and interactions within the application. These tests ensure that all parts of the application work together as expected in real-world scenarios.

This extensive testing strategy helps maintain code reliability and facilitates easier refactoring and feature additions.


## Cypress Demo

Here's a demonstration of our Cypress E2E tests in action:

![Cypress Demo](cypressDemo.gif)



## Deployment

This application is deployed on Vercel. You can access the live version at:

https://leonardo-ai-project-nihlhmx67-stephenshimels-projects.vercel.app

## Usage

1. When you first visit the site, you'll be prompted to log in.
2. Enter your username and job title.
3. After logging in, the webapp will fetch and display grid of Rick characters.
4. Use the "Previous" and "Next" buttons at the bottom of the page to navigate through different pages of characters.
5. You can also go to another page by manually editing the page parameter in URL.
6. Click on a character card to view more details about their origin.
7. You can change user information by clicking the "Change User" button in the header.
8. You won't lose the user information by refreshing the web page or closing browser. It is stored in localStorage.


## Testing

Before running any tests, always ensure you're using the correct Node.js version by:

```
nvm use
```

Run unit tests by:
```
yarn test
```

Run cypress E2E tests by
```
yarn cypress
```





