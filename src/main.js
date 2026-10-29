import './style.css';
import { config as c } from './config.js';

// ---------- 유틸 ----------
const $ = (sel) => document.querySelector(sel);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const lines = (arr) => arr.map(esc).join('<br>');
const pad = (n) => String(n).padStart(2, '0');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const w = c.wedding;
// 예식 시각은 한국 시간(KST, UTC+9) 기준 — 해외에서 열어도 D-day가 맞도록
const WED = new Date(Date.UTC(w.year, w.month - 1, w.day, w.hour - 9, w.minute));
const dow = new Date(Date.UTC(w.year, w.month - 1, w.day)).getUTCDay();
const DOW_KO = ['일', '월', '화', '수', '목', '금', '토'];
const DOW_EN = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const ampm = w.hour < 12 ? '오전' : '오후';
const hour12 = w.hour % 12 === 0 ? 12 : w.hour % 12;
const timeKo = `${ampm} ${hour12}시${w.minute ? ` ${w.minute}분` : ''}`;
const dateKo = `${w.year}년 ${w.month}월 ${w.day}일 ${DOW_KO[dow]}요일 ${timeKo}`;
const dateEn = `${w.year}. ${pad(w.month)}. ${pad(w.day)} ${DOW_EN[dow]} ${hour12}:${pad(w.minute)} ${w.hour < 12 ? 'AM' : 'PM'}`;
const couple = `${c.groom.firstName} ♥ ${c.bride.firstName}`;
const fx = c.effects || {};

// ---------- 메타 ----------
document.title = c.meta.title;

// ---------- 왁스 실링 ----------
let sealId = 0;
function seal(cls) {
  const id = `seal${++sealId}`;
  // 가장자리가 살짝 울퉁불퉁한 원 (녹은 왁스 느낌)
  const pts = [];
  for (let i = 0; i < 120; i++) {
    const a = (i / 120) * Math.PI * 2;
    const r = 52 + 2.4 * Math.sin(a * 9) + 1.4 * Math.sin(a * 4 + 1.3) + 0.8 * Math.sin(a * 17);
    pts.push(`${(60 + r * Math.cos(a)).toFixed(1)},${(60 + r * Math.sin(a)).toFixed(1)}`);
  }
  return `<svg class="seal ${cls}" viewBox="0 0 120 120" aria-hidden="true">
    <defs>
      <radialGradient id="${id}g" cx="38%" cy="32%" r="75%">
        <stop offset="0" stop-color="#C98B97"/><stop offset=".55" stop-color="#A8616E"/><stop offset="1" stop-color="#7E4250"/>
      </radialGradient>
    </defs>
    <polygon points="${pts.join(' ')}" fill="url(#${id}g)"/>
    <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="2.5"/>
    <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="1"/>
    <text x="60" y="61" text-anchor="middle" dominant-baseline="middle">${esc(fx.monogram || `${c.groom.englishName[0]}&${c.bride.englishName[0]}`)}</text>
  </svg>`;
}

// ---------- 화면 ----------
const accountGroup = (label, list) =>
  list.length
    ? `<details>
        <summary>${esc(label)}</summary>
        ${list
          .map((a) => {
            const full = `${a.bank} ${a.number}`;
            return `<div class="acct">
              <div><div class="who">${esc(a.who)}</div><div class="num">${esc(full)}</div></div>
              <button class="btn" type="button" data-copy="${esc(full)}">복사</button>
            </div>`;
          })
          .join('')}
      </details>`
    : '';

