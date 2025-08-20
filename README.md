# 🚧 Development

### hot‑reload, bind mounts, DB exposed , ...

```
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

# 🚀 Production

### immutable images, no host mounts, detached mode, ...

```
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```
