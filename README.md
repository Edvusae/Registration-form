# Full-Stack User Authentication System

This project is a complete, full-stack user registration and login system built with the MERN stack. It provides a secure and robust foundation for any application requiring user accounts, featuring a responsive React frontend that communicates with a Node.js/Express RESTful API for all authentication logic.

This project demonstrates a strong understanding of both frontend and backend development, including state management, API integration, database operations, and security best practices.

<!-- I will Add a screenshot here -->

---

## Key Features

-   **Secure User Registration:** New users can create an account. Passwords are securely hashed using `bcrypt` before being stored in the database.
-   **User Login:** Registered users can log in to receive a JSON Web Token (JWT) for session management.
-   **RESTful API:** A well-structured backend API built with Node.js and Express to handle all authentication requests (register, login).
-   **Database Integration:** MongoDB is used for data persistence, managed via Mongoose schemas.
-   **Frontend-Backend Communication:** The React client uses `axios` to make efficient API calls to the server.
-   **Responsive Design:** The interface is built to be clean and functional across different screen sizes.

---

## Tech Stack

-   **Frontend:** React.js, Axios, CSS3, HTML5
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB with Mongoose
-   **Authentication:** JSON Web Tokens (jsonwebtoken), Password Hashing (bcrypt.js)

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js installed on your machine
-   npm (Node Package Manager)
-   A MongoDB database (local or a cloud instance like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Edvusae/Registration-form.git
    ```

2.  **Navigate to the server directory and install dependencies:**
    ```sh
    cd Registration-form/my-app-server
    npm install
    ```

3.  **Navigate to the client directory and install dependencies:**
    ```sh
    cd ../my-app
    npm install
    ```

4.  **Set up environment variables:**
    -   In the `my-app-server` directory, create a `.env` file.
    -   Add your MongoDB connection string and a secret key for JWT:
        ```
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_super_secret_key
        ```

5.  **Run the application:**
    -   To start the backend server (from `my-app-server`):
        ```sh
        npm start
        ```
    -   To start the frontend client (from `my-app`):
        ```sh
        npm start
        ```

The application should now be running, with the frontend available at `http://localhost:3000` and the server at `http://localhost:5000` (or your configured port).