$('#app').innerHTML = `
<main class="wrap">
  <section class="hero">
    ${fx.snow ? '<canvas id="snow" aria-hidden="true"></canvas>' : ''}
    <div class="hero-in">
      <div class="save">Save the Date</div>
      ${seal('seal-hero')}
      <div class="names">${esc(c.groom.englishName)}<span>&amp;</span>${esc(c.bride.englishName)}</div>
      <div class="ko">${esc(c.groom.name)} <i>·</i> ${esc(c.bride.name)}</div>
      <div class="date-en">${dateEn}</div>
      <div class="when">${dateKo}<br>${esc(c.venue.name)}</div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>

  <section class="greet rv">
    <div class="eyebrow">Invitation</div>
    <h2>${esc(c.greeting.title)}</h2>
    ${c.greeting.paragraphs.map((p) => `<p>${lines(p)}</p>`).join('')}
    <div class="parents">
      <div>${esc(c.groom.father)} · ${esc(c.groom.mother)} <span class="rel">의 ${esc(c.groom.relation)}</span> <b>${esc(c.groom.firstName)}</b></div>
      <div>${esc(c.bride.father)} · ${esc(c.bride.mother)} <span class="rel">의 ${esc(c.bride.relation)}</span> <b>${esc(c.bride.firstName)}</b></div>
    </div>
  </section>

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${dateKo}</h2>
    <div class="cal-head"><span>${w.year}</span>${w.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
    <button class="btn ics" type="button" id="ics">내 캘린더에 저장</button>
  </section>

  <section class="rv">
    <div class="eyebrow">Location</div>
    <h2>오시는 길</h2>
    <div class="venue">${esc(c.venue.name)}</div>
    <div class="addr">${esc(c.venue.address)}</div>
    <div class="addr">${esc(c.venue.detail)}${c.venue.tel ? ` · Tel. ${esc(c.venue.tel)}` : ''}</div>
    <button class="btn copy-addr" type="button" id="copyAddr">주소 복사</button>
    <div class="btn-row">
      <a class="btn" target="_blank" rel="noopener" href="https://map.naver.com/p/search/${encodeURIComponent(c.venue.mapQuery)}">네이버 지도</a>
      <a class="btn" target="_blank" rel="noopener" href="https://map.kakao.com/?q=${encodeURIComponent(c.venue.mapQuery)}">카카오맵</a>
      <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.venue.address)}">구글 지도</a>
    </div>
    <div class="ways">
      ${c.directions.map((d) => `<div><h3>${esc(d.title)}</h3><p>${esc(d.text)}</p></div>`).join('')}
    </div>
  </section>

  ${
    c.accounts.show
      ? `<section class="rv">
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${lines(c.accounts.note)}</div>
    ${accountGroup('신랑측 계좌번호', c.accounts.groom)}
    ${accountGroup('신부측 계좌번호', c.accounts.bride)}
  </section>`
      : ''
  }

  <section class="foot rv">
    ${seal('seal-foot')}
    <div class="sign">${esc(c.groom.englishName)} &amp; ${esc(c.bride.englishName)}</div>
    ${esc(c.closing)}<br>
    <button class="btn" type="button" id="share">청첩장 링크 복사</button>
  </section>
</main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
`;

// ---------- 달력 ----------
(() => {
  const cls = (i) => (i === 0 ? ' sun' : i === 6 ? ' sat' : '');
  let h = DOW_EN.map((d, i) => `<div class="dow${cls(i)}">${d}</div>`).join('');
  const first = new Date(w.year, w.month - 1, 1).getDay();
  const days = new Date(w.year, w.month, 0).getDate();
  h += '<div class="d"></div>'.repeat(first);
  // 예식일은 손으로 그린 듯한 동그라미로 표시
  const ring = `<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>`;
  for (let d = 1; d <= days; d++) {
    const wd = (first + d - 1) % 7;
    h += d === w.day ? `<div class="d${cls(wd)} on">${ring}<span>${d}</span></div>` : `<div class="d${cls(wd)}">${d}</div>`;
  }
  $('#cal').innerHTML = h;
})();

