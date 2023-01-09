var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

  $(document).on("keypress", function(event){
    if (!started){
    nextSequence();
    $("h1").text("Level "+level);
    started=true;
}
});



$(".btn").on("click", function(){
  animatePress();
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  // animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);

});




function nextSequence(){
  
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4) ;
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $("h1").text("Level "+level);
  // console.log(randomNumber);
  // console.log(gamePattern);
}

function playSound(name){

  var audio1 = new Audio("sounds/"+name+".mp3");
  audio1.play();

}

function animatePress(){

  $(".btn").on("click", function(){

    $(this).addClass("pressed");
    setTimeout(() => {
    $(this).removeClass("pressed");
    }, 100);
  });
  
}

function checkAnswer(currentLevel){

    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
      if (userClickedPattern.length == gamePattern.length) {
        console.log("success");
      setTimeout(() => {
        nextSequence();
      }, 1000);
     
      console.log(userClickedPattern);
      console.log(gamePattern);
      } 
      
    } else{
      console.log("FAILED!");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("shosho el trayshi is a loser, press a key to start again")
      
      repeatTheGame();
    }
  
    
  }

  function repeatTheGame(){

    level=0;
    gamePattern=[];
    started=false;
  }
