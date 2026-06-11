# Wedding Gallery CMS

A luxury wedding gallery built with **Nuxt 3**, **Supabase**, and **Tailwind CSS**. The application provides a beautiful public-facing experience for viewing wedding memories, alongside a secure admin dashboard for managing albums and photographs.

---

## ✨ Features

### Public Gallery

- Elegant wedding homepage
- Album-based photo organization
- Album cover images
- Editorial-style photo layouts
- Infinite scrolling photo galleries
- Lightbox viewer for full-size images
- Dark mode by default
- Light mode toggle with saved preferences
- Responsive design for mobile, tablet, and desktop

---

### Admin Dashboard

- Secure administrator login
- Forgot password functionality
- Create, edit, and delete albums
- Publish/unpublish albums
- Upload multiple photographs at once
- Automatic thumbnail generation
- Album ordering controls
- Set album cover images
- Delete photographs
- Progress indicators during uploads

---

## 🛠 Tech Stack

### Frontend

- Nuxt 3
- Vue 3 Composition API
- TypeScript
- Tailwind CSS v4
- Nuxt Image

### Backend

- Supabase Authentication
- Supabase Database
- Supabase Storage
- Row Level Security (RLS)

### Utilities

- browser-image-compression
- Nuxt Color Mode

---

## 📂 Project Structure

```text
photoAlbum/
├── app/
│   ├── components/
│   │   ├── admin/
│   │   ├── gallery/
│   │   └── ThemeToggle.vue
│   │
│   ├── composables/
│   │   ├── useAlbums.ts
│   │   └── usePhotos.ts
│   │
│   ├── layouts/
│   │   ├── default.vue
│   │   └── admin.vue
│   │
│   ├── middleware/
│   │   └── auth.ts
│   │
│   ├── pages/
│   │   ├── index.vue
│   │   ├── login.vue
│   │   ├── albums/
│   │   └── admin/
│   │
│   └── types/
│
├── public/
├── nuxt.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone <repository-url>

cd photoAlbum
```

---

### Install dependencies

```bash
npm install
```

---

### Configure environment variables

Create a `.env` file:

```env
SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_anon_key
```

---

### Run the development server

```bash
npm run dev
```

Application will be available at:

```text
http://localhost:3000
```

---

## 🗄 Supabase Setup

### Storage Buckets

Create the following buckets:

```text
originals

thumbnails
```

---

### Database Tables

#### albums

| Column         | Type        |
| -------------- | ----------- |
| id             | uuid        |
| title          | text        |
| slug           | text        |
| description    | text        |
| cover_photo_id | uuid        |
| sort_order     | integer     |
| is_published   | boolean     |
| created_at     | timestamptz |

---

#### photos

| Column         | Type        |
| -------------- | ----------- |
| id             | uuid        |
| album_id       | uuid        |
| title          | text        |
| original_path  | text        |
| thumbnail_path | text        |
| width          | integer     |
| height         | integer     |
| file_size      | bigint      |
| sort_order     | integer     |
| created_at     | timestamptz |

---

## 🔐 Authentication

Authentication is powered by Supabase Auth.

Supported features:

- Email/password login
- Password reset emails
- Protected admin routes

---

## 🎨 Theme Support

The public gallery supports:

- Dark mode (default)
- Light mode
- Persistent user preferences

The admin dashboard remains dark-only for consistency.

---

## 📸 Image Processing

During uploads:

1. Original image is uploaded to storage.
2. A compressed thumbnail is generated automatically.
3. Both paths are stored in the database.
4. Public URLs are generated dynamically.

---

## 📋 Future Improvements

- Drag-and-drop photo ordering
- Album statistics dashboard
- Download entire albums
- Guest comments and messages
- RSVP integration
- AI-generated photo tagging

---

## 📄 License

This project is licensed under the MIT License.

---

## ❤️ Built For

Designed to preserve and share the memories of a special day with elegance and simplicity.
