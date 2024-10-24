FROM node:20.18.0
WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD [ "node", "dist/src/main.js" ]
#ENV DB_HOST: postgres_db
#ENV APP_ABORT_ON_ERROR: true
#ENV DB_PORT: 5432
#ENV DB_USERNAME: user
#ENV DB_PASSWORD: 11111
#ENV DB_DATABASE_NAME: test
#RUN npm run migration:run