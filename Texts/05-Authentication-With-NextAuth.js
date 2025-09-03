// ! 05. Authentication With NextAuth (Auth.js)
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
/**
 * ! 1. Section Overview
 * -+-+-+-+-+-+-+-+-+-+-+
 * 
 * in this section, we use.. 
 *    - 1. NextAuth library (Auth.js) for authentication
 *    - 2. Google provider
 *    - 3. Middleware for authorization
 *    - 4. Accounts in Supabase DB
 * 
 * 
 * ! 2. Setting Up NextAuth
 * -+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * * NextAuth OR Auth.js 
 * - is a library which simplifies authentication in next.js app
 * 
 * - this is not own auth-service for Next.JS application
 *    - but this auth.js helps to integrate authentication into an application
 * 
 * - this library helps us to connect to so many different auth-providers [google, facebook, github etc.,]
 * [with help of documentation.. we can also use users in our database for authentication]
 * 
 * $ NOTE
 * - for this project we use GOOGLE as our auth-provider
 * 
 * [process]
 * ---------
 * # 1. create a file "auth.js" inside /app/_lib folder
 * ---
 * [before setting up code.. we need some environment variables]
 * >>> configuring [.env.local] file:
 *    - we need to setup / configure .env.local file >>> set up some environmental variables
 *    - we need to add [NEXTAUTH_URL, NEXTAUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET] variables inside file: ".env.local"
 * 
 * - A. NEXTAUTH_URL will be "http://localhost:3000/"
 *    [if it is 3001 / 8080 then it must change accordingly]
 * 
 * - B. NEXTAUTH_SECRET will be from URL: "https://generate-secret.vercel.app/32"
 *    [copy a code that this above URL generates and paste as a value into the ENV.variable "NEXTAUTH_SECRET"]
 * 
 * - C. AUTH_GOOGLE_SECRET and AUTH_GOOGLE_ID comes from GOOGLE oauth setup!
 *    : we have to use google developer console to get these values.. so follow a tutorial on Youtube on how to setup google for OAuth setup for a next.js app
 *    [YT_VIDEO_LINK: https://youtu.be/ot9yuKg15iA?si=oUkTdTKzrlO8sfxy] >>> watch upto 11:25
 * 
 * $ NOTE
 * - everything variable has to be correctly spelled 
 *    - if not.. NEXTAUTH cannot read values from file: ".env.local"
 * 
 * # 2. write code inside /app/_lib/auth.js file
 * ---
 * [before writing code.. install some libraries]
 * - install..
 *    => npm i next-auth@beta
 * (a beta version which will work for versions that may release in future)
 * 
 * # 3. 
 * [code]
 * ------
// >>> /app/_lib/auth.js
---
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [                         +---=> // - ID that was generated after GOOGLE OAuth Setup
    Google({                          /
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET, 
    }),                                     \
  ],                                         +---=> // - secret-code that was generated after GOOGLE OAuth Setup
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
 * 
 * 
 * - to handle /app/auth/signin, /app/auth/providers and /app/auth/signout 
 * - we need to create a file "route.js" inside /app/api/auth/[...nextauth] folder! 
 * [code]
 * ------
// >>> /app/api/auth/[...nextauth]/route.js
---
export { GET, POST } from "../../../_lib/auth";
 * 
 * - inside "/app/api/auth/[...nextauth]/route.js" file we need to import "GET" and "POST" from file "/app/_lib/auth.js"
 *    - and export immediately from file "/app/api/auth/[...nextauth]/route.js"
 * 
 * $ OBSERVATIONS
 * - visit or request for URL: "localhost:3000/api/auth/signin"
 *    - then we will get a clickable-box contains "signin with google"
 * [clicking on it takes users to google signin page]
 * 
 * $ IMPORTANT
 * - setting up google developer console for OAuth is important and required
 * 
 * 
 * ! 3. Getting the User Session
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Customize website according to logged in USER)
 * 
 * - in this application, we have to show a USER-Profile-Image inside Navigation (at Guest area) of the application
 * [simply displaying avatar?. current logged in user inside navigation area of this application]
 * 
 * [navigation-component: "/app/_components/Navigation.js"]
 * [code]
 * ------
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className="hover:text-accent-400 transition-colors"
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
 * 
 * 
 * ? how do we get data of currently logged-in-user into a local component
 * ---
 * - get that data from file: "/app/_lib/auth.js" that we created in previous lecture
 * [code]
 * ------
// >>> /app/_lib/auth.js
---
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
};

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(authConfig);
 * 
 * 
 * - exported "handlers"  >>> does helps in login and logout
 * - exported "auth"      >>> helps in getting current-user-data
 * [this auth: fn type >>> can be called inside any server-component]
 * 
 * [code]
 * ------
import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();                 // - used here! stored inside current "session" variable             
  console.log(session);         // - logged ? returned below O/P 
  return (            
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/cabins > Cabins </Link>
        </li>
        <li>
          <Link href="/about" > About </Link>
        </li>
        <li>
          <Link href="/account"> Guest area </Link>
        </li>
      </ul>
    </nav>
  );
}
 * 
 * [returned]
 * ----------
{
  user: {
    name: 'Youtube Entertainment',
    email: 'entertainonyt@gmail.com',
    image: 'https://lh3.googleusercontent.com/a/ACg8ocKdFuSFE-gOyx62lp2qx93GykJtyT1_PnAsdjE464RBQSJJVQ=s96-c'
  },
  expires: '2025-10-03T06:20:19.802Z'
}
 * 
 * >>> total-navigation-component with avatar of logged in user
 * [code]
 * ------
import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                src={session.user.image}
                alt={session.user.name}
                className="h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
 * 
 * the line: "const session = await auth();" makes
 * - entire comp a dynamic component.. cause it has to read data in COOKIES from incoming req
 * - as reading data from cookies switches route to dynamic rendering.. as these cookies only be known at run-time
 * 
 * - so as navigation-comp became a dynamic comp
 *    - and each comp inside application gets this navigation in common.. so this switches every route inside app to a dynamic route!
 * [as navigation is on every single route] 
 * 
 * 
 * ////////////////////////////////////////
 * => PART-2
 * (logged in user can only see reservation-form under each single cabin...
 *    ...if user has not logged in >> then they can see only the calendar with available dates but cannot reserve)
 * 
 * - component: "Reservation.js" needs changes
 * [code] (before changes)
 * ------
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
 * 
 * - rendering a message to expect user to login if there is no login session!
 * [so adding another component to /app/_components stack] >>> (comp: which renders a message to user who are not logged in)
 * 
 * [new comp] >>> [LoginMessage.js]
 * [code]
 * ------
// >>> /app/_components/LoginMessage.js
---
export default function LoginMessage() {
  return (
    <div className="grid bg-primary-800 ">
      <p className="text-center text-xl py-12 self-center">
        Please{" "}
        <Link href="/login" className="underline text-accent-500">
          login
        </Link>{" "}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}
 * 
 * 
 * - component: "/app/_components/Reservation.js" after making changes
 * [code]
 * ------
export default async function Reservation({ cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id),
  ]);
  const session = await auth();     // - got current user's session

  return (
    <div className="grid grid-cols-2 border border-primary-800 min-h-[400px]">
      <DateSelector
        cabin={cabin}
        settings={settings}
        bookedDates={bookedDates}
      />
      {session?.user ? (                                        // - dynamic rendering
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />        // - no user ? render a login-message!
      )}
    </div>
  );
}
 * 
 * - sent authorized user data to "ReservationForm"
 * to render following..
 * [code]
 * ------
<div className="flex gap-4 items-center">
  <img
    // - Important to display google profile images
    referrerPolicy="no-referrer"
    className="h-8 rounded-full"
    src={user.image}
    alt={user.name}
  />
  <p>{user.name}</p>
</div>
 * 
 * 
 * next lecture...
 * => authorization >>>
 *    ... allowing some routes of application to authenticated/loggedIn users
 * 
 * 
 * ! 4. What is Middleware in Next.js?
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: middleware.. one imp feature needed for implementing authorization)
 * 
 * ? How middleware works in NEXT.JS
 * ---
 * 
 * * MIDDLEWARE
 * - type of function, that lies between request and response
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * ! 2. Protecting Routes With NextAuth Middleware
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2. Protecting Routes With NextAuth Middleware
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2. Protecting Routes With NextAuth Middleware
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2. Protecting Routes With NextAuth Middleware
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2. Protecting Routes With NextAuth Middleware
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * ! 2. Protecting Routes With NextAuth Middleware
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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