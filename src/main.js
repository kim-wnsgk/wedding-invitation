import './style.css';
import { config as c } from './config.js';

// ---------- 유틸 ----------
const $ = (sel) => document.querySelector(sel);
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
const lines = (arr) => arr.map(esc).join('<br>');
const pad = (n) => String(n).padStart(2, '0');
// 한 글자씩 등장시키기 위해 글자마다 감싸기 (--i: 등장 순번)
const letters = (s, start) => [...s].map((ch, i) => `<i style="--i:${start + i}">${esc(ch)}</i>`).join('');
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

// ---------- 사진 (photos/main, photos/gallery 폴더에 넣은 파일을 자동으로 불러옴) ----------
// 빌드할 때 휴대폰에 맞는 크기로 줄이고 webp로 변환합니다.
const byName = (mods) =>
  Object.keys(mods)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
    .map((k) => mods[k]);
const mainPhoto = byName(
  import.meta.glob('/photos/main/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, import: 'default', query: '?w=1080&format=webp&quality=82',
  })
)[0];
const galleryFull = byName(
  import.meta.glob('/photos/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, import: 'default', query: '?w=1600&format=webp&quality=80',
  })
);
const galleryThumb = byName(
  import.meta.glob('/photos/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, import: 'default', query: '?w=400&h=400&fit=cover&format=webp&quality=72',
  })
);
const GALLERY_PREVIEW = 9; // 처음에 보여줄 사진 수 (나머지는 '더보기')

// ---------- 메타 ----------
document.title = c.meta.title;

