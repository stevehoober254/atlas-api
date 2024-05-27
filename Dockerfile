# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Create a volume to persist your application code
VOLUME /app

# Copy your application code
COPY . .

# Expose port for the Express app (change if needed)
EXPOSE 3000


# Start the application using the command in your package.json (replace if needed)
CMD [ "npm", "start" ]
