import React from "react";
import { useState } from "react";

let ToggleButton = () => {
  const[button, setButton] = useState("Mayank");

  let handleClick = () => {
    (button === "Mayank") ? setButton("Tiwari") : setButton("Mayank");
  }
  return (
    <>
      <button onClick={handleClick}>{button}</button>
    </>
  )
}

export default ToggleButton;