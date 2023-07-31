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

## Auth0 Information

Name:
HR Management App

Domain:
dev-tvr0olbu2jtnq2e1.us.auth0.com

ClientID:
G973zXMjkQtuOV3Snpl2jn1V8nTEJl2v

Client Secret:
Yn1J0VsfJvCiV76psfrnTV0lXNLUcjOWE0LRZqh5exSctYhZLnpDjBB8cXEQi7il



--------------------------------------------------------------------------------

## Upgrades to be considered

### AddUser component

- AddUser > sidebar should have a pop up (not an alert) that notifies user that a new user has been created successfully or not.
- AddUser > clicking outside the form should also close the form
- AddUser > creating a user should not redirect to home page, 
    - it should show the success/fail message to the user
    - it should close the form
    - and it should remain on the same page