;
//asignar un nombre y versión al cache
const CACHE_NAME = 'ToDoList',
  urlsToCache = [
    './',
    './index.html',
    './todolist.css',

    './index.js',
    './regist_serviceWorker.js',
    
    './media/ico/iconstodo/icon-72x72.png',
    './media/ico/iconstodo/icon-512x512.png',

  './https://fonts.googleapis.com',
  './https://fonts.gstatic.com',
  "./https://fonts.googleapis.com/css2?family=Caveat&display=swap",
	"./https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css",
	"./https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
	"./https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js",
	"./https://kit.fontawesome.com/62ea397d3a.js",
	"./https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js",
	"./https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js",
	"./https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js",
	"./https://kit.fontawesome.com/c36a560a32.js"    
   
  ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falló registro de cache', err))
  )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]

  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            //Eliminamos lo que ya no se necesita en cache
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      // Le indica al SW activar el cache actual
      .then(() => self.clients.claim())
  )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
  //Responder ya sea con el objeto en caché o continuar y buscar la url real
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          //recuperar del cache
          return res
        }
        //recuperar de la petición a la url
        return fetch(e.request)
      })
  )
})