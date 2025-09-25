package main

import (
	"log"
	"net/http"
)

type Coordinates struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lon"`
}

// Your handler function that handles the incoming request
func processCoordinatesHandler(w http.ResponseWriter, r *http.Request) {
	// 1. Read the raw JSON data from the request body.
	// 2. Decode the JSON into your 'Coordinates' struct.
	// 3. This is where you would make a call to your external API (e.g., TomTom, Google Maps API).
	// 4. Send a JSON response back to the frontend to confirm success or report an error.
}

// The main function sets up and starts the server
func main() {
	// 1. Register your handler function for a specific URL.
	http.HandleFunc("/log", processCoordinatesHandler)

	// 2. Start the server on a port, like 8080.
	log.Fatal(http.ListenAndServe(":8080", nil))
}