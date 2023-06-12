# Angular Node Project

This is a sample project that demonstrates the integration of Angular frontend with Node.js backend.

## Features

- Angular frontend with CRUD operations for products and categories
- Node.js backend with API endpoints for products and categories
- Sequelize ORM for database operations
- MySQL database

## Prerequisites

- Node.js (version X.X.X)
- Angular CLI (version X.X.X)
- MySQL database

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/angular-node-project.git

## Install dependencies for the frontend:
cd angular-node-project/frontend
npm install

## Install dependencies for the backend:
cd ../backend
npm install

Set up the MySQL database:

## Create a new database named angular_node_db
Update the database connection details in backend/config/database.js

## Run the migrations to create the necessary tables

cd backend
npx sequelize-cli db:migrate

## Start the server:
npm start
