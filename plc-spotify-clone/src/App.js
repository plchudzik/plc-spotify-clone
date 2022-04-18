import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import Player from "./Player";
import { getTokenFromURL } from "./spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useDataLayerValue } from "./DataLayer";

const spotify = new SpotifyWebApi(); // 'superobject' resposible for interaction with Spotify API

function App() {
  const [token, setToken] = useState(null);
  const [{ user }, dispatch] = useDataLayerValue();

  useEffect(() => {
    const hash = getTokenFromURL();

    //clean browser address bar for security:
    window.location.hash = "";

    const _token = hash.access_token; // '_' underscore is to not confuse with 'token' from useState

    if (_token) {
      setToken(_token);

      spotify.setAccessToken(_token); //give acccess token to the Spotify API using the Api's own method

      spotify.getMe().then((user) => {
        dispatch({ type: "SET_USER", user: user });
      });
    }

    console.log("got token! >>", token);
  }, []);

  console.log("👩‍🦰", user);

  return <div className="App">{token ? <Player /> : <Login />}</div>;
}

export default App;
