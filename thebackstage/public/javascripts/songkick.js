


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
console.log(event_id);
  axios.get(`https://api.songkick.com/api/3.0/events/${event_id}.json?apikey=PxrJ1AnxJlC6uT7i`)
   .then((response) => {
    console.log(response, "hello")
    var displayName = response.data.resultsPage.results.event.displayName;
    document.getElementById("displayName").innerHTML = displayName
    var url = response.data.resultsPage.results.event.uri
    $(".url").append(`<a class="url" href="${url}"> BUY TICKETS </a>` )
    var artistsArray = response.data.resultsPage.results.event.performance
    for (i=0; i< artistsArray.length; i++){
      $(".artists").append(`<h3 class="artistsInfo1">${artistsArray[i].billing} :</h3>
      <h2 class="artistsInfo2">${artistsArray[i].artist.displayName} </h2> 
      <a href="${artistsArray[i].artist.uri}">KNOW MORE </a> `)
    }
    var locationCity = response.data.resultsPage.results.event.location.city;
    var venueName = response.data.resultsPage.results.event.venue.displayName;
    var venueUrl = response.data.resultsPage.results.event.venue.website;
    $(".locationWrapper").append(`
      <h3> ${venueName},${locationCity} </h3>
      <a href="${venueUrl}">website</a>
    `)
    
   


  });
}


// function details(id){
//   axios.get(`https://api.songkick.com/api/3.0/events/${id}.json?apikey=PxrJ1AnxJlC6uT7i`)
//   .then((response) => {
//     console.log(response)


//   });

// }
// const  eventid  = req.params;
// details(eventid.eventid);