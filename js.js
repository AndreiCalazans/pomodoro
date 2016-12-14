// pomodoro clock
// create timer
// can adjust values of the timer
// two timers one for pomodoro clock , another for the break


//function to add or substract numbers from timers.
var span = document.getElementsByTagName("span");
var alarm = new Audio();
alarm.src = "alarm2.mp3";
/*
this was a first attempt to understand how to add
plusPomo.addEventListener("click",function(){
  var value = document.getElementById("pomotime").innerHTML;
  value = parseInt(value);
  value ++;
  document.getElementById("pomotime").innerHTML = value + ":00";
})
*/
// get the id of the span you are clicking on....

for (var i = 0 ; i < span.length ; i++){
  span[i].addEventListener("click", function(){
    var id = this.id;

    var spanClicked = document.getElementById(id);

       // after you get the element clicked you can run the adding or substracting function

         // substract the minus and plus sign from the id so you can target the id to modify.
         var idToChange = id.substr(0 , id.length-1);

         var value = document.getElementById(idToChange+"time").innerHTML;
         value = parseInt(value);

          if(id[id.length-1] == "+"){
            //if it has + then add
            if (value == 60){
              document.getElementById(idToChange+"time").innerHTML = "60:00";
            }else {
            value ++;
            document.getElementById(idToChange+"time").innerHTML = value +":00";
            }
          }else if( id[id.length -1] == "-"){
            //if the last is - then subtract
            if(value == 0){
               document.getElementById(idToChange+"time").innerHTML = "0:00";
            }else{
            value -- ;
            document.getElementById(idToChange+"time").innerHTML = value +":00";
            }
          }

  })
}
// transfer the information inside the break and pomodoro time to the timer so you can start the counting...
var btn = document.getElementsByClassName("btn");
for (var j = 0 ; j < btn.length ; j++){
  btn[j].addEventListener("click", function(){

    var valueInside = document.getElementById(this.id+"time").innerHTML;
    document.getElementById("timer").innerHTML = valueInside;
  })
}
// make the counter, take the info inside the timer and when the button start is pressed start a function to count.
var timeOut;
var time;
function count(){

  time = document.getElementById("timer").innerHTML;
  // when you get the time its comes with ":" use slice to remove it. then add it together.
  var minutes = parseInt(time.slice(0,2));
  var seconds = parseInt(time.slice(3,5));
  var totalTimeInSeconds = (minutes*60)+seconds;

  var timeToCount = totalTimeInSeconds;

  // function counter iterates through the number while its biggger than zero,
  // substracting the value in the time set by the timeToCount

  // initiate the animation by implementing the css style animation
  document.getElementById("progressBar").style.animation = "progressRotation "+ timeToCount+"s linear "+ timeToCount*0.1 +"s 1 normal forwards";

console.log(timeToCount);
counter();
  function counter(){
    if (timeToCount == 0){
      document.getElementById("timer").innerHTML = "00:00";
      alarm.play();
      alert("time is up!");



    }else if (timeToCount > 0){
      timeToCount--;
      var mins = Math.floor(timeToCount/60);
      var secs = Math.floor(timeToCount%60)
      secs = (secs < 10) ? "0"+ secs : secs;
      mins = (mins < 10) ? "0"+ mins : mins;
      document.getElementById("timer").innerHTML = mins+":"+secs;
      document.getElementById("name").innerHTML = mins+":"+secs + " Timer";
      timeOut = setTimeout(counter,1000);
    }
  }
}
// function to stop the clock and resume if pressed start again.
function stop(){
    document.getElementById("progressBar").style.animationPlayState = "paused";
  clearTimeout(timeOut);
}
//reset function will return the clock to the previous timeCount.
function reset(){
    document.getElementById("progressBar").style.animation = 0;
  stop();
  document.getElementById("timer").innerHTML = time;
}
