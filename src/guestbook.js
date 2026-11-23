// ============================================================
//  참석 여부(RSVP) · 방명록 저장소
//  → Firebase(무료 Spark 요금제) Firestore 에 저장합니다.
//  → config.js 의 firebase 설정이 비어 있으면 두 섹션은 화면에 나오지 않아요.
//  → 주소 끝에 ?demo 를 붙이면 Firebase 없이 이 브라우저에만 저장되는 미리보기로 동작해요.
//  → 비공개 방명록은 guestbook_private 에 따로 저장되어 신랑·신부 관리 페이지(?admin)에서만 보여요.
// ============================================================

const PAGE = 12;                 // 방명록을 한 번에 불러오는 개수 (적을수록 무료 사용량을 아낌)
const CACHE_KEY = 'gb-cache-v1'; // 첫 페이지를 잠깐 기억해서, 새로고침해도 다시 읽지 않게
const CACHE_MS = 5 * 60 * 1000;  // 5분

const cache = {
  get() {
    try {
      const v = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
      if (!v || Date.now() - v.at > CACHE_MS) return null;
      return { items: v.items.map((g) => ({ ...g, createdAt: new Date(g.createdAt) })), next: v.next };
    } catch { return null; }
  },
  set(page) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        at: Date.now(), next: page.next, items: page.items.map((g) => ({ ...g, createdAt: g.createdAt.getTime() })),
      }));
    } catch { /* 저장 불가 */ }
  },
  clear() { try { localStorage.removeItem(CACHE_KEY); } catch { /* 무시 */ } },
};

// Firebase 를 쓰는 진짜 저장소 (필요할 때만 불러와서 첫 화면 로딩이 느려지지 않게)
async function firebaseStore(cfg) {
  const [{ initializeApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore/lite')]);
  const db = fs.getFirestore(initializeApp(cfg));
  const add = (col, d) => fs.addDoc(fs.collection(db, col), { ...d, createdAt: fs.serverTimestamp() });
  return {
    demo: false,
    addRsvp: (d) => add('rsvp', d),
    async addGuest(d, secret) {
      await add(secret ? 'guestbook_private' : 'guestbook', d);
      if (!secret) cache.clear();
    },
    // after: 이전 페이지 마지막 글의 시각(ms). 없으면 첫 페이지 → { items, next }
    async listGuests(after) {
      if (!after) { const hit = cache.get(); if (hit) return hit; }
      const q = [fs.orderBy('createdAt', 'desc')];
      if (after) q.push(fs.startAfter(fs.Timestamp.fromMillis(after)));
      q.push(fs.limit(PAGE));
      const snap = await fs.getDocs(fs.query(fs.collection(db, 'guestbook'), ...q));
      const items = snap.docs.map((x) => ({ id: x.id, ...x.data(), createdAt: x.data().createdAt?.toDate?.() || new Date() }));
      const page = { items, next: items.length === PAGE ? items[items.length - 1].createdAt.getTime() : null };
      if (!after) cache.set(page);
      return page;
    },
  };
}

// 미리보기용 저장소: 이 브라우저(localStorage)에만 저장
function demoStore() {
  const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 저장 불가 */ } };
  if (!read('demo-guestbook').length) {
    write('demo-guestbook', [
      { name: '예시 하객', message: '(미리보기 예시) 두 분 결혼 진심으로 축하드려요! 행복하세요 ♥', createdAt: Date.now() - 86400000 },
      { name: '예시 친구', message: '(미리보기 예시) 10년의 사랑이 결실을 맺는 날, 꼭 갈게요!', createdAt: Date.now() - 3600000 },
    ]);
  }
  const wait = () => new Promise((r) => setTimeout(r, 400));
  return {
    demo: true,
    async addRsvp(d) { await wait(); write('demo-rsvp', [...read('demo-rsvp'), { ...d, createdAt: Date.now() }]); },
    async addGuest(d, secret) {
      await wait();
      const k = secret ? 'demo-guestbook-private' : 'demo-guestbook';
      write(k, [...read(k), { ...d, createdAt: Date.now() }]);
    },
    async listGuests(after) {
      await wait();
      const all = read('demo-guestbook').sort((a, b) => b.createdAt - a.createdAt).filter((g) => !after || g.createdAt < after);
      const items = all.slice(0, PAGE).map((g) => ({ ...g, createdAt: new Date(g.createdAt) }));
      return { items, next: all.length > PAGE ? items[items.length - 1].createdAt.getTime() : null };
    },
  };
}

export function openStore(cfg) {
  if (new URLSearchParams(location.search).has('demo')) return Promise.resolve(demoStore());
  if (!cfg?.apiKey || !cfg?.projectId) return Promise.resolve(null);
  return firebaseStore(cfg);
}
