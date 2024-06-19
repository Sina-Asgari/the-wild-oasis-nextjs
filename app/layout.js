import Header from "@/app/_components/Header";
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

import { ReservationProvider } from "@/app/_components/ReservationContext";
import "@/app/_styles/globals.css";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    // %s will be what metadata title we export from individual pages
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Itailan Dolomites, surrounded by beautifule mountains and dark forests",
};

// Global layout (root layout)
// layout like other pages is server-compnents
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-900 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {/* children will be the coresponding page with route. for example: "app/about/page.js", "app/account/page.js", "app/cabins/page.js" or "app/page.js" */}
            <ReservationProvider>{children}</ReservationProvider>
            {/* all client components and not server components can use our custom hook to use state provided by Context API */}
          </main>
        </div>
      </body>
    </html>
  );
}
