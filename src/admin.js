// ============================================================
//  신랑·신부 관리 페이지 (청첩장 주소 끝에 ?admin)
//  → 비밀번호를 넣으면 참석 여부·방명록을 보고 지울 수 있어요. (한 번 들어가면 그 기기에서는 기억)
//  → 비밀번호는 아래 PASS_HASH (SHA-256). 바꾸려면 README 참고.
//  → 이 비밀번호는 화면만 가리는 간단한 잠금이에요. 데이터 자체는 firestore.rules 에서 열려 있어요.
//  → 주소 끝에 ?admin&demo 를 붙이면 미리보기(이 브라우저에 저장된 예시 데이터)
// ============================================================
import './admin.css';
import { config as c } from './config.js';

const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const root = $('#admin');
const DEMO = new URLSearchParams(location.search).has('demo');
const SIDE = { groom: '신랑측', bride: '신부측' };
const MEAL = { yes: '식사함', no: '식사 안 함', unknown: '식사 미정', '': '' };
const PASS_HASH = '42ca2cc50238a49486ffbdacfe7229988db5049c4bb1c5f1de26fdb0883a48a0';
const REMEMBER = 'admin-ok';
const sha256 = async (t) => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(t)))]
  .map((b) => b.toString(16).padStart(2, '0')).join('');
const remembered = () => { try { return localStorage.getItem(REMEMBER) === PASS_HASH; } catch { return false; } };
const remember = (on) => { try { on ? localStorage.setItem(REMEMBER, PASS_HASH) : localStorage.removeItem(REMEMBER); } catch { /* 무시 */ } };
const fmt = (d) => d.toLocaleString('ko-KR', { month: 'numeric', day: 'numeric', hour: 'numeric', minute: '2-digit' });

// ---------- 저장소 ----------
async function firebaseApi() {
  const [{ initializeApp }, fs] = await Promise.all([import('firebase/app'), import('firebase/firestore/lite')]);
  const db = fs.getFirestore(initializeApp(c.firebase));
  const list = async (col) => {
    const snap = await fs.getDocs(fs.query(fs.collection(db, col), fs.orderBy('createdAt', 'desc')));
    return snap.docs.map((x) => ({ id: x.id, ...x.data(), createdAt: x.data().createdAt?.toDate?.() || new Date() }));
  };
  return {
    list,
    remove: (col, id) => fs.deleteDoc(fs.doc(db, col, id)),
  };
}

function demoApi() {
  const key = { rsvp: 'demo-rsvp', guestbook: 'demo-guestbook', guestbook_private: 'demo-guestbook-private' };
  const read = (k) => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } };
  const write = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* 저장 불가 */ } };
  if (!read(key.rsvp).length) {
    const now = Date.now();
    write(key.rsvp, [
      { side: 'groom', name: '예시 친구', attend: true, count: 2, meal: 'yes', note: '부부 같이 갈게요', createdAt: now - 7200000 },
      { side: 'bride', name: '예시 동료', attend: true, count: 1, meal: 'unknown', note: '', createdAt: now - 3600000 },
      { side: 'bride', name: '예시 친척', attend: false, count: 0, meal: '', note: '해외라 못 가요. 축하해!', createdAt: now - 600000 },
    ]);
  }
  // 예전 예시 데이터에는 id 가 없어서, 만든 시각으로 대신 구분
  return {
    demo: true,
    list: async (col) => read(key[col]).map((x) => ({ ...x, id: String(x.createdAt), createdAt: new Date(x.createdAt) }))
      .sort((p, q) => q.createdAt - p.createdAt),
    remove: async (col, id) => write(key[col], read(key[col]).filter((x) => String(x.createdAt) !== id)),
  };
}

// ---------- 화면 ----------
const head = (right = '') => `<header class="ad-head">
  <div><small>Admin</small><b>${esc(c.groom.firstName)} <em>&amp;</em> ${esc(c.bride.firstName)}</b></div>${right}</header>`;

function screen(html) { root.innerHTML = html; }

function loginView(api, msg = '') {
  screen(`${head()}<main class="ad-login">
    <p>참석 여부와 방명록을 보고 관리하는<br>신랑·신부 전용 페이지예요.</p>
    <form id="pw" class="ad-pw">
      <input type="password" inputmode="numeric" autocomplete="current-password" placeholder="비밀번호" aria-label="비밀번호" required>
      <button class="ad-btn ad-google">들어가기</button>
    </form>
    ${msg ? `<p class="ad-err">${msg}</p>` : ''}
  </main>`);
  const form = $('#pw'), input = $('input', form);
  input.focus();
  form.onsubmit = async (e) => {
    e.preventDefault();
    if ((await sha256(input.value.trim())) === PASS_HASH) { remember(true); load(api); } else loginView(api, '비밀번호가 맞지 않아요.');
  };
}

