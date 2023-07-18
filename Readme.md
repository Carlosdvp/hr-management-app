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
