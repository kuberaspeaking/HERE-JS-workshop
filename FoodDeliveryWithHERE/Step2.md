# Display Take-out restaurants around you using the Geocoder and Search REST API
Add the following code before </script> tag
```javascript
           
            function showDeliveryRest(){

                let param = {
                    at : myPosition.lat+','+myPosition.lng,
                    q: "restaurant",
                    categories: "100-1000-0003", // category Take Out and Delivery Only ,
                    // for more, got to https://developer.here.com/documentation/geocoding-search-api/dev_guide/topics-places/places-category-system-full.html
                    limit:100
                }; 

                service.browse(param,displayRestaurants,alert);
            }
```
</br> 

# Lets add nice markers to display these restaurants

Add the following code before </script> tag

```javascript
        function displayRestaurants(response){

            var takeOutIcon = new H.map.Icon('img/takeout.png');

            var restGroup = new H.map.Group();

            for(let i = 0; i<response.items.length; i++){
                let restPosition = response.items[i].position; 
              
                let data = response.items[i].title;
              
                let restMarker = new H.map.Marker(restPosition,{icon: takeOutIcon} );

                restGroup.addObject(restMarker);
            }

            map.addObject(restGroup);
        }

```

[![Foo](img/s3.png)](Step3.md) 

