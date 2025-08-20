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
- Django (`pip install django djangorestframework django-cors-headers`)
- React dependencies (`npm install`)

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/Django-React-WebApp-Template.git
   cd Django-React-WebApp-Template
   ```
2. **Set Up Django Backend**:
   ```bash
   cd backend
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py runserver
   ```
3. **Set Up React Frontend**:
   ```bash
   cd ../frontend
   npm install
   npm start
   ```
4. **Access the App**:
   - Backend API: `http://localhost:8000/api/`
   - Frontend: `http://localhost:3000`

## Screenshots
ReactJS Successfully integracted with Django
<img width="1920" height="1200" alt="Screenshot From 2025-08-20 11-19-30" src="https://github.com/user-attachments/assets/6ddc3728-f34e-4d9a-a9fd-8ee061c35e38" />


## Usage
- **API Development**: Extend the Django app (`backend/myapp/`) to add models, serializers, and viewsets for your project’s data.
- **Frontend Customization**: Modify React components in `frontend/src/components/` to match your UI requirements.
- **Static Files**: Build the React app (`npm run build`) and serve it through Django for production deployment.

## Project Structure
```
Django-React-WebApp-Template/
├── backend/                 # Django backend
│   ├── myapp/              # Django app with models, views, serializers
│   ├── myproject/          # Django project settings and URLs
│   └── static/             # Static files (React build output)
├── frontend/                # React frontend
│   ├── src/                # React components, services, and assets
│   ├── public/             # Public assets and index.html
│   └── tailwind.config.js  # Tailwind CSS configuration
└── README.md               # Project documentation
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for improvements or bug fixes.

## License
MIT License
