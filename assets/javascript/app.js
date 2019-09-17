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
    var trainNextArrival = $("#trainNextArrival").val().trim();
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
    if (trainNextArrival == "" || trainNextArrival== null) {
        alert("Enter a valid arrival time");
        return false;
    }
    if (trainFrequency == "" || trainFrequency == null) {
        alert("Enter a valid frequecy of the next arrival of your train...must be greater than 0!");
        return false;
    }




})