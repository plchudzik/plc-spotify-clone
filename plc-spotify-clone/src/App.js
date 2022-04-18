import { useEffect, useState } from "react";
import "./App.css";
import Login from "./Login";
import { getTokenFromURL } from "./spotify";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const hash = getTokenFromURL();

    //clean browser address bar for security:
    window.location.hash = "";

    const _token = hash.access_token; // '_' underscore is to not confuse with 'token' from useState

    if (_token) {
      setToken(_token);
    }

    console.log("got token! >>", token);
  }, []);

  return <div className="App">{token ? <h1>Loggen In!</h1> : <Login />}</div>;
}

export default App;
