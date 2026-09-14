import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function App() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const routePoints = useRef([]);
  const [routeReady, setRouteReady] = useState(false);

  useEffect(() => {
  if (!mapContainer.current) return;

  const map = new maplibregl.Map({
    container: mapContainer.current,
    style: "https://demotiles.maplibre.org/style.json",
    center: [-75.1652, 39.9526], //longitude and latitude for Philadelphia
    zoom: 12, //opens map location zoomed for longitude and latitude for Philadelphia
  });

  mapRef.current = map;

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

    //Click two locations on map
    map.on("click", (event) => {
    if (routePoints.current.length >= 2) return;

    const point = [event.lngLat.lng, event.lngLat.lat];

    routePoints.current.push(point);

    new maplibregl.Marker()
      .setLngLat(point)
      .addTo(map);

    if (routePoints.current.length === 2) {
      setRouteReady(true);
    }
    });

  return () => {
    map.remove();
  };
  }, []);

  //Draw line between the two points clicked
  async function getRoute() {
  if (routePoints.current.length !== 2) return;

  const [start, destination] = routePoints.current;

  const url =
    `https://router.project-osrm.org/route/v1/driving/` +
    `${start[0]},${start[1]};${destination[0]},${destination[1]}` +
    `?overview=full&geometries=geojson`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== "Ok") {
      console.error("OSRM error:", data);
      return;
    }

    const route = data.routes[0].geometry;

    const map = mapRef.current;

    map.addSource("route", {
      type: "geojson",
      data: {
        type: "Feature",
        properties: {},
        geometry: route,
      },
    });

    map.addLayer({
      id: "route",
      type: "line",
      source: "route",
      paint: {
        "line-width": 5,
      },
    });

  } catch (error) {
    console.error("OSRM request failed:", error);
  }
}
  //Return button
  return (
  <>
    <div
      ref={mapContainer}
      style={{ width: "100vw", height: "100vh" }}
    />

    <button
      onClick={getRoute}
      disabled={!routeReady}
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1,
        padding: "10px 15px",
      }}
    >
      Get Route
    </button>
  </>
);
}
export default App;