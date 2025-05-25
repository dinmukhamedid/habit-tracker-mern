# base image
FROM node:18

# жұмыс директориясы
WORKDIR /app

# package.json және package-lock.json көшіру (lock файлы болса)
COPY package*.json ./

# тәуелділіктер орнату
RUN npm ci

# код көшіру
COPY . .

# порт ашу
EXPOSE 3000

# қосу
CMD ["npm", "run", "dev"]
