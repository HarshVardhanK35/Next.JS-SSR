// ! 03 Data-Fetching, Caching, Rendering (P-1)
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
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
 * [steps]
 * - separating the data-fetching logic into a separate file
 * - importing that new comp into a file where it is needed!
 * - wrapping it with Suspense a-react-comp
 *      - with a fallback as a prop which takes a comp (which has to be loader/spinner)
 * 
 * 
 * ! 7. Dynamic Route Segments: Building the Cabin Page
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (whenever we click on individual cabins.. it shall take users to cabin pages)
 * [code]
 * ------
<Link
  href={`/cabins/${id}`}
  className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
>
  Details & reservation &rarr;
</Link>
 * 
 * - this above code navigates users to cabins with their respective pages via cabin IDs
 * 
 * - we did not know which cabin-id was associated with which cabin
 *    - even if we know the cabin-id with each cabin >>> we cannot create folders and page.js for every route with dynamic ID
 * 
 * - we cannot know which ID would come inside a URL whenever user clicks on link specified with each cabins
 * 
 * >>> in this situation we need to use "DYNAMIC ROUTE SEGMENTS" 
 * [http://localhost:3000/cabins/106]
 *                              +---+      +---=> this value isn't pre-determined! 
 *                                |       / 
 *                         dynamic segment
 * 
 * - as this is the child route of cabins.. 
 *    - this means we have to create a folder inside /cabins
 * 
 * >>> square bracket convention for dynamic-routing
 *    - create a folder: [cabinId]
 * as every folder is a new route.. create a page.js file inside it!
 * 
 * - inside this page.js file >>> we have to fetch every cabin that is associated with clicked cabin-id
 *    - so we need to access the dynamically changing ID from the route!
 * 
 * - every dynamic route segment has access to a "params" prop
 *    - when we log that to console we get exactly the name of the dynamic route folder 
 * 
 * [code]
 * ------
import { getCabin } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default async function Page({ params }) {            // - we get access to "params" as it is a dynamic route segment

  const cabin = await getCabin(params.cabinId)      // - params a prop and an object has key >> "folder name: cabinId" and value >> "cabin's child-route with id"

  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24">
        <div className="relative scale-[1.15] -translate-x-3">
          <Image                \
            src={image}          +---=> // - has to be filled with image's dimensions 
            alt={`Cabin ${name}`} 
            className="object-cover"    // - as the image we get here is URL from DB but not a statically imported image! 
            fill                            // - that is why we used "fill" and "object-cover" over this.. which fills parent's dimensions
          />   
        </div>
        <div>
          <h3 className="text-accent-100 font-black text-7xl mb-5 translate-x-[-254px] bg-primary-950 p-6 pb-1 w-[150%]">
              Cabin {name}
          </h3>
          <p className="text-lg text-primary-300 mb-10">{description}</p>

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
        <h2 className="text-5xl font-semibold text-center">
            Reserve today. Pay on arrival.
        </h2>
      </div>
    </div>
  );
}
 * 
 * $ SUMMARY
 * [http://localhost:3000/cabins/106]
 *                              +---+                        +---=> we have to make a DYNAMIC-ROUTE-SEGMENT
 *                                |                         /
 *                                +---=> as this part is UNKNOWN!
 * 
 * - so to create "DYNAMIC-ROUTE-SEGMENT" use square-bracket-convention inside "/cabins" folder OR route
 * - which ever page.js that was associated inside this folder gets access to "params" prop.. 
 *    - which has access to dynamic-ID which changes whenever user clicks on different cabins
 * - "params" read the value: ID.. from respective page URL
 *    - and stores inside key: folderName that was provided while creating "dynamic-route-segment"
 * 
 * >>> NEXT.JS is full of conventions and REACT.JS is full of functions and other / 3rd party libraries!
 * 
 * 
 * ! 8. Generating Dynamic Metadata
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (generating dynamic metadata on the name of each cabin)
 * 
 * - static metadata
 * [code] 
 * ------
export const metadata = {
  title: "Cabin",
};
 * 
 * $ NOTE 
 * - but we need dynamic data shall get cabinId on every user-click
 * 
 * - dynamic metadata
 * [code]
 * ------
export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);         // #1
  return {
    title: `Cabin-${cabin.name}`,
  };
}
 * 
 * - as it is dynamic.. this fn gets access to "params" prop 
 *    - which in turn reads id from URL: "http://localhost:3000/cabins/106"
 * 
 * 1:
 * - NEXT.JS waits for data to be fetched from supabase!
 *    - before STREAMING UI to client
 * 
 * 
 * ! 9. Error Handling: Setting Up Error Boundaries
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Learn: Global-Error-Boundary >> whenever developers face an error while in development)
 * [code]
 * ------
<li className="flex gap-3 items-center">
  <UsersIcon className="h-5 w-5 text-primary-600" />
  <span className="text-lg">
    For up to <span className="font-bold">{maxCapacity}</span>{" "}   // #1
    guests
  </span>
