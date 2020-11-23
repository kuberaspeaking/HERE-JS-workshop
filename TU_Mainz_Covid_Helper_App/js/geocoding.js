var selectedPosition;
var geocoder = platform.getSearchService();

function showStores(position){
    geocoder.browse({
        at: position.lat+','+position.lng,
        limit: 1,
        categories: '600-6300-0066'// supermarket 
      }, function(result) {
        let storePosition = result.items[0].position;
        let storeName = result.items[0].title;
        let storeMarker = new H.map.Marker(storePosition,{icon:groceriesIcon});
        storeMarker.setData(storeName);
        markerGroup.addObject(storeMarker);
        showRoute(position,storePosition,selectedPosition);
        // console.log(result);

    }, 
    function(error) {
        alert(error.message)
    });

}



async function showPosition(address){
    return new Promise((resolve, reject) => {
        geocoder.geocode({q:address},function(result){
            // console.log(result);
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
            // console.log("sent: "+address);
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
            showStores(myPosition);
            map.getViewModel().setLookAtData({
                bounds: markerGroup.getBoundingBox()
            });

        });
    }
}



function showPeople(){
fetch('../assets/peopleData.json')
.then(response => response.json())
.then(data =>{
    // console.log(data)})
    data.people.forEach(async person=>{
        let position = await showPosition(person.address);
        if(data.people.indexOf(person)==1){
            selectedPosition = position;   
        }
        // console.log(position);
        let peopleMarker = new H.map.Marker(position,{icon:seekerIcon});
        peopleMarker.setData(person.name+" wants "+person.list[0]+'<br/>'+person.list[1]+'<br/>'+person.list[2]);
        markerGroup.addObject(peopleMarker);
        map.getViewModel().setLookAtData({
            bounds: markerGroup.getBoundingBox()
        });
    });
});
}
showMyAddress();
showPeople();