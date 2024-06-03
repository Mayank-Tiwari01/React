import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="container">
      <h2>Welcome to learning React</h2>
      <p>React is a JavaScript library for building user interfaces.</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
