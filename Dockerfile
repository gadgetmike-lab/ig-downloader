FROM python:3.11-slim

RUN apt-get update && apt-get install -y ffmpeg curl
RUN pip install yt-dlp

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

CMD ["node", "index.js"]
