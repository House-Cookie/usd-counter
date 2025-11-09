// Nombre del caché
const CACHE_NAME = 'contador-saldo-cache-v1';

// Archivos que queremos guardar en caché
const urlsToCache = [
    'index.html',
    '/' // Esto es importante para que funcione la ruta raíz
];

// Evento 'install': se dispara cuando el SW se instala
self.addEventListener('install', event => {
    // Espera hasta que el caché esté abierto y todos los archivos guardados
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Evento 'fetch': se dispara cada vez que la página pide un recurso (CSS, JS, imágenes, etc.)
self.addEventListener('fetch', event => {
    event.respondWith(
        // 1. Busca en el caché primero
        caches.match(event.request)
            .then(response => {
                // Si lo encuentra en el caché, lo devuelve
                if (response) {
                    return response;
                }
                // Si no, va a internet a buscarlo
                return fetch(event.request);
            })
    );
});