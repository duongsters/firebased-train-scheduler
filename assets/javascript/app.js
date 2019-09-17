//————My web app's Firebase configuration————//
var firebaseConfig = {
    apiKey: "AIzaSyB8nr-CeZjg1ReOgEokzW08PHLiewGrcT0",
    authDomain: "sampletest-e5e84.firebaseapp.com",
    databaseURL: "https://sampletest-e5e84.firebaseio.com",
    projectId: "sampletest-e5e84",
    storageBucket: "sampletest-e5e84.appspot.com",
    messagingSenderId: "847545129846",
    appId: "1:847545129846:web:81183255542e47e31ef857"
};
//—————————Initialize Firebase—————————//
firebase.initializeApp(firebaseConfig);
//created 'database' variable instance from the firebase object for reference back to the firebase database service
var database = firebase.database();
// Create and set global variable 'rendering'
var rendering;



//references on the new value changes then pulls new data to the firebase database
database.ref().on("value", function (snapshot) {
    //'data' was made to extract the javascript values of the Datasnapshot...using .val() would return a datasnapshot value of a scalar type 
    data = snapshot.val();

    //updates train schedule table with the new variables from the user input
    renderTableData();
});



//.on click even handler that captures the user's button clicks and if so, this function is ran soon after based on those events
$("#submitBtn").on("click", function () {
    //initally the function would create these new variables to retrieve the incoming data from the unique IDs created from 
    //the form area of the page with the index.html
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainArrival = $("#trainArrival").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

    // created a couple if statements that will check whether the user has input the correct information within the form portion
    // when adding their own train schedules by checking if they entered a blank form before pressing submit by return a false boolean value
    //and stopping the code from running furthemore within this on click handle event function
    if (trainName == "" || trainName == null) {
        alert("Enter in a valid name of your train");
        return false;
    }
    if (trainDestination == "" || trainDestination == null) {
        alert("Enter a valid destination");
        return false;
    }
    if (trainArrival == "" || trainArrival == null) {
        alert("Enter a valid arrival time");
        return false;
    }
    //checks if the frequency number the user has entered isn't blank, is also greater than 1 and is also null/undefined
    if (trainFrequency == "" || trainFrequency < 1 || trainFrequency == null) {
        alert("Enter a valid frequecy of the next arrival of your train...must be greater than 0!");
        return false;
    }


    //specifically created and if, else if conditional statements for where the user inputs the First Train Time input box within the form area
    //because the assignment asked for the user to specifically input the First Arrival Train time in military time
    //checks if the input length is 5 digits and also if the ":" semicolon is correctly used before submission
    if (trainArrival.length != 5 || trainArrival.substring(2, 3) != ":") {
        alert("Enter a valid time in MILITARY FORMAT!");
        return false;
    }
    //checks if the input is not a number (isNaN) and whether the numbers entered are placed correctly from both sides of the semicolon
    else if (isNaN(parseInt(trainArrival.substring(0, 2))) || isNaN(parseInt(trainArrival.substring(3)))) {
        alert("Enter a valid time with the correct placement in between the semicolons");
        return false;
    }
    //converting the user input string to integer (parseInt) this will check if the input time has a valid hour mark setting that ranged from 00-23 hours
    else if (parseInt(trainArrival.substring(0, 2)) < 0 || parseInt(trainArrival.substring(0, 2)) > 23) {
        alert("Enter a valid time where the hours are from '00'-'23' hourse");
        return false;
    }
    //initially converting the user input from string to integer, this will check if the time the user entered is from the valid 
    //minutes interval of 00-59 minutes after the semicolon
    else if (parseInt(trainArrival.substring(3)) < 0 || parseInt(trainArrival.substring(3)) > 59) {
        alert("Enter a valid time where the minutes are from '00'-'59' minutes");
        return false;
    }

    //with moment.js, I am able to capture the specific time for today, I can retrieve the data that of when the user has has successfully
    //submitted their form to the train scheduler
    var rightNow = new Date();
    var date = rightNow.getDate();
    var month = rightNow.getMonth() + 1;
    var year = rightNow.getFullYear();

    //initally create an open string for variable 'rightNowString' 
    var rightNowString = "";
    //then concatinate the time created from lines 86-89 within 'rightNowString'
    var rightNowString = rightNowString.concat(month, "/", date, "/", year);


    //creaated 'firstArrival' variable to store the current date and time that will later be used to store within the firebase server
    var firstArrival = rightNowString.concat(" ", trainArrival);

    //line 101 is important in that it will basically referencing all the new information the user has entered of their train schedule from the form 
    //portion of the page and pushing it over to the firebase servers
    database.ref().push({
        name: trainName,
        destination: trainDestination,
        arrivalTime: firstArrival,
        frequency: trainFrequency

    });


    //after the user has successfully entered their train schedule and it has been successfully been sent to the firebase servers,
    //clearing the form page is required so users can input more train schedules
    $("#trainName").val("");
    $("#trainDestination").val("");
    $("#trainArrival").val("");
    $("#trainFrequency").val("");

    //line 118 is important in adding at the very end of this on click handler function so that by returning false, this will override the
    //user from clicking on anything on the page any further and create confusion on both ends
    return false;
});



