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