// Pigmento — service worker
// Cachea la interfaz y el motor de mezcla para que la app funcione sin conexión.
// No hay backend ni llamadas de red propias: todo el cálculo corre en el dispositivo.

const CACHE_NAME = 'pigmento-cache-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/logo-cropped.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/icon-512-maskable.png',
  './assets/icons/apple-touch-icon.png',
  './assets/icons/favicon-32.png'
];

self.addEventListener('install', (event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(()=> self.clients.claim())
  );
});

// Cache-first para los recursos propios de la app; para todo lo demás,
// intenta la red y cae al cache si no hay conexión.
self.addEventListener('fetch', (event)=>{
  if(event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached=>{
      if(cached) return cached;
      return fetch(event.request).then(response=>{
        if(response && response.ok && event.request.url.startsWith(self.location.origin)){
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return response;
      }).catch(()=> caches.match('./index.html'));
    })
  );
});
