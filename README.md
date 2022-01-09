# Meal Planner - Backend

This will handle all data for a meal-planning app. In this project, I will be practicing test-driven development using Jest and CircleCI.

## Contents

1. [Tech Stack](#tech-stack)
2. [Response Structure](#response-structure)
3. [Routes](#routes)
   1. [Households](#households)
   2. [Users](#users)
   3. [Plans](#plans)
4. [Database Structure](#database-structure)

## Tech Stack

- Node.js
- Express
- Jest
- Supertest

## Response Structure

| Field   | Data Type       |
| ------- | --------------- |
| message | string          |
| success | boolean         |
| payload | array or object |

The payload key will only be present on successful requests. More detailed information about its data type and structure will be found in the specific route information.

## Routes

### Households

🔨 Under construction 🔨

**Household Object Structure**

```
{
  id: string;
  occupants: Array<string>; // Strings refer to User ID
}
```

| Request   | Path            | Response         |
| --------- | --------------- | ---------------- |
| GET all   | /households     | array of objects |
| GET by ID | /households/:id | object           |
| POST      | /households     | object           |
| PUT       | /households/:id | object           |
| PATCH     | /households/:id | object           |
| DELETE    | /households/:id | object           |

### Users

🔨 Under construction 🔨

**User Object Structure**

```
{
  id: string;
  name: string;
  household: string; // Number refers to Household ID
}
```

| Request     | Path          | Response         |
| ----------- | ------------- | ---------------- |
| GET all     | /users        | array of objects |
| GET by ID   | /users/:id    | object           |
| GET by name | /users/?name= | array of objects |
| POST        | /users        | object           |
| PUT         | /users/:id    | object           |
| PATCH       | /users/:id    | object           |
| DELETE      | /users/:id    | object           |

### Plans

🔨 Under construction 🔨

## Database Structure

![How the different database tables link together. In Households, the field Occupants refers to the Id field of the Users table. In Users, the Household field refers to the Id field of the Households table. Both the Organiser and the Attendees fields in the Plans table refer to the Id Field in the Users table.](./databaseStructure.drawio.svg)
