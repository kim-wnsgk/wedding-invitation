// ============================================================
//  추가 연출 효과 모음
//  성에 닦기 · 하늘색 변화(아침→밤) · 별 · 고양이 반응 · 발도장 · 전구 · 길 안내
// ============================================================

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

// ---------- 날짜에 따라 달라지는 화면 ----------
// 'before' 예식 전 / 'dday' 예식 당일(한국 날짜 기준) / 'after' 예식 다음 날부터
// 주소 끝에 ?preview=dday 또는 ?preview=after 를 붙이면 미리 볼 수 있어요.
export function getMode(w) {
  const forced = new URLSearchParams(location.search).get('preview');
  if (['before', 'dday', 'after'].includes(forced)) return forced;
  const k = new Date(Date.now() + 9 * 3600 * 1000); // 지금 한국 날짜
  const today = k.getUTCFullYear() * 10000 + (k.getUTCMonth() + 1) * 100 + k.getUTCDate();
  const day = w.year * 10000 + w.month * 100 + w.day;
  return today < day ? 'before' : today === day ? 'dday' : 'after';
}

// ---------- 스크롤할수록 아침 → 오후 → 노을 → 저녁 (바탕색이 아주 은은하게) + 끝에는 별 ----------
// 아침 햇살 → 황금빛 오후 → 노을 → 라일락빛 저녁
const SKY = [[0, [252, 248, 241]], [0.4, [250, 243, 230]], [0.7, [249, 237, 229]], [1, [240, 234, 240]]];
let stars = null, lastSky = -1;
export function setSky(p, reduceMotion) {
  if (Math.abs(p - lastSky) < 0.004) return;
  lastSky = p;
  let i = 1;
  while (i < SKY.length - 1 && SKY[i][0] < p) i++;
  const [p0, c0] = SKY[i - 1], [p1, c1] = SKY[i], t = Math.min(1, Math.max(0, (p - p0) / (p1 - p0)));
  const rgb = c0.map((v, k) => Math.round(v + (c1[k] - v) * t));
  document.documentElement.style.setProperty('--card', `rgb(${rgb.join(',')})`);
  if (reduceMotion) return;
  if (!stars) {
    stars = document.createElement('div');
    stars.className = 'stars';
    stars.setAttribute('aria-hidden', 'true');
    stars.innerHTML = Array.from({ length: 26 }, () =>
      `<i style="left:${(Math.random() * 100).toFixed(1)}%;top:${(Math.random() * 45).toFixed(1)}%;--d:${(Math.random() * 3).toFixed(1)}s;--s:${(0.6 + Math.random() * 0.9).toFixed(2)}"></i>`).join('');
    document.body.appendChild(stars);
  }
  stars.style.opacity = Math.max(0, (p - 0.72) / 0.28).toFixed(3);
  setRays(p, reduceMotion);

}

// ---------- 별자리 이니셜: 맨 아래 밤하늘에서 별들이 선으로 이어져 'J ♥ J' ----------
export function constellation() {
  const J = (ox) => [[ox + 10, 8], [ox + 34, 8], [ox + 22, 8], [ox + 22, 50], [ox + 15, 60], [ox + 5, 54]];
  const heart = [[100, 56], [84, 38], [88, 22], [100, 28], [112, 22], [116, 38], [100, 56]];
  const line = (pts) => `<path d="M${pts.map(([x, y]) => `${x} ${y}`).join('L')}" pathLength="1"/>`;
  return `<svg class="constellation" viewBox="-6 -2 212 70" aria-hidden="true">
    <g class="c-lines">${line(J(0).slice(0, 2))}${line(J(0).slice(2))}${line(heart)}${line(J(160).slice(0, 2))}${line(J(160).slice(2))}</g>
    ${[J(0), heart, J(160)].flat().map(([x, y], i) => `<circle class="c-star" cx="${x}" cy="${y}" r="${i % 3 ? 1.6 : 2.2}" style="--d:${(i * 0.13).toFixed(2)}s"/>`).join('')}
  </svg>`;
}

// ---------- 고양이를 누르면: 말풍선 + 하트 + 폴짝 ----------
const MEOWS = ['야옹', '냐옹~', '미야!', '냥', '골골골…', '꾹꾹'];
export function initCatPoke() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('.cat');
    if (!el || el.closest('.walk')) return;
    el.classList.remove('poke');
    void el.getBoundingClientRect();
    el.classList.add('poke');
    const r = el.getBoundingClientRect();
    const b = document.createElement('div');
    b.className = 'meow';
    b.innerHTML = `${MEOWS[Math.floor(Math.random() * MEOWS.length)]}<i>♥</i>`;
    b.style.left = `${r.left + r.width / 2}px`;
    b.style.top = `${r.top}px`;
    document.body.appendChild(b);
    setTimeout(() => b.remove(), 1400);
  });
}

