import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, } from './jeepRoutes.js'

let mapOptions = {
  center:[14.65504,121.06871],
  zoom:15
}

// setup (1 lang muna ginawa ko sa driverNum)
let driverNum = 1;
let coordinates = [];
let markers = [];//(nakamap dito yung kada isang markers para pwedeng maremove at update)
for (let i=0; i<driverNum; i++){
  coordinates[i] = [];
}

let map = new L.map('map' , mapOptions);

function addMarker(map, coordinates, i) {
  markers[i] = new L.Marker(coordinates);
  markers[i].addTo(map);
}

//update lang sa marker, assuming na may bago nang coordinates
function updateMarker(map, coordinates, i){
  markers[i].remove(map);
  console.log(coordinates);

  markers[i] = new L.Marker(coordinates);
  markers[i].addTo(map);
}


function addRoutes(map) {
  var ikotRoute = L.polyline(ikotRoutePoints, {color: 'yellow'}).addTo(map);
  var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
  var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);

  var jeepRoutes = {
    "Ikot" : ikotRoute,
    "Ikot(Night)" : ikotEveningRoute,
    "Toki" : tokiRoute,
  }
  var layerControl = L.control.layers(null, jeepRoutes).addTo(map);

}

function displayMap() {
  let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  map.addLayer(layer);

  //set-up ng initial markers
  //nakahardcode dito yung coordinates ng marker[0], dapat iba bawat marker gamit yung coordinates[]
  for (let i=0; i<driverNum; i++){
    coordinates[0]=ikotEveningRoutePoints[0];
    console.log(coordinates[0]);
    console.log(coordinates[0]);
    addMarker(map, coordinates[i], i);
  }

  //update ng markers, infinite loop dapat pag may actual coordinates na
  for (let j=0; j<15; j++){
    for (let i=0; i<driverNum; i++){
      setInterval(updateMarker, 1000, map, ikotEveningRoutePoints[j+1], i);//eto yung di ko maintindihan kung panong delay ang gagawin
    }
  }

  addRoutes(map);

  map.on('click', function(ev){
    var latlng = map.mouseEventToLatLng(ev.originalEvent);
    console.log(latlng.lat + ', ' + latlng.lng);
  });

}



displayMap()



