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



//captures the user's button clicks and this funcation is ran
$("#submitBtn").on("click", function(){
    //initally the function would collect the unique IDs created from the form area of the page with the index.html
    var trainName = $("#trainName").val().trim();
    var trainDestination = $("#trainDestination").val().trim();
    var trainNextArrival = $("#trainNextArrival").val().trim();
    var trainFrequency = $("#trainFrequency").val().trim();


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