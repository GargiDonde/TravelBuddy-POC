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
    center: [-75.1652, 39.9526],
    zoom: 12,
  });

  map.addControl(new maplibregl.NavigationControl(), "top-right");

  map.on("load", () => {
    new maplibregl.Marker()
      .setLngLat([-75.1652, 39.9526])
      .addTo(map);
  });

  return () => {
    map.remove();
  };
  }, []);

  return <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />;
}

export default App;