var searchBtn = $("#searchBtn");
var savedLocations = []; // array for the searches user makes

// when clicking the search button, should grab data and push to local storage
searchBtn.on("click", function(event) {
    event.preventDefault();
    var button = $(this);
    console.log("button being clicked: " + button); // working

    var city = $("#searchInput").val().trim();
    console.log("searched: " + city); // working, grabbing data from search form

    if (typeof(city) !== "undefined") {
        localStorage.setItem("city", city); //🤦‍♂️ ***each new search is overwriting previous search in localStorage, need to figure out how to store multiple cities in localStorage
        savedLocations.push(city);
        console.log("saved searches array: " + savedLocations); // working, searched locations are being pushed to the array so we can prepend later
    };

    $("#prevSearches").empty(); // working, this clears the searches before the for loop functions starts which will prevent duplicates from pre-pending
    for (var i = 0; i < savedLocations.length; i++) {
        $("#prevSearches").prepend("<p>" + (savedLocations[i]) + "</p>");
    };

    var noneYo = "&appid=8f775258afdec054195f89c38855f678";

    queryURL = "https://pro.openweathermap.org/data/2.5/forecast/hourly?q=" + city + noneYo;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log("response: " + response);
        // currentLoc = response.name;
        // saveLoc(response.name);
        // getCurrent(currentLoc);
    });

});

// pull from localStorage
// localStorage.getItem()