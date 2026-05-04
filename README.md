# Project Structure

This repository is split into two app folders:

- `frontend` - existing React + Vite + MUI application
- `backend` - reserved for the Laravel backend

## Frontend

Run the frontend from the `frontend` directory:

```bash
cd frontend
npm install
npm run dev
```

## Backend

Create the Laravel app inside `backend` when you are ready:

```bash
cd backend
composer create-project laravel/laravel .
php artisan serve
```
