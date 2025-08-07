import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"], // set of characters
  display: "swap", // controls how it must be displayed
});

import "./_styles/globals.css";

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
       min-h-screen`}
      >
        <Logo />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
