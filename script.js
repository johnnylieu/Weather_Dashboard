var searchBtn = $("#searchBtn");
var savedLocations = []; // array for the searches user makes

//current day and time
$(document).ready(function() {
    $("#currentDate").append("<h1>" + (moment().format('dddd MMMM Do, YYYY, h:mm A')) + "</h1>");
});

// when clicking the search button, should grab data and push to local storage
searchBtn.on("click", function(event) {
    event.preventDefault();
    var button = $(this);
    console.log(button); // working

    var city = $("#searchInput").val().trim();
    console.log(city); // working, grabbing data from search form

    if (typeof(city) !== "undefined") {
        localStorage.setItem("city", city); //🤦‍♂️ ***each new search is overwriting previous search in localStorage, need to figure out how to store multiple cities in localStorage
        savedLocations.push(city);
        console.log(savedLocations); // working, searched locations are being pushed to the array so we can prepend later
    };

    $("#prevSearches").empty(); // working, this clears the searches before the for loop functions starts which will prevent duplicates from pre-pending
    for (var i = 0; i < savedLocations.length; i++) {
        $("#prevSearches").prepend("<p>" + (savedLocations[i]) + "</p>");
    };

    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // currentLoc = response.name;
        // saveLoc(response.name);
        // getCurrent(currentLoc);
        var rCity = response.city.name;
        console.log(rCity);

        var currentDate = response.list[0].dt_txt;
        console.log(currentDate);

        var rPopulation = response.city.population
        console.log(rPopulation);
    });

});

// pull from localStorage
// localStorage.getItem()