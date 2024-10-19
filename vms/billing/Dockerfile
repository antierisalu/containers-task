# Use the penultimate stable version of Alpine as the base image
FROM alpine:3.16

# Install Node.js and npm
RUN apk add --no-cache nodejs npm

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE ${BILLING_PORT}

# Command to run the application
CMD ["sh", "-c", "node consumer.js & node server.js & wait"]