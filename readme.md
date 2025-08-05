# HiveBoard Backend API Documentation

This document describes all available backend API routes, their input parameters, and expected outputs.

---

## Authentication & User Routes

### Register User

- **POST** `/user/register`
#### Input Parameters (JSON body)
| Name                | Type   | Required | Description                |
|---------------------|--------|----------|----------------------------|
| fullname.firstname  | String | Yes      | User's first name (min 3)  |
| fullname.lastname   | String | No       | User's last name           |
| email               | String | Yes      | User's email               |
| password            | String | Yes      | User's password (min 6)    |

#### Output
- **201 Created**: `{ token, user }`
- **400 Bad Request**: `{ errors: [...] }` or `{ message: "User already exists" }`

---

### Login User

- **POST** `/user/login`
#### Input Parameters (JSON body)
| Name     | Type   | Required | Description         |
|----------|--------|----------|---------------------|
| email    | String | Yes      | User's email        |
| password | String | Yes      | User's password     |

#### Output
- **200 OK**: `{ token, user }`
- **400/401**: `{ errors: [...] }` or `{ message: "Invalid email or password" }`

---

### Get User Profile

- **GET** `/user/profile`
- **Headers**: `Authorization: Bearer <token>` or cookie

#### Output
- **200 OK**: `user` object
- **401 Unauthorized**: `{ message: "Unauthorized" }`

---

### Logout User

- **POST** `/user/logout`
- **Headers**: `Authorization: Bearer <token>` or cookie

#### Output
- **200 OK**: `{ message: "Logged out successfully" }`

---

## Household Routes

### Create Household

- **POST** `/houseHold/create`
- **Headers**: Auth required
#### Input Parameters (JSON body)
| Name | Type   | Required | Description                  |
|------|--------|----------|------------------------------|
| name | String | Yes      | Household name (min 3 chars) |

#### Output
- **201 Created**: `{ houseHold }`
- **400 Bad Request**: `{ errors: [...] }`

---

### Join Household

- **POST** `/houseHold/join`
- **Headers**: Auth required
#### Input Parameters (JSON body)
| Name      | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| inviteCode| String | Yes      | 6-character code      |

#### Output
- **201 Created**: `{ message, houseHold }`
- **400/403**: `{ errors: [...] }` or `{ message: ... }`

---

### View Household

- **GET** `/houseHold/:id`
- **Headers**: Auth required

#### Output
- **200 OK**: `houseHold` object
- **400/401**: `{ message: ... }`

---

### Leave Household

- **POST** `/houseHold/leave/:id`
- **Headers**: Auth required

#### Output
- **201 Created**: `{ message: "Left household!" }`

---

### Delete Household

- **POST** `/houseHold/delete/:id`
- **Headers**: Auth required, Admin only

#### Output
- **201 Created**: `{ message: "Deleted household!" }`

---

## Task Routes

### View Tasks

- **GET** `/task/:id`
- **Headers**: Auth required, Member only

#### Output
- **200 OK**: `{ "todo": [...], "inProgress": [...], "done": [...] }`

---

### Create Task

- **POST** `/task/:id`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name        | Type   | Required | Description                |
|-------------|--------|----------|----------------------------|
| title       | String | Yes      | Task title (min 3 chars)   |
| description | String | No       | Task description           |
| dueDate     | Date   | Yes      | Due date                   |

#### Output
- **200 OK**: `task` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Edit Task

- **PUT** `/task/:id/:taskId`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name        | Type   | Required | Description                |
|-------------|--------|----------|----------------------------|
| title       | String | Yes      | Task title (min 3 chars)   |
| description | String | No       | Task description           |
| dueDate     | Date   | Yes      | Due date                   |

#### Output
- **201 Created**: `task` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Change Task Position/Status

- **PATCH** `/task/:id/:taskId`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name     | Type   | Required | Description                  |
|----------|--------|----------|------------------------------|
| status   | String | Yes      | One of: todo, inProgress, done |
| position | Number | Yes      | New position                 |

#### Output
- **201 Created**: `task` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Delete Task

- **DELETE** `/task/:id/:taskId`
- **Headers**: Auth required, Member only

#### Output
- **201 Created**: `{ message: "Deleted Task successfully!" }`
- **400 Bad Request**: `{ message: ... }`

---

## Grocery Routes

### View Groceries

- **GET** `/grocery/:id`
- **Headers**: Auth required, Member only

#### Output
- **200 OK**: `[ grocery, ... ]`

---

### Create Grocery

- **POST** `/grocery/:id`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name     | Type   | Required | Description                  |
|----------|--------|----------|------------------------------|
| itemName | String | Yes      | Grocery name (min 3 chars)   |
| quantity | Number | Yes      | Quantity                     |

#### Output
- **200 OK**: `grocery` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Edit Grocery

- **PUT** `/grocery/:id/:groceryId`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name     | Type   | Required | Description                  |
|----------|--------|----------|------------------------------|
| itemName | String | Yes      | Grocery name (min 3 chars)   |
| quantity | Number | Yes      | Quantity                     |

#### Output
- **200 OK**: `grocery` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Mark Grocery as Bought

- **PATCH** `/grocery/:id/:groceryId`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name   | Type    | Required | Description         |
|--------|---------|----------|---------------------|
| bought | Boolean | Yes      | Mark as bought      |

#### Output
- **200 OK**: `grocery` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Delete Grocery

- **DELETE** `/grocery/:id/:groceryId`
- **Headers**: Auth required, Member only

#### Output
- **200 OK**: `{ message: "Deleted successfully!" }`
- **400 Bad Request**: `{ message: ... }`

---

## Notes Routes

### View Notes

- **GET** `/note/:id`
- **Headers**: Auth required, Member only

#### Output
- **200 OK**: `[ note, ... ]`

---

### Create Note

- **POST** `/note/:id`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name    | Type   | Required | Description                  |
|---------|--------|----------|------------------------------|
| content | String | Yes      | Note content (min 3 chars)   |

#### Output
- **200 OK**: `note` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Edit Note

- **PUT** `/note/:id/:noteId`
- **Headers**: Auth required, Member only
#### Input Parameters (JSON body)
| Name    | Type   | Required | Description                  |
|---------|--------|----------|------------------------------|
| content | String | Yes      | Note content (min 3 chars)   |

#### Output
- **200 OK**: `note` object
- **400 Bad Request**: `{ errors: [...] }` or `{ message: ... }`

---

### Delete Note

- **DELETE** `/note/:id/:noteId`
- **Headers**: Auth required, Member only

#### Output
- **200 OK**: `note` object
- **400 Bad Request**: `{ message: ... }`

---

## General Notes

- All endpoints requiring authentication expect a valid JWT token in the `Authorization` header as `Bearer <token>` or as a cookie named `token`.
- All responses are in JSON format.
- Validation errors return a 400 status with an `errors` array.
- Unauthorized access returns a 401 status with a `message`.

---

