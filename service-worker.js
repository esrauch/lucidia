const cacheName = 'v3';
const contentToCache = [
    '/',
    '/index.html',
    '/out/main.js',
    '/manifest.json',
];

self.addEventListener('install', ev => {
    self.skipWaiting();
    ev.waitUntil(
        caches.open(cacheName).then(cache => cache.addAll(contentToCache)));
});

self.addEventListener('fetch', ev => {
    ev.respondWith(
        caches.match(ev.request).then(response => response || fetch(ev.request))
    );
});
