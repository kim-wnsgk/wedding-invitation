import './style.css';
import { config as c } from './config.js';
import { groom, bride, cat } from './characters.js';

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
    eager: true, import: 'default', query: '?w=640&h=800&fit=cover&format=webp&quality=76',
  })
);

// ---------- 메타 ----------
document.title = c.meta.title;

// ---------- 첫 화면 사진 아래 쌓인 눈 (뒤·앞 두 겹의 눈 언덕 + 반짝임) ----------
function drift(cls) {
  const sparkles = [[12, 62], [27, 48], [44, 70], [58, 52], [73, 66], [88, 50]]
    .map(([x, y], i) => `<i style="left:${x}%;top:${y}%;--i:${i}"></i>`).join('');
  return `<div class="drift ${cls}" aria-hidden="true">
    <svg viewBox="0 0 400 90" preserveAspectRatio="none">
      <path class="d-back" d="M0 52C40 30 80 40 120 34s70-22 110-12 60 26 100 16 50-24 70-20V90H0Z"/>
      <path class="d-front" d="M0 66c30-14 60-12 90-4s52 6 82-6 58-16 92-4 40 18 70 10 44-16 66-14V90H0Z"/>
    </svg>${sparkles}
  </div>`;
}

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
  ${
    mainPhoto
      ? // 대표 사진이 있으면: 화면 가득 사진 → 아래쪽이 눈 쌓인 듯 흰색으로 녹아듦 → 이름·날짜
        `<section class="hero hero-full">
    <div class="cover"><img src="${mainPhoto}" alt="${esc(couple)}" fetchpriority="high">${drift('drift-cover')}</div>
    <div class="hero-in">
      <div class="save">${esc(fx.eyebrow || 'The Wedding of')}</div>
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
  </section>`
      : // 사진이 없으면: 모노그램 + 영문 이름
        `<section class="hero">
    <div class="hero-in">
      <div class="save">${esc(fx.eyebrow || 'The Wedding of')}</div>
      ${seal('seal-hero')}
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
  </section>`
  }

  <section class="greet rv">
    <div class="eyebrow">Invitation</div>
    <h2>${esc(c.greeting.title)}</h2>
    ${c.greeting.paragraphs.map((p) => `<p>${p.map((l, k) => `<span class="ln" style="--k:${k}">${esc(l)}</span>`).join('<br>')}</p>`).join('')}
    ${
      c.greeting.since
        ? `<figure class="since" aria-label="${c.greeting.since}년부터 ${w.year}년까지">
      <svg viewBox="0 0 320 112" aria-hidden="true">
        <path class="since-path" d="M22 74C64 26 104 102 158 68S250 26 296 56"/>
        <g class="since-nodes"></g>
      </svg>
      <figcaption>처음 만난 해부터 열 번째 겨울까지</figcaption>
    </figure>`
        : ''
    }
    <div class="parents">
      <div><span class="pa">${esc(c.groom.father)} · ${esc(c.groom.mother)}</span><span class="rel">의 ${esc(c.groom.relation.trim())}</span><b>${esc(c.groom.name)}</b></div>
      <div><span class="pa">${esc(c.bride.father)} · ${esc(c.bride.mother)}</span><span class="rel">의 ${esc(c.bride.relation.trim())}</span><b>${esc(c.bride.name)}</b></div>
    </div>
  </section>

  ${
    galleryThumb.length
      ? `<section class="rv">
    <div class="eyebrow">Gallery</div>
    <h2>우리의 사진</h2>
    <div class="carousel" id="gallery">
      ${galleryThumb
        .map((src, i) => `<button type="button" class="slide" data-i="${i}" aria-label="사진 ${i + 1} 크게 보기">
          <span class="polaroid"><img src="${src}" alt="" loading="lazy" draggable="false"><small>${pad(i + 1)}</small></span>
        </button>`)
        .join('')}
    </div>
    <div class="g-nav">
      ${cat('yellowSpot1', 'cat-gal')}
      <button type="button" id="gPrev" aria-label="이전 사진">&#8249;</button>
      <span id="gCount">1 / ${galleryThumb.length}</span>
      <button type="button" id="gNext" aria-label="다음 사진">&#8250;</button>
    </div>
  </section>`
      : ''
  }

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${dateKo}</h2>
    <div class="cal-head"><span>${w.year}</span>${w.month}월${cat('black', 'cat-cal')}</div>
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
    <div class="map-wrap">
    ${cat('cheeseTabby', 'cat-peek')}
    <div class="map">
      <iframe src="https://maps.google.com/maps?q=${encodeURIComponent(c.venue.address)}&z=16&output=embed" title="${esc(c.venue.name)} 지도" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    </div>
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
    ${cat('cow', 'cat-acct')}
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${lines(c.accounts.note)}</div>
    ${accountGroup('신랑측 계좌번호', c.accounts.groom)}
    ${accountGroup('신부측 계좌번호', c.accounts.bride)}
  </section>`
      : ''
  }

  <section class="foot rv">
    <div class="family" aria-label="${esc(c.groom.firstName)}, ${esc(c.bride.firstName)} 그리고 고양이 여덟 마리">
      <div class="couple">${groom()}<span class="fam-heart" aria-hidden="true">♥</span>${bride()}</div>
      <div class="cats-row">
        ${['whiteLong', 'tortie', 'cheeseTabby'].map((k) => cat(k)).join('')}<i class="gap"></i>${['yellowSpot1', 'yellowSpot2', 'calico', 'cow', 'black'].map((k) => cat(k)).join('')}
      </div>
      <div class="fam-cap">${esc(c.groom.firstName)} · ${esc(c.bride.firstName)} 그리고 고양이 여덟</div>
    </div>
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
  // 동그라미가 그려진 뒤 작은 눈송이가 내려앉음
  const ring = `<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>
    <svg class="cal-flake" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M0-9V9M-7.8-4.5 7.8 4.5M-7.8 4.5 7.8-4.5M0-5.5l2.4-2M0-5.5l-2.4-2M0 5.5l2.4 2M0 5.5l-2.4 2"/></svg>`;
  for (let d = 1; d <= days; d++) {
    const wd = (first + d - 1) % 7;
    const st = `style="--i:${7 + first + d}"`;
    h += d === w.day ? `<div class="d${cls(wd)} on" ${st}>${ring}<span>${d}</span></div>` : `<div class="d${cls(wd)}" ${st}>${d}</div>`;
  }
  $('#cal').innerHTML = h;
})();