// ---------- 계좌번호 복사하면 고양이 발도장 꾹 ----------
export function pawStamp(el) {
  const r = el.getBoundingClientRect();
  const p = document.createElement('div');
  p.className = 'paw';
  p.style.left = `${r.left + r.width / 2}px`;
  p.style.top = `${r.top + r.height / 2}px`;
  p.innerHTML = `<svg viewBox="0 0 40 40" aria-hidden="true"><ellipse cx="20" cy="26" rx="9" ry="7.5"/>
    <ellipse cx="9" cy="15" rx="3.6" ry="4.6" transform="rotate(-20 9 15)"/><ellipse cx="16" cy="9" rx="3.6" ry="4.8"/>
    <ellipse cx="24" cy="9" rx="3.6" ry="4.8"/><ellipse cx="31" cy="15" rx="3.6" ry="4.6" transform="rotate(20 31 15)"/></svg>`;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1300);
}

// ---------- 맨 아래 전구 줄: 늘어진 전선 위의 전구 위치 계산 ----------
export function lights(n = 11) {
  const P = [[0, 6], [160, 44], [320, 6]];
  const pt = (t) => [0, 1].map((k) => (1 - t) ** 2 * P[0][k] + 2 * (1 - t) * t * P[1][k] + t ** 2 * P[2][k]);
  const bulbs = Array.from({ length: n }, (_, i) => {
    const [x, y] = pt((i + 0.5) / n);
    return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})"><rect x="-1.8" y="0" width="3.6" height="3.4" rx=".8" fill="#9C8F86"/>
      <ellipse class="bulb" style="--i:${i}" cx="0" cy="8" rx="3.6" ry="5"/></g>`;
  }).join('');
  return `<svg class="lights" viewBox="0 -4 320 64" aria-hidden="true"><path d="M0 6Q160 44 320 6" stroke="#8F857D" stroke-width="1" fill="none"/>${bulbs}</svg>`;
}

// ---------- 오시는 길 제목 옆 작은 탈것: 길이 흘러가고 바퀴가 돌아감 ----------
// 제목에 들어간 낱말로 골라요: 셔틀 / 버스 / 자가용·자동차 / 주차 / 지하철·기차
const wheel = (x) => `<g class="wheel"><circle cx="${x}" cy="17" r="3" fill="#4A4652"/><path d="M${x - 2} 17h4" stroke="#fff" stroke-width=".9"/></g>`;
const VEHICLES = {
  shuttle: `<g class="body"><rect x="6" y="4" width="30" height="12" rx="3.5" fill="#C98B97"/>
    <rect x="9" y="6.5" width="5.5" height="4.5" rx="1" fill="#fff"/><rect x="16.5" y="6.5" width="5.5" height="4.5" rx="1" fill="#fff"/><rect x="24" y="6.5" width="5.5" height="4.5" rx="1" fill="#fff"/>
    <rect x="31" y="6.5" width="3.5" height="7" rx="1" fill="#FBE4EA"/>${wheel(13)}${wheel(29)}</g>`,
  bus: `<g class="body"><rect x="5" y="3" width="33" height="13" rx="3" fill="#7E9CC0"/>
    <rect x="8" y="5.5" width="6" height="5" rx="1" fill="#fff"/><rect x="16" y="5.5" width="6" height="5" rx="1" fill="#fff"/><rect x="24" y="5.5" width="6" height="5" rx="1" fill="#fff"/>
    <rect x="32" y="5.5" width="4" height="8.5" rx="1" fill="#DDE7F2"/><rect x="5" y="12" width="33" height="1.4" fill="#5F7EA5"/>${wheel(12)}${wheel(31)}</g>`,
  car: `<g class="body"><path d="M7 15v-4.2c0-1 .7-1.8 1.7-2l4-.8 3.6-3.6c.6-.6 1.4-.9 2.2-.9h6.4c.9 0 1.7.4 2.3 1l3.3 3.6 2.6.6c1 .2 1.7 1.1 1.7 2.1V15z" fill="#E2A35C"/>
    <path d="M14.4 8.2 17.4 5.4h3.8v2.8zM22.8 5.4h2.6c.4 0 .8.2 1.1.5l2.3 2.3h-6z" fill="#fff"/>${wheel(14)}${wheel(30)}</g>`,
  park: `<rect x="1" y="1" width="11" height="11" rx="2.5" fill="#5A7FB5"/><path d="M4.6 9.6V3.6h2.6a1.8 1.8 0 0 1 0 3.6H4.6" stroke="#fff" stroke-width="1.3" fill="none"/>
    <g class="body"><path d="M15 15v-3.6c0-.9.6-1.6 1.5-1.8l3.4-.7 3-3c.5-.5 1.2-.8 1.9-.8h5.4c.8 0 1.5.3 2 .9l2.8 3 2.2.5c.9.2 1.5 1 1.5 1.9V15z" fill="#C98B97"/>
    <path d="M21.2 9.2 23.8 6.8h3.2v2.4zM28.4 6.8h2.2c.4 0 .7.1.9.4l2 2h-5.1z" fill="#fff"/>${wheel(21)}${wheel(34.5)}</g>`,
  train: `<g class="body"><rect x="6" y="2" width="30" height="14" rx="4" fill="#8DAF8A"/><rect x="9" y="5" width="9" height="5" rx="1.2" fill="#fff"/><rect x="21" y="5" width="9" height="5" rx="1.2" fill="#fff"/>
    <rect x="32" y="4" width="2.5" height="9" rx="1" fill="#EAF2E9"/><circle cx="11" cy="13" r="1" fill="#FFF3C4"/><circle cx="31" cy="13" r="1" fill="#FFF3C4"/>${wheel(13)}${wheel(29)}</g>`,
};
export function vehicle(title) {
  const kind = /셔틀/.test(title) ? 'shuttle' : /주차/.test(title) ? 'park' : /버스/.test(title) ? 'bus'
    : /자가용|자동차|승용차|차량/.test(title) ? 'car' : /지하철|전철|기차|KTX|SRT|열차/.test(title) ? 'train' : '';
  if (!kind) return '';
  return `<svg class="veh veh-${kind}" viewBox="0 0 44 22" aria-hidden="true"><path class="road" d="M0 20.5H44"/>${VEHICLES[kind]}</svg>`;
}

// ---------- 섹션 모서리에서 천천히 자라는 성에 장식 ----------
export function frostCorner(cls) {
  let seed = cls.length * 97;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const paths = [];
  const fern = (x, y, ang, len, depth) => {
    if (depth <= 0 || len < 3) return;
    const x2 = x + Math.cos(ang) * len, y2 = y + Math.sin(ang) * len;
    paths.push(`M${x.toFixed(1)} ${y.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}`);
    fern(x2, y2, ang + (rnd() - 0.5) * 0.4, len * 0.76, depth - 1);
    fern(x + (x2 - x) * 0.55, y + (y2 - y) * 0.55, ang - 0.85, len * 0.46, depth - 1);
    fern(x + (x2 - x) * 0.6, y + (y2 - y) * 0.6, ang + 0.85, len * 0.42, depth - 1);
  };
  fern(0, 0, 0.55, 30, 5);
  fern(0, 0, 1.05, 26, 4);
  fern(0, 0, 0.15, 22, 4);
  return `<svg class="frost-corner ${cls}" viewBox="0 0 90 90" aria-hidden="true">${paths.map((d, i) => `<path d="${d}" pathLength="1" style="--i:${(i % 12) * 0.08}s"/>`).join('')}</svg>`;
}

// ---------- 섹션 제목 위에 가끔 눈송이가 내려앉았다 녹음 ----------
export function initTitleSnow(reduceMotion) {
  if (reduceMotion) return;
  setInterval(() => {
    if (document.hidden) return;
    const vis = [...document.querySelectorAll('section h2')].filter((h) => {
      const r = h.getBoundingClientRect();
      return r.top > 40 && r.bottom < window.innerHeight - 60;
    });
    if (!vis.length) return;
    const h = vis[Math.floor(Math.random() * vis.length)];
    const f = document.createElement('i');
    f.className = 'title-flake';
    f.style.left = `${15 + Math.random() * 70}%`;
    f.setAttribute('aria-hidden', 'true');
    h.appendChild(f);
    setTimeout(() => f.remove(), 4200);
  }, 2600);
}

// ---------- 고양이 눈동자가 손가락(마우스) 쪽을 바라봄 ----------
export function initEyes(reduceMotion) {
  if (reduceMotion) return;
  let px = window.innerWidth / 2, py = window.innerHeight / 2, queued = false;
  const look = () => {
    queued = false;
    document.querySelectorAll('.cat .eyes').forEach((e) => {
      const r = e.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const dx = px - (r.left + r.width / 2), dy = py - (r.top + r.height / 2), d = Math.hypot(dx, dy) || 1;
      e.style.translate = `${((dx / d) * 0.9).toFixed(2)}px ${((dy / d) * 0.7).toFixed(2)}px`;
    });
  };
  const set = (x, y) => { px = x; py = y; if (!queued) { queued = true; requestAnimationFrame(look); } };
  window.addEventListener('pointerdown', (e) => set(e.clientX, e.clientY), { passive: true });
  window.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse') set(e.clientX, e.clientY); }, { passive: true });
  // 스크롤할 때는 내려가는 쪽(아래)·올라가는 쪽(위)을 바라봄
  let lastY = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    set(window.innerWidth / 2, y > lastY ? window.innerHeight + 200 : -200);
    lastY = y;
  }, { passive: true });
}

// ---------- 말린 꽃잎(압화) 장식: 섹션에 들어서면 한 장씩 살포시 내려앉음 ----------
const PRESSED = {
  flower: `<g fill="#E7B9BF" stroke="#C99199" stroke-width=".5">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="20" cy="11" rx="5.2" ry="8" transform="rotate(${a} 20 20)"/>`).join('')}</g><circle cx="20" cy="20" r="3.4" fill="#E9C77E"/>`,
  leaf: '<path d="M6 36C10 22 18 10 34 4 31 20 22 31 6 36Z" fill="#B7C4A2" stroke="#93A37E" stroke-width=".6"/><path d="M8 34C16 24 23 15 31 7" stroke="#93A37E" stroke-width=".7" fill="none"/>',
  sprig: `<path d="M20 38V8M20 22l-7-6M20 16l6-5M20 28l7-5" stroke="#A9B796" stroke-width="1" fill="none"/>${[[20, 6], [13, 15], [26, 10], [27, 22], [12, 21]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="#FBF6EC" stroke="#D8CDBA" stroke-width=".5"/>`).join('')}`,
};
export function pressed(kind, cls, rot = 0) {
  return `<svg class="pressed ${cls}" style="--r:${rot}deg" viewBox="0 0 40 40" aria-hidden="true">${PRESSED[kind]}</svg>`;
}

// ---------- 타자기: 글자가 한 자씩 찍히고 커서가 깜빡임 ----------
export function typeOut(el) {
  const text = el.dataset.text || (el.dataset.text = el.textContent);
  clearInterval(el._tw);
  el.style.minHeight = `${el.offsetHeight}px`;
  el.innerHTML = '<span class="tw"></span><i class="tw-caret"></i>';
  const out = el.firstChild;
  let i = 0;
  el._tw = setInterval(() => {
    out.textContent = text.slice(0, ++i);
    if (i >= text.length) { clearInterval(el._tw); setTimeout(() => el.lastChild?.classList.add('done'), 1800); }
  }, 70);
}

// ---------- 노을 햇살: 스크롤이 노을 구간에 들어서면 위에서 따뜻한 빛줄기 ----------
let rays = null;
export function setRays(p, reduceMotion) {
  if (reduceMotion) return;
  if (!rays) {
    rays = document.createElement('div');
    rays.className = 'sunrays';
    rays.setAttribute('aria-hidden', 'true');
    rays.innerHTML = '<i></i><i></i><i></i><i></i>';
    document.body.appendChild(rays);
  }
  rays.style.opacity = Math.max(0, 1 - Math.abs(p - 0.68) / 0.16).toFixed(3);
}

// ---------- 고양이 낮잠: 화면을 5초 동안 건드리지 않으면 하품하고 동그랗게 잠듦 ----------
export function initNap(reduceMotion, idleMs = 5000) {
  if (reduceMotion) return;
  const root = document.documentElement;
  let timer = 0, zz = [];
  const wake = () => {
    if (root.classList.contains('napping') || root.classList.contains('yawning')) {
      root.classList.remove('napping', 'yawning');
      zz.forEach((z) => z.remove());
      zz = [];
    }
    clearTimeout(timer);
    timer = setTimeout(sleep, idleMs);
  };
  const sleep = () => {
    root.classList.add('yawning');
    setTimeout(() => {
      if (!root.classList.contains('yawning')) return;
      root.classList.replace('yawning', 'napping');
      // 화면에 보이는 고양이 머리 위에 Zz
      document.querySelectorAll('.cat').forEach((c) => {
        if (c.closest('.walk')) return;
        const r = c.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight || !r.width) return;
        const z = document.createElement('span');
        z.className = 'zz';
        z.setAttribute('aria-hidden', 'true');
        z.innerHTML = 'z<b>z</b><i>z</i>';
        z.style.left = `${r.right - r.width * 0.25 + window.scrollX}px`;
        z.style.top = `${r.top + window.scrollY}px`;
        document.body.appendChild(z);
        zz.push(z);
      });
    }, 900);
  };
  ['scroll', 'pointerdown', 'pointermove', 'touchstart', 'keydown', 'wheel'].forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
  wake();
}
