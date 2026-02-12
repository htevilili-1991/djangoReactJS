# Django + React JS

This repository provides a robust and reusable template for building web applications by integrating **ReactJS** (frontend) with **Django** (backend). Designed for scalability and modularity, this template is ideal for developers looking to kickstart web app projects with a modern, full-stack architecture. It combines Django’s powerful backend capabilities with React’s dynamic, component-based UI, enabling rapid development across various web app projects.

## Features
- **Django Backend**: Leverages Django REST Framework for creating secure, scalable APIs.
- **React Frontend**: Utilizes ReactJS with Tailwind CSS for a responsive, modern UI.
- **Seamless Integration**: Pre-configured setup for communication between Django and React via REST APIs.
- **Modular Structure**: Organized codebase to support multiple projects with minimal reconfiguration.
- **CORS Support**: Configured to handle cross-origin requests for development and production.
- **Static File Handling**: Efficient management of React’s build files within Django’s static file system.
- **Customizable**: Easily adaptable for various use cases, from dashboards to e-commerce platforms.

## Getting Started

### Prerequisites
- Python 3.x
- Node.js and npm
- PostgreSQL
- Django (`pip install -r backend/requirements.txt`)
- React dependencies (`npm install`)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Django-React-WebApp-Template.git
   cd Django-React-WebApp-Template
   ```
2. **Set Up PostgreSQL Database** (one-time setup):
   ```bash
   sudo -u postgres psql -f backend/setup_db.sql
   ```
   Or if you have the postgres password: `psql -U postgres -h localhost -f backend/setup_db.sql`

3. **Set Up Django Backend**:
   ```bash
   source venv/bin/activate   # or create one: python -m venv venv
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py create_admin   # creates admin user (username: admin, password: admin)
   python manage.py runserver
   ```
4. **Set Up React Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
5. **Access the App**:
   - Backend API: `http://localhost:8000/api/`
   - Frontend: `http://localhost:5173` (Vite default port)

## Screenshots
ReactJS Successfully integracted with Django
<img width="1920" height="1200" alt="Screenshot From 2025-08-20 11-19-30" src="https://github.com/user-attachments/assets/6ddc3728-f34e-4d9a-a9fd-8ee061c35e38" />


## Usage
- **API Development**: Extend the Django app (`backend/myapp/`) to add models, serializers, and viewsets for your project’s data.
- **Frontend Customization**: Modify React components in `frontend/src/components/` to match your UI requirements.
- **Static Files**: Build the React app (`npm run build`) and serve it through Django for production deployment.

## Project Structure
```
djangoReactJS/
├── backend/                 # Django backend
│   ├── djangoReact/        # Django project settings and URLs
│   ├── myapp/              # Django app with models, views, serializers
│   ├── manage.py           # Django management script
│   ├── setup_db.sql        # PostgreSQL database & user setup script
│   └── staticfiles/        # Static files (React build output from collectstatic)
├── frontend/                # React frontend
│   ├── src/                # React components, services, and assets
│   ├── public/             # Public assets and index.html
│   └── package.json
└── README.md               # Project documentation
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License
MIT License