// the renderTableData function is made to dynamically refresh the train schedule table within index.html 
function renderTableData() {

    //clears all needed data within the 'mainContainer'...tables..body...rows
    $(".trainTable-body-row").empty();


    //after clearing pretty much all info from the 'mainContainer', 'objectArr' & 'timeArr' variables are created to be used as a open array
    //dynamic placeholders to push the user input to the index.html table
    var objectArr = [];
    var timeArr = [];

    //line 139 is made to easily iterate through the objects and arrays data by analyzing and then pushing it to index.html
    $.each(data, function (key, value) {

        //retrieves the variables from the firebase server then places it in it's specfic global variables
        var trainName = value.name;
        var trainDestination = value.destination;
        var trainFrequency = value.frequency;
        var trainArrival = value.arrivalTime;

        //created the inital variables that will calculate the Next train Arrival & the minutes away from the Next train Arrival
        var trainNextArrival;
        var trainMinutesAway;



        //-------------------------------Moment.JS rendering-----------------------------------------------------------//
        //created the 'renderDate' variable to find time of the train arrival
        var renderDate = moment(new Date(trainArrival));
        //calculates the minutes away from the time of the train's First Arrival
        var minutesFromFirstArrival = moment(renderDate).diff(moment(), "minutes") * (-1);

        //created and if, else conditional statement that will run if
        if (minutesFromFirstArrival <= 0) {
            //train arrival equals current time - train's first arrival time
            trainMinutesAway = moment(renderDate).diff(moment(), "minutes");
            //Next arrival time is equal to the First train arrival time
            trainNextArrivalDate = renderDate;
        }
        else {
            //next train arrival = train's frequency minus the remainder minutes aways from the time of the First Arrival
            trainMinutesAway = trainFrequency - (minutesFromFirstArrival % trainFrequency);
            //next train arrival time is adding the current time + minutes away from next arrival train time
            var trainNextArrivalDate = moment().add(trainMinutesAway, "minutes");
        }
        //recalibrates the time to 12 hours reading of am/pm
        trainNextArrival = trainNextArrivalDate.format("hh:mm A");


        //lines 179-183 may look similar to lines104-107,but this specfically for the variable IDs within the train schedule table
        //and not the IDs within the form
        var newData = {
            name: trainName,
            destination: trainDestination,
            freq: trainFrequency,
            nextArrival: trainNextArrival,
            minutesAway: trainMinutesAway
        };
        //pushes the newData values into to the open arrayed 'objectArr' variable
        objectArr.push(newData);
        //pushed the minutes remaining until the next train arrival to the open array storeholder of 'timeArr'
        timeArr.push(trainMinutesAway);
    });

    //sorts the time array in order from small to large with the .sort method
    timeArr.sort(function (a, b) {
        return a - b
    });

    //important to use the .unique jQuery function to sort the timeArr's DOM elements and removes all duplicates
    //doing so would make the for loops starting on line 201 be ran smoother without problems
    $.unique(timeArr)
    //double for loop condition is made to loop through the timed values then push the new values within the train schedule table in index.html
    for (var j = 0; j < timeArr.length; j++) {
        //created a double for loop to check for any duplicates within the time frame for variable i and j
        for (var i = 0; i < objectArr.length; i++) {
            //if the the objectArr's minutes to arrival is = to the next lowest value...
            if (objectArr[i].minutesAway == timeArr[j]) {
                //then, dynamically push the objectArr's values to the train schedule table from index.html
                var appendRow = $("<tr>");
                //by creating a new table, body and rows needed to input the new values within the growing table
                appendRow.addClass("trainTable");
                appendRow.addClass("body");
                appendRow.addClass("row");

                // create new data cells within train schedule table
                var trainNameTd = $("<td>");
                var destinationTd = $("<td>");
                var frequecyTd = $("<td>");
                var nextArrivalTd = $("<td>");
                var minAwayTd = $("<td>");

                //after creating new data cells ahead, now add text to the cells accordingly to the corresponding IDs
                trainNameTd.text(objectArr[i].name);
                destinationTd.text(objectArr[i].destination);
                frequecyTd.text(objectArr[i].freq);
                nextArrivalTd.text(objectArr[i].nextArrival);
                minAwayTd.text(objectArr[i].minutesAway)


                //append new fully created data cells with corresponding text to the html IDs
                appendRow.append(trainNameTd);
                appendRow.append(destinationTd);
                appendRow.append(frequecyTd);
                appendRow.append(nextArrivalTd);
                appendRow.append(minAwayTd);


                //finally we append the entire new row created within app.js to the train schedule table 
                $(".trainTable").append(appendRow);
            }
        }
    }
}
// ------------------------CURRENT TIME & REFRESHING TIME RENDERING-----------------------------------//
var timeRender = setInterval(time, 1000);

function time() {
    var currentTime = moment().format("hh:mm:ss A");
    $("#currentTime").text(currentTime);

    var refreshTime = moment().format("ss");

    if (refreshTime == "00") {
        renderTableData();
    }
}