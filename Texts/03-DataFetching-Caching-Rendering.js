// ! 03 Data-Fetching, Caching, Rendering
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
/**
 * ! 1. Section Overview
 * -+-+-+-+-+-+-+-+-+-+-+
 * (techniques used for data-streaming, caching and rendering)
 * 
 * - how to work with data effectively in NEXT.JS 
 * - STREAMING with suspense and loading.js
 * - STATIC vs. DYNAMIC rendering
 * - CACHING mechanisms
 * 
 * 
 * ! 2. Setting Up Supabase
 * -+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * - follow the database that was created in REACT course while making a staff-facing webpage
 *      - set up accordingly following SUPABASE related videos!
 * 
 * - now in NEXT.JS root fol >>> inside "_lib" fol create JS files (file which are not related comp)
 *      - which contains database related logic (similar files which are related to data)
 * 
 * >>> configuring same data from SUPABASE
 *      - using same data that was used while making staff-faced web application
 * [steps]
 * - create a file "supabase.js" inside "_lib" fol
 * - install correct supabase - package
 *      => npm i @supabase/supabase-js
 * 
 * inside supabase.js file:
 * ---
import { createClient } from "@supabase/supabase-js"

const supabase = createClient()
 * 
 * - inside "createClient" which require "supabase-URL" and "key"
 *      - as next supports ENVIRONMENT VARIABLES
 * 
 * - create ".env.local" file inside PROJECT folder [but not inside root/app folder]
 *      - where we can specify few KEY-VALUE pairs!
 * 
 * - create constants inside that file (follow capital letter convention)
 *      - SUPABASE_URL => where we store supabase-URL
 * 
 * ? SUPABASE_URL
 * ---
 * 1:
 * - inside supabase website "https://supabase.com/dashboard/project/tnyqooxosavmcfmyoweh"
 * 2:
 * - navigate to PROJECT-SETTINGS >>> click on "DATA API" and 
 * 3:
 * - copy Project URL: "https://tnyqooxosavmcfmyoweh.supabase.co"
 * 4:
 * - paste into variable "SUPABASE_URL"
 *      - SUPABASE_URL=https://tnyqooxosavmcfmyoweh.supabase.co
 * 
 * ? SUPABASE_KEY
 * ---
 * - we had set-up ROW-LEVEL-SECURITY for every data that was present on SUPABASE!
 *      - but without authentication users now cannot access/read data from supabase!
 * 
 * - so we need to BYPASS that row-level-security [which can only be possible with "service_role" key]
 *      - so navigate to PROJECT-SETTINGS >> and then "API-KEYS" >> and then copy "service_role" key
 * [service_role will BYPASS this ROW-LEVEL-SECURITY]
 * 
 * 1:
 * - create another variable "SUPABASE_KEY"
 * 2:
 * - copy "service_role" from API-KEY of supabase project-settings
 * 3: 
 * - paste into variable "SUPABASE_KEY"
 * 
 * - this key will only stay on server [where no one has access to!]
 *      - if we need to get that same data on client >> then fetch data on server and pass that data to client through PROPS
 * 
 * $ IMP SUPABASE_KEY
 * - however holds this key gets access to data that was present on SUPABASE
 *      - so with that stored on server.. and make sure that it DO NOT REACH CLIENT 
 * [so that database will not be HACKED!]
 * 
 * $ NOTE
 * - what ever constants we store inside .env.local file are not available outside 
 *      - they are protected and secured 
 * - but constants which have a prefix "NEXT_PUBLIC_CON_NAME" will be available to public outside
 *      - these are not protected and secured!
 * 
 * - so constants inside .env.local file are only available for local-project
 *      - this file cannot be pushed to GITHUB!
 * [so we can place some sensitive data like API-KEYS or other secret information in this file]
 * 
 * - therefore constants/variables inside this file will not be leaked 
 * 
 * FILES-UPDATED! 
 * ---
// >>> .env.local
---
SUPABASE_URL = https://tnyqooxosavmcfmyoweh.supabase.co
SUPABASE_KEY = %% MASKED %%

========================================== CONNECTED ==========================================
// >>> supabase.js
---
import { createClient } from "@supabase/supabase-js"
export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

========================================== CONNECTED ==========================================
// >>> data-service.js
---
import { eachDayOfInterval } from 'date-fns';

// # IMPORT supabase >>> which contains URL and KEY
import { supabase } from './supabase';                  // #1

/////////////
// - GET

export async function getCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .select('*')
    .eq('id', id)
    .single();
  // - For testing
  // await new Promise((res) => setTimeout(res, 1000));

  if (error) {
    console.error(error);
  }
  return data;
}
export async function getCabinPrice(id) {
  const { data, error } = await supabase
    .from('cabins')
    .select('regularPrice, discount')
    .eq('id', id)
    .single();
  if (error) {
    console.error(error);
  }
  return data;
}
export const getCabins = async function () {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
};
// - Guests are uniquely identified by their email address
export async function getGuest(email) {
  const { data, error } = await supabase
    .from('guests')
    .select('*')
    .eq('email', email)
    .single();
  // - No error here! We handle the possibility of no guest in the sign in callback
  return data;
}
export async function getBooking(id) {
  const { data, error, count } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', id)
    .single();
  if (error) {
    console.error(error);
    throw new Error('Booking could not get loaded');
  }
  return data;
}
export async function getBookings(guestId) {
  const { data, error, count } = await supabase
    .from('bookings')
    // - We actually also need data on the cabins as well. But let's ONLY take the data that we actually need, in order to reduce downloaded data.
    .select(
      'id, created_at, startDate, endDate, numNights, numGuests, totalPrice, guestId, cabinId, cabins(name, image)'
    )
    .eq('guestId', guestId)
    .order('startDate');
  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}
export async function getBookedDatesByCabinId(cabinId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();
  // - Getting all bookings
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('cabinId', cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);
  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  // - Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();
  return bookedDates;
}
export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();
  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}
export async function getCountries() {
  try {
    const res = await fetch(
      'https://restcountries.com/v2/all?fields=name,flag'
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error('Could not fetch countries');
  }
}

/////////////
// - CREATE
export async function createGuest(newGuest) {
  const { data, error } = await supabase.from('guests').insert([newGuest]);
  if (error) {
    console.error(error);
    throw new Error('Guest could not be created');
  }
  return data;
}
export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    // - So that the newly created object gets returned!
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }
  return data;
}

/////////////
// - UPDATE
// - The updatedFields is an object which should ONLY contain the updated data
export async function updateGuest(id, updatedFields) {
  const { data, error } = await supabase
    .from('guests')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error('Guest could not be updated');
  }
  return data;
}

export async function updateBooking(id, updatedFields) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', id)
    .select()
    .single();
  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

/////////////
// - DELETE
export async function deleteBooking(id) {
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);
  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
 * 
 * - inside data-service.js file ... all functions were set to GET / UPDATE / DELETE 
 *      - all these were pre-written by JONAS
 * 
 * - all these functions use "supabase" const that was exported from "supabase.js" file  
 *      [export const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)]
 * 
 * - this supabase inside supabase.js file uses process.env.SUPABASE_URL and process.env.SUPABASE_KEY
 *      - these were drawn / read out from .env.local file!
 * 
 * $ NOTE
 * - these variables stored inside .env.local file are available on PROCESS 
 *      - that is why they have to be read using "process.env.<var_name>"
 * 
 * from next lecture
 *      => we can fetch data and use CRUD operations - accordingly
 * 
 * 
 * ! 3. Fetching and Displaying Cabin List
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (from now on every operation.. depends upon fn that was written inside "data-service.js" file)
 * 
 * - to getCabins data from SUPABASE!
 *      - use pre-written fns... 
 * [code]
 * ------
export const getCabins = async function () {
  const { data, error } = await supabase
    .from('cabins')
    .select('id, name, maxCapacity, regularPrice, discount, image')
    .order('name');
  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }
  return data;
};
 * 
 * - so we use this fn to getCabins data for server-components!
 *      - so we can simply use async-await to fetch data from DATABASE!
 * [UPDATED-code]
 * ---
import CabinCard from "../_components/CabinCard";
import { getCabins } from "../_lib/data-service";

export const metadata = {
  title: "Cabins",
};

export default async function Page() {
  const cabins = await getCabins()          // -  simply use async-await to fetch data

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

      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />      // - uses "CabinCard" comp to render data accordingly (more on this later..)
          ))}
        </div>
      )}
    </div>
  );
}
 * 
 * - server comp will only return renderable JSX after data is successfully fetched!
 * 
 * - we just needed async-await to fetch data 
 *      - but not any useEffect / state to store data into!
 * [also we don't need any data fetching libraries!]
 * 
 * - we used an API layer here which fetches data from supabase API 
 * 
 * $ FINALLY
 * - make some updates inside "CabinCard" comp
 * [code]
 * ------
import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

function CabinCard({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  return (
    <div className="flex border-primary-800 border">
      <Image
        src={image}                                 // - we are getting image from a URL!
        alt={`Cabin ${name}`}
        className="flex-1 border-r border-primary-800"
      />
      <div className="flex-grow">
        <div className="pt-5 pb-4 px-7 bg-primary-950">
          <h3 className="text-accent-500 font-semibold text-2xl mb-3">
            Cabin {name}
          </h3>
          <div className="flex gap-3 items-center mb-2">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <p className="text-lg text-primary-200">
              For up to <span className="font-bold">{maxCapacity}</span> guests
            </p>
          </div>
          <p className="flex gap-3 justify-end items-baseline">
            {discount > 0 ? (
              <>
                <span className="text-3xl font-[350]">
                  ${regularPrice - discount}
                </span>
                <span className="line-through font-semibold text-primary-600">
                  ${regularPrice}
                </span>
              </>
            ) : (
              <span className="text-3xl font-[350]">${regularPrice}</span>
            )}
            <span className="text-primary-200">/ night</span>
          </p>
        </div>
        <div className="bg-primary-950 border-t border-t-primary-800 text-right">
          <a
            href={`/cabins/${id}`}
            className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
          >
            Details & reservation &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
export default CabinCard;
 * 
 * - as we are getting images through a URL but not using static-images
 *      - so we cannot use "height / width" properties on those URL fetched images!
 * 
 * - so for URL fetched images.. we can only use "fill" property
 *      - if we used this it will filled out inside web-page entire viewport width and height!
 * 
 * ? IMP error ?
 * ---
 * - whenever we have to optimize an image using NEXT.JS image comp 
 *      - as that image URL inside "src" attr is hosted somewhere inside a DB: that is SUPABASE
 * 
 * - then we need to add that SUPABASE path to NEXT.JS config file
 *      - HOW CAN WE DO THAT: [check on URL: "https://nextjs.org/docs/messages/next-image-unconfigured-host"]
 * 
 * - config used in versions prior to 15th ver / latest ver:
images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'assets.example.com',
            port: '',
            pathname: '/account123/**',
            search: '',
        },
    ],
},
 * 
 * >>> configured next.config.mjs file!
 * [code]
 * ------
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'tnyqooxosavmcfmyoweh.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/cabin-images/**',
            },
        ],
    },
};
export default nextConfig;
 * 
 * ? formatting IMAGES with NEXT.JS Image component
 * --- 
 * [code]
 * ------
<div className="flex border-primary-800 border">
    <div className="flex-1 relative">
        <Image
            src={image}
            fill
            alt={`Cabin ${name}`}
            className="object-cover border-r border-primary-800"
        />
    </div>
---
</div>
 * 
 * - wrapped image into a parent comp [here used "div"]
 *      - so now made Image to listen to div's dimensions!
 * 
 * - now to make Image comp fit the parent div's relative dimensions
 *      - used "object-cover" on 'Image' comp's "className"
 * 
 *  
 * ! 4. Streaming Route Segments With loading.js File
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (here implementing specific "loading.js" file for only "cabins" route)
 * 
 * - every file that require in development was already pre-written inside starter files
 *      - simply copy them into our development folders [into _components fol]
 * [so we simply copied comp files: "Spinner" and "SpinnerMini" into out present WD: _components folder]
 * 
 * - but before that make changes inside GLOBAL-loading.js file
 * [code]
 * ------
import Spinner from "./_components/Spinner";

export default function Loading() {
  return <Spinner />
}
 * 
 * >>> creating a separate file that works specifically for only "cabins" route
 * [code]
 * ------
import Spinner from "./_components/Spinner";

export default function Loading() {
    return <div className="grid items-center justify-center">
        <Spinner />
        <p className="text-xl text-primary-200"> Loading cabins data...</p>
    </div>
}
 * 
 * - create a file "loading.js" inside specific "cabins" folder
 *      - this works only for cabins-route but not for other routes!
 * 
 * ? why to create "loading.js" file 
 * ---
 * - which activates STREAMING 
 *      - to activate STREAMING.. 1st we need JS enabled on browser!
 * 
 * >>> LATER IMPLEMENTATION
 * - on a webpage whenever we need text to be rendered first [text: that does not depend on any DB / supabase]
 *      - and then we could have a loading spinner for only data that has to be fetched from a DB
 * [this means loading spinner only require for dynamic data fetched from DB but not required for static data]
 * 
 * - we need GRANULAR control only for data that is being fetched from DB / SUPABASE!
 *      - so we need a feature called "SUSPENSE" 
 * [a react-feature]
 * 
 * next lecture... 
 *      => REACT-SUSPENSE!
 * 
 * 
 * ! 5. What is React Suspense?
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (a modern react feature called "REACT-SUSPENSE")
 * 
 * * SUSPENSE
 * - built-in react component we can use to catch/isolate components (or entire subtrees)..
 *      - that are "not ready to be rendered"  
 * 
 * [cause of asynchronous work that they were doing]
 * - so we can say that those comp or even entire sub-trees are suspending!
 * 
 * - it catches components that were suspending
 *      - similar to catch block catching errors (inside try-catch block)
 * 
 * ? causes of components to be SUSPENDING
 * ---
 * - both are asynchronous tasks
 * 1:
 * - fetching data (with a supported library)
 * 2:
 * - loading additional code (using react's lazy-loading)
 * [mainly suspense is used in the case of data-fetching]
 * 
 * [EX:]
 *      APP [eCommerce-APP]
 *       |
 * +---------+---------+
 * |         |         |
 * Nav       |         Filter
 *          Products        
 *          |       \ 
 *         List      +---=> this fetch data [suspending comp]
 * 
 * >>> so we need to catch PRODUCTS comp using "SUSPENSE"
 * 
 *      APP [eCommerce-APP]
 *       |
 *  +----------------+       +---=> Built-in react-comp
 *  |                |      /   
 *  Nav           SUSPENSE
 *                  |
 *             +-----------+
 *             |           |
 *          Products      Filter (let's say filter depends on PRODUCTS)
 *          |       \ 
 *         List      +---=> this fetch data [suspending comp]
 * 
 * - wrapping an async-comp into SUSPENSE 
 * - this is react native way to support "asynchronous" operations in a "declarative" way 
 * [this does not require isLoading state and render logic]
 *      >>> declarative means.. can use JSX comp 
 * 
 * ? how does SUSPENSE work
 * ---
 * [steps involved]
 * - while rendering.. react finds a comp OR a sub tree that is currently SUSPENDING!
 * 
 * - in which suspense backs up that comp to closest SUSPENSE parent (a-"boundary")
 *      - BOUNDARY: it separates suspending sub-tree from rest of the application!
 * 
 * - in this step all the rendered children are "discarded"
 *      - then a FALLBACK comp or JSX will be rendered instead!
 * 
 *      APP [eCommerce-APP]
 *       |
 *  +----------------+       +---=> Built-in react-comp
 *  |                |      /   
 *  Nav           SUSPENSE
 *                  |
 *                spinner 
 * 
 * - WHILE asynchronous operations happen in background!
 *      - fallback may be the LOADING sinner!
 * 
 * [prev., we have to use isLoading state and render a spinner]
 * - but here we can use REACT-SUSPENSE and render a loading-spinner instead of a async-comp
 * 
 * - once async operations are done!
 * - react attempt to render the subtree which is ready now!
 *      - but under suspense boundary again
 * [sub tree OR comp is rendered using fetched data]
 * 
 * $ IMP NOTE
 * - comp do not automatically suspend just cause of an async operation is happening inside of them!
 * 
 * - if we make a regular fetch request inside an effect or an event handler
 *      - then a regular React app, the component will not automatically suspend and Suspense won't work
 * [cause]
 * - The whole Suspense architecture is extremely complex.. 
 *      - and manually integrating asynchronous operations with Suspense is very hard.
 * [so]
 * - we leave this work to libraries and frameworks
 *      - use something like React Query, remix, or Next.js.
 * 
 * ? A LOOK BEHIND THE SCENES ?
 * --- 
 * SKIPPED
 * 
 * 
 * ! 6. Streaming UI With Suspense: Cabin List
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Practice: use SUSPENSE in order to stream single piece of UI)
 * 
 * [code that needs SUSPENSE]
 * ------
// >>> cabins/page.js
---
export default async function Page() {
  const cabins = await getCabins()
  console.log(cabins)

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian ...
      </p>
      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}
 * 
 * - we implemented a loading-spinner which is rendered while data was fetching.. 
 *      - but that will replace and blocks entire UI with spinner!
 * [but]
 * <p className="text-primary-200 text-lg mb-10">  Cozy yet luxurious cabins, located right in the heart of the Italian ... </p>
 * - this part does not depend on data fetching at all!
 * 
 * [so only]
 * {cabins.length > 0 && ( 
 *      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
 *          {cabins.map((cabin) => (
 *              <CabinCard cabin={cabin} key={cabin.id} />
 *          ))}
 *      </div>
 * )}
 * - this part has to depend upon data-fetching.. so this needs to be streamed in!
 * 
 * >>> use suspense boundary in NEXT to achieve that!
 * - move data-fetching logic into a separate comp and then wrap that entire into a suspense boundary
 * [code]
 * ------
// >>> cabins/page.js
---
import { Suspense } from "react";

export const metadata = {
  title: "Cabins",
};

export default function Page() {
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
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
// >>> CabinList
---
export default async function CabinList() {
    const cabins = await getCabins()
    if(!cabins.length) return null
    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
            {cabins.map((cabin) => (
                <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}
 * 
 * - separating the data-fetching logic into a separate file
 * - importing that new comp into a file where it is needed!
 * - wrapping it with Suspense a-react-comp
 *      - with a fallback as a prop which takes a comp (which has to be loader/spinner)
 * 
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
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
 * 
 */