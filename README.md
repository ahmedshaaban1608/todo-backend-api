# TODO App Backend API

This is the backend API for a TODO app that provides functionalities for user management and task management. The API is built using Node.js, Express, MongoDB (via Mongoose), JWT for authentication, and other necessary libraries.

## Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine
- MongoDB server running and accessible

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/ahmedshaaban1608/todo-backend-api.git
cd todo-backend-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and provide the necessary configuration:

```
SERVER_URL =
SERVER_PORT =
DB_URL =
DB_NAME =
DB_PORT =
TOKEN_SECRET =
EMAIL =
EMAIL_PASS =
```

## User Endpoints

### Sign Up

- **Route:** `POST /api/users/signup`
- **Description:** Sign up a new user.
- **Middleware:** `validateSignUp`
- **Handler:** `signUp`

### Sign In

- **Route:** `POST /api/users/signin`
- **Description:** Log in a user.
- **Middleware:** `validateSignIn`
- **Handler:** `signIn`

### Verify Account

- **Route:** `GET /api/verify/:id`
- **Description:** Verify a user's account using a verification link.

### Change Password

- **Route:** `PATCH /api/users/changepass`
- **Description:** Change the password of a logged-in user.
- **Middleware:** `verifyAuthorization`, `validateChangePass`
- **Handler:** `changePassword`

### Update User

- **Route:** `PATCH /api/users/update`
- **Description:** Update user information (age, firstName, lastName).
- **Middleware:** `verifyAuthorization`, `validateUpdate`
- **Handler:** `updateUser`

### Delete User

- **Route:** `GET /api/users/delete`
- **Description:** Delete a user account (hard delete).
- **Middleware:** `verifyAuthorization`
- **Handler:** `deleteUser`

### Soft Delete User

- **Route:** `GET /api/users/softdelete`
- **Description:** Soft delete a user account (mark as deleted).
- **Middleware:** `verifyAuthorization`
- **Handler:** `softDeleteUser`

### User Logout

- **Route:** `GET /api/users/logout`
- **Description:** Log out a user.
- **Middleware:** `verifyAuthorization`
- **Handler:** `userLogout`

## Tasks Endpoints

### Add Task

- **Route:** `POST /api/tasks`
- **Description:** Add a new task with a "toDo" status.
- **Middleware:** `verifyAuthorization`, `validateAdd`
- **Handler:** `addTask`

### Update Task

- **Route:** `PATCH /api/tasks`
- **Description:** Update task information (title, description, status) for a task created by the logged-in user.
- **Middleware:** `verifyAuthorization`, `validateUpdate`
- **Handler:** `updateTask`

### Delete Tasks

- **Route:** `DELETE /api/tasks`
- **Description:** Delete tasks created by the logged-in user.
- **Middleware:** `verifyAuthorization`, `validateDelete`
- **Handler:** `deleteTasks`

### Get Tasks with Users

- **Route:** `GET /api/taskswithusers`
- **Description:** Get all tasks along with user data.

### Overdue Tasks

- **Route:** `GET /api/overduetasks`
- **Description:** Get all tasks that are not done after the deadline.

---

## Error Handling

- The API provides appropriate error messages and status codes for various scenarios.
- A generic error handler middleware is implemented to catch and format errors.

## Database

- The app uses MongoDB as the database, with collections for users and tasks.

## Contribution

Contributions are welcome! Feel free to open issues and pull requests.

## License

This project is licensed under the MIT License.
