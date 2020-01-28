let cacheName = 'v1';
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(cacheName).then((cache) => {
			return cache.addAll([
				'/myApp/',
				'/myApp/canvas-draw-app.html',
				'/myApp/manifest.json',
				'/myApp/images/icons/icon-144x144.png',
			]);
		})
	);
});

self.addEventListener('activate', event=>{
	event.waitUntil(
		caches.keys().then( keyList=>{
			return Promise.all(keyList.map( key=>{
				if (key !== cacheName) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(event) {
	console.log(event); // 查看 chrome://inspect/#service-workers
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});