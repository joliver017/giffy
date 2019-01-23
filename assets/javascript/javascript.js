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

    createButtons();

});