import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({ filter }) {
  // noStore();

  const cabins = await getCabins();

  if (!cabins.length) return null;

  let cabinsToDisplay;
  if (filter === "all") cabinsToDisplay = cabins;
  if (filter === "small")
    cabinsToDisplay = cabins.filter((cabins) => cabins.maxCapacity <= 3);
  if (filter === "medium")
    cabinsToDisplay = cabins.filter(
      (cabins) => cabins.maxCapacity >= 4 && cabins.maxCapacity <= 7
    );
  if (filter === "large")
    cabinsToDisplay = cabins.filter((cabins) => cabins.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabinsToDisplay.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
