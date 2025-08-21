FROM node:22

# Set working directory
WORKDIR /src

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .

# Expose port
EXPOSE 3000

# Start React app
CMD ["npm", "start"]
