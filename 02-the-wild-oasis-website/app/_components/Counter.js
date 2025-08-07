"use client";
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  function handleIncCount() {
    setCount((count) => count + 1);
  }

  return (
    <div>
      <button onClick={handleIncCount}>{count}</button>
    </div>
  );
}
