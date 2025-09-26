package main

import (
	"encoding/json"
	"log"
	"net/http"
)

type Coordinates struct {
	Lat float64 `json:"lat"`
	Lon float64 `json:"lng"`
}


type Response struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func processAndRespond(msg Coordinates) Response {
	log.Println("Received message:", msg.Lat, msg.Lon)

	response := Response{
		Status:  "success",
		Message: "Message processed successfully",
	}

	return response
}

func logMessageHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
	if r.Method == http.MethodOptions {
		w.WriteHeader(http.StatusOK)
		return
	}
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	println("logMessageHandler called")



	var receivedMsg Coordinates
	err := json.NewDecoder(r.Body).Decode(&receivedMsg)
	if err != nil {
		http.Error(w, "Error decoding JSON", http.StatusBadRequest)
		return
	}

	// log.Printf("Received message: %s", receivedMsg.Text)

	response := processAndRespond(receivedMsg)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
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
	http.HandleFunc("/log", logMessageHandler)

	// 2. Start the server on a port, like 8080.
	log.Fatal(http.ListenAndServe(":8080", nil))
}