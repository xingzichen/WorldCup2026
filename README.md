# World Cup 2026 Schedule Site

世界杯赛程、赛果、出线形势和赔率展示站点。服务端会读取 ESPN 公开接口，并在配置 `THE_ODDS_API_KEY` 后从 The Odds API 拉取赔率。

## 本地运行

```bash
cp .env.example .env.local
npm start
```

默认访问地址是 `http://127.0.0.1:5173`。

## Docker 运行

Docker 镜像不会复制 `.env.local`，赔率 key 通过容器运行时环境变量注入。

```bash
THE_ODDS_API_KEY=你的_the_odds_api_key docker compose up --build
```

访问 `http://localhost:5173`。

如果希望把 Docker 用的变量放在文件里，可以建一个 Compose 默认会读取的 `.env`：

```bash
THE_ODDS_API_KEY=你的_the_odds_api_key
```

然后运行：

```bash
docker compose up --build
```

也可以直接使用 Docker：

```bash
docker build -t worldcup2026 .
docker run --rm -p 5173:5173 -e THE_ODDS_API_KEY=你的_the_odds_api_key -v worldcup2026-odds:/app/data worldcup2026
```

## 赔率相关环境变量

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `THE_ODDS_API_KEY` | 空 | The Odds API key。为空时页面会显示未配置赔率数据源。 |
| `THE_ODDS_API_SPORT_KEY` | `soccer_fifa_world_cup` | The Odds API 的 sport key。 |
| `THE_ODDS_API_BOOKMAKERS` | `williamhill,ladbrokes_uk,bet365` | 逗号分隔的 bookmaker key。 |
| `ODDS_REFRESH_TIMEZONE` | `Asia/Shanghai` | 判断刷新窗口使用的时区。 |
| `ODDS_REFRESH_START_HOUR` | `8` | 刷新开始小时。 |
| `ODDS_REFRESH_END_HOUR` | `20` | 刷新结束小时。 |
| `ODDS_REFRESH_INTERVAL_MS` | `10800000` | 缓存刷新间隔，默认 3 小时。 |
| `ODDS_CACHE_FILE` | `/app/data/odds-cache.json` | Docker 镜像中的缓存文件路径。 |

`.env.local` 只用于本地 `npm start` 开发；Docker 使用 `-e`、`--env-file`、Compose 的 `.env` 或部署平台的环境变量注入。`.env.local` 会被 `.gitignore` 和 `.dockerignore` 忽略，不会提交到仓库，也不会被打进镜像。
