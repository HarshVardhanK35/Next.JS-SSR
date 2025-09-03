// ! 02- Starting to Build the Wild Oasis Website
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
/**
 * ! 1. Section Overview
 * -+-+-+-+-+-+-+-+-+-+-+
 * (in this section..)
 * 
 * - Next.js project structure
 * - implementing pages
 * - font and image optimization techniques
 * - adding metadata and favicon
 * - "nested" layouts
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * - [PREV] while learning React.. we learned how to build "Wild-Oasis" project 
 * - we built HOTEL's internal web-app 
 *      - so, their staff members can manage everything about hotel: 
 *          - bookings, cabins and guests
 * (that project, we have a database [used supabase!])
 * 
 * - [NOW] we need a customer-facing website where guests / customers can learn about hotel.. 
 *      - ..browse all cabins, reserve a cabin, create and update their profile!
 * 
 * - same data that was used for INTERNAL-STAFF app has to be same while building customer-facing app
 *      - so updating data inside PREV built application shall reflect in app that we will build NOW
 * [CUSTOMER facing website shall view updated data that was updated inside INTERNAL-STAFF-app]
 * 
 * >>> CATEGORIZED - PROJECT-requirements:
 * ---
 * - Users of the app are potential guests and actual guests
 * # ABOUT
 * - Guests should be able to learn all about the Wild Oasis Hotel 
 *  
 * # CABINS
 * - Guests should be able to get information about each cabin and see booked dates 
 * - Guests should be able to filter cabins by their maximum guest capacity 
 * 
 * # RESERVATIONS
 * - Guests should be able to reserve a cabin for a certain date range 
 * - Reservations are not paid online. Payments will be made at the property upon arrival 
 *      - Therefore, new reservations should be set to "unconfirmed" (booked but not yet checked in) 
 * - Guests should be able to view all their past and future reservations 
 * - Guests should be able to update or delete a reservation 
 * 
 * # AUTHENTICATION
 * - Guests need to sign up and log in before they can reserve a cabin and perform any operation 
 * - On sign up, each guest should get a profile in the DB 
 * 
 * # PROFILE
 * - Guests should be able to set and update basic data about their profile to make check-in at the hotel faster 
 * 
 * >>> FEATURES + PAGES:
 * ---
 *      - Feature Categories    - Pages                 - Routes
 *                              1. Homepage             ["/"]
 * 
 *      1. About    ----------  2. About                ["/about"]
 * 
 *      2. Cabins   ----------  3. Cabin-Overview       ["/cabins"]
 *              \
 *               + ----------   4. Cabin detail         ["/cabins/:cabinId"]
 * 
 *               + ----------   4. Cabin detail         ["/cabins/:cabinId"]
 *              /
 *      3. Reservations -----   5. Reservation List     ["/account/reservations"]
 *              \
 *               + ----------   6. Edit reservation     ["/account/reservations/edit"]
 * 
 *      4. Authentication  ---  7. Login                ["/login"]
 * 
 *      5. Profile      -----   8. Update profile       ["/account/profile"]
 * 
 * >>> TECH decisions
 * ---
 * - framework:             NEXT.JS
 * - UI state management:   Context API
 * - DB / API:              Supabase    [as we are going to use data from prior react-project]
 * - styling:               Tailwind CSS
 * 
 * 
 * ! 3. Project Organization
 * -+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 1: [IGNORE >>>]
 * >>> organizing components [colocate] 
 * ---
 * - whenever a component is related a page.. then place that comp inside that respective folder
 * ex: if "Counter" from "comp/Counter" is used inside "cabins/page" ...
 *      ... so it is better to place "Counter" inside "cabins/Counter" along "page.js" 
 * 
 * - it shall be located inside components-folder but not along with page.js.. 
 *      - cause route folders may get crowded!
 * 
 * 2: 
 * >>> making components folder "PRIVATE"
 * ---
 * - so NEXT creates a route for every folder that we create in our project
 *      - then components folder may get a separate route as well [where every useful component exists]
 * [if it contains page.js inside "components" folder.. then it would be a problem]
 * 
 * - so making components fol a private folder so that it will be OPTED- OUT  
 *      - to make it private.. use "underscore" before folder name [_components] 
 * [hence no route will be created by the name of this _fol >>> if it contains "page.js" file]
 * 
 * $ NOTE
 * - Therefore, we have every reusable logic inside _components fol and also opted it out from creating a route!
 * 
 * finally:
 * - created "_lib":    where datasource / supabase configuration file exists
 * - created "_styles": where global-css file exists
 * - public folder:     where every image used in app is placed 
 * 
 * 
 * ! 4. Styling With Tailwind CSS
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * * Tailwind CSS
 * - comes with utility classes which we can use to apply simple CSS..
 * 
 * - tailwind has already been set while installing NEXT 
 * [as we instructed NEXT to do so..]
 * 
 * - import CSS file into layout.js
 *      - and configure styles to entire "body" of application
 * 
 * [code]
 * ------
import "./_styles/globals.css";     // - global import

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-blue-950 text-gray-50 min-h-screen">      // - applying UTILITY classes here!
        <Logo />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
 * 
 * - we can use colors provided by TAILWIND
 *      - but we are using colors provided by instructor: JONAS 
 * [which would give look for website]
 * 
 * - using user-defined colors instead pre-defined colors by TAILWIND
 *      - this is customizing TAILWIND!
 * 
 * >>> customizing TAILWIND
 * ---
 * - while installing TAILWIND.. it provided a file called: "tailwind.config.js"
 *      - in which we can customize pre-defined things!
 * 
 * - modify only theme inside this file!
 * [code]
 * ------
theme: {
    extend: {
        colors: {
            primary: {
                50: "#E1E8EF",
                100: "#D4DEE7",
                200: "#B7C7D7",
                300: "#99B0C7",
                400: "#7C99B6",
                500: "#5E82A6",
                600: "#4C6B8A",
                700: "#3C546C",
                800: "#2C3D4F",
                900: "#1B2631",
                950: "#141C24",
            },
            accent: {
                50: "#FAF5F0",
                100: "#F4ECE1",
                200: "#E8D6BF",
                300: "#DDC2A2",
                400: "#D2AF84",
                500: "#C69963",
                600: "#B78343",
                700: "#926835",
                800: "#6C4D28",
                900: "#4B351B",
                950: "#382814",
            },
        },
    },
},
 * 
 * - from the above customized-file.. we can use "primary" and "accent" colors
 * [modified-code]
 * ---------------
// - layout.js inside root folder:
---
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-primary-950 text-primary-100      // - used "primary"
       min-h-screen"
      >
        <Logo />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
 * 
 * - this way.. provides nice contrast colors for overall website!
 * 
 * $ FINALLY
 * - install "@heroicons" an icon-library
 *      => npm install @heroicons/react
 * 
 * 
 * ! 5. Adding Page Metadata and Favicon
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: Next.JS way of adding imp META-DATA to a website)
 * 
 * [code]
 * ------
export const metadata = {
  title: "The Wild Oasis",
};
 * 
 * - so if we export this "const metadata" from a global: layout.js file 
 *    - as it contains "title" [this title would become title-tag of HTML head]
 * 
 * - we can do the same from different page.js file as well 
 *    - so that whenever visiting "About" route will change title to specified title inside about/page.js
 * 
 * [code]
 * ------
// - cabins/page.js 
export const metadata = {
  title: "Cabins",
};
export default function Page() {
  return ( ... );
}

// - account/page.js
export const metadata = {
  title: "Guests area",
}; 
export default function Page() {
  return ( ... );
}

// - about/page.js
export const metadata = {
  title: "About",
};
export default function Page() {
  return ( ... )
}
 * 
 * - on specific routes: [/cabins, /account, /about]
 *    - the HTML text will be dynamic
 * 
 * ? but what about "/" [home] page ?
 * ---
 * - that is handled inside global: layout.js file 
 *    - we can specify default title for "/" route
 * 
 * [code]
 * ------
// - inside layout.js file:
---
export const metadata = {
  // title: "The Wild Oasis",

  title: {
    template: "%s: The Wild Oasis",
    default: "Welcome: The Wild Oasis",
  },
};
 * 
 * - title.template: "%s" adds text that next to it.. to cabins / account / about titles  
 *    - therefore it looks like: "Cabins: The Wild Oasis" 
 * 
 * - title.default: will be default title for unknown pages OR HOME: "/" page
 *    - we could do the same with exporting metadata with title in it.. from root folder's page.js file 
 * 
 * >>> [description] an important thing for SEO:
 * ---
 * - page description inside metadata!
 *    a overall description for every page inside an app
 * 
 * [code]
 * ------
export const metadata = {
  title: {
    template: "%s: The Wild Oasis",
    default: "Welcome: The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of Cherrapunji, surrounded by beautiful mountains",
};
 * 
 * 
 * >>> specifying a favicon:
 * ---
 * - to add a favicon for an application we have to use "icon.png"
 *    - convention to be followed in Next.JS [where file name must be "icon" but file extension can be anything!]
 * 
 * - just adding icon.png inside root folder is enough
 *    - we do not need to specify an metadata export inside "layout.js" [just adding file inside root is enough] 
 * 
 * $ CONCLUSION
 * - what ever the TITLE or DESCRIPTION it might be.. we don't have to specify them inside HTML
 *    - we just have to follow the Next's convention of exporting metadata 
 * 
 * [we don't have to write meta tag specifically inside HTML for "text" and "description" or for "favicon"]
 * - we just have to follow Next.JS convention.. by exporting metadata!
 * 
 * [final_code]
 * ------------
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

import "./_styles/globals.css";

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s: The Wild Oasis",       //- we made a dynamic title for webpage
    default: "Welcome: The Wild Oasis",         // - default title for all routes inside a web-app
  },
  description:
    "Luxurious cabin hotel, located in the heart of Cherrapunji, surrounded by beautiful mountains",    // - description for SEO!
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="bg-primary-950 text-primary-100      // - even we have HTML we did not specify "title", "description" and "favicon" in here!
       min-h-screen"
      >
        <Logo />
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
 * 
 * $ NOTE
 * - TILL NOW every convention made our lives easier with Next.JS!
 * 
 * 
 * ! 6. Loading and Optimizing Fonts
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: performance optimization for FONTS)
 * - Next.JS allows us to self-host any GOOGLE-font [without download it from google]..
 *    - OR Next also allows us fonts from local folders [if downloaded]
 * 
 * - having google fonts on own server could be a best solution
 *    - it helps in performance optimization and also in privacy!
 * [downloading fonts from server every time is not best for performance.. 
 *    ..GOOGLE-fonts from it's server may be not best for privacy]
 * 
 * [code]
 * ------
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],           // - set of characters
  display: "swap",                    // - controls how it must be displayed
});
 * 
 * - this is placed at top after all imports inside layout.js 
 *    [any font contains two names in it ? put an underscore in between]
 * 
 * - Josefin_Sans: function to be called and stored inside a constant!
 *    - function called with options ({subsets and display})
 * 
 * - as stored inside const: "josefin" [log "josefin" to console]
 *    - console logging provides a className!
 * [as we are working on server >>> we have to inspect terminal to view logged output]
 * 
 * - inside terminal: className is generated and it refers to font-file! 
 *    - so we have to use same inside HTML body [in layout file]
 * 
 * [final_code]
 * ------------
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],             // - set of characters
  display: "swap",            // - controls how it must be displayed
});

// console.log(josefin)   // - returns "className" a value 

import "./_styles/globals.css";

export const metadata = {
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
        className={`${josefin.className}                      // - using "className" from "josefin" here!
        bg-primary-950 text-primary-100 min-h-screen`}
      >
        ---
        <main>{children}</main>
      </body>
    </html>
  );
}
 * 
 * [steps]
 * 0:
 * - call function with configuration options and store inside a constant!
 * 
 * 1:
 * - configure imported font from "next/font/google"
 *    - imp: subsets
 * 
 * 2: 
 * - use className on body that was returned from calling the imported font!
 * 
 * 
 * ! 7. Improving the Navigation and Root Layout
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (optimized navigation and header components by addition of some styles to them)
 * 
 * - we have everything already set inside starter files [styles and imports etc.,]
 * [starter files from JONAS github]
 * 
 * 
 * ! 8. Optimizing Images With Next.js <Image /> Component
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (images show huge impact on loading speed of a web-app)
 * 
 * - optimizing images in Next will be done with Next's own "Image" component
 * 
 * [code]
 * ------
export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-4 z-10">
      <img src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" />
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </a>
  );
}
 * 
 * - till now we use <img /> tag from HTML to insert an image inside a web-page!
 * 
 * [code after optimization]
 * ---
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <Image src="/logo.png" height="60" width="60" alt="The Wild Oasis logo" />    // - Image comp from Next.JS!
      <span className="text-xl font-semibold text-primary-100">
        The Wild Oasis
      </span>
    </Link>
  );
}
 * 
 * >>> Image comp
 * ---
 * 1:
 * - automatically serve correctly sized images in modern formats [ex: webp]
 * 2:
 * - prevents layout shifts
 *    - it forces us to specify exact height and width
 * 3: 
 * - it automatically lazy loads images only when images enter the viewport
 * 
 * $ NOTE
 * - Image comp requires height and width specified 
 * [without these properties we get an error]
 * 
 * - we can also statically import image and by doing this..
 *    - we do not have to specify the height and width it takes default image sizes
 *    - also we can specify quality on scale of 1-100 [least reduces the quality of image] 
 * 
 * $ IMP
 * - but for now use the above way of using image into Image comp as shown in above code
 * 
 * 
 * ! 9. Building the Home Page
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Home page: page.js file inside root folder)
 * 
 * [code]
 * ------
import Image from "next/image";
import Link from "next/link";
import bgImg from "../public/bg.png";   // - static import

function Home() {
  return (
    <main className="mt-24">
      <Image
        src={bgImg}   // - specifying image like this will not require [height and width] properties!
        fill
        placeholder="blur"      // - this property can only specified with statically loaded images
        quality={80}        
        className="object-cover object-top"           // - image occupies whole webpage 
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
export default Home;
 * 
 * 
 *  
 * ! 10. Building the About Page With Responsive Images
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 *  
 * - about/page.js
 * [code]
 * ------
import Image from "next/image";

import about1 from "../../public/about-1.jpg";
import about2 from "../../public/about-2.jpg";

export const metadata = {
  title: "About",
};
export default function Page() {
  return (
    <div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Welcome to The Wild Oasis
        </h1>

        <div className="space-y-8">
          <p> Where nature's beauty and ... </p>
          <p> Our 8 luxury cabins ... </p>
          <p> This is where memorable moments ... </p>
        </div>
      </div>

      <div className="col-span-2">
        <Image
          src="/about-1.jpg"
          alt="Family sitting around a fire pit in front of cabin"
        />
      </div>

      <div className="col-span-2">
        <Image src="/about-2.jpg" alt="Family that manages The Wild Oasis" />
      </div>

      <div className="col-span-3">
        <h1 className="text-4xl mb-10 text-accent-400 font-medium">
          Managed by our family since 1962
        </h1>
        <div className="space-y-8">
          <p> Since 1962 ... </p>
          <p> Over the years ... </p>
          <div>
            <a
              href="/cabins"
              className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
            >
              Explore our luxury cabins
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
 * 
 * - when we reduce the size of browser.. we want to scale images accordingly
 * [which means we don't set height and weight (images has to set sizes automatically)]
 * 
 * - tailwind has set pre-defined sizes for images with "img" tag
 *    - if we replace with next's Image-comp then we need to specify the height and width!
 * 
 * >>> static import
 * [solves this problem]
 * ---
<Image
  src={about1}    // - imported image statically!
  alt="Family sitting around a fire pit in front of cabin"
/>
 * 
 * $ WHAT IF?
 * - when we get an image through a URL from a database
 *    - as that image does not get statically
 * 
 * [about-img-2]
 * ---
<div className="col-span-2">
  <Image src="/about-2.jpg" alt="Family that manages The Wild Oasis" />
</div>
 * 
 * - [then we have to either set height and width OR use "fill" property] 
 *    - which fills the image on overall web-page
 * [but we need that image inside a container specified within a GRID and "col-span-2" specified inside parent!]
 * 
 * - steps:
 * ? image need to be inside container
 * ---
 * 1: size that container (instead of sizing image >>> make parent: relative)
 * 2: make that image fit / fill inside that container (then occupies size specified)
 *    2.1: [using object set to cover: "object-cover"]
 * 
 * [code]
 * ------
<div className="relative aspect-square col-span-2">   // #1
  <Image
    src="/about-2.jpg"
    fill                        // #2
    className="object-cover"    // #2.1
    alt="Family that manages The Wild Oasis"
  />
</div>
 * 
 * - src gets image via URL from a database!
 *    - as it is not a static-image 
 * [we cannot use: "placeholder: blur" and "quality: {1-100}"] >> on dynamic images!  
 * 
 * # 1:
 * <div className="relative aspect-square col-span-2">
 *    [aspect-ratio: dimensioning parent]
 * - so we sized the parent div and making image set to div's sizes 
 * 
 * # 2 and 2.1:
 * fill & className="object-cover"
 *    - we make image inside div to set according to div's sizes
 * 
 * [total code specifically with images]
 * ---
<div className="grid grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">   // - making parent "GRID"
  <div className="col-span-2">
    <Image
      src={about1}          // - static img
      placeholder="blur"    
      quality={80}
      alt="Family sitting around a fire pit in front of cabin"
    />
  </div>

  <div className="relative aspect-square col-span-2">   // - dimensioning image's parent div
    <Image  
      src="/about-2.jpg"    // - dynamic img
      fill                              // - using FILL and OBJECT-COVER: 
      className="object-cover"          // - making this image set to parent dimensions
      alt="Family that manages The Wild Oasis"
    />
  </div>
</div>
 * 
 * 
 * 
 * ! 11. Adding Nested Routes and Pages
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * * segment
 * http://localhost:3000/account
 *                      |       |
 *                      +---+---+
 *                          |
 *                          + --- => this is called "SEGMENT"
 * 
 * - to create a NESTED-route we have to create a nested-fol inside "account" fol
 *    - create a new folders: "reservations" and "profile" 
 * [for routes: /account/reservations AND /account/profile]
 * 
 * - inside each folders: "reservations" and "profile"
 *    - create a page.js inside these!
 * 
 * $ PROBLEM
 * - we don't have navigation to /account/reservations and /account/profile..
 *    - inside the page: /account
 * [so we set up nested navigation]
 * 
 * 
 * next lecture.. 
 * => nested layout
 * 
 * 
 * ! 12.  Adding a Nested Layout
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (nested layout with NEXT.JS by adding a side navigation to all the routes in account-page/route)
 * 
 * - when we want a common / global layout for a set of routes in a folder
 *    - then we should follow a convention to create a file with name: "layout.js" 
 * 
 * - here for /account AND /account/reservations AND /account/profile
 *    - so we want to have a common navigation for all these three!
 * 
 * >>> [so we have to create layout.js file in common "/account" folder!]
 * 
 * $ SIMILAR
 * - we added a common / global layout to every route inside root folder.. 
 *    - in which this global layout will be applied for every folder that we create inside root folder!
 * [every folder inside root folder => new route inside a URL] 
 * ---
// >>> folder and files structure
---
--- app
  - page.js       - HOME  {"/"}
  - layout.js     - GLOBAL LAYOUT
  - loading.js    - GLOBAL LOADER

  --- [_components]-fol
    - 
  --- [_lib]-fol
    - 
  --- [_styles]-fol
    - global.css

  --- [about]-fol     
    - page.js         {"/about"}

  --- [cabins]-fol    
    - page.js         {"/cabins"}
  
  --- [account]-fol   
    - page.js         {"/account"}
    
    --- [reservations]-fol    
      - page.js               {"/account/reservations"}
    --- [profile]-fol         
      - page.js               {"/account/profile"}
 * 
 * 
 * - so we are adding a layout to one URL segment 
 *    - then we have to create GLOBAL layout.js inside "/account" segment
 * 
 * [code]
 * ------
// >>> account/layout.js
---
import SideNavigation from "../_components/SideNavigation";

export default function Layout({ children }) {                                  // - receives children from page.js of same level folders 
    return <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
        <div>
            <SideNavigation />
        </div>
        <div className="py-1">{children}</div>          // - using {children} here to show the content!
    </div>
}
 * 
 * - these two divs remain at side-by-side inside /account web-page! 
 * 
 * 
 * !COMPLETED!
 * 
 * next section.. 
 *    => data-fetching, caching and rendering
 * 
 */