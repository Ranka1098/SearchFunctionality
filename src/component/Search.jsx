import React, { useEffect, useRef, useState } from "react";

const STATE = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const Search = () => {
  const [queary, setQueary] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(STATE.SUCCESS);
  const cache = useRef({});
  // console.log(cache);

  useEffect(() => {
    if (!queary) return; // Prevents API call on empty input

    const abortController = new AbortController();
    const { signal } = abortController;

    const getData = async () => {
      try {
        setStatus(STATE.LOADING);

        if (cache.current[queary]) {
          console.log("retrive from cache");
          setData(cache.current[queary]);
          setStatus(STATE.SUCCESS);
          return;
        }
        console.log("api call");
        const resp = await fetch(
          `https://dummyjson.com/products/search?q=${queary}&limit=10`,
          { signal }
        );

        if (!resp.ok) throw new Error("Network response was not ok");

        const result = await resp.json();

        if (!result.products) throw new Error("No products found");

        console.log(result.products);
        setStatus(STATE.SUCCESS);
        cache.current[queary] = result.products;
        setData(result.products);
      } catch (error) {
        console.log("error", error);
        if (error.name != "AbortError") {
          setStatus(STATE.ERROR);
        }
      }
    };
    // getData();
    const timer = setTimeout(getData, 200);
    return () => {
      clearTimeout(timer);
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
