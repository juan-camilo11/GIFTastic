var gifArray = ["messi","ronaldo","klose","ronaldinho","kaka","ibrahimovic","neymar","iniesta","james rodriguez","marcelo","pele","higuita","bergkamp","beckenbauer","maradona","rivaldo","thierry henry","puyol","xavi","rooney","sergio ramos"];
var gifAnimations = [];
var gifStills = [];
var extraCounts = 0; //I will use this variable to keep track of how many times the add gifs button is clicked and use it to 
//offset the query


function displayExtraGifs(){

    extraCounts = extraCounts + 10;
    var disGif = $(this).attr("data-name");
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=soccer+' + disGif +  '&api_key=tJbS1XHGNapeI741lrud2BENgDuM7E76&limit=' + (10 + extraCounts) + '"';
    $.get(queryURL).then(function(parameter){
        var figureHold = "";

        for(var i = extraCounts; i < (parameter.data.length); i++){

            gifStills.push(parameter.data[i].images.fixed_height_still.url);
            figureHold = $('<figure class="figure mx-2 my-2">')
            figureHold.append('<img src=' + parameter.data[i].images.fixed_height_still.url + ' class="figure-img rounded generated-gif" width=300px clicked=0 gif-index="' + i + '">');
            figureHold.append('<figcaption class="figure-caption text-center">Rating: ' + parameter.data[i].rating + '</figcaption>');
            $("#content").append(figureHold);
            gifAnimations.push(parameter.data[i].images.fixed_height.url);
            figureHold = null;

        
        }


    });



}


function displayDaGifs(){

    extraCounts = 0;
    $("#content").empty();
    $("#add-more").empty();
    gifAnimations = [];
    gifStills = [];
    var daGif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=soccer+" + daGif +  "&api_key=tJbS1XHGNapeI741lrud2BENgDuM7E76&limit=10";

    $.get(queryURL).then(function(parameter){

        console.log(parameter);
        var figureHold ="";

        for(var i = 0; i < parameter.data.length; i++){
            
            gifStills.push(parameter.data[i].images.fixed_height_still.url);
            figureHold = $('<figure class="figure mx-2 my-2">')
            figureHold.append('<img src=' + parameter.data[i].images.fixed_height_still.url + ' class="figure-img rounded generated-gif" width=300px clicked=0 gif-index="' + i + '">');
            figureHold.append('<figcaption class="figure-caption text-center">Rating: ' + parameter.data[i].rating + '</figcaption>');
            $("#content").append(figureHold);
            gifAnimations.push(parameter.data[i].images.fixed_height.url);
            figureHold = null;
        }

        //stopped here. going to include a button that adds 10 more GIFs under the same category the user is currently on
        //probably going to set counts on how many times this button is pressed in order to pull 10 additional gifs as opposed to just 
        //pulling the same gifs that are already being displayed. Can probably use offset term at the end of queryURL
        $("#add-more").append('<button type="button" class="btn btn-info my-2" data-name=' + daGif + ' id="more-GIFs">See more GIFS</button>');


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

    var gifAdd = $("#gif-input").val().trim();

    gifArray.push(gifAdd);

    setButtons();
});


$(document).on("click", ".player", displayDaGifs);
$(document).on("click", ".generated-gif", animateGif);
$(document).on("click", "#more-GIFs", displayExtraGifs);

setButtons();

//read eloquent javascript