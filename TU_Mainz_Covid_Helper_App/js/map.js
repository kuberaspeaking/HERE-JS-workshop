// Step 1: initialize the HERE map platform
// IMPORTANT: Replace the apikey with your own from developer.here.com
var platform = new H.service.Platform({
    apikey: window.hereApiKey
  });

// This map is centered on the HERE office in Berlin using the default map style
var mapCenter = {lat: 52.53087, lng: 13.38473};
var defaultLayers = platform.createDefaultLayers();
  
// Step 2: Initialize the map in the "map" div
  
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
  center: mapCenter,
  zoom: 19,
  pixelRatio: window.devicePixelRatio || 1
});
    
// Step 3: Enable the event system and add default interactions (e.g., zoom)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Step 4: Create the default UI components (e.g., zoom buttons)
var ui = H.ui.UI.createDefault(map, defaultLayers);

// add a HERE logo as a Marker Icon
var hereIcon = new H.map.Icon('assets/HERE_Logo.png');

// add center and icon to Marker
var hereMarker = new H.map.Marker(mapCenter,
  {
    icon: hereIcon
  });
// add marker to map
map.addObject(hereMarker);