</li>
 * 
 * 
 * [FOR-EXAMPLE]
 * 1: 
 * - INSIDE THE LINE.. 
 * ~ For up to <span className="font-bold">{maxCapacity}</span>{" "}
 * 
 * - if developers thought max-capacity value has to be get from a capacity object
 *    - and if they do { capacity.max }
 * 
 * - then it can throw an error 
 * [where capacity.max does not exist but only maxCapacity is destructured]
 *    - that raise while in development!
 * 
 * >>> we need to set-up a GLOBAL-ERROR-BOUNDARY
 *    - this will WRAP entire application into react-error boundary!
 * [similar to manual set-up of error-boundary]
 * 
 * >>> so we have to use new NEXT.JS convention to set-up error-boundary!
 * [steps]
 * - create a convention file called "error.js" inside app-folder
 *    inside root app folder / error.js
 * 
 * [code]
 * ------
"use client";   // - this makes client component

export default function Error({ error, reset }) {   // #1
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">ERROR: {error.message}</p>                   // - "message" from "error" object used here!

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}   
      >             \
        Try again    +---=> // - reset fn: in this case this does not do anything >> so we can add navigation onclick takes devs to cabins or another route! 
      </button>
    </main>
  );
}
 * 
 * 1: 
 * - this convention "error.js" component gets access to (error: object) and (reset: fn to reset the error boundary)
 * 
 * - this works for every component inside an application!
 *    - this works for every error and exceptions which may happen inside an app [but only in rendering]
 * [this means any error inside callback fns will not be caught by this type of error boundary.. 
 *    .. So only rendering errors will be caught right here]
 * 
 * $ NOTE
 * - this "error.js" boundary does not catch errors that might happen in the root layout.js file (app/layout.js)
 * - in order to catch errors inside root-layout.js [we need to create file called global-error.js]
 *    - that will then actually replace the entire layout.
 * >>> no need of this file: "global-error.js"
 * 
 * $ IMP
 * - error boundary need to be a client component! so use "use client" directive
 * 
 * $ SUMMARY
 * - we could have multiple similar error-boundaries in every route-folder 
 *    - or even deeper inside a folder structure! [like nested error-boundaries]
 * 
 * * know more about conventions
 * => https://nextjs.org/docs/app/getting-started/project-structure
 * - use this URL to know more about every convention that might need while in development!
 * 
 * next lecture...
 * - when user enter a URL that provide an error
 *    - NOT FOUND ERROR
 * => Learn: in next lecture!
 * 
 * 
 * ! 10. Error Handling: "Not Found" Errors
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Learn: how to handle "Not Found Errors" and how to create one!)
 * - when users tries to access a URL which is not defined / registered inside an application
 * 
 * # 1:   
 * - for ex: when users wants to navigate "/app/test" which is not-defined! 
 * 
 * - so again create a new file called "not-found.js" inside root folder (inside /app)
 *    - which listens to every not-found error inside every folder and file!
 *  
 * [/app/not-found.js]
 * ---
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This page could not be found :(
      </h1>
      <Link
        href="/"
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Go back home
      </Link>
    </main>
  );
}
 * 
 * # 2:
 * - when users navigate to cabins that were not found
 *    - with URL: "http://localhost:3000/cabins/99999999"
 * [here cabin with id: "99999999" is not found.. cause we didn't create that 99999999-cabin]
 * 
 * - but we got an error displayed on webpage which is... 
 *    - ERROR: Cannot read properties of null (reading 'name')
 * [but we need "This page could not be found :("] >>> [which was created by dev]
 * 
 * [so]
 * >>> in NEXT.JS.. not-found page can be shown in 2 ways:
 *    1: when URL does not exist [already discussed]
 *    2: manually triggering dev-created page by calling "notFound()" fun provided by "next/navigation"
 * 
 * [steps]
 * - use fn which is used to fetch data.. getCabin(id) fn 
 *    - inside it whenever there is an error: call "notFound" inside error-block! 
 * 
 * [getCabin-code]
 * ---
import { notFound } from "next/navigation";

// GET
------
export async function getCabin(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // For testing
  --------------
  // await new Promise((res) => setTimeout(res, 1000));   // - this is for slowing down the response!

  if (error) {
    console.error(error);
    notFound();
  }
  return data;
}
 * 
 * - then we get "This page could not be found :(" >>> which dev-defined error but not NEXT.JS defined error!
 * 
 * $ BONUS
 * - we can also define not-found.js file inside [cabinId] dynamic-route-segment folder!
 *    - used same code but changed HREF-URL and text in it.. 
 * [code]
 * ------
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="text-center space-y-6 mt-4">
      <h1 className="text-3xl font-semibold">
        This cabin could not be found :(
      </h1>
      <Link
        href="/cabins"            // - changes
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
      >
        Back to all cabins    // - changes
      </Link>
    </main>
  );
}
 * 
 * 
 * finished..
 *    first part of the section!
 * 
 * 
 * 
 */
