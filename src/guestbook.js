// ============================================================
//  참석 여부(RSVP) · 방명록 저장소
//  → Firebase(무료 Spark 요금제) Firestore 에 저장합니다.
//  → config.js 의 firebase 설정이 비어 있으면 두 섹션은 화면에 나오지 않아요.
//  → 주소 끝에 ?demo 를 붙이면 Firebase 없이 이 브라우저에만 저장되는 미리보기로 동작해요.
// ============================================================

const PAGE = 60; // 방명록을 한 번에 불러오는 개수

// Firebase 를 쓰는 진짜 저장소 (필요할 때만 불러와서 첫 화면 로딩이 느려지지 않게)
async function firebaseStore(cfg) {
  const [{ initializeApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore/lite')]);
  const db = fs.getFirestore(initializeApp(cfg));
  return {
    demo: false,
    addRsvp: (d) => fs.addDoc(fs.collection(db, 'rsvp'), { ...d, createdAt: fs.serverTimestamp() }),
    addGuest: (d) => fs.addDoc(fs.collection(db, 'guestbook'), { ...d, createdAt: fs.serverTimestamp() }),
    async listGuests() {
      const snap = await fs.getDocs(fs.query(fs.collection(db, 'guestbook'), fs.orderBy('createdAt', 'desc'), fs.limit(PAGE)));
      return snap.docs.map((x) => ({ id: x.id, ...x.data(), createdAt: x.data().createdAt?.toDate?.() || new Date() }));
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
    async addGuest(d) { await wait(); write('demo-guestbook', [...read('demo-guestbook'), { ...d, createdAt: Date.now() }]); },
    async listGuests() {
      await wait();
      return read('demo-guestbook').sort((a, b) => b.createdAt - a.createdAt).map((g) => ({ ...g, createdAt: new Date(g.createdAt) }));
    },
  };
}

export function openStore(cfg) {
  if (new URLSearchParams(location.search).has('demo')) return Promise.resolve(demoStore());
  if (!cfg?.apiKey || !cfg?.projectId) return Promise.resolve(null);
  return firebaseStore(cfg);
}
