# HERE JavaScript Workshop for Intergeo 2019
Workshop using HERE APIs for Intergeo 2019

[Register here](http://developer.here.com/events/community-germany-intergeo19) for a free developer account</br>
# Generate apikey , app_id and app_code
![Folding in action](https://github.com/kuberaspeaking/Intergeo/blob/master/img/register.gif)

# Start coding!

Open your favourite IDE or a simple code editor like notepad or notepad++

Copy the code below into your editor.

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Smart Cities</title>
<!-- SCRIPTS -->
<meta name="viewport" charset="UTF-8" content="initial-scale=1.0, width=device-width" />
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
<script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
<link rel="stylesheet" type="text/css" href="http://js.api.here.com/v3/3.1/mapsjs-ui.css"/>
</head>
<body>
<div id="map" style="width: 100vw; height: 100vh; background: #39B6B3;" ></div> 
<script>
var platform = new H.service.Platform({
  apikey: "YOUR_APIKEY",
  useHTTPS: true
})

// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers()
var MyPos = {lat: 48.69429, lng: 9.1866}
// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById('map'),
  defaultLayers.vector.normal.map,
  {
    zoom: 11,
    center: MyPos
  })

var ui = H.ui.UI.createDefault(map, defaultLayers)

var mapEvents = new H.mapevents.MapEvents(map)

var behavior = new H.mapevents.Behavior(mapEvents)
</script>
</body>
</html>
```
# Save the file as HERE_JS_Workshop.html

Add the following code before </script> tag

```javascript
// create a marker object
posMarker = new H.map.Marker(MyPos)
// Add the marker to the map 
map.addObject(posMarker)
```
```javascript
function DisplayEV(){
  let params = {
    "app_id": "zAHKPiijsFrECICMz4D2",
    "app_code": "vandkZuWnOaO3NTdKnlGDg",
    "in":  MyPos.lat + ',' + MyPos.lng +";r=1000000",       // meters
    "cat": "EV-charging-station",
    "size": "500"
  }

  let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&')
  let url = 'https://places.api.here.com/places/v1/browse?' + query


  fetch(url, {
    "method": "GET"
  })
  .then(response => response.json())
  .then(response => {
    console.log(response)
    for (i=0; i < response.results.items.length; i++)
      {  
      // resultData[i] = response.results.items[i]
      newpos= {lat: response.results.items[i].position[0], lng: response.results.items[i].position[1]}
      addMarker(newpos)
      // printInfo()
      } 
  })
}
function addMarker(newpos,html){
  // var ev_icon = new H.map.Icon('EV.png')
  ev_marker = new H.map.Marker(newpos)
  map.addObject(ev_marker)
}

DisplayEV()
```
```javascript
function drawCircle()
{
var circle = new H.map.Circle(MyPos,5000)
map.addObject(circle)
}

drawCircle()
```
```javascript
var myLoc = MyPos.lat + ',' + MyPos.lng
var routingParams = {
  'mode': 'fastest;car;',
  'start': myLoc,
  'range': '600', // 10 (10x60secs) minutes of driving 
  'rangetype': 'time'
}

// Define a callback function to process the isoline response.
var onResult = function(result) {
  var center = new H.geo.Point(
    result.response.center.latitude,
    result.response.center.longitude),
  isolineCoords = result.response.isoline[0].component[0].shape,
  linestring = new H.geo.LineString(),
  isolinePolygon,
  isolineCenter

  // Add the returned isoline coordinates to a linestring:
  isolineCoords.forEach(function(coords) {
  linestring.pushLatLngAlt.apply(linestring, coords.split(','))
  })

  // Create a polygon and a marker representing the isoline:
  isolinePolygon = new H.map.Polygon(linestring)
//   isolineCenter = new H.map.Marker(center)

  // Add the polygon and marker to the map:
  map.addObject(isolinePolygon)

  // Center and zoom the map so that the whole isoline polygon is
  // in the viewport:
  map.getViewModel().setLookAtData({bounds: isolinePolygon.getBoundingBox()})
}

// Get an instance of the routing service:
var router = platform.getRoutingService()

// Call the Routing API to calculate an isoline:
router.calculateIsoline(
  routingParams,
  onResult,
  function(error) {
  alert(error.message)
  }
);

```
