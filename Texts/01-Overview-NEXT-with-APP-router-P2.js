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
 *    - means we still use components, props, react-hooks etc., that is all things in REACT
 * [therefore NEXT is framework on top of another framework]
 * 
 * - NEXT adds set of conventions and best practices about common things
 *    - routing, data-fetching etc.,
 * [we have to follow instructions which were set by NEXT.. 
 *    this means everyone on a team follow those set of rules.. so there won't be errors]
 * 
 * - this allows us to build complex full-stack web-applications and pages!
 * 
 * - this also allows us to use every REACT feature that need to be integrated into a framework like:
 *    - REACT [server components, server actions, suspense etc.,]
 * 
 * >>> NEXT.JS key ingredients!
 * # 1:
 * - SERVER-SIDE RENDERING
 *    - NEXT supports both dynamic and static rendering [can be selected for each route]
 * 
 * [to navigate through an application]
 * # 2:
 * - FILE BASED ROUTING CONVENTIONS
 *    - special: routes are defined entirely based on file system-based conventions (FOLDERS as ROUTES)
 * [ex: create a basic route in our application by creating new folder with route name]
 *    - there are special file conventions for pages, layouts, loaders etc.,
 * 
 * # 3:
 * - DATA FETCHING AND MUTATION ON SERVER
 *    - use REACT-SERVER COMPONENTS to fetch data directly
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
 *    - modern way of using NEXT is by using APP router!
 *    - introduced in nextjs 13.4 (2023 version)
 *    - recommended for new projects
 *    - implements REACT's full-stack architecture: server-components, server-actions, streaming etc.,
 *    - 
 * 
 * [PROS]
 *    - easy fetching use fetch() right inside components
 *    - very easy to create layouts, loaders etc.,
 *    - APP router allows- advanced routing patterns [parallel-routing and intercepting routes etc.,]
 * 
 * [CONS]
 *    - CACHING is very aggressive and confusing 
 *    - 
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
 * - open terminal => use.. 
 *    => npx create-next-app@14 <PROJECT-NAME>
 * 
 * - while setting up a project using NEXT
 * [it asks us below questions..]
 *    - √ Would you like to use TypeScript? ... No / Yes [NO]
 *    - √ Would you like to use ESLint? ... No / Yes [YES]
 *    - √ Would you like to use Tailwind CSS? ... No / Yes [YES]            --- tightly packed into NEXT 😁
 *    - √ Would you like to use `src/` directory? ... No / Yes [NO]
 *    - √ Would you like to use App Router? (recommended) ... No / Yes [YES]
 *    - √ Would you like to customize the default import alias (@/*)? ... No / Yes [NO]
 * 
 * 
 * 
 * 
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