var searchBtn = $("#searchBtn");
var savedLocations = []; // array for the searches user makes

// pull from localStorage
$("#prevSearches").val(localStorage.getItem(JSON.stringify("history"))); // local storage not retrieving

//current day and time
$(document).ready(function () {
    $("#currentDate").append("<h2>" + (moment().format('dddd MMMM Do')) + "</h2>");
});

// when clicking the search button, should grab data and push to local storage
searchBtn.on("click", function (event) {
    event.preventDefault();
    var button = $(this);
    console.log(button); // working

    $("#currentCity0").empty();

    var city = $("#searchInput").val().trim();
    console.log(city); // working, grabbing data from search form
    $("#currentCity0").append("<h1>" + city + "</h1>");
    // displayCity = response.name
    // console.log(response.name);

    if (typeof (city) !== "undefined") {
        localStorage.setItem("history", savedLocations);
        savedLocations.push(city);
        console.log(savedLocations); // working, searched locations are being pushed to the array so we can prepend later
    };

    $("#prevSearches").empty(); // working, this clears the searches before the for loop functions starts which will prevent duplicates from pre-pending
    for (var i = 0; i < savedLocations.length; i++) {
        $("#prevSearches").prepend("<button class='searchedBtn' id='prevSearches' value=" + (JSON.stringify(savedLocations[i])) + ">" + (savedLocations[i]) + "</button>");

        $(".searchedBtn").on("click", function (event) { // click for searched history
            console.log($(this).val());
            currentW($(this).val());
        });
    };
    currentW(city);

});

// five day forecast
function fiveDayForecast(city) {
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#upcomingForecast").empty();

        const dailyData = response.list.filter(reading => {
            return reading.dt_txt.includes("18:00:00")
        });
        console.log(dailyData);

        dailyData.forEach((day) => {
            var card = $("<div>").addClass("card");
            var cardContent = $("<div>").addClass("cardContent");
            var date = $("<h5>").text(new Date(day.dt_txt).toLocaleDateString());
            var temperature = $("<p>").text(day.main.temp + "°F");
            var icons = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png");
            var icon = day.weather[0].icon;
            var wind = $("<p>").text(day.wind.speed + " MPH");
            console.log(icon);

            cardContent.append(date, icons, temperature, wind);
            card.append(cardContent);
            $("#upcomingForecast").append(card);
        });
    })
};

// global function
function currentW(city) {
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#temp0").empty();
        $("#humidity0").empty();
        // currentLoc = response.name;
        // saveLoc(response.name);
        // getCurrent(currentLoc);
        var rCity = response.name;
        console.log(rCity);

        var latitude = response.coord.lat;
        var longitude = response.coord.lon;
        console.log(latitude, longitude); // working, grabbing latitude and longitude

        // UV Index
        uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=7e4c7478cc7ee1e11440bf55a8358ec3&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            $("#uvIndex0").empty();

            var uvIndex = response.value;
            console.log(uvIndex)
            $("#uvIndex0").append($("<p>").attr("class", "card-text").text("UV Index: " + uvIndex));
            if (uvIndex <= 3) {
                $(".card-text").css({"background-color": "green"});
            }
            else if (uvIndex >= 3 || uvindex <= 6) {
                $(".card-text").css({"background-color": "yellow"});
            }
            else if (uvIndex >= 6 || uvindex <= 8) {
                $(".card-text").css({"background-color": "orange"});
            }
            else {
                $(".card-text").css({"background-color": "red"});
            }
        });



        var rTemp0 = response.main.temp;
        console.log(rTemp0); // working
        $("#temp0").prepend("<p> Temperature " + rTemp0 + "° F</p>"); // working

        var rHum0 = response.main.humidity;
        console.log(rHum0);
        $("#humidity0").prepend("<p> Humidity: " + rTemp0 + "</p>");

        fiveDayForecast(city);
    });
};