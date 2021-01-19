
# Shoppies 2021

This is my submission for the UX Developer Intern & Web Developer Intern Challenge
for Summer 2021. The demo is hosted on Heroku and is available [here](https://shopify-challenge-2021.herokuapp.com/). The site may time out due to Heroku's allocation of memory and uncaching of inactive apps. In this case, refreshing the page will often resolve this issue.

## What is this?

Shopify has recently branched out in the movie award shows business, and this app
allows users to create their own set of 5 movies from the OMDB as their nominations.
This interface allows users to search the database and then add/remove nominations through an intuitive UI.

See [here](https://docs.google.com/document/d/1AZO0BZwn1Aogj4f3PDNe1mhq8pKsXZxtrG--EIbP_-w/edit#) for the challenge description.

## Technologies
This application uses the following technologies. Check out the [package.json](https://github.com/bqin01/shopify-challenge-2021/blob/master/package.json) file for more details on dependencies.

 - React (create-react-app and Yarn)
 - Bootstrap 4

## Features

### Key Features

 - Search for movies through OMDB's API, returning and displaying helpful messages on bad queries
 - View details of each movie in a modal, such as director, plot, and other nominations
 - Add/remove nominations inside the details modal and outside of it.
 - Uses cookies to save users' nominations and creates a modal on load giving users the option to continue where they left off or start anew
 - Changes nominations section upon reaching 5 (max) nominations

### Subtle Features/Development Choices

- Searches happen automatically when the search query changes. To avoid overloading the OMBD API (especially with the daily limit), there is a buffer time of 0.5 seconds when the search query changes so as to not make calls to the API whilst typing.
- The API key is stored as an environment variable and is excluded from the repository
- Details modal is loaded ahead of the asynchronous calls to the API with a spinner in place until the promise is fulfilled

### To-dos/Other Potential Features

- The changing of the "olympics" style of nomination display to list style for smaller devices through the @media rule
- The ability to share nominations with others through a query string on the URL
- Aria labels and other modern accessibility features
