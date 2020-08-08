var searchBtn = $("#searchBtn");

// when clicking the search button, should grab data and push to local storage
searchBtn.on("click", function(event) {
    var button = $(this);
    console.log(button); //working

    var city = $("#searchInput").val().trim();
    console.log(city); // working, grabbing data from search form

    queryURL = "pro.openweathermap.org/data/2.5/forecast/hourly?id=" + btnData +"&appid=8f775258afdec054195f89c38855f678"
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // currentLoc = response.name;
        // saveLoc(response.name);
        // getCurrent(currentLoc);
    });

});