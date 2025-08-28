// ! 04-Client-Server-Interactions.js
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
/**
 * ! 1. Section Overview
 * -+-+-+-+-+-+-+-+-+-+-+
 * in this section.. 
 * - HOW: server and client of NEXT.JS application interact with one another!
 * 
 *    - composing full-stack applications
 *    - rendering server comp in client comp
 *    - sharing state between server and client
 *    - URL and react's context API
 *    - how to think about data-fetching
 * 
 * 
 * ! 2: Blurring the Boundary Between Server and Client (RSC – Part 4)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * [other previous parts are inside this file >> (01-Overview-NEXT-with-APP-router-P2)]
 * 
 * >>> server-client BOUNDARY: Frontend vs. Backend
 * --
 * INSIDE NOTES
 * 
 * 
 * ! 3: Client Components in Server Components
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * $ ERR- FORECAST
 * this error might occur!
 * - You're importing a component that needs useState. 
 *    - It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
 * 
 * >>> this error can be fixed using DIRECTIVE: // => "use client"
 * 
 * ex:
 * inside - cabins/[cabinId]/page.js
 * [code]
 * ------
<p className="text-lg text-primary-300 mb-10">
  <TextExpander>{description}</TextExpander>
</p>
 * 
 * - used "TextExpander" as a client component inside a server component 
 *    - this "TextExpander" client comp receives data from a server component that is: "cabins/[cabinId]"
 * 
 * - as "TextExpander" is a client component we may see following err:
 * You're importing a component that needs useState...
 *    ... It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
 * 
 * - in order to solve that we used "use client" directive on top of inside "TextExpander" file!
 * [code]
 * ------
"use client"
import { useState } from 'react';

export default function TextExpander({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(' ').slice(0, 40).join(' ') + '...';

  return (
    <span>
      {displayText}{' '}
      <button
        className='text-primary-700 border-b border-primary-700 leading-3 pb-1'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    </span>
  );
}
 * 
 * - as this adds INTERACTIVITY to server components we NEED this 
 * 
 * ? DATA passage
 * ---
 * <TextExpander>{description}</TextExpander>
 *    - this data {description} is passed from server to client crossing over server-client boundary!
 * 
 * $ NOTE:
 * - whenever possible MOVE client-comp as LOW into comp-tree as possible 
 * WKT.. 
 *    child comp of client comp are always client comp BY DEFAULT!
 *      so they will not be SERVER rendered!
 * 
 * 
 * ! 4: Highlighting Current Side Navigation Link
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (USE: Next.JS provided HOOK >>> to highlight current link in site navigation)
 * 
 * - inside ROUTE: /account/reservations and COMP: SideNavigation.js file
 * 
 * - highlighting current navigated link inside "SideNavigation" file.. [links: Home, Reservation, Guest Profile]
 *    - in order to do this.. we can use a react-hook OR some CUSTOM HOOK provided by next.js 
 * 
 * [there is no way doing this using server-side-rendering]
 * - so Next.JS provides a hook which returns current URL (requested by user) and then compare with URL inside "SideNavigation"
 *    - mark them as "active" 
 * 
 * >>> usePathname() 
 * [A-Next.JS-Custom-Hook]
 *    - but this works inside client comp >> so it returns an err..
 * You're importing a component that needs usePathname...
 *    It only works in a Client Component but none of its parents are marked with "use client", so they're Server Components by default.
 * 
 * - so it is now clear that "usePathname" is react-hook
 *    - to solve this above error make the file a client-comp with: "use client" directive
 * 
 * [code]
 * ------
"use client";     // - converted this page into client-comp as "usePathname" is a react-hook!

import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { usePathname } from "next/navigation";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HomeIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Reservations",
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Guest profile",
    href: "/account/profile",
    icon: <UserIcon className="h-5 w-5 text-primary-600" />,
  },
];

export default function SideNavigation() {
  const pathName = usePathname();           // - current URL

  return (
    <nav className="border-r border-primary-900">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200
                ${pathName === link.href ? "bg-primary-900" : ""}   
              `}                                            \
              href={link.href}                               +---=> // - compared current requested-URL with URL present on the page!
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
 * 
 * 
 * $ NOTE
 * - we need to switch to a client component in order to able to use a react-hook!
 * 
 * 
 * ! *** 5: Sharing State Between Client and Server: The URL ***
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: passing data from client to server >> BUILD: "filter" comp)
 * 
 * >>> to share state from client to server we need 'PROP'
 * - so the best way to share the state is to store state inside a URL
 *    [when user clicks / applies a FILTER >> then that FILTER term will be added into URL]
 * 
 * - URL looks like: "localhost:3000/cabins?capacity=small" 
 *    [filter cabins according to capacities: "small", "medium", "large"]
 * 
 * search-params are query-string data inside a URL >>> [?capacity=small]
 * >>> to get data from URL (search-parameter data) we need "searchParams"
 *    - as this "searchParams" only work inside page-components but not inside arbitrary server components
 * 
 * ? 1. Page components ?
 * - these are directly tied to a route [ex: /cabins, /account] inside /app directory [comp: page.js]
 * ex: app/cabins/page.js
 * 
 * ? 2. Arbitrary server components ?
 * [components which are not page.js]
 * - these are regular server components we create anywhere inside app/ (but not named page.js) [comp: not page.js]
 * ex: app/_components/CabinList.js 
 *     app/_components/Filter.js
 * 
 * using searchParams..
 * [code]
 * ------
// >>> /app/cabins/page.js -- [a page component]
---
// export const revalidate = 3600;
// export const revalidate = 15;

export const metadata = {
  title: "Cabins",
};
export default function Page({ searchParams }) {          // - using 'searchParams' here!
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian...
      </p>
      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />           // - passing calculations using 'searchParams' as props in here!
      </Suspense>
    </div>
  );
}
------------------------------------ CONNECTED ------------------------------------
// >>> /app/_components/CabinList -- [an arbitrary comp]
---
import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList({ filter }) {
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
 * 
 * $ NOTE
 * - searchParams cannot be known at runtime of this application.. 
 *    - so whenever we used "searchParams" in a page.js file >> it becomes dynamically rendered page!
 * [so no need to revalidate dynamically rendered pages.. revalidation is only for statically rendered pages]
 * 
 * - till now we are manually setting search-params inside URL
 *    - so we need to create a component which used to apply interactivity!
 * 
 * >>> create a comp: Filter.js inside [/app/_components] and make it client using: "use client"
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ! 2: Blurring the Boundary Between Server and Client (RSC – Part 4)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2: Blurring the Boundary Between Server and Client (RSC – Part 4)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2: Blurring the Boundary Between Server and Client (RSC – Part 4)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2: Blurring the Boundary Between Server and Client (RSC – Part 4)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2: Blurring the Boundary Between Server and Client (RSC – Part 4)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */