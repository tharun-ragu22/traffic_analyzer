import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import maplibregl from "maplibre-gl";
import "./App.css";

interface Message {
  text: string;
}

function App() {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json", // Map style to use
      center: [-79.34711, 43.766599], // Initial map center in [lng, lat]
      zoom: 13, // Initial map zoom level

    });
    return () => map.remove();
  });

  const handleButtonClick = async () => {
    const endpoint = "http://localhost:8080/log";
    const message: Message = { text: "Hello from React!" };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response from server:", data);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React please
        </a>
        <button id="test-button" onClick={handleButtonClick}>
          Test Button
        </button>
      </header>
      <div
        ref={mapContainer}
        style={{ width: 600, height: 400, border: "1px solid red" }}
      ></div>
    </div>
  );
}

export default App;
