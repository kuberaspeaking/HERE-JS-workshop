## Download the ide [VSCODE](https://code.visualstudio.com/download)
## Install the extension Live Server by Ritwick Dey
This makes it super easy to see your application on your browser.

![Live Server Extension](img/live_server.png) 

## Create a folder named Food_Delivery_With_HERE
- In VSCODE click on File > Open.. 
- Open the folder Food_Delivery_With_HERE
- Click on File > New File and save it as 'index.html' within the folder

## Copy the code below in the file 'index.html'

``` html
<!DOCTYPE html>
<html>
    <head>
        <title>HERE Logistics Workshop</title>
        <!-- SCRIPTS -->
        <meta name="viewport" charset="UTF-8" content="initial-scale=1.0, width=device-width" />
        <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-core.js"></script>
        <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-service.js"></script>
        <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-ui.js"></script>
        <script type="text/javascript" src="https://js.api.here.com/v3/3.1/mapsjs-mapevents.js"></script>
        <link rel="stylesheet" type="text/css" href="https://js.api.here.com/v3/3.1/mapsjs-ui.css"/>
    </head>
    <body>
        <h1 style="text-align: center;">Food Delivery with HERE</h1>
        <div id="mapContainer" style="width: 80vw; height: 50vh; background: #39B6B3; display: block; margin: 0 auto; border: solid 2px black; margin-top: 100px;" > </div>
        <div style="width: 100vw; height: 40px; margin-top: 30px;">
            <input type="button" onclick="showDeliveryRest()" value = "Show Restaurants" style="width: 200px; height: 30px; border: 2px solid black; display: block; margin: 0 auto; margin-top: 20px;">
        </div>
        <div id="panel" style="width: 30vw; background: #39B6B3; color: white; margin-top: 20px;display: block; margin: 0 auto;"></div>
        
    </body>
    <script>
        var platform = new H.service.Platform({
            apikey: "YOUR_JS_API_KEY"   
        });

        // Obtain the default map types from the platform object:

        var defaultLayers = platform.createDefaultLayers();

        // Get your current position from wego.here.com
        
        var myPosition = {lat: 52.53007, lng: 13.38526};

        // Instantiate (and display) a map object:

        var map = new H.Map(
            document.getElementById('mapContainer'),
            defaultLayers.vector.normal.map,
            {
                zoom: 11,
                center: myPosition
            });

        var ui = H.ui.UI.createDefault(map, defaultLayers, 'en-US');

        var mapEvents = new H.mapevents.MapEvents(map);

        var behavior = new H.mapevents.Behavior(mapEvents);

        // Get an instance of the routing service for using the routing API

        var router = platform.getRoutingService();

        // Get an instance of the geocoding and search service:

        var service = platform.getSearchService();
    </script>
</html>
```

# Changing the language of the map
- To change the language, change the 'en-US' to the language code you want:
- en-US – English (United States)
- de-DE – German
- es-ES – Spanish
- fi-FI – Finnish
- fr-FR – French
- it-IT – Italian
- nl-NL – Dutch
- pl-PL – Polish
- pt-BR – Portuguese (Brazil)
- pt-PT – Portuguese (Portugal)
- ru-RU – Russian
- tr-TR – Turkish
- zh-CN – Chinese (China)

# Adding a position marker using map object of Interactive maps API
- Add a folder named img inside the folder Food_Delivery_With_HERE
- Inside the folder img, save the image you want as the icon for restaurants and home
- You can also download the ones I used for [home](img/home.png) and [restaurants](img/takeout.png)
- Add the following code before </script> tag


```javascript
            // create an icon for the marker. Choose any image you want. I created mine using draw.io 
            
            var homeIcon = new H.map.Icon('img/home.png'); 
            
            var posMarker = new H.map.Marker(myPosition,{icon:homeIcon});
                
            // Add the marker to the map 

        map.addObject(posMarker);
```
### Click on the 'Go Live' button on the bottom right of your VSCODE application window and see your application open in your default browser

[![Foo](img/s2.png)](Step2.md) 


