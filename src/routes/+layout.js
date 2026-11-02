// The app runs only in the browser (no server-side rendering),
// so we can use localStorage directly.
export const ssr = false;

// Build the page as a static HTML file, so the service worker can cache it
export const prerender = true;