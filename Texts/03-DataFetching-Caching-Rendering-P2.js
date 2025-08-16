// ! 03 Data-Fetching, Caching, Rendering (P-2)
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
/**
 * ! 11. Different Types of SSR: Static vs. Dynamic Rendering
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Learn: two types of server-side rendering: STATIC and DYNAMIC)
 * 
 * [RECAP]
 * >>> server side rendering in NEXT.JS
 * ---
 * - as NEXT is REACT framework.. so rendering is done by react (but by following some rules) 
 * 
 * $ REMEMBER
 * - both server and client comp are rendered on server on initial render
 * 
 * - so NEXT uses react and react-DOM libraries to render each route one by one on server!
 *    - Next.js a splits the rendering work by route, like three routes of the same app [/pages, /news, /article]
 *        - and each route can be rendered in a different way.
 * - so each route can be either [STATIC and DYNAMIC]
 * [so not entire app that will be rendered but splitted routes will be rendered]
 * 
 * $ NOTE
 * - there is mix method of rendering in addition to these TWO methods [static and dynamic]
 *    - which is PARTIAL PRE-RENDERING [mix of static and dynamic]
 * (more on this later..)
 * 
 * /////////////////////
 * >>> STATIC rendering
 * ---
 * - HTML generated / built at RUN-TIME [which means mark-up is rendered whenever we run build command in NEXT.JS]
 * [rendering triggered by dev] >>> [means: mark-up rendered for ONCE at BUILD-TIME]
 * 
 * - whenever data for a route does not change on more often
 *    - pages which are not personalized to USER [ex: products page]
 * 
 * - default.. every route in NEXT is "statically" rendered
 *    [even when page / comp fetches data]
 * 
 * - as static sites/pages are faster than dynamic.. 
 *    - as they are already PRE-generated
 *    
 * - when DEPLOYED to VERCEL.. each static route is automatically hosted on a CDN
 *    [CDN: Content Delivery Network]
 * 
 * $ NOTE
 * - as every route does NOT NEED personalized user data.. so every route will be STATIC
 *    - so entire application can be exported as a STATIC SITE 
 * 
 * this process is called ---
 *    * STATIC SITE GENERATION [SSG]
 * 
 * ? FLAVOUR of static rendering ?
 * --- INCREMENTAL STATIC REGENERATION
 *    - where route can be re-rendered periodically in background!
 *      [which re-fetches data for routes from time-time]
 * 
 * //////////////////////
 * >>> DYNAMIC rendering
 * ---
 * - where HTML is generated at REQUEST-time [means: server renders a new version of a page for each req that hits the server]
 * [rendering triggered by USER]
 * 
 * - helpful when
 *    1:
 *    - data changes frequently and is personalized by USER [ex: cart]
 *    2:
 *    - rendering a route.. requires information that depends upon user [ex: search params]
 * 
 * - a route automatically switches to DYNAMIC on some certain conditions
 * 
 * ////////////////////////////////////////////
 * ? when does NEXT switches STATIC to DYNAMIC
 * (automatic process)
 * 
 * - devs can't choose how a route to be [STATIC or DYNAMIC]
 *    - as NEXT turns static to dynamic on following conditions.. 
 * 1: 
 * - route contains one or more dynamic segments 
 * [when pages use params prop in order to render some data.. 
 *    .. data which depends on dynamic segments]
 *        [and these dynamic segments only be known at REQ time]
 * 
 * 2: 
 * - when searchParams are used inside a page comp
 * [searchParam OR queryParam from a URL]
 *    ex: /product?quantity=23
 *  
 * 3: 
 * - if route's server comp reads incoming HEADERS or COOKIES
 * [whenever headers() or cookies() are used]
 * 
 * 4: 
 * - when an UNCACHED data request is made in any route's server components
 * [CACHING can be influenced.. more on this later!] 
 * 
 * $ NOTE
 * - 1: every condition is necessary cause none of these values are known by NEXT at build time
 * [a-reference]
 * - 2: this means we can FORCE next.js to render a route dynamically using:
 *        - export const dynamic = "force-dynamic"    >>> from page.js
 *        - export const revalidate = 0               >>> from page.js
 *        - { cache: "no-store" }                     >>> added to FETCH req in any of route's server comp
 *        - no store()                                >>> in any of route's server comp
 * 
 * ///////////////////////////////
 * >>> TERMINOLOGY we might need
 * ---
 * # CDN (Content Delivery Network)
 * CDN is a network of related servers that are located at many different positions around the globe.
 *    .. these servers CACHE and deliver (website's static content) 
 *    .. delivered to users from servers that are close to those users!
 * 
 * # serverless computing
 * with this.. we can run application code (back-end code).. without managing servers by ourselves
 *    .. instead we have to run functions: SERVERLESS FNS on a cloud provider (AWS/VERCEL)
 * 
 * in this model server is initialized and stays active only for duration of serverless fns are running!
 *    .. unlike NODE.JS server which has to run constantly
 * 
 * whenever we deploy a website to VERCEL.. each dynamic route becomes a SERVERLESS FUNCTION
 *    .. MEANS: NEXT.JS app is a collection of serverless functions [but not a huge NODE.JS app running on server]
 * 
 * # edge
 * anything that happens close to a user.. 
 *    .. so CDN is a part of EDGE as files are located as possible as to a user
 * # serverless "edge" computing 
 * where serverless computing does not happen on a central server.. but on a network 
 *    .. that was distributed around a globe.. as close as possible to a user
 * [means: EDGE computing is like a CDN but for running code in form of serverless fns]
 * 
 * # ISR (Incremental Static Regeneration)
 *  a next.js feature that allows devs to re-fetch and update data on a static page in background
 *    .. even after website is completely built and deployed!
 *    .. this happens by RE-FETCHING data for a comp OR for an entire route after a certain interval
 * 
 * 
 * ! 12. Analyzing Rendering in Our App
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (NEXT.JS decides how routes to be rendered [STATIC / DYNAMIC])
 * 
 * - so to analyze how a route is rendered:
 *    - we need to build the web-application [BUILD command that NEXT provided to us]
 * (for build command: check inside package.json file)
 * 
 * // PACKAGE.JSON file..
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
},
 *  
 * - inside terminal: run the command.. 
 *    => npm run build
 * 
 * - after running this command.. we get some errors (if any)
 * - it also lists each route that a user can use
 *    - lists each route with static and dynamic description
 * 
 * lists every route as follows [inside TERMINAL]
 * ---
Route (app)                              Size     First Load JS
┌ ○ /                                    526 B           101 kB
├ ○ /_not-found                          155 B          87.2 kB
├ ○ /about                               847 B          93.1 kB
├ ○ /account                             155 B          87.2 kB
├ ○ /account/profile                     155 B          87.2 kB
├ ○ /account/reservations                155 B          87.2 kB
├ ○ /cabins                              185 B           101 kB
├ ƒ /cabins/[cabinId]                    295 B          92.5 kB
└ ○ /icon.png                            0 B                0 B
 * 
 * 
 * [symbols]
 * - ○:  (Static)   pre-rendered as static content
 * - ƒ:  (Dynamic)  server-rendered on demand
 * 
 * 
 * ! 13. Making Dynamic Pages Static With generateStaticParams
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Use: "generateStaticParams" which lets NEXT.JS know of all values of a dynamic URL segment)
 * 
 * - use "generateStaticParams" fn which lets NEXT.JS to know every value of a dynamic URL segment
 *    - then we can export those pages as static pages! 
 * 
 * URL: http://localhost:3000/cabins/106
 * - NEXT.JS does not know [cabinId] before (at build time)
 *    - therefore every page with this similar route will be built at REQUEST-time! 
 * => IMPLIES: a dynamic routing
 * 
 * - if there are IDs (say: that they can be counted on fingers) 
 *    - so as devs we can inform NEXT.JS about these IDs.. so that we can make routes with those IDs static
 * [in order to perform this type of functionality.. we need a convention / function NEXT.JS uses]
 * 
 * [code]
 * ------
// >>> /cabins/[cabinId]/page.js
---
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  return {
    title: `Cabin-${cabin.name}`,
  };
}

export async function generateStaticParams() {    #1 // - used "generateStaticParams" fn here!
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => {
    cabinId: String(cabin.id);            #2 // - for each element inside an array: we need to have key- as "cabinId" same as DRS: /cabins/[cabinId]
  });
  return ids;           #3 // - we need to return an array
}

export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
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
          <p className="text-lg text-primary-300 mb-10">{description}</p>
          <ul className="flex flex-col gap-4 mb-7">
            <li className="flex gap-3 items-center">
              <UsersIcon className="h-5 w-5 text-primary-600" /> 
              <span className="text-lg"> For up to <span className="font-bold">{maxCapacity}</span>{" "} guests </span>
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
 * # 1: 
 * - exporting this fn can generate static / pre-rendered pages for finite number of values!
 * 
 * # 2 and 3: 
 * - inside fn: "generateStaticParams" >>> we need to return an array [3]
 *    - for each of the element inside this array.. should be an object [2] contains
 *      .. values:  finite number of cabin-id from database.. which must be of type: 'String'
 *      .. key:     must be the name of Dynamic-Segment: "cabinId" [same as nested-folder name /cabins/[cabinId]]    
 * 
 * $ OBSERVATION
 * - open TERMINAL and run: "npm run build" command
 * - check how routes were rendered this time!
 *    - which results as follows:
Route (app)                              Size     First Load JS
┌ ○ /                                    526 B           101 kB
├ ○ /_not-found                          155 B          87.2 kB
├ ○ /about                               847 B          93.1 kB
├ ○ /account                             155 B          87.2 kB
├ ○ /account/profile                     155 B          87.2 kB
├ ○ /account/reservations                155 B          87.2 kB
├ ○ /cabins                              185 B           101 kB
├ ● /cabins/[cabinId]                    295 B          92.5 kB
└ ○ /icon.png                            0 B                0 B
 * 
 * 
 * [symbols]
 * - ○  (Static)  pre-rendered as static content
 * - ●  (SSG)     pre-rendered as static HTML (uses getStaticProps)
 * 
 * - this time with "generateStaticParams" fn all DYNAMIC routes are converted to STATIC routes manually!
 * 
 * ////////////////////////////
 * ? but in before observation
Route (app)                              Size     First Load JS
┌ ○ /                                    526 B           101 kB
├ ○ /_not-found                          155 B          87.2 kB
├ ○ /about                               847 B          93.1 kB
├ ○ /account                             155 B          87.2 kB
├ ○ /account/profile                     155 B          87.2 kB
├ ○ /account/reservations                155 B          87.2 kB
├ ○ /cabins                              185 B           101 kB
├ ƒ /cabins/[cabinId]                    295 B          92.5 kB
└ ○ /icon.png                            0 B                0 B
 * 
 * 
 * [symbols]
 * - ○:  (Static)   pre-rendered as static content
 * - ƒ:  (Dynamic)  server-rendered on demand
 * 
 * $ SUMMARY
 * - if we have a finite set of values for a dynamic-segment of URL 
 *    - best if we inform NEXT.JS with "generateStaticParams-fn" about those values.. to generate static / pre-rendered pages
 * 
 * - so this can improve performance with static-pages!
 *    - we can also do STATIC-SITE-GENERATION [SSG]
 * 
 * next lecture..
 *    => Static Site Generation (SSG)
 * 
 * ! 14. Static Site Generation (SSG)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Learn: to export our site as a static-site with process called: "Static Site Generation")
 *    - resulted bundle can be easily hosted on a provider which supports static sites!
 * 
 * # 1: 
 * - make changes inside "next.config.mjs" file
 * [code] 
 * ------
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tnyqooxosavmcfmyoweh.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  output: "export",       // - set a new key-value pair here!
};
export default nextConfig;
 * 
 * - this makes our app to be exported completely as static assets so that we can deploy anywhere!
 * 
 * # 2:
 * - inside TERMINAL.. run "npm run build"
 *    - this creates new folder called: "out"
 * 
 * $ NOTE
 * - this process may raise errors if we didn't use "generateStaticParams" 
 *    - as entire routes are static and there are no dynamic routes.. this will not cause problem
 * [even if we have chance to run the fn: "generateStaticParams"]
 * 
 * /////////////////
 * >>> "out" folder
 * 
 * - this will be DEPLOYED to hosting providers to host our application
 *    - we could use this 'out' on hosting providers such as: [netlify, github pages, render.com]
 * 
 * - open in VS code and use extension "Live Server" to go live
 *    - which it creates a local-host server.. OUTPUT!
 * 
 * - out folder also contains .txt files which consists of "REACT SERVER COMPONENT- PAYLOAD"
 * [it consists links to CHUNKS >>> to part of the bundle AND some content looks like: react element]
 *    - this is all NEXT.JS need for client-side navigation 
 * 
 * //////////////////////////
 * ? but images do not work!
 * ---
 * [precisely]
 * - the <Image/> comp that we used to optimize images inside NEXT does not work
 * 
 * - as after generation of static site.. there will be no access to VERCEL's server [an API]
 *    - vercel server is used to optimize images with this <Image /> optimizer! 
 * 
 * [fixing this error]
 * 1:
 * - remove <Image /> with HTML's image tag [remove NEXT's optimization techniques] 
 * 
 * 2:
 * - use "CLOUDINARY" >>> an image optimization service 
 * [use JONAS's resources at starting of PART-5]
 * 
 * 
 * ! 15. Partial Pre-Rendering
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: new rendering strategy)
 * 
 * - most pages in a website do not need to be 100% static and 100% dynamic 
 * ex:
 * - if there is route which has navigation with dynamic username which gets it's value after user-signin
 *    - but most of the webpage on that route is static
 * - then making that entire page as dynamic.. would cause a problem!
 *    - as most of that page could be rendered statically at build-time and delivered via CDN [which makes that page faster]    
 * 
 * solved using: "Partial Pre-Rendering"
 * 
 * * Partial Pre-Rendering
 * - this is a new rendering strategy.. which combines STATIC and DYNAMIC rendering in same route!
 * 
 * ///////////////////
 * ? HOW THIS WORKS ?
 * ---
 * 1: 
 * - a fully static (PRE-RENDERED) is served as fast as possible from a CDN.. 
 *    - leaving holes for DYNAMIC content!
 * >>> this is called SHELL [as it leaves some holes]
 * 
 * 2: 
 * slower DYNAMIC content is STREAMED in as it is rendered on server!
 * - in meantime server starts rendering DYNAMIC content.. which may take more time than sending static SHELL! 
 *    - as soon as some results are available.. 
 * >>> server starts STREAMING dynamic parts of that page to client to FILL HOLES
 * 
 * RESULT
 * - even faster pages that can mostly be delivered from edge (CDN).. even when there are small dynamic parts
 * 
 * $ NOTE
 * - as of NEXT.JS version: 14 >>> there was NO partial-pre-rendering feature yet! 
 * JONAS EXPLAINED: SKIPPED!
 * 
 *  
 * ! 16. How Next.js Caches Data
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: most confusing part: "CACHING" of NEXT.JS app router)
 * 
 * ? WHAT IS CACHING IN THE CONTEXT OF WEB-APPLICATION ?
 * ---
 * * CACHING
 * - storing fetched or computed data inside a temporary location for future access.. 
 *    - instead of having to re-fetch OR to re-compute data every time.. when same data is needed!
 * 
 * ////////////////////
 * >>> NEXT.JS CACHING
 * ---
 * - caches very AGGRESSIVELY >>> every thing that can be cached will be cached!
 * [inside both server and client-side's browser >>> caches fetched data and routes visited]
 * 
 * - NEXT also provides APIs to re-validate cached data 
 *    - re-validating ? removing data from cache and updating it with FRESH DATA (re-fetched OR re-computed)
 * 
 * - this makes NEXT.JS apps more performant and saves costs!
 * 
 * [CONS]
 * 1:
 * - caching is always ON by default: this causes strange and unexpected behavior! [stale data / data that was not updated]
 *    - and some caches cannot be turned off!
 * 2:
 * - different APIs affect and controls caching [which is more confusing]
 * 
 * ///////////////////////
 * >>> caching mechanisms
 * ---
 * there are 4 diff caching mechanisms in NEXT.JS
 *    three of them store data on server.. those are: 
 * 
 * ? [SERVER-SIDE CACHING]
 * 1: 
 * # request memoization  
 * ---
 * which data:
 *    - data fetched from similar "GET" requests
 *      [same URL and options in FETCH function]
 * how long:
 *    - data is cached and reused only during exact one page render
 *      [LIFESPAN: one page request (one render.. one user)]
 * enables:
 *    - no need to fetch at top of tree: same fetch in multiple components only makes one request
 *      [this type allows us to fetch data at multiple places in a tree without making multiple requests]
 *        [this type only works with NATIVE FETCH func and when requests are exactly same (same URL and options object)]
 *    |
 *    +---=> this type only in REACT-COMPONENT-TREE but not inside route handlers OR server actions [as it is a react-feature]
 * 
 * >>> revalidate: 
 * - no way of revalidating it! 
 *    [as memoization happens only over the lifespan of a single page render.]\
 * >>> opt out [turning off caching]:
 * - use an abort controller with the fetch function
 *    [check docs for more clarity!]
 * ---------------------------------------------------------------------------------------------------------------------------------
 * 2: 
 * # data cache
 * ---
 *    - stores every data that has been fetched either inside a specific-route OR from a single-fetch request!
 *      [data fetched in a route OR single fetch request] 
 *    - data stays there forever >>> until unless we decide to re-validate cache
 *      [means: data available across multiple requests from different users.. even survives when the app is redeployed]
 *    - data for static pages + ISR when re-validated
 *      [incremental static regeneration]
 * 
 * 3: 
 * # full route cache
 * ---  
 *    - This one stores the entire static pages in the form of HTML
 *      [entire static pages (HTML and RSC payload)]
 *    - full route cache is persisted until the data cache is invalidated
 *      [until the data cache is cleared >>> this will be cleared when new version is deployed]
 *    - static pages
 *      [static pages only have to be built once and can then be served to multiple users]
 * 
 * revalidate: 
 * - no way of revalidating it! 
 *    [as memoization happens only over the lifespan of a single page render.]\
 * opt out:
 * - use an abort controller with the fetch function
 *    [check docs for more clarity!]
 * 
 * >>> revalidate for both [data cache and full route cache]: 
 * 1:
 * - time based for every data on a page.js (automatic)
 *    - data cache to be automatically revalidated [after certain amt. of time]
 *    [We can do so for all the data on a certain page with.. ]
 * [code]
export const revalidate = <time>  [number of seconds]
 * 
 * 2:
 * - time based for one data request (automatic)
 * [code]
fetch('...', { next: { revalidate: <time> } })
 * 
 * 3:
 * - on demand (manual)
 *    - fn to be called here!
 * [code]
revalidatePath OR revalidateTag 
 * 
 * 
 * >>> opt out [data cache and full route cache] >>> [turning off caching]:
 * 1: 
 * - entire page ---
export const revalidate = 0 (page.js)
 *   
 * 2: 
 * - making dynamic page --- 
export const dynamic = "force-dynamic" (page.js) 
 * 
 * 3:
 * - individual request --- 
fetch("...", { cache: "no-store" }) 
 * 
 * 4:  
 * - individual server component --- 
noStore()
 * 
 * $ NOTE
 * - making dynamic pages removes caching feature
 *    - as caching can only be done on static pages!
 * 
 * ---------------------------------------------------------------------------------------------------------------------------------
 * ? [CLIENT-SIDE CACHING]
 * 4: 
 * # router cache
 * ---
 *    - store inside the browser, [applies to both static and dynamic routes]
 *      [all pre-fetched pages and already visited pages by user.. while user navigating around the application]
 * enables: 
 *    - as all pages stored in memory [allows instant navigation]
 *      [enables SPA with with no hard reloads]
 * [CONS]
 *    - pages are not requested from the server.. when user navigates back and forth [lead to stale data being displayed]
 *      [30 seconds if pages are DYNAMIC and for 5 minutes if pages are STATIC]
 *        [no re-validation.. updating only possible if user performs a hard reload]
 * 
 * revalidate: 
 * - no way of revalidating it! 
 *    [as memoization happens only over the lifespan of a single page render.]\
 * opt out:
 * - use an abort controller with the fetch function
 *    [check docs for more clarity!]
 * 
 * $ NOTE
 * - this above behavior is in PRODUCTION mode.. as caching does not work in development!
 * 
 * >>> revalidate:
 * 1:
 * - use functions in SERVER ACTIONS
revalidatePath (OR) revalidateTag 
 * 
 * 2: 
 * - using cookies in SERVER ACTIONS
cookies.set (OR) cookies.delete 
 * 
 * >>> opt out
 * - impossible 
 * ---------------------------------------------------------------------------------------------------------------------------------
 * 
 * next lecture.. 
 *    => practice caching!
 * 
 * ! 17. Experimenting With Caching and ISR
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Learn: NEXT's caching APIs.. focus on implementing and the need of ISR: "Incremental Static Regeneration")
 * 
 * - as caching does not work inside dev-mode [which only works inside PRODUCTION]
 *    - so we need to simulate PRODUCTION-env (if necessary!)
 * 
 * 1:
 * [simulating PROD-env can be done with "build" and "start" scripts inside >> package.json]
 *    [where BUILD helps to build app and START helps to start PROD-server]
 * - combining build and start scripts would simulate PRODUCTION-env
 *    - open terminal and use // => npm run build && npm run start
 * 
 * 2: 
 * - insert a new script inside PACKAGE.JSON!
 * [code]
 * ------
// >>> package.json:
---
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "prod": "next build && next start",   // - helps to simulate PROD-env
  "lint": "next lint"
},
 * 
 * - even if we have changed the data inside DB.. that will not reflect inside web-application that was started! 
 *    - as this behavior of application is because of DATA-cache and FULL-ROUTE-cache (but not cause of BROWSER-cache!)
 * [as this application is statically generated >> which means ROUTE here is cached with data (that was before starting of app)]
 * 
 * >>> making STATIC page as a DYNAMIC-page
 * - revalidate set to zero seconds!
 * [code]
 * ------
import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";

export const revalidate = 0;      // - making DYNAMIC here !

export const metadata = {
  title: "Cabins",
};

export default function Page() {
  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10"> .. </p>
      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
 * 
 * - as the npm run prod does not listen for changes.. so we need to run npm again!
 *  
 * $ NOTE
 * - after making it dynamic page.. will now regenerate that page again for each request!
 * 
 * >>> need of middle ground
 * - we have to make pages a mix of static and dynamic
 *    - as data may change at a certain time but not probably in a minute OR in a day
 * 
 * >>> [ROUTE-level revalidation]
 * ---
 * * ISR (Incremental Static Regeneration)
 *    - this regenerate a static page and fetch data for it time to time!
 * 
 * - [we have to define that time]
 *    - which can be done using "export const revalidate" 
 * [we can assign a value that will regenerate pages every once / hr] 
 * 
 * [code]
 * ------
export const revalidate = 3600; //- regenerating once / hour
export const revalidate = 15;   //- regenerating for every 15 sec
 * 
 * - this makes static pages to dynamic by fetching data for every specified time period in seconds!
 * 
 * $ NOTE 
 * - this is imp for pages which has more TRAFFIC 
 * - this is a best technique if data does not change constantly but for time-time
 * - till now this is for route-level ISR!
 * 
 * 
 * >>> [COMPONENT-level revalidation]
 * ---
 * #1 [REVALIDATION]
 * [we need comp which is making FETCH req and need to attach revalidation to it!]
 * - but we aren't using fetch function to fetch data but we are using SUPABASE fns
 * 
 * [code] 
 * ------
export const getCabins = async function () {
  const { data, error } = await supabase
    .from("cabins")
    .select("id, name, maxCapacity, regularPrice, discount, image")
    .order("name");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
};
 * 
 * - but we learnt that >> we need to pass in revalidate time inside FETCH-fn
 * 
 * #2 [OPT-OUT]:
 * - but we can OPT-out caching inside respective component
 *    - for that we need to use "NEXT's noStore fn"
 * ---
 * 2.1:
 * - import noStore from next/cache
 * 2.2:
 * - use at starting of respective function where data is being fetched!
 * ---
 * [code]
 * ------
import { unstable_noStore as noStore } from "next/cache";   // - import noStore()

import CabinCard from "./CabinCard";
import { getCabins } from "../_lib/data-service";

export default async function CabinList() {
  noStore();                                            // - this makes a page dynamic !

  const cabins = await getCabins();
  if (!cabins.length) return null;
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
 * 
 * - even though below are in-active!
 *    export const revalidate = 3600; 
 *    export const revalidate = 15;   
 * 
 * - calling "noStore" fn will make a comp dynamic.. [as this does not need "revalidate" variable]
 *    noStore() => this is opt-out
 * 
 * => this makes components Partial-Prerendering! 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * */
