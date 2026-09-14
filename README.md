# TravelBuddy-POC
This is a Proof of Concept for the Travel Buddy web application. The goal is to test the core feature APIs and see how the interact with each other.

The POC is built using React and MapLibre and currently focuses on Philadelphia.

# Technology
+ React
+ MapLibre GL JS
+ Overpass API
+ OpenStreetMap (OSM)
+ OSRM
+ GTFS
+ OpenTripPlanner 2.10.0
+ GraphQL

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
The fourth POC tests public transit routing using GTFS data and OpenTripPlanner.
The POC uses SEPTA GTFS data with OpenTripPlanner and communicates with OTP through its GraphQL API. The React application sends a GraphQL request to the locally running OTP server and displays the response.
SEPTA routes and stops were successfully loaded into OpenTripPlanner and could be accessed through the GraphQL API.

Status: Integration tested

# Transit Integration
OpenTripPlanner 2.10.0 was tested with SEPTA GTFS data and the Pennsylvania OpenStreetMap dataset. OTP successfully built the graph and loaded SEPTA routes and stops, which were accessible through the GraphQL API.

However, attempts to generate actual transit itineraries resulted in an internal OTP error (Index ... out of bounds for length 0). During the build process, OTP also reported errors related to constrained transfers and staySeated transfer rules in the SEPTA rail data.

OSM-only routing was tested successfully, so the issue appears specific to the transit portion of the integration.
For this proof of concept, the integration between the React application, OpenTripPlanner, and SEPTA GTFS data was verified. The transit itinerary-routing issue is documented as a limitation requiring further investigation.

# Software Requirements
+ Operating System: Windows 11
+ Java: Java 26.0.2.1
+ OpenTripPlanner: 2.10.0
+ Node.js: 24.21.0
+ npm: 11.19.0
+ React: 19.2.8
+ MapLibre GL JS: 6.9.0
+ Vite: 8.3.0

# How to run React program
Clone the repository and install the dependencies:
npm install

Start the development server:
npm run dev

Then open the local URL provided by Vite in your browser.

# How to run OpenTripPlanner
Download OpenTripPlanner 2.10.0 and place the JAR file in a local otp directory.

The OTP directory also requires:
+ A Pennsylvania OpenStreetMap .osm.pbf file
+ SEPTA bus GTFS data
+ SEPTA rail GTFS data
This is not included because of large data size

From otp installed directory, Start OTP with: java -Xmx4G -jar otp-shaded-2.10.0.jar --build --serve .

Once OTP starts successfully, GraphQL can be accessed by: http://localhost:8080/graphiql
The React application can then be run separately with: npm run dev

The Test Transit API button in the application sends a GraphQL request to the locally running OpenTripPlanner server.


