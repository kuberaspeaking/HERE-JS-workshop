


# Display EV Charging Stations using Places REST API
Add the following code before </script> tag
```javascript
function DisplayRest(){
  let params = {
    "app_id": "zAHKPiijsFrECICMz4D2",
    "app_code": "vandkZuWnOaO3NTdKnlGDg",
    "in":  MyPos.lat + ',' + MyPos.lng +";r=100000",       // meters
    "cat": "snacks-fast-food",
    "size": "500"
  }

  let query = Object.keys(params)
             .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
             .join('&')
  let url = 'https://places.api.here.com/places/v1/discover/explore?' + query


  fetch(url, {
    "method": "GET"
  })
  .then(response => response.json())
  .then(response => {
    console.log(response)
    // create a marker object
    for (i=0; i < response.results.items.length; i++)
      {  
      // resultData[i] = response.results.items[i]
      newpos= ({lat: response.results.items[i].position[0], lng: response.results.items[i].position[1]});
      addMarker(newpos)
      // printInfo()
      } 
  })
}
function addMarker(newpos,html){
  food_marker = new H.map.Marker(newpos);
  map.addObject(food_marker)
}

DisplayRest()
```
</br> Double-click on saved file to view on browser

[![Foo](https://github.com/kuberaspeaking/HERE-Beuth/blob/master/img/s3.png)](https://github.com/kuberaspeaking/HERE-Beuth/blob/master/Step3.md) 

