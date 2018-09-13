

mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fzcm91cyIsImEiOiJjamthMWVlYjMwaGR5M3F0NHZpMGhrOGM2In0.AnhPlCGlJIovaEzHuWr59Q';
var map = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/sasrous/cjlzdb1al6a0s2sqk1bdzp0eh',
    center: [-79.4512, 43.6568],
    zoom: 13
});

var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
});

map.addControl(geocoder);

// After the map style has loaded on the page, add a source layer and default
// styling for a single point.
map.on('load', function() {
    map.addSource('single-point', {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": []
        }
    });

    map.addLayer({
        "id": "point",
        "source": "single-point",
        "type": "circle",
        "paint": {
            "circle-radius": 10,
            "circle-color": "#007cbf"
        }
    });

    // Listen for the `result` event from the MapboxGeocoder that is triggered when a user
    // makes a selection and add a symbol that matches the result.
    geocoder.on('result', function(ev) {
        map.getSource('single-point').setData(ev.result.geometry);
        console.log(ev.result.text);//search
        document.getElementById("search").innerHTML = ev.result.text;
        document.getElementById("region").innerHTML = ev.result.context[0].text;
        document.getElementById("country").innerHTML = ev.result.context[1].text;
        console.log(ev.result);
        console.log(ev.result);
        console.log(ev.result.context[0].text);//region
   
        console.log(ev.result.context[1].text);//country
   
        
        
    });
});