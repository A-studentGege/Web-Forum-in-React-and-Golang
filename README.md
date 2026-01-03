# Web Forum in React & Go [work in progress]

A minimalist style web forum, build with React (MUI), TypeScript and communicates with a Go-based REST API backend.

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
│       └── routes/
└── frontend-react-app/         # React + Typescript frontend
    ├── package-lock.json
    ├── package.json
    ├── public/
    └── src/
        ├── App.tsx
        ├── components/
        ├── context/
        ├── pages/
        ├── types/
        └── utils/


```
