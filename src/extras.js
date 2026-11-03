// ============================================================
//  추가 연출 (풍등 · 하트 · 지도 핀 · 리본 · 한 줄 하트 · 종 · 빼꼼 고양이 · 봉투 · 하트 비 · 시간대 인사 · 시계)
// ============================================================

const rand = (a, b) => a + Math.random() * (b - a);
const fly = (el, frames, opts) => {
  document.body.appendChild(el);
  return el.animate(frames, opts).finished.then(() => el.remove(), () => el.remove());
};
const spot = (cls, x, y, html = '') => {
  const el = document.createElement('div');
  el.className = cls;
  el.setAttribute('aria-hidden', 'true');
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.innerHTML = html;
  return el;
};

// ---------- 시간대별 인사 (오프닝 맨 위) ----------
export function timeHello() {
  const h = new Date().getHours();
  return h >= 5 && h < 11 ? '좋은 아침이에요 ☀' : h < 17 && h >= 11 ? '따뜻한 오후 보내세요' : h < 22 && h >= 17 ? '좋은 저녁 되세요 🌙' : '편안한 밤 되세요 ✨';
}

// ---------- 첫 화면 이름 아래 금빛 리본이 묶임 ----------
export const ribbon = () => `<svg class="ribbon" viewBox="0 0 120 40" aria-hidden="true">
  <path pathLength="1" d="M60 18C48 4 30 6 32 16s20 8 28 2C68 12 88 4 88 16S72 26 60 18Z"/>
  <path pathLength="1" d="M58 20C52 26 46 32 38 36M62 20C68 26 74 32 82 36"/>
  <circle cx="60" cy="18" r="3.2"/>
</svg>`;

// ---------- 인사말 끝: 양쪽에서 온 한 줄이 가운데에서 하트가 됨 ----------
export const heartLine = () => `<svg class="heart-line" viewBox="0 0 320 70" aria-hidden="true">
  <path pathLength="1" d="M4 46C40 30 76 60 112 44s30-20 48-4c-8-14-26-22-30-8-4 16 30 30 30 30s34-14 30-30c-4-14-22-6-30 8 18-16 28-12 48 4s72 18 108 2"/>
</svg>`;

// ---------- 지도 위로 금빛 핀이 톡 떨어져 꽂힘 ----------
export const mapPin = () => `<div class="map-pin" aria-hidden="true"><i class="ripple"></i><svg viewBox="0 0 30 40"><path d="M15 39S2 23 2 14a13 13 0 0 1 26 0c0 9-13 25-13 25Z" fill="#C9A25F" stroke="#fff" stroke-width="2"/><circle cx="15" cy="14" r="5" fill="#fff"/></svg></div>`;

// ---------- 마지막 24시간: 금빛 아날로그 시계 ----------
export const clockFace = () => `<div class="clock" id="clock" hidden>
  <svg viewBox="-50 -50 100 100" aria-hidden="true">
    <circle r="46" class="face"/>${Array.from({ length: 12 }, (_, i) => `<path class="tick" d="M0-41V-36" transform="rotate(${i * 30})"/>`).join('')}
    <path class="hh" d="M0 4V-22"/><path class="mh" d="M0 5V-32"/><path class="sh" d="M0 8V-38"/><circle r="2.6" class="pin"/>
  </svg>
  <p id="clockText"></p>
</div>`;
export function setClock(h, m, s) {
  const r = (sel, deg) => document.querySelector(`#clock .${sel}`)?.setAttribute('transform', `rotate(${deg})`);
  r('hh', (h % 12) * 30 + m * 0.5);
  r('mh', m * 6 + s * 0.1);
  r('sh', s * 6);
  const t = document.querySelector('#clockText');
  if (t) t.innerHTML = `예식까지 <b>${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}</b>`;
}

// ---------- 맨 아래에서 누르면 풍등이 하나씩 떠오름 ----------
export function initLanterns(reduceMotion) {
  if (reduceMotion) return;
  document.addEventListener('click', (e) => {
    const foot = e.target.closest('.foot');
    if (!foot || e.target.closest('button, a, .cat, .env')) return;
    const el = spot('lantern', e.clientX, e.clientY, '<i></i>');
    const up = e.clientY + 120, sway = rand(-40, 40);
    fly(el, [
      { transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 },
      { transform: 'translate(-50%,-80%) scale(1)', opacity: 1, offset: 0.12 },
      { transform: `translate(calc(-50% + ${sway}px), calc(-50% - ${up * 0.55}px)) rotate(${sway / 6}deg) scale(.8)`, opacity: 0.95, offset: 0.6 },
      { transform: `translate(calc(-50% + ${-sway / 2}px), calc(-50% - ${up}px)) scale(.45)`, opacity: 0 },
    ], { duration: rand(6200, 8200), easing: 'cubic-bezier(.3,.1,.5,1)' });
  });
}

// ---------- 하트 터짐 (갤러리 두 번 톡톡) ----------
export function heartBurst(x, y) {
  const big = spot('heart-pop', x, y, '♥');
  fly(big, [
    { transform: 'translate(-50%,-50%) scale(0)', opacity: 1 },
    { transform: 'translate(-50%,-50%) scale(1.25)', opacity: 1, offset: 0.25 },
    { transform: 'translate(-50%,-50%) scale(1)', opacity: 1, offset: 0.45 },
    { transform: 'translate(-50%,-90%) scale(.9)', opacity: 0 },
  ], { duration: 1000, easing: 'ease-out' });
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2, d = rand(40, 70);
    fly(spot('heart-mini', x, y, '♥'), [
      { transform: 'translate(-50%,-50%) scale(.5)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d}px)) scale(1)`, opacity: 0 },
    ], { duration: 800, easing: 'cubic-bezier(.2,.7,.3,1)' });
  }
}

