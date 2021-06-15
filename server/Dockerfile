FROM node:latest

RUN mkdir -p /src/app


WORKDIR /src/app

COPY package.json /src/app/
COPY package-lock.json /src/app/


RUN npm install


COPY . /src/app


EXPOSE 5000
ENV PORT=5000
ENV DB_USER=sergey
ENV DB_PASSWORD=123456
ENV DB_HOST=localhost
ENV DB_PORT=5432
ENV DB_DATABASE=appchat


CMD ["npm", "run", "server"]


