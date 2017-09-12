
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

    var d = new Date();
    var nextArr = 0;
    var minAway = 0;
    // var newTrainDatas = {
    //                       newTrain: newTrain,
    //                       newDest: newDest,
    //                       newTime: newTime,
    //                       newFreq: newFreq,
    //                       nextArr: nextArr,
    //                       minAway: minAway
    //                     };
    
    
  $('#play').on('click', function() { 
      music.play(); 
  });

    
  $('#pause').on('click', function() { 
      music.pause(); 
  });

  // function newTrainData() {
    // var trainData = {
    //   newTrain: newTrain,
    //   newDest: newDest,
    //   newTime: newTime,
    //   newFreq: newFreq,
    //   nextArr: nextArr,
    //   minAway: minAway
    // };
    // console.log(trainData);
    // console.log('function was called');

    

    // var trainsRef = firebase.database().ref('trains/' + newTrain);
    // trainsRef.on('child_added', function(data) {
    //   addTrainElement(trainElement, data.key, data.val().newTrain, 
    //                   data.val().newDest, data.val().newTime, 
    //                   data.val().newFreq, data.val().nextArr, data.val().minAway);
    // });
    

 
  

  $('#addTrain').on('click', function() {
      event.preventDefault();    
      var newTrain = $('#inputTrain').val().trim();
      var newDest = $('#inputDestination').val().trim();
      var newFirstTime =  $('#inputTime').val().trim();
      var newFreq = parseInt($('#inputFrequency').val().trim());

      database.ref().push({
        train: newTrain,
        destination: newDest,
        time: newFirstTime,
        frequency: newFreq
        // nextarrival: nextArr,
        // minaway: minAway
        
      })   
  })

  database.ref().on('child_added', function(snapshot) {
    
        console.log(snapshot.val());
        $('.form-control').val("");     
        
        // console.log('newFreq is ' + newFreq);
        
        var thisFreq = snapshot.val().frequency;


        var theDate = moment(snapshot.val().time, 'hh:mm').subtract(1, 'years');
        console.log('thedate ' + theDate);
        var trainTime = moment(theDate).format('HH:mm');
        var currentTime = moment();

        var firstTimeConverted = moment(trainTime,'hh:mm').subtract(1, 'years');
        console.log('firstimecinv ' + firstTimeConverted);
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log(diffTime);
        
        var trainRemainder = diffTime % thisFreq;

        console.log("train remainder is " + trainRemainder);
        var trainMinutesAway = thisFreq - trainRemainder;
        //solved
        var nextTrain = moment().add(trainMinutesAway, 'minutes').format('HH:mm');
      
    
        $('#trainSchedule').append('<tr><td>' + snapshot.val().train + 
                                  '</td><td>' + snapshot.val().destination + 
                                  '</td><td>' + snapshot.val().frequency + 
                                  '</td><td>' + nextTrain +
                                  '</td><td>' + trainMinutesAway + '</td></tr>');
        
  })

  setInterval(function(){
    location.reload();
  }, 60000)

  // database.ref().on('value', function(snapshot){

  //   console.log(snapshot.val());

  //   $('#trainSchedule').append('<tr><td>' + snapshot.val().newTrain + 
  //                             '</td><td>' + snapshot.val().newDest + 
  //                             '</td><td>' + snapshot.val().newFreq + '</td></tr>');
    
  // });


