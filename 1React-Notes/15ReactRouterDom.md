### React Router DOM

React Router DOM is a standard library for routing in React. It allows you to build a single-page application (SPA) with navigation that feels like a multi-page application without the page reloads. Here are the key concepts and components:

### `createBrowserRouter`

The `createBrowserRouter` function is used to create a router instance that uses the HTML5 history API to keep your UI in sync with the URL. This is suitable for web applications.

### Example

```javascript
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  // Route configuration
]);
```

### `RouterProvider`

The `RouterProvider` component wraps your application and provides the routing context to all the components.

### Example

```javascript
import { RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
```

### `errorElement`

The `errorElement` is a component that renders when there is an error navigating to a route, such as a 404 error.

### Example

```javascript
import Error from './src/components/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      // Child routes
    ],
  },
]);
```

### `useRouteError`

The `useRouteError` hook is used inside the error element to access error details. This allows you to provide detailed error messages.

### Example

```javascript
import { useRouteError } from 'react-router-dom';

function Error() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
```

### `Link` Component

The `Link` component is used for navigation in a React application. It replaces the `<a>` tag and prevents the page from reloading.

#### Differences from `<a>` Tag:
- **Prevents Full Page Reload**: `<Link>` uses the history API to change the URL without reloading the page.
- **Client-Side Routing**: Enables client-side navigation.

### Example

```javascript
import { Link } from 'react-router-dom';

<Link to="/about">About</Link>
```

### `useParams`

The `useParams` hook returns an object of key/value pairs of URL parameters. It is often used to fetch specific data based on route parameters.

### Example

```javascript
import { useParams } from 'react-router-dom';

function ResMenu() {
  const { resId } = useParams();
  // Use resId to fetch restaurant data
}
```

### Single Page Applications (SPAs)

Single Page Applications are web applications that load a single HTML page and dynamically update the content as the user interacts with the app. They provide a smooth, responsive, and fast user experience.

#### Advantages:
- **Fast User Experience**: No need to reload the entire page.
- **Responsive**: More fluid and responsive interactions.
- **Offline Capabilities**: Can work offline with proper service workers.

#### Example Code Using Above Concepts
** the below code is taken from my project [The LunchBox](https://github.com/Mayank-Tiwari01/The-Lunchbox)

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet, Link, useParams } from 'react-router-dom';
import Header from './src/components/Header';
import About from './src/components/About';
import Contact from './src/components/Contact';
import Error from './src/components/Error';
import Body from './src/components/Body';
import NonVeg from './src/components/NonVeg';
import PureVeg from './src/components/PureVeg';
import ResMenu from './src/components/ResMenu';

const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Body /> },
      { path: '/about', element: <About /> },
      { path: '/contact-us', element: <Contact /> },
      { path: '/nonveg', element: <NonVeg /> },
      { path: '/pureveg', element: <PureVeg /> },
      { path: '/restaurants/:resId', element: <ResMenu /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
// Example ResMenu Component
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RES_MENU_API } from '../utils/constants';
import ApiDown from './ApiDown';

function ResMenu() {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  async function fetchData() {
    try {
      const response = await fetch(RES_MENU_API + resId);
      const data = await response.json();
      setResInfo(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [resId]);

  if (!resInfo) return <ApiDown />;

  const { name, city, areaName, cuisines, costForTwoMessage, feeDetails, avgRating, totalRatingsString } = resInfo?.data?.cards[2]?.card?.card?.info;
  const { title, carousel } = resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  return (
    <>
      <div className="res-menu-header">
        <div className='left-side-info'>
          <h1>{name}</h1>
          <p>{cuisines.join(', ')}, {city}</p>
          <p>{areaName}, {costForTwoMessage}</p>
          <p>{feeDetails?.message}</p>
        </div>
        <div className='right-side-info'>
          <p>⭐{avgRating}</p>
          <p>{totalRatingsString}</p>
        </div>
      </div>
      <div className="res-menu-items">
        <div className='top-pics'>
          <h1>{title}</h1>
          <ul>
            {carousel.map(item => (
              <li key={item.bannerId}>{item.title} &#8377; {item.dish?.info?.price / 100 || 100}</li>
            ))}
          </ul>
          <p>This component is still in production, more menu items and better styling will come in future. See you later 🔥</p>
        </div>
      </div>
    </>
  );
}

export default ResMenu;

// Example usage of Link
<Link key={res?.info?.id} to={"/restaurants/" + res?.info?.id} className="res-menu-link">
  <Restaurant
    name={res?.info?.name}
    rating={res?.info?.avgRatingString}
    price={res?.info?.costForTwo}
    image={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${res?.info?.cloudinaryImageId}`}
    deliveryTime={res?.info?.sla?.deliveryTime}
  />
</Link>
```

This code illustrates how to use `createBrowserRouter`, `RouterProvider`, `Link`, and `useParams` to create a dynamic single-page application with React Router DOM.