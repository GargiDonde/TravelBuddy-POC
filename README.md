# TravelBuddy-POC
This is a Proof of Concept for the Travel Buddy web application. The goal is to test the core feature APIs and see how the interact with each other.

The POC is built using React and MapLibre and currently focuses on Philadelphia.

# Technology
. React
. MapLibre GL JS
. Overpass API
. OpenStreetMap (OSM)
. OSRM
+ GTFS
+ OpenTripPlanner

# POC 1: Map
The first POC uses React and MapLibre to display a map centered on Philadelphia.
The map supports normal map interactions such as zooming and panning.

Status: Completed

# POC 2: OSM Data
The second POC uses the Overpass API to retrieve restaurant locations from OpenStreetMap.
The restaurant locations are then displayed as markers on the MapLibre map. Clicking a marker shows the restaurant name when the name is available in the OSM data.
Otherwise shows Unnamed restaurant.

Status: Completed

# POC 3: Routing
The third POC tests road routing using OSRM.
Two locations can be selected by clicking on the map. The application sends their coordinates to the OSRM routing service and receives the route geometry. The returned route is then displayed on the MapLibre map.

Status: Completed

# POC 4: Public Transit
The fourth POC will test public transit routing using GTFS data and OpenTripPlanner.
The goal is to verify that a selected GTFS transit dataset can be used with OpenTripPlanner to return a public transit route between two locations.
This part will be implemented after the first three POCs are completed.

Status: In progress

# How to run this project
Clone the repository and install the dependencies:
npm install

Start the development server:
npm run dev

Then open the local URL provided by Vite in your browser.
