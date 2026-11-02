import { immutable, assets, prerendered } from '$app/manifest';
import { version } from '$app/env';

// Cache name with version: every new build gets a new cache
const CACHE = `cache-${version}`;

// Everything the app needs to run offline (JS/CSS, static files, the page)
const FILES = [...immutable, ...assets, ...prerendered].map((file) => '/' + file.path);

// 1. Install: download all files into the cache
self.addEventListener('install', (event) => {
	event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
});

// 2. Activate: delete old caches from previous versions
self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches.keys().then((keys) =>
			Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))
		)
	);
});

// 3. Fetch: answer from the cache first, otherwise from the network
self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});