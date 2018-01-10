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

	database.ref().on("child_added", function(snapshot){
		console.log(snapshot.val());
		console.log(snapshot.val().name);
		console.log(snapshot.val().destination);
		console.log(snapshot.val().time);
		console.log(snapshot.val().frequency);



	// $('#tableBody').append('<tr><td>' + snapshot.val().name + '</td>' + 
	// 		'<td>' + snapshot.val().name + '</td>' + 
	// 		'<td>' + snapshot.val().destination + '</td>' +
	// 		'<td>' + snapshot.val().time + '</td>') +
	// 		'<td>' + snapshot.val().frequency + '</td>';

	var newRow= `<tr>
					<td>${snapshot.val().name}</td>
					<td>${snapshot.val().destination}</td>
					<td>${snapshot.val().frequency}</td>
					<td>${snapshot.val().time}</td>
				</tr>`;

	$('#tableBody').append(newRow);





	}, function(errorObject) {
 	console.log("Failed: " + errorObject.code);
	});




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