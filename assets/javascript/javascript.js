$(document).ready(function () {
    var rappers = ["Kendrick Lamar", "J Cole", "Childish Gambino", "Drake", "Kid Cudi"]

  // This function gets the items in the rappers array and creates buttons on the screen by appending
  // It empties the div they are housed in every time so buttons are not repeated
  // It also adds "person" class
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

  // This function is what calls the GIPHY API using AJAX
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
        
        // This loop grabs the API's response data for rating and gif URL's (limit is currently 10)
        // When gif is appended, it adds gif, data-still and data-animate classes (these are used for on click function below)
          for (var i=0; i < response.data.length; i++) {
            $("#container").append("<p class='rating'>Rating: " + response.data[i].rating + "</p>");
            $("#container").append("<img src= '" + response.data[i].images.fixed_height_still.url + "' data-still='" + response.data[i].images.fixed_height_still.url + "' data-animate='" + response.data[i].images.fixed_height.url + "' data-state='still' class='gif'/>")
          }

        // This on click function is what plays/pauses the gif
          $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(this)

        // Each time an element with the gif class is clicked, if it's current class state = "still", it will change to "animate"
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

    
    // When the Add Person button is clicked, it will call this function
    // This function will take whatever is in the search input field and add it to the array
    // createButtons function is then called to show them on the screen
    $("#add-person").on("click", function(event) {
        event.preventDefault();
        
        var rapper = $("#search-input").val().trim();

      // If the search input field is empty, it will show an alert (this way empty buttons are not created)
        if ($("#search-input").val() == "") {
          alert("Please enter a name");
        }
        else {
          rappers.push(rapper);
          createButtons();
          $("#search-input").val("");
        }

      });
    
    // Each time anything on the document with the person class (which are the buttons) is clicked, it will call the displayGif function
    $(document).on("click", ".person", displayGif);
    createButtons();

   


});