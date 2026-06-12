FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=5173
ENV ODDS_CACHE_FILE=/app/data/odds-cache.json

COPY --chown=node:node package.json server.js ./
COPY --chown=node:node public ./public

RUN mkdir -p /app/data && chown -R node:node /app/data

USER node

EXPOSE 5173

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD ["node", "-e", "const port=process.env.PORT||5173;fetch('http://127.0.0.1:'+port+'/').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"]

CMD ["node", "server.js"]
