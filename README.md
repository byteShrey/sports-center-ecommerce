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

## Run the React client

```bash
cd client
npm install
npm run dev
```

Client: `http://localhost:5173` — the Vite dev server proxies `/api` to the backend on port `8081`.

Pages:

- **Catalog** — search, brand/type filters, sorting, pagination, product details
- **Basket** — add items, change quantities, remove items; the basket id is kept in `localStorage` so the cart survives reloads
- **Sign in** — JWT login with the demo account; the token is attached to API calls automatically
- **Checkout** — shipping address form and order summary (sign-in required)
- **My orders** — order history and order details (sign-in required)

Delivery is free for orders of ₹5,000 or more, otherwise ₹150.

## API

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Paged catalog; filter by `brandId`, `typeId`, `keyword`, sort by `name` or `price` |
| `GET` | `/api/products/{id}` | Single product |
| `GET` | `/api/brands` | All brands (sorted by name) |
| `GET` | `/api/types` | All product types (sorted by name) |
| `GET` | `/api/baskets/{id}` | Get basket by id |
| `POST` | `/api/baskets/{id}` | Create an empty basket |
| `POST` | `/api/baskets/{id}/items` | Add a product (`productId`, `quantity`) |
| `PUT` | `/api/baskets/{id}/items/{productId}` | Update item quantity |
| `DELETE` | `/api/baskets/{id}/items/{productId}` | Remove one product from basket |
| `DELETE` | `/api/baskets/{id}` | Delete the whole basket |
| `POST` | `/api/auth/login` | Login and receive a JWT (`username` / `password`) |
| `GET` | `/api/auth/me` | Current authenticated user |
| `POST` | `/api/orders` | Place order from a basket (**JWT required**) |
| `GET` | `/api/orders` | List orders for the logged-in buyer (**JWT required**) |
| `GET` | `/api/orders/{id}` | Get one order (**JWT required**) |

Demo login (configured in `application.yaml`):

```text
username: shopper
password: Password123
```

Send the token as `Authorization: Bearer <token>` on order endpoints.

CORS is enabled for the React Vite (`5173`) and CRA (`3000`) local origins.

## Status

The full shopping flow works end to end: browse, add to basket, sign in, check out, and view orders. Remaining work is polish.
