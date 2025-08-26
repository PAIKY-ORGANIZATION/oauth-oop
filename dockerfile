FROM node:20-bullseye

EXPOSE 3001

WORKDIR /app

COPY package.json .

RUN npm i


COPY . .

RUN npm run build #! Need to have `tsc` installed

CMD ["npm", "run", "start"]