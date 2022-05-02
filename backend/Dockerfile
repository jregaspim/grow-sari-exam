FROM node:grow-sari-exam
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "run devStart"]
CMD ["npm", "run devAuthStart"]