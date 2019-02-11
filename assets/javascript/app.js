

console.log("hello"); 

  //Initialize Firebase
  var config = {
    apiKey: "AIzaSyAlO3LPywXaXAAAs7Q6Nx8zuRCJEt0dCwo",
    authDomain: "inclass1-332fa.firebaseapp.com",
    databaseURL: "https://inclass1-332fa.firebaseio.com",
    projectId: "inclass1-332fa",
    storageBucket: "inclass1-332fa.appspot.com",
    messagingSenderId: "172625548890"
  };
  firebase.initializeApp(config);

  //Create var to reference databse
  var database = firebase.database(); 

  //Add new train
  $("#submit").on("click", function(event){
      event.preventDefault(); 

      var trainName = $("#trainNameInput").val().trim(); 
      var destination = $("#destInput").val().trim(); 
      var firstTrain = $("#firstTrainInput").val().trim(); 
      var frequency = $("#freqInput").val().trim();
     
        console.log(trainName); 
        console.log(destination);
        console.log(firstTrain);
        console.log(frequency);

      var newTrain = {
          name: trainName, 
          dest: destination, 
          first: firstTrain, 
          freq: frequency, 
      }; 

      database.ref().push(newTrain); 

            console.log(newTrain.name); 
            console.log(newTrain.dest); 
            console.log(newTrain.first); 
            console.log(newTrain.freq); 
   
            
  // clear text-boxes
  $("#trainNameInput").val(""); 
  $("#destInput").val(""); 
  $("#firstTrainInput").val(""); 
  $("#freqInput").val(""); 

  return false; // prevents refreshing

  }); 

  //.................................................

  database.ref().on("value", function(snapshot) {
         
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().dest);
    console.log(snapshot.val().first);
    console.log(snapshot.val().freq);


		var firebaseName = childSnapshot.val().name;
		var firebaseLine = childSnapshot.val().line;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;
		
		var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Append train info to table on page
		$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseLine + "</td><td>"+ firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");

});





