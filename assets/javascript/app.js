

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
  var currentTime = moment(); 

  database.ref().on("child_added", function(childSnap){
    var name = childSnap.val().name; 
    var dest = childSnap.val().dest; 
    var fTrain = childSnap.val().first; 
    var freq = childSnap.val().frequency; 
    var min = childSnap.val().min; 
    var next = childSnap.val().next;
    
    

    $("#trainTable > tbody").append(
      "<tr><td>" + name + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + min + "</td><tr>"); 
  }); 

  

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
      
      var firstTrainConverted = moment(firstTrain, "hh:mm").subtract("1, years"); 
      var difference = currentTime.diff(moment(firstTrainConverted), "minutes"); 
      var remainder = difference % frequency; 
      var minUntilTrain = frequency - remainder; 
      var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm a"); 

      var newTrain = {
          name: trainName, 
          dest: destination, 
          first: firstTrain, 
          frequency: frequency,
          min: minUntilTrain, 
          next: nextTrain,  
      };      

            console.log(newTrain.name); 
            console.log(newTrain.dest); 
            console.log(newTrain.first); 
            console.log(newTrain.freq); 

      database.ref().push(newTrain); 
   
            
  // clear text-boxes
  $("#trainNameInput").val(""); 
  $("#destInput").val(""); 
  $("#firstTrainInput").val(""); 
  $("#freqInput").val(""); 

  return false; // prevents refreshing

  }); 

  //.................................................

 
