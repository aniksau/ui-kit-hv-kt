# ui-kit-hv-kt

A full-stack application comprising:

- **Backend**: Node.js with Express.js API for managing employee records, featuring CRUD operations and JWT-based authentication with a toggle for enabling/disabling auth.
- **Frontend**: React application utilizing Hitachi Vantara's UI Kit to display and manage employee data.

## Table of Contents

- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Backend (employee-api)](#backend-employee-api)
  - [Frontend (react-ui-kit-kt-project)](#frontend-react-ui-kit-kt-project)
- [API Endpoints](#api-endpoints)
- [Authentication Toggle](#authentication-toggle)
- [Technologies Used](#technologies-used)
- [License](#license)

## Project Structure

```
ui-kit-hv-kt/
├── employee-api/               # Backend API
│   ├── routes/                 # Express routes
│   ├── controllers/            # Route handlers
│   ├── middleware/             # JWT auth middleware
│   ├── data/                   # In-memory data storage
│   ├── config/                 # Configuration files
│   ├── app.js                  # Express app setup
│   └── package.json
├── react-ui-kit-kt-project/    # Frontend React app
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── services/           # API service calls
│   │   ├── constants/          # Constant values
│   │   ├── App.tsx             # Main app component
│   │   └── index.tsx           # Entry point
│   └── package.json
└── README.md
```

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

## Setup Instructions

### Backend (employee-api)

1. Navigate to the `employee-api` directory:

   ```bash
   cd employee-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the server:

   ```bash
   npm run dev
   ```

   The server will start on [http://localhost:3000](http://localhost:3000).

### Frontend (react-ui-kit-kt-project)

1. Navigate to the `react-ui-kit-kt-project` directory:

   ```bash
   cd react-ui-kit-kt-project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be accessible at [http://localhost:5173](http://localhost:5173).

## API Endpoints

- `GET /api/employees` - Retrieve all employees
- `GET /api/employees/:id` - Retrieve a specific employee by ID
- `POST /api/employees` - Add a new employee
- `PUT /api/employees/:id` - Update an existing employee
- `DELETE /api/employees/:id` - Delete an employee

> Note: All endpoints are protected by JWT authentication when enabled.

## Authentication Toggle

The backend includes a configuration option to enable or disable JWT authentication.

To toggle authentication:

1. Open `employee-api/config/config.js`.
2. Modify the `authRequired` flag:

   ```javascript
   module.exports = {
     authRequired: true, // Set to false to disable authentication
     jwtSecret: 'your-secret-key',
   };
   ```

3. Restart the backend server for changes to take effect.

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - JWT for authentication
  - Nodemon for development

- **Frontend**:
  - React
  - TypeScript
  - [@hitachivantara/uikit-react-core](https://www.npmjs.com/package/@hitachivantara/uikit-react-core)
  - react-hook-form for form handling
  - axios for API requests

## License

This project is licensed under the [MIT License](LICENSE).
