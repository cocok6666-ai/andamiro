const CACHE = 'andamiro-v115';
const CORE = ['./', './index.html', './manifest.webmanifest', './icons/icon-192-3.png', './icons/icon-512-3.png', './data/proverbs.json', './data/words.json', './data/tags.json', './data/wtags.json', './data/quiz.json', './data/wquiz.json', './data/emoji.json', './data/fix.json'];
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
