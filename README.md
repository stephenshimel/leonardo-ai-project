# Rick and Morty Character Gallery

This is a Next.js application that displays a gallery of characters from the Rick and Morty TV show. Users can log in to access the pages of characters, view each character's original place by clicking on the card.

## Features

- Character grid display with pagination
- User authentication
- Responsive design
- Error handling for API failures




### Installation

1. Use the correct Node.js version:
   ```
   nvm use
   ```
   This will use the Node.js version specified in the `.nvmrc` file.

2. Install dependencies:
   ```
   yarn install
   ```

3. Run the application locally:
   ```
   yarn dev
   ```


4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Deployment

This application is deployed on Vercel. You can access the live version at:

https://leonardo-ai-project-nihlhmx67-stephenshimels-projects.vercel.app/information

## Usage

1. When you first visit the site, you'll be prompted to log in.
2. Enter your username and job title.
3. After logging in, you'll see a grid of Rick and Morty characters.
4. Use the "Previous" and "Next" buttons at the bottom of the page to navigate through different pages of characters.
5. Click on a character card to view more details about their origin.
6. You can change user information by clicking the "Change User" button in the header.

## Testing


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





