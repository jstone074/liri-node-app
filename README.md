# liri-node-app
node.js based application to get information on movies, bands, and songs.


* When using the spotify-this-song command with a song it will out information about the song. If left blank it will default to "The Sign"

    ![Spotify This Song](/images/spotify-this-song.png)

    ![Spotify This Song](/images/spotify-this-song-default.png)


* Using the conert-this command will output information about the band and their tour dates:
    ![Concert This](/images/concert-this.png)
    

* Using movie-this command will search information on the movie and return results. If no movie is entered it will default to Mr. Nobody:
    ![Movie This](/images/movie-this.png)


* Using do-what-it-says command will read a command from a file and perform the action. The below screen shot shows three different actions of a spotify-this-song, movie-this, and concert-this. (Note: If the file only has the command, it will default to either "The Sign" or "Mr Nobody" depending on the command entered)

    ![Do what it says](/images/do-what-it-says.png)

* If you use input that is not accepted format an error will be thrown:

    ![error](/images/error.png)

