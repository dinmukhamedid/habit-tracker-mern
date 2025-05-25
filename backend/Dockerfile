# base image
FROM node:18

# app папкасын жасау
WORKDIR /app

# package.json көшіру
COPY package*.json ./

# тәуелділіктерді орнату
RUN npm install

# бүкіл кодты көшіру
COPY . .

# серверді тыңдату
EXPOSE 5000

# серверді қосу
CMD ["npm", "run", "dev"]
