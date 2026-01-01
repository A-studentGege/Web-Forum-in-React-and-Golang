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
		r.Get("/", handlers.GetTopics)
	})

	return r
}
