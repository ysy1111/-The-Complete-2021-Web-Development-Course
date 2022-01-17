// click startstopresume button
    // stopwatch is counting?
        // no:   
            // change startstopresume button to Stop
            // mainCounting  and lap start counting
        // yes: (currently shows stop and lap)
            // change startstopresume button to resume, change lapreset button to reset
            // stop the counting

// click lapreset button
    // stopwatch is counting?
        // yes:
            // recording the lap time in recording area
            // reset the laptime area to 00:00:00
        // no:
            // if the stopwatch in a pause?
                // yes: reset the webpage

$(function(){
    var counting=false;
    var pausing=false;

    $("#startstopresume").click(
        function(){
            var mainTimeElap;
            var lapTimeElap;
            if (counting==false){ // stopwatch is not counting?
                // change startstopresume button to Stop
                counting = true;
                pausing=false;
                $("#startstopresume").text("Stop");
                $("#lapreset").text("Lap");
                // mainCounting  and lap start counting

                myWatch = setInterval(function(){
                    mainTimeElap = retrieve_time($("#watchtime").text())
                    lapTimeElap = retrieve_time($("#laptime").text())
                    mainTimeElap += 1;
                    lapTimeElap += 1;
                    $("#laptime").html(generate_time(lapTimeElap));
                    $("#watchtime").html(generate_time(mainTimeElap));
                }
                ,10)
            }else{ // yes: (currently shows stop and lap)
                $("#startstopresume").text("Resume");
                $("#lapreset").text("Reset");
                clearInterval(myWatch);
                counting=false;
                pausing=true;
            }
        }
    );
    
    var lapNum = 0;

    $("#lapreset").click(
        function(){
            var lapTimeElap;

            if (counting==false){
                // if the stopwatch in a pause?
                if (pausing == true){  
                    // yes: reset the webpage
                    location.reload();
                }
            }else{
                lapNum += 1;
                lapTimeElap = $("#laptime").text();
                var newRecord = '<span id="lapnumber">Lap'+lapNum+'</span><span id="laptimerecording">'+ lapTimeElap +'</span><hr />'
                $('#lapRetrieve').prepend(newRecord);
                $("#laptime").html("00:00:00");
                // stopwatch is counting. Currently shows lap

            }
        }
    );



    var minute;
    var second;
    var misec;


    function retrieve_time(time_string){
        var myTime = time_string.split(":");
        var min = parseInt(myTime[0]);
        var sec = parseInt(myTime[1]);
        var mis = parseInt(myTime[2]);
        return 6000 * min + 100 * sec + mis;
      }
    function generate_time(elapsed_time){
        //  (minute * 60 + second) * 100 + misec = elapsed_time
        //  6000 * minute + 100 * second + misec = elapsed_time
        minute = Math.floor(elapsed_time/6000);
        misec = elapsed_time - minute * 6000;

        second = Math.floor(misec/100);

        misec -= second * 100;

        return tostring(minute) + ":" + tostring(second) + ":" + tostring(misec)
    }
    function tostring(num){
        var strnum
        if (num < 10){
            strnum = "0" + num.toString();
        }else{
            strnum = num.toString();
        }
        return strnum
    }


})