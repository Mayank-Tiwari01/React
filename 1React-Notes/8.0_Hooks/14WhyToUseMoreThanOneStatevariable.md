### Benefits of Using Two State Variables

1. **Data Integrity**:
   - By keeping the original data (`resData`) unchanged, you preserve the integrity of the fetched data. This means you can always refer back to the original dataset when needed.

2. **Flexible Filtering**:
   - Using a separate state (`restaurants`) for filtered data allows you to easily apply and remove filters. For example, you can show top-rated restaurants, apply additional filters, or revert to the original list without re-fetching data.

3. **Ease of Resetting Filters**:
   - If the user wants to see the full list of restaurants again after applying a filter, you can simply set `restaurants` back to `resData` without needing another API call. This makes the user experience smoother and reduces unnecessary network requests.

4. **Optimized Rendering**:
   - React's rendering performance can benefit from this separation. By only updating the `restaurants` state when filters are applied, you minimize the amount of data React needs to re-render, leading to potentially better performance.


## eg

1. **Main Data State (`resData`)**:
   - **Purpose**: Stores the original dataset fetched from the API.
   - **Usage**: This data is used as the source of truth. It remains unchanged and is used for reference when performing actions like filtering or searching.

2. **Display Data State (`restaurants`)**:
   - **Purpose**: Stores the data currently being displayed, which can be a filtered or modified version of the main dataset.
   - **Usage**: This data is what you render in your UI. You perform operations like filtering, searching, and sorting on this dataset.

### How to Implement Filtering and Searching

1. **Fetching Data**:
   - Fetch data from the API and set both `resData` and `restaurants` with the fetched data.

2. **Filtering or Searching**:
   - Use the main dataset (`resData`) to apply filters or searches.
   - Update the display dataset (`restaurants`) with the filtered or searched results.

### Example

Here’s a simplified example for clarity:

```javascript
import React, { useState, useEffect } from 'react';
import ShimmerUi from './ShimmerUi';
import Restaurant from './Restaurant';
import RestaurantNew from './RestaurantNew';

const BodyNew = () => {
  const [resData, setResData] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const fetchLiveData = async () => {
    try {
      let response = await fetch('https://thingproxy-760k.onrender.com/fetch/https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.8947446&lng=75.8301169&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');
      let json = await response.json();
      
      let res = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
      setResData(res);
      setRestaurants(res);
    } catch {
      console.error('error fetching the data :(');
    }
  };

  useEffect(() => {
    fetchLiveData();
  }, []);

  if (resData.length === 0) return <ShimmerUi />;

  return (
    <>
      <div className='filter-area'>
        <RestaurantNew
          resData={resData}
          setRestaurants={setRestaurants}
        />
      </div>
      <div className="res-container">
        {restaurants.map((res) => (
          <Restaurant
            key={res?.info?.id}
            name={res?.info?.name}
            rating={res?.info?.avgRatingString}
            price={res?.info?.costForTwo}
            image={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${res?.info?.cloudinaryImageId}`}
            deliveryTime={res?.info?.sla?.deliveryTime}
          />
        ))}
      </div>
    </>
  );
};

export default BodyNew;
```

### `RestaurantNew` Component for Filtering

```javascript
import React from 'react';

function RestaurantNew({ resData, setRestaurants }) {

  const handleClick = () => {
    let filteredRes = resData.filter((res) => res?.info?.avgRating > 3);
    setRestaurants(filteredRes);
  };

  return (
    <>
      <button className="top-rated-button" onClick={handleClick}>
        See top rated res only ✨
      </button>
    </>
  );
}

export default RestaurantNew;
```

### Key Points to Remember

- **Separation of Concerns**: `resData` is your source of truth and remains unchanged, while `restaurants` is the mutable dataset you display and modify.
- **Performance**: This separation ensures that your main data doesn't get corrupted or lost, and it simplifies the process of reverting back to the original data if needed.
- **Flexibility**: You can apply multiple filters, searches, or other operations without losing the original dataset, providing a better user experience.

By following this approach, you maintain a clean and efficient way to manage and display data in your application.