// ---------- 2017 → 2027 그림: 함께 걸어온 길 위에 해마다 눈송이, 끝에는 반지 두 개 ----------
(() => {
  const path = $('.since-path');
  if (!path) return;
  const from = c.greeting.since, n = w.year - from, L = path.getTotalLength();
  path.style.setProperty('--len', L);
  const flake = 'M0-4.2V4.2M-3.6-2.1 3.6 2.1M-3.6 2.1 3.6-2.1';
  let h = '';
  for (let i = 0; i <= n; i++) {
    const p = path.getPointAtLength((L * i) / n);
    const x = p.x.toFixed(1), y = p.y.toFixed(1);
    // 선이 그어지는 속도에 맞춰 차례로 등장
    const st = `style="--t:${(0.1 + (1.15 * i) / n).toFixed(2)}s"`;
    if (i === 0) {
      h += `<g transform="translate(${x} ${y})"><g class="node" ${st}><circle r="4.2" class="dot"/>
        <text y="22" text-anchor="middle">${from}</text></g></g>`;
    } else if (i === n) {
      h += `<g transform="translate(${x} ${y})"><g class="node rings" ${st}>
        <circle cx="-3.6" r="6.2"/><circle cx="3.6" r="6.2"/>
        <text y="-14" text-anchor="middle">${w.year}</text></g></g>`;
    } else {
      h += `<g transform="translate(${x} ${y})"><g class="node" ${st}><circle r="5" class="bg"/><path d="${flake}" class="fl"/></g></g>`;
    }
  }
  $('.since-nodes').innerHTML = h;
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
// [선택자, 등장 방식, 순서별 지연(ms)] — 방식: up 아래에서 / left·right 옆에서 / zoom 커지며 / blur 흐림→선명
//   / track 자간이 좁혀지며 / frost 성에 낀 듯 뿌옇다가 녹으며 선명 / lines 한 줄씩 차례로
const REVEAL = [
  ['section:not(.hero) > .eyebrow', 'track'],
  ['section:not(.hero) > h2', 'blur', () => 60],
  ['.greet > p', 'lines', (i) => 60 + i * 70],
  ['.parents > div:first-child', 'left'],
  ['.parents > div:last-child', 'right', () => 80],
  ['.carousel', 'frost', () => 60],
  ['.family, .g-nav, .since, .cal-head, .dday, .count, .venue, .addr, .copy-addr, .note, .foot .sign, .share-row', 'up'],
  ['.btn-row .btn', 'up', (i) => i * 50],
  ['.map', 'zoom'],
  ['.ways > div', 'left', (i) => i * 60],
  ['details', 'up', (i) => i * 60],
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
    if (el.classList.contains('foot')) window.dispatchEvent(new Event('flurry'));
  };
  // 화면 아래쪽 5% 위로 올라오면 바로 등장
  const showIO = new IntersectionObserver(
    (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
    { rootMargin: '0px 0px -5% 0px' }
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
  const t0 = performance.now(), dur = 900;
  const step = (t) => {
    const p = Math.min((t - t0) / dur, 1);
    el.textContent = `${Math.round(daysLeft * (1 - Math.pow(1 - p, 3)))}일`;
    if (p < 1) requestAnimationFrame(step);
    else ddayCounting = false;
  };
  requestAnimationFrame(step);
}

// ---------- 맨 위 스크롤 막대: 신랑(왼쪽)과 신부(오른쪽)가 고양이와 함께 걸어와 맨 끝에서 만남 · 대표 사진 패럴랙스 ----------
(() => {
  const bar = document.createElement('div');
  bar.className = 'walk';
  bar.setAttribute('aria-hidden', 'true');
  bar.innerHTML = `<i class="walk-fill walk-fill-l"></i><i class="walk-fill walk-fill-r"></i>
    <div class="walker w-g">${cat('cheeseTabby', 'w-cat')}${groom()}</div>
    <div class="walker w-b">${bride()}${cat('calico', 'w-cat')}</div>
    <span class="walk-heart">♥</span>`;
  document.body.appendChild(bar);
  const wg = bar.querySelector('.w-g'), wb = bar.querySelector('.w-b');
  const fl = bar.querySelector('.walk-fill-l'), fr = bar.querySelector('.walk-fill-r');
  const photo = reduceMotion ? null : $('.cover img');
  let queued = false, stop;
  const update = () => {
    queued = false;
    const y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(y / max, 1) : 0;
    // 각자 출발점에서 화면 가운데까지 걸어감
    const reach = bar.clientWidth / 2 - wg.offsetWidth - 12;
    wg.style.transform = `translateX(${(p * reach).toFixed(1)}px)`;
    wb.style.transform = `translateX(${(-p * reach).toFixed(1)}px)`;
    fl.style.transform = fr.style.transform = `scaleX(${p.toFixed(3)})`;
    bar.classList.toggle('met', p > 0.985);
    // 사진이 액자 안에서 스크롤보다 천천히 움직임
    if (photo && y < window.innerHeight * 1.5) photo.style.translate = `0 ${-Math.min(y * 0.12, 52)}px`;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
    // 스크롤하는 동안만 다리를 움직여 걷기
    if (!reduceMotion) {
      bar.classList.add('walking');
      clearTimeout(stop);
      stop = setTimeout(() => bar.classList.remove('walking'), 160);
    }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// ---------- 눈 내리는 효과 (화면 전체) ----------
// 바람에 흩날리는 눈송이 + 천천히 도는 결정 모양 눈 + 화면을 누르면 눈이 퍼지는 효과
// + 화면 맨 아래에 눈이 쌓임 (스크롤해도 그 자리, 눈송이가 내려앉을수록 조금씩 높아짐)
(() => {
  if (!fx.snow || reduceMotion) return;
  const cv = document.createElement('canvas');
  cv.className = 'snow';
  cv.setAttribute('aria-hidden', 'true');
  document.body.appendChild(cv);
  // 쌓인 눈 위를 누르면 아래 버튼·사진이 아니라 눈이 반응하도록 받아 주는 투명한 띠 (스크롤은 그대로 됨)
  const hit = document.createElement('div');
  hit.className = 'snow-hit';
  hit.setAttribute('aria-hidden', 'true');
  document.body.appendChild(hit);
  let hitH = 0;
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, flakes = [], bursts = [], last = 0, time = 0;

  // 쌓인 눈: 아래는 STEP px 간격마다 높이, 양옆은 SSTEP px 간격마다 두께(화면 아래에서부터 잰 위치 기준)
  const STEP = 3, BASE = 15, MAX = 42;
  const SSTEP = 4, SMAX = 28;
  let pile = [], sideL = [], sideR = [], sparkles = [], pileFill = null, fillL = null, fillR = null;
  // 눈 결: 흰 알갱이와 옅은 하늘색 알갱이를 뿌린 작은 무늬를 반복해서 덮음
  const GRAIN = (() => {
    const c = document.createElement('canvas');
    c.width = c.height = 96;
    const g = c.getContext('2d');
    for (let i = 0; i < 420; i++) {
      const white = Math.random() < 0.6;
      g.fillStyle = white ? `rgba(255,255,255,${0.6 + Math.random() * 0.4})` : `rgba(140,170,200,${0.12 + Math.random() * 0.2})`;
      g.beginPath();
      g.arc(Math.random() * 96, Math.random() * 96, 0.4 + Math.random() * (white ? 1.1 : 0.7), 0, Math.PI * 2);
      g.fill();
    }
    return ctx.createPattern(c, 'repeat');
  })();
  // 양옆: 아래 모서리는 두껍고 위로 갈수록 얇아지는 모양 (창틀 구석에 쌓인 눈처럼)
  const sideCap = (i) => 4 + (SMAX - 4) * Math.exp((-i * SSTEP) / 150);
  function initPile() {
    const n = Math.ceil(W / STEP) + 2, seed = Math.random() * 10;
    pile = Array.from({ length: n }, (_, i) => {
      const x = i * STEP;
      // 완만한 큰 언덕 + 잔잔한 굴곡
      return BASE + Math.sin(x * 0.011 + seed) * 5 + Math.sin(x * 0.037 + seed * 2) * 2;
    });
    const m = Math.ceil((Math.max(window.screen.height || 0, H) * 1.3) / SSTEP);
    const side = (s) => Array.from({ length: m }, (_, i) => (2 + 13 * Math.exp((-i * SSTEP) / 110)) * (0.85 + 0.15 * Math.sin(i * 0.21 + s)));
    sideL = side(seed);
    sideR = side(seed + 3);
    sparkles = Array.from({ length: Math.round(W / 30) }, () => ({ i: Math.floor(Math.random() * n), d: 4 + Math.random() * 12, ph: Math.random() * 7 }));
  }
  const surface = (x) => pile[Math.max(0, Math.min(pile.length - 1, Math.round(x / STEP)))] || 0;
  const sideAt = (arr, y) => arr[Math.max(0, Math.min(arr.length - 1, Math.round((H - y) / SSTEP)))] || 0;
  // 눈송이가 내려앉은 자리에 둥글게 눈을 보탬 (높을수록 덜 쌓여서 MAX 근처에서 멈춤)
  function deposit(x, amt, rad) {
    const c0 = Math.round(x / STEP), rc = Math.max(2, Math.round(rad / STEP));
    for (let k = -rc; k <= rc; k++) {
      const i = c0 + k;
      if (i < 0 || i >= pile.length) continue;
      pile[i] += amt * Math.exp((-k * k) / (rc * rc * 0.45)) * Math.max(0, 1 - pile[i] / MAX);
    }
  }
  function depositSide(arr, y, amt) {
    const c0 = Math.round((H - y) / SSTEP);
    for (let k = -4; k <= 4; k++) {
      const i = c0 + k;
      if (i < 0 || i >= arr.length) continue;
      arr[i] += amt * Math.exp((-k * k) / 6) * Math.max(0, 1 - arr[i] / sideCap(i));
    }
  }
  const smooth = (arr, k) => { for (let i = 1; i < arr.length - 1; i++) arr[i] += ((arr[i - 1] + arr[i + 1]) / 2 - arr[i]) * k; };
  // 부드러운 곡선으로 이은 눈 더미를 칠함: 옅은 그늘 → 바탕색 → 눈 결 → 윗면 아래 옅은 음영
  function paintDrift(trace, fill, shadeDX, shadeDY) {
    ctx.beginPath();
    trace();
    ctx.closePath();
    ctx.save();
    ctx.shadowColor = 'rgba(80,110,145,.24)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetX = -shadeDX;
    ctx.shadowOffsetY = -shadeDY;
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.clip();
    ctx.globalAlpha = 0.55;
    ctx.fillStyle = GRAIN;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.translate(shadeDX * 6, shadeDY * 6);
    ctx.lineWidth = 7;
    ctx.strokeStyle = 'rgba(160,188,215,.13)';
    ctx.stroke();
    ctx.restore();
  }
  // 점들을 이어 곡선 경로로 (중간점을 지나는 2차 곡선)
  function curve(pts) {
    ctx.lineTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
      ctx.quadraticCurveTo(x0, y0, (x0 + x1) / 2, (y0 + y1) / 2);
    }
  }
  function drawPile() {
    const ph = Math.round(Math.max(...pile) + 6);
    if (Math.abs(ph - hitH) > 2) { hitH = ph; hit.style.height = `${ph}px`; }
    // 뾰족해지지 않게 조금씩 고르게 → 바람에 다듬어진 듯 완만한 눈 더미
    smooth(pile, 0.05);
    smooth(sideL, 0.06);
    smooth(sideR, 0.06);
    const rows = Math.ceil(H / SSTEP) + 2;
    // 왼쪽 · 오른쪽 가장자리
    paintDrift(() => {
      ctx.moveTo(-2, H + 2);
      curve(Array.from({ length: rows }, (_, i) => [sideL[i] || 0, H - i * SSTEP]));
      ctx.lineTo(-2, -10);
    }, fillL, -1, 0);
    paintDrift(() => {
      ctx.moveTo(W + 2, H + 2);
      curve(Array.from({ length: rows }, (_, i) => [W - (sideR[i] || 0), H - i * SSTEP]));
      ctx.lineTo(W + 2, -10);
    }, fillR, 1, 0);
    // 아래
    paintDrift(() => {
      ctx.moveTo(-2, H + 2);
      curve(pile.map((h, i) => [i * STEP, H - h]));
      ctx.lineTo(W + 2, H + 2);
    }, pileFill, 0, 1);
    // 윗면에서 반짝이는 눈 결정
    for (const s of sparkles) {
      const a = Math.pow(Math.max(0, Math.sin(time * 1.5 + s.ph)), 10);
      if (a < 0.05) continue;
      const x = s.i * STEP, y = H - pile[s.i] + s.d, l = 2.8 * a + 0.5;
      ctx.beginPath();
      ctx.moveTo(x - l, y); ctx.lineTo(x + l, y);
      ctx.moveTo(x, y - l); ctx.lineTo(x, y + l);
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(150,182,214,${a})`;
      ctx.stroke();
    }
  }

  // 펑펑 내릴 때 잠깐 더한 눈송이는 한 번 내려앉으면 사라짐
  const respawn = (f) => { if (f.temp) f.dead = true; else Object.assign(f, make(true)); };
  // z: 가까울수록(1.4) 크고 빠르고 진하게, 멀수록(0.4) 작고 느리고 옅게
  const make = (top) => {
    const z = 0.4 + Math.random();
    const crystal = Math.random() < 0.12;
    return {
      x: Math.random() * (W + 80) - 40,
      y: top ? -12 : Math.random() * H,
      z,
      crystal,
      r: crystal ? (4 + Math.random() * 4) * z : (0.7 + Math.random() * 1.8) * z,
      v: (crystal ? 18 : 26) * z + Math.random() * 14,
      sway: 8 + Math.random() * 18,
      ph: Math.random() * Math.PI * 2,
      rot: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 1.2,
    };
  };
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // 휴대폰은 스크롤할 때 주소창이 숨으며 높이만 바뀜 → 그때는 쌓인 눈을 그대로 둠
    const widthChanged = window.innerWidth !== W;
    W = window.innerWidth;
    H = window.innerHeight;
    cv.width = W * dpr;
    cv.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // 윗면은 햇빛 받은 흰색, 깊어질수록 푸르스름한 그늘
    pileFill = ctx.createLinearGradient(0, H - MAX, 0, H);
    pileFill.addColorStop(0, '#FFFFFF');
    pileFill.addColorStop(0.35, '#F7FAFC');
    pileFill.addColorStop(1, '#DCE6EF');
    fillL = ctx.createLinearGradient(SMAX, 0, 0, 0);
    fillR = ctx.createLinearGradient(W - SMAX, 0, W, 0);
    for (const f of [fillL, fillR]) {
      f.addColorStop(0, '#FFFFFF');
      f.addColorStop(0.4, '#F6F9FC');
      f.addColorStop(1, '#DCE6EF');
    }
    if (widthChanged) {
      initPile();
      const n = Math.max(50, Math.min(130, Math.round((W * H) / 6500)));
      flakes = Array.from({ length: n }, () => make(false));
    }
  }
  // 흰 바탕에서도 보이도록 흰 눈에 옅은 하늘색 테두리
  function dot(x, y, r, a) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${a})`;
    ctx.fill();
    ctx.lineWidth = 0.7;
    ctx.strokeStyle = `rgba(110,140,168,${a * 0.38})`;
    ctx.stroke();
  }
  function crystal(x, y, r, rot, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let k = 0; k < 6; k++) {
      ctx.rotate(Math.PI / 3);
      ctx.moveTo(0, 0); ctx.lineTo(0, -r);
      ctx.moveTo(0, -r * 0.55); ctx.lineTo(r * 0.28, -r * 0.8);
      ctx.moveTo(0, -r * 0.55); ctx.lineTo(-r * 0.28, -r * 0.8);
    }
    ctx.lineCap = 'round';
    ctx.lineWidth = 2.4;
    ctx.strokeStyle = `rgba(255,255,255,${a})`;
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.strokeStyle = `rgba(120,150,180,${a * 0.75})`;
    ctx.stroke();
    ctx.restore();
  }
  function frame(t) {
    const dt = Math.min((t - last) / 1000 || 0, 0.05);
    last = t;
    time += dt;
    // 잔잔한 바람 + 가끔 부는 돌풍
    const gust = Math.max(0, Math.sin(time * 0.23) - 0.55) * 90;
    // 바람이 가끔 왼쪽으로도 불어서 왼쪽 가장자리에도 눈이 쌓임
    const wind = 6 + Math.sin(time * 0.37) * 16 + gust;
    ctx.clearRect(0, 0, W, H);
    for (const f of flakes) {
      f.y += f.v * dt;
      f.ph += dt * (0.6 + f.z * 0.5);
      f.x += wind * f.z * dt;
      f.rot += f.spin * dt;
      const x = f.x + Math.sin(f.ph) * f.sway;
      if (f.x > W + 50 || f.x < -60) { respawn(f); continue; }
      // 바람에 밀려 화면 양옆 가장자리에 닿으면 옆에 쌓임
      if (f.y > 0 && x < W + 2 && x >= W - sideAt(sideR, f.y) && wind > 0) {
        depositSide(sideR, f.y, (f.crystal ? 1.2 : 0.6) * f.z);
        respawn(f);
        continue;
      }
      if (f.y > 0 && x > -2 && x <= sideAt(sideL, f.y) && wind < 0) {
        depositSide(sideL, f.y, (f.crystal ? 1.2 : 0.6) * f.z);
        respawn(f);
        continue;
      }
      // 쌓인 눈 위에 닿으면 그 자리에 쌓이고 새 눈송이로
      if (f.y >= H - surface(x)) {
        if (x > -4 && x < W + 4) deposit(x, (f.crystal ? 1.4 : 0.7) * f.z, f.r * 3 + 4);
        respawn(f);
        continue;
      }
      const a = Math.min(0.95, 0.35 + f.z * 0.45);
      if (f.crystal) crystal(x, f.y, f.r, f.rot, a);
      else dot(x, f.y, f.r, a);
    }
    // 누른 자리에서 퍼지는 눈송이
    for (let i = bursts.length - 1; i >= 0; i--) {
      const p = bursts[i];
      p.life -= dt;
      if (p.life <= 0) { bursts.splice(i, 1); continue; }
      p.vy += (p.g || 60) * dt;
      p.vx *= 0.98;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.rot += p.spin * dt;
      if (p.y >= H - surface(p.x)) {
        deposit(p.x, 0.9, p.r * 3 + 4);
        bursts.splice(i, 1);
        continue;
      }
      const a = Math.min(1, p.life / 0.8);
      if (p.crystal) crystal(p.x, p.y, p.r, p.rot, a);
      else dot(p.x, p.y, p.r, a);
    }
    if (flakes.some((f) => f.dead)) flakes = flakes.filter((f) => !f.dead);
    drawPile();
    requestAnimationFrame(frame);
  }
  // 쌓인 눈을 누르거나 쓸면: 그 자리 눈이 파이고 눈가루가 튀어 올랐다가 다시 떨어져 쌓임
  const nearPile = (x, y) => y > H - surface(x) - 36;
  function scoop(x, power) {
    const rad = 18 + power * 14, c0 = Math.round(x / STEP), rc = Math.round(rad / STEP);
    for (let k = -rc; k <= rc; k++) {
      const i = c0 + k;
      if (i < 0 || i >= pile.length) continue;
      pile[i] = Math.max(3, pile[i] * (1 - 0.55 * power * Math.exp((-k * k) / (rc * rc * 0.4))));
    }
    const n = Math.round(6 + power * 20);
    for (let i = 0; i < n; i++) {
      const px = x + (Math.random() - 0.5) * rad * 1.6;
      bursts.push({
        x: px, y: H - surface(px) - 2,
        vx: (px - x) * 3 + (Math.random() - 0.5) * 90,
        vy: -(140 + Math.random() * 220) * (0.6 + power * 0.5),
        g: 420,
        r: i % 6 === 0 ? 3 + Math.random() * 2 : 1 + Math.random() * 2.4,
        crystal: i % 6 === 0, rot: Math.random() * 3, spin: (Math.random() - 0.5) * 8,
        life: 2.2,
      });
    }
  }
  let lastSweep = 0;
  const sweep = (x, y) => {
    const now = performance.now();
    if (now - lastSweep < 45 || !nearPile(x, y)) return;
    lastSweep = now;
    scoop(x, 0.35);
  };
  window.addEventListener('touchmove', (e) => { for (const t of e.touches) sweep(t.clientX, t.clientY); }, { passive: true });
  window.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' && e.buttons) sweep(e.clientX, e.clientY); }, { passive: true });

  // 맨 아래(감사 인사)에 닿으면 잠시 눈이 펑펑 → 내려앉고 나면 원래대로
  let lastFlurry = 0;
  window.addEventListener('flurry', () => {
    if (time - lastFlurry < 20) return;
    lastFlurry = time;
    for (let i = 0; i < 80; i++) flakes.push({ ...make(true), y: -Math.random() * H * 0.8, temp: true });
  });

  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('.lb')) return;
    if (nearPile(e.clientX, e.clientY)) { scoop(e.clientX, 1); return; }
    for (let i = 0; i < 16; i++) {
      const ang = Math.random() * Math.PI * 2, sp = 50 + Math.random() * 110;
      bursts.push({
        x: e.clientX, y: e.clientY,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 40,
        r: i % 4 === 0 ? 4 + Math.random() * 3 : 1 + Math.random() * 2,
        crystal: i % 4 === 0, rot: Math.random() * 3, spin: (Math.random() - 0.5) * 6,
        life: 1.1 + Math.random() * 0.6,
      });
    }
  }, { passive: true });
  resize();
  window.addEventListener('resize', resize);
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
  // 옆으로 넘기는 폴라로이드: 가운데 사진은 반듯하고 크게, 옆 사진은 기울고 작고 흐리게
  const track = $('#gallery'), slides = [...track.querySelectorAll('.slide')];
  let active = 0, queued = false;
  const layout = () => {
    queued = false;
    const mid = track.scrollLeft + track.clientWidth / 2;
    let best = Infinity;
    slides.forEach((s, i) => {
      const d = (s.offsetLeft - track.offsetLeft + s.offsetWidth / 2 - mid) / s.offsetWidth;
      const k = Math.min(Math.abs(d), 1);
      const card = s.firstElementChild;
      card.style.transform = `translateY(${k * 18}px) rotate(${Math.max(-1, Math.min(1, d)) * 7}deg) scale(${1 - k * 0.14})`;
      card.style.opacity = String(1 - k * 0.45);
      if (Math.abs(d) < best) { best = Math.abs(d); active = i; }
    });
    $('#gCount').textContent = `${active + 1} / ${slides.length}`;
  };
  const go = (i) => {
    const s = slides[(i + slides.length) % slides.length];
    track.scrollTo({ left: s.offsetLeft - track.offsetLeft + s.offsetWidth / 2 - track.clientWidth / 2, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  track.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(layout); } }, { passive: true });
  window.addEventListener('resize', layout);
  layout();
  $('#gPrev').addEventListener('click', () => go(active - 1));
  $('#gNext').addEventListener('click', () => go(active + 1));
  // 가운데 사진을 누르면 크게 보기, 옆 사진을 누르면 그 사진으로 넘김
  track.addEventListener('click', (e) => {
    const s = e.target.closest('.slide');
    if (!s) return;
    const i = Number(s.dataset.i);
    if (i === active) open(i);
    else go(i);
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
