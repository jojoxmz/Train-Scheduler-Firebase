// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAa0vcyOIxbZLFPFJ9v9yW-Enhrr8RjYNU",
    authDomain: "train-firebase-179ce.firebaseapp.com",
    databaseURL: "https://train-firebase-179ce.firebaseio.com",
    projectId: "train-firebase-179ce",
    storageBucket: "",
    messagingSenderId: "187295448968"
  };
  firebase.initializeApp(config);

  var database= firebase.database();

  console.log('hello');




  $('#submit').on('click', function(e){
	e.preventDefault();

	var trainName= $('#trainNameId').val().trim();
	var trainDestination= $('#destinationId').val().trim();
	var trainTime= $('#trainTimeId').val().trim();
	var trainFrequency= parseInt($('#frequencyId').val().trim());

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainTime);
	console.log(trainFrequency);

	var newTrain= {
		name: trainName,
		destination: trainDestination,
		time: trainTime,
		frequency: trainFrequency
	};

	console.log(newTrain);

	database.ref().push(newTrain);

	$('.form-group > input').val("");
});