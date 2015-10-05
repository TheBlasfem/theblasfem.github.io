importScripts('serviceworker-cache-polyfill.js');

var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  '/',
  '/styles/normalize.css',
  '/styles/styles.css'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // if Cache hits, it returns response
        if (response) {
          return response;
        }

        return fetch(event.request);
      }
    )
  );
});