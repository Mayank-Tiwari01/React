import React from "react";
import ReactDOM from "react-dom";

let ele = (<button onClick={() => alert("This button does nothing and is purely for understanding purposes. Thanks.")}>Click me</button>);
let Comp2 = () => (
  <>
    <h1>Learning react can be fun</h1>
    <p>If you take it slow</p>

    <h2>But at the same time, there is a lot to learn</h2>
    <p>Guess you have to understand and go fast as well 😊</p>
  </>
)
let Comp1 = () => (
  <> 
    <Comp2 />
    <h1>okay?</h1>
    {Comp2()}

    {ele}
  </>
)

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Comp1/>);