function initialize() {
          
          geocoder=new google.maps.Geocoder();
          latlng=new google.maps.LatLng(29.863, 77.894);
          var mapOptions = {
            center: latlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
            //ROADMAP, SATELLITE, HYBRID,TERRAIN
          };
          map = new google.maps.Map(document.getElementById("map_canvas"),
              mapOptions);
        }

      function loadScript() 
      {
      var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAiF9G1OqNo0AU5DF6-NlTFmDMlO13hsK8&libraries=places&sensor=false&callback=initialize";
        document.body.appendChild(script);
    }

    

  function codeAddress(address) {
      //var address = document.getElementById("wth").value;
      console.log(latlng);
      geocoder.geocode( { 'address': address,'latLng': latlng}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          $('#dock').toggle('400');
          console.log(results);
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }

var nearby=function()
{
  console.log('nearby called');
  var request = {
    location: latlng,
    radius: '500',
    keyword: $('#wth').val(),
    //types: ['store']
  };

  if(typeof marker!=="undefined"){marker.setMap(null)};

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
  //service.radarSearch(request, callback);
}

var details=function(place)
{
  service = new google.maps.places.PlacesService(map);
  var request={
    reference:place.reference
  };
  service.getDetails(request, showDetails);


}

j=0;
place={};

function callback(results, status, pagination) 
{
  
  
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("OK!");
    for (var i=0; i < results.length; i++) {
      place[j]= results[i];
      $('#dock ol').append("<li>"+results[i].name+"</li>");
      createMarker(results[i]);
      j++;
    }
    console.log(place);
    if(!!pagination){
      if (pagination.hasNextPage) {
        console.log(pagination.nextPage());}
      console.log(j);
      }
    showOptions(place);
   }
}

var createMarker=function(place)
{
 icon=new google.maps.MarkerImage(
              place.icon, new google.maps.Size(71, 71),
              new google.maps.Point(0, 0), new google.maps.Point(17, 34),
              new google.maps.Size(35, 35));
 marker = new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location,
          animation: google.maps.Animation.DROP
        });
}

function showDetails(result, status) 
{
  if (status == google.maps.places.PlacesServiceStatus.OK) 
    {
    console.log("OK!");
    console.log(result);
    $('#showcase .info').toggleClass('expand');
    if(typeof result.international_phone_number !== undefined){$('#showcase .info .phone').html(result.international_phone_number)}else{$('#showcase .info .phone').html('')};
    if(typeof result.website !== undefined){$('#showcase .info .website').html(result.website)}else{$('#showcase .info .website').html('')};
    html="";
    if(typeof result.reviews !== undefined){
    for(i in result.reviews){
      html+="<div class='review'>"+result.reviews[i].text+"</div><span class='author'>-"+result.reviews[i].author_name+"</span>";
    }
    $("#showcase .info .reviews").html(html);}
    }
    
  
}

k=0;
var showOptions=function(places){
  count=0;
  console.log("k="+k);  
  for(i in places){count++;}
  map.setCenter(places[k].geometry.location);
  map.setZoom(19);
  
  $("#dock").fadeOut(100);
  if($('#showcase').is(':hidden')){$('#showcase').fadeIn(100);}
  for (i in $("#showcase .info div"))console.log(this);
  $("#showcase").attr('ref',places[k].reference);
  $("#showcase .name").html(places[k].name);
  $("#showcase .vicinity").html(places[k].vicinity);
  $("#showcase .rating").html(places[k].rating);
  
}



window.onload = loadScript;