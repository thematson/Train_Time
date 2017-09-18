
  var music = new Audio('./assets/images/music.mp3'); 
  music.play();
// Initialize Firebase
  var config = {
      apiKey: "AIzaSyC6yFnNI09cWUL2u8gP9DqU1zJnUe9_3uc",
      authDomain: "train-time-c6e50.firebaseapp.com",
      databaseURL: "https://train-time-c6e50.firebaseio.com",
      projectId: "train-time-c6e50",
      storageBucket: "",
      messagingSenderId: "351498177029"
    };
    firebase.initializeApp(config);


    var database = firebase.database();


    
  //play and pause music  
  $('#play').on('click', function() { 
      music.play(); 
  });

    
  $('#pause').on('click', function() { 
      music.pause(); 
  });  
//gets user information and pushes it into firebase 
  $('#addTrain').on('click', function() {
      event.preventDefault();    
      var newTrainName = $('#inputTrain').val().trim();
      var newDest = $('#inputDestination').val().trim();
      var newFirstTime =  $('#inputTime').val().trim();
      var newFreq = parseInt($('#inputFrequency').val().trim());

      var newTrain = {
        trainname: newTrainName,
        destination: newDest,
        time: newFirstTime,
        frequency: newFreq
      };


      database.ref().push(newTrain);   
  })
//when new data is added do this
  database.ref().on('child_added', function(snapshot) {
    //clears out form
        $('.form-control').val("");    
    //variable declarations    
        var thisFreq = snapshot.val().frequency;
      //gets time and date from 1 year ago today to avoid erros
        var theDate = moment(snapshot.val().time, 'hh:mm').subtract(1, 'years');
        var trainTime = moment(theDate).format('HH:mm');
        var currentTime = moment();
        var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var trainRemainder = diffTime % thisFreq;
        var trainMinutesAway = thisFreq - trainRemainder;
        var nextTrain = moment().add(trainMinutesAway, 'minutes').format('HH:mm');
          
        $('#trainSchedule').append('<tr><td>' + snapshot.val().trainname + 
                                  '</td><td>' + snapshot.val().destination + 
                                  '</td><td>' + snapshot.val().frequency + 
                                  '</td><td>' + nextTrain +
                                  '</td><td>' + trainMinutesAway + '</td></tr>');
  }, function(errorObject) {
    
          console.log("Errors handled: " + errorObject.code);
  });
//reloads page every minute to updat
  setInterval(function(){
    location.reload();
  }, 60000)

 


