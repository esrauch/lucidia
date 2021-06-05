const cacheName = '1';
const contentToCache = [
    '/',
    '/index.html',
    '/out/main.js',
];

self.addEventListener('install', ev => {
    self.skipWaiting();
    ev.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(contentToCache)));
});

self.addEventListener('fetch', ev => {
    ev.respondWith(async () => {
        const r = await caches.match(e.request);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
    });
});