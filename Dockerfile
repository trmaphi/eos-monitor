FROM node:12 AS builder
WORKDIR /usr/src/eos-monitor
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12 as development
WORKDIR /usr/src/eos-monitor
COPY --from=builder /usr/src/eos-monitor/ .
CMD [ "npm", "run", "start" ]


FROM node:12 AS production
WORKDIR /usr/src/eos-monitor
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /usr/src/eos-monitor/dist ./dist
CMD [ "npm", "run", "start:prod" ]