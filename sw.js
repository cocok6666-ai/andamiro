const CACHE = 'andamiro-v262';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192-3.png', './icons/icon-512-3.png', './data/proverbs.json', './data/words.json', './data/tags.json', './data/wtags.json', './data/quiz.json', './data/wquiz.json', './data/emoji.json', './data/fix.json', './data/tricky.json', './data/pic.json', './data/cho.json', './icons/hero-tiger.png', './icons/hero-rooster.png','./icons/hero-quiz.webp', './icons/dk/01.webp','./icons/dk/02.webp','./icons/dk/03.webp','./icons/dk/04.webp','./icons/dk/05.webp','./icons/dk/06.webp','./icons/dk/07.webp','./icons/dk/08.webp','./icons/dk/09.webp','./icons/dk/10.webp','./icons/dk/11.webp','./icons/dk/12.webp','./icons/dk/13.webp','./icons/dk/14.webp','./icons/dk/15.webp','./icons/dk/16.webp','./icons/dk/17.webp','./icons/dk/18.webp','./icons/dk/19.webp','./icons/dk/20.webp','./icons/dk/21.webp','./icons/dk/22.webp','./icons/dk/23.webp','./icons/dk/24.webp','./icons/dk/25.webp','./icons/dk/26.webp','./icons/dk/27.webp','./icons/dk/28.webp','./icons/dk/29.webp','./icons/dk/30.webp'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
// 같은 사이트 파일: 인터넷이 되면 최신 파일, 안 되면 저장해 둔 파일
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req, {cache:'no-cache'}).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(r => r || caches.match('./index.html')))
  );
});
