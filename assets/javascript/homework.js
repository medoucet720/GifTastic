
      var topics=["dancing", "crying", "eating", "laughing", "sleeping", "falling", "running","drinking", "skipping", "sneezing", "smoking", "coughing", "cooking", "dreaming"];
      var actionGif;
      var pausedGif;
      var stillGif;
      var animatedGif;

function createButtons(){
  $("#actionButtons").empty();
  for(var i = 0; i < topics.length; i++){
    var actionBtn = $("<button>").text(topics[i]).addClass("actionBtn").attr({"data-name": topics[i]});
    $("#actionButtons").append(actionBtn);
  }

    $(".actionBtn").on('click', function(){
    $("#actions").empty();

    var thisAction = $(this).data("name");
    var giphyURL = "https://api.giphy.com/v1/gifs/search?q=actions+" + thisAction + "&api_key=HHmgOjCCqKz1Olc30GZngZ44xsS8i6sV";
    $.ajax({url: giphyURL, method: 'GET'}).done(function(giphy){
      currentGif = giphy.data;
      $.each(currentGif, function(index,value){
        animatedGif= value.images.original.url;
        pausedGif = value.images.original_still.url;
        var thisRating = value.rating;
        //gives blank ratings 'unrated' text
        if(thisRating == ''){
          thisRating = 'unrated';
        }
        var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
        stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
        var fullGifDisplay = $('<button>').append(rating, stillGif);
        $("#actions").append(fullGifDisplay);
      });
    });
  });
}
$(document).on('mouseover','.playOnHover', function(){
      $(this).attr('src', $(this).data('animated'));
 });
 $(document).on('mouseleave','.playOnHover', function(){
      $(this).attr('src', $(this).data('paused'));
 });

//sets a button from input
$('#addAction').on('click', function(){
  var newAction = $("#action-input").val().trim();
  topics.push(newAction);
  createButtons();
  return false;
});

createButtons();

    
