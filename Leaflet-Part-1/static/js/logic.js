// define the API URL
const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
var cs_min;
var cs_max;

// retrieve data from API
d3.json(url).then(data => {

    // assign the `features` array to a new variable once we have an API response
    let earthquakes = data.features

    // call a custom function that handles layering and popup binding
    createFeatures(earthquakes);

});

// define a function to appropriately scale earthquake magnitudes
// for visual presentation purposes, not mathematical accuracy
function markerSize(magnitude) {
    return magnitude ** 3;
}

function createFeatures(earthquakeData) {

    // we want to bind a popup with location information and time of occurrence to each quake marker
    function generatePopup(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><h4>Magnitude: ${feature.properties.mag}</h4><hr><p>${new Date(feature.properties.time)}</p`);
    };
    
    let cs_array = [];
    for (let i = 0; i < earthquakeData.length; i++) {
        cs_array.push(earthquakeData[i].geometry.coordinates[2] - 1)
    }
    
    cs_max = Math.max(...cs_array)
    cs_min = Math.min(...cs_array)

    c = chroma.scale(['green', 'yellow', 'orange', 'red']);

    // create the GeoJSON layer containing our earthquake features
    // and bind a popup to each feature
    var quakes = L.geoJSON(earthquakeData, {
        onEachFeature: generatePopup,
        pointToLayer: (feat, latlng) => {
            return L.circleMarker(latlng, {
                radius: markerSize(feat.properties.mag),
                color: c(feat.geometry.coordinates[2] / (cs_max / 10) ),
                weight: 1,
                opacity: 0.8,
                fillOpacity: 0.5
            })
        }
        })

    // visualize the output variable in the console
    // console.log(earthquakes)

    // send the newly created `quakes` layer to a function that will create the map
    createMap(quakes);
}

function createMap(quakes) {

    // create a street base layer
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // create a topographical base layer
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });
    
    // map both layers to a `baseMaps` object
    var baseMaps = {
        'Street Map': street,
        'Topographic Mp': topo
    };

    // map the GeoJSON layer we passed to this function to an `overlayMaps` object
    var overlayMaps = {
        Earthquakes: quakes
    };

    // create an output map with basic properties and initial layers to display
    var outputMap = L.map('map', {
        center: [37, -110],
        zoom: 5.5,
        layers: [
            street,
            quakes
        ]
    });

    // create layer control to allow the user to toggle
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(outputMap);

    // legend
    var legend = L.control({ position: "bottomleft" });

    let q = cs_max / 4;
    let h = cs_max / 2;
    let tq = 3 * cs_max / 4;

    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Earthquake Depth</h4>";
        div.innerHTML += "<h4>(m below sea level)</h4>";
        div.innerHTML += `<i style="background: ${c(cs_min)}"></i><span>${cs_min} to ${q}</span><br>`;
        div.innerHTML += `<i style="background: ${c(q)}"></i><span>${q} to ${h}</span><br>`;
        div.innerHTML += `<i style="background: ${c(h)}"></i><span>${h} to ${tq}</span><br>`;
        div.innerHTML += `<i style="background: ${c(tq)}"></i><span>${tq} to ${cs_max}</span><br>`;
        div.innerHTML += `<i style="background: ${c(cs_max)}"></i><span>${cs_max}+</span><br>`;
        
        return div;
    };

    legend.addTo(outputMap);

};