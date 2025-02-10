# Soccer League Management API Documentation

## Models:

_User_
- username: string, unique (required)
- email: string, unique (required)
- password: string (required)
- role: string (required, enum: ['admin', 'staff', 'customer'])
- fullName: string (required)
- phoneNumber: string (required)
- status: string (default: 'active', enum: ['active', 'suspended', 'inactive'])
- lastLogin: datetime
- createdAt: datetime
- updatedAt: datetime

_Team_
- name: string, unique (required)
- city: string (required)
- stadium: string (required)
- foundedYear: integer (required)
- logoUrl: string (optional)

_Match_
- homeTeamId: integer (required)
- awayTeamId: integer (required)
- date: datetime (required)
- venue: string (required)
- status: string (enum: ['scheduled', 'ongoing', 'completed', 'cancelled'])
- homeTeamScore: integer (default: 0)
- awayTeamScore: integer (default: 0)
- season: string (required)

_Ticket_
- matchId: integer (required)
- category: string (required, enum: ['VIP', 'Category 1', 'Category 2', 'Economy'])
- price: number (required)
- quantity: integer (required)
- remainingQuantity: integer (required)
- status: string (enum: ['available', 'sold_out', 'on_sale'])

_TicketPurchase_
- userId: integer (required)
- ticketId: integer (required)
- quantity: integer (required)
- totalPrice: number (required)
- purchaseDate: datetime (required)
- status: string (enum: ['pending', 'confirmed', 'cancelled'])

_Standing_
- teamId: integer (required)
- season: string (required)
- matchesPlayed: integer (default: 0)
- wins: integer (default: 0)
- draws: integer (default: 0)
- losses: integer (default: 0)
- goalsFor: integer (default: 0)
- goalsAgainst: integer (default: 0)
- points: integer (default: 0)
- position: integer

## Relationships:

>### **One-to-Many Relationships**
- One Team can have many Matches (as home or away team)
- One Match can have many Tickets
- One User can have many TicketPurchases

>### **One-to-One Relationships**
- One Team has one Standing per season

## Endpoints:

### Public Endpoints:
- `POST /register`
- `POST /login`
- `GET /teams`
- `GET /matches`
- `GET /standings`
- `GET /tickets`
- `POST /register`
- `POST /login`

### Authentication Required Endpoints:
- `POST /tickets/purchase`
- `GET /tickets/my-tickets`

### Admin Authorization Required Endpoints:
- `POST /teams`
- `POST /matches`
- `PUT /matches/:id`
- `POST /tickets`
- `PUT /matches/:id/score`

## 1. POST /register

Description: Register new user account

Request Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "fullName": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "customer",
  "createdAt": "2024-02-15T08:30:00Z"
}
```

## 2. POST /login

Description: User login

Request Body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "string",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "customer",
    "fullName": "John Doe"
  }
}
```

## 3. POST /admin/users (Admin only)

Description: Create new staff/admin user

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body:
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "staff",
  "fullName": "string",
  "phoneNumber": "string"
}
```

_Response (201 - Created)_
```json
{
  "id": 2,
  "username": "staffuser",
  "email": "staff@example.com",
  "fullName": "Staff User",
  "role": "staff",
  "createdAt": "2024-02-15T08:30:00Z"
}
```

## 4. GET /admin/users (Admin only)

Description: Get list of all users

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Query Parameters:
- `role`: Filter by user role
- `status`: Filter by user status
- `search`: Search by username/email/fullName

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "customer",
    "fullName": "John Doe",
    "status": "active",
    "lastLogin": "2024-02-15T08:30:00Z"
  }
]
```

## 5. PUT /admin/users/:id (Admin only)

Description: Update user details/status

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body:
```json
{
  "role": "string (optional)",
  "status": "string (optional)",
  "fullName": "string (optional)",
  "phoneNumber": "string (optional)"
}
```

_Response (200 - OK)_
```json
{
  "message": "User updated successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "role": "staff",
    "status": "active",
    "updatedAt": "2024-02-15T08:30:00Z"
  }
}
```

## 6. GET /matches

