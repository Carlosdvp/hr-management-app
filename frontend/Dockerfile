# Use Node.js LTS as the base image
FROM node:14 AS builder

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and package-lock.json files to the container
COPY package.json package-lock.json ./

# Install the frontend dependencies
RUN npm install

# Copy the rest of the frontend code to the container
COPY . .

# Build the frontend code
RUN npm run build

# Use a smaller and more efficient base image for the production container
FROM nginx:alpine

# Copy the built frontend code from the previous stage to the nginx server's default directory
COPY --from=builder /frontend/dist /usr/share/nginx/html

# Expose port 80 to allow access to the frontend application
EXPOSE 80

# Start the nginx server when the container is run
CMD ["nginx", "-g", "daemon off;"]
