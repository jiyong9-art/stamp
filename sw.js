// 날인기 링크: 첫 화면·아이콘·확인 파일을 기기에 보관 → 인터넷이 끊겨도 열림 (날인기 본체는 IndexedDB에 따로 보관)
const C = "a1stamp-shell-v2";   // 이름을 바꾸면 기기에 남은 옛 첫 화면을 지움
self.addEventListener("install", e => { e.waitUntil(caches.open(C).then(c => c.addAll(["./", "./index.html", "./manifest.json", "./icon.png"]).catch(() => {}))); self.skipWaiting(); });
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== C).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin || /\.enc$/.test(u.pathname)) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(C).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./index.html"))));
});
