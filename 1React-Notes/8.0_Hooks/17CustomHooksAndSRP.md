#### What Are Custom Hooks?

Custom hooks are JavaScript functions that utilize React's built-in hooks (`useState`, `useEffect`, etc.) to encapsulate reusable logic that can be shared across multiple components. They are a way to abstract and reuse stateful logic without duplicating code. Custom hooks allow you to create clean, reusable, and maintainable code.

#### Why Use Custom Hooks?

1. **Code Reusability**: Custom hooks allow you to encapsulate and reuse logic across different components, reducing code duplication.
2. **Separation of Concerns**: They help in separating concerns by isolating complex logic from component rendering logic.
3. **Clean and Maintainable Code**: Custom hooks make the codebase easier to understand and maintain. They adhere to the Single Responsibility Principle.
4. **Testing**: Isolating logic in custom hooks makes it easier to write unit tests for the logic.

#### How to Create a Custom Hook

A custom hook is simply a JavaScript function that uses built-in React hooks. It must start with the prefix `use`.

**Example: Custom Hook for Internet Status**

```javascript
import { useState, useEffect } from "react";

export const useInternetStatus = () => {
  const [status, setStatus] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setStatus(true);
    const handleOffline = () => setStatus(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return status;
};

export default useInternetStatus;
```

**Example: Custom Hook for Fetching Restaurant Menu**

```javascript
import { useState, useEffect } from "react";
import { RES_MENU_API } from "./constants";

export const useResMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);

  const fetchApi = async () => {
    try {
      let data = await fetch(RES_MENU_API + resId);
      data = await data.json();
      setResInfo(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [resId]); // add resId as dependency to re-fetch if it changes

  return resInfo;
};

export default useResMenu;
```

#### Using Custom Hooks

**Example: Using `useInternetStatus` Custom Hook**

```javascript
import React from 'react';
import useInternetStatus from './useInternetStatus';

const InternetStatusComponent = () => {
  const isOnline = useInternetStatus();

  return (
    <div>
      {isOnline ? 'You are online' : 'You are offline'}
    </div>
  );
};

export default InternetStatusComponent;
```

**Example: Using `useResMenu` Custom Hook**

```javascript
import React from 'react';
import useResMenu from './useResMenu';

const RestaurantMenu = ({ resId }) => {
  const resInfo = useResMenu(resId);

  if (!resInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{resInfo.name}</h1>
      <p>{resInfo.description}</p>
      {/* Render menu items */}
    </div>
  );
};

export default RestaurantMenu;
```

#### Single Responsibility Principle

The Single Responsibility Principle (SRP) states that a component (or a module) should have only one reason to change. By using custom hooks, we can adhere to SRP by ensuring each custom hook handles a single piece of logic, making the code more modular and maintainable.

#### Benefits of Using `useEffect` for Fetching API Data

1. **Side Effects Management**: `useEffect` is designed to handle side effects in React, such as fetching data from an API.
2. **Component Lifecycle Integration**: `useEffect` runs at specific points in the component lifecycle (e.g., after the component mounts), making it ideal for tasks like data fetching.
3. **Cleanup**: `useEffect` allows you to return a cleanup function to clean up resources (e.g., canceling API requests) when the component unmounts.

### Why Use `useEffect` for Fetching Data?

1. **Synchronization**: `useEffect` ensures that data fetching is synchronized with the component's lifecycle.
2. **Cleanup**: It provides a mechanism to clean up side effects when the component unmounts, preventing memory leaks.
3. **Dependency Management**: By specifying dependencies, `useEffect` can re-fetch data when those dependencies change, ensuring up-to-date data.

**Example: Fetching Data with `useEffect`**

```javascript
import React, { useEffect, useState } from 'react';

const DataFetchingComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch('https://api.example.com/data');
        response = await response.json();
        setData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  if (!data) {
    return <div>Loading...</div>;
  }

  return <div>Data: {JSON.stringify(data)}</div>;
};

export default DataFetchingComponent;
```
