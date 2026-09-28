# Enterprise Vue 3 Starter

Vue 3 + TypeScript + Vite + Pinia + Vue Router + Axios + Tailwind CSS.

## ✨ Fitur

- **Authentication**: Login/logout dengan demo credentials
- **Protected Routes**: Halaman terlindungi dengan auth guard
- **Sidebar Menu**: Navigation dengan tree menu dan dropdown submenu
- **User Management**: CRUD users dengan modal form
- **Dashboard**: Metrics dan account summary
- **Settings**: Configuration page dengan feature toggles
- **Mock API**: JSON Server untuk development
- **Modern UI**: Tailwind CSS dengan dark theme

## 🚀 Jalankan Aplikasi

### Terminal 1 - Mock API (JSON Server)

```bash
npm install
npm run mock-api
```

API akan berjalan di `http://localhost:3000`

### Terminal 2 - Frontend (Vite Dev Server)

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 📋 Demo Credentials

- **Email**: admin@example.com
- **Password**: password

## 📁 Struktur Proyek

```
src/
├── components/          # Reusable UI components
│   └── ui/             # Base components (Button, Card, Input)
├── composables/        # Vue composables (useAsync, useToggle, usePagination)
├── layouts/            # Layout templates
│   ├── DashboardLayout.vue   # Layout dengan sidebar dan header
│   └── ProtectedLayout.vue   # Wrapper untuk protected routes
├── services/           # API services
│   ├── api.ts         # Axios client global
│   └── users.ts       # User CRUD service
├── stores/             # Pinia state management
│   ├── auth.ts        # Auth state
│   └── app.ts         # App global state
├── views/              # Page components
│   ├── LoginView.vue       # Halaman login
│   ├── DashboardView.vue   # Dashboard
│   ├── AdminUsersView.vue  # User management
│   └── SettingsView.vue    # Settings
├── router/             # Vue Router config
├── App.vue             # Root component
├── main.ts             # Entry point
└── index.css           # Global styles
```

## 🔌 API Endpoints (JSON Server)

- `GET /users` - List semua users
- `POST /users` - Create user baru
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

## 🛠 Scripts

```bash
npm run dev          # Jalankan dev server
npm run mock-api     # Jalankan JSON Server
npm run build        # Build untuk production
npm run preview      # Preview build
npm run typecheck    # Type checking
npm run lint         # Linting
npm run test         # Run tests
```

## 📦 Dependencies

- **Vue 3** - Framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Pinia** - State management
- **Vue Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **JSON Server** - Mock API
- **Lucide Vue** - Icons

## 📝 Notes

- Login adalah demo-only, token disimpan di localStorage
- Untuk production, ganti dengan real backend authentication
- JSON Server otomatis menyimpan data ke `db.json`
- Sidebar menu punya tree structure dengan expand/collapse
- Protected routes hanya bisa diakses setelah login
