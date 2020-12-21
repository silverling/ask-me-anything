FROM node:latest

WORKDIR /app/
ENV AMA_TOKEN=p@ssW0rd

COPY . .
RUN npm install
EXPOSE 8080
CMD ["node", "src/main.js"]



