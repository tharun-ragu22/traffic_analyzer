import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import maplibregl from "maplibre-gl";
import "./App.css";
import { text } from "stream/consumers";

interface Coordinates {
  Lat: number;
  Lng: number;
  
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

    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;
      console.log(`Clicked at longitude: ${lng}, latitude: ${lat}`);

      const response = await fetch("http://localhost:8080/log", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({lat: lat, lng: lng}),
      });

      if (!response.ok) {
        console.error("Failed to log coordinates");
      }

      console.log((await response.json()).message);


    });
    return () => map.remove();
  });

  const handleButtonClick = async () => {
    // const endpoint = "http://localhost:8080/log";
    // const message: Coordinates = { text: "Hello from React!" };

    // try {
    //   const response = await fetch(endpoint, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(message),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     console.log("Response from server:", data);
    //   }
    // } catch (error) {
    //   console.error("Error sending message:", error);
    // }
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
