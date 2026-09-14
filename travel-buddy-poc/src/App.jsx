import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const mapContainer = useRef(null);

  useEffect(() => {
  if (!mapContainer.current) return;

  const map = new maplibregl.Map({
    container: mapContainer.current,
    style: "https://demotiles.maplibre.org/style.json",
    center: [-75.1652, 39.9526], //longitude and latitude for Philadelphia
    zoom: 12, //opens map location zoomed for longitude and latitude for Philadelphia
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  //Adds marker
  map.on("load", async () => {
    new maplibregl.Marker()
      .setLngLat([-75.1652, 39.9526]) //longitude and latitude for Philadelphia
      .addTo(map);

      // Overpass query restaurant around 5 km of philadelphia marker
      const query = `
        [out:json];
        node["amenity"="restaurant"](around:5000,39.9526,-75.1652);
        out;
      `;

      try {
        const response = await fetch(
          "https://overpass-api.de/api/interpreter",
          {
            method: "POST",
            body: query,
          }
        );

        const data = await response.json();

        console.log("Overpass results:", data);

        // Add restaurant markers
        data.elements.forEach((restaurant) => {
          if (!restaurant.lat || !restaurant.lon) return;

          const name =
            restaurant.tags?.name || "Unnamed restaurant";

          new maplibregl.Marker()
            .setLngLat([restaurant.lon, restaurant.lat])
            .setPopup(
              new maplibregl.Popup().setText(name)
            )
            .addTo(map);
        });
      } catch (error) {
        console.error("Overpass request failed:", error);
      }
  });

  return () => {
    map.remove();
  };
  }, []);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
}

export default App;