const state = { tab: 'rsvp', side: 'all', attend: 'all', gb: 'all', rsvp: [], guestbook: [] };

function stats(list) {
  const yes = list.filter((r) => r.attend);
  const people = (arr) => arr.reduce((s, r) => s + (Number(r.count) || 0), 0);
  const bySide = (s) => yes.filter((r) => r.side === s);
  const meal = (m) => people(yes.filter((r) => r.meal === m));
  return `<div class="ad-stats">
    <div class="ad-stat big"><b>${people(yes)}</b><span>참석 예정 인원</span></div>
    <div class="ad-stat"><b>${people(bySide('groom'))}</b><span>신랑측</span></div>
    <div class="ad-stat"><b>${people(bySide('bride'))}</b><span>신부측</span></div>
    <div class="ad-stat"><b>${list.length}</b><span>응답 수</span></div>
    <div class="ad-stat"><b>${list.length - yes.length}</b><span>불참 응답</span></div>
    <div class="ad-stat"><b>${meal('yes')}</b><span>식사 인원</span></div>
    <div class="ad-stat"><b>${meal('unknown')}</b><span>식사 미정</span></div>
    <div class="ad-stat"><b>${meal('no')}</b><span>식사 안 함</span></div>
  </div>`;
}

const chip = (group, value, label) => `<button class="ad-chip${state[group] === value ? ' on' : ''}" data-group="${group}" data-value="${value}">${label}</button>`;

function rsvpView() {
  const list = state.rsvp
    .filter((r) => state.side === 'all' || r.side === state.side)
    .filter((r) => state.attend === 'all' || (state.attend === 'yes') === !!r.attend);
  return `${stats(state.rsvp)}
  <div class="ad-filters">
    <div>${chip('side', 'all', '전체')}${chip('side', 'groom', '신랑측')}${chip('side', 'bride', '신부측')}</div>
    <div>${chip('attend', 'all', '전체')}${chip('attend', 'yes', '참석')}${chip('attend', 'no', '불참')}</div>
  </div>
  <div class="ad-bar"><span>${list.length}건</span><button class="ad-link" id="csv">엑셀(CSV)로 받기</button></div>
  <ul class="ad-list">${list.map((r) => `<li class="ad-item${r.attend ? '' : ' no'}">
    <div class="ad-row"><b>${esc(r.name)}</b><span class="ad-badge ${esc(r.side)}">${SIDE[r.side] || ''}</span>
      <time>${fmt(r.createdAt)}</time></div>
    <div class="ad-meta">${r.attend ? `참석 · ${Number(r.count) || 0}명${MEAL[r.meal] ? ` · ${MEAL[r.meal]}` : ''}` : '불참'}</div>
    ${r.note ? `<p class="ad-note">${esc(r.note)}</p>` : ''}
    <button class="ad-del" data-col="rsvp" data-id="${esc(r.id)}" data-name="${esc(r.name)}">삭제</button>
  </li>`).join('') || '<li class="ad-empty">아직 응답이 없어요.</li>'}</ul>`;
}

function guestView() {
  const priv = state.guestbook.filter((g) => g.col === 'guestbook_private').length;
  const list = state.guestbook.filter((g) => state.gb === 'all' || (state.gb === 'private') === (g.col === 'guestbook_private'));
  return `<div class="ad-filters"><div>${chip('gb', 'all', '전체')}${chip('gb', 'public', `공개 ${state.guestbook.length - priv}`)}${chip('gb', 'private', `비공개 ${priv}`)}</div></div>
  <div class="ad-bar"><span>${list.length}건</span></div>
  <ul class="ad-list">${list.map((g) => `<li class="ad-item${g.col === 'guestbook_private' ? ' secret' : ''}">
    <div class="ad-row"><b>${esc(g.name)}</b>${g.col === 'guestbook_private' ? '<span class="ad-badge secret">비공개</span>' : ''}<time>${fmt(g.createdAt)}</time></div>
    <p class="ad-note">${esc(g.message)}</p>
    <button class="ad-del" data-col="${g.col}" data-id="${esc(g.id)}" data-name="${esc(g.name)}">삭제</button>
  </li>`).join('') || '<li class="ad-empty">아직 방명록이 없어요.</li>'}</ul>`;
}