// ---------- 하트 비 (공유하기 · 링크 복사) ----------
export function heartRain(btn) {
  const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top;
  const colors = ['#C9A25F', '#E8B4BC', '#D98C99', '#F1D9A6'];
  for (let i = 0; i < 22; i++) {
    const el = spot('confetti-heart', x, y, '♥');
    el.style.color = colors[i % colors.length];
    el.style.fontSize = `${rand(10, 20)}px`;
    const dx = rand(-140, 140), up = rand(90, 200);
    fly(el, [
      { transform: 'translate(-50%,-50%) rotate(0)', opacity: 1 },
      { transform: `translate(calc(-50% + ${dx * 0.6}px), calc(-50% - ${up}px)) rotate(${rand(-90, 90)}deg)`, opacity: 1, offset: 0.45 },
      { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${rand(60, 160)}px)) rotate(${rand(-180, 180)}deg)`, opacity: 0 },
    ], { duration: rand(1300, 1900), easing: 'cubic-bezier(.25,.6,.45,1)' });
  }
}

// ---------- 계좌 복사: 금빛 봉투가 날아가 하트가 됨 ----------
export function flyEnvelope(btn) {
  const r = btn.getBoundingClientRect(), x = r.left + r.width / 2, y = r.top + r.height / 2;
  const env = spot('fly-env', x, y, '<svg viewBox="0 0 28 20"><rect x="1" y="1" width="26" height="18" rx="2" fill="#E9D2A4" stroke="#C9A25F"/><path d="M1.5 2 14 11 26.5 2" fill="none" stroke="#C9A25F" stroke-width="1.4"/></svg>');
  fly(env, [
    { transform: 'translate(-50%,-50%) scale(.6) rotate(0)', opacity: 0 },
    { transform: 'translate(-50%,-50%) scale(1) rotate(-8deg)', opacity: 1, offset: 0.15 },
    { transform: 'translate(calc(-50% - 60px), calc(-50% - 140px)) scale(.9) rotate(12deg)', opacity: 1, offset: 0.7 },
    { transform: 'translate(calc(-50% - 70px), calc(-50% - 170px)) scale(.3) rotate(20deg)', opacity: 0 },
  ], { duration: 1300, easing: 'cubic-bezier(.3,.6,.4,1)' }).then(() => heartBurst(x - 70, y - 170));
}

// ---------- 달력 20일을 누르면 웨딩벨 두 개가 흔들림 ----------
export function bells(cell) {
  const r = cell.getBoundingClientRect();
  const el = spot('bells', r.left + r.width / 2, r.top, `<svg viewBox="0 0 60 40">
    <g class="bell b1"><path d="M22 6c-6 0-9 5-9 11v6l-3 4h24l-3-4v-6c0-6-3-11-9-11Z" fill="#E2C48E" stroke="#B88E4F"/><circle cx="22" cy="29" r="2.4" fill="#B88E4F"/></g>
    <g class="bell b2"><path d="M38 6c-6 0-9 5-9 11v6l-3 4h24l-3-4v-6c0-6-3-11-9-11Z" fill="#E9CF9C" stroke="#B88E4F"/><circle cx="38" cy="29" r="2.4" fill="#B88E4F"/></g>
    <path d="M22 4q8-6 16 0" stroke="#C9A25F" fill="none"/><text x="30" y="3" text-anchor="middle" font-size="7" fill="#D98C99">♥</text>
  </svg>`);
  fly(el, [
    { transform: 'translate(-50%,-100%) scale(.4)', opacity: 0 },
    { transform: 'translate(-50%,-110%) scale(1)', opacity: 1, offset: 0.15 },
    { transform: 'translate(-50%,-110%) scale(1)', opacity: 1, offset: 0.8 },
    { transform: 'translate(-50%,-130%) scale(.9)', opacity: 0 },
  ], { duration: 2200, easing: 'ease-out' });
}

// ---------- 스크롤을 멈추면 가끔 화면 옆에서 고양이가 빼꼼 ----------
export function initPeekCats(cat, reduceMotion) {
  if (reduceMotion) return;
  const KINDS = ['yellowSpot1', 'yellowSpot2', 'calico', 'cow', 'black', 'whiteLong', 'tortie', 'cheeseTabby'];
  let t = 0, last = 0;
  window.addEventListener('scroll', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (Date.now() - last < 9000 || Math.random() > 0.45 || document.querySelector('.lb:not([hidden]), .save-modal:not([hidden])')) return;
      last = Date.now();
      const left = Math.random() < 0.5;
      const el = document.createElement('div');
      el.className = `edge-cat ${left ? 'left' : 'right'}`;
      el.setAttribute('aria-hidden', 'true');
      el.style.top = `${rand(30, 62)}%`;
      el.innerHTML = cat(KINDS[Math.floor(Math.random() * KINDS.length)]);
      const out = left ? 'translateX(-100%) rotate(90deg)' : 'translateX(100%) rotate(-90deg)';
      const peek = left ? 'translateX(-42%) rotate(90deg)' : 'translateX(42%) rotate(-90deg)';
      fly(el, [{ transform: out }, { transform: peek, offset: 0.2 }, { transform: peek, offset: 0.8 }, { transform: out }], { duration: 3400, easing: 'ease-in-out' });
    }, 1200);
  }, { passive: true });
}
