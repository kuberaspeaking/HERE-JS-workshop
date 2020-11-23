var geocoder = platform.getSearchService();
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
        console.log(result);
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

async function showPosition(address){
    return new Promise((resolve, reject) => {
        geocoder.geocode({q:address},function(result){
            console.log(result);
            resolve(result.items[0].position)
        }, 
        function(error){
            reject(error.message)
        });
    });
} 

async function findAddress(position){
    // var address;
    return new Promise((resolve, reject) => {
        geocoder.reverseGeocode({
            at: position.lat+','+position.lng
          }, 
          function(result) {
            address = result.items[0].address.label;
            console.log("sent: "+address);
            resolve(address)
        }, 
        function(error) {
            reject(error.message)
        });
        // Service.geocoder(params, function (result){ resolve(address) });
        });
    
    // return address
}

function showMyAddress(){
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            // set maker position using the latitude and longitude in the received position
            myPosition = {lat:position.coords.latitude,lng:position.coords.longitude};
            //  create makrker element using the received position
            posMarker = new H.map.Marker(myPosition,{icon: helperIcon});
            let address = await findAddress(myPosition);
            // console.log("received: "+address);
            posMarker.setData(address);
            //  Add marker to map.
            markerGroup.addObject(posMarker);
            showIsoline(myPosition);
            map.getViewModel().setLookAtData({
                bounds: markerGroup.getBoundingBox()
            });

        });
    }
}



async function showPeople(){
fetch('../assets/peopleData.json')
.then(response => response.json())
.then(data =>{
    // console.log(data)})
    data.people.forEach(async person=>{
        let position = await showPosition(person.address);
        // console.log(position);
        let peopleMarker = new H.map.Marker(position,{icon:seekerIcon});
        peopleMarker.setData(person.name+" wants "+person.list[0]+'<br/>'+person.list[1]+'<br/>'+person.list[2]);
        markerGroup.addObject(peopleMarker);
        map.getViewModel().setLookAtData({
            bounds: markerGroup.getBoundingBox()
        });
    });
})
}
showMyAddress();
showPeople();