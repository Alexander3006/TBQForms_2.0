FROM node:12

ARG DIR=TBQForms
RUN mkdir -p ${DIR}
WORKDIR ${DIR}

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]