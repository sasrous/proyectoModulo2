


const apikey = 'PxrJ1AnxJlC6uT7i';


"https://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={your_api_key}";



// var location = user.profile.address;

// const metroAreaurl = `https://api.songkick.com/api/3.0/search/locations.json?query=${location}&apikey=${apikey}`

function getMetroArea(location) {
   axios.get(`https://api.songkick.com/api/3.0/search/locations.json?query=${location}&apikey=${apikey}`)
  .then((response) => {
    
    var metroarea = response.data.resultsPage.results.location[0].metroArea.id
    function getApiEvents(id) {
 
      axios.get(`https://api.songkick.com/api/3.0/metro_areas/${metroarea}/calendar.json?apikey=${apikey}`)
      .then((response) => {
 
        eventsArray = response.data.resultsPage.results.event
        sortApiData(eventsArray);
      })
    }
    getApiEvents(metroarea);


  });
}




function sortApiData(data) {
  if (document.getElementsByClassName("eventWrapper")){
    for (i=0; i<data.length ; i++){

      var displayName = data[i].displayName;
      var artist = data[i].performance[0].artist.displayName;
      var eventId = data[i].id;
      var id = eventId;
      var url = data[i].uri;
      var date = data[i].start.date;
      var time = data[i].start.time;
      var place = data[i].venue.displayName;


      $(".eventWrapper" ).append( "<div class = 'eventBlock'>" +
      "<h1 class='displayName' >"+displayName+"</h1>"+
      "<p class='artist' > Artist: "+artist+"</p>"  +
      "<p class='time' > Time: "+time+" h</p>"+
      "<p class='place' > Place: "+place+" </p>" +
      "<a class='link' href='lobby/event/"+ id + "'> DETAILS </a>" 

      
      + "</div>"


    
    );

    }
  }
}
if (document.getElementById("eventid")){
var event_id = document.getElementById("eventid").innerHTML;

  axios.get(`https://api.songkick.com/api/3.0/events/${event_id}.json?apikey=PxrJ1AnxJlC6uT7i`)
   .then((response) => {

    var displayName = response.data.resultsPage.results.event.displayName;
    document.getElementById("displayName").innerHTML = displayName
    var url = response.data.resultsPage.results.event.uri
    $(".url").append(`<button class="url btn btn-default btn-sm" href="${url}"> BUY TICKETS </button>` )
    var artistsArray = response.data.resultsPage.results.event.performance
    if (artistsArray.length> 1){
    for (i=0; i< artistsArray.length; i++){
      $(".artists").append(`<h3 class="artistsInfo1">${artistsArray[i].billing} :</h3>
      <h2 class="artistsInfo2">${artistsArray[i].artist.displayName} </h2> 
      <a href="${artistsArray[i].artist.uri}">KNOW MORE </a> `)
    }}
    else {
      $(".artists").append(`
      <h2 class="artistsInfo2">${artistsArray[0].artist.displayName} </h2> 
      <a href="${artistsArray[0].artist.uri}">KNOW MORE </a> `)
    };
    var locationCity = response.data.resultsPage.results.event.location.city;
    var venueName = response.data.resultsPage.results.event.venue.displayName;
    var venueUrl = response.data.resultsPage.results.event.venue.website;
    var venueLat = response.data.resultsPage.results.event.venue.lat;
    var venueLng = response.data.resultsPage.results.event.venue.lng;
    $(".locationWrapper").append(`
      <h3> ${venueName}, ${locationCity} </h3>
      <a href="${venueUrl}">website</a>
    `)
    $(".join_btn").append(`
    <br><form action="/lobby/event/${event_id}/submit" enctype="multipart/form-data" method="POST">
  <button type="submit" class="btn btn-warning btn-lg">JOIN</button>
</form>`)
   


   // MAPBOX
   mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fzcm91cyIsImEiOiJjamthMWVlYjMwaGR5M3F0NHZpMGhrOGM2In0.AnhPlCGlJIovaEzHuWr59Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [2.17517, 41.38054],
    maxZoom: 16,
    minZoom: 9,
    zoom: 9.68
});

var title = document.getElementById('location-title');
var description = document.getElementById('location-description'); 

    var locations = [{
      "id": "2",
      "camera": {
          center: [venueLng, venueLat],
          zoom: 32.21,
          pitch: 50
      }
  
  }];
  

  
  function playback(index) {
      

  
      // Animate the map position based on camera properties
      map.flyTo(locations[index].camera);
  
      map.once('moveend', function() {
          // Duration the slide is on screen after interaction
          window.setTimeout(function() {
              // Increment index
              index = (index + 1 === locations.length) ? 0 : index + 1;
              playback(index);
          }, 3000); // After callback, show the location for 3 seconds.
      });
  }
  
  
  map.on('load', function() {
  
      
      // Start the playback animation for each borough
      playback(0);
  });


  });
}


//  google.load('search', '1');

//  var imageSearch;


//  function searchComplete() {

//    // Check that we got results
//    if (imageSearch.results && imageSearch.results.length > 0) {

//      // Grab our content div, clear it.  
//      var contentDiv = document.getElementById('content');
//      contentDiv.innerHTML = '';

//      // Loop through our results, printing them to the page.
//      var results = imageSearch.results;
//      for (var i = 0; i < results.length; i++) {
//        // For each result write it's title and image to the screen
//        var result = results[i];
//        var imgContainer = document.createElement('div');
//        var title = document.createElement('div');
      
//        // We use titleNoFormatting so that no HTML tags are left in the 
//        // title
//        title.innerHTML = result.titleNoFormatting;
//        var newImg = document.createElement('img');

//        // There is also a result.url property which has the escaped version
//        newImg.src="/image-search/v1/result.tbUrl;"
//        imgContainer.appendChild(title);
//        imgContainer.appendChild(newImg);

//       // Put our title + image in the content
//       contentDiv.appendChild(imgContainer);
//     }

//      // Now add links to additional pages of search results.
//      addPaginationLinks(imageSearch);
//    }
//  }
//  function OnLoad() {
      
// //   // Create an Image Search instance.
//    imageSearch = new google.search.ImageSearch();

// //   // Set searchComplete as the callback function when a search is 
// //   // complete.  The imageSearch object will have results in it.
//    imageSearch.setSearchCompleteCallback(this, searchComplete, null);

//    // Find me a beautiful car.
//    imageSearch.execute("Subaru STI");
  
//    // Include the required Google branding
//    google.search.Search.getBranding('branding');
//  }
// google.setOnLoadCallback(OnLoad);






