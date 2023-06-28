import spotipy
from spotipy.oauth2 import SpotifyOAuth
import config

# Spotify API credentials and scope
client_id = config.CLIENT_ID
client_secret = config.CLIENT_SECRET
redirect_uri = 'http://localhost:8080'
# username = '31ynll75rxtq4mvbbzybir2slcni' #my test one
scope = 'playlist-modify-public'

def make_playlist(username, song_list):
    try:
        # Initialize Spotipy with credentials
        sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=client_id,
                                                    client_secret=client_secret,
                                                    redirect_uri=redirect_uri,
                                                    scope=scope,
                                                    username=username))

        # List of songs
        song_list = song_list

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
        return("Playlist created successfully!")
    except:
        print("An error occurred.")
        return("An error occurred.")