Description: Get list of matches with optional filters

Query Parameters:
- `status`: Filter by match status
- `teamId`: Filter by team participation
- `season`: Filter by season
- `startDate`: Filter from specific date
- `endDate`: Filter until specific date

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "homeTeam": {
      "id": 1,
      "name": "Persija Jakarta",
      "city": "Jakarta"
    },
    "awayTeam": {
      "id": 2,
      "name": "Persib Bandung",
      "city": "Bandung"
    },
    "date": "2024-02-15T19:00:00Z",
    "venue": "Jakarta International Stadium",
    "status": "completed",
    "homeTeamScore": 2,
    "awayTeamScore": 1,
    "season": "2023/2024"
  }
]
```

## 2. GET /standings

Description: Get current season standings

Query Parameters:
- `season`: Filter by specific season

_Response (200 - OK)_
```json
[
  {
    "position": 1,
    "team": {
      "id": 1,
      "name": "Persija Jakarta",
      "city": "Jakarta"
    },
    "matchesPlayed": 15,
    "wins": 10,
    "draws": 3,
    "losses": 2,
    "goalsFor": 30,
    "goalsAgainst": 12,
    "goalDifference": 18,
    "points": 33
  }
]
```

## 3. POST /matches

Description: Create a new match (Admin only)

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body:
```json
{
  "homeTeamId": 1,
  "awayTeamId": 2,
  "date": "2024-03-01T19:00:00Z",
  "venue": "Jakarta International Stadium",
  "season": "2023/2024"
}
```

_Response (201 - Created)_
```json
{
  "id": 3,
  "homeTeam": {
    "id": 1,
    "name": "Persija Jakarta"
  },
  "awayTeam": {
    "id": 2,
    "name": "Persib Bandung"
  },
  "date": "2024-03-01T19:00:00Z",
  "venue": "Jakarta International Stadium",
  "status": "scheduled",
  "season": "2023/2024"
}
```

## 4. PUT /matches/:id/score

Description: Update match score (Admin only)

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body:
```json
{
  "homeTeamScore": 2,
  "awayTeamScore": 1,
  "status": "completed"
}
```

_Response (200 - OK)_
```json
{
  "message": "Match score updated successfully",
  "standing": {
    "homeTeam": {
      "position": 1,
      "points": 36,
      "matchesPlayed": 16
    },
    "awayTeam": {
      "position": 2,
      "points": 30,
      "matchesPlayed": 16
    }
  }
}
```

## 5. GET /tickets

Description: Get available tickets for matches

Query Parameters:
- `matchId`: Filter by specific match
- `category`: Filter by ticket category
- `status`: Filter by ticket status

_Response (200 - OK)_
```json
[
  {
    "id": 1,
    "match": {
      "id": 1,
      "homeTeam": "Persija Jakarta",
      "awayTeam": "Persib Bandung",
      "date": "2024-03-01T19:00:00Z",
      "venue": "Jakarta International Stadium"
    },
    "category": "VIP",
    "price": 500000,
    "remainingQuantity": 100,
    "status": "on_sale"
  }
]
```

## 6. POST /tickets/purchase

Description: Purchase tickets for a match

Request Headers:
```json
{
  "Authorization": "Bearer <access_token>"
}
```

Request Body:
```json
{
  "ticketId": 1,
  "quantity": 2
}
```

_Response (201 - Created)_
```json
{
  "id": 1,
  "ticket": {
    "match": {
      "homeTeam": "Persija Jakarta",
      "awayTeam": "Persib Bandung",
      "date": "2024-03-01T19:00:00Z"
    },
    "category": "VIP",
    "price": 500000
  },
  "quantity": 2,
  "totalPrice": 1000000,
  "purchaseDate": "2024-02-15T08:30:00Z",
  "status": "confirmed"
}
```

## Global Error Responses

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid request parameters"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid or expired token"
}
```

_Response (403 - Forbidden)_
```json
{
  "message": "You are not authorized to perform this action"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Resource not found"
}
```

_Response (409 - Conflict)_
```json
{
  "message": "Tickets sold out"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```