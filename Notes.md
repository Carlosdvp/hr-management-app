
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
