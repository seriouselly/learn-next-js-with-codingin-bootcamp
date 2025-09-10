# 🚀 Tugas 3 Next.js

## 🎯 Tujuan Tugas

- Memahami metode **fetching data** pada Next.js (Server Component & Client Component).
- Memahami perbedaan fetching data menggunakan **fetch** dan **axios**.
- Memahami implementasi **caching**.
- Memahami alur **Authentication** dan **Authorization** di Next.js.
- Dapat menggunakan **Axios, Tanstack Form, dan Tanstack Query**.
- Memahami penggunaan **Mutation** pada Tanstack Query.

---

## 🧩 Langkah Pengerjaan

**‼️ PENTING**
Sebelum mulai, **buat branch baru** terlebih dahulu.
<br>

### A. Fetching pada Next.js (API Public Starwars)

1. **Install dependensi**
   ```bash
   bun install @tanstack/react-query @tanstack/react-form zod zustand js-cookie swr axios
   bunx --bun shadcn@latest init
   ```
2. **Menambahkan komponen dari [Shadcn](https://ui.shadcn.com/docs/installation/next)**
    ```bash
    bunx --bun shadcn@latest add button alert card checkbox input select sonner table
    ```
3. **Buat file .env**
    NEXT_PUBLIC_STARWARS_API=https://starwars-databank-server.vercel.app/api/v1
    NEXT_PUBLIC_AUTH_API=http://localhost:3210/api
<br>

4. **Struktur Folder**
    ```pgsql
    └── 📁app
    └── 📁(auth)
        └── 📁login
            └── 📁_components
                ├── LoginForm.tsx
            ├── page.tsx
        └── 📁register
            ├── page.tsx
    └── 📁starwars
        └── 📁axios
            ├── page.tsx
        └── 📁fetch
            └── 📁client
                ├── page.tsx
            └── 📁server
                ├── page.tsx
        └── 📁query
            ├── page.tsx
        └── 📁swr
            ├── page.tsx
    ├── favicon.ico
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
    ```
5. **Halaman yang dibuat**
    ```bash
    - app/starwars/fetch/server/page.tsx → Fetching Server Component
    - app/starwars/fetch/client/page.tsx → Fetching Client Component
    - app/starwars/axios/page.tsx → Fetching Server Component dengan Axios
    - app/starwars/swr/page.tsx → Fetching Client Component dengan Axios + SWR
    - app/starwars/query/page.tsx → Fetching Client Component dengan Axios + Tanstack Query
    ```
<br>

### B. Authentication & Authorization (Backend NestJS Local)
1. **Clone backend Nest.JS**
  ```bash
    git clone https://github.com/Salmansha08/nest-auth-jwt-starting .bun install
    bun run start:dev
  ```
  Atau gunakan project yang sudah pernah di-clone, jangan lupa pull update:
  ```bash
  git pull origin master
  ```
2. **Form Login**
  - Input: email, password, rememberMe.

  - Endpoint: POST ``/api/auth/login``.
  <br>

3. **Token**
  - Simpan token di Zustand store.
  - Gunakan js-cookie untuk cookie handling.
  <br>
  
4. **Authenticated Route**
  - Buat halaman /dashboard.
  - Proteksi route agar hanya bisa diakses jika user login.
  <br>

5. **[Optional] Role-based Access**
  - /dashboard hanya bisa diakses oleh role admin dan superadmin.
  <br>
---

## ⚡ Cara Menjalankan
1. **Clone repository ini**
  ```bash
  git clone <url-repo>
  ```

2. **Install dependencies**
  ```bash
  bun install
  ```

3. **Jalankan development server**
  ```bash
  bun run dev
  ```
  <br>

4. **Buka di browser: http://localhost:3000**
---

## 📖 Dokumentasi
### ✨ Fitur yang Dibuat

- Tampilan Login Page
![Login Page](/docs/images/login.png)
<br>

- Tampilan Dashboard Page
![Login Dashboard](/docs/images/dashboard.png)
<br>

- Tampilan Fetch Client
![Login Fetch Client](/docs/images/fetch-client.png)
<br>

- Tampilan Fetch Server
![Login Fetch Server](/docs/images/fetch-server.png)
<br>

- Tampilan Axios Client
![Login Axios Client](/docs/images/axios-client.png)
<br>

- Tampilan Axios Server
![Login Axios Server](/docs/images/axios-server.png)
<br>

- Tampilan Query
![Login Query](/docs/images/query.png)
<br>

- Tampilan SWR
![Login SWR](/docs/images/swr.png)

