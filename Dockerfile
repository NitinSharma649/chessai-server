FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY yarn.lock ./

RUN npm install --production
RUN NODE_OPTIONS=--max-old-space-size=8192 yarn build
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080

# Default env file
ENV ENV_FILE=config/.env.prod

# Run this app when a container is launched
CMD [ "node", "-r", "tsconfig-paths/register", "bin/app.js" ]
