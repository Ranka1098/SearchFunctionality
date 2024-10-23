import React, { useEffect, useState } from "react";

const STATUS = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const TypeheadSearch = () => {
  const [queary, setQueary] = useState("");
  const [data, setData] = useState([]);
  const [state, setState] = useState(STATUS.LOADING);
  useEffect(() => {
    // abort instance created
    const abortController = new AbortController();
    // abort controller ke sath signal bhi aat hai
    const { signal } = abortController;

    const getData = async () => {
      try {
        setState(STATUS.LOADING);
        // jo abrot controller se singnal aaya tha usse api link ke saath bind kar diya
        const resp = await fetch(
          `https://dummyjson.com/products/search?q=${queary}&limit=10`,
          { signal }
        );
        const result = await resp.json();
        setData(result.products);
        setState(STATUS.SUCCESS);
      } catch (error) {
        if (error.name !== "AbortError") {
          setState(STATUS.ERROR);
        }
      }
    };
    // getData();
    // note -getData function jo har keyStroke per call ho raha tha ab wo 1 second dealy kestroke ke baad call hoga
    const timerId = setTimeout(getData, 1000);

    // cleanup - agar phele keystoke ke 1 second ke baad jo api call ho rahi thi usse phele user 2nd keystroke de diya
    // to jo phele keystroke pe api call na ho kar akhri wale keystroke per api call ho gi
    // network tab me jaakar check karo
    return () => {
      // privious keystroke ko clean up karo
      clearTimeout(timerId);
      // cleanup ke saath hi privious network call ko abort karo
      abortController.abort();
    };
  }, [queary]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search here..."
        value={queary}
        className="p-1 border-[1px] border-black"
        onChange={(e) => setQueary(e.target.value)}
      />
      {state === STATUS.LOADING && <div>loading...</div>}
      {state === STATUS.ERROR && <div>Error occured </div>}
      {state === STATUS.SUCCESS && (
        <ul>
          {data.map((item) => {
            return (
              <li key={item.id} className="mt-5">
                {item.title}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default TypeheadSearch;
