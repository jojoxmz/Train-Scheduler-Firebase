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

	database.ref().on("child_added", function(snapshot){
		console.log(snapshot.val());
		console.log(snapshot.val().name);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().firstTime);
		console.log(snapshot.val().frequency);

		var newestFirstTime= (snapshot.val().firstTime);
		var newestFrequency= (snapshot.val().frequency);

		var firstTimeConverted = moment(newestFirstTime, "hh:mm").subtract(1, "years");
			console.log(firstTimeConverted);
		
		var currentTime= moment();
			console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
			console.log("DIFFERENCE IN TIME: " + diffTime);

		var tRemainder = diffTime % newestFrequency;
    		console.log(tRemainder);

		var tMinutesTillTrain = newestFrequency - tRemainder;
    		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		var nextTrain = moment().add(tMinutesTillTrain, "minutes");
   			console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	var newRow= `<tr>
					<td>${snapshot.val().name}</td>
					<td>${snapshot.val().destination}</td>
					<td>${snapshot.val().frequency}</td>
					<td>${nextTrain}</td>
					<td>${tMinutesTillTrain}</td>
				</tr>`;

	$('#tableBody').append(newRow);

	}, function(errorObject) {
 	console.log("Failed: " + errorObject.code);
	});




  $('#submit').on('click', function(e){
	e.preventDefault();

	var trainName= $('#trainNameId').val().trim();
	var trainDestination= $('#destinationId').val().trim();
	var firstTrainTime= $('#trainTimeId').val().trim();
	var trainFrequency= parseInt($('#frequencyId').val().trim());

	console.log(trainName);
	console.log(trainDestination);
	console.log(trainFrequency);

	var newTrain= {
		name: trainName,
		destination: trainDestination,
		firstTime: firstTrainTime,
		frequency: trainFrequency
	};

	console.log(newTrain);

	database.ref().push(newTrain);

	$('.form-group > input').val("");
});