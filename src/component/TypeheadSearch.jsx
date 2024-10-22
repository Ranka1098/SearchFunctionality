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
    const getData = async () => {
      try {
        setState(STATUS.LOADING);
        const resp = await fetch(
          `https://dummyjson.com/products/search?q=${queary}&limit=10`
        );
        const result = await resp.json();
        setData(result.products);
        setState(STATUS.SUCCESS);
      } catch (error) {
        setState(STATUS.ERROR);
      }
    };
    getData();
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
