# HERE JavaScript Workshop for Intergeo 2019
Workshop using HERE APIs for Intergeo 2019

[Register here](http://developer.here.com/events/community-germany-intergeo19) for a free developer account</br>
# Generate apikey , app_id and app_code
![Folding in action](https://github.com/kuberaspeaking/Intergeo/blob/master/img/register.gif)

Please copy the starting HTML template below and paste into your your code editor.

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

