# Django + React

A ready-to-use full-stack template for Django + ReactJS projects. Includes authentication, profile management, and a modern admin dashboard UI.

## Features

- **Django REST Backend**: Token auth, profile API, avatar upload, CORS configured
- **React Frontend**: Vite + TypeScript + Tailwind CSS (TailAdmin UI)
- **Authentication**: Protected routes, admin-only sign-in (`/signin`)
- **Profile**: Edit personal info, address, social links, and profile picture
- **Database**: SQLite by default; PostgreSQL optional

## Getting Started

### Prerequisites

- Python 3.x
- Node.js 18+
- (Optional) PostgreSQL

### Installation

1. **Clone and create virtual environment**
   ```bash
   git clone <your-repo-url>
   cd djangoReactJS
   python -m venv venv
   source venv/bin/activate   # Windows: venv\Scripts\activate
   ```

2. **Backend setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py create_admin   # Creates admin / admin
   python manage.py runserver
   ```

3. **Frontend setup** (in a new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000/api/
   - Sign in at `/signin` with `admin` / `admin`

### PostgreSQL (optional)

SQLite is used by default. For PostgreSQL:

```bash
sudo -u postgres psql -f backend/setup_db.sql
export DB_ENGINE=postgresql
cd backend && python manage.py migrate && python manage.py create_admin
```

## API Overview

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login/` | POST | Login (username, password) |
| `/api/auth/me/` | GET | Current user + avatar_url |
| `/api/auth/logout/` | POST | Logout |
| `/api/profile/` | GET, PATCH | Get/update profile |
| `/api/profile/avatar/` | POST | Upload profile picture |
| `/api/items/` | GET, POST, etc. | Dashboard items (example) |

## Project Structure

```
djangoReactJS/
├── backend/                 # Django
│   ├── djangoReact/        # Settings, URLs
│   ├── myapp/              # App: auth, profile, models
│   ├── manage.py
│   ├── setup_db.sql        # PostgreSQL setup
│   └── requirements.txt
├── frontend/               # React (Vite + TailAdmin)
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── context/        # AuthContext, etc.
│   │   ├── components/
│   │   ├── pages/
│   │   └── layout/
│   └── package.json
└── README.md
```

## Production Build

```bash
cd frontend && npm run build
cd ../backend && python manage.py collectstatic --noinput
# Serve with gunicorn, uwsgi, or your preferred WSGI server
```

## License

MIT License
