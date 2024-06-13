import React, { useState } from 'react';
import Header from './Header';
import Restaurant from './Restaurant';
// import { restaurants } from '../../data/eg';
//just an example, full functional code in "The Lunchbox" project.
const App = () => {
  // The useState hook allows us to add state to a functional component.
  // It creates a state variable (resList) and a function to update it (setResList).
  // Initially, resList is set to the restaurants array from the data file.
  // Any changes made to resList using setResList will trigger a re-render of the component.
  const [resList, setResList] = useState(restaurants);

  return (
    <>
      <Header />

      <button
        onClick={() => {
          const filteredList = resList.filter((item) => item.rating > 4.5);
          setResList(filteredList);
          console.log("filtered restaurants");
        }}
      >
        See Top Rated Restaurant✨
      </button>
      <div className="res-container">
        {resList.map((res) => (
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