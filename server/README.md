# MERN Project README

## Project Overview

This is a MERN (MongoDB, Express.js, React, Node.js) project that consists of a backend API and a frontend web application. The backend is built with Node.js and Express.js, while the frontend is developed using React.js.

## Project Structure

The project structure is organized as follows:

```text
project-root/
├── client/                  # Frontend React application
│   ├── public/              # Public assets
│   └── src/                 # Source code for the frontend
│       ├── components/      # React components
│       ├── App.js           # Main React application file
├── config/                  # Configuration files (e.g., environment variables)
├── controllers/             # Backend controllers for handling API routes
├── models/                  # Backend MongoDB data models
├── routes/                  # Backend API routes
└── nidex.js                # Backend server entry point 
``` 
## .env (Backend Environment Variables)
NODE_ENV=development
PORT=8080
MONGO_URI=
JWT_SECRET=


## .env (Frontend Environment Variables)

NODE_ENV=development
REACT_APP_API_BASE_URL= 
REACT_APP_API_BASE_URL_LOCAL=http://localhost:8080/api


