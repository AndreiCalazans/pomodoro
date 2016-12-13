// pomodoro clock
// create timer
// can adjust values of the timer
// two timers one for pomodoro clock , another for the break


//function to add or substract numbers from timers.
var span = document.getElementsByTagName("span");

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
            value ++;
            document.getElementById(idToChange+"time").innerHTML = value +":00";

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
var btn = document.getElementsByTagName("button");
for (var j = 0 ; j < btn.length ; j++){
  btn[j].addEventListener("click", function(){
    console.log(this.id);
    var valueInside = document.getElementById(this.id+"time").innerHTML;
    document.getElementById("timer").innerHTML = valueInside;
  })
}
