import CabinsList from "@/app/_components/CabinsList";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import Filter from "@/app/_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// *** revalidation at route level

// make page dynamic again
// export const revalidate = 0;

// Increamental Static Regenration (ISR), refetch data after the number of seconds we specified here (middle ground between static and dynamic rendering)
export const revalidate = 3600; // 60m * 60s = 3600 (once per hour)

// overwrite the root metadata (in app/layout.js)
export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  // read data from url in page.js, searchParams only available in page.js and not in server components
  // when we use searchParams it will be dynamic rendering because there is no way to now searchParams in the build time
  // when serachParams changes the server component will be rerender
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Suspense needs to be outside of the component that does the asynchronous work so we have to move async work to another component (in this case CabinsList component) */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinsList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
