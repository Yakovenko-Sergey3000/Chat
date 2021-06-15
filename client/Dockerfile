FROM node:latest

RUN mkdir -p /src/app


WORKDIR /src/app

COPY package.json /src/app/
COPY package-lock.json /src/app/

RUN npm install react-scripts@3.4.1 -g --silent
RUN npm install


COPY . /src/app


EXPOSE 3000

CMD ["npm", "start"]


