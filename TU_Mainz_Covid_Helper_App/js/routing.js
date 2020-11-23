var router = platform.getRoutingService(null, 8);
function showRoute(position,storePosition,selectedPosition){
    var routingParameters = {
        'routingMode': 'fast',
        'transportMode': 'car',
        // The start point of the route:
        'origin': position.lat+','+position.lng,
        // the waypoint in the root:
        'via': storePosition.lat+','+storePosition.lng,
        // The end point of the route:
        'destination': selectedPosition.lat+','+selectedPosition.lng,
        // Include the route shape in the response
        'return': 'polyline'
      };

      // Define a callback function to process the routing response:
        var onResult = function(result) {
            // ensure that at least one route was found
            if (result.routes.length) {
            result.routes[0].sections.forEach((section) => {
                // Create a linestring to use as a point source for the route line
                let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
        
                // Create a polyline to display the route:
                let routeLine = new H.map.Polyline(linestring, {
                    style: { strokeColor: 'blue', lineWidth: 3 }
                });
        
               
        
                // Add the route polyline and the two markers to the map:
                map.addObject(routeLine);
        
                // Set the map's viewport to make the whole route visible:
                map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
            });
            }
        };

        router.calculateRoute(routingParameters, onResult,
            function(error) {
              alert(error.message);
            });

}


function showIsoline(position){
    let url = `https://isoline.router.hereapi.com/v8/isolines?`+
                `apiKey=${window.hereApiKey}`+
                `&transportMode=car`+
                `&range[type]=distance`+
                `&range[values]=10000`+ //distance in meters
                `&departureTime=2020-07-31T06:30:00`+
                `&origin=${position.lat},${position.lng}`;
    fetch(url)
    .then(result => result.json())
    .then(result=>{
        // console.log(result);
        result.isolines[0].polygons.forEach(polygon=>{

            let linestring = H.geo.LineString.fromFlexiblePolyline(polygon.outer);

            // Create a polyline to display the route:
            let routePolygon = new H.map.Polygon(linestring,{
            style: { 
                strokeColor: '#EC610E',
                fillColor:'rgba(245,176,134,0.4)',
                // strokeColor: lineColor[count],
                // fillColor:fillColor[count],
                lineWidth: 3 
            }
            });

            isolineGroups.addObject(routePolygon);
        });
    })
    .catch(error =>{
       console.log(error);
    })
}