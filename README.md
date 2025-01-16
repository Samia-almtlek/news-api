# News Management API

## Overview

This project is built with Node.js, Express, and MongoDB, designed for managing users and news. It includes key features like user authentication, input validation, pagination, search, and sorting. JWT (JSON Web Token) is used to secure certain routes, ensuring proper authentication for sensitive operations.
---

# Features

## Users Management
-CRUD Operations:
Add, retrieve, update, and delete users.
Authentication: User login with email and password to obtain a JWT.
-Validation:
Name must only contain letters.
Email must be valid.
Password must be at least 6 characters long.
---
## News Management
-CRUD Operations:
Add, retrieve, update, and delete news items.
-Validation:
Title length: 5–100 characters.
Description: Minimum 20 characters.
Author: Only letters allowed.
Category: Must be one of the predefined options.
End date must be after the start date.
-Additional Features:
Pagination for fetching news.
Search functionality using title, author, or category.
Sorting news by category.
Protected routes for creating, updating, and deleting news.
--- 
    
# Endpoints

## Users Endpoints
- **POST** `/api/users`: Add a new user.
- **GET** `/api/users`: Retrieve all users.
- **GET** `/api/users/:id`: Retrieve a specific user by ID.
- **PUT** `/api/users/:id`: Update a specific user by ID.
- **DELETE** `/api/users/:id`: Delete a specific user by ID.
- **POST** `/api/users/login`: User login to get a JWT token.

## News Endpoints
- **POST** `/api/news`: Add a new news item (protected).
- **GET** `/api/news`: Retrieve all news items.
- **GET** `/api/news/:id`: Retrieve a specific news item by ID.
- **PUT** `/api/news/:id`: Update a specific news item (protected).
- **DELETE** `/api/news/:id`: Delete a specific news item (protected).
- **GET** `/api/news/paginated`: Retrieve news with pagination.
- **GET** `/api/news/search`: Search for news by title, author, or category.
- **GET** `/api/news/sorted-by-category`: Retrieve news sorted by category.

---
# Installation

## Prerequisites
- **Node.js** (version 20 or higher)
- **MongoDB Atlas**

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Samia-almtlek/news-api.git
2. Navigate to the project directory: cd news-api
 
3. Install dependencies: npm install
  
4. Configure environment variables:
Create a .env file in the root directory and add the following variables:
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
PORT=3000

   
5. Start the server: node server.js
    
6. Access the application:
    * Open your browser or Postman and navigate to:
       http://localhost:3000
      
    *Use the available endpoints for API functionality and documentation.

##Authentication
To access protected routes, log in using /api/users/login to get a JWT.
Include the token in the Authorization header for requests:
makefile

Authorization: Bearer <your_token>
Testing
Use tools like Postman or Insomnia to test the API endpoints.
Ensure all required headers and payloads are included for requests.
---
##Helpful Resources
While working on this project, I referred to the following resources to understand certain concepts better and also i used the slides on canvas:
* https://www.youtube.com/watch?v=bB5tpD0Y73w
* https://youtu.be/-MTSQjw5DrM?si=nQ5hqLcpIT5X2rrr
* https://www.youtube.com/watch?v=sbt9XbAXb94
* https://www.youtube.com/watch?v=pKd0Rpw7O48
* https://www.youtube.com/watch?v=TlB_eWDSMt4
---
##Notes
Input validation and JWT authentication were implemented to meet the project’s requirements.
The code is structured to allow future enhancements or integration with a frontend.
The frontend is not perfect and was created primarily for personal understanding and to test the API functionality.
