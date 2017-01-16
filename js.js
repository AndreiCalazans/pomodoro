
///variables;///////////////////////////////////////////////////
const closedSettings = document.getElementById("close");
const openSettings = document.getElementById("open");
var timer = document.getElementById("timer");
var inputs = Array.prototype.slice.call( document.getElementsByTagName("input") );
var sound = new Audio;
sound.src = "pling.mp3"
var interval = false;
var workTime = true;
var innerMsg = document.getElementById("msg");
var breakTime = 5 ;
var quantityOfPomos = 2 ;
var tomato = '<i class="fa fa-check-circle-o"></i>';
var tomoMsg = document.getElementsByClassName("tomomsg");
var tomosIcon = document.getElementsByClassName("tomos");
var totalTimeLeft;
var timeChosen;
var timeout;
var playing = true;
var btnSection = document.getElementsByClassName("play");
var completed = 0;
var headerMsg = document.getElementsByTagName("title");

/////////////////////////////////functions///////////////////
//// start sequence//////
function changeTurns(){

 // it must go one pomo then one break
 if(workTime){
   var duration = inputs[0].value < 10 ? "0"+inputs[0].value : inputs[0].value;
   timer.innerHTML = duration+":00";
 }else{
   var duration = inputs[1].value < 10 ? "0"+inputs[1].value : inputs[1].value;
   timer.innerHTML = duration+":00";
 }
};

///timeCounter
////////////////////////////////////////
function play(){
  if(workTime){
   innerMsg.innerHTML = "Focus Time!";
  }else if(interval){
    innerMsg.innerHTML = "Break Time";
  }

  // pause();
  // btnSection[0].innerHTML = '<div onClick="restart()" id="btnPlay"><p>Restart</p></div>';
  // innerMsg.innerHTML = "Congrats you completed your Pomodoro, Restart everything";

  btnSection[0].innerHTML = '<div onClick="pause()" id="btnPlay"><p>Pause</p></div><div onClick="reset()" id="btnPlay"><p >Reset</p></div>';
  updateIconsColor();
  timeCounter();


}
///////////////////////////////////////////////////////////////
function restart(){
   innerMsg.innerHTML = "Focus Time!";
  reset();
  completed = 0;
  updateIconsColor();

};
///////////////////////////////////////////////////////
function makeOneMoreIcon(){
  tomosIcon[0].innerHTML += tomato;
};
////////////////////////////////////////////////////////
function updateIconsColor(){
  var tomosIconEach = document.querySelectorAll(".tomos i");
  for(var i = 0 ; i < completed ; i++){
    tomosIconEach[i].style.color ="green";
  }

  tomoMsg[0].innerHTML = " You've completed " + completed + " of "+quantityOfPomos+" Pomodoros!"
}
//////////////////////////////////////////////////////////

function timeCounter(){
var time = timer.innerHTML;
totalTimeLeft = Number(time.substr(0,2)) + Number(time.substr(3,4)/60);
 timeout = setTimeout(counter, 1000);
}
//////////////////////////////////////////
function pause(){
  clearTimeout(timeout);
  btnSection[0].innerHTML = '<div onClick="play()" id="btnPlay"><p>Play</p></div>';

}
//////////////// timeCounter and counter work together
function counter(){
  if(totalTimeLeft > 0){
    totalTimeLeft -= 0.01;
  }
  if(totalTimeLeft == 0){
    sound.play();
    if(workTime){
      completed++
    };
    updateIconsColor();
    workTime = workTime ? workTime = false: workTime = true;
    interval = workTime ? interval = false: interval = true;

    if(workTime && completed == quantityOfPomos){
     btnSection[0].innerHTML = '<div onClick="restart()" id="btnPlay"><p>Restart</p></div>';
     innerMsg.innerHTML = "Congrats you completed your Pomodoro, Restart everything";
     tomosIcon[0].innerHTML = "";
     quantityOfPomos =inputs[2].value;
    for(var i = 0 ; i < inputs[2].value ; i++ ){
      tomosIcon[0].innerHTML += tomato;
      }
     return;
    }
    changeTurns();
    pause();
    return ;

  }
  var minute = Math.floor(totalTimeLeft);
  var seconds = Math.floor(totalTimeLeft%1 * 60);
  minute = minute < 10 ? "0"+minute : minute;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  timer.innerHTML = minute +":"+seconds;
  headerMsg[0].innerHTML = minute +":"+seconds;

  timeCounter();
}
//////////////////////////////////////////////////
function reset(){
  pause();
  if(workTime){
    var value = inputs[0].value < 10 ? "0"+inputs[0].value+":00" : inputs[0].value+":00";
    timer.innerHTML = value ;
  }else{
    var value = inputs[1].value < 10 ? "0"+inputs[1].value+":00" : inputs[1].value+":00";
    timer.innerHTML = value ;
  }
};
//////////////////////////////////////////////////

function update(){

 if(this.name === "minutes"){
   var minute = this.value < 10? "0"+this.value : this.value;
   timer.innerHTML = minute+":00";
 }else if(this.name === "break"){
   breakTime = this.value;
 }else {
   tomosIcon[0].innerHTML = "";
   quantityOfPomos = this.value;
  for(var i = 0 ; i < this.value ; i++ ){
    tomosIcon[0].innerHTML += tomato;
    }

 }
 updateIconsColor();
}



//events///////////////////////////////////////////////
openSettings.addEventListener("click" , function(){
  document.querySelector(".options").style.opacity = "1";
 document.querySelector(".options").style.zIndex = "5";
})
closedSettings.addEventListener( "click", function(){
  document.querySelector(".options").style.opacity = "0";
document.querySelector(".options").style.zIndex = "-1";
});

inputs.forEach(function(e){
  e.addEventListener("change",update);
})
