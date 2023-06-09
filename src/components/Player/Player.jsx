//=======================================================================
//  ╔═╗┬  ┌─┐┬ ┬┌─┐┬─┐
//  ╠═╝│  ├─┤└┬┘├┤ ├┬┘
//  ╩  ┴─┘┴ ┴ ┴ └─┘┴└─
//======================================================================
//       __  __  ___        __  __          ___         __  __  _______
//  |\ |/  \|  \|__    |\/|/  \|  \|  ||   |__    ||\/||__)/  \|__)|/__`
//  | \|\__/|__/|___   |  |\__/|__/\__/|___|___   ||  ||   \__/|  \|.__/
//=======================================================================
import React from "react";
//=======================================================================
//       __  __             ___     ___         __  __  _______
//  |   /  \/  ` /\ |      |__||   |__    ||\/||__)/  \|__)|/__`
//  |___\__/\__,/~~\|___   |  ||___|___   ||  ||   \__/|  \|.__/
//=======================================================================
// COMPONENTS
// HELPERS
// CONTEXTS
// STYLES
import "./Player.css";
//=======================================================================
const Player = (props) => {
  //=================================================
  //   VARIABLE DECLARATIONS, INITIALIZERS,
  //   STATE VARIABLE ASSIGNMENTS, INLINE STYLE OBJ.
  //=================================================
  console.log(props.item)
  const backgroundStyles = {
    backgroundImage: `url(${props.item.album.images[0].url})`,
  };
  const progressBarStyles = {
    width: (props.progressMs * 100) / props.item.duration_ms + "%",
  };
  // console.log(props)
  //====================================
  //              HOOKS
  //====================================
  //====================================
  //      HELPERS/EVENT LISTENERS
  //         ADDITIONAL LOGIC
  //====================================
  //====================================
  //            JSX BODY
  //====================================
  return (
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={props.item.album.images[0].url} alt="" />
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name}</div>
          <div className="now-playing__artist">
            {props.item.artists[0].name}
          </div>
          <div className="now-playing__status">
            {props.is_playing ? "Playing" : "Paused"}
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </div>
  );
};
export default Player;
