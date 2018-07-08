// array of topics
var qArray = ['dog', 'cat', 'bird', 'goldfish', 'harry potter', 'star wars', 'nature', 'waterfall', 'coders', 'college', 'paranormal', 'creepy'];    

// adds buttons to page using array of topics
for (index in qArray){
    var button = $('<button>').text(qArray[index]).addClass('btn-danger topic');
    $('#buttons').append(button);
}

// adds new topic buttons to page
$(document).on('click', '#addButton', function(){
    var userInput = $('input').val();
    if (userInput != ''){
        var button = $('<button>').addClass('btn-danger topic').text(userInput);
        $('#buttons').append(button);
    }
});

// calls the giphy API on click of topic buttons
$(document).on('click', '.topic', function(){
    event.preventDefault();
    $('#gifDiv').empty();
    var q = $(this).text().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aydEzGVPxXsttRYtmMJTesG1vc9bIeS2&q=" + q + "&limit=100&offset=0&lang=en";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (var i=0; i<=9; i++){
            var ranNum = Math.floor(Math.random()*100);
            var gifUrlStill = response.data[ranNum].images.original_still.url;
            var gifUrlActive = response.data[ranNum].images.original.url;
            var gif = $('<img src=' + gifUrlStill + '>').addClass('giphys').attr('data-state', 'still').attr('data-still', gifUrlStill).attr('data-active', gifUrlActive);
            $('#gifDiv').append(gif); 
        }
        $('.giphys').on('click', function(){
            var state = $(this).attr('data-state');
            if (state === 'still') {
                $(this).attr('src', $(this).attr('data-active'));
                $(this).attr('data-state', 'active');
              } else {
                $(this).attr('src', $(this).attr('data-still'));
                $(this).attr('data-state', 'still');
              }
        });   
    });
});