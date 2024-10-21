import React, { useState } from "react";
import { foodData } from "./Data";

const Search = () => {
  const [data, setData] = useState(foodData);

  return (
    <>
      <div className="container mx-auto flex justify-center items-center shadow-md p-1">
        <input
          type="text"
          placeholder="Search food..."
          className="p-1 border-[1px] border-black w-[20rem]"
        />
      </div>
      <div className="container mx-auto flex justify-between items-center gap-10 shadow-md p-2 mt-2">
        <h1 className="font-bold">Name</h1>
        <h1 className="font-bold">Brand</h1>
        <h1 className="font-bold"> images</h1>
      </div>
      <div className="container mx-auto flex-col flex justify-between items-center gap-10 shadow-md p-2 mt-2  shadow-lg">
        {data.map((foodItem) => {
          return (
            <div className="container mx-auto p-1 flex justify-between">
              <h1 className="">{foodItem.name}</h1>
              <h1 className="">{foodItem.brand}</h1>
              <img src={foodItem.img} alt="" className="w-[64px]" />
            </div>
          );
        })}
      </div>
      {}
    </>
  );
};

export default Search;
