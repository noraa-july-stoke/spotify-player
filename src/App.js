//==================================================
//  ╔═╗┌─┐┌─┐  ╦┌─┐
//  ╠═╣├─┘├─┘  ║└─┐
//  ╩ ╩┴  ┴  o╚╝└─┘
//==================================================
import { useState, useEffect } from "react";
import Player from "./Player";
import logo from "./logo.svg";
import "./App.css";

export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = "YOUR_CLIENT_ID_GOES_HERE";
const redirectUri = "http://localhost:3000";
const scopes = [
  "user-read-currently-playing",
  "user-read-playback-state",
];

const App = () => {
 const [token, setToken] = useState(null);
 const [item, setItem] = useState({
   album: {
     images: [{ url: "" }],
   },
   name: "",
   artists: [{ name: "" }],
   duration_ms: 0,
 });
 const [isPlaying, setIsPlaying] = useState("Paused");
 const [progressMs, setProgressMs] = useState(0);

 async function getCurrentlyPlaying(token) {
   try {
     const response = await fetch("https://api.spotify.com/v1/me/player", {
       headers: {
         Authorization: `Bearer ${token}`,
       },
     });

     const data = await response.json();
     setItem(data.item);
     setIsPlaying(data.is_playing);
     setProgressMs(data.progress_ms);
   } catch (error) {
     console.log(error);
   }
 }

 useEffect(() => {
   // Get the hash of the url
   const hash = window.location.hash
     .substring(1)
     .split("&")
     .reduce(function (initial, item) {
       if (item) {
         var parts = item.split("=");
         initial[parts[0]] = decodeURIComponent(parts[1]);
       }
       return initial;
     }, {});
   window.location.hash = "";

   // Set token
   if (hash.access_token) {
     setToken(hash.access_token);
   }
 }, []);

 useEffect(() => {
   if (token) {
     getCurrentlyPlaying(token);
   }
 }, [token]);

 return (
   <div className="App">
     <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       {!token && (
         <a
           className="btn btn--loginApp-link"
           href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
             "%20"
           )}&response_type=token&show_dialog=true`}>
           Login to Spotify
         </a>
       )}
       {token && (
         <Player item={item} isPlaying={isPlaying} progressMs={progressMs} />
       )}
     </header>
   </div>
 );
}

export default App;
