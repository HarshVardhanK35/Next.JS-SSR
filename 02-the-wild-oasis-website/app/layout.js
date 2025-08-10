import Logo from "./_components/Logo";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"], // set of characters
  display: "swap", // controls how it must be displayed
});

import "./_styles/globals.css";
import Navigation from "./_components/Navigation";
import Header from "./_components/Header";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s: The Wild Oasis",
    default: "Welcome: The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Cherrapunji, surrounded by beautiful mountains",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100
       min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full ">{children}</main>
        </div>
      </body>
    </html>
  );
}
