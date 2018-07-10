var gifArray = ["messi","ronaldo","klose","ronaldinho","kaka","ibrahimovic","neymar","iniesta","james rodriguez","marcelo","pele","higuita","bergkamp"];
var gifAnimations = [];
var gifStills = [];

function displayDaGifs(){

    $("#content").empty();
    gifAnimations = [];
    gifStills = [];
    var daGif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=soccer+" + daGif +  "&api_key=tJbS1XHGNapeI741lrud2BENgDuM7E76&limit=10";

    $.get(queryURL).then(function(parameter){

        console.log(parameter);

        for(var i = 0; i < parameter.data.length; i++){
            
            gifStills.push(parameter.data[i].images.fixed_height_still.url);
            $("#content").append('<img src=' + parameter.data[i].images.fixed_height_still.url + ' class="rounded mx-2 my-2 generated-gif" width=300px clicked=0 gif-index="' + i + '">');
            gifAnimations.push(parameter.data[i].images.fixed_height.url);
        }


    });
}

function animateGif() {
    var index = $(this).attr("gif-index");
    if($(this).attr("clicked") === "0") {
        $(this).attr("clicked",1);
        $(this).attr("src", gifAnimations[index]);

    } else {

        $(this).attr("clicked",0);
        $(this).attr("src", gifStills[index]);

    }

    

}

function setButtons() {
    $("#da-buttons").empty();
    for(var i = 0; i < gifArray.length; i++){
        $("#da-buttons").append('<button type="button" class="btn btn-info mx-2 my-2 player" data-name="' + gifArray[i] + '">'+ gifArray[i] + '</button>');
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var gifAdd = $("#gif-input").val().trim();

    // The movie from the textbox is then added to our array
    gifArray.push(gifAdd);

    // Calling renderButtons which handles the processing of our movie array
    setButtons();
});


$(document).on("click", ".player", displayDaGifs);
$(document).on("click", ".generated-gif", animateGif);

setButtons();