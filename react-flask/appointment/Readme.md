# Appointment Management System (Backend Server)

A simple Flask application for managing appointments. This system allows users to create and retrieve appointment records through RESTful API endpoints.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Run](#run)
- [Test](#test)

## Features

- Create new appointments
- Retrieve all appointments
- Error handling for invalid requests
- CORS support for cross-origin requests

## Prerequisites

- Python 3.12
- pip
- sqlite database

## Installation

### 1. Install package according to requirements file:
```bash
pip install -r requirements.txt 
```
### 2. Install Sqlite
Install SQLite by homebrew
```bash
brew install sqlite
```
Open terminal and run SQLite
```bash
sqlite3
```
Open local database 'test.db'：
- In sqlite3 command execute：.open test.db （here is the path of database）
- Query table in database test.db：.tables (Only one table named appointments)
- Query data in table： SELECT * FROM appointments; (Use this sql to query the results of schedule operation in the page.)


## Run
```bash
python server.py 
```

## Test

1. Get '/api/appointments' Api --- Get Appointments list
- **Method**: POST
- **Endpoint**: /api/saveappointment
- **Request Body**: JSON object containing:
  - name (string)
  - email (string)
  - phone (string)
  - date (string, format: YYYY-MM-DD)
  - time (string, format: HH:MM)
  - notes (optional, string)
- **Response**: JSON object of the created appointment
  - 201 - Created
  - 400 - Bad Request

```bash
curl -X POST -H "Content-Type: application/json" --data-raw '
    {
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "phone": "123 456 7890",
        "date": "2025-04-02",
        "time": "10:30",
        "notes": "Test"
    }
' http://localhost:5000/api/saveappointment 
```

2. POST '/api/saveappointment' Api --- Get Appointments
- **Method**: GET 
- **Endpoint**: /api/appointments 
- **Response**: JSON array of all appointments 
- **Status** Codes:
  - 200 - OK
```bash
curl -X GET http://localhost:5000/api/appointments
```