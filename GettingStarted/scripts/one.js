import React from "react";
import ReactDOM from "react-dom";

const subHeading = React.createElement('h2', {}, 'Welcome to learning React');

const paragraph = React.createElement('p', {}, 'React is a JavaScript library for building user interfaces. 🚀');

console.log(paragraph); 
const container = React.createElement('div', {className: 'container'}, subHeading, paragraph);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(container);
//take a look at one.jsx to see how jsx makes writing code easier
//jsx => babel transpile it into react.createElement => js object => html element.