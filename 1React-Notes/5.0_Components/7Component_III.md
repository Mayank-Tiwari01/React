#### Props in React

- **Props (Properties)**:
  - Props are short for properties and are a fundamental concept in React for passing data from parent to child components.
  - Props make components dynamic and reusable by allowing the same component to behave differently based on the data passed to it.

  Example:
  ```javascript
  const Restaurant = ({ name, rating, price, image, deliveryTime }) => {
    return (
      <div className="res-card">
        <div className="res-items">
          <img className="res-image" src={image} alt={name} />
          <h1>{name}</h1>
          <p>
            <span className='rating'>{rating}</span>
          </p>
          <p>Starting from &#8377;{price}</p>
          <p>
            <img
              src='https://cdn.iconscout.com/icon/premium/png-256-thumb/small-size-delivery-4984739-4142591.png'
              className='delivery-img'
              alt="Delivery Icon"
              aria-label="Delivery time icon"
            />
            {deliveryTime}
          </p>
        </div>
      </div>
    );
  };
  ```

- **Props as Function Arguments**:
  - In React, components are essentially JavaScript functions.
  - Props are passed to these functions as arguments, allowing the component to access and use the passed data.
  - Destructuring the props object directly in the function parameter improves readability and makes the code cleaner.

  Example:
  ```javascript
  const Restaurant = ({ name, rating, price, image, deliveryTime }) => {
    // Destructured props
    return (
      <div className="res-card">
        <div className="res-items">
          <img className="res-image" src={image} alt={name} />
          <h1>{name}</h1>
          <p>
            <span className='rating'>{rating}</span>
          </p>
          <p>Starting from &#8377;{price}</p>
          <p>
            <img
              src='https://cdn.iconscout.com/icon/premium/png-256-thumb/small-size-delivery-4984739-4142591.png'
              className='delivery-img'
              alt="Delivery Icon"
              aria-label="Delivery time icon"
            />
            {deliveryTime}
          </p>
        </div>
      </div>
    );
  };
  ```

- **Props Object**:
  - Props are passed as a single object to the component.
  - This object contains all the key-value pairs representing each prop passed to the component.
  - For example, if you pass `name="Restaurant Name"`, `rating={4.5}`, `price={100}`, and so on, the props object will look like:
    ```javascript
    {
      name: "Restaurant Name",
      rating: 4.5,
      price: 100,
      image: "image_url",
      deliveryTime: "30-35 mins"
    }
    ```

#### Config Driven UI

- **Config Driven UI**:
  - Config driven UI refers to designing user interfaces where the layout and content are controlled by configuration or data files.
  - This approach provides flexibility, as you can change the UI behavior or appearance by modifying the configuration without altering the core code.
  - It is especially useful in applications that need to adapt to different users, environments, or use cases.

  Example:
  ```javascript
  const config = {
    title: "Restaurant List",
    showRatings: true,
  };

  const App = () => {
    return (
      <>
        <h1>{config.title}</h1>
        <div className="res-container">
          {restaurants.map((res) => (
            <Restaurant
              key={res.id}
              name={res.name}
              rating={config.showRatings ? res.rating : null}
              price={res.price / 100}
              image={res.image}
              deliveryTime={res.avgDeliveryTime}
            />
          ))}
        </div>
      </>
    );
  };
  ```

- **Advantages of Config Driven UI**:
  - **Flexibility**: Easy to change the UI by updating the configuration.
  - **Reusability**: Same components can be used in different contexts with different configurations.
  - **Maintainability**: Configuration changes do not require code changes, making maintenance easier.

#### Keys in React

- **Keys**:
  - Keys are special string attributes you need to include when creating lists of elements in React.
  - They help React identify which items have changed, are added, or are removed, thus optimizing the rendering process.

  Example:
  ```javascript
  {restaurants.map((res) => (
    <Restaurant
      key={res.id} // Unique key for each component
      name={res.name}
      rating={res.rating}
      price={res.price / 100}
      image={res.image}
      deliveryTime={res.avgDeliveryTime}
    />
  ))}
  ```

- **Importance of Unique Keys**:
  - Without unique keys, React may re-render the entire list on any change, which is inefficient.
  - Unique keys allow React to identify and update only the changed elements, improving performance.
  - React uses the key attribute to match old and new elements in the virtual DOM.

- **Using Index as Key**:
  - It is generally considered a bad practice to use the index as a key because it can lead to issues with component state and performance.
  - When the list order changes, using index as key can cause bugs as React may not properly identify elements.

  Example of bad practice:
  ```javascript
  {restaurants.map((res, index) => (
    <Restaurant
      key={index} // Using index as key (not recommended)
      name={res.name}
      rating={res.rating}
      price={res.price / 100}
      image={res.image}
      deliveryTime={res.avgDeliveryTime}
    />
  ))}
  ```

- **Why Unique Keys are Important**:
  - **Performance**: Efficiently updates only the changed elements.
  - **Stability**: Maintains component state correctly when list items are added, removed, or reordered.

### Additional Concepts

- **React Component Re-rendering**:
  - React's reconciliation algorithm relies on keys to determine which elements to update.
  - Without keys, or with unstable keys (like indices), React may re-render the entire list or lose track of component state.

- **Component Composition**:
  - In React, components can be composed by nesting them.
  - Composition helps in building complex UIs from smaller, reusable components.

  Example:
  ```javascript
  const App = () => {
    return (
      <>
        <Header />
        <div className="res-container">
          {restaurants.map((res) => (
            <Restaurant
              key={res.id}
              name={res.name}
              rating={res.rating}
              price={res.price / 100}
              image={res.image}
              deliveryTime={res.avgDeliveryTime}
            />
          ))}
        </div>
      </>
    );
  };
  ```