# Sports Center

Full-stack sports e-commerce app built with Spring Boot and React.

## Goals

- Browse a product catalog (brands, types, search, pagination)
- Add items to a shopping basket (Redis)
- Place orders with a shipping address
- Secure checkout with JWT authentication

## Stack

- **Backend:** Java 17, Spring Boot 3.2, Spring Data JPA, Spring Security, JWT
- **Frontend:** React 18, TypeScript, Vite, Redux Toolkit, Material UI
- **Data:** MySQL + Redis
- **Tooling:** Maven, Docker Compose

## Local infrastructure

```bash
cd docker
docker compose up -d
```

MySQL: `localhost:3306` (db `sports_center`, user `root` / `password`)  
Redis: `localhost:6379`

> Docker Desktop is required for the compose file. Install it before starting databases.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Paged catalog; filter by `brandId`, `typeId`, `keyword`, sort by `name` or `price` |
| `GET` | `/api/products/{id}` | Single product |

## Status

Catalog read API is in place. Brand and type endpoints, seed data, and the basket are next.
