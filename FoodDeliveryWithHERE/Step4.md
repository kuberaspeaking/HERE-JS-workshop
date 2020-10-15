
# Select instructions from the route to be displayed

## Add the following code before ''' map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()}); '''

```javascript

                let maneuver = route.leg[0].maneuver;
                let summary = route.summary;
                displayInstructions(maneuver,summary);

```

# Display these instructions in the "panel"
- Copy the following code above the ''' </script> ''' tag 

```javascript

         Number.prototype.toMMSS = function () {
            return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
        }

        function displayInstructions(maneuver,summary){

            var totalTravelTime = 0;
               
            for(let i=0; i< maneuver.length; i++){

                instructions = maneuver[i].instruction;
                // console.log(instructions)
                document.getElementById("panel").innerHTML+= ( i+1) + ') '+instructions +  `<br>`;

            }

            document.getElementById("panel").innerHTML+="Total distance : " + (summary.distance) + ' m' ;

            document.getElementById("panel").innerHTML+="Estimated time : " + summary.travelTime.toMMSS();
        }
```

[![Foo](/img/s5.png)](/Step5.md) 

