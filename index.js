var breakLength = 5;
var sessionLength = 25;
var timeLeft;
var timer;

$("#breakLength .increaseTime").on("click", function() {
  breakLength++;
  $(".breakLengthTime-js").html(breakLength);
});
$("#breakLength .decreaseTime").on("click", function() {
  decreaseBreakLength();
  $(".breakLengthTime-js").html(breakLength);
});
$("#sessionLength .increaseTime").on("click", function() {
  sessionLength++;
  $(".sessionLengthTime-js").html(sessionLength);
});
$("#sessionLength .decreaseTime").on("click", function() {
  decreaseSessionLength();
  $(".sessionLengthTime-js").html(sessionLength);
});

$(".setTimer").click(function() {
  // var timerStart = setTimeout(timesUp,60*sessionLength*1000);
  if (timer) {
    resetTimer();
  } else {
    $(".setTimer").addClass("resetTimer");
    $(".resetTimer").removeClass("setTimer");
    $(".resetTimer").html("RESET");
    beginSession();
  }
});
$(".resetTimer").click(function() {
  // resetTimer();
});
function resetTimer() {
  clearInterval(timer);
  timer = undefined;
  $(".resetTimer").addClass("setTimer");
  $(".resetTimer").removeClass("resetTimer");
  $(".setTimer").html("BEGIN");
  console.log("asd");
  $("#clockDisplay .sessionLengthTime-js").html(
    sessionLength > 9 ? sessionLength : "0" + sessionLength
  );
  $("#clockDisplay .sessionLengthTimeSeconds-js").html("00");
}

function beginSession() {
  if (timer) {
    clearInterval(timer);
  }
  $(".sessionOrBreak").html("SESSION");
  timeLeft = 60 * sessionLength * 1000;
  timer = setInterval(timeLeftDisplay, 1000);
}

function beginBreak() {
  clearInterval(timer);
  $(".sessionOrBreak").html("BREAK");
  timeLeft = 60 * breakLength * 1000;
  timer = setInterval(timeLeftDisplay, 1000);
}

function timesUp() {
  // what happens when time is up
  if ($(".sessionOrBreak").html() == "SESSION") {
    beginBreak();
  } else {
    beginSession();
  }
}

function timeLeftDisplay() {
  if (timeLeft <= 0) {
    timesUp();
  }
  let totalSeconds = timeLeft / 1000;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;
  $("#clockDisplay .sessionLengthTime-js").html(
    minutes > 9 ? minutes : "0" + minutes
  );
  $("#clockDisplay .sessionLengthTimeSeconds-js").html(
    seconds > 9 ? seconds : "0" + seconds
  );
  timeLeft -= 1000;
}

function decreaseSessionLength() {
  if (sessionLength > 5) {
    sessionLength--;
  }
}
function decreaseBreakLength() {
  if (breakLength > 0) {
    breakLength--;
  }
}
