// adapted from https://codepen.io/Divlo/pen/vYEbPoB

/* Variables */
const startTimerButton = document.getElementById('startTimerButton');
const startFavIcon = document.getElementById('startFavIcon');
const refreshTimerButton = document.getElementById('refreshTimerButton');
const timeLeftValue = document.getElementById('timeLeft');
const studyLengthValue = document.getElementById('studyLength');
const decreaseTime = document.getElementById('decreaseTime');
const increaseTime = document.getElementById('increaseTime');

/* Initialize Variables */
const arrayTime = timeLeftValue.innerText.split(":");
let timeLeft = parseInt(arrayTime[0] * 60); 
let playIsClicked = true;
let timeLength = parseInt(studyLengthValue.innerText) * 60;

// we'll take the total seconds and convert them to minutes / seconds
function measureTotalTime(totalSeconds) {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60; 
    
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return {
        minutes, seconds
    };
        
}

let interval;

/* Updates actions when the play/pause button is clicked */
startTimerButton.addEventListener('click', () => {

    if(playIsClicked) {
        // if play button is clicked, then we'll need to replace the HTML with the pause icon
        startFavIcon.classList.add('fa-pause');
        startFavIcon.classList.remove('fa-play');

        // we need to clearInterval() where we want to stop the execution of a timer 
        // made by setInterval() as it can mitigate memory leaks or unexpected function calls.
        if(interval) {
            clearInterval(interval)
        }
        interval = setInterval(handleTime, 1000);

        function handleTime() {
            // time is at zero and the pause button is shown, 
            // then we'll play the alarm sound
            if(timeLeft <= 0 && !playIsClicked) {
                document.getElementById('gentleAlarm').play();

            } 
            // else if the play button is clicked, then 
            // we pause the music and clear the interval
            else if(playIsClicked) {
                document.getElementById('gentleAlarm').pause();
                clearInterval(interval);
            }

            // we'll keep subtracting the time left until we reach the first 
            // conditional statement
            else {
                timeLeft--;
                const minutesAndSeconds = measureTotalTime(timeLeft);
                timeLeftValue.innerText = minutesAndSeconds.minutes + ':' + minutesAndSeconds.seconds;
            }
        }
    } 
    else {
        // if the pause button is clicked, then we need to update the
        // icon to show the play button 
        startFavIcon.classList.add('fa-play');
        startFavIcon.classList.remove('fa-pause');
    }
    // we then have to change the boolean to false (pause button)
    playIsClicked = !playIsClicked;
}); 

/* Handle reset button */
refreshTimerButton.addEventListener('click', () => {
    // the pomodoro time session is typically 25 min, 
    // so we'll make that the standard for whenever the user resets the clock
    timeLength = 25*60;
    timeLeft = timeLength;
    studyLengthValue.innerText = "25";
    timeLeftValue.innerText = "25:00";
   
    if(!playIsClicked) {
        startTimerButton.click();
    }
});

/* Handle length button */
function handleLengthButton(lengthValue, studyLengthHTML, isAddition) {
    let result;

    if(isAddition) { 
        result = ++lengthValue; 
    } else {
        if(lengthValue != 1) { // we dont want the time to go into negative values
            result = --lengthValue;
        }
    }

    // updates the study length based off of adding or subtracting time
    studyLengthHTML.innerText = result;

    // this ensures that minutes are formatted with leading zeros if needed
    // and to ensure that the minutes will have at least two digits.
    timeLeftValue.innerText = ('0' + result).slice(-2) + ":00";
    
    // convert the minutes to seconds
    timeLeft = parseInt(studyLengthValue.innerText) * 60;
    timeLength = parseInt(studyLengthValue.innerText) * 60;

    if(!playIsClicked) {
        startTimerButton.click();
    }  

    // return resultSeconds * 60;
    return timeLength; 
}

// when the subtraction button is clicked, then we'll have to handle and update the study session accordingly
decreaseTime.addEventListener('click', () => {
    handleLengthButton(parseInt(studyLengthValue.innerText), studyLengthValue, false);
});

// when the addition button is clicked, then we'll have to handle and update the study session accordingly
increaseTime.addEventListener('click', () => {
    handleLengthButton(parseInt(studyLengthValue.innerText), studyLengthValue, true);
});
