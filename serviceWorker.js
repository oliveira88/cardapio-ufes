const staticCardapio = 'cardapio-ufes-v1';
const assets = [
  '/',
  '/index.html',
  '/css/style.css',
  '/js/script.js',
  '/images/logo-peq.png',
  '/images/logo.png',
  '/images/marca_ufes.png'
];

self.addEventListener('install', installEvent => {
  installEvent.waitUntil(
    caches.open(staticCardapio).then(cache => {
      cache.addAll(assets);
    })
  );
});
self.addEventListener('fetch', fetchEvent => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then(res => {
      return res || fetch(fetchEvent.request);
    })
  );
});
