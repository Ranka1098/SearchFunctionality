import React, { useEffect, useRef, useState } from "react";

// create state object for loading,successfull and error
const STATE = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const Search = () => {
  // create state for query
  const [queary, setQueary] = useState("");

  // create state for api result stored in empty array
  const [data, setData] = useState([]);

  // create single state for error handling
  const [status, setStatus] = useState(STATE.SUCCESS);

  // create state for caching
  const cache = useRef({});

  useEffect(() => {
    if (!queary) return; // Prevents API call on empty input

    // create abort controller new instance
    const abortController = new AbortController();

    // destrucutre signal from abortcontroller
    const { signal } = abortController;

    // create async function for api call
    const getData = async () => {
      // try catch method for error handling
      try {
        // showing first thime state for loading
        setStatus(STATE.LOADING);

        // if query present in cache retrive from cache and stored in result and showing success status
        if (cache.current[queary]) {
          console.log("retrive from cache");
          setData(cache.current[queary]);
          setStatus(STATE.SUCCESS);
          return;
        }

        // hit api call
        const resp = await fetch(
          `https://dummyjson.com/products/search?q=${queary}&limit=10`,
          { signal }
        );

        if (!resp.ok) throw new Error("Network response was not ok");

        const result = await resp.json();

        if (!result.products) throw new Error("No products found");

        console.log(result.products);
        setStatus(STATE.SUCCESS);

        // stored result in cache in key value pair query is key and result is value
        cache.current[queary] = result.products;
        setData(result.products);
      } catch (error) {
        console.log("error", error);
        if (error.name != "AbortError") {
          setStatus(STATE.ERROR);
        }
      }
    };

    // debouncing feature apply
    const timer = setTimeout(getData, 500);
    // claean up privious keystroke
    return () => {
      clearTimeout(timer);
      // abort previous network call
      abortController.abort();
    };
  }, [queary]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search here"
        value={queary}
        onChange={(e) => setQueary(e.target.value)}
      />

      <div>
        {status === STATE.LOADING && <div> loading... </div>}
        {status === STATE.ERROR && <div> Error... </div>}
        {status === STATE.SUCCESS && (
          <div>
            {data.map((items) => {
              return (
                <ul key={items.id}>
                  <li>{items.title}</li>
                </ul>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
