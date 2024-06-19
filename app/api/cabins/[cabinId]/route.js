// for creating route handler we create a convention file called route.js
// this file can be in any folder that does not have a page.js file
// when request send to the url that corresponds to the route handler no html returnd but route handler will be executed and a json data will be returnd
// we don't need route handler any more and we can use server action instead

import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

// export async function POST() {}
