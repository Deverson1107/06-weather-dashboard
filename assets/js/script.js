$(".current-box").hide();

$(".search").on("click", function() {
    var subject = $(".subject").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=3c34658c8e0e9fdb71064b81293a3704";
    var queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?q=" + subject + "&appid=3c34658c8e0e9fdb71064b81293a3704";
    var lat;
    var lon;
    $(".current-box").show();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        lat = response.coord.lat;
        lon = response.coord.lon;
        console.log(response);
        $(".current-city").text(response.name);
        var currentTemp = response.main.temp * (9/5) - 459.67;
        $(".current-temp").text("Temperature: " + currentTemp.toFixed(1) + " °F");
        $(".current-hum").text("Humidity: " + response.main.humidity + "%");
        $(".current-wind").text("Wind Speed: " + response.wind.speed + " MPH");
        queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=3c34658c8e0e9fdb71064b81293a3704&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            $(".current-uv").text("UV Index: " + response[0].value);
        })
    })

    $.ajax({
        url: queryURL2,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $(".forecast-banner").prepend("<h2 class='col-12'>5-Day Forecast:</h2>");
        var forecastTimes = response.list;
        for (i = 0; i < forecastTimes.length; i++) {
            if (forecastTimes[i].dt_txt[12] === "2") {
                var forecastTemp = forecastTimes[i].main.temp * (9/5) - 459.67;
                var forecastHum = forecastTimes[i].main.humidity;
                $(".forecast-list").append("<div class='my-3 col-2'> <div class='card'> <h5>" +
                "Date" + "</h5> <div>Temp: " + forecastTemp.toFixed(1) + " °F" + "</div><div>Humidity: " +
                forecastHum + "%</div></div></div>");
            }
        }
    })
});
         