FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
# Cambia 'start' por el comando que uses para levantar tu API (ej. 'dev')
CMD ["npx","tsx", "src/index.ts"]