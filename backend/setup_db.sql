-- Create PostgreSQL database and user for djangoReactJS app
-- Run with: sudo -u postgres psql -f backend/setup_db.sql
-- Or: psql -U postgres -h localhost -f backend/setup_db.sql (enter password when prompted)

CREATE USER djangoreactjs WITH PASSWORD 'djangoreactjs_secret';

CREATE DATABASE djangoreactjs OWNER djangoreactjs;

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE djangoreactjs TO djangoreactjs;
\c djangoreactjs
GRANT ALL ON SCHEMA public TO djangoreactjs;
