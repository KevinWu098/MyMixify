let username = '';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'saveUsername') { username = request.username } 
  
  if (request.type === 'getUsername') { sendResponse({ username }) } 
  
  if (request.type === 'scrapeYoutube') {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.tabs.executeScript(tabs[0].id, {
        code: `
          const spans = Array.from(document.querySelectorAll('span#video-title.style-scope.ytd-playlist-panel-video-renderer'));
          const youtubeTitles = spans.map(span => span.textContent.trim());
          youtubeTitles;
        `
      }, function(results) {
        const youtubeTitles = results[0];
        
        // Checks that all inputs are correct
        if (username == '' || youtubeTitles == null) { 
          sendResponse('An error occurred') 
          return 
        }

        // Create an object with username and song list
        const data = {
          username: username,
          song_list: youtubeTitles,
        };

        // Make a POST request to the Flask server
        fetch('http://127.0.0.1:5000/api/create_playlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
          sendResponse(responseData.message)
        })
        .catch(error => {
          sendResponse('An error occurred:', error)
        });
      });
    });
    return true; // Indicates that the response will be sent asynchronously
  }
});