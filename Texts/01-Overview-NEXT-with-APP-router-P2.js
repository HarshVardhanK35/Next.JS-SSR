// ! PART-02 !
// ! Overview NEXT with APP router !
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
/**
 * ! 6. What is Next.js?
 * -+-+-+-+-+-+-+-+-+-+-+
 * 
 * * NEXT.JS
 * - according to VERCEL.. 
 *      - NEXT is react FRAMEWORK for the web
 * 
 * - actually NEXT is META-FRAMEWORK which is built on top of REACT
 *      - means we still use components, props, react-hooks etc., that is all things in REACT
 * [therefore NEXT is framework on top of another framework]
 * 
 * - NEXT adds set of conventions and best practices about common things
 *      - routing, data-fetching etc.,
 * [we have to follow instructions which were set by NEXT.. 
 *    this means everyone on a team follow those set of rules.. so there won't be errors]
 * 
 * - this allows us to build complex full-stack web-applications and pages!
 * 
 * - this also allows us to use every REACT feature that need to be integrated into a framework like:
 *      - REACT [server components, server actions, suspense etc.,]
 * 
 * >>> NEXT.JS key ingredients!
 * # 1:
 * - SERVER-SIDE RENDERING
 *      - NEXT supports both dynamic and static rendering [can be selected for each route]
 * 
 * [to navigate through an application]
 * # 2:
 * - FILE BASED ROUTING CONVENTIONS
 *      - special: routes are defined entirely based on file system-based conventions (FOLDERS as ROUTES)
 * [ex: create a basic route in our application by creating new folder with route name]
 *      - there are special file conventions for pages, layouts, loaders etc.,
 * 
 * # 3:
 * - DATA FETCHING AND MUTATION ON SERVER
 *      - use REACT-SERVER COMPONENTS to fetch data directly
 *      - and mutations in SERVER-ACTIONS
 * 
 * # 4:
 * - OPTIMIZATIONS
 *      - NEXT provides us OPTIMIZATION-techniques for applications
 * [ex: image and font optimization, tools to improve SEO, etc.,]
 * 
 * ? two FLAVOURS of next.js: "APP" and "PAGES" router
 * # 1: 
 * >>> modern-NEXT.JS: "APP" router
 *      - modern way of using NEXT is by using APP router!
 *      - introduced in nextjs 13.4 (2023 version)
 *      - recommended for new projects
 *      - implements REACT's full-stack architecture: server-components, server-actions, streaming etc.,
 *      - 
 * 
 * [PROS]
 *      - easy fetching use fetch() right inside components
 *      - very easy to create layouts, loaders etc.,
 *      - APP router allows- advanced routing patterns [parallel-routing and intercepting routes etc.,]
 * 
 * [CONS]
 *      - CACHING is very aggressive and confusing 
 *      - 
 * 
 * # 2:
 * >>> legacy-NEXT: "PAGES" router
 *      - next-version: 1 (2016)
 *      - simple and easy to learn 
 * [cons]
 *      - building simple things like: "layouts" are confusing to implement
 *      - to fetch-data we need to use next-specific APIs: getStaticProps and getServerSideProps
 *      - 
 * 
 * 
 * ! 7. Setting Up a Next.js Project
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * - (in this entire NEXTJS lectures: we are gonna build the-wild-oasis)
 *      - (customer-facing-application)
 * 
 * [set-up NEXT]
 * - open terminal => use 14th version.. 
 *      => npx create-next-app@14 <PROJECT-NAME>
 * 
 * - in future => use latest version.. 
 *      => npx create-next-app@latest <PROJECT-NAME>
 * 
 * - while setting up a project using NEXT
 * [it asks us below questions..]
 *      - √ Would you like to use TypeScript? ... No / Yes [NO]
 *      - √ Would you like to use ESLint? ... No / Yes [YES]
 *      - √ Would you like to use Tailwind CSS? ... No / Yes [YES]            --- tightly packed into NEXT 🤩
 *      - √ Would you like to use `src/` directory? ... No / Yes [NO]
 *      - √ Would you like to use App Router? (recommended) ... No / Yes [YES]
 *      - √ Would you like to customize the default import alias (@/*)? ... No / Yes [NO]
 * 
 * - inside TERMINAL: next move into project that was created!
 *      - cd <project-name> / cd <project-directory>
 * 
 * - while creating project.. we get "app" folder automatically
 *      - inside it DELETE following files >>> [layout.js | globals.css | favicon.ico]  
 * 
 * - inside same "app" folder.. we get another file: "page.js"
 *      - delete everything inside it [code] >>> to start new and fresh!
 * 
 * [code] 
 * ------
// >>> app/page.js
---
function Home() {
  return <h1> Home </h1>;
}

export default Home;
 * 
 * - a normal react component inside page.js
 * 
 * ? how to EXECUTE / START application ?
 * ---
 * - as per scripts under package.json file
 *      - that is.. 
scripts": {
    "dev": "next dev",      // - we have to use "dev" to start this application!
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
},
 * 
 * - inside TERMINAL: run 
 *      => "npm run dev"
 * 
 * - after inspecting "page-source".. 
 *      - we can know that output is generated on a server
 * 
 * - this is server-side-rendered containing react-components
 * 
 * 
 * ! 8. Defining Routes and Pages
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Learn: how to add new routes and pages to NEXT.JS application)
 * 
 * - in REACT we used react-router to set up new routes into a single-page-application
 * [which required a lot of boilerplate code]
 * 
 * - but with NEXT.JS we just need to create folders and files in order to create PAGES and ROUTES
 *      - so again "layout.js" was back.. when we started application NEXT has created it for us!
 * 
 * ? how to create a route in NEXT: "/cabins" ?
 * ---
 * - create ["cabins"]-folder inside WD 
 *      - create a new file in that called "page.js"
 * 
 * * each "page" inside NEXT is a react component
 *      - in order to get an output we need to export a function from that page
 * NOTE: [every page has to be inside a folder]
 * 
 * [code]
 * ------
// >>> cabins/page.js
---
function Page() {
  return <>Cabins Page</>;
}
export default Page;
 * 
 * - this above returned JSX is a component.. actually a REACT-SERVER-COMPONENT
 *      - whatever JS we write inside a "page"-file will be server-side-rendered
 * 
 * - use route: "http://localhost:3000/cabins"
 *      - output will be rendered 
 * 
 * ? how to create nested route in NEXT: "/cabins/test" ?
 * ---
 * - create a nested folder inside "cabins"
 *      - that will be: cabins/test/
 * 
 * - inside test-folder create a new file: "pages"
 *      - create a component inside pages.js and return JSX!
 * [code]
 * ------
// >>> cabins/test/page.js
---
function Page() {
  return <>Hi from Test</>;
}

export default Page;
 * 
 * ? http://localhost:3000/cabins/test ?
 * |                     |       |     |
 * + ------------------- + ----- + --- +
 *           |               |      |
 *          APP           CABINS   TEST
 * 
 * [final-code]
 * ------------
// >>> app/page.js
---
function Home() {
  return <h1>The Wild Oasis. Welcome to paradise!</h1>;
}
export default Home;
------------------------------------
// >>> app/cabins/page.js
---
function Page() {
  return <>Cabins Page</>;
}
export default Page;
------------------------------------
// >>> app/account/page.js
---
function Page() {
  return <>About Page</>;
}
export default Page;
------------------------------------
// >>> app/about/page.js
---
function Page() {
  return <>Your account</>;
}
export default Page;
 * 
 * $ SUMMARY
 * - created different routes using just folders [app | cabins | account | about] and files [page.js] in it!
 * 
 * 
 * ! 9. Navigating Between Pages
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * [code]
 * ------
import Link from "next/link";
function Home() {
  return (
    <>
      <Link href="/cabins">Cabins</Link>

      <div>
        <h1>The Wild Oasis. Welcome to paradise!</h1>
      </div>
    </>
  );
}
export default Home;
 * 
 * - to create navigation we use "Link" provided by: "next/link"
 * 
 * ? what if we use <a href=""></a> an anchor-tag?
 * ---
 * - whenever we click on these links that were specified with anchor-tags
 *      - hard-reloads are done [which does not give a SPA feel]
 * [each-time we hit a link.. will reload the page and downloads page]
 * 
 * - so to get SPA features inside a web-application we have to use.. "Link"
 * 
 * >>> REACT-Link
 * [we have to install another library "React-Router"]
 * - we used "Link" which was provided by "React-Router-DOM"
 *      - so it usually takes "to" attribute to navigate through pages
 * 
 * >>> NEXT-Link
 * [but with NEXT no need of another library.. cause it comes with routing too.. as it is a "FRAMEWORK"]
 * - we have to use "Link" from "next/link"
 *      - it takes "href" as an attribute to specify a "TARGET" 
 * [similar to what we have with "HTML-a" anchor tag]
 * 
 * ? how this works behind the scenes?
 * ---
 * 1:
 * - applies few optimization techniques 
 *      - this will pre-fetch all the routes that are linked on a page
 * 2:
 * - each page is downloaded separately!
 *      - downloaded as a separate CHUNK []
 * 3:
 * - each page that visited inside a browser
 *      - will be CACHED inside the browser 
 * [there will not be any re-fetches happen when we visit again!]
 * 
 * ------
 * [code]
 * - as the "Link" has to be specified in each and every folder and "page.js" file inside it!
 *      - create a new folder "components" and file: "Navigation.js"
 * 
 * - this create a new route in NEXT.JS application [with route: "/components"]
 *      - but as there was no "page.js" inside it.. then it will not create a problem
 * [if in case we had page.js-file inside /components.. it will be a problem.. so better to follow project-architecture]
 * 
 * [code]
 * ------
import Link from "next/link";

function Navigation() {
  return (
    <ul>
      <li> <Link href="/">Home</Link> </li>
      <li> <Link href="/cabins">Cabins</Link> </li>
      <li> <Link href="/account">Account</Link> </li>
      <li> <Link href="/about">About</Link> </li>
    </ul>
  );
}
export default Navigation;
 * 
 * - it has to be present inside every page/route in an application
 *      - but using a LAYOUT would be better solution for this!
 * 
 * 
 * ! 10. 
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * ! 7. RSC vs. SSR: How are They Related? (RSC – Part 3)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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