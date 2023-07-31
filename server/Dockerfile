FROM node:lts

# Set the working directory inside the container
WORKDIR /server

# Copy the package.json and package-lock.json files to the container's working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container's working directory
COPY . .

# Build the TypeScript code
RUN npm run build

# copy the .env file for the required environmental variables
COPY .env ./dist/

# Expose the port that your Express API listens on
EXPOSE 3330

# Start the Express server
CMD ["npm", "start"]
