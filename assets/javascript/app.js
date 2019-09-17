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
database.ref().on("value", function(snapshot){
//'data' was made to extract the javascript values of the Datasnapshot...using .val() would return a datasnapshot value of a scalar type 
    var data = snapshot.val();

});



//.on click even handler that captures the user's button clicks and if so, this function is ran soon after based on those events
$("#submitBtn").on("click", function(){
    //initally the function would create these new variables to retrieve the incoming data from the unique IDs created from 
    //the form area of the page with the index.html
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainArrival = $("#trainArrival").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();

    // created a couple if functions that will check whether the user has input the correct information within the form portion
    // when adding their own train schedules by checking if they entered a blank form before pressing submit
    if (trainName == "" || trainName == null) {
        alert("Enter in a valid name of your train");
        return false;
    }
    if (trainDestination == "" || trainDestination == null) {
        alert("Enter a valid destination")
        return false;
    }
    if (trainArrival == "" || trainArrival== null) {
        alert("Enter a valid arrival time");
        return false;
    }
    //checks if the frequency number the user has entered isn't blank, is also greater than 1 and is also null/undefined
    if (trainFrequency == "" || trainFrequency<1 || trainFrequency == null) {
        alert("Enter a valid frequecy of the next arrival of your train...must be greater than 0!");
        return false;
    }


//specifically created and if, else if function for where the user inputs the First Train Time input box within the form area
//because the assignment asked for the user to specifically input the First Arrival Train time in military time
    //checks if the input length is 5 digits and also if the ":" semicolon is correctly used before submission
    if (trainArrival.length !=5 || trainArrival.substring(2,3) != ":") {
        alert("Enter a valid time in MILITARY FORMAT!");
        return false; 
    }
    //checks if the input is not a number (isNaN) and whether the numbers entered are placed correctly from both sides of the semicolon
    else if (isNaN(parseInt(trainArrival.substring(0,2))) || isNaN(parseInt(trainArrival.substring(3)))) {
        alert("Enter a valid time with the correct placement in between the semicolons");
        return false;
    }
    //converting the user input string to integer (parseInt) this will check if the input time has a valid hour mark setting that ranged from 00-23 hours
    else if (parseInt(trainArrival.substring(0,2)) < 0 || parseInt(trainArrival.substring(0,2)) > 23) {
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
    var month = rightNow.getMonth() +1;
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
    $(".trainTable").empty();
    $(".body").empty();
    $(".row").empty();

    //after clearing pretty much all info from the 'mainContainer', 'objectArr' & 'timeArr' variables are created to be used as a
    //dynamic placeholder to push the user input to the index.html table
    var objectArr = [];
    var timeArr = [];

    $.
}