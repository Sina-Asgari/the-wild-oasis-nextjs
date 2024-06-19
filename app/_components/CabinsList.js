import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "./CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinsList({ filter }) {
  // *** revalidation at component level
  // if we want to revalidate below fetch request (acctually it's not a fetch function and we use supabase to send request) we can opt out the caching for this component. it means it should not cache any data
  // noStore();

  // we don't need useEffect to fetch data and also we don't need useState to store data in states
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let displayedCabins;
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayedCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinsList;
