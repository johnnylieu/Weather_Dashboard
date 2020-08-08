var searchBtn = $("#searchBtn");
var savedLocations = [];

// when clicking the search button, should grab data and push to local storage
searchBtn.on("click", function(event) {
    event.preventDefault();
    var button = $(this);
    console.log(button); //working

    var city = $("#searchInput").val().trim();
    console.log(city); // working, grabbing data from search form

    // localStorage.setItem(city); // needs second argument

    var noneYo = "8f775258afdec054195f89c38855f678"

    queryURL = "pro.openweathermap.org/data/2.5/forecast/hourly?id=" + city +"&appid=" + noneYo;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // currentLoc = response.name;
        // saveLoc(response.name);
        // getCurrent(currentLoc);
    });

});