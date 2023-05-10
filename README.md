# leaflet-challenge
Module 15 submission for UC Berkeley data science bootcamp.

## Background
The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. In this challenge, you have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

## Procedure
### Part 1: Create the Earthquake Visualization

1. Retrieve a dataset.
    - The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the USGS GeoJSON FeedLinks to an external site. page and choose a dataset to visualize.
    - We have chosen to consider "All Earthquakes from the Past 7 Days". The data is delivered in JSON format at the following URL: [https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson).

2. Import and visualize the data:
    - Using Leaflet.js, create a map that plots all the earthquakes from the dataset based on their longitude and latitude.
        - Data markers should reflect the magnitude of the earthquake by their size and the depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger, and earthquakes with greater depth should appear darker in color.
        - The depth of the earth can be found as the third coordinate for each earthquake.
    - Include popups that provide additional information about the earthquake when its associated marker is clicked.
    - Create a legend that will provide context for your map data.

### Part 2: Gather and Plot More Data
Plot a second dataset on the map to illustrate the relationship between tectonic plates and seismic activity. This dataset should be pulled in and visualized alongside the original data from Part 1. Data on tectonic plates can be found at [https://github.com/fraxen/tectonicplates](https://github.com/fraxen/tectonicplates).
    - Plot the tectonic plates dataset on the map in addition to the earthquakes.
    - Add other base maps to choose from.
    - Put each dataset into separate overlays that can be turned on and off independently.
    - Add layer controls to your map.