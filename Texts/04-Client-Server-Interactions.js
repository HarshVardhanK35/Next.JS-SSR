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
 * ---
 * - these are directly tied to a route [ex: /cabins, /account] inside /app directory [comp: page.js]
 * ex: app/cabins/page.js
 * 
 * ? 2. Arbitrary server components ?
 * ---
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
 * [code]
 * ------
// >>> /app/_components/Filter.js
---
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();           // - this gets search-params: "?capacity=all/small/medium/large"
  const router = useRouter();               // - allows to do programmatic navigation b/w routes

  const pathname = usePathname();                 // - this gets actual pathname: "/cabins"

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);       // - building URL
    params.set("capacity", filter);

    // - programmatic navigation with router = useRouter()   
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });    // - constructing complete URL and OPTIONAL scroll prop: which ensures page does not scroll back to top
  }

  return (
    <div className="border border-primary-800 flex">
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("all")}
      >
        All cabins
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 guests
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("medium")}
      >
        4&mdash;7 guests
      </button>
      <button
        className="px-5 py-2 hover:bg-primary-700"
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 guests
      </button>
    </div>
  );
}
--------------------------------------------- CONNECTED ---------------------------------------------
// >>> /app/cabins/page.js
---
import { Suspense } from "react";
export const metadata = {
  title: "Cabins",
};
export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10"> ... </p>

      <div className="flex justify-end mb-8">
        <Filter />                                  // - "Filter" comp was used here!
      </div>
      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
 * 
 * 
 * $ NOTE
 * - so whenever we click on respective buttons while applying filters: [all, small, medium, large]
 *    - we do not get loading spinner.. which has to show user that data is loading in between clicks!
 * [that is a bad user-experience]
 * 
 * ? why there was no SPINNER in between navigation
 * ---
 * [wkt]
 * - which means navigation in NEXT.JS is always wrapped in a REACT-"transition"
 *    - suspense will not hide already rendered content 
 * [it will just wait and swap it out as soon as the new content comes in]
 * 
 * >>> fixing this error
 * [code]
 * ------
// >>> inside /app/cabins/page.js
---
import { Suspense } from "react";

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10"> ... </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Spinner />} key={filter}>      // - adding "key" prop
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
 * 
 * 
 * - key prop inside <Suspense>.. a unique key  
 *  [just similar to rendering a list]
 *    - whenever unique key changes.. fallback will be shown 
 *      - when component inside suspense is suspending  
 * 
 * >>> updated Filter.js component
 *    - creating new Button component which has repeated code!
 * 
 * [code]
 * ------
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams(); 
  const router = useRouter(); 
  const pathname = usePathname(); 
  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}
function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`  px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      } `}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
 * 
 * 
 * $ RECAP
 * - we need to share state between CLIENT and SERVER
 *    - in next we share state by placing it in URL
 * 
 * - we used router.replace function inside /app/_components/Filter.js file (we place state in URL using Filter.js file)
 *    - which helps in client side navigation (without any full-page reloads) 
 * 
 * - we receive data from URL into server component (page.js) using 'searchParams' 
 *    - whenever 'searchParams' changes.. then there will be a navigation.. server component re-renders..
 * [as searchParams is UNKNOWN at build-time >> it has to be regenerated at run-time (for each new req) >> this makes a page DYNAMIC]
 * 
 * FIXING
 * - add key prop inside "suspense" (if not fallback is not shown >> suspense does not re-render fallback)
 *    - reason: all page navigation are automatically wrapped inside REACT-transitions in NEXT.JS
 * 
 * 
 * ! 6: Advanced: Server Components in Client Components
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (rendering server comp inside client comp)
 * 
 * [code]
 * ------
// >>> /app/account/page.js
---
import SelectCountry from "@/app/_components/SelectCountry";

export const metadata = {
  title: "Update profile"
}

