require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');

//user input var 
var userInput = process.argv;
var userInputCase = process.argv[2];

//switch cases for the different functions
switch (userInputCase) {

  case "spotify-this-song":
  //Checks to see if a user inputed a value otherwise defaults to the sign
  if (userInput.length > 3){
    var song = process.argv.slice(3).join(" ");
  } else{
    var song = "The Sign";
  }
  
  spotifySearch(song)
  break;

  case "concert-this":
  var artist = process.argv.slice(3).join(" ");
  conertSearch(artist);
  break;
  
  
  case "movie-this":
  //Checks to see if a user inputed anything otherwise puts in Mr Nobody
  if (userInput.length > 3){
    var movieName = process.argv.slice(3).join(" ");
  } else{
    var movieName = "Mr. Nobody";
  }

  movieSearch(movieName);
  break;

  // case "do-what-it-says":
  // break;

  //If bad input then this is logged
  default: console.log("Please enter a valid input");

  
} 

//Function for the spotify search
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

//Function for the concert search
function conertSearch (artist){

  axios.get("https://rest.bandsintown.com/artists/"+ artist + "/events?app_id=codingbootcamp")
  .then(function(response) {
    // If the axios was successful...
    // Then log the body from the site!
    console.log("Venue " + response.data[0].venue.name);
    console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);
    console.log("Date/Time: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));    

  })
}

//Function for the movie search
function movieSearch(movieName) {

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

axios.get(queryUrl).then(
  function(response) {
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.IMDBRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Metascore);
    console.log("Country " + response.data.Country);
    console.log("Language " + response.data.Language);
    console.log("Plot " + response.data.Plot);
    console.log("Actors " + response.data.Actors);
  }
);
}
