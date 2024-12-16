# Dokumentasi Aplikasi Appointment System

## Teknologi yang Digunakan

### Backend

- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize CLI
- **Bahasa Pemrograman**: JavaScript

### Frontend

- **Framework**: Vue.js
- **CSS Framework**: Tailwind CSS, Daisy UI
- **State Management**: Pinia

---

## Langkah-Langkah Instalasi dan Menjalankan Aplikasi

### Prasyarat

Pastikan Anda memiliki:

- Node.js (disarankan versi terbaru LTS)
- PostgreSQL (pastikan database sudah berjalan di lokal/server)
- Git

### 1. Clone Repository

Clone repository aplikasi dari GitHub:

```bash
$ git clone <url-repo> : https://github.com/Torune9/Halmity-Test.git
$ cd Healmity Test/backend | Healmity Test/frontend
```

### 2. Menyiapkan Backend

1. **Masuk ke Direktori Backend**:

   ```bash
   $ cd backend
   ```

2. **Install Dependencies**:

   ```bash
   $ npm install
   ```

3. **Konfigurasi Database**:
   Pastikan Anda memiliki database PostgreSQL bernama `appointment_system`. Sesuaikan konfigurasi di file `config/config.json` jika diperlukan.

4. **Jalankan Migrasi**:
   Untuk membuat tabel database:

   ```bash
   $ npm run migrate:up
   ```

   Untuk membatalkan semua migrasi:

   ```bash
   $ npm run migrate:down
   ```

5. **Jalankan Seeder**:
   Untuk memasukkan data awal:

   ```bash
   $ npm run seed:up
   ```

   Untuk membatalkan seeder:

   ```bash
   $ npm run seed:down
   ```

6. **Menjalankan Server Backend**:
   Jalankan server dengan perintah berikut:

   ```bash
   $ npm run start
   ```

   Server akan berjalan pada port yang ditentukan di file `index.js` (default: `localhost:3000`).

### 3. Menyiapkan Frontend

1. **Masuk ke Direktori Frontend**:

   ```bash
   $ cd frontend
   ```

2. **Install Dependencies**:

   ```bash
   $ npm install
   ```

3. **Menjalankan Aplikasi Frontend**:
   Jalankan aplikasi dengan perintah berikut:

   ```bash
   $ npm run dev
   ```

   Aplikasi akan berjalan pada `localhost:5173` atau sesuai konfigurasi Vite.

---

## Perintah Penting

Berikut adalah perintah-perintah utama yang dapat digunakan untuk pengelolaan backend:

- **Menjalankan Server**:

  ```bash
  $ npm run start
  ```

- **Migrasi Database**:

  - Menjalankan migrasi:
    ```bash
    $ npm run migrate:up
    ```
  - Membatalkan migrasi:
    ```bash
    $ npm run migrate:down
    ```

- **Seeder Database**:

  - Menjalankan seeder:
    ```bash
    $ npm run seed:up
    ```
  - Membatalkan seeder:
    ```bash
    $ npm run seed:down
    ```

---

## Struktur Folder

```
project-root/
├── backend/
│   ├── migrations/       # File migrasi Sequelize
│   ├── seeders/          # File seeder Sequelize
│   ├── models/           # Definisi model Sequelize
│   ├── services/         # Logika bisnis aplikasi backend
│   ├── routes/           # Definisi API routes
│   ├── config/           # Konfigurasi database
│   └── index.js          # Entry point aplikasi backend
├── frontend/
│   ├── src/
│   │   ├── components/   # Komponen Vue
│   │   ├── views/        # Halaman Vue
│   │   ├── layouts/      # Layout utama aplikasi Vue
│   │   ├── store/        # State management dengan Pinia
│   │   └── App.vue       # File utama aplikasi Vue
│   └── vite.config.js    # Konfigurasi Vite
└── README.md             # Dokumentasi ini
```

---

## Catatan

- Pastikan semua dependensi terinstall sebelum menjalankan aplikasi.
- Gunakan versi Node.js dan PostgreSQL yang kompatibel.
- Periksa konfigurasi database di backend jika terjadi error koneksi.
- Jika ada perubahan schema database, jangan lupa untuk menjalankan ulang migrasi dan seeder.

---
