# Dockerfile for React Native app
# This is placeholder as React Native apps are typically not containerized for mobile.

FROM node:14
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]