$(document).ready(function() {

    /* var topics = ;*/

    var topics = ['Basketball', 'Baseball', 'Hockey', 'Golf', 'Rugby',
        'Football', 'Soccer', 'Food', 'Exercise', 'Running',
        'Dogs', 'Cats', 'Birds', 'Lebron James', 'Michael Jordan',
        'Allen Iverson', 'Comedy', 'Mike Epps', 'Kevin Hart', 'Bearnie Mac',
        'Martin Lawrence', 'Eddie Murphy', 'Richard Pryor', 'Movies',
        'Biking', 'Hiking', 'Skating', 'Surfing', 'Technology'];

    function displayImage(){
        console.log("INSIDE DISPLAY IMAGE FUNCTION")
        $("#displayImages").empty();
        var input = $(this).attr("topic");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=j4w8TJsX0yK5oLxGN0qNmBmibsqde85U&limit=10";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {
            console.log(response.data.toString());
            console.log(response.data.length)
            for(var j = 0; j < response.data.length; j++) {
                console.log(response.data[j].toString())
                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[j].images.original.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#displayImages").append(displayDiv);

            }
 

        });
    }

    function  changeImageStatus(){
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("data-state");
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }

    }


    /* This function will place buttons for each topic onto the screen */
    function renderButtons() {
        $("#btnSection").empty();

        for (var i = 0; i < topics.length; i++) {

            var newButton = $("<button>")
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")
            newButton.attr("topic", topics[i]);
            newButton.text(topics[i]);
            $("#btnSection").append(newButton);
        }
    }

    /* This is the action when the submit button next to add topic is click and
    adds the topic to our topic list and renders the buttons */
    $("#submitPress").on("click", function(event) {
        event.preventDefault();
        var newTopic = $("#userInput").val().trim();
        if (newTopic && /^[a-zA-Z]+$/.test(newTopic)){
            topics.push(newTopic);
        } else{
            alert ("Must Enter Valid Topic!")
        }

        console.log(topics);
        $("#userInput").val('');
        renderButtons();
    });

    renderButtons();

    $(document).on("click", "#input", displayImage);

    $(document).on("click", ".gif", changeImageStatus);

})
