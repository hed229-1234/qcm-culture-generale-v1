const CACHE_NOM = 'qcm-culture-v1';
const FICHIERS_A_GARDER = [
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'icone-192.png',
    'icone-512.png'
];

self.addEventListener('install', (evenement) => {
    evenement.waitUntil(
        caches.open(CACHE_NOM).then((cache) => cache.addAll(FICHIERS_A_GARDER))
    );
});

self.addEventListener('fetch', (evenement) => {
    evenement.respondWith(
        caches.match(evenement.request).then((reponse) => reponse || fetch(evenement.request))
    );
});