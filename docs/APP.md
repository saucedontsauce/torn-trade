# The app Itself

It's main function is providing a way for members to log in and define a price list for torn.com


## Github Pages
    Used to provide built vite react app

## Firebase + Firestore
    Firebase Auth used to verify users, Firestore used to store user data 

## Google Sheets
    Used as a data cache
### Items
    Tracks torn items

    - 15 minute update from Torn API and map to sheet
    - Endpoint to provide sheet as JSON

### Credits
    Tracks users credits 

    - Hourly fetch my logs and check for payments, add credit to user and map to sheet 
    - Daily fetches users with positive credit balance, decrement, save to db and map to sheet

## Vercel API
    Used as a CDN for the Items endpoint as vercel provides faster spinup times, reducing data wait time by 80%

## TailwindCSS 
    Provides prebuilt CSS classes for easier styling