document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('usernameInput');
    const saveButton = document.getElementById('saveButton');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const scrapeButton = document.getElementById('scrapeButton');
    const playlistStatusElement = document.getElementById('playlistStatus')
    const scrapeButtonElement = document.getElementById('scrapeButton')
  
    // Retrieve the saved username when the popup is opened
    chrome.runtime.sendMessage({ type: 'getUsername' }, function(response) {
      const savedUsername = response.username;
      if (savedUsername) {
        usernameDisplay.textContent = `Username: ${savedUsername}`;
      }
    });
  
    saveButton.addEventListener('click', function() {
      const username = usernameInput.value;
      chrome.runtime.sendMessage({ type: 'saveUsername', username }, function() {
        // Display the saved username immediately after it is saved
        usernameDisplay.textContent = `Username: ${username}`;
      });
    });
  
    scrapeButton.addEventListener('click', function() {
      // Some nonsense occurs when trying to scrape twice
      // so the button is disabled until the page refreshes
      scrapeButtonElement.textContent = "Refresh page to use again"
      scrapeButtonElement.setAttribute('disabled', "")
      
      playlistStatusElement.textContent = `Status: Creating playlist...`
      chrome.runtime.sendMessage({ type: 'scrapeYoutube' }, function(response) {
        playlistStatusElement.textContent = `Status: ${response}`
      });
    });
  });