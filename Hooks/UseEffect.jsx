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

export default Timer;