
//date
// from https://www.slingacademy.com/article/javascript-display-a-date-object-in-12-hour-format-am-pm/#:~:text=The%20best%20way%20to%20display,using%20the%20toLocaleTimeString()%20method.
function getDateAndTime() {
    let date = new Date();

    //get hours, minutes
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
  
    // add am/pm suffix
    // this is a ternary conditional that states if hours is greater or equal to 12 (military time), 
    // then it is PM; otherwise, the time is AM 
    const amPm = hours >= 12 ? 'PM' : 'AM';

    // convert hours to 12-hour format
    // here we're using a modulo expression to get the remainder of the hours
    // for instance: 22 % 12 is 10 
    hours = hours % 12;
    // then, we'll check if the hours # is equal to 0 or not. 
    // if it's true, it means that the value is in the 1-12 range
    // if it's false (equal to 0), that means that the hour is at midnight
    hours = hours ? hours : 12;
  
    // add leading zeros to minutes and seconds using ternnary conditional
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

     // combine all parts into a time string
     const timeString = hours + ':' + minutes + ':' + seconds + ' ' + amPm;
  
     document.getElementById("date").innerHTML = [date.getMonth() + 1] + "/" + date.getDate() + "/" + date.getFullYear();
     document.getElementById("date").innerHTML += " | " + timeString;

    //  we'll need to continously call on the function to update the time. 
     setTimeout("getDateAndTime()", 1000);
}

