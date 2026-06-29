# Social Network API

A RESTful backend API for a social networking application built with **Node.js**, **Express.js**, **MongoDB**, and **Mongoose**.

This project demonstrates backend application development using a NoSQL database, RESTful routing, and a controller-based architecture. It allows users to create accounts, share thoughts, react to posts, and manage friend relationships through a collection of API endpoints.

---

## Features

- Create, read, update, and delete users
- Create, read, update, and delete thoughts
- Add and remove friends
- Add and remove reactions
- RESTful API architecture
- MongoDB integration with Mongoose
- Modular Express routing
- Controller-based application design

---

## Technologies Used

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Insomnia
- Git
- GitHub

---

## Project Structure

```text
social-network-api/
├── config/
│   └── connection.js
├── controllers/
│   ├── thought-controller.js
│   └── user-controller.js
├── models/
│   ├── Thought.js
│   ├── User.js
│   └── index.js
├── routes/
│   ├── api/
│   └── index.js
├── server.js
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/pdbesse/social-network-api.git
```

Navigate to the project directory:

```bash
cd social-network-api
```

Install dependencies:

```bash
npm install
```

---

## Usage

Start the development server:

```bash
npm start
```

Once the server is running, test the API using Insomnia, Postman, or another REST client.

---

## API Overview

### User Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/:id` | Retrieve a single user |
| POST | `/api/users` | Create a new user |
| PUT | `/api/users/:id` | Update an existing user |
| DELETE | `/api/users/:id` | Delete a user |
| POST | `/api/users/:userId/friends/:friendId` | Add a friend |
| DELETE | `/api/users/:userId/friends/:friendId` | Remove a friend |

### Thought Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/thoughts` | Retrieve all thoughts |
| GET | `/api/thoughts/:id` | Retrieve a single thought |
| POST | `/api/thoughts` | Create a new thought |
| PUT | `/api/thoughts/:id` | Update a thought |
| DELETE | `/api/thoughts/:id` | Delete a thought |
| POST | `/api/thoughts/:thoughtId/reactions` | Add a reaction |
| DELETE | `/api/thoughts/:thoughtId/reactions/:reactionId` | Remove a reaction |

---

## What I Learned

This project strengthened my understanding of:

- Designing RESTful APIs
- Structuring Express applications using controllers and routes
- Modeling document relationships with MongoDB and Mongoose
- Organizing maintainable backend code
- Testing APIs with Insomnia

---

## Future Improvements

Potential future enhancements include:

- User authentication and authorization
- Environment variable configuration
- Input validation
- Automated testing
- Improved error handling
- API documentation with OpenAPI/Swagger

---

## License

This project is licensed under the MIT License.
