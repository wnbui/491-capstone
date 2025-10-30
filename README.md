# 491-capstone

This is the mono repository for our 491 Capstone project. The file structure is as follows:
- Frontend (React)
- Backend (Deprecated)
- Test (Backend)
- Infrastructure

## Technology Stack

### Frontend
- **React 19** - JavaScript library to build web and mobile apps
- **Vite 7** - Build tool for React
- **TailwindCSS 4** - CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Icon library

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - ORM for database operations
- **Alembic** - Database migration tool
- **Flask Migrate** - Database migration for Flask apps using SQLAlchemy
- **MySQL** - Relational database
- **JWT** - Secure authentication
- **Pydantic** - Data validation

## Setup Requirements
- Node.js 18+
- Python 3.8+
- MySQL 8.0+

### Clone Repository
```
git clone https://github.com/wnbui/491-capstone.git
cd 491-capstone
```

### Database data
In MySQL, use the SQL files in **database_data** to insert data into MySQL database.


### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate Python virtual environment
python -m venv .venv              
source .venv/bin/activate      

# Install dependencies
pip install -r requirements.txt

# Create .env file
cat > .env << EOF
FLASK_SECRET=my-secret-key-12345
JWT_EXPIRES_MIN=30
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DB=project_mgmt
DATABASE_URL=mysql+pymysql://root:your_mysql_password@127.0.0.1:3306/project_mgmt
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
EOF

# Create database in MySQL
mysql -u root -p -e "CREATE DATABASE project_mgmt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Initialize database tables
python -c "from app import create_app, db; app = create_app(); app.app_context().push(); db.create_all()"

# Start backend server
python run.py
```

Backend will run on: **http://localhost:5000**

### Frontend Setup

```bash
# Open new terminal
cd project-manager-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:5173**

## How to use the app

1. **Open browser**: Navigate to `http://localhost:5173`
2. **Register**: Click "Sign up" and create an account
   - Use a password with at least 8 characters and 1 special character
3. **Login**: Sign in with your credentials
4. **Create Project**: Click "New Project" button
5. **Add Tasks**: Open a project and click "New Task"
6. **Manage**: Drag tasks, update statuses, and track progress!

## Log in as an existing user from the existing database
All users have the same password (**Password123!**). Log in using any of the 10 existing users from the database.

