## Nalanda Library Management System
A robust backend system for managing library users, books, and borrowing activities, built with Node.js, Express, and MongoDB. This project features RESTful APIs secured with JWT-based authentication and role-based access control.

## Features
User registration and login with role management (Admin and Member)
Book management: Add, update, delete, and list books with filtering and pagination
Borrowing system: Borrow books if available, return books, and view borrowing history
Reports: Generate analytics on most borrowed books, active members, and book availability
Secure endpoints with JWT authentication and role-based authorization

## Setup Instructions :

1. Clone the Repository
bash :
git clone https://github.com/Syedwajid002/Library-Management-System.git
cd Libray-Management-System

3. Install Dependencies
bash :
npm install

4. Configure Environment Variables
Create a .env file in the project root and add the following variables:
MONGO_URI=mongodb://127.0.0.1:27017/Library
JWT_SECRET=your_jwt_secret_here
PORT=3000

5. Start MongoDB Database
Make sure MongoDB is installed and running locally on port 27017. For example, on Windows:

bash
net start MongoDB
Or run mongod directly if using manual startup.

## Running the Application
Start the server in development mode with:

bash
npm run dev
or in production mode with:

bash
npm start
The server will be accessible at http://localhost:3000.

Using the RESTful API
Base URL: http://localhost:3000/api/

## Endpoints
------------
## User Management
Register User:
POST /users/register
Body: { "name": "John Doe", "email": "john@example.com", "password": "yourpassword" }

Login User:
POST /users/login
Body: { "email": "john@example.com", "password": "yourpassword" }
Returns JWT token for authentication.

## Book Management (Admin only for modification)
Add Book:
POST /books/addBook
Required fields: title, author, ISBN, publicationDate, genre, copies
example : {
  "title": "Introduction to Algorithms",
  "author": "Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein",
  "ISBN": "9780262033848",
  "publicationDate": "2009-07-31",
  "genre": "Computer Science",
  "copies": 5
}


Update Book:
PUT /books/:ISBN

Delete Book:
DELETE /books/:ISBN

List Books:
GET /books/getAllBooks
Supports pagination 

## Borrowing System (Member only)
Borrow Book:
POST /borrowings/
Body: { "ISBN": "7483979424" }
Ensures the book is available before borrowing.

Return Book:
POST /borrowings/return/:borrowId

View Borrow History:
GET /borrowings/history

## Reports (Admin only)

Most Borrowed Books:
GET /reports/most-borrowed

Active Members:
GET /reports/active-members

Book Availability:
GET /reports/book-availability

## Authentication & Authorization
All protected routes require passing the JWT token in the Authorization header as:

Authorization: Bearer <your_jwt_token>
Role-based access control restricts admin-only operations to users with Admin role.

Notes
Passwords are hashed securely before storage.

MongoDB aggregation framework is used for report generation.

Error handling and input validation are implemented for robustness.
