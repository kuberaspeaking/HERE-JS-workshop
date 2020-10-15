# Select the Restaurant number 5 in the list for delivery
- The numbering here is from 0 to 99 so the 5th restaurant will be number 4

## Add the following code after ```map.addObject(restGroup);``` within the '}' in the previous step

```javascript
    let deliveryRestPosition = response.items[4].position;
    showRoute(deliveryRestPosition);

```
# Get Route from the selected restaurant to your home with a car

Add the following code before </script> tag

```javascript
       function showRoute(restPos){

            // console.log(restPos);

            let routingParameters = {
                // The routing mode:
                mode: 'fastest;car;traffic:enabled',
                // The start point of the route:
                waypoint0: restPos.lat+','+restPos.lng ,
                // The end point of the route:
                waypoint1: myPosition.lat+','+myPosition.lng,
                // To retrieve the shape of the route we choose the route
                // representation mode 'display'
                representation: 'display',

                routeattributes : 'summary,shape',

                language: "en-US"

                };

            router.calculateRoute(routingParameters, onResult,
                function(error) {
                    alert(error.message);
            });    
        }

```
# Draw the route received form the Routing API using Polyline
Add the following code before </script> tag

```javascript
        // Define a callback function to process the routing response:
        var onResult = function(result) {
            var route,
                routeShape,
                startPoint,
                endPoint,
                linestring;
            if(result.response.route) {
                // Pick the first route from the response:
                let route = result.response.route[0];
                // Pick the route's shape:
                routeShape = route.shape;

                // Create a linestring to use as a point source for the route line
                linestring = new H.geo.LineString();

                // Push all the points in the shape into the linestring:
                routeShape.forEach(function(point) {
                    var parts = point.split(',');
                    linestring.pushLatLngAlt(parts[0], parts[1]);
                });

                // Create a polyline to display the route:
                var routeLine = new H.map.Polyline(linestring, {
                    style: { strokeColor: 'RGB(116, 66, 200)', lineWidth: 7 }
                });
                // Add the route polyline and the two markers to the map:
                map.addObject(routeLine);
                
                // Set the map's viewport to make the whole route visible:
                map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
            }
        };
            
```
[![Foo](img/s4.png)](Step4.md) 
