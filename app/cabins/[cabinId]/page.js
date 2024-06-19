import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import { Suspense } from "react";

// export const metadata = {
//   title: "Cabin",
// };

// generate metadata dynamically
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);

  return {
    title: `Cabin ${name}`,
  };
}

// Making dynamic pages static with generateStaticParams function
export async function generateStaticParams() {
  const cabins = await getCabins();
  // we need to return an array of objects witch an object has a key name of the dynamic segment (in this case cabinId)
  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id),
  }));

  return ids;
}

export default async function Page({ params }) {
  // these async functions are not relevante to each other but blocking each other
  /*
  const cabin = await getCabin(params.cabinId);
  const settings = await getSettings();
  const bookedDates = await getBookedDatesByCabinId(params.cabinId);
  */

  // one approche to solve above problem is to use Promise.all
  // but this approche is fast as slowest process
  /*
  const [cabin, settings, bookedDates] = await Promise.all([
    getCabin(params.cabinId),
    getSettings(),
    getBookedDatesByCabinId(params.cabinId),
  ]);
  */

  //1 the best approche is to create a component for each async function and each component only fetch the data it needs and those components can be streamed in as they become ready
  //1 Create Reservation Component
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        {/* //1 activate streaming using Suspense component */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
