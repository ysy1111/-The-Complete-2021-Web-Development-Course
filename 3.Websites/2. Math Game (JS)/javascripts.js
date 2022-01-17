// if we click on the start/reset button
    //if we are playing
        //reload the page
    // if we are not playing
        //set score to 0
        //show countdown box
        //reduce time by 1sec in loops
           //timeleft?
                //yes->continue
                //no->game over
        //change button to reset
        //generate new Q&A

//if we click on the answer box
    //if we are playing
        //correct?
            //yes
              //increase score
              //show correct box for 1sec
              //generate new Q&A
            //no
              //show try again box for 1sec

var gameOn = false;
var score;
var timeleft;
var correctAnswer;

var startGame = function(){
    if(!gameOn){
        gameOn = true;
        score = 0;
        timeleft = document.getElementById('timeremainingvalue');
        timeleft.innerHTML = 30;
        document.getElementById('timeremaining').style.display = 'inline-block';
        document.getElementById("resetstart").innerHTML = "Reset Game";
        setInterval(countdown,1000);
        generateQA();
    }
    else{
        window.location.reload();
    }
};

function countdown(){
    if(timeleft.innerHTML > 0){
        timeleft.innerHTML -= 1;
    }
    else{
        gameOver();
    }
}

function gameOver(){
    score = document.getElementById('scorevalue').innerHTML;
    document.getElementById('gameover').innerHTML = "<p> Game Over!</p> <p>your score is " + score + ".</p>";
    document.getElementById('gameover').style.display = 'inline-block';
    document.getElementById('timeremaining').style.display = 'none';
    document.getElementById("resetstart").innerHTML = "Start Game";
    gameOn = false;
}

function generateQA(){
    var x = Math.floor(Math.random() * 10);
    var y = Math.floor(Math.random() * 10);
    correctAnswer = x * y;
    var answers = [correctAnswer];
    var wrongAnswer;
    while(answers.length < 4){
        wrongAnswer = Math.floor(Math.random() * 80 + 1);
        if(wrongAnswer != correctAnswer && answers.indexOf(wrongAnswer) == -1){
            answers.push(wrongAnswer);
        }
    }
    answers.sort(function(){return 0.5 - Math.random()});
    document.getElementById('question').innerHTML = x + " x " + y;
    for(var i = 0; i < 4; i++){
        document.getElementById('box' + i).innerHTML = answers[i];
    }
}

function check(clicked_id){
    // window.alert(document.getElementById(clicked_id).innerHTML);
    // window.alert(gameOn);
    if (gameOn){
        answer = document.getElementById(clicked_id).innerHTML;
        if(answer == correctAnswer){
            // window.alert(correctAnswer);
            score++;
            document.getElementById('scorevalue').innerHTML = score;
            document.getElementById('correct').style.display = 'inline-block';
            setTimeout(function(){
                document.getElementById('correct').style.display = 'none';
            },1000);
            generateQA();
        }
        else{
            document.getElementById('wrong').style.display = 'inline-block';
            setTimeout(function(){
                document.getElementById('wrong').style.display = 'none';
            },1000);
        }
    }
}