"use strict";

const CACHE_NAME = "events-cache-v1";
const urlsToCache = ['/index.html'
                    ,'assets/css/style.css'
                    ,'assets/css/responsive.css'
                    , 'assets/css/font-awesome.min.css'
                    , 'assets/css/bootstrap.min.css'
                    , 'assets/js/script.js'
                    , 'assets/js/localforage.min.js'
                    , 'assets/js/serviceworker.js'
                    , '/images/Banner.png'
                    , '/images/about-spider-wev-image.png'
                    , '/images/artist-image.png'
                    , '/images/body-img.jpg'
                    , '/images/feedback-image-1.png'
                    , '/images/feedback-image-2.png'
                    , '/images/fox-background-image.png'
                    , '/images/gallery-background-image.jpg'
                    , '/images/gallery-image-1.jpg'
                    , '/images/gallery-image-2.jpg'
                    , '/images/gallery-image-3.jpg'
                    , '/images/gallery-image-4.jpg'
                    , '/images/get-ticket-background-image.jpg'
                    , '/images/header-logo.png'
                    , '/images/living-dead.png'
                    , '/images/popup-ticket.png'
                    , '/images/Scratch.png'
                    , '/images/Skull.jpg'
                    , '/images/ticket-image-1.jpg'
                    , '/images/title-spider.png'
                    
                ];

self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open(CACHE_NAME).then(function(cache){
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = ['events-cache-v1'];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            //todo maybe change response type to support cross origin requests

            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});