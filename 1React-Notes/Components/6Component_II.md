### Some basic use of components.

- **App Component**:
  ```javascript
  const App = () => {
    return (
      <>
        <Header />
        <div className="res-container">
          <Restaurant />
          <Restaurant />
          <Restaurant />
          <Restaurant />
          <Restaurant />
          <Restaurant />
          <Restaurant />
          <Restaurant />
          <Restaurant />
        </div>
      </>
    );
  };
  ```
  - **JSX Fragment (`<>` and `</>`)**: Used to group multiple elements without adding extra nodes to the DOM.
  - **Composition**: The `App` component includes `Header` and multiple `Restaurant` components, demonstrating component composition.

#### Header Component

- **Header Component**:
  ```javascript
  const Header = () => {
    return (
      <>
        <div className="nav-bar">
          <div className="left-logo">
            <img
              className="img-file"
              src="https://play-lh.googleusercontent.com/hkFt0QUYeUPeSjFi0lwJIj7FaqJQd3XLVWO4-58WHyAdRmLvoQ-4ACtZnydtmoxnHSw"
              alt="Logo"
            />
          </div>
          <div className="right-options">
            <ul className="right-options-ul">
              <li>Home</li>
              <li>Pure Veg food options</li>
              <li>Non Veg food options</li>
              <li>Contact Us</li>
              <li>Cart</li>
            </ul>
          </div>
        </div>
      </>
    );
  };
  ```
  - **Navigation Bar**: A simple header with a logo on the left and navigation options on the right.
  - **JSX Lists**: The navigation options are rendered as a list using `<ul>` and `<li>` elements.

#### Restaurant Component

- **Restaurant Component**:
  ```javascript
  const Restaurant = () => {
    return (
      <div className="res-card">
        <div className="res-items">
          <img
            className="res-image"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/RX_THUMBNAIL/IMAGES/VENDOR/2024/5/28/10b977ca-c111-4d96-945e-2807119818d7_899667.jpg"
            alt="Restaurant"
          />
          <h1>Mayank's Bar</h1>
          <p>30-35 mins</p>
          <p>Church Gate, Udaipur</p>
        </div>
      </div>
    );
  };
  ```
  - **Restaurant Card**: Displays an image, name, delivery time, and location of a restaurant.
  - **Reusable Component**: Multiple instances of the `Restaurant` component are rendered in the `App` component.

#### Rendering the App

- **Rendering the App Component**:
  ```javascript
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
  ```
  - **ReactDOM.createRoot**: Creates a root for rendering React components.
  - **root.render**: Renders the `App` component into the DOM element with the id `root`.