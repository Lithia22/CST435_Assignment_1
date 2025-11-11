FROM node:18-slim
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install --production
COPY . .
# expose port used by gRPC service
EXPOSE 50054
CMD ["node", "server.js"]