export default function Page() {
  // CHANGE
  const countryFlag = "pt.jpg";
  const nationality = "portugal";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>
      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>
      <form 
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
        ...                                                               // - WHAT IF this form comp needs a state?
      </form>
    </div>
  );
}
 * 
 * 
 * - this "/app/account/page.js" is a server component and it uses a "form"
 *    - but what is this "form" needs a 'STATE'..
 * 
 * >>> so we created a separate comp for "form" which is transformed into client using "use client" directive!\
 * ---
 * (same form element extracted from "/app/account/page.js" and added into newly created comp: "UpdateProfileForm")..
 * 
 * - so we created a separate comp "UpdateProfileForm" file which is converted into client comp using "use client"
 *    - if not converted into client we cannot use "state-logic" inside this new separated form comp
 * 
 * [code]
 * ------
// >>> /app/_components/UpdateProfileForm
---
"use client"
import SelectCountry from "./SelectCountry";

export default function UpdateProfileForm() {
  const [count, setCount] = useState()
  // CHANGE
  const countryFlag = "pt.jpg";
  const nationality = "portugal";

  return (
    <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col">
      <div className="space-y-2">
        <label>Full name</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <label>Email address</label>
        <input
          disabled
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality">Where are you from?</label>
          <img
            src={countryFlag}
            alt="Country flag"
            className="h-5 rounded-sm"
          />
        </div>

        <SelectCountry          // ? this is SERVER component
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID">National ID number</label>
        <input
          name="nationalID"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
        />
      </div>

      <div className="flex justify-end items-center gap-6">
        <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
          Update profile
        </button>
      </div>
    </form>
  );
}
 * 
 * 
 * - as it was marked inside client comp: "SelectCountry" was a server comp
 *    - as it is not possible to render a server comp inside a client comp
 * 
 * SelectCountry [a-server-comp]
 * [code]
 * ------
// >>> /app/_components/SelectCountry
---
import { getCountries } from '@/app/_lib/data-service';

// Let's imagine your colleague already built this component 😃

export default async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();                                                 // - as it is fetching data here.. so it is a server comp
  const flag =                          
    countries.find((country) => country.name === defaultCountry)?.flag ?? '';

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option value=''>Select country...</option>
      {countries.map((c) => (
        <option key={c.name} value={`${c.name}%${c.flag}`}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
 * 
 * 
 * ? this creates a problem and throws an ERROR!
 * ---
 * - cause client component [/app/_components/UpdateProfileForm] rendering a server component [/app/_components/SelectCountry]
 * 
 * only solution:
 * >>> rendering server comp inside a client comp is by passing server comp as a 'PROP' to client comp
 * [code]
 * ------
// >>> /app/account/page.js
---
import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";

export const metadata = {
  title: "Update profile",
};

export default function Page() {    // - server comp
  // CHANGE
  const countryFlag = "pt.jpg";
  const nationality = "portugal";

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm>     // - client comp
        <SelectCountry                // - server comp
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}
 * 
 * 
 * - importing server comp [SelectCountry] inside another server comp [/app/account/page.js]
 *    - server [/app/account/page.js] already creates an instance of server comp [SelectCountry]
 * 
 * - that already executed comp instance is passed inside client comp [UpdateProfileForm] as a "PROP"
 * 
 * (server comp "/app/account/page.js" has already done it's work >> data fetching, JSX has executed, and at last this becomes a react-element...
 *    ...this react element now passed into client comp: "UpdateProfileForm" >> client comp does not have to do any work now!)
 * 
 * 
 * ! 7: Data Fetching Strategies for the Reservation Section
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: diff strategies to fetch multiple pieces of data on single page)
 * 
 * [code]
 * ------
// >>> /app/cabins/[cabinId]/page.js
---
export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  return {
    title: `Cabin-${cabin.name}`,
  };
}

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => {
    cabinId: String(cabin.id);
  });
  return ids;
}

