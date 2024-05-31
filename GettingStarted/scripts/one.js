const subHeading = React.createElement('h2', {}, 'Welcome to learning React');

const paragraph = React.createElement('p', {}, 'React is a JavaScript library for building user interfaces.');

const container = React.createElement('div', {className: 'container'}, subHeading, paragraph);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(container);
