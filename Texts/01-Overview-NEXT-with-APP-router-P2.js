// ! PART-02 !
// ! Overview NEXT with APP router !
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
/**
 * ! 6. What is Next.js?
 * -+-+-+-+-+-+-+-+-+-+-+
 * 
 * * NEXT.JS
 * - according to VERCEL.. 
 *    - NEXT is react FRAMEWORK for the web
 * 
 * - actually NEXT is META-FRAMEWORK which is built on top of REACT
 *    - means we still use comp, props, react-hooks etc., that is all things in REACT
 * [therefore NEXT is framework on top of another framework / library]
 * 
 * - NEXT adds set of conventions and best practices about common things
 *    - routing, data-fetching etc.,
 * [we have to follow instructions which were set by NEXT.. 
 *    this means everyone on a team follow those set of rules.. so there won't be errors]
 * 
 * - this allows us to build complex full-stack web-applications and pages!
 * 
 * - this also allows us to use every REACT feature that needed to be integrated into a framework like:
 *    - REACT + [server comp, server actions, suspense etc.,]
 * 
 * >>> NEXT.JS key ingredients!
 * # 1:
 * - SERVER-SIDE RENDERING
 *    - NextJS supports both dynamic and static rendering [can be selected for each route]
 * 
 * [to navigate through an application]
 * # 2:
 * - FILE BASED ROUTING CONVENTIONS
 *    - special: routes are defined entirely based on file-system conventions (FOLDERS as ROUTES)
 * [ex: create a basic route in our application by creating new folder with route name] => [folder-name === route-name]
 *    - there are special file conventions for pages, layouts, loaders etc.,
 * 
 * # 3:
 * - DATA FETCHING AND MUTATION ON SERVER
 *    - use REACT-SERVER COMP to fetch data directly
 *    - and mutations in SERVER-ACTIONS
 * 
 * # 4:
 * - OPTIMIZATIONS
 *    - NEXT provides us OPTIMIZATION-techniques for applications
 * [ex: image and font optimization, tools to improve SEO, etc.,]
 * 
 * ? two FLAVOURS of next.js: "APP" and "PAGES" router
 * # 1: 
 * >>> modern-NEXT.JS: "APP" router
 *    - modern way of using NEXT is by using APP-router!
 *      - introduced in NextJS: 13.4 (2023 version)
 *    - recommended for new projects
 *    - implements REACT's full-stack architecture with additional server-comp, server-actions, streaming etc., from NextJS
 * 
 * [PROS]
 *    - easy fetching use fetch() right inside comp
 *    - very easy to create layouts, loaders etc.,
 *    - APP router allows- advanced routing patterns [parallel-routing and intercepting routes etc.,]
 * 
 * [CONS]
 *    - CACHING is very aggressive and confusing!
 * 
 * # 2:
 * >>> legacy-NEXT: "PAGES" router
 *    - next-version: 1 (2016)
 *    - simple and easy to learn 
 * [cons]
 *    - building simple things like: "layouts" are confusing to implement
 *    - to fetch-data we need to use next-specific APIs: getStaticProps and getServerSideProps
 *    - 
 * 
 * 
 * ! 7. Setting Up a Next.js Project
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * - (in this entire NEXTJS lectures: we are gonna build the-wild-oasis)
 *    - (customer-facing-application)
 * 
 * [set-up NEXT]
 * - open terminal => use 14th version.. 
 *    => npx create-next-app@14 <PROJECT-NAME>
 * 
 * - in future => use latest version.. 
 *    => npx create-next-app@latest <PROJECT-NAME>
 * 
 * - while setting up a project using NEXT
 * [it asks us below questions..]
 *    - √ Would you like to use TypeScript? ... No / Yes [NO]
 *    - √ Would you like to use ESLint? ... No / Yes [YES]
 *    - √ Would you like to use Tailwind CSS? ... No / Yes [YES]            --- tightly packed into NEXT 🤩
 *    - √ Would you like to use `src/` directory? ... No / Yes [NO]
 *    - √ Would you like to use App Router? (recommended) ... No / Yes [YES]
 *    - √ Would you like to customize the default import alias (@/*)? ... No / Yes [NO]
 * 
 * - inside TERMINAL: next move into project that was created!
 *    - cd <project-name> / cd <project-directory>
 * 
 * - while creating project.. we get "app" folder automatically
 *    - inside it DELETE following files >>> [layout.js | globals.css | favicon.ico]  
 * 
 * - inside same "app" folder.. we get another file: "page.js"
 *    - delete everything inside it [code] >>> to start new and fresh!
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
 *    - that is.. 
scripts": {
    "dev": "next dev",      // - we have to use "dev" to start this application!
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
},
 * 
 * - so, inside TERMINAL: run 
 *    => "npm run dev"
 * 
 * - after inspecting "page-source".. 
 *    - we can know that output is generated on a server
 * 
 * - this is server-side-rendered containing react-comp
 * 
 * 
 * ! 8. Defining Routes and Pages
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (Learn: how to add new routes and pages to NEXT.JS application)
 * 
 * - in REACT we used react-router to set up new routes into a single-page-application
 * [which required a lot of boilerplate code]
 * 
 * - but with NEXT.JS we just need to create folders and files in order to create ROUTES or URLs and OUTPUT (that renders) 
 *    - so again "layout.js" was back.. when we started application NEXT has created it for us!
 * 
 * ? how to create a route in NEXT: "/cabins" ?
 * ---
 * - create ["cabins"]-folder inside WD 
 *    - create a new file in that called "page.js"
 * 
 * * each "page" inside NEXT is a react component
 *    - in order to get an output we need to export a function from that page
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
 *    - whatever JS we write inside a "page"-file will be server-side-rendered
 * 
 * - use route: "http://localhost:3000/cabins" [FOLDER >>> /cabins]
 * [folder-name has to be exactly same as route "/cabins" that we wanted to create]
 *    - output will be rendered [FILE >>> page.js]
 * 
 * ? how to create nested route in NEXT: "/cabins/test" ?
 * ---
 * - create a nested folder inside "cabins"
 *    - that will be: cabins/test/
 * 
 * - inside test-folder create a new file: "pages"
 *    - create a component inside pages.js and return JSX!
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
 * - page as file name is same for every route / folder
 * 
 * ! 9. Navigating Between Pages
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * [code]
 * ------
import Link from "next/link";
function Home() {
  return (
    <>
      <Link href="/cabins">Cabins</Link>    // - used "Link" from NEXT and attribute "href" specify target in that!
      <div>
        <h1>The Wild Oasis. Welcome to paradise!</h1>
      </div>
    </>
  );
}
export default Home;
 * 
 * 
 * ? what if we use <a href=""></a> an anchor-tag?
 * ---
 * - whenever we click on these links that were specified with anchor-tags
 *    - hard-reloads are done [which does not give a SPA feel]
 * [each-time we hit a link.. page will be re-loaded and downloads page every time]
 * 
 * - so to get SPA features inside a web-application we have to use.. "Link"
 * 
 * >>> REACT-Link
 * [we have to install another library "React-Router"]
 * - we used "Link" which was provided by "React-Router-DOM"
 *    - so it usually takes "to" as an attribute to navigate through pages [with specified target as value]
 * 
 * >>> NEXT-Link
 * [but with NEXT no need of another library.. cause it comes with routing too.. as it is a "FRAMEWORK"]
 * - we have to use "Link" from "next/link"
 *    - it takes "href" as an attribute to specify a "TARGET" route
 * [similar to what we have with "HTML-anchor" tags]
 * 
 * ? how this works behind the scenes?
 * ---
 * # 1:
 * - applies few optimization techniques 
 *    - this will pre-fetch every route that are linked on a page
 * # 2:
 * - each page is downloaded separately!
 *    - that is it will be downloaded as a separate CHUNK [small-units of data]
 * # 3:
 * - each page that visited inside a browser
 *    - will be CACHED inside the browser 
 * [there will not be any re-fetches happen.. when we visit back again!]
 * 
 * ------
 * [code]
 * - as the "Link" has to be specified in each and every folder and "page.js" file inside it!
 *    - create a new folder "comp" and file: "Navigation.js"
 * 
 * - this create a new route in NEXT.JS application [with route OR folder name: "/comp"]
 *    - but as there was no "page.js" inside it.. then it will not create a problem
 * [in case if we have "page.js"-file inside "/comp" folder (by mistake).. it will be a problem.. 
 *    ... so better to follow project-architecture.. that will be discussed in future lectures]
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
 *    - but using a LAYOUT would be better solution for this!
 * 
 * ... in next lecture
 * => layout
 * 
 * 
 * ! 10. Creating a Layout
 * -+-+-+-+-+-+-+-+-+-+-+-+
 * (Learn: to add a GLOBAL layout)
 * - every nextjs app or website need to have one global layout [that is called "root-layout"]
 * 
 * - even if we deleted layout.js from our route folder
 *    - it will be created whenever we started application again!
 * [inside layout.js delete code inside it that was created automatically]
 * 
 * - this root/global layout wraps entire application
 *    - means it will be applied to every single route inside app
 * *  [therefore it need to have HTML and body tag]
 * 
 * [code]
 * ------
import Navigation from "./comp/Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />              // - this will not be re-rendered every-time whenever URL changes
        <main>{children}</main>
      </body>
    </html>
  );
}
 * 
 * - creating files with special names [specified by the rules of NextJS]
 * 
 * - if layout accepts "children" prop then it has to be rendered 
 *    - similar to what we have with react's children-prop rendering
 * 
 * - whatever the current route inside URL will become the children of layout
 *    - if /cabins then /cabins/page.js output will be rendered as children inside root-layout 
 *  
 * - to avoid repeated code inside every route
 *    - we created layout.js [that is...] 
 * [repeated_code]
 * ---------------
--- Home-Page ----
import Navigation from "../comp/Navigation";
export default function Page() {
  return (
    <div>
      <Navigation />  
      <h1>The Wild Oasis. Welcome to paradise!</h1> 
    </div>
  );
}

--- account/page ---
import Navigation from "../comp/Navigation";
export default function Page() {
  return (
    <div>
      <Navigation />
      Your account
    </div>
  );
}
 * 
 * $ Note:
 * - like this <Navigation/> was repeated in every route's OR folder's output-page.js 
 * - that is why we created "Layout.js" where <Navigation/> stays same for every route
 * 
 * $ SUMMARY:
 * - every page and layout in this application is called SERVER-COMP
 * 
 * * SERVER-COMP
 * - these are the comp which run or rendered on server!
 * 
 * 
 * ! 11. What are React Server Comp? (RSC – Part 1)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (new paradigm: react-server-comp)
 * 
 * ? why do we need react-server-comp ?
 * ---
 * >>> [WKT in REACT]
 * react-UI === fn(state)
 * - client-side rendered react-app: when we update state >>> app re-renders
 *    [PROS]
 *      - state-updating makes UI interactive
 *      - UI made with multiple comp
 *      - 
 *    [CONS]
 *      - require a lot of JS to be downloaded [impacts performance]
 *      - [client-sever-waterfalls] >>> multiple comp on a page need to fetch data one after another
 *      - 
 * 
 * >>> [in PHP]
 * UI === fn(data)
 * - when 100% server-side rendered PHP-app >>> it is function of data
 *    [PROS]
 *      - easy and fast to fetch all data
 *      - close to data source
 *      - need only 0KB of JS 
 *    [CONS]
 *      - NO comp at all!
 * 
 * $ Note
 * - what if a thing that want to be in between UI with fn(data, state)
 * 
 * [which provides every advantage of both client and server sides rendering]
 * - that is...
 * 
 * * React- Server- Comp
 *    - a new full-stack architecture for react-applications
 *    - SERVER is an integral part of react-component-trees: which is "server comp"
 *    [CONTD..]
 * 
 * # 1. CLIENT COMP
 * - regular comp where.. 
 * 
 * [for interactivity on client-side]
 * >>> UI === fn(state)
 *    - these are executed entirely on client-side! 
 *    - responsible for interactivity
 * 
 * [client comp are OPT in] 
 * - we need to specifically tell a component that it should be a client-component [if that is what we need]
 *    - created with "use client" directive at top of module!
 * 
 *              COMBINATION (+)
 * 
 * # 2. SERVER COMP
 * - comp that are only rendered on server
 *    
 * [they fetch data on server]
 * >>> UI === fn(data)
 *    - therefore there will not be interactivity
 *    [no need of state / interactivity] >>> [they do not require JS in downloadable bundle]
 *    - so that we can build backend with react!
 *    - default in apps that we use the RSC architecture (like Next.JS)
 * 
 * * React- Server- Comp
 *    [CONTD..]
 *    - writing frontend and backend in a way that this feels like regular react
 *    - RSC is NOT active by default in new react-apps [ex: vite-apps]
 * 
 *    [but with NEXT >>> RSC is allowed]
 *    - RSC needs to be implemented by a framework called: "NEXT" [app-router]
 * 
 * $ NOTE
 * - any app that we built using NEXT app-folder architecture
 *    - we have to use this new RSC architecture
 * 
 * * an example + server-client boundary!
 * ---
 *              @ App
 *                 |
 *      + -------- + -------- + 
 *    @ Header                @ main
 *        |                       |
 *      + ------ +                + ----------- +
 *      |        |                |             |
 *   @ Avatar    |                @ Table       |
 *          ["use client"]          |         ["use client"]
 *              ? DarkMode          |             ? SortBy 
 *                                @ CabinRow    
 *                  + ------------------ | ------------------- +
 *                  |               ["use client"]             |
 *                  |                 // ? Menu                |    
 *                  |           + -------- + --------- +       |  -  server-client boundary
 *                  |           |          |         |         |  
 *                  | //   ? Duplicate    ? Edit     ? Delete  |  
 *                  |                                          |
 *                  + ---------------------------------------- +
 * 
 * $ SKETCH_EXPLANATION
 * 1: 
 * - every comp fetched from server is denoted using "YELLOW" 
 *    - every client-comp is denoted using "BLUE"
 * 2:
 * - RSC is default set inside NextJS app-router comp
 *    - use "use client" directive on top of every client component file [opt in] 
 * 3:
 * - as "Menu" being a client-component [we need to opt-in for that "use client"]
 *    - but for "Duplicate" "Edit" "Delete" >>> child-comp for "Menu" [we do not need to opt-in]
 * [cause these children are inside "Server-Client-Boundary"]
 * 
 * $ NOTE 
 * - RSC is all about boundaries which split between code runs on SERVER and CLIENT
 * 
 * * SERVER comp VS. CLIENT comp
 * ---
 * [CLIENT comp] 
 *    [opt in "use client"]
 *      - as they are interactive only they can have "state / hooks"
 *      - NO "lifting state"
 *      - we can pass "PROPS"
 *      - data fetching:    possible using 3rd party library!
 *      - import:           client comp can only import other client comp [but not server]
 *      - rendering:        client comp can render server comp
 *      - when re-render:   whenever it's own state or parent-state changes
 *      - 
 * 
 * [SERVER comp]
 *    [default]
 *      - but server-comp are not stateful >>> no "state / hooks"
 *      - YES "lifting state"
 *      - "YES" pass props: we can pass between 2 server-comp and between server and client
 *        [props must be SERIALIZED while passing props from server-client >>> data-structures like fns and classes which are not serialized]
 * 
 *      - data-fetching: preferred with server-comp 
 *        [we can use async/await in top-level code of a server component >>> data fetched can be passed into client comp via PROPS]
 * 
 *      - import:           server-comp can import both client and server comp
 *      - render:           server-comp can render client and server
 *      - when re-render:   each time when URL changes [through navigation]
 *        [every comp attached to that route re-render >>> they're executed again and may fetch data again]
 * 
 * >>> importing VS. rendering 
 * [IMPORT]
 *    - importing another module using IMPORT-SYNTAX
 * 
 * [RENDER]
 *    - one comp calls another comp 
 *      [using another comp inside it's own JSX body]
 * 
 * * MODEL [server-components]
 * - REACT with RSC -
 *                              FETCHING DATA
 *                              /
 *             SERVER-COMPONENTS
 *                  ↓   ↓          
 * server           ↓   ↓       ↑
 * + -------------- ↓   ↓ -------------- +
 * client           ↓   ↓       ↑
 *              props   ↓       
 *                  ↓   ↓       ↑
 *  CLIENT-COMPONENTS   ↓       re-render
 *          ↑       ↓   ↓       ↑
 *          ↑      display      
 *   re-render      ↓   ↓       ↑
 *          ↑       VIEWS       
 *          ↑      /     \      ↑
 *        interaction    navigation
 * 
 * >>> how this RSC model works [a new paradigm]
 * - regular comp are called CLIENT-COMP
 * 
 * - we also have server-comp [which runs on server]
 *    - but also participate in displaying views
 * 
 * - server-comp are used to fetch data [this data used to render views directly]
 *    - OR data can be passed to CLIENT-comp as PROPS
 * [so server and client are connected with PROPS >>> bridge across client-server boundary]
 * 
 * ? how server-comp re-render ?
 * ---
 * - if it is about CLIENT-comp "interaction" [btn clicks etc.,] can cause re-render
 * 
 * - if it is SERVER-comp "navigation" [change in URL] can cause re-render 
 *    - re-render the direct server components  
 * 
 * - re-rendering SERVER-comp helps in fetching data again!
 *    - which displays updated VIEW with new data 
 * 
 * $ NOTE
 * - now we have both CLIENT and SERVER comp re-render views
 *    - and both are connected using PROPS
 * 
 * ? PROS and CONS of RSC arch
 * ---
 * [PROS]
 *    - we can write react-comp on both front and back 
 *      - so that we can compose entire FULL-STACK with simple react-comp 
 *        [+ server actions: for mutations]
 *    
 *    - one single codebase for front and back
 *      - so we don't have to build API in order to access data from 
 *        [as comp - server comp are already on backend]
 *    
 *    - so server comp have direct and secure access to data source 
 *        [no API, no exposure of API keys etc.,]
 * 
 *    - fetching data: eliminate client-server waterfalls 
 *      - which fetches data for a page "at once" before sending it to client 
 *        [sent in streams]
 * 
 *    - server comp do not require JS to browser 
 *    
 * [CONS]
 *    - makes react more complex 
 *    - more things to learn and understand 
 *    - context API do not work in server comp [like all other hooks]
 *    - more decisions to make 
 *      [like: "should this be a client or server comp?" || "shall I fetch data on server or client?"]   
 *    - sometimes we need an API [if we consider to build mobile app]
 *    - server-comp can only be used within a framework!
 * 
 * 
 * ! 12. Fetching Data in a Page
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * (fetch data directly from react-comp)
 * 
 * $ WKT 
 * - each page inside a folder is a SERVER comp
 * [which is default a server comp.. as it has to be rendered on server]
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
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
 * 
 * 
 * 
 * 
 * 
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