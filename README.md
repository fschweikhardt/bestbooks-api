# Best Books API

This is the backend for the Best Books app!

https://bestbooks-app.vercel.app/

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

Best Books is an app created to give you a book recommendation from an award winning book list.

The backend includes express endpoints, bearer validation, error handeling, and logging.

## Technology Used

This is a fullstack app using React, CSS, Node, Express, and PostgreSQL.

## ENDPOINTS

The primary function of the backend is to listen to the endpoint requests of the client, to retirve the relevant book data from the database, and to send the data back to the client.  

/get-awards - retrieves all of the award lists from the database

/get-years - retrieves all of the years there was an award issued 

/award-list - gets all of the data from a specific award list

/year-list - gets all of the books from a specific year

/specific-book - gets a books from a specific award list and year

/random-book - picks a random book from the database

## Scripts

Start the application `npm start`

Start nodemon for the application `npm run dev`

Run the tests `npm test`

## Deploying

Backend was deployed to Heroku.
When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's main branch.