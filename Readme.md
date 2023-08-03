# HR Management App

## Full Stack Application

## Backend

- mySQL database
- Docker
- Prisma
- Node.js
- Express
- TypeScript
- Vite

## Front End

- Vue
- Vue Router
- Pinia
- Typescript
- TailwindCSS
- Vite


------------------------------------------------------------------

# Installating the Application

## Installation Option 1 for local development

In this option we only use a Docker container for the database.

## Backend

### Database

Before we begin, make sure Docker Desktop is up and running.

1. Navigate to the server/db folder
    - edit the environment varialbes you need to change
2. build your mysql image

    `docker build -t my_db .`
3. Once the image is built, you can run a container, replace 'my_db' with a name for your container, add your own root password:

    `docker run -d --name my_db_container -e MYSQL_ROOT_PASSWORD=mysecretpassword -p 3306:3306 my_db`
4. Now your MySql database should be ready in your Docker container.
5. Connect to it with a tool like MySql Workbench or HeidiSql

### API

1. Navigate to the server folder
2. Rename .env.example to .env and update the environment variables as needed
    - if using stytch or auth0 add your credentials
    - otherwise ony add the database connection string and port
3. Navigate to the project's root folder
4. Run `npm install`
5. Run `npm run db:migrate`
6. Run `npm run start:dev`
7. Now the server will be running on the port specified in the .env file

### Frontend

1. Navigate to the frontend folder
2. Run `npm install`
3. Run `npm run dev`
4. The Ui will now be running on the Vite default port: 5173
5. Register a new user to log in
6. Afterwards you can login with the same user, create more users in the dashboard, or register new users on the Login page.

-----------------------------------------------------------------------------------

## Installation Option 2

Make sure Docker Desktop is up and running.

1. Navigate to the root of the project
2. Open the docker-compose file and edit as needed
3. Open a terminal and run this command:
`docker-compose up -d`
4. Check and make sure the three containers are up and running, you can check on the terminal or by looking in the Docker Desktop UI
5. Connect to the database with HeidiMysql or similar tool, make sure it is good to go
6. Navigate to the port specified for the UI and test the application by registering a new user.


------------------------------------------------------------------------------------

## Installation Option 3

Each component of the application ahs it's own Dockerfile, so if you prefer you can run the database and the api in their respective containers and the UI locally, or just the api locally, etc.

