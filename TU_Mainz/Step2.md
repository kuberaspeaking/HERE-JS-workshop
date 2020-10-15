# Geocode stores sellings Christmas trees using Geocoder API
Add the following code before </script> tag
```javascript
      // Get an instance of the geocoding service:
      var geocoder = platform.getGeocodingService();

      // Add list of stores (Altyernatively can use JSON file stored online or batch geocoder)

      let storeList = [
        "BAUHAUS Mainz-Mombach, Rheinallee 128, 55120 Mainz",
        "Hornbach Mainz Bretzenheim, Am Schleifweg 5, 55128 Mainz",
        "Toom Nieder-Olm, Am Hahnenbusch 33, 55268 Nieder-Olm",
        "REWE Supermärkte Mainz, Neubrunnenplatz, 55116 Mainz",
        "REWE Supermärkte Mainz, Adam-Karrillon-Str. 23A, 55118 Mainz",
        "Rheinallee 64, 55120 Mainz",
        "Neubrunnenplatz, 55116 Mainz",
        "Haifa Allee 42, 55116 Mainz",
        "Alfred-Delp-Str. 64, 55122 Gonsenheim",
        "Töngesstraße 22, 55129 Ebersheim",
        "Kurmainzstr. 14, 55126 Finthen",
        "Im Wald 16, 55257 Budenheim",
        "Mainzerstrasse, 41, 65462 Ginsheim-Gustavsburg",
        "Boelckestraße 135, 55252 Wiesbaden"
      ];
      // Define a callback function to process the geocoding response:
      var onResult = function(result) {
        var locations = result.Response.View[0].Result,
            position,
            marker;
        // Add a marker for each location found
          position = {
            lat: locations[0].Location.DisplayPosition.Latitude,
            lng: locations[0].Location.DisplayPosition.Longitude
          };
          marker = new H.map.Marker(position);
          map.addObject(marker);
        
      };

      function buyXmasTrees(){
        for (var list = 0; list < storeList.length; list++){
          geocoder.geocode({searchText: storeList[list]}, onResult, function(e) {alert(e);})
        };
      };

      buyXmasTrees();
```
</br> Double-click on saved file to view on browser

[![Foo](img/s3.png)](Step3.md) 