// ---------- D-day ----------
function tick() {
  const diff = WED - new Date();
  if (diff <= 0) {
    $('#dday').innerHTML = `${esc(couple)}의 결혼식이 <strong>진행되었습니다</strong>`;
    $('#count').innerHTML = '';
    return;
  }
  const s = Math.floor(diff / 1000);
  const D = Math.floor(s / 86400), H = Math.floor((s % 86400) / 3600), M = Math.floor((s % 3600) / 60), S = s % 60;
  $('#dday').innerHTML = `${esc(couple)}의 결혼식이 <strong>${D + 1}일</strong> 남았습니다`;
  $('#count').innerHTML = [[D, 'Days'], [pad(H), 'Hours'], [pad(M), 'Mins'], [pad(S), 'Secs']]
    .map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`)
    .join('');
}
tick();
setInterval(tick, 1000);

// ---------- 스크롤 등장 효과 ----------
(() => {
  const els = document.querySelectorAll('.rv');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.15 }
  );
  els.forEach((el) => io.observe(el));
})();

// ---------- 눈 내리는 효과 ----------
(() => {
  const cv = $('#snow');
  if (!cv || reduceMotion) return;
  const ctx = cv.getContext('2d');
  const hero = cv.parentElement;
  let W = 0, H = 0, flakes = [], visible = true, last = 0;
  const make = (y) => ({
    x: Math.random() * W,
    y: y ?? Math.random() * H,
    r: 0.8 + Math.random() * 2,
    v: 12 + Math.random() * 22,          // px/s
    sway: 6 + Math.random() * 14,
    ph: Math.random() * Math.PI * 2,
  });
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = hero.clientWidth;
    H = hero.clientHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    flakes = Array.from({ length: Math.round(W / 9) }, () => make());
  }
  function frame(t) {
    const dt = Math.min((t - last) / 1000 || 0, 0.05);
    last = t;
    ctx.clearRect(0, 0, W, H);
    for (const f of flakes) {
      f.y += f.v * dt;
      f.ph += dt * 0.8;
      if (f.y > H + 4) Object.assign(f, make(-4));
      const x = f.x + Math.sin(f.ph) * f.sway;
      // 아래로 갈수록 옅어져 흰 배경에 자연스럽게 녹아듦
      const a = Math.max(0, 1 - f.y / H) * 0.9;
      ctx.beginPath();
      ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${a})`;
      ctx.fill();
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(168,97,110,${a * 0.22})`;
      ctx.stroke();
    }
    if (visible) requestAnimationFrame(frame);
  }
  resize();
  window.addEventListener('resize', resize);
  new IntersectionObserver(([e]) => {
    const was = visible;
    visible = e.isIntersecting;
    if (visible && !was) requestAnimationFrame((t) => { last = t; frame(t); });
  }).observe(hero);
  requestAnimationFrame((t) => { last = t; frame(t); });
})();

// ---------- 복사 ----------
let timer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => t.classList.remove('show'), 1800);
}
function copy(text, msg) {
  const fallback = () => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) { /* ignore */ }
    ta.remove();
    toast(ok ? msg : '복사하지 못했어요. 길게 눌러 직접 복사해 주세요');
  };
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => toast(msg), fallback);
  else fallback();
}

$('#copyAddr').addEventListener('click', () => copy(c.venue.address, '주소를 복사했어요'));
document.querySelectorAll('[data-copy]').forEach((b) =>
  b.addEventListener('click', () => copy(b.dataset.copy, '계좌번호를 복사했어요'))
);
$('#share').addEventListener('click', () => copy(location.href, '청첩장 링크를 복사했어요'));

// ---------- 캘린더 저장 (.ics) ----------
$('#ics').addEventListener('click', () => {
  const stamp = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const icsText = (s) => String(s).replace(/[\\,;]/g, (m) => `\\${m}`);
  const end = new Date(WED.getTime() + 2 * 3600 * 1000);
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//wedding-invitation//KO', 'BEGIN:VEVENT',
    `UID:${stamp(WED)}-wedding@invitation`, `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(WED)}`, `DTEND:${stamp(end)}`,
    `SUMMARY:${icsText(`${couple} 결혼식`)}`,
    `LOCATION:${icsText(`${c.venue.name}, ${c.venue.address}`)}`,
    'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
  a.download = 'wedding.ics';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});
