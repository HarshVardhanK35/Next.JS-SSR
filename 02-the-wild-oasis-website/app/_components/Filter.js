"use client";

export default function Filter() {

  function handleFilter(filter){}


  return (
    <div className="border border-primary-800 flex">
      <button className="px-5 py-2 hover:bg-primary-700">All cabins</button>
      <button className="px-5 py-2 hover:bg-primary-700">
        1&mdash;3 guests
      </button>
      <button className="px-5 py-2 hover:bg-primary-700">
        4&mdash;7 guests
      </button>
      <button className="px-5 py-2 hover:bg-primary-700">
        8&mdash;12 guests
      </button>
    </div>
  );
}
