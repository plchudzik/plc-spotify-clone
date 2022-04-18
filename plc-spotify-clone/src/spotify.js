// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

//login > redirect to spotify authorisation page > redirect back to localhost once authorised

export const authEndpoint = "https://accounts.spotify.com/authorize";

const redirectUri = "http://localhost:3000/";

const clientId = "9b95a9a958c14c62bc31e3b113258884";

// scope permissions:
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromURL = () => {
  return window.location.hash
    .substring(1)
    .split("&") //3 arrays el's
    .reduce((initial, item) => {
      //initial: empty {}, for each el: key + content
      let parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;
//ASCII for ' ' = '%20'
