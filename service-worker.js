importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/index.html', revision: '2' },
    { url: '/detail_team.html', revision: '2' },
    { url: '/manifest.json', revision: '2' },
    { url: '/nav.html', revision: '2' },
    { url: '/push.js', revision: '2' },
    { url: '/maskable_icon.png', revision: '2' },
    { url: '/maskable_icon2.png', revision: '2' },


    { url: '/css/materialize.min.css', revision: '2' },
    { url: '/css/materialize.css', revision: '2' },

    { url: '/js/materialize.min.js', revision: '2' },
    { url: '/js/materialize.js', revision: '2' },
    { url: '/js/db.js', revision: '2' },
    { url: '/js/idb.js', revision: '2' },
    { url: '/js/detail.js', revision: '2' },
    { url: '/js/home.js', revision: '2' },
    { url: '/js/nav.js', revision: '2' },
    { url: '/js/parallax.js', revision: '2' },
    { url: '/js/register_sw.js', revision: '2' },


    { url: '/aset/gmail.svg', revision: '2' },
    { url: '/aset/user.svg', revision: '2' },
    { url: '/aset/parallax.jpg', revision: '2' },
    { url: '/aset/slider.jpg', revision: '2' },
    { url: '/aset/slider2.jpg', revision: '2' },
  ], {
    ignoreUrlParametersMatching: [/.*/]
  });

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
new RegExp('https://api.football-data.org/v2/'),
workbox.strategies.staleWhileRevalidate({
    cacheName: 'api-bola'
})
);


// Menyimpan cache dari CSS Google Fonts
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets',
  })
);
 
// Menyimpan cache untuk file font selama 1 tahun
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  workbox.strategies.cacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);


self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
      body = event.data.text();
    } else {
      body = 'Push message no payload';
    }
    var options = {
      body: body,
      icon: 'maskable_icon.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });




