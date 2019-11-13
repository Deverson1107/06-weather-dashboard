$(".search").on("click", function() {
    var subject = $("#subject").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + subject + "&appid=3c34658c8e0e9fdb71064b81293a3704";
    var lat;
    var lon;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        lat = response.coord.lat
        lon = response.coord.lon
        queryURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?&appid=3c34658c8e0e9fdb71064b81293a3704&lat=" + lat + "&lon=" + lon
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            console.log(response[0].value)
        })
    })
    });
         