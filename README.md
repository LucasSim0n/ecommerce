# Ecommerce API (REST)

A work-in-progress RESTful API built with **Express.js** for a digital commerce platform.

---

## Table of Contents

- [Description](#description)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation](#installation)  
  - [Running the API](#running-the-api)  
- [Folder Structure](#folder-structure)  
- [Usage](#usage)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Description

This project is a backend API for an ecommerce platform. It handles operations such as managing products, users, authentication, orders, etc. It is implemented with Node.js and Express.js, following REST principles, to enable integration with frontend clients or other services.

---

## Features

- RESTful endpoints for key ecommerce operations (CRUD for products, orders, maybe users)  
- Middleware support (e.g. for authentication, validation, error handling)  
- Organized code structure (routes, utils, middlewares, etc.)  
- Easy to extend / maintain  

---

## Tech Stack

- **Runtime / Framework**: Node.js, Express.js
- **Language**: JavaScript  
- **Others**: Built to work with MySQL

---

## Getting Started

### Prerequisites

- Node.js
- npm or yarn  
- MySQL

### Installation

```bash
# Clone the repo
git clone https://github.com/LucasSim0n/ecommerce.git

cd ecommerce

# Install dependencies
npm install
```

### Running the API

```bash
# For development
npm start
```

You will need to set environment variables (database user, password, ports, etc) — create a `.env` file based on `.env.example`.

---

## Folder Structure

Here’s a quick overview of the project structure:

```
/db             → database related files, seeders, etc.
/middlewares    → custom middlewares (auth, error handling, etc.)
/routes          → route definitions, mapping endpoints to controllers
/utils           → helper functions, utilities
index.js        → main entry point of the application
package.json    → project configuration, dependencies, scripts
```

---

## Usage

Once the API is running, you can access endpoints like:

- `GET /products` — list all products  
- `POST /products` — create a new product  
- `GET /products/:id` — get details of a product  
- `PUT /products/:id` — update a product  
- `DELETE /products/:id` — delete a product  

(Also user login, authentication and order tipical endpoints will be released in future versions)

You might want to use tools like Postman / Insomnia for testing.

---

## Contributing

Contributions are welcome! If you want to contribute:

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/YourFeature`)  
3. Make your changes & test them  
4. Submit a pull request  

Please make sure new features include tests / validation where needed, maintain code style, etc.
