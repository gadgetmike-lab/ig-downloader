FROM python:3.11-slim

# Install system deps + Node.js + ffmpeg
RUN apt-get update && apt-get install -y curl ffmpeg ca-certificates \
  && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
  && apt-get install -y nodejs \
  && rm -rf /var/lib/apt/lists/*

# Install yt-dlp
RUN pip install --no-cache-dir yt-dlp

WORKDIR /app

# Install Node deps
COPY package.json ./
RUN npm install

# Copy app files
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
