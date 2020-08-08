var searchBtn = $("#searchBtn");

searchBtn.on("click", function(event) {
    var button = $(this);
    console.log(button); //working

    var btnData = $(this).attr("#searchInput");
    console.log(btnData);

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