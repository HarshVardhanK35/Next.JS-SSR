// ! PART - 01 !
// ! Overview NEXT with APP router !
// -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
/**
 * // ! 1. Section Overview
 * -+-+-+-+-+-+-+-+-+-+-+-+-
 * (REACT / part-5)
 * - all about building FULL-STACK server-side rendered react-apps with Next.JS framework
 * 
 * in this section.. 
 *      - what is server-side rendering and why do we need it?
 *      - what is NEXT?
 *      - deep dive into React Server Components.. 
 *      [modern react architecture: react-server-components]
 * 
 * // ! 2. Download Fresh Starter Files + Slides
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+
 * 
 * - clone JONAS's GitHub react-files from: 
 * => "https://github.com/jonasschmedtmann/ultimate-react-course/tree/main"
 * 
 * - from those folders.. we need only folder which is related to "22-nextjs-pages-router"
 *      - so copy: starter-files from that folder!
 * 
 * 
 * // ! 3. An Overview of Server-Side Rendering (SSR)
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * [OLD-WAY]
 * - while using PHP, word-press
 * - back then in old days.. websites were rendered on server-side and then sent to browser!
 * 
 *          render a           
 *          webpage -----   HTML + CSS + JS   +----=> | ... BROWSER
 * 
 * [MODERN]
 * - so to make websites more dynamic and interactive
 *      - where rendering of an app or website shifted from server to client
 * using angular, react, vue
 * 
 *              <=---+  |                       HTML CSS
 *          API         | - BROWSER - rendering -  JS  
 *              +---=>  |
 * 
 * >>> [MODERN-way-SERVER-SIDE-RENDERING]
 *      - using next.js and remix
 * - these are the blend of both server-side and client-side 
 * 
 * ? differences between CSR and SSR
 * ---
 * >>> [CSR]
 *      - requested HTML will be rendered on CLIENT [using JS]
 *          ex: we use REACT.JS
 * $ [CONS]
 *      - SLOWER INITIAL PAGE LOADING..
 *          - LARGE javascript bundle needs to be downloaded before app starts!
 *          - data is fetched after components MOUNTING! 
 * 
 *      - 'SEO' will be problematic..
 *          - search engines may find blank page while indexing pages.. 
 *          [cause >>> content is not rendered until JS is executed and data is fetched!]
 * + ----------------------------------- +
 * $ [PROS]
 *      - HIGHLY INTERACTIVE..
 *          - all code and content has loaded already!
 * 
 *      - SPA
 *          - perfect for building highly interactive web-applications 
 *  
 *      - apps that don't need SEO.. 
 *        (then CSR is sol) 
 *          - apps which are used "internally (inside a company)" as tools 
 *          - apps that entirely hidden behind a login! 
 *            [where SEO is not a concern]..! 
 * 
 * + ======================================================================================================== +
 * >>> [SSR]
 *      - HTML is generated on a web-server [then it sends that generated HTML to client.. on req]
 *        [work of rendering from user's to dev's computer.. computer that is under dev control]
 *          ex: use NEXT.JS
 * $ [PROS]
 *      - FASTER INITIAL PAGE LOADING..
 *          - LESS js needs to be downloaded and executed
 *          - data is fetched before HTML is rendered [as it is generated on server]
 * 
 *      - 'SEO' FRIENDLY..
 *          - content is easier for search engines to index!
 *  
 *      - CONTENT DRIVEN websites where SEO is ESSENTIAL:
 *          - such as: e-Commerce, blogs, news, marketing websites etc.,
 * + ----------------------------------- +
 * $ [CONS]
 *      - LESS INTERACTIVE.. 
 *          - pages might be downloaded on DEMAND and require full page reloads (may not have SPA)
 *          [navigate page-page >> require server to render a new page each time >> leads full page reloading]
 * 
 * + ======================================================================================================== + 
 * >>> [TYPES]
 * ? TWO types of SSR ?
 * ---
 * - "STATIC" site generation.. 
 *      - HTML generated at build-time 
 * [once dev finished developing site.. they export into static HTML, CSS, JS files.. 
 *      which can be deployed on to web-server.. this server will not re-generate mark-up every-time..
 *          server simply sends what was generated once by the dev in beginning!]
 * 
 * - DYNAMIC rendering
 *      - server generates a new HTML.. each time a new request hits 
 *        [means.. generates new pages for each user / user-req] 
 *      - this approach considers TRUE server-side-rendering
 * 
 * $ NOTE
 * - if SEO concerns.. SSR has to be chosen!
 * 
 * >>> [TIMELINE]
 * ---
 * ? [CSR]
 * ---
 *                                                                may use diff server to fetch-data
 *                                                                      /
 * SERVER +----- EMPTY-PAGE ----------------------------- FETCHES data ------------------------------------
 *                      \                                     /         \               + --- LARGEST-CONTENT-PAINTING (LSP)!
 *                       \                                   /           \              |
 * CLIENT +----------- DOWNLOADS JS BUNDLE => RENDER-spinner  ---------- RENDER-APP-with-DATA -------------
 * 
 * ? [SSR]
 * ---
 * 
 * SERVER +----- FETCHES data => RENDER-APP with DATA -----------------------------------------------------
 *                                          \               
 *                 sends finished PRODUCT... \ ...          + --- FIRST / LARGEST CONTENT-PAINTING (CP)
 *                                            \             |
 * CLIENT +--------------------------------- CLIENT / BROWSER ----- DOWNLOADS JS bundle => HYDRATION ------
 * 
 * ? what about interactivity in SSR ?
 * ---
 * - the whole website that is sent to client contains JS bundle
 * - that bundle gets downloaded and executed 
 * - and then happens a process called.. 
 *                  * HYDRATION !
 * 
 * * HYDRATION
 * - where STATIC HTML becomes interactive by addition of JS!
 * 
 * 
 * // ! 3. Experiment: Manual SSR With React DOM + Node.js [OPTIONAL]
 * --+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * (understand how things work at a fundamental level)
 * - copy "starter-files" from.. 
 * => "https://github.com/jonasschmedtmann/ultimate-react-course/tree/main/20-manual-ssr"
 * 
 * - also create a new file: "server.js"
 *    - where start creating new NODEJS web server!
 * 
 * - also install "node.js"
 *    - check version: node -v
 * 
 * - also create a package.json file
 *    - open TERMINAL => write: "npm init -y" 
 * [which will generate package.json]
 * 
 * [code]
 * ------
// >>> server.js
---
const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");

// - reading HTML synchronously from "index.html" 
const htmlTemplate = readFileSync(`./index.html`, "utf-8");

server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;

  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate);
  }
  else if (pathName === "/test") {
    res.end("TEST");
  }
  else {
    res.end("Page not found!");
  }
});

server.listen(8000, () => {
  console.log("server up and running on PORT: 8000");
});
 * 
 * - basic server and an HTML file were created!
 *      - and sending HTML as response!
 * 
 * - depending upon path-names: "/".. sending different HTML pages / data
 *      - this is ROUTING!
 * 
 * - listen to it on OR send requests to
 * => localhost:8080/
 * 
 * >>> sending JSX content!
 * [code]
 * ------
const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");

const htmlTemplate = readFileSync(`./index.html`, "utf-8");

const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];
function Home() {                                                            // - JSX starts here!
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </div>
  );
}
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}
function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;

  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate);
  }
  else if (pathName === "/test") {
    res.end("TEST");
  }
  else {
    res.end("Page not found!");
  }
});

server.listen(8000, () => {
  console.log("server up and running on PORT: 8000");
});
 * 
 * - but as server.js a JS file cannot read JSX code
 *      - in order to fix that we need: "BABEL" plugins 
 * [which helps to keep JSX code along with JS code inside a JS file.. server.js]
 * 
 * # STEP-1 install plugins:
 * --------
 * - inside terminal: install below dev-dependencies [-D: dev-dependencies]
 *      => npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/register
 * 
 * - also install: [not dev-dependencies] 
 *      => npm i react react-dom
 * 
 * - installed packages updated inside "package.json" file!
 * 
 * # STEP-2 create another file:
 * --------
 * - create a file: start.js
 * [code]
 * ------
require("@babel/register")({ extensions: [".js", ".jsx"] });
require("./server.js");
 * 
 * - this will register both extensions and inside server.js file
 * - start the server inside terminal with following commands:
 *    => nodemon start.js
 * 
 * $ FINAL
 * - this is the total boilerplate we need to server-side-render JSX components.. 
 *    - as HTML inside file "server" with .js extension
 * 
 * # LAST-STEP
 * - now convert JSX to normal HTML 
 *    - 1: import entire REACT-library
 *    - 2: use "renderToString" from "react-dom/server"
 * 
 * >>> renderToString
 * [syntax]
 *    - import it from "react-dom/server"
 *    - const html = renderToString( <App /> )
 * [this takes in code that is in JSX-format as an argument and converts it into "HTML"]
 * 
 * [final-code]
 * ------------
const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url"); 
const React = require("react");                               |
const { renderToString } = require("react-dom/server.node");  | ... // - imported "react" and "renderToString" from "react-dom/server" here

// const htmlTemplate = readFileSync(`./index.html`, "utf-8");

const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];

function Home() {
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </div>
  );
}
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}
function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}

const server = createServer((req, res) => {
  //   const pathName = req.url;
  const pathName = parse(req.url, true).pathname;

  if (pathName === "/") {
    const renderedReact = renderToString(<Home />);           // - used "renderToString" here.. to read HTML out of JSX

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(renderedReact);
  }
  else {
    res.end("Page not found!");
  }
});

server.listen(8000, () => {
  console.log("server up and running on PORT: 8000");
});
 * 
 * 
 * - even though we did server-side rendering react!
 *    - it is static-react
 * 
 * - it simply renders every JSX as HTML
 *    - so there will not be any interactivity!
 * 
 * ? then, how can we make this page interactive again ?
 * ---
 * - next lecture
 *    => hydration!
 * 
 * 
 * // ! 4. The Missing Piece: Hydration
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * 
 * * HYDRATION
 *  - which adds back the interactivity and event-handlers that were lost..
 *    - when static-HTML was server-side-rendered
 * [as rendering server-side HTML does not contain interactivity]
 * 
 *              |REACT - COMPONENT - TREE|
 *                ⬇                   ⬇
 *                ⬇                   ⬇     REACT-BUNDLE
 * [SERVER]       ⬇                   ⬇   is sent as well..
 *           SERVER-SIDE              ⬇       ⬇
 *          RENDERED HTML             ⬇       ⬇
 *                ⬇                   ⬇       ⬇
 * ----------------------------------------------------
 * Content        ⬇                   ⬇
 * Painting --- RENDERED              ⬇
 *              webpage-DOM  =>  HYDRATION  + JS  
 *                ⬇                   ⬇
 * [CLIENT]       ⬇                   ⬇
 *                ⬇                   ⬇
 *                ⬇     =result=      ⬇
 *              INTERACTIVE - REACT - APP
 * 
 * $ SUMMARY
 * ---------
 * - a react-app with react-component-tree that we want to render on server
 * [this application is written using NEXT.JS]
 * 
 * - this app will be rendered as server-side rendered HTML markup
 * [this HTML will be sent to client]
 * 
 * - sent HTML from server will be rendered on browser as a webpage
 *    - at this point largest-content-painting will be done!
 * [just content will be painted but not "INTERACTIVITY"]
 * 
 * - at this point initial react-app is not interactive! [just an HTML template]
 * 
 * >>> HYDRATION
 * ---
 * - now hydration.. adds back the interactivity to rendered HTML!
 *    - as server-side-rendering removes interactivity but only generates HTML-MARKUP
 * [interactivity that was lost while server-side rendering react-app]
 * [we need 'hydration' to return that lost interactivity again to server-side rendered HTML]
 * 
 * - we get static HTML and JS also to client from server!
 *    - this JS need to be downloaded! [which is inside REACT-BUNDLE]
 * 
 * >>> this downloaded bundle will "HYDRATE" the RENDERED-STATIC-DOM 
 * 
 * >>> HYDRATION PROCESS.. 
 * - now REACT will build the component-tree on client and .. 
 *    - compares it to actual server-side-rendered DOM [currently on browser-page]
 * 
 * - if they match [checks if they produced exact same DOM]
 *    - then.. react will ADOPT existing DOM.. attaches all events and fires-off existing EFFECTS!
 * [therefore HYDRATION continues the server-side rendering]
 * 
 * $ NOTE
 * - this process only works when existing server-rendered-DOM fits exactly to DOM that react outputs on client
 *    - if there is a change in two DOMs.. then page-content will change after HYDRATION!
 * 
 * * HYDRATION-ERROR:
 *    - if there is a MISMATCH in both DOM-pages we get "HYDRATION-ERROR"
 * 
 * >>> common HYDRATION-ERROR:
 * - incorrect HTML element nesting.. different data used for rendering.. 
 *    - using browser only APIs [window OR local-storage].. incorrect use of side-effects etc.,
 * 
 * $ CONCLUSION
 * - this is conceptual overview of..
 *    ? what HYDRATION is and how it works ?
 * 
 * - in next lecture..
 * => implement HYDRATION manually 
 *    - inside server-side rendered HTML.. [using REACT'S HYDRATION APIs]
 * 
 * 
 * // ! 5. Implementing Hydration
 * -+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-
 * [CONTINUATION.. Experiment: Manual SSR With React DOM + Node.js]
 *    [adding HYDRATION to return interactivity back]
 * - previously in 3rd lecture.. we rendered a STATIC HTML with NO-INTERACTIVITY!
 * 
 * - create a file "client.js"
 *    - link it to "index.html" [at last of body using SCRIPT tag]
 * 
 * [code]
 * ------
 * - a small change inside server.js and index.html
 * 
// >>> index.html
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root">%%CONTENT%%</div>      // - variable %%CONTENT%% replaced with HTML inside server.js
    <script src="./client.js"></script>
</body>                     \
</html>                      + --- // - added script tag and inserted index.html here!

------------------------------------------------------ CONNECTED ------------------------------------------------------

// >>> server.js
---
const htmlTemplate = readFileSync(`./index.html`, "utf-8");     // - read index.html here.. 

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;
//                                     + ---------------------------------- // - reading HTML out of JSX
  if (pathName === "/") {             /
    const renderedReact = renderToString(<Home />);         
    const html = htmlTemplate.replace("%%CONTENT%%", renderedReact);    // - replace %%CONTENT%% with HTML that was read out of JSX using: "renderToString"

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }
  else if (pathName === "/test") {
    res.end("TEST");
  }
  else {
    res.end("Page not found!");
  }
});
 * 
 * - even though we linked "client" a JS file inside INDEX.HTML [client file will not be executed!]
 *    - requests for JS file will be sent but server can not find it on any route! 
 * [so it sends a response: "Page not found!"]
 * 
 * - now we need to write another new route to execute CLIENT 
 *    - so 1: read CLIENT-JS-FILE || 2: write a "/client" || 3: send response to that route >>> res.end(read-file)
 * [hard-coding CLIENT file so that it will reach on a request to: "/client"]
 * 
 * - but NEXT.JS will do all of this process with lot of bundlers and packages
 *    - no need of all this hard-coding when we use NEXT
 * 
 * [hard-coding JS file]
 * ---------------------
// >>> index.html
---
<body>
    <div id="root">%%CONTENT%%</div>
    <script src="./client.js"></script>
</body>
--------------------------------------------- CONNECTED ---------------------------------------------
[file which was linked to index.html file!]
// >>> client.js
---
console.log("hello from client JS");
--------------------------------------------- CONNECTED ---------------------------------------------
// >>> server.js
---
const htmlTemplate = readFileSync(`./index.html`, "utf-8");
const clientJS = readFileSync(`./client.js`, "utf-8");              | // - reading code that was inside client.js

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;

  if (pathName === "/") {
    const renderedReact = renderToString(<Home />);
    const html = htmlTemplate.replace("%%CONTENT%%", renderedReact);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  }
  else if (pathName === "/client.js") {                                   | // - writeHead to set content-type to application/javascript as client is a JS file
    res.writeHead(200, { "Content-Type": "application/javascript" });     | // - sending client-a-js file on request to: "/client.js"
    res.end(clientJS);                                                    |
  }
  else {
    res.end("Page not found!");
  }
});

server.listen(8000, () => {
  console.log("server up and running on PORT: 8000");
});
 * 
 * * HYDRATION:
 *    - hydrating react-code that was inside server.js that is... 
 * [code]
 * ------
const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];

function Home() {
  return (
    <div> ... </div>
  );
}
function Counter() { ... }
function MenuItem({ pizza }) { ... }
 * 
 * - copy all over this code which is inside server.js also into client.js
 * [simply duplicate the code into client.. that was already inside server ]
 * 
 * [according to NEXT]
 * ---
 * - we would not have to do this.. cause module bundler would take of this process 
 *    - process of injection into server
 * 
 * - even though we copy the JSX code into client.js a JS file
 *    - JSX will not be recognized!
 * [as these react-components are not valid JS]
 * 
 * >>> adding BABEL and REACT for client-side also
 * ---
 * # 1: 
 * - so we need to add BABEL to client / FRONT-END 
 *    - search for BABEL CDN and copy from.. 
 *    => https://babeljs.io/docs/babel-standalone
 * 
 * - from the above web-page >>> copy: "<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>"
 *    - paste that same inside "index.html"
 * 
 * # 2:
 * - so add REACT to client
 *    -  search for react-CDN and copy from..
 *    => https://legacy.reactjs.org/docs/cdn-links.html
 * 
 * - copy: 
 *    - "<script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>"
 *    - "<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>"
 * 
 * [updated-index.html]
 * --------------------
<body>
    <div id="root">%%CONTENT%%</div>

    // - adding 'BABEL'
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    // - adding 'JAVASCRIPT'
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <script type="text/babel" src="./client.js"></script>
</body>
 * 
 * # 3:
 * >>> HYDRATING client.js
 * ---
 * - we have pre-rendered react-tree in the form static HTML.. which was coming from the server
 *    - so we don't need "createRoot" fn to create a new DOM
 * 
 * - but we need to HYDRATE the pre-existing DOM
 *    - ReactDOM.hydrateRoot(document.getElementById("root"), <Home />);
 * [we don't need to import: ReactDOM]
 *    [cause] >>> [it is added inside index.html already >>> 
 *                <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>]
 * 
 * - selecting "root" from index.html: "<div id="root">%%CONTENT%%</div>"
 *    - and pass <Home /> the react-tree that was already loaded from server [static-DOM]
 * [this has to be similar to already loaded static-DOM]
 * 
 * >>> ReactDOM.hydrateRoot(document.getElementById("root"), <Home />);
 * - important to HYDRATE!
 * 
 * $ SUMMARY
 * - we completed two steps to render a complete application
 *    - 1: from server HTML as string is rendered [STATIC-HTML] 
 *    - 2: we added the lost INTERACTIVITY
 * 
 * $ ANALYSIS
 * - if we set throttling to slow-3G 
 *    - then 1st content will be loaded [only content but not interactivity]
 * 
 * - no functionality to buttons and events will be added!
 *    - later the JS bundle will be downloaded and HYDRATED now
 * 
 * [complete-code]
 * ---------------
// >>> index.html
---
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="root">%%CONTENT%%</div>

    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>

    <script type="text/babel" src="./client.js"></script>
</body>
</html>
------------------------------- CONNECTED -------------------------------
// >>> server.js
---
const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");
const React = require("react");
const { renderToString } = require("react-dom/server.node");

const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];
function Home() {
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
    </div>
  );
}
function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}
function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}

const htmlTemplate = readFileSync(`./index.html`, "utf-8");   |
const clientJS = readFileSync(`./client.js`, "utf-8");        | ... // - reading both files ... html & js files

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname;

  if (pathName === "/") {
    const renderedReact = renderToString(<Home />);
    const html = htmlTemplate.replace("%%CONTENT%%", renderedReact);        |
    res.writeHead(200, { "Content-Type": "text/html" });                    | // - read static files and sending response 
    res.end(html);
  }
  else if (pathName === "/client.js") {
    res.writeHead(200, { "Content-Type": "application/javascript" });       |
    res.end(clientJS);                                                      | // - read static files and sending response 
  }
  else {
    res.end("Page not found!");
  }
});

server.listen(8000, () => {
  console.log("server up and running on PORT: 8000");
});
------------------------------- CONNECTED -------------------------------
// >>> client.js
---
ReactDOM.hydrateRoot(document.getElementById("root"), <Home />);    // - HYDRATION

const pizzas = [ ... ];
function Home() {
  return (
    <div> ... </div>
  );
}
function Counter() {
  const [count, setCount] = React.useState(0);
  return ( ... )
}
function MenuItem({ pizza }) {
  return ( ... )
}
 * 
 * $ NOTE
 * - we don't need to write this much of code again
 *    - cause we have frameworks NEXT.JS ... do all these!
 * 
 * 
 * ! CONTINUES... !
 * => In next part
 * 
 *  
 */
