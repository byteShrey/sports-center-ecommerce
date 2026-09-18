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

## Run the API

```bash
./mvnw spring-boot:run
```

API base: `http://localhost:8081`

On first startup the app seeds sample brands, types, and products when the catalog is empty.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Paged catalog; filter by `brandId`, `typeId`, `keyword`, sort by `name` or `price` |
| `GET` | `/api/products/{id}` | Single product |
| `GET` | `/api/brands` | All brands (sorted by name) |
| `GET` | `/api/types` | All product types (sorted by name) |

CORS is enabled for the React Vite (`5173`) and CRA (`3000`) local origins.

## Status

Catalog APIs, seed data, and CORS are ready. Next: shopping basket with Redis.
