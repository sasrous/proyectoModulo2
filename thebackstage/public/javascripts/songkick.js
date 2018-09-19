


const apikey = 'PxrJ1AnxJlC6uT7i';


"https://api.songkick.com/api/3.0/metro_areas/{metro_area_id}/calendar.json?apikey={your_api_key}";



// var location = user.profile.address;

// const metroAreaurl = `https://api.songkick.com/api/3.0/search/locations.json?query=${location}&apikey=${apikey}`

function getMetroArea(location) {
   axios.get(`https://api.songkick.com/api/3.0/search/locations.json?query=${location}&apikey=${apikey}`)
  .then((response) => {
    console.log(response.data.resultsPage.results.location[0].metroArea.id)
    var metroarea = response.data.resultsPage.results.location[0].metroArea.id
    function getApiEvents(id) {
 
      axios.get(`https://api.songkick.com/api/3.0/metro_areas/${metroarea}/calendar.json?apikey=${apikey}`)
      .then((response) => {
        console.log(response.data.resultsPage.results.event)
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

      var displayName = data[i].performance[0].artist.displayName;
      var eventId = data[i].performance[0].id;
      var date = data[i].start.date;
      var time = data[i].start.time;


      $(".eventWrapper" ).append( "<div class = 'eventBlock'>" + "<p class='eventId'>" +eventId+"</p>"+
      "<p class='displayName' >"+displayName+"</p>"+
      "<p class='date' > Date: "+date+"</p>" +
      "<p class='time' > Time: "+time+" h</p>" 

      
      
      
      + "</div>"


    
    
    
    );




      
     

    }
  }
}

getMetroArea('Munich');