export default async function Page({ params }) {

  // const cabin = await getCabin(params.cabinId);                        |
  // const settings = await getSettings();                                | // - insert here every data fetching logic here [hence this is a server comp] .. 2
  // const bookedDates = await getBookedDatesByCabinId(params.cabinId);   |

  const { id, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image
            src={image}
            fill
            className="object-cover"
            alt={`Cabin ${name}`}
          />
        </div>
        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
            Cabin {name}
          </h3>
          <p className="text-lg text-primary-300 mb-10">
            <TextExpander>{description}</TextExpander>
          </p>
          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                For up to <span className="font-bold">{maxCapacity}</span>{" "}
                guests
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <MapPinIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Located in the heart of the{" "}
                <span className="font-bold">Dolomites</span> (Italy)
              </span>
            </li>
            <li className="flex gap-3 items-center">
              <EyeSlashIcon className="h-5 w-5 text-primary-600" />
              <span className="text-lg">
                Privacy <span className="font-bold">100%</span> guaranteed
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
          <DateSelector />
          <ReservationForm />             // - inserted two more comp here [these are client-components] >> no data fetching has to be done inside these .. 1
        </div>
      </div>
    </div>
  );
}
 * 
 * 
 * # at 2
 * - every data fetching logic needed for comps: [DateSelector, ReservationForm] have been added in this server comp
 * (as [DateSelector, ReservationForm]) are client comp and can not add fetch logic inside client comps
 * 
 * - as there are three OR multiple fetch requests.. they block each other as each request takes some time
 * 
 * $ PROBLEM
 * ---
// const cabin = await getCabin(params.cabinId);                        |
// const settings = await getSettings();                                | // - insert here every data fetching logic here [hence this is a server comp] .. 2
// const bookedDates = await getBookedDatesByCabinId(params.cabinId);   |       // - this creating a blocking WATERFALL
 * 
 * 
 * - waterfalls: fetching different pieces of data which does not depend on each other!
 *    - as fetch requests are blocking each other!
 * 
 * ? USING DIFFERENT WAYS TO FETCH MULTIPLE DATA AT ONCE IN A SINGLE SERVER COMP
 * ---
 * [BETTER]
 * >>> 1. use Promise.all([fetchFn1, fetchFn2, fetchFn3... fetchFn(N)])
 * (for multiple request fetchers)
 * 
 * [code]
 * ------
const [cabin, settings, bookedDates] = await Promise.all([
  getCabin(params.cabinId),
  getSettings(),
  getBookedDatesByCabinId(params.cabinId),
]);
 * 
 * 
 * - this is a BETTER solution but we can follow a BEST one!
 * 
 * [BEST]
 * instead of fetching all data on a parent page >> 
 * >>> 2. create bunch of different comp >> where each comp fetch it's data...
 *    >>> ...those components can be streamed in after they become ready! 
 * 
 * # 1.
 * - creating a comp [Reservation.js] with below 'div'
 * 
<div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
  <DateSelector />
  <ReservationForm />             // - inserted two more comp here [these are client-components] >> no data fetching has to be done inside these .. 1
</div>
 * 
 * 
 * - Reservation.js file
 * [code]
 * ------
// >>> /app/_components/Reservation.js 
---
export default async function Reservation() {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(params.cabinId),
  ]);

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector />
      <ReservationForm />
    </div>
  );
}
-------------------------------------------- CONNECTED --------------------------------------------
// >>> /app/cabins/[cabinId]/page.js
---
<div>
  <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
    Reserve {name} today. Pay on arrival.
  </h2>
  <Reservation />
</div>
 * 
 * 
 * # 2. 
 * - activating GRANULAR level streaming with "Suspense"
 * [code]
 * ------
<div>
  <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
    Reserve {name} today. Pay on arrival.
  </h2>

  <Suspense fallback={<Spinner />}>   |
    <Reservation cabin={cabin} />     | // - as this is wrapped inside "Suspense" it will show a loader only for this comp
  </Suspense>                         |       // - but not for entire comp
</div>
 * 
 * 
 * $ NOTE
 * - separated an entire component into separated multiple comps
 * [code]
 * ------
