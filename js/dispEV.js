// Instantiate a map and platform object:
var platform = new H.service.Platform({
    apikey: "0yYGFqk_2tgidHXJOinNtRXEJ9alsy-6fWgr3BuOALI",
    useHTTPS: true
  });
  // Retrieve the target element for the map:
  var targetElement = document.getElementById('map');
  
  
  
  // Get default map types from the platform object:
  var defaultLayers = platform.createDefaultLayers();
  
  // Instantiate the map:
  var map = new H.Map(
    document.getElementById('map'),
    defaultLayers.vector.normal.map,
    {
    zoom: 10,
    center: { lat: 52.51, lng: 13.4 }
    });
  
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  var mapEvents = new H.mapevents.MapEvents(map);
  
  var behavior = new H.mapevents.Behavior(mapEvents);
  
  DisplayPubs();
  
  function DisplayPubs(){
    let params = {
      "app_id": "Ilng5dKKaVBPRfk4Olj5",
      "app_code": "W-DlT_lYkQq-mWDJMM-UCw",
      "in": "52.51,13.4;r=1000000",
      "cat": "ev-charging-station",
      "size": "1000"
    }
  
    let query = Object.keys(params)
               .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
               .join('&');
  
    let url = 'https://places.api.here.com/places/v1/browse?' + query
  
  
    fetch(url, {
      "method": "GET"
  })
  .then(response => response.json())
  .then(response => {
      // console.log(response);
      for (i=0; i < response.results.items.length; i++)
        {  
        newpos= {lat: response.results.items[i].position[0], lng: response.results.items[i].position[1]};
        addMarker(newpos);
        // name = response.results.items[i].title;
        
        // ui.addBubble(bubble);
  
        } 
  });
  };
  
  function addMarker(newpos){
    var ev_icon = new H.map.Icon('https://github.com/kuberaspeaking/Intergeo/blob/master/img/EV.png');
    ev_marker = new H.map.Marker(newpos,{icon:ev_icon});
    map.addObject(ev_marker);
  }
  
