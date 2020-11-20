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

var markerGroup = new H.map.Group();
map.addObject(markerGroup);

// add a HERE logo as a Marker Icon
var hereIcon = new H.map.Icon('assets/HERE_Logo.png');
// add a marker Icon to show your position 
var helperIcon = new H.map.Icon('assets/helper.png');
// add a marker Icon to show help seeker's position 
var seekerIcon = new H.map.Icon('assets/seeker.png');

// add center and icon to Marker
var hereMarker = new H.map.Marker(mapCenter,
  {
    icon: hereIcon
  });
// add marker to map
markerGroup.addObject(hereMarker);

map.addEventListener('tap', function(evt) {
  if(evt.target instanceof H.map.Marker){
      var bubble =  new H.ui.InfoBubble(evt.target.getGeometry(), {
      // read custom data
      content: evt.target.getData()
      });
      // show info bubble
      ui.addBubble(bubble);
  }        
});