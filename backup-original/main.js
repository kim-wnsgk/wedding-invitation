import './style.css';
import { config as c } from './config.js';

// ---------- 유틸 ----------
const $ = (sel) => document.querySelector(sel);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const lines = (arr) => arr.map(esc).join('<br>');
const pad = (n) => String(n).padStart(2, '0');

const w = c.wedding;
const WED = new Date(w.year, w.month - 1, w.day, w.hour, w.minute);
const DOW_KO = ['일', '월', '화', '수', '목', '금', '토'];
const ampm = w.hour < 12 ? '오전' : '오후';
const hour12 = w.hour % 12 === 0 ? 12 : w.hour % 12;
const timeKo = `${ampm} ${hour12}시${w.minute ? ` ${w.minute}분` : ''}`;
const dateKo = `${w.year}년 ${w.month}월 ${w.day}일 ${DOW_KO[WED.getDay()]}요일 ${timeKo}`;
const couple = `${c.groom.firstName} ♥ ${c.bride.firstName}`;

// ---------- 메타 ----------
document.title = c.meta.title;

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
    <div class="date-en">${w.year} · ${pad(w.month)} · ${pad(w.day)}</div>
    <div class="names">${esc(c.groom.englishName)}<span>&amp;</span>${esc(c.bride.englishName)}</div>
    <div class="ko">${esc(c.groom.name)} · ${esc(c.bride.name)}</div>
    <svg viewBox="0 0 120 24" aria-hidden="true"><path d="M2 12h44M74 12h44" stroke="currentColor" stroke-width="1" fill="none"/><path d="M60 4c-4 0-6 4-6 8s2 8 6 8 6-4 6-8-2-8-6-8z" stroke="currentColor" stroke-width="1" fill="none"/><circle cx="60" cy="12" r="1.6" fill="currentColor"/></svg>
    <div class="when">${dateKo}<br>${esc(c.venue.name)}</div>
  </section>

  <section class="greet">
    <div class="eyebrow">Invitation</div>
    <h2>${esc(c.greeting.title)}</h2>
    ${c.greeting.paragraphs.map((p) => `<p>${lines(p)}</p>`).join('')}
    <div class="parents">
      <div>${esc(c.groom.father)} · ${esc(c.groom.mother)} <span class="rel">의 ${esc(c.groom.relation)}</span> <b>${esc(c.groom.firstName)}</b></div>
      <div>${esc(c.bride.father)} · ${esc(c.bride.mother)} <span class="rel">의 ${esc(c.bride.relation)}</span> <b>${esc(c.bride.firstName)}</b></div>
    </div>
  </section>

  <section>
    <div class="eyebrow">Wedding Day</div>
    <h2>${dateKo}</h2>
    <div class="cal-head">${w.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
  </section>

  <section>
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
      ? `<section>
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${lines(c.accounts.note)}</div>
    ${accountGroup('신랑측 계좌번호', c.accounts.groom)}
    ${accountGroup('신부측 계좌번호', c.accounts.bride)}
  </section>`
      : ''
  }

  <section class="foot">
    ${esc(c.closing)}<br>
    <button class="btn" type="button" id="share">청첩장 링크 복사</button>
  </section>
</main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
`;

// ---------- 달력 ----------
(() => {
  const dows = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const cls = (i) => (i === 0 ? ' sun' : i === 6 ? ' sat' : '');
  let h = dows.map((d, i) => `<div class="dow${cls(i)}">${d}</div>`).join('');
  const first = new Date(w.year, w.month - 1, 1).getDay();
  const days = new Date(w.year, w.month, 0).getDate();
  h += '<div class="d"></div>'.repeat(first);
  for (let d = 1; d <= days; d++) {
    const wd = (first + d - 1) % 7;
    h += `<div class="d${cls(wd)}${d === w.day ? ' on' : ''}">${d}</div>`;
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
  $('#count').innerHTML = [[D, 'DAYS'], [H, 'HOUR'], [M, 'MIN'], [S, 'SEC']]
    .map(([v, l]) => `<div><b>${v}</b><small>${l}</small></div>`)
    .join('');
}
tick();
setInterval(tick, 1000);

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
