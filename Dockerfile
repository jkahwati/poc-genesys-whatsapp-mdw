FROM node:lts-slim
COPY . .

USER root
run apk update && apk upgrade

RUN npm install
#RUN npm run build

USER node

CMD [ "npm", "run", "start" ]
