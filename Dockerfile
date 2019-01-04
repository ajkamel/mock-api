FROM mhart/alpine-node:10.15.0

# Release version
ENV MOCK_API_RELEASE_VERSION=0.1.0

# Add additional APK packages required
RUN apk add --update --no-cache bash git openssh

# Create app directory
WORKDIR /var/www

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Run npm and install modules
RUN npm install

# Bundle app source
COPY . .

# Expose application port
EXPOSE 3000

# Build application
RUN npm run build

# Run start command
CMD ["npm", "serve"]