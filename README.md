# World Cup 2026 Schedule Site

世界杯赛程、赛果、出线形势、球员榜单和赔率展示站点。服务端会读取 ESPN 公开接口，并在配置 `THE_ODDS_API_KEY` 后从 The Odds API 拉取赔率。

## 本地运行

```bash
cp .env.example .env.local
npm start
```

默认访问地址是 `http://127.0.0.1:5173`。

## Docker 部署

Docker 镜像不会复制 `.env.local`，所有配置都通过容器运行时环境变量注入。

当前发布镜像：

```text
giraffee/worldcup2026:4.0
giraffee/worldcup2026:latest
```

推荐固定使用版本号，避免 `latest` 自动变化：

```bash
docker pull giraffee/worldcup2026:4.0
```

### docker run

```bash
docker run -d \
  --name worldcup2026 \
  --restart unless-stopped \
  -p 5173:5173 \
  -e THE_ODDS_API_KEY=你的_the_odds_api_key \
  -v worldcup2026-data:/app/data \
  giraffee/worldcup2026:4.0
```

访问 `http://localhost:5173`。在群晖中，把 `localhost` 换成群晖的 IP 或域名。

### docker compose

使用 Docker Hub 镜像部署：

```yaml
services:
  worldcup2026:
    image: giraffee/worldcup2026:4.0
    container_name: worldcup2026
    ports:
      - "5173:5173"
    environment:
      THE_ODDS_API_KEY: "你的_the_odds_api_key"
    volumes:
      - worldcup-data:/app/data
    restart: unless-stopped

volumes:
  worldcup-data:
```

然后运行：

```bash
docker compose up -d
```

如果要从当前源码本地构建镜像，可以使用仓库里的 `docker-compose.yml`：

```bash
THE_ODDS_API_KEY=你的_the_odds_api_key docker compose up --build -d
```

也可以创建 Compose 默认读取的 `.env` 文件：

```bash
THE_ODDS_API_KEY=你的_the_odds_api_key
```

然后运行：

```bash
docker compose up --build -d
```

## 环境变量

### 必填变量

| 变量 | 说明 |
| --- | --- |
| `THE_ODDS_API_KEY` | The Odds API key。Docker Compose 默认要求配置该变量；如果留空，站点仍可运行赛程、赛果和球员榜单，但赔率页会显示未配置赔率数据源。 |

### 服务变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `HOST` | Docker 镜像中为 `0.0.0.0` | 服务监听地址。容器内应保持 `0.0.0.0`，否则外部可能无法访问。 |
| `PORT` | `5173` | 容器内服务端口。修改后需要同步调整端口映射，例如 `-p 8080:5173` 是宿主机 8080 到容器 5173。 |

### 赔率变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `THE_ODDS_API_SPORT_KEY` | `soccer_fifa_world_cup` | The Odds API 的 sport key。 |
| `THE_ODDS_API_BOOKMAKERS` | `williamhill,ladbrokes_uk,bet365` | 逗号分隔的 bookmaker key。 |
| `ODDS_REFRESH_TIMEZONE` | `Asia/Shanghai` | 判断刷新窗口使用的时区。 |
| `ODDS_REFRESH_START_HOUR` | `8` | 刷新开始小时。 |
| `ODDS_REFRESH_END_HOUR` | `20` | 刷新结束小时。 |
| `ODDS_REFRESH_INTERVAL_MS` | `10800000` | 缓存刷新间隔，默认 3 小时。 |
| `ODDS_CACHE_FILE` | Docker 镜像中为 `/app/data/odds-cache.json` | 赔率缓存文件路径。建议保持默认，并挂载 `/app/data`。 |

### 球员评分缓存变量

高评分榜、低评分榜、关键先生榜、球员效率榜和球员详情使用本站 ESPN 数据评分，仅统计中场和前锋，后卫和门将不进入评分榜。服务端只会为已完赛比赛计算评分；如果发现前序已完赛场次缺失，会自动回拉 ESPN 单场数据补齐，然后写入评分缓存，避免后续请求重复计算。

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `PLAYER_RATINGS_CACHE_FILE` | Docker 镜像中为 `/app/data/player-ratings-cache.json` | 球员评分缓存文件路径。建议保持默认，并挂载 `/app/data`。 |

## 数据持久化

Docker 部署时建议把 `/app/data` 挂载为 volume 或群晖目录；该目录会同时保存赔率缓存和球员评分缓存。

```bash
-v worldcup2026-data:/app/data
```

如果不挂载 `/app/data`，容器删除或重建后缓存会丢失，赔率和球员评分会重新请求/计算。

## 群晖部署提示

在 Container Manager 中创建容器时：

1. 镜像选择 `giraffee/worldcup2026:4.0`。
2. 端口映射建议填 `本地端口 5173` -> `容器端口 5173`。
3. 环境变量至少配置 `THE_ODDS_API_KEY`。
4. 卷映射建议把群晖目录挂载到 `/app/data`，例如 `/volume1/docker/worldcup2026/data` -> `/app/data`。
5. 重启策略选择 `unless-stopped` 或群晖界面里的自动重启。

`.env.local` 只用于本地 `npm start` 开发；Docker 使用 `-e`、`--env-file`、Compose 的 `.env` 或部署平台的环境变量注入。`.env.local` 会被 `.gitignore` 和 `.dockerignore` 忽略，不会提交到仓库，也不会被打进镜像。
