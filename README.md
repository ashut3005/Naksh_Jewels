# Naksh Jewels – React & Node Internship Assignment

This project is a mini e-commerce module developed as part of the Naksh Jewels
ReactJS & Node.js Internship Assessment.

---

## Tech Stack

- Frontend: React (Functional Components, Context API)
- Backend: Node.js, Express
- Containerization: Docker & Docker Compose





---

## Frontend Features

- Product listing page
- Product card with name, price, and Add to Cart button
- Cart page with quantity update and remove item option
- State management using Context API
- Functional components only
- No UI libraries used
- Basic responsive design

---

## Backend Features

- GET /products API
- POST /cart API
- Validation middleware
- Proper error handling
- Environment variables support using .env

---

## Local Setup (Without Docker)

### Frontend
```bash
cd frontend
npm install
npm start
```

http://localhost:3000

### Backend
```bash
cd backend
npm install
node server.js
```

http://localhost:5000

## Docker Setup
---
 ### Prerequisites

- Docker
- Docker Compose

### Run Application
```bash
docker-compose up --build
```
### Access Application
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/products

## Notes

- Separate Dockerfiles are used for frontend and backend.  
- Docker Compose is used to run both services together.  
- No third-party UI libraries are used.  
- This project is created for internship assessment purposes only.

