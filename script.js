var searchBtn = $("#searchBtn");
var geoLocBtn = $("#getLocation");
var savedLocations = []; // array for the searches user makes

// grabs user's location
geoLocBtn.on("click", function (event) {

    if (navigator.geolocation)
        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position);

            var geoLat = position.coords.latitude;
            var geoLon = position.coords.longitude;

    queryURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + geoLat + "&lon=" + geoLon + "&appid=8f775258afdec054195f89c38855f678&units=imperial";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        geoCity = response.name;
        console.log(geoCity);

        savedLocations.push(geoCity);
        console.log(savedLocations);
        localStorage.setItem("history", savedLocations);

        $("#prevSearches").empty(); // working, this clears the searches before the for loop functions starts which will prevent duplicates from pre-pending
        for (var i = 0; i < savedLocations.length; i++) {
        $("#prevSearches").prepend("<button class='searchedBtn' id='prevSearches' value=" + (JSON.stringify(savedLocations[i])) + ">" + (savedLocations[i]) + "</button>");

        currentW(geoCity);
        }
    });
});
});

//current day and time
$(document).ready(function () {
    $("#currentDate").append("<h2>" + (moment().format('dddd, MMMM Do')) + "</h2>");
});

// pulling from local storage
if (typeof (storedHistoryArray) !== "null") {
var storedHistory = localStorage.getItem("history");
console.log(storedHistory);
var storedHistoryArray = storedHistory.split(',');
console.log(storedHistoryArray);
for (var i = 0; i < storedHistoryArray.length; i++) {
    $("#prevSearches").prepend("<button class='searchedBtn' id='prevSearches' value=" + (JSON.stringify(storedHistoryArray[i])) + ">" + (storedHistoryArray[i]) + "</button>");
    savedLocations.push(storedHistoryArray[i]);

    $(".searchedBtn").on("click", function (event) { // click for searched history
        console.log($(this).val());
        currentW($(this).val());
    });
}
}

// when clicking the search button, should grab data and push to local storage
searchBtn.on("click", function (event) {
    event.preventDefault();
    var button = $(this);
    console.log(button); // working

    // $("#currentCity0").empty();
    // $("#currentIcon").empty();

    var city = $("#searchInput").val().trim();
    console.log(city); // working, grabbing data from search form

    // displayCity = response.name
    // console.log(response.name);

    if (typeof (city) !== "undefined") {
        savedLocations.push(city);
        localStorage.setItem("history", savedLocations);
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
            var temperature = $("<p>").text(((Math.floor(day.main.temp))) + "°F");
            var icons = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + day.weather[0].icon + ".png");
            var icon = day.weather[0].icon;
            var wind = $("<p>").text(((Math.floor(day.wind.speed) + " MPH")));
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
        $("#wind0").empty();
        $("#temp0").empty();
        $("#humidity0").empty();
        $("#currentIcon").empty();
        $("#currentCity0").empty();
        $("#currentIcon").empty();
        // currentLoc = response.name;
        // saveLoc(response.name);
        // getCurrent(currentLoc);
        var rCity = response.name;
        console.log(rCity);

        var country = response.sys.country;
        console.log(country);

        $("#currentCity0").append("<h1>" + rCity + ", " + country + "</h1>");

        var weatherDes = (response.weather[0].description);
        console.log(weatherDes);

        // clear sky background gif
        if (weatherDes === "clear sky") {
            $('body').css('background-image', 'url("clearsky.gif")');
        }

        if (weatherDes === "sand/ dust whirls") {
            $('body').css('background-image', 'url("dustwhirl.gif")');
        }

        if (weatherDes === "haze") {
            $('body').css('background-image', 'url("haze.gif")');
        }

        if (weatherDes === "fog") {
            $('body').css('background-image', 'url("fog.gif")');
        }

        if (weatherDes === "smoke") {
            $('body').css('background-image', 'url("smoke.gif")');
        }

        if (weatherDes === "overcast clouds") {
            $('body').css('background-image', 'url("overcastclouds.gif")');
        }

        // few clouds background gif
        else if (weatherDes === "few clouds") {
            $('body').css('background-image', 'url("fewclouds.gif")');
        }

        // scatter clouds background gif
        else if (weatherDes === "scattered clouds") {
            $('body').css('background-image', 'url("scatterclouds.gif")');
        }

        // broken clouds background gif
        else if (weatherDes === "broken clouds") {
            $('body').css('background-image', 'url("brokenclouds.gif")');
        }

        // shower rain background gif
        else if (weatherDes === "shower rain") {
            $('body').css('background-image', 'url("showerrain.gif")');
        }

        // rain background gif
        else if (weatherDes === "rain") {
            $('body').css('background-image', 'url("rain.gif")');
        }

        // thunderstorm background gif
        else if (weatherDes === "thunderstorm") {
            $('body').css('background-image', 'url("thunderstorm.gif")');
        }

        // snow background gif
        else if (weatherDes === "snow") {
            $('body').css('background-image', 'url("snow.gif")');
        }

        // mist background gif
        else if (weatherDes === "mist") {
            $('body').css('background-image', 'url("mist.gif")');
        };

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
            $("#uvIndex0").append($(`<p>UV Index: <span id="uv">${uvIndex}</span></p>`));
            if (uvIndex <= 3) {
                $("#uv").css({
                    "background-color": "green"
                });
            } else if (uvIndex >= 3 || uvindex <= 6) {
                $("#uv").css({
                    "background-color": "yellow"
                });
            } else if (uvIndex >= 6 || uvindex <= 8) {
                $("#uv").css({
                    "background-color": "orange"
                });
            } else {
                $("#uv").css({
                    "background-color": "red"
                });
            }
        });

        var currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        console.log(currentIcon);
        $("#currentIcon").prepend(currentIcon);

        var rTemp0 = Math.floor(response.main.temp);
        console.log(rTemp0); // working
        $("#temp0").prepend("<p>Temp: " + rTemp0 + "° F </p.>"); // working

        var wind = Math.floor(response.wind.speed);
        console.log(wind);
        $("#wind0").prepend("<p> Wind: " + wind + " MPH </p>");

        var rHum0 = response.main.humidity;
        console.log(rHum0);
        $("#humidity0").prepend("<p> Humidity: " + rHum0 + "</p>");

        fiveDayForecast(city);
    });
};