// >>> /app/_components/Cabin.js
---
export default function Cabin({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
      <div className="relative scale-[1.15] -translate-x-3">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${name}`}
        />
      </div>
      <div>
        <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
          Cabin {name}
        </h3>
        <p className="text-lg text-primary-300 mb-10">
          <TextExpander>{description}</TextExpander>
        </p>
        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located in the heart of the{" "}
              <span className="font-bold">Dolomites</span> (Italy)
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Privacy <span className="font-bold">100%</span> guaranteed
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
----------------------------------------------- CONNECTED -----------------------------------------------
// >>> /app/_components/Reservation.js
---
export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      <ReservationForm cabin={cabin} />
    </div>
  );
}
----------------------------------------------- CONNECTED -----------------------------------------------
// >>> /app/cabins/[cabinId]/page.js
---
export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  return {
    title: `Cabin-${cabin.name}`,
  };
}
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => {
    cabinId: String(cabin.id);
  });
  return ids;
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);       
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
 * 
 * 
 * - inside the above component: "/app/cabins/[cabinId]/page.js"
 *    - cabin data is required inside "/[cabinId]/page.js" and "Reservation" and also inside "Cabin" components
 * SO
 * $ REMEMBER
 * ...
 * - from CACHE lecture we discussed "Request Memoization"
 *    - which allows us to do a similar fetch req in multiple elements in a tree.. and it will then gets de-duplicated 
 * [which is only one request to original data source will be made] 
 * 
 * >>> we can use a this above solution
 *    - but as this is a simple tree.. we fetched data and passed it as a prop
 * [as these components are only one level deep so it is a simple tree]
 * 
 * 
 * ! 8: Using the Context API for State Management
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: how to use CONTEXT API for state management in NEXT.JS application)
 * 
 * - "DateSelector.js" and "ReservationForm.js" files
 * [code]
 * ------
// >>> /app/_components/DateSelector
---
"use client"

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}
export default function DateSelector({ cabin, settings, bookedDates }) {

  const [range, setRange] = useState({ from: undefined, to: undefined });   // - we have state inside only DateSelector.js but not inside ReservationForm.js

  // - CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;
  // - SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"
        onSelect={setRange}         // - date has to selected in a range
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>
        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
------------------------------------ CONNECTED ------------------------------------
// >>> /app/_components/Reservation.js
---
"use client"

export default function ReservationForm({ cabin }) {
  //- CHANGE
  const { maxCapacity } = cabin;

  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>
        // <div className='flex gap-4 items-center'>
        //   <img
        //     // Important to display google profile images
        //     referrerPolicy='no-referrer'
        //     className='h-8 rounded-full'
        //     src={user.image}
        //     alt={user.name}
        //   />
        //   <p>{user.name}</p>
        // </div>
      </div>

      <form className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>
        <div className="flex justify-end items-center gap-6">
          <p className="text-primary-300 text-base">Start by selecting dates</p>
          <button className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
            Reserve now
          </button>
        </div>
      </form>
    </div>
  );
}
 * 
 * - from DateSelector.js file.. we need to share a common state: [selected range of dates] in these 2 component-files [DateSelector and ReservationForm]
 * 
 * >>> 1. storing state inside URL
 * (why this isn't possible)
 * - each time we would select a data range.. will update that page's URL 
 *    - which in turn create a new NAVIGATION
 * [new NAVIGATION >> re-renders server-comp >> re-rendering causes re-fetching of data on that page] // => this creates DELAY & EXPENSIVE CALCULATIONS
 * 
 * >>> 2. creating a parent comp and storing state inside it: [Reservation.js]..
 *    >>> ..passing state from that comp to it's children [DateSelector.js and ReservationForm.js]
 * (why this isn't possible)
 * - alias LIFTING STATE to a common parent comp // => which takes more time to analyze
 * 
 * >>> 3. using React-Context API
 * [WKT]
 * - contextAPI only works for client comp
 * 
 * # OPTION-3
 * A. creating context file
 *    - create "ReservationContext.js" file inside /app/_components
 * 
 * B. create, provide and use context
 * [code]
 * ------
// >>> /app/_components/ReservationContext.js
---
"use client";
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialState = { from: undefined, to: undefined };

function ReservationProvider({ children }) {
  // - STATE
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}
function useReservationContext() {
  const context = useContext(ReservationContext);
  if (context === undefined) {
    throw new Error("Reservation context is used outside Context Provider");
  }
  return context;
}
export { ReservationProvider, useReservationContext };
 * 
 * - "ReservationProvider" has to be used to provide context to client components: "DateSelector" and "ReservationForm" 
 * 
 * $ NOTE & REMEMBER
 * - always place Context-Provider as deep as down inside a REACT-COMPONENT tree!
 *    [so this does not cause un-necessary re-renders]
 * --
 * - but as per the need of our present application.. we need to provide context for every client comp
 * 
 * >>> solution
 * - placing context provider inside layout.js [root/global layout.js] >> [/app/layout.js]  
 * [code]
 * ------
// >>> /app/layout.js
---
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100
       min-h-screen flex flex-col`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid ">
          <main className="max-w-7xl mx-auto w-full ">
            <ReservationProvider>   |
              {children}            | // - ReservationContext was added here!
            </ReservationProvider>  |
          </main>
        </div>
      </body>
    </html>
  );
}
 * 
 * - as we are wrapping a server comp: {children} [that are every page.js that may get rendered] inside client comp: "ReservationProvider"
 *    [but this is not allowed as per what we learnt so far..]
 * - but we know that server has already rendered children: "server-components" [means already executed.. got a react element after execution] 
 *    - so it is "OKAY" to wrap "server: children" inside "client: ReservationProvider"
 * 
 * >>> [some updates]
 * - added some more files which are dependent on this Context!
 * [code]
 * ------
