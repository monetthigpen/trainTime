var config = {
    apiKey: "AIzaSyDTZYWfaD7-sU-ALusg9bghrB9LMGMLgOg",
    authDomain: "traintime2-bbff1.firebaseapp.com",
    databaseURL: "https://traintime2-bbff1.firebaseio.com",
    projectId: "traintime2-bbff1",
    storageBucket: "traintime2-bbff1.appspot.com",
    messagingSenderId: "282895276537"
};
firebase.initializeApp(config);

var database = firebase.database();
 
var trainName = "";
var destination = "";
var TrainTime = "";
var frequency = "";
$("#submit").on("click", function(event){
    event.preventDefault();

    trainName = $("#trainName-input").val().trim();
    destination = $("#destination-input").val().trim();
    TrainTime = $("#TrainTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        TrainTime: TrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

});
database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().TrainTime);
    console.log(childSnapshot.val().frequency);

    var trainName = childSnapshot.val().trainName
    var destination = childSnapshot.val().destination
    var TrainTime = childSnapshot.val().TrainTime
    var frequency = childSnapshot.val().frequency
    var time = moment();
    
    var nextArrival = moment(TrainTime, "HH:mm:ss").add(frequency, "minutes").format("HH:mm");
    var minutesAway = moment(nextArrival, "HH:mm:ss").diff(time, "minutes");
 
 $("tbody").append("<th><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + TrainTime + "</td><td>"+ nextArrival + "</td><td>" + minutesAway + "</td></th>");
  }, function(errorObject) {
 console.log("Errors handled: " + errorObject.code)
  


});


