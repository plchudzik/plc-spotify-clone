import { useEffect } from "react";
import "./App.css";
import Login from "./Login";
import Player from "./Player";
import { getTokenFromURL } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi(); // 'superobject' resposible for interaction with Spotify API

function App() {
  const [{ user, token }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromURL();

    //clean browser address bar for security:
    window.location.hash = "";

    const _token = hash.access_token; // '_' underscore is to not confuse with 'token' from useState

    if (_token) {
      dispatch({ type: "SET_TOKEN", token: _token });

      spotify.setAccessToken(_token); //give acccess token to the Spotify API using the Api's own method

      spotify.getMe().then((user) => {
        dispatch({ type: "SET_USER", user: user });
      });

      spotify
        .getUserPlaylists()
        .then((playlists) =>
          dispatch({ type: "SET_PLAYLISTS", playlists: playlists })
        );
      spotify.getPlaylist("6ehdSiG3d2TinBXr1r7ZK0").then((response) => {
        dispatch({ type: "SET_DISCOVER_WEEKLY", discover_weekly: response });
      });
    }
  }, []);

  return (
    <div className="App">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  );
}

export default App;
