### Rendering UI and Fetching API Data in React

When developing applications with React, there are two common approaches for rendering the user interface (UI) and fetching data from APIs:

1. **Fetch and Render on Page Load**: 
   - As soon as the page loads, fetch data from the API.
   - Until the data is fetched, nothing is displayed on the screen.
   - Users have to wait for the API response before they can see the content.

2. **Shimmer UI or Mock Data**:
   - Render a placeholder UI (such as a shimmer effect) or mock data as soon as the page loads.
   - Once the API fetch is complete, re-render the UI with the actual data.
   - This approach provides a better user experience as it avoids a blank screen.

### The `useEffect` Hook

The `useEffect` hook in React allows you to perform side effects in your components, such as fetching data, updating the DOM, or setting timers. It runs after the component has rendered, making it ideal for fetching data after the initial render.

#### Basic Usage of `useEffect`

```jsx
useEffect(() => {
  // Callback function for the side effect
}, [dependencyArray]);
```

- The callback function contains the code for the side effect.
- The dependency array determines when the side effect runs. If the array is empty (`[]`), the side effect runs only once after the initial render. If it contains variables, the effect runs whenever those variables change.

### Example: Fetching Data and Using `useEffect`

Here is an example from my "The Lunchbox" project that demonstrates using `useEffect` to fetch data and handle different states of the UI:

```jsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Restaurant from './Restaurant';
import TopRatedButton from './TopRatedButton';
import ShimmerUi from './ShimmerUi'; 
import localRestaurants from '../../data/data.json';

const App = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch("https://mocki.io/v1/4f61ea24-8625-496b-9518-57ae2a21def9");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setFilteredRestaurants(json);
    } catch (error) {
      console.error("Error occurred while fetching data from remote API, falling back to local data", error);
      setFilteredRestaurants(localRestaurants);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (filteredRestaurants.length === 0) ? <ShimmerUi /> : (
    <>
      <Header />
      <TopRatedButton
        restaurants={filteredRestaurants}
        setFilteredRestaurants={setFilteredRestaurants}
      />
      <div className="res-container">
        {filteredRestaurants.map((res) => (
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

export default App;
```

### Detailed Explanation

1. **State Management with `useState`**:
   - `const [filteredRestaurants, setFilteredRestaurants] = useState([]);`
   - Initializes `filteredRestaurants` as an empty array and provides a function `setFilteredRestaurants` to update it.

2. **Fetching Data**:
   - `fetchData` function uses the `fetch` API to get data from a remote source. If it fails, it falls back to local data (`localRestaurants`).

3. **Using `useEffect`**:
   - `useEffect(() => { fetchData(); }, []);`
   - This hook runs once after the initial render to fetch data. The empty dependency array (`[]`) ensures it runs only once.

4. **Conditional Rendering**:
   - `return (filteredRestaurants.length === 0) ? <ShimmerUi /> : (...)`
   - If `filteredRestaurants` is empty, it renders `ShimmerUi`. Once data is fetched, it renders the actual UI components.

### Additional Examples of `useEffect`

#### Basic Timer Example

```jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    // Cleanup function to clear the timer
    return () => clearTimeout(timer);
  }, [count]); // Dependency array ensures the effect runs when `count` changes

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```

### Let's consider a detailed example:

```javascript
import React, { useState, useEffect } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  // Effect to run on every render
  useEffect(() => {
    console.log('Component rendered');
  });

  // Effect to run only once after the initial render
  useEffect(() => {
    console.log('Effect ran once after the initial render');
  }, []);

  // Effect to run when count changes
  useEffect(() => {
    console.log('Count changed to:', count);
  }, [count]);

  // Effect with data fetching and cleanup
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.example.com/data');
      const result = await response.json();
      setData(result);
    };

    fetchData();

    // Cleanup function
    return () => {
      console.log('Cleanup');
    };
  }, []); // This runs once after the initial render

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {data && <div>Data: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default App;
```

### Explanation

1. **Effect to run on every render**: The first `useEffect` has no dependencies array, so it runs after every render.

    ```javascript
    useEffect(() => {
      console.log('Component rendered');
    });
    ```

2. **Effect to run only once**: The second `useEffect` has an empty dependencies array, so it only runs once after the initial render.

    ```javascript
    useEffect(() => {
      console.log('Effect ran once after the initial render');
    }, []);
    ```

3. **Effect to run when count changes**: The third `useEffect` has `count` in its dependencies array, so it runs whenever `count` changes.

    ```javascript
    useEffect(() => {
      console.log('Count changed to:', count);
    }, [count]);
    ```

4. **Effect with data fetching and cleanup**: The fourth `useEffect` demonstrates a common use case: fetching data from an API and cleaning up. The cleanup function (inside `return`) is called when the component unmounts or before the effect runs again.

    ```javascript
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
      };

      fetchData();

      // Cleanup function
      return () => {
        console.log('Cleanup');
      };
    }, []); // This runs once after the initial render
    ```

### Key Points

- **Side Effects**: `useEffect` is used for side effects such as data fetching, subscriptions, and manual DOM manipulations.
- **Cleanup**: If an effect returns a function, React will run it when the component unmounts and before executing the effect next time. This is useful for cleaning up subscriptions or timers.
- **Dependencies Array**: The second argument of `useEffect` determines when the effect runs. It should include all the dependencies that the effect relies on. React compares each dependency from the previous render to the current render, and the effect runs if any of them have changed.

Understanding how to use `useEffect` effectively is crucial for managing side effects in functional React components.

### Summary

- `useEffect` is essential for managing side effects in React, such as data fetching, DOM updates, and setting timers.
- Properly handling loading states with placeholders like shimmer UI improves user experience.
- Including dependencies in `useEffect` ensures side effects run at the appropriate times, preventing unwanted behaviors like infinite loops.

### Effect Cleanup

When using `useEffect`, it's important to clean up side effects to prevent memory leaks. For example, clearing a timer or unsubscribing from an event.

```jsx
import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";

function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    // Cleanup function
    return () => clearTimeout(timer);
  }, []); // Runs only on the initial render

  return <h1>I've rendered {count} times!</h1>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Timer />);
```