// background.js

let spotifyInfo = "";
let youtubeInfo = "";

// // Spotify API credentials and scope
// const client_id = CLIENT_ID;
// const client_secret = CLIENT_SECRET;
// const redirect_uri = 'http://localhost:8080';
// // const username = '31ynll75rxtq4mvbbzybir2slcni'; // my test one
// const scope = 'playlist-modify-public';

function handleMessage(request, sender, sendResponse) {
  if (request.action === "scrapeYoutube") {
    console.log("scrape")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.executeScript(
        tabs[0].id,
        {
          code: `
            const spans = document.querySelectorAll('span[id="video-title"]');
            const video_titles = Array.from(spans).map((span) => span.textContent.trim());
            video_titles;
          `,
        },
        function (result) {
          const videoTitles = result[0];
          console.log(videoTitles)
          sendResponse({ video_titles: videoTitles });
        }
      );
    });

    console.log("scrape finish")
    return true; // Needed for asynchronous sendResponse
  }

  if (request.action === "makePlaylist") {
    
  }

  if (request.action === "saveSpotify") {
    spotifyInfo = request.spotifyInfo;
  }
  
  if (request.action === "getSpotifyInfo") {
    sendResponse({ spotifyInfo });
  }
}