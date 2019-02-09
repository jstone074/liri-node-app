require("dotenv").config();

//Requirements for the node packages
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require('moment');

//Saving the user inputs from node into variables 
var userInput = process.argv;
var userInputCase = process.argv[2];

//switch cases for the different functions
switch (userInputCase) {

  case "spotify-this-song":
    //Checks to see if a user inputed a value otherwise defaults to the sign
    if (userInput.length > 3) {
      var song = process.argv.slice(3).join(" ");
    } else {
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
    if (userInput.length > 3) {
      var movieName = process.argv.slice(3).join(" ");
    } else {
      var movieName = "Mr. Nobody";
    }

    movieSearch(movieName);
    break;

  case "do-what-it-says":
    fileSearch();
    break;

  //If bad input then this is logged
  default: console.log("Please enter a valid input");


}

////////////////////////////////////////////////////////////////
//Function for the spotify search
////////////////////////////////////////////////////////////////
function spotifySearch(song) {

  var spotify = new Spotify(keys.spotify);

  spotify.search({ type: 'track', query: song }, function (err, data) {

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
////////////////////////////////////////////////////////////////
//END FUNCTION
////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//Function for the concert search
////////////////////////////////////////////////////////////////
function conertSearch(artist) {

  axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
    .then(function (response) {
      // console.log(response);

      console.log("Venue " + response.data[0].venue.name);
      console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region + " " + response.data[0].venue.country);
      console.log("Date/Time: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));

    })
}

////////////////////////////////////////////////////////////////
//Function for the movie search
////////////////////////////////////////////////////////////////
function movieSearch(movieName) {

  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  axios.get(queryUrl).then(
    function (response) {
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

////////////////////////////////////////////////////////////////
//Function for file search
////////////////////////////////////////////////////////////////
function fileSearch() {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    //Put the contents of the random text file into variables
    var dataArr = data.split(",");
    var doThisNow = dataArr[0];

    //Start another instance of a switch case based on what is in the Random Text File
    switch (doThisNow) {

      case "spotify-this-song":

        if (dataArr[1]) {
          //Using JSON.parse because other was the string is in double quotes and is not passed correctly to the function
          var doDoThisSong = JSON.parse(dataArr[1]);
        } else {
          var doDoThisSong = "The Sign";
        }

        spotifySearch(doDoThisSong)
        break;

      case "concert-this":
        var searchThisArtist = JSON.parse(dataArr[1]);
        conertSearch(searchThisArtist);
        break;


      case "movie-this":

        if (dataArr[1]) {
          var searchThisMovieName = JSON.parse(dataArr[1]);
        } else {
          var searchThisMovieName = "Mr. Nobody";
        }

        movieSearch(searchThisMovieName);
        break;

      default: console.log("Please enter a valid input");

    }
  });

}
