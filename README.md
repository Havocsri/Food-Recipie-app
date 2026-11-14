## PROJECT FOOD RECIPE 
  
  # Recipe Explorer

Recipe Explorer is a food recipe website built with React and Vite. It helps users browse food categories, search recipes, view recipe details, and save favorite dishes.

## Features

- Responsive layout
- Modern hero section
- Recipe-themed landing page
- Search bar and category navigation
- Food image carousel
- Clean styling using Tailwind CSS


## Pages and Navigation

- The Home page has a welcome section and food categories.
- The Categories page shows food categories from TheMealDB.
- Use the navigation bar to move between Home and Categories.
- React Router handles page navigation.

## Recent Updates

- Added React Router to the project.
- Added Home and Categories routes.
- Added links for Home and Categories in the navigation bar.
- Added a Categories page that loads category information from TheMealDB.
- Added Beef, Chicken, Dessert, and Vegetarian cards to the Home page.
- Updated the text on the Categories page.
n
## RECENT UPDATE 
## Features

- Browse food categories.
- Select a category to see its recipes.
- Select a recipe to view its details.

## API

Recipe data is provided by [TheMealDB](https://www.themealdb.com/api.php).

## Recipe Details

Click a recipe to view its details, including ingredients and cooking instructions. Recipe information is provided by TheMealDB API.


### Favorites

- Click the heart icon to add or remove a recipe from favorites.
- A filled red heart means the recipe is favorited; an outline heart means it is not.
- Clicking the heart does not open the recipe details page.

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- React Icons
- TheMealDB API

## Project Overview

This app lets users:

- Explore different food categories
- Search recipes by keyword
- View recipe images and details
- Read ingredients and cooking steps
- Save favorite recipes

## Pages

- Home page
- Categories page
- Search page
- Recipe details page
- Favorites page

## Loading State

The app uses a loading state while fetching data from TheMealDB API.  
A spinner is shown until the data is ready, so the user knows the page is still loading.

## Installation

1. Open the project folder
2. Install dependencies:

```bash
npm install
```

3. Run the app:

```bash
npm run dev
```

4. Open the local website in your browser

## Usage

- Open the Home page
- Click a category
- Select a recipe
- View ingredients and instructions
- Add recipes to favorites

## Developer Notes

This project is created for learning React, routing, API integration, and UI design.
