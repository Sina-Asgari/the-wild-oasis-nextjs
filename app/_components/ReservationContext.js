"use client";

import { createContext, useState, useContext } from "react";

// Context API only works for client components and not for server components, because they needed hooks
// if we want to share state between server and client components we need to use url

const ReservationContext = createContext();

const initialState = { from: undefined, to: undefined };
function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error("useReservation must be used within a ReservationProvider");
  }
  return context;
}

export { ReservationProvider, useReservation };
