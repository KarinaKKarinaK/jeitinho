/// <reference types="@sveltejs/kit" />
import { immutable, assets, prerendered } from '$app/manifest';
import { version } from '$app/env';

const paths = (list) => list.map((p) => new URL(p.path ?? p, location.origin).pathname);
const build = paths(immutable);

// Offline: the whole app shell is cached on install, so lessons, the quiz, the drill and the
// word bank open with no connection. AI, sync and cloud voice still need the network.
const CACHE = `jeitinho-${version}`;
const SHELL = [...build, ...paths(assets), ...paths(prerendered)];
const FONTS = ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'];

self.addEventListener('install', (e) => e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', (e) =>
	e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()))
);

self.addEventListener('fetch', (e) => {
	const url = new URL(e.request.url);
	const font = FONTS.includes(url.origin);
	if (e.request.method !== 'GET' || (url.origin !== location.origin && !font) || url.pathname.startsWith('/api/')) return;
	e.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);
			// hashed build files and fonts never change: cache first
			if (font || build.includes(url.pathname)) {
				const hit = await cache.match(e.request);
				if (hit) return hit;
			}
			try {
				const res = await fetch(e.request);
				if (font && res.ok) cache.put(e.request, res.clone());
				return res;
			} catch (err) {
				// offline: pages use query strings (/lesson?id=...), so match on the path alone
				const hit = (await cache.match(e.request, { ignoreSearch: true })) || (await cache.match(url.pathname.replace(/\/$/, '') || '/'));
				if (hit) return hit;
				throw err;
			}
		})()
	);
});
