package routes

import (
	"github.com/A-studentGege/backend-go/internal/handlers"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
)

func SetupRoutes() *chi.Mux {
	r := chi.NewRouter()

	// Basic CORS setup
    r.Use(cors.Handler(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173", "http://localhost:3000"}, // Your React URLs
        AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
        ExposedHeaders:   []string{"Link"},
        AllowCredentials: true,
        MaxAge:           300, // Maximum value not ignored by any of major browsers
    }))

	// all the routes go here
	// need figure out parameter and query parameter usage and how to pass in to operations
	r.Route("/users", func (r chi.Router){
		r.Get("/", handlers.GetUsers)
		r.Get("/{id}", handlers.GetUserByID)
		r.Post("/login", handlers.LoginHandler)
	})

	r.Route("/topics", func (r chi.Router){
		r.Get("/", handlers.GetTopics) // get all topic names
		r.Get("/{topicID}", handlers.GetTopicNameByID) // get topic name by its id
	})

	r.Route("/posts", func (r chi.Router){
		r.Get("/", handlers.GetLatestPosts) // get all posts order by time
		r.Get("/{id}", handlers.GetPostByID) // get post details by post id
		r.Get("/{id}/comments", handlers.GetCommentsByPostID) // get a post's comments by post id 
		r.Get("/topic/{topicID}", handlers.GetPostsByTopicID) // get posts filtered by topic
		
	})

	return r
}
