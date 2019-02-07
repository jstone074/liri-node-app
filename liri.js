require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

// concert-this
// movie-this
// do-what-it-says


// Spotify API
var Spotify = require('node-spotify-api');
 
var userInput = process.argv;
var userInputCase = process.argv[2];
var song = "";

switch (userInputCase) {
  case "spotify-this-song":
   // Loops through a string incase the song title is more than one word
  if (userInput.length > 3){
      for ( var i = 3; i < userInput.length; i++){
        song = song + " " +  userInput[i];
      }
  } else{
    song = "The Sign";
  }
  
  spotifySearch(song)
  break;

  // case "concert-this":
  // break;
  // default:

  // case "movie-this":
  // break;

  // case "do-what-it-says":
  // break;

}

// switch (action) {
//   case 'spotify-this-song':
//       var songName = process.argv[3];
//       spotify(songName);
//       break;
//   case 'movie-this':
//       var movieTitle = process.argv[3];
//       movie(movieTitle);
//       break;
//   case 'concert-this':
//       var artist = process.argv[3];
//       concert(artist);
//       break;

//   default:
//       break;
// }


function spotifySearch(song){

var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: song }, function(err, data) {
  
  if (err) {
    return console.log(song + 'Error occurred: ' + err);
        
  }


var songInfo = data.tracks.items[0]; 
console.log(song);
console.log(`Artist: ${songInfo.album.artists[0].name}`);
console.log(`Song: ${songInfo.name}`);
console.log(`Album: ${songInfo.album.name}`);
});
}

