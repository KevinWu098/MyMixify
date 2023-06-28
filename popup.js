let spotifyUsername = "";

document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.getElementById("saveButton");
  saveButton.addEventListener("click", saveSpotifyInfo);

  const scrapeButton = document.getElementById("scrapeMakeButton");
  scrapeButton.addEventListener("click", scrapeYoutube);
  
  // Retrieve and display any saved Spotify information
  chrome.runtime.sendMessage({ action: "getSpotifyInfo" }, function (response) {
    const savedSpotifyInfo = response.spotifyInfo;
    spotifyUsername = savedSpotifyInfo
    const savedSpotifyInfoElement = document.getElementById("savedSpotifyInfo");
    savedSpotifyInfoElement.textContent = `Spotify Username: ${savedSpotifyInfo}`;
  });
});

function saveSpotifyInfo() {
  console.log("save")
  const spotifyInput = document.getElementById("spotifyInput");
  const spotifyInfo = spotifyInput.value.trim();

  if (spotifyInfo !== "") {
    chrome.runtime.sendMessage({ action: "saveSpotify", spotifyInfo }, function () {
      // Update the saved Spotify information in the popup
      const savedSpotifyInfoElement = document.getElementById("savedSpotifyInfo");
      spotifyUsername = spotifyInfo
      savedSpotifyInfoElement.textContent = `Spotify Username: ${spotifyInfo}`;
    });
  }
}

function scrapeYoutube() {
  chrome.runtime.sendMessage({ action: "scrapeYoutube" }, function (response) {
    const scrapedYoutubeInfo = response.video_titles;
    // const savedSpotifyInfoElement = document.getElementById("savedSpotifyInfo");

    if(spotifyUsername !== ""){
      chrome.runtime.sendMessage( 
        { action: "makePlaylist", spotifyUsername, scrapedYoutubeInfo}, 
        function (response) {
          console.log("message received")
          const message = response.message
          const responseMessageElement = document.getElementById("responseMessage");
          responseMessageElement.textContent = message;
        })

      // responseMessage = playlist.make_playlist(savedSpotifyInfoElement, scrapedYoutubeInfo) // how do i connect python and JS...
      
    }
  });
}