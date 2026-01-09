# Yoosh Deployment Guide

## 1) Install dependencies
```bash
cd yoosh-api
npm install
```

## 2) Set the DeepSeek API key
```bash
cd yoosh-api
cp .env.example .env
```
Edit `.env` and set:
```
DEEPSEEK_API_KEY=your_real_key_here
PORT=5055
DEEPSEEK_MAX_TOKENS=512
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=20
```

## 3) Run with pm2 (preferred) or systemd

### pm2
```bash
cd yoosh-api
npm install -g pm2
pm2 start server.js --name yoosh-api
pm2 save
pm2 startup
```

### systemd
Create `/etc/systemd/system/yoosh-api.service`:
```
[Unit]
Description=Yoosh API
After=network.target

[Service]
Type=simple
WorkingDirectory=/path/to/your/repo/yoosh-api
EnvironmentFile=/path/to/your/repo/yoosh-api/.env
ExecStart=/usr/bin/node /path/to/your/repo/yoosh-api/server.js
Restart=on-failure
User=www-data

[Install]
WantedBy=multi-user.target
```
Then run:
```bash
sudo systemctl daemon-reload
sudo systemctl enable yoosh-api
sudo systemctl start yoosh-api
```

## 4) Nginx proxy snippet
```
location /api/yoosh/ {
  proxy_pass http://127.0.0.1:5055/api/yoosh/;
  proxy_http_version 1.1;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## 5) Frontend usage
The React app should call the same-domain endpoint:
```
/api/yoosh/chat
```
