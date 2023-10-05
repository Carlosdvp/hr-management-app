
# Full Stack Application - HR Management App

## Tech Stack

### Front end - Vue

- Vue.js
- Vuex or 
- Vue Router
- TailwindCSS
- Vuetify
- Typescript
- Prisma ORM

### Backend - Node

- Node.js
- Express
- Nest.js (maybe)
- mySql 

### Deployment

- Railway.app
- Render.com
- Vercel
- Netlify
- Planetscale

Choose the most appropriate option from this list, keep in mind we need to host a DB, the api and the UI.

Came across a weird Prisma bug, for some reason when running this command: npm run db:migrate [npx prisma migrate dev] I get an error: error: Environment variable not found: DATABASE_URL.

Strangely enough the env variable is accessible by the rest of the application and the app itself works perfectly fine. Even the following prisma commands are ok:

    - npx prisma valida
    - npx prisma format
    - npx prisma studio

This command also works as it should: `npx prisma migrate dev --schema=./prisma/schema.prisma`

So, to overcome this bug I will edit the npm run db:migrate command in the package.json file.


------------------------------------------------------------------------------------------------------------


## Steps

## Phase I

1. Begin with the API
    - implement CRUD operations for a single user
    - add the necessary endpoints
    - create a DB interface using Prima
    - create a bare bones DB with 4 or 5 columns for the most basic user data (name, position, email, hire date)
    - test
    - once API is up and running move to the next step

2. Create the base structure for the UI
    - define number of Views
    - add homepage, login/registration page, user details page
    - add navigation and routing with route guards
    - connect UI to api and DB
    - implement basic authentication

At this point the following should be in place:

- a working api that support basic CRUD operations on the DB
- a UI with authentication where a user can login or register and then view the homepage and the user details page
- from the user details page the user should be able to:
    - edit user details
    - change password
    - delete account


## Phase II

3. Add authorization to the application
    - define roles: admin and user
    - admin can perform crud operations on any account
    - user can only perform crud operation on his/her account

4. Create additional views
    - Admin page > it should list the entire users table from the DB

5. Add more Tables to the DB and more columns to existing Tables


------------------------------------------------------------------------------

# The Steps

# HR Management App

## Full Stack Application

## Backend

- mySQL database
- docker
- Prisma
- Node.js
- Express
- TypeScript


## Front End

- Vue
- Vuex or Pinia
- Typescript
- TailwindCSS
- Vue Router
- Vuetify (optional)
- Stytch (authentication)


-------------------------------------------------------------------

## Overview

1. Create the API with basic CRUD operations and corresponding endpoints
2. Create a docker container for a MySQL DB
3. Run Prisma migration to create new DB add first Table
4. Use API to add some mock users

5. Create a Vite project using Vue and TS
6. Add TailwindCSS, vue-router, path alias (@), vue typings
7. Connect UI with the API

8. Dashboard View
    - Move diferent sections into separate components [Navbar, SearchBar, Sidebar, UserTable, UserMenuDropdown]
    - Work on UserTable component
    - Fix the SearchBar component's styles
9. Home view -- Login / Registration
    - create the Login component and registration view

10. On the BE add the authRoutes and controllers
    - test the Registration endpoint and add a user to the DB (this is done)
    - test the remaining endpoints with postman, make sure they refer to the data in the db
        - /login
        - /authenticate
        - /logout

11. Add the following features
    - an AddUser button and Form
    - the From will include the details needed to create a user
    - it will use the /register endpoint
    - it will have a button to add a user and one to cancel and exit the form

12. Profile page component
    - add the fields and their labels
    - this will be all the data points that might be used down the line
    - username should list the first and last names of the logged in user
    - the email should be the logged in user's email
    - same for the mobile number and the create and last modified elements
    - fields in the profile form should be pre-populated if the respective data is present in the databse

13. Before moving ahead, we need to add Pinia to handle the application's state
    - install Pinia
    - create the Users store
    - add the actions we need
    - update the Login component and the logout functionality
    - update the registration component as well.

14. Continue work on the Profile page
    - replace the UserName placeholder in the UserMenuDropdown with the logged in user's name
    - replace placeholder data in the profile page header
    - pre-populate the profile information with the available data for the logged in user

15. Hash password on Registration
    - saved password hash in database
    - use bcrypt to handle this task
    - endpoint to edit/update: /login and /register

16. Add the Settings Page
    - user should be able to reset password 
    - user should be able to change email
    - it should have an 'update' button that makes an api call

Side Quest 1
    - stytch is causing too many hard to debug issues so I am removing it for now

17. Add Delete button to use the delete user endpoint
    - each user should have a checkbox
    - you need to supply an email in the params to delete a user
    - now we an delete one user or multiple users
    - User Table is refreshed each time a suer is deleted to display the updated list of users
    - user is also delete from the database and removed from the users store

18. Add a Logout button to the Home page
    - it should be displayed when loggedInUser is true
    - when clicked the user is logged out and redirected to the Login page

19. Refactor
    - create a utils folder and a new auth.ts file
    - move the logout function there
    - import the logout method in the components that are currently using it.
    - replace alerts with html messages in the components that are using alert popups to deliver error messages.

20. Dockerize the application
    - create a Dockerfile for the mySql container
    - dockerize the api
    - dockerize the frontend
    - create a docker-compose file for the entire application

21. UI Improvement > AddUser side panel behavior
    - also > fix bug: creation of an empty user
    - delete users by id instead of by email
    - add form validation on the frontend



** Make a short video showing the app's features, explaining how some difficulties were solved. Add the video to my portfolio page. **
    - the Readme should have two sets of clear instructions on how to install and run the application
    - one set without Docker
    - one set with Docker

Then, additional features and improvements can be done little by little. Right now I think I have reached the stage of an MVP for this application.




----------------------------------------------------------------------------------------

## Test Users

capitan@gmail.com
capitanfuturo$11

hercules@gmail.com
hercules$11

diamond@gmail.com
diamond$11

ceasar@gmail.com
julianus99

--------------------------------------------------------------------------------
