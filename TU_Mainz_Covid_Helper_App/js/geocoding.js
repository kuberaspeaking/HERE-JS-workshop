var geocoder = platform.getSearchService();

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
            map.getViewModel().setLookAtData({
                bounds: markerGroup.getBoundingBox()
            });

        });
    }
}




function showPeople(){

}


showMyAddress();