//importScripts('/cache-polyfill.js');

// Flag for enabling cache in production
var doCache = true;
var CACHE_NAME = "pwa-app-cache";
// Delete old caches
self.addEventListener("activate", event => {
  const currentCachelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (!currentCachelist.includes(key)) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});
// This triggers when user starts the app
self.addEventListener("install", function(event) {
  console.log("SERVICE WORKER INSTALL");
  if (doCache) {
    event.waitUntil(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.addAll([
          "/",
          "/manifest.json",
          "/index.html",
          "/style.css",
          "/reset.css",
          "/bundle.js",
          "/authConfig.js",
          "/api.js",
          "https://fonts.googleapis.com/icon?family=Material+Icons", // TODO(krista): not caching for offline
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500",
          "/firebase503.js",
          "/img/angrypuppy.jpg",
          "/img/apple-touch-icon.jpg",
          "/img/camera.jpg",
          "/img/hunger.png",
          "/img/medicine.png",
          "/img/period.png",
          "/img/sick.png",
          "/img/sleep.png",
          "/img/water.png",
        ]);
      })
    );
  }
});
// Here we intercept request and serve up the matching files
self.addEventListener("fetch", function(event) {
  if (doCache) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  }
});
