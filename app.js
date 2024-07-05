import React, { useState } from "react";
import ReactDOM from "react-dom";
import Timer from "./Hooks/UseEffect";
import Nasa from "./components/Nasa";
import CountClass from "./ClassBasedComp/CountClass";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CountClass  name="mayank" count="23" />);