# Web Forum in React & Go

_Developed by Chen Fanggege_

A minimalist style web forum, build with **React (MUI), TypeScript** and communicates with a **Go-based RESTful API backend**.

Login with just your name, start posting and sharing your idea.

## Main code structure

```
Web-Forum-in-React-and-Golang/
├── README.md
├── backend-go/                 # Go RESTful API backend
│   ├── cmd/
│   │   └── server/
│   │       └── main.go
│   ├── go.mod
│   ├── go.sum
│   └── internal/
│       ├── db/
│       ├── auth/
│       ├── handlers/
│       ├── models/
│       ├── routes/
│       └── util/
└── frontend-react-app/         # React + Typescript frontend
    ├── package-lock.json
    ├── package.json
    ├── public/
    └── src/
        ├── App.tsx
        ├── components/
        ├── context/
        ├── hooks/
        ├── services/
        ├── pages/
        ├── types/
        └── utils/

```

## Local setup & try it

### Clone this repo

```bash
git clone https://github.com/A-studentGege/Web-Forum-in-React-and-Golang
```

### Prerequisites

- Node.js >= 18
- Go >= 1.21
- PostgreSQL >= 15

Frontend runs at port 3000, backend runs at port 8080, postgres SQL DB runs at port 5432 - make sure they are available.

### Environment variable

```bash
cd /backend-go
cp .env.example .env    # Edit .env wtih your own db credentials and jwt secret key
```

### Database setup (PostgreSQL)

Ensure PostgreSQL is installed and running.

Ensure `forumdb_file.sql` is located in the project root (or adjust the path accordingly). Use the sql file `forumdb_file.sql` provided to populate the database with sample data.

#### Option 1: Using pgAdmin

1. Open pgAdmin
2. Select **Query Tool**
3. Click **Open File** and select `forumdb_file.sql`
4. Execute the script

#### Option 2: Using psql (CLI)

```bash
# connect to default database
psql -U postgres postgres
```

```sql
-- create the forum database
CREATE DATABASE forumdb;
```

```bash
# populate tables and data
psql -U postgres -d forumdb -f forumdb_file.sql
```

> Replace postgres with your PostgreSQL username if different.

### Backend start

```bash
cd backend-go
go run ./cmd/server/main.go
```

Your should see

```
Database connected
Server running on :8080
```

### Frontend start (development mode)

```bash
cd frontend-react-app
npm install # install dependencies
npm start
```

To get started, log in with any name; if you want access to admin functions, use `John`. This is for development only.

## Have a look :eyes:

![Login page](/screenshots/login-page.png)

![Home page](/screenshots/home-page.png)

![Manage topics (admin)](/screenshots/manage-topics.png)

![Create post](/screenshots/create-post.png)

## AI use declaration

I consulted AI tools (chatGPT) for assistance in my development, which involve the following functions/areas

- Import order and documentation style
- Set up path aliasing
- Create auth context and how does it work
- Hooks and services differences and usages
- Use props to interact between parent and child components
- Go syntax and extract parameters from path
- Go backend handling different types of error
- Refresh/re-render elements after sending requests
- Correct practice for checking jwt token expiry
- Code review to improve clarity
