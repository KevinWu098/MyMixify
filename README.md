# MyMixify
Conveniently Turn Youtube's My Mix into Spotify Playlists

<p align="center">
  <img width=300 src="https://github.com/KevinWu098/MyMixify/assets/100006999/e2b31d2b-a557-4b9a-b7a4-3aa5aac05012" alt="Any Youtube Music Defenders?"
</p>

## Introduction
Spotify Music? Nah. Apple Music? Nah. Youtube Music? Still nah. __Default Youtube with auto-generated My Mix__. If I had more of a meme brain, there would be a gigachad meme accompanying this introduction.

MyMixify is a simple Chrome Extension that allows the social paraiahs of society, Youtube My Mixers, to comfortably transition over to Spotify without losing their precious Youtube-generated playlists that they've come to love. Using a little web scraping and a Flask server to call the Spotify Web API, MyMixify will help you integrate into proper society.

<img width="1728" alt="Screenshot of Spotify and MyMixify" src="https://github.com/KevinWu098/MyMixify/assets/100006999/c7daf13f-517d-4161-ae49-8a0ac015766f">

## Features
- Save your Spotify username locally in the extension
- Simply click the "Create Playlist" button and get your My Mix transferred over in mere seconds

<div align="center">
  <img width="800" alt="Functionality Demonstration" src="https://github.com/KevinWu098/MyMixify/assets/100006999/0336eea1-198e-44ef-bb50-6a73c87e6d1b">
  <p>Why yes, I do have impeccable music taste.</p>
</div>

## Running MyMixify
- Start up a local Flask server with `python playlist.py` (Make sure to configure your `config.py`!)
- Load up the extension in developer mode
- Transfer over those tunes!

## Built With:
- Spotipy, Spotify Web API
- Le Sserafim, Ariana Grande, Dua Lipa, and many other artists that I jammed to while working

## Future Plans/Considerations
- Host the Flask server instead of running it locally
- The UI could definitely do with some touching up to make it both easier on the eyes and easier to understand
- Add additional functionality to transfer My Mix over to Apple Music and other music providers as well!
