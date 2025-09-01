"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams(); // this gets "?capacity=all/small/medium/large"
  const router = useRouter(); // allows to do programmatic navigation b/w routes
  const pathname = usePathname(); // this gets pathname: "/cabins"

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    // building URL
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    // programmatic navigation with URL
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // constructing complete URL and OPTIONAL scroll prop: which ensures page does not scroll back to top
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`  px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      } `}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
