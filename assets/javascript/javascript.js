$(document).ready(function () {
    var rappers = ["Kendrick Lamar", "J Cole", "Childish Gambino", "Drake", "Kid Cudi"]


    function createButtons() {
        $("#buttonsDiv").empty();

        for (i=0; i < rappers.length; i++) {
            var btn = $("<button>");
            btn.addClass("person");
            btn.attr("data-name", rappers[i]);
            btn.text(rappers[i]);
            $("#buttonsDiv").append(btn);
        }

    };

    function displayGif() {
        var searchTerm = $(this).attr("data-name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=P4ydkWOBrq7IjD4grkWGBWusd2oTIfBI&limit=10";

        $("#container").empty();

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response){
          console.log(response)
          console.log(searchTerm)
          console.log(response.data[0].images.fixed_height.url)

          for (var i=0; i < response.data.length; i++) {
            $("#container").append("<p class='rating'>Rating: " + response.data[i].rating + "</p>");
            $("#container").append("<img src= '" + response.data[i].images.fixed_height_still.url + "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' data-state='still' class='gif'/>")
          }

          $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(this)
    
          if (state === 'still') {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });
          
        })
      };

    

    $("#add-person").on("click", function(event) {
        event.preventDefault();
        
        var rapper = $("#search-input").val().trim();

        if ($("#search-input").val() == "") {
          alert("Please enter a name");
        }
        else {
          rappers.push(rapper);
          createButtons();
          $("#search-input").val("");
        }

      });

    $(document).on("click", ".person", displayGif);
    createButtons();

   


});