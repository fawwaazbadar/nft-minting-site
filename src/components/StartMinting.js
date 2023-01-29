import React from "react";

const StartMinting = (props) => {
  console.log("props", props);
  return (
    <div className="actions">
      <div onClick={props.mint} className="button">MINT</div>
      <div onClick={props.logout} className="button">
        START OVER
      </div>
    </div>
  );
};

export default StartMinting;