// ---------- 모노그램 (가는 선 원 + 이니셜) ----------
function seal(cls) {
  return `<svg class="seal ${cls}" viewBox="0 0 120 120" aria-hidden="true">
    <circle class="ring-dot" cx="60" cy="60" r="54" stroke-dasharray="1 5" stroke-linecap="round"/>
    <circle class="ring" cx="60" cy="60" r="46" pathLength="1" transform="rotate(-90 60 60)"/>
    <text x="60" y="62" text-anchor="middle" dominant-baseline="middle">${esc(fx.monogram || `${c.groom.englishName[0]}&${c.bride.englishName[0]}`)}</text>
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
      <div class="save">${esc(fx.eyebrow || 'The Wedding of')}</div>
      ${mainPhoto ? `<div class="hero-photo"><img src="${mainPhoto}" alt="${esc(couple)}" fetchpriority="high"></div>` : seal('seal-hero')}
      <div class="names">
        <span class="sr">${esc(c.groom.englishName)} &amp; ${esc(c.bride.englishName)}</span>
        <span class="nm" aria-hidden="true">${letters(c.groom.englishName, 0)}</span>
        <span class="amp" aria-hidden="true">&amp;</span>
        <span class="nm" aria-hidden="true">${letters(c.bride.englishName, c.groom.englishName.length + 2)}</span>
      </div>
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
      <div>${esc(c.groom.father)} · ${esc(c.groom.mother)} <span class="rel">의 ${esc(c.groom.relation)}</span> <b>${esc(c.groom.name)}</b></div>
      <div>${esc(c.bride.father)} · ${esc(c.bride.mother)} <span class="rel">의 ${esc(c.bride.relation)}</span> <b>${esc(c.bride.name)}</b></div>
    </div>
  </section>

  ${
    galleryThumb.length
      ? `<section class="rv">
    <div class="eyebrow">Gallery</div>
    <h2>우리의 사진</h2>
    <div class="gallery" id="gallery">
      ${galleryThumb
        .map((src, i) => `<button type="button" class="g-item${i >= GALLERY_PREVIEW ? ' g-hidden' : ''}" data-i="${i}" aria-label="사진 ${i + 1} 크게 보기"><img src="${src}" alt="" loading="lazy"></button>`)
        .join('')}
    </div>
    ${galleryThumb.length > GALLERY_PREVIEW ? `<button class="btn g-more" type="button" id="gMore">사진 더보기</button>` : ''}
  </section>`
      : ''
  }

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${dateKo}</h2>
    <div class="cal-head"><span>${w.year}</span>${w.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
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
    ${esc(c.closing)}
    <div class="share-row">
      <button class="link-btn" type="button" id="share">공유하기</button>
      <button class="link-btn" type="button" id="copyLink">링크 복사</button>
    </div>
  </section>
</main>
<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="사진 크게 보기">
  <img id="lbImg" alt="">
  <button class="lb-btn lb-close" type="button" id="lbClose" aria-label="닫기">&times;</button>
  <button class="lb-btn lb-prev" type="button" id="lbPrev" aria-label="이전 사진">&#8249;</button>
  <button class="lb-btn lb-next" type="button" id="lbNext" aria-label="다음 사진">&#8250;</button>
  <div class="lb-count" id="lbCount"></div>
</div>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
`;

// ---------- 달력 ----------
(() => {
  const cls = (i) => (i === 0 ? ' sun' : i === 6 ? ' sat' : '');
  // --i: 차례로 등장할 때의 순번
  let h = DOW_EN.map((d, i) => `<div class="dow${cls(i)}" style="--i:${i}">${d}</div>`).join('');
  const first = new Date(w.year, w.month - 1, 1).getDay();
  const days = new Date(w.year, w.month, 0).getDate();
  h += '<div class="d"></div>'.repeat(first);
  // 예식일은 손으로 그린 듯한 동그라미로 표시
  const ring = `<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>`;
  for (let d = 1; d <= days; d++) {
    const wd = (first + d - 1) % 7;
    const st = `style="--i:${7 + first + d}"`;
    h += d === w.day ? `<div class="d${cls(wd)} on" ${st}>${ring}<span>${d}</span></div>` : `<div class="d${cls(wd)}" ${st}>${d}</div>`;
  }
  $('#cal').innerHTML = h;
})();

// ---------- D-day ----------
$('#dday').innerHTML = `${esc(couple)}의 결혼식이 <strong id="ddayNum"></strong> 남았습니다`;
$('#count').innerHTML = ['Days', 'Hours', 'Mins', 'Secs'].map((l) => `<div><b></b><small>${l}</small></div>`).join('');
const countCells = [...document.querySelectorAll('#count b')];
let daysLeft = 0, ddayCounting = false, ticked = false;
function tick() {
  const diff = WED - new Date();
  if (diff <= 0) {
    $('#dday').innerHTML = `${esc(couple)}의 결혼식이 <strong>진행되었습니다</strong>`;
    $('#count').innerHTML = '';
    return;
  }
  const s = Math.floor(diff / 1000);
  const D = Math.floor(s / 86400), H = Math.floor((s % 86400) / 3600), M = Math.floor((s % 3600) / 60), S = s % 60;
  daysLeft = D + 1;
  if (!ddayCounting) $('#ddayNum').textContent = `${daysLeft}일`;
  // 바뀐 숫자만 위에서 굴러 내려오듯 교체
  [D, pad(H), pad(M), pad(S)].forEach((v, i) => {
    const b = countCells[i];
    if (b.textContent === String(v)) return;
    b.textContent = v;
    if (ticked && !reduceMotion) {
      b.classList.remove('roll');
      void b.offsetWidth;
      b.classList.add('roll');
    }
  });
  ticked = true;
}
tick();
setInterval(tick, 1000);

// ---------- 스크롤 등장 효과 ----------
// [선택자, 등장 방식, 순서별 지연(ms)] — 방식: up 아래에서 / left·right 옆에서 / zoom 커지며 / blur 흐림→선명 / track 자간이 좁혀지며
const REVEAL = [
  ['section:not(.hero) > .eyebrow', 'track'],
  ['section:not(.hero) > h2', 'blur', () => 120],
  ['.greet > p', 'up', (i) => 200 + i * 140],
  ['.parents > div:first-child', 'left'],
  ['.parents > div:last-child', 'right', () => 150],
  ['.g-item', 'zoom', (i) => (i % 3) * 90],
  ['.g-more, .cal-head, .dday, .count, .venue, .addr, .copy-addr, .note, .foot .sign, .share-row', 'up'],
  ['.btn-row .btn', 'up', (i) => i * 90],
  ['.ways > div', 'left', (i) => i * 110],
  ['details', 'up', (i) => i * 120],
];
(() => {
  REVEAL.forEach(([sel, type, delay]) =>
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('a', `a-${type}`);
      if (delay) el.style.setProperty('--d', `${delay(i)}ms`);
    })
  );
  const els = document.querySelectorAll('.a, .cal, .seal-foot, section:not(.hero)');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const show = (el) => {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    if (el.id === 'dday') countUpDday();
  };
  // 화면 아래쪽 12% 위로 올라오면 등장
  const showIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
    { rootMargin: '0px 0px -12% 0px' }
  );
  // 화면 밖으로 완전히 나가면 원래 상태로 되돌려서, 다시 스크롤할 때 또 재생
  const hideIO = new IntersectionObserver((entries) =>
    entries.forEach((e) => !e.isIntersecting && e.target.classList.remove('in'))
  );
  els.forEach((el) => { showIO.observe(el); hideIO.observe(el); });
  // 맨 아래 요소는 화면 안쪽 기준선까지 올라오지 못하므로, 끝까지 내리면 보이는 것을 모두 등장시킴
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 4) return;
    els.forEach((el) => el.getBoundingClientRect().top < window.innerHeight && show(el));
  }, { passive: true });

  // 첫 화면 애니메이션도 화면 밖으로 나갔다 돌아오면 다시 재생
  const hero = $('.hero');
  hero.classList.add('play');
  new IntersectionObserver(([e]) => hero.classList.toggle('play', e.isIntersecting)).observe(hero);
})();

