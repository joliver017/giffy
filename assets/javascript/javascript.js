$(document).ready(function () {
    var disneyMovies = ["Coco", "Toy Story", "Up", "Inside Out", "Big Hero 6"]


    function createButtons() {
        $("#buttonsDiv").empty();

        for (i=0; i < disneyMovies.length; i++) {
            var btn = $("<button>");
            btn.addClass("movie");
            btn.attr("data-name", disneyMovies[i]);
            btn.text(disneyMovies[i]);
            $("#buttonsDiv").append(btn);
        }

    };

    function displayGif() {
        var searchTerm = $(this).attr("data-name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=P4ydkWOBrq7IjD4grkWGBWusd2oTIfBI&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response)
          console.log(searchTerm)
          console.log(response.data[0].images.fixed_height.url)
         // $("#container").text(JSON.stringify(response))
          $("#container").prepend("<img src= '" + response.data[0].images.fixed_height.url + "' />")
        })
      };
// <iframe src="https://giphy.com/embed/lXiRKBj0SAA0EWvbG" width="480" height="252" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    $(document).on("click", ".movie", displayGif);
    createButtons();

});