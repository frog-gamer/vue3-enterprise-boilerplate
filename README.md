# Auth, CRUD, dan Mock API

## Jalankan

Terminal 1 — mock API JSON Server:

```bash
npm install
npm run mock-api
```

Terminal 2 — frontend:

```bash
npm run dev
```

Buka `http://localhost:5173/login`.

## Demo login

- Email: `admin@example.com`
- Password: `password`

## Endpoint CRUD

JSON Server membaca `db.json` dan menyediakan:

- `GET /users`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

Login pada boilerplate ini bersifat demo/local karena JSON Server tidak menyediakan autentikasi JWT. Untuk production, ganti `auth.login()` dengan endpoint backend sungguhan dan validasi token di server.
