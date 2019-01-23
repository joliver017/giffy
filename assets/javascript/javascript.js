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
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RU65DZw7qnvqYSinQa9GLirT5CUivh5G&q=" + searchTerm + "&limit=25&offset=0&lang=en";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response)
         // $("#container").text(JSON.stringify(response))
          $("#container").append("<iframe src=" + response.data[0].embed_url + "width='480' height='252' frameBorder='0' class='giphy-embed' allowFullscreen>" + "</iframe>")
        })
      };
// <iframe src="https://giphy.com/embed/lXiRKBj0SAA0EWvbG" width="480" height="252" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    $(document).on("click", ".movie", displayGif);
    createButtons();

});