function render(api) {
  screen(`${head(`<div class="ad-user"><button class="ad-link" id="logout">잠그기</button></div>`)}
  <nav class="ad-tabs">
    <button data-tab="rsvp" class="${state.tab === 'rsvp' ? 'on' : ''}">참석 여부 <i>${state.rsvp.length}</i></button>
    <button data-tab="guestbook" class="${state.tab === 'guestbook' ? 'on' : ''}">방명록 <i>${state.guestbook.length}</i></button>
    <button class="ad-refresh" id="refresh" aria-label="새로고침">↻</button>
  </nav>
  <main class="ad-main">${state.tab === 'rsvp' ? rsvpView() : guestView()}</main>`);

  $('#logout').onclick = () => { remember(false); loginView(api); };
  $('#refresh').onclick = () => load(api);
  root.querySelectorAll('[data-tab]').forEach((b) => { b.onclick = () => { state.tab = b.dataset.tab; render(api); }; });
  root.querySelectorAll('.ad-chip').forEach((b) => { b.onclick = () => { state[b.dataset.group] = b.dataset.value; render(api); }; });
  $('#csv')?.addEventListener('click', downloadCsv);
  root.querySelectorAll('.ad-del').forEach((b) => {
    b.onclick = async () => {
      const what = b.dataset.col === 'rsvp' ? '참석 여부' : '방명록';
      const group = b.dataset.col === 'rsvp' ? 'rsvp' : 'guestbook';
      if (!confirm(`${b.dataset.name} 님의 ${what}를 삭제할까요?\n삭제하면 되돌릴 수 없어요.`)) return;
      b.disabled = true; b.textContent = '삭제 중…';
      try {
        await api.remove(b.dataset.col, b.dataset.id);
        state[group] = state[group].filter((x) => !(x.id === b.dataset.id && x.col === b.dataset.col));
        render(api);
      } catch (e) {
        alert(`삭제하지 못했어요. (${e.code || e.message})`);
        b.disabled = false; b.textContent = '삭제';
      }
    };
  });
}

function downloadCsv() {
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [['구분', '이름', '참석', '인원', '식사', '남긴 말', '보낸 시각'],
    ...state.rsvp.map((r) => [SIDE[r.side] || r.side, r.name, r.attend ? '참석' : '불참', r.attend ? r.count : 0,
      MEAL[r.meal] || '', r.note || '', r.createdAt.toLocaleString('ko-KR')])];
  // 맨 앞 BOM: 엑셀에서 한글이 깨지지 않게
  const blob = new Blob(['﻿' + rows.map((r) => r.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'rsvp.csv' });
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

async function load(api) {
  screen(`${head()}<main class="ad-login"><p>불러오는 중…</p></main>`);
  try {
    const [rsvp, pub, priv] = await Promise.all([api.list('rsvp'), api.list('guestbook'), api.list('guestbook_private')]);
    state.rsvp = rsvp.map((x) => ({ ...x, col: 'rsvp' }));
    state.guestbook = [...pub.map((x) => ({ ...x, col: 'guestbook' })), ...priv.map((x) => ({ ...x, col: 'guestbook_private' }))]
      .sort((p, q) => q.createdAt - p.createdAt);
    render(api);
  } catch (e) {
    if (e.code === 'permission-denied') {
      screen(`${head()}<main class="ad-login">
        <p>데이터를 읽을 권한이 없어요.</p>
        <p class="ad-tip">Firebase 콘솔의 Firestore 규칙 탭에<br>이 폴더의 firestore.rules 내용을 다시 게시해 주세요.</p>
        <button class="ad-btn" id="retry">다시 시도</button></main>`);
      $('#retry').onclick = () => load(api);
    } else {
      screen(`${head()}<main class="ad-login"><p class="ad-err">불러오지 못했어요. (${esc(e.code || e.message)})</p>
        <button class="ad-btn" id="retry">다시 시도</button></main>`);
      $('#retry').onclick = () => load(api);
    }
  }
}

(async () => {
  if (!DEMO && !c.firebase?.apiKey) {
    screen(`${head()}<main class="ad-login"><p>config.js 의 firebase 설정이 비어 있어요.</p></main>`);
    return;
  }
  screen(`${head()}<main class="ad-login"><p>불러오는 중…</p></main>`);
  const api = DEMO ? demoApi() : await firebaseApi();
  if (remembered()) load(api); else loginView(api);
})();