// D-day 숫자가 0부터 빠르게 올라감
function countUpDday() {
  const el = $('#ddayNum');
  if (!el || !daysLeft || ddayCounting) return;
  ddayCounting = true;
  const t0 = performance.now(), dur = 1400;
  const step = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = `${Math.round(daysLeft * (1 - Math.pow(1 - p, 3)))}일`;
    if (p < 1) requestAnimationFrame(step);
    else ddayCounting = false;
  };
  requestAnimationFrame(step);
}

// ---------- 스크롤 진행 막대 · 대표 사진 패럴랙스 ----------
(() => {
  if (reduceMotion) return;
  const bar = document.createElement('div');
  bar.className = 'progress';
  document.body.appendChild(bar);
  const photo = $('.hero-photo img');
  let queued = false;
  const update = () => {
    queued = false;
    const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
    // 사진이 액자 안에서 스크롤보다 천천히 움직임
    if (photo && y < window.innerHeight * 1.5) photo.style.translate = `0 ${-Math.min(y * 0.12, 52)}px`;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
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
      ctx.strokeStyle = `rgba(92,116,140,${a * 0.2})`;
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

// ---------- 갤러리 / 크게 보기 ----------
(() => {
  if (!galleryFull.length) return;
  const lb = $('#lb'), img = $('#lbImg'), n = galleryFull.length;
  let cur = 0, lastFocus = null;
  const show = (i) => {
    cur = (i + n) % n;
    img.src = galleryFull[cur];
    $('#lbCount').textContent = `${cur + 1} / ${n}`;
    // 앞뒤 사진 미리 불러오기
    [cur + 1, cur - 1].forEach((j) => { new Image().src = galleryFull[(j + n) % n]; });
  };
  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    $('#lbClose').focus();
  };
  const close = () => {
    lb.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus();
  };
  $('#gallery').addEventListener('click', (e) => {
    const b = e.target.closest('.g-item');
    if (b) open(Number(b.dataset.i));
  });
  $('#gMore')?.addEventListener('click', (e) => {
    document.querySelectorAll('.g-hidden').forEach((el) => el.classList.remove('g-hidden'));
    e.currentTarget.remove();
  });
  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', () => show(cur - 1));
  $('#lbNext').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(cur - 1);
    else if (e.key === 'ArrowRight') show(cur + 1);
  });
  // 좌우로 밀어서 넘기기
  let sx = null;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    sx = null;
    if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
  });
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
$('#copyLink').addEventListener('click', () => copy(location.href, '청첩장 링크를 복사했어요'));
// 공유하기: ① 카카오톡 공유(앱 키가 있을 때) → ② 휴대폰 공유창 → ③ 링크 복사
// 카카오톡 안에서 열린 청첩장은 휴대폰 공유창을 지원하지 않아서 ①이 필요합니다.
const kakaoKey = c.kakao?.jsKey;
if (kakaoKey) {
  const s = document.createElement('script');
  s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
  s.integrity = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
  s.crossOrigin = 'anonymous';
  s.onload = () => { if (!window.Kakao.isInitialized()) window.Kakao.init(kakaoKey); };
  document.head.appendChild(s);
}
function kakaoShare(url) {
  const K = window.Kakao;
  if (!K?.isInitialized()) return false;
  const link = { mobileWebUrl: url, webUrl: url };
  const buttons = [{ title: '청첩장 보기', link }];
  if (mainPhoto) {
    K.Share.sendDefault({
      objectType: 'feed',
      content: { title: c.meta.title, description: c.meta.description, imageUrl: new URL(mainPhoto, location.href).href, link },
      buttons,
    });
  } else {
    K.Share.sendDefault({ objectType: 'text', text: `${c.meta.title}\n${c.meta.description}`, link, buttons });
  }
  return true;
}
$('#share').addEventListener('click', async () => {
  const url = location.origin + location.pathname;
  if (kakaoShare(url)) return;
  const data = { title: c.meta.title, text: c.meta.description, url };
  if (navigator.share) {
    try {
      await navigator.share(data);
    } catch (e) {
      if (e.name !== 'AbortError') copy(location.href, '청첩장 링크를 복사했어요');
    }
  } else {
    copy(location.href, '청첩장 링크를 복사했어요');
  }
});