// >>> /app/_components/ReservationReminder.js
---
"use client"
export default function ReservationReminder() {
  const { range, resetRange } = useReservationContext();      // - Imported here!

  if (!range.from || !range.to) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
      <p>
        <span>👋</span> Do not forget to reserve your dates <br /> from{" "}
        {format(new Date(range.from), "MMM dd yyyy")} to{" "}
        {format(new Date(range.to), "MMM dd yyyy")}
      </p>
      <button
        className="rounded-full p-1 hover:bg-accent-600 transition-all"
        onClick={resetRange}                                                        // - ReservationContext is required here!
      >                     
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
------------------------------------------ CONNECTED ------------------------------------------
// >>> /app/cabins/page.js
---
export default function Page({ searchParams }) {
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
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />             // - the above client-comp: "ReservationReminder" is rendered here!
      </Suspense>
    </div>
  );
}
------------------------------------------ UPDATED-DateSelector-FILE ------------------------------------------
updated DateSelector file after adding context
// >>> /app/_components/DateSelector
---
"use client";

function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some((date) =>
      isWithinInterval(date, { start: range.from, end: range.to })
    )
  );
}

export default function DateSelector({ cabin, settings, bookedDates }) {
  const { range, setRange, resetRange } = useReservationContext();    // - imported Context here!

  // - CHANGE
  const regularPrice = 23;
  const discount = 23;
  const numNights = 23;
  const cabinPrice = 23;

  // - SETTINGS
  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="flex flex-col justify-between">
      <DayPicker
        className="pt-12 place-self-center"
        mode="range"

        onSelect={setRange}   |
        selected={range}      | .. // - used context here!

        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        captionLayout="dropdown"
        numberOfMonths={2}
      />
      <div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
        <div className="flex items-baseline gap-6">
          <p className="flex gap-2 items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-2xl">${regularPrice - discount}</span>
                <span className="line-through font-semibold text-primary-700">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-2xl">${regularPrice}</span>
            )}
            <span className="">/night</span>
          </p>
          {numNights ? (
            <>
              <p className="bg-accent-600 px-3 py-2 text-2xl">
                <span>&times;</span> <span>{numNights}</span>
              </p>
              <p>
                <span className="text-lg font-bold uppercase">Total</span>{" "}
                <span className="text-2xl font-semibold">${cabinPrice}</span>
              </p>
            </>
          ) : null}
        </div>
        {range.from || range.to ? (
          <button
            className="border border-primary-800 py-2 px-4 text-sm font-semibold"
            onClick={resetRange}
          >                   \
            Clear              +---=> // - used imported 'context' here! 
          </button>
        ) : null}
      </div>
    </div>
  );
}
 * 
 * $ REMEMBER:
 * - easily remember that there are two different components: "CLIENT" and "SERVER"
 *    - CONTEXT that was created in this lecture is used inside only CLIENT components.. 
 *        - ..so whenever context changes.. CLIENT-comps under CONTEXT-PROVIDER changes!
 * 
 * 
 * ! 9: Creating an API Endpoint With Route Handlers
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: How to build an API endpoint from NEXT.JS using feature: "Route-Handlers")
 * 
 * $ NOTE
 * - while using "APP" router in NEXT.JS there is no need of building "API-endpoint"
 *    - as it is only required inside in previous NEXT.JS versions where "PAGE" routers been used
 * 
 * ? WHY API endpoints are required
 * ---
 * - to mutate data
 *    - inside APP router.. we use server actions 
 *    - but in PAGES router.. we had to use API endpoints
 * 
 * ? HOW: to create API endpoints >> we have to use "ROUTE-HANDLERS"
 * ---
 * [as NEXT is full of conventions.. it is required to follow another convention to create API endpoints with route.js file]
 * 
 * - so create another file "route.js" 
 *    - can be placed inside any folder >> that should not have page.js file
 * (means.. when req is sent to URL corresponding to this ROUTE-HANDLER >> HTML should NOT be returned.. 
 *    .. only JSON data has to be returned after execution)
 * 
 * [CAUSE]
 * - when there is page.js.. it returns HTML >> but route handler returns JSON data.. this create a "CONFLICT"
 * 
 * [STEPS]
 * - 1. create a folder: "api" inside /app directly and create a "route.js" inside /app/api [but not page.js] 
 * - 2. inside this file >> export one or more functions which correspond to HTTP requests [GET / POST / PUT / PATCH / DELETE] 
 * EX: 
 *    export async function GET() {}
 *    export async function PUT() {}
 *    export async function POST() {}
 *    export async function PATCH() {}
 *    export async function DELETE() {}
 * 
 * - 3. to send a response and check out the request.. these route handlers use WEB-STANDARDS such as [Request and Response]
 *    - these are not NEXT.JS features but normal JS web standards such as: Response.json()
 * [code]
 * ------
