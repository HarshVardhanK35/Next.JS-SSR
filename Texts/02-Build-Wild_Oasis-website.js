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
 * - UI state management:   context API
 * - DB / API:              supabase    [as we're gonna use data from prior react-project]
 * - styling:               tailwind CSS
 * 
 * 
 * ! 3. Project Organization
 * -+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 1: 
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
 * - so making components fol a private folder so that it will be opt out components fol 
 *      - to make it private.. use "underscore" before folder name [_components] 
 * [hence no route will be created by the name of components fol]
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
 *      - but using colors provided by JONAS 
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
 * - to add a favicon for an application we have to use icon.png
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
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * ! 2. Project Planning: "The Wild Oasis" Customer Website
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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