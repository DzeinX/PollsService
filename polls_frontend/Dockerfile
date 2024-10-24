FROM node:20.18.0
WORKDIR /frontend
EXPOSE 5173
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "dev", "--", "--host"]