export async function GET() {
  return Response.json({ test: "test" });
}
 * 
 * 
 * >>> A. using normal segmented URL: "localhost:3000/api"
 * - when requested for "localhost:3000/api"
 *    - we will get response in JSON format: { "test": "test" }
 * 
 * [when URL contains a dynamic ID]
 * >>> B. using dynamic segmented URL: "localhost:3000/api/cabins/90"
 * 
 * B.1
 * - create a folder /api inside /app 
 *    - then inside /app/api create /cabins folder 
 *        - then inside /app/api/cabins create dynamic segment folder /[cabinID]
 * complete folder: "/app/api/cabins/[cabinId]" and place the route.js file inside this routed-folder
 * [code] 
 * ------
// >>> /app/api/cabins/[cabinId]
---
export async function GET() {
  return Response.json({ test: "test" });
}
 * 
 * - so when user requests to URL: "localhost:3000/api/cabins/90"
 *                                 +-------------+----+------+---+
 *                                    |             |     |     |
 *                                  /app          /api    |   [cabinID]
 *                                                     /cabins
 * - response generated: { "test": "test" }
 * 
 * - this route-handler also gets access to: "request" and "{params}" objects
 * [code]
 * ------
export async function GET( request, {params} ) {}
 * 
 * - on logging request and params to console.. we get request object with headers and parameters passed inside URL 
 * [if URL is: "localhost:3000/api/cabins/90".. then params: 90]
 * 
 * $ SUMMARY:
 * - creating own API endpoint is best cause we don't have to expose SUPABASE API endpoint to these affiliates
 * - we can keep our API keys hidden [this way of creating API endpoints helps us to abstract supabase API data]
 * 
 * [final-code]
 * ------------
// >>> /app/api/cabins/[cabinId]/route.js
---
export async function GET(request, { params }) {      // - we don't provide custom names but only HTTP verbs: "GET", "POST", "PUT", etc.,
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
    //
  } catch (err) {
    return Response.json({ message: "Cabin not found!" });
  }
}
 * 
 * - this is how we create own custom END-POINTS in NEXT.JS
 * - but we don't need these cause we have SERVER-ACTIONS 
 * 
 * 
 *  
 * ! COMPLETED !
 * 
 * next section
 * => Authentication
 * 
 */