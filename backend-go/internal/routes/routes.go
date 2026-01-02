package routes

import (
	"test-go-app/internal/handlers"

	"github.com/go-chi/chi/v5"
)

func SetupRoutes() *chi.Mux {
	r := chi.NewRouter()

	// all the routes go here
	// need figure out parameter and query parameter usage and how to pass in to operations
	r.Route("/users", func (r chi.Router){
		r.Get("/", handlers.GetUsers)
		r.Get("/{id}", handlers.GetUserByID)
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
