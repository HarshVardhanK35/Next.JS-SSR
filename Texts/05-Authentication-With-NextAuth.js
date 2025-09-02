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
 * - B. NEXTAUTH_SECRET will be from URL: "https://generate-secret.vercel.app/32"
 * - C. AUTH_GOOGLE_SECRET and AUTH_GOOGLE_ID comes from GOOGLE oauth setup!
 *    : we have to use google developer console to get these values.. so follow a tutorial on Youtube on how to setup google for OAuth setup for a next.js app
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