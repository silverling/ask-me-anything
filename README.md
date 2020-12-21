# AskMeAnything
这是一个再简单不过的 node app， 只是因为最近的朋友圈大家都在玩这个，我也来凑凑热闹（大雾）

## Build
```bash
sudo cp ama.conf /etc/nginx/conf.d/
docker-compose up -d
sudo service nginx reload
```

## Usage
Try the following command:
```bash
curl ama.blurfate.com
```