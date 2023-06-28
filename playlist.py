from flask import Flask, request, jsonify
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import config

app = Flask(__name__)

# Spotify API credentials and scope
client_id = config.CLIENT_ID
client_secret = config.CLIENT_SECRET
redirect_uri = 'http://localhost:8080'
scope = 'playlist-modify-public'

@app.route('/api/create_playlist', methods=['POST'])
def create_playlist():
    try:
        # Retrieve username and song list from the request
        data = request.json
        username = data.get('username')
        song_list = data.get('song_list')

        # Initialize Spotipy with credentials
        sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=client_id,
                                                      client_secret=client_secret,
                                                      redirect_uri=redirect_uri,
                                                      scope=scope,
                                                      username=username))

        # Create a new playlist
        playlist_name = "Youtube's My Mix"
        playlist_description = 'A Youtube playlist ported to Spotify with MyMixify'
        playlist = sp.user_playlist_create(user=username, name=playlist_name, public=True, description=playlist_description)

        # Search and add songs to the playlist
        for song in song_list:
            results = sp.search(q=song, type='track', limit=1)
            if results['tracks']['items']:
                track_uri = results['tracks']['items'][0]['uri']
                sp.playlist_add_items(playlist_id=playlist['id'], items=[track_uri])

        print("Playlist created successfully!")
        return jsonify(message="Playlist created successfully!")
    except Exception as e:
        print("An error occurred:", e)
        return jsonify(message="An error occurred.")


if __name__ == '__main__':
    app.run()