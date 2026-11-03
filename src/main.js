import './style.css';
import { config as c } from './config.js';
import { groom, bride, cat } from './characters.js';
import { makeInvitationImage } from './saveImage.js';
import { renderMusicBox } from './musicbox.js';
import { timeHello, ribbon, heartLine, mapPin, clockFace, setClock, initLanterns, heartBurst, heartRain, flyEnvelope, bells, initPeekCats } from './extras.js';
import { getMode, setSky, initCatPoke, pawStamp, lights, vehicle, frostCorner, initTitleSnow, initEyes, constellation, pressed, typeOut, initNap } from './effects.js';

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
const couple = `${c.groom.firstName} ♥ ${c.bride.firstName}`;
const fx = c.effects || {};
// 예식 전 / 당일 / 다음 날부터 — 화면 문구와 연출이 바뀜 (주소 끝에 ?preview=dday 또는 ?preview=after 로 미리보기)
const mode = getMode(w);
document.documentElement.classList.add(`mode-${mode}`);
const heroEyebrow = mode === 'dday' ? 'Today' : mode === 'after' ? 'Thank you' : fx.eyebrow || 'The Wedding of';
const modeNote = mode === 'dday'
  ? '<div class="mode-note">오늘, 두 사람이 결혼합니다</div>'
  : mode === 'after' ? '<div class="mode-note">함께해 주셔서 진심으로 감사합니다</div>' : '';

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
// 배경음악: music 폴더에 mp3·m4a 파일을 넣으면 오른쪽 위에 레코드판 버튼이 생김 (이름순 첫 번째)
const bgm = byName(import.meta.glob('/music/*.{mp3,m4a,aac,ogg,wav,MP3,M4A}', { eager: true, import: 'default', query: '?url' }))[0];
const galleryThumb = byName(
  import.meta.glob('/photos/gallery/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', {
    eager: true, import: 'default', query: '?w=640&h=800&fit=cover&format=webp&quality=76',
  })
);

// ---------- 메타 ----------
document.title = c.meta.title;

// ---------- 편지 봉투: 맨 위에서는 열리고, 맨 아래에서는 닫혀 봉해짐 ----------
// 쌓는 순서: 뒷면 → (열린 덮개) → 카드 → 앞 주머니 → (닫힌 덮개) → 실링
const envelope = (cls, card, front = '') => `<div class="env ${cls}" aria-hidden="true">
  <div class="env-back"></div>
  <div class="env-card">${card}</div>
  <div class="env-front">${front}</div>
  <div class="env-flap"></div>
  <div class="env-seal">${esc(fx.monogram || 'J&J')}</div>
</div>`;

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
    <div class="cover"><img src="${mainPhoto}" alt="${esc(couple)}" fetchpriority="high">
      <div class="bokeh" aria-hidden="true">${[[12, 16, 0], [26, 9, 3.5], [44, 22, 1.2], [58, 12, 6], [70, 18, 2.4], [84, 10, 4.6], [36, 14, 7.8], [92, 20, 5.4], [6, 11, 8.6]]
        .map(([x, s, d]) => `<i style="left:${x}%;--s:${s}px;--d:${d}s;--t:${(10 + (x % 5)).toFixed(0)}s"></i>`).join('')}</div>
      <div class="mag" aria-hidden="true"></div>${drift('drift-cover')}</div>
    <div class="hero-in">
      <div class="save foil">${esc(heroEyebrow)}</div>
      <div class="names">
        <span class="sr">${esc(c.groom.englishName)} &amp; ${esc(c.bride.englishName)}</span>
        <span class="nm" aria-hidden="true">${letters(c.groom.englishName, 0)}</span>
        <span class="amp foil" aria-hidden="true">&amp;</span>
        <span class="nm" aria-hidden="true">${letters(c.bride.englishName, c.groom.englishName.length + 2)}</span>
      </div>
      <div class="ko">${esc(c.groom.name)} <i>·</i> ${esc(c.bride.name)}</div>
      ${ribbon()}
      <div class="hero-date">
        <b>${w.year}. ${pad(w.month)}. ${pad(w.day)}</b>
        <span>${DOW_KO[dow]}요일 ${timeKo}</span>
        <small><svg class="pin" viewBox="0 0 12 16" aria-hidden="true"><path d="M6 15.5S1 9.6 1 6a5 5 0 0 1 10 0c0 3.6-5 9.5-5 9.5Z"/><circle cx="6" cy="6" r="1.9" fill="#fff"/></svg>${esc(c.venue.name)}</small>
      </div>
      ${modeNote}
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>`
      : // 사진이 없으면: 모노그램 + 영문 이름
        `<section class="hero">
    <div class="hero-in">
      <div class="save foil">${esc(heroEyebrow)}</div>
      ${seal('seal-hero')}
      <div class="names">
        <span class="sr">${esc(c.groom.englishName)} &amp; ${esc(c.bride.englishName)}</span>
        <span class="nm" aria-hidden="true">${letters(c.groom.englishName, 0)}</span>
        <span class="amp foil" aria-hidden="true">&amp;</span>
        <span class="nm" aria-hidden="true">${letters(c.bride.englishName, c.groom.englishName.length + 2)}</span>
      </div>
      <div class="ko">${esc(c.groom.name)} <i>·</i> ${esc(c.bride.name)}</div>
      ${ribbon()}
      <div class="hero-date">
        <b>${w.year}. ${pad(w.month)}. ${pad(w.day)}</b>
        <span>${DOW_KO[dow]}요일 ${timeKo}</span>
        <small><svg class="pin" viewBox="0 0 12 16" aria-hidden="true"><path d="M6 15.5S1 9.6 1 6a5 5 0 0 1 10 0c0 3.6-5 9.5-5 9.5Z"/><circle cx="6" cy="6" r="1.9" fill="#fff"/></svg>${esc(c.venue.name)}</small>
      </div>
      ${modeNote}
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>`
  }

  <section class="greet rv">
    ${pressed('flower', 'pf-tr', 18)}${pressed('sprig', 'pf-bl', -24)}
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
    ${heartLine()}
    <div class="wax" aria-hidden="true"><span>${esc(fx.monogram || 'J&J')}</span></div>
  </section>

  ${
    galleryThumb.length
      ? `<section class="rv">
    ${pressed('leaf', 'pf-tl', -12)}
    <div class="eyebrow">Gallery</div>
    <h2>우리의 사진</h2>
    <div class="carousel" id="gallery"><div class="track">
      ${galleryThumb
        .map((src, i) => `<button type="button" class="slide" data-i="${i}" style="--i:${Math.min(i, 4)}" aria-label="사진 ${i + 1} 크게 보기">
          <span class="polaroid"><img style="--i:${Math.min(i, 3)}" src="${src}" alt="" loading="lazy" draggable="false"><small>${pad(i + 1)}</small></span>
        </button>`)
        .join('')}
    </div></div>
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
    ${pressed('flower', 'pf-tr2', -30)}
    <div class="eyebrow">Wedding Day</div>
    <h2 class="type">${dateKo}</h2>
    <div class="cal-head"><span>${w.year}</span>${w.month}월${cat('black', 'cat-cal')}</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
    ${clockFace()}
  </section>

  <section class="rv">
    ${frostCorner('fc-tl')}${frostCorner('fc-br')}
    ${pressed('sprig', 'pf-tl3', 16)}
    <div class="eyebrow">Location</div>
    <h2>오시는 길</h2>
    <div class="venue">${esc(c.venue.name)}</div>
    <div class="addr">${esc(c.venue.address)}</div>
    <div class="addr">${esc(c.venue.detail)}${c.venue.tel ? ` · Tel. ${esc(c.venue.tel)}` : ''}</div>
    <div class="map-wrap">
    ${cat('cheeseTabby', 'cat-peek')}
    ${mapPin()}
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
      ${c.directions.map((d) => `<div><h3>${esc(d.title)}${vehicle(d.title)}</h3><p>${esc(d.text)}</p></div>`).join('')}
    </div>
  </section>

  ${
    c.accounts.show
      ? `<section class="rv">
    ${frostCorner('fc-tl')}${frostCorner('fc-br')}
    ${cat('cow', 'cat-acct')}
    ${pressed('leaf', 'pf-bl2', 28)}
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${lines(c.accounts.note)}</div>
    ${accountGroup('신랑측 계좌번호', c.accounts.groom)}
    ${accountGroup('신부측 계좌번호', c.accounts.bride)}
  </section>`
      : ''
  }

  <section class="foot rv">
    ${pressed('flower', 'pf-tr3', 24)}${pressed('flower', 'pf-tl4', -40)}
    ${constellation()}
    <p class="lantern-hint">화면을 톡 누르면 풍등이 날아올라요</p>
    ${lights()}
    <div class="family" aria-hidden="true">
      <div class="couple">${groom()}<span class="fam-heart" aria-hidden="true">♥</span>${bride()}</div>
      <div class="cats-row">
        ${['whiteLong', 'tortie', 'cheeseTabby'].map((k) => cat(k)).join('')}<i class="gap"></i>${['yellowSpot1', 'yellowSpot2', 'calico', 'cow', 'black'].map((k) => cat(k)).join('')}
      </div>
    </div>
    <div class="sign">${esc(c.groom.englishName)} &amp; ${esc(c.bride.englishName)}</div>
    ${esc(c.closing)}
    <div class="share-row">
      <button class="link-btn" type="button" id="share">공유하기</button>
      <button class="link-btn" type="button" id="copyLink">링크 복사</button>
      <button class="link-btn" type="button" id="saveImage">사진으로 저장</button>
    </div>
    ${envelope('env-close', '<em>Thank you</em><i>♥</i>')}
    <button class="to-top" type="button" id="toTop" aria-label="맨 위로"><span aria-hidden="true">❄</span>맨 위로</button>
  </section>
</main>
<div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="사진 크게 보기">
  <img id="lbImg" alt="">
  <button class="lb-btn lb-close" type="button" id="lbClose" aria-label="닫기">&times;</button>
  <button class="lb-btn lb-prev" type="button" id="lbPrev" aria-label="이전 사진">&#8249;</button>
  <button class="lb-btn lb-next" type="button" id="lbNext" aria-label="다음 사진">&#8250;</button>
  <div class="lb-count" id="lbCount"></div>
  <div class="lb-hint" aria-hidden="true">아래로 쓸어내리면 닫혀요</div>
</div>
<div class="save-modal" id="saveModal" hidden role="dialog" aria-modal="true" aria-label="청첩장 사진으로 저장">
  <div class="sm-box">
    <img id="saveImg" alt="청첩장 이미지 (이름, 날짜, 장소가 담긴 한 장)">
    <p class="sm-tip">이미지를 길게 눌러서 저장할 수도 있어요</p>
    <a class="sm-out" id="saveOut" hidden>저장이 안 되면 다른 브라우저로 열기 ↗</a>
    <div class="sm-btns">
      <button class="btn" type="button" id="saveDl">저장하기</button>
      <button class="btn" type="button" id="saveShare" hidden>공유하기</button>
      <button class="btn" type="button" id="saveClose">닫기</button>
    </div>
  </div>
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
$('#dday').innerHTML = mode === 'dday'
  ? `오늘 <strong>${timeKo}</strong>, ${esc(couple)} 결혼합니다`
  : `${esc(couple)}의 결혼식이 <strong id="ddayNum"></strong> 남았습니다`;
$('#count').innerHTML = ['Days', 'Hours', 'Mins', 'Secs'].map((l) => `<div><b></b><small>${l}</small></div>`).join('');
const countCells = [...document.querySelectorAll('#count b')];
let daysLeft = 0, ddayCounting = false, ticked = false;
function tick() {
  const diff = WED - new Date();
  // 예식 다음 날부터(또는 시작 시각이 지나면): 결혼했다는 인사로
  if (mode === 'after' || diff <= 0) {
    $('#dday').innerHTML = `${esc(couple)}, ${w.month}월 ${w.day}일에 <strong>결혼했습니다</strong>`;
    $('#count').innerHTML = '';
    return;
  }
  // 당일 미리보기(?preview=dday)에서는 남은 날짜 대신 문구만
  if (mode === 'dday' && diff > 86400000) { $('#count').innerHTML = ''; return; }
  const s = Math.floor(diff / 1000);
  const D = Math.floor(s / 86400), H = Math.floor((s % 86400) / 3600), M = Math.floor((s % 3600) / 60), S = s % 60;
  // 예식 24시간 전부터는 숫자판 대신 모래시계 (주소 끝에 ?clock 을 붙이면 미리보기)
  const lastDay = D === 0 || new URLSearchParams(location.search).has('clock');
  $('#clock').hidden = !lastDay;
  $('#count').hidden = lastDay;
  if (lastDay) setClock(H, M, S, (H * 3600 + M * 60 + S) / 86400);
  daysLeft = D + 1;
  if (!ddayCounting && $('#ddayNum')) $('#ddayNum').textContent = `${daysLeft}일`;
  // 바뀐 숫자만 공항 안내판처럼 착 넘어감
  [D, pad(H), pad(M), pad(S)].forEach((v, i) => {
    const b = countCells[i];
    if (b.textContent === String(v)) return;
    b.textContent = v;
    if (ticked && !reduceMotion) {
      b.classList.remove('flip');
      void b.offsetWidth;
      b.classList.add('flip');
    }
  });
  ticked = true;
}
tick();
setInterval(tick, 1000);

// ---------- 고양이 반응 · 제목 눈송이 · 고양이 눈동자 ----------
initTitleSnow(reduceMotion);
initEyes(reduceMotion);
initCatPoke();
initNap(reduceMotion, 2000);
initLanterns(reduceMotion);
initPeekCats(cat, reduceMotion);
// 달력 20일을 누르면 웨딩벨
$('.cal .on')?.addEventListener('click', (e) => { if (!reduceMotion) bells(e.currentTarget); });

// ---------- 처음 열 때: 시네마틱 오프닝 — 가운데 금선 → 이름·날짜가 차례로 올라옴 → 화면이 위아래로 갈라지며 사진 (누르면 바로 넘어감) ----------
(() => {
  if (reduceMotion) return;
  const root = document.documentElement;
  root.classList.add('intro-on');  // 그동안 첫 화면 애니메이션은 멈춰 두었다가 끝나면 시작
  const el = document.createElement('div');
  el.className = 'intro cine';
  el.innerHTML = `<div class="cine-top"><div class="cine-txt"><span class="cine-hi">${esc(timeHello())}</span><small>${esc(heroEyebrow)}</small><b>${esc(c.groom.englishName)} <em>&amp;</em> ${esc(c.bride.englishName)}</b></div></div>
    <div class="cine-bot"><div class="cine-txt"><span>${w.year}. ${pad(w.month)}. ${pad(w.day)}</span></div></div>
    <i class="cine-line"></i>`;
  document.body.appendChild(el);
  // 화면이 갈라지기 시작할 때 첫 화면 애니메이션을 시작해서 자연스럽게 이어짐
  const open = () => root.classList.remove('intro-on');
  const done = () => { open(); el.remove(); };
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('go')));
  const t1 = setTimeout(open, 2750), t2 = setTimeout(done, 3900);
  el.addEventListener('click', () => { clearTimeout(t1); clearTimeout(t2); done(); });
})();

// ---------- 스크롤 등장 효과 ----------
// [선택자, 등장 방식, 순서별 지연(ms)] — 방식: up 아래에서 / left·right 옆에서 / zoom 커지며 / blur 흐림→선명
//   / track 자간이 좁혀지며 / frost 성에 낀 듯 뿌옇다가 녹으며 선명 / lines 한 줄씩 차례로 / sign 펜으로 쓰듯 왼쪽부터
const REVEAL = [
  ['section:not(.hero) > .eyebrow', 'track'],
  ['section:not(.hero) > h2', 'blur', () => 60],
  ['.greet > p', 'lines', (i) => 60 + i * 70],
  ['.parents > div:first-child', 'left'],
  ['.parents > div:last-child', 'right', () => 80],
  ['.carousel', 'frost', () => 60],
  ['.family, .g-nav, .since, .cal-head, .dday, .count, .venue, .addr, .copy-addr, .note, .share-row', 'up'],
  ['.foot .sign', 'sign'],
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
  const els = document.querySelectorAll('.a, .cal, .seal-foot, .env-close, .lights, .frost-corner, .pressed, .wax, .map-wrap, section:not(.hero)');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('in'));
    return;
  }
  const show = (el) => {
    if (el.classList.contains('in')) return;
    el.classList.add('in');
    if (el.id === 'dday') countUpDday();
    if (el.classList.contains('type')) typeOut(el);
    if (el.classList.contains('foot')) {
      window.dispatchEvent(new Event('flurry'));
      const sh = $('#share');
      sh?.classList.remove('shine');
      void sh?.offsetWidth;
      sh?.classList.add('shine');
    }
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

// ---------- 맨 위 스크롤 막대: 신랑(왼쪽)과 신부(오른쪽)가 고양이와 함께 걸어와 맨 끝에서 만남  ----------
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
    setSky(p, reduceMotion);
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
  // 빠르게 스크롤하면 눈송이가 바람에 휩쓸리듯 휘날림
  let swirl = 0, lastScroll = window.scrollY;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    swirl = Math.max(-40, Math.min(40, swirl + (y - lastScroll) * 0.25));
    lastScroll = y;
  }, { passive: true });

  // 쌓인 눈: STEP px 간격마다 높이
  const STEP = 3, BASE = 15, MAX = 42;
  let pile = [], sparkles = [], pileFill = null;
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
  function initPile() {
    const n = Math.ceil(W / STEP) + 2, seed = Math.random() * 10;
    pile = Array.from({ length: n }, (_, i) => {
      const x = i * STEP;
      // 완만한 큰 언덕 + 잔잔한 굴곡
      return BASE + Math.sin(x * 0.011 + seed) * 5 + Math.sin(x * 0.037 + seed * 2) * 2;
    });
    sparkles = Array.from({ length: Math.round(W / 30) }, () => ({ i: Math.floor(Math.random() * n), d: 4 + Math.random() * 12, ph: Math.random() * 7 }));
  }
  const surface = (x) => pile[Math.max(0, Math.min(pile.length - 1, Math.round(x / STEP)))] || 0;
  // 눈송이가 내려앉은 자리에 둥글게 눈을 보탬 (높을수록 덜 쌓여서 MAX 근처에서 멈춤)
  function deposit(x, amt, rad) {
    const c0 = Math.round(x / STEP), rc = Math.max(2, Math.round(rad / STEP));
    for (let k = -rc; k <= rc; k++) {
      const i = c0 + k;
      if (i < 0 || i >= pile.length) continue;
      pile[i] += amt * Math.exp((-k * k) / (rc * rc * 0.45)) * Math.max(0, 1 - pile[i] / MAX);
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
  // ---- 가끔 고양이 한 마리가 쌓인 눈 위를 지나가며 발자국을 남김 (새 눈에 서서히 덮임) ----
  const walker = document.createElement('div');
  walker.className = 'snow-cat';
  walker.setAttribute('aria-hidden', 'true');
  document.body.appendChild(walker);
  const KINDS = ['yellowSpot1', 'yellowSpot2', 'calico', 'cow', 'black', 'whiteLong', 'tortie', 'cheeseTabby'];
  let wc = null, prints = [];
  const nextWalk = (ms) => setTimeout(() => {
    const dir = Math.random() < 0.5 ? 1 : -1;
    walker.innerHTML = cat(KINDS[Math.floor(Math.random() * KINDS.length)]);
    walker.classList.toggle('flip', dir < 0);
    walker.classList.add('on');
    wc = { x: dir > 0 ? -30 : W + 30, dir, v: 30 + Math.random() * 12, last: -99, step: 0 };
  }, ms);
  nextWalk(5000 + Math.random() * 5000);
  function walkCat(dt) {
    if (wc) {
      wc.x += wc.dir * wc.v * dt;
      const y = H - surface(wc.x);
      walker.style.transform = `translate(${(wc.x - 15).toFixed(1)}px, ${(y - 25).toFixed(1)}px)`;
      if (Math.abs(wc.x - wc.last) > 8) {
        prints.push({ x: wc.x, off: wc.step++ % 2 ? -2.4 : 2.4, life: 9 });
        wc.last = wc.x;
      }
      if (wc.x < -40 || wc.x > W + 40) { wc = null; walker.classList.remove('on'); nextWalk(16000 + Math.random() * 14000); }
    }
    for (let i = prints.length - 1; i >= 0; i--) {
      const p = prints[i];
      p.life -= dt;
      if (p.life <= 0) { prints.splice(i, 1); continue; }
      const a = Math.min(1, p.life / 4) * 0.45, x = p.x, y = H - surface(x) + 4 + p.off;
      ctx.fillStyle = `rgba(120,150,180,${a})`;
      ctx.beginPath(); ctx.ellipse(x, y, 1.9, 1.4, 0, 0, Math.PI * 2); ctx.fill();
      for (const [dx, dy] of [[-1.6, -1.9], [0, -2.5], [1.6, -1.9]]) {
        ctx.beginPath(); ctx.arc(x + dx, y + dy, 0.6, 0, Math.PI * 2); ctx.fill();
      }
    }
  }

  // ---- 쌓인 눈을 다섯 번 누르면 눈사람 완성 → 두 사람이 손을 흔듦 ----
  let man = null, manX = 0, taps = 0;
  function buildSnowman(x) {
    if (taps >= 5) return;
    taps++;
    if (!man) {
      man = document.createElement('div');
      man.className = 'snowman';
      man.setAttribute('aria-hidden', 'true');
      man.innerHTML = `<svg viewBox="0 0 44 56">
        <g class="sm-arms"><path d="M10 34 2 28M4 30 3 26M34 34l8-6M40 30l1-4" stroke="#7A5A48" stroke-width="1.4" stroke-linecap="round" fill="none"/></g>
        <circle class="sm-ball" cx="22" cy="42" r="12.5" fill="#FFFFFF" stroke="#C9D6E2" stroke-width="1"/>
        <g class="sm-head"><circle cx="22" cy="22.5" r="8.8" fill="#FFFFFF" stroke="#C9D6E2" stroke-width="1"/></g>
        <g class="sm-face"><circle cx="19" cy="21" r="1.1" fill="#2A2224"/><circle cx="25" cy="21" r="1.1" fill="#2A2224"/>
          <path d="M22 23.2l5 1.4-5 .8z" fill="#F0913E"/><circle cx="22" cy="38" r="1" fill="#2A2224"/><circle cx="22" cy="43" r="1" fill="#2A2224"/></g>
        <g class="sm-wear"><path d="M14 29.5q8 3.6 16 0l.6 2.6q-8.6 3.8-17.2 0z" fill="#A8616E"/><path d="M26 31l2.6 7-3 .4-1.6-6.6z" fill="#A8616E"/>
          <rect x="15.5" y="12.4" width="13" height="2.4" rx="1" fill="#2E2B38"/><rect x="17.5" y="4.4" width="9" height="8.6" rx="1.2" fill="#2E2B38"/><rect x="17.5" y="10" width="9" height="1.6" fill="#A8616E"/></g>
      </svg>`;
      document.body.appendChild(man);
      manX = Math.max(30, Math.min(W - 30, x));
    }
    man.classList.add(`s${taps}`);
    if (taps === 5) {
      document.documentElement.classList.add('waving');
      setTimeout(() => document.documentElement.classList.remove('waving'), 4200);
      toast('눈사람 완성! ⛄');
    }
  }

  function drawPile() {
    const ph = Math.round(Math.max(...pile) + 6);
    if (Math.abs(ph - hitH) > 2) { hitH = ph; hit.style.height = `${ph}px`; }
    // 뾰족해지지 않게 조금씩 고르게 → 바람에 다듬어진 듯 완만한 눈 더미
    smooth(pile, 0.05);
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
    const petal = mode === 'dday' && !crystal && Math.random() < 0.4;
    return {
      x: Math.random() * (W + 80) - 40,
      y: top ? -12 : Math.random() * H,
      z,
      crystal,
      petal,
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
  // 금박 가루: 반짝이며 도는 작은 금 조각
  function glitter(x, y, r, rot, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot * 3);
    ctx.scale(1, Math.abs(Math.cos(rot * 4)) * 0.8 + 0.2);
    ctx.fillStyle = `rgba(214,178,108,${a})`;
    ctx.fillRect(-r / 2, -r / 2, r, r);
    ctx.fillStyle = `rgba(255,240,200,${a * 0.8})`;
    ctx.fillRect(-r / 2, -r / 2, r / 2, r / 2);
    ctx.restore();
  }
  // 당일에 함께 흩날리는 분홍 꽃잎
  function petal(x, y, r, rot, a) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot * 2);
    ctx.beginPath();
    ctx.ellipse(0, 0, r, r * 0.55, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(244,172,192,${a})`;
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(-r * 0.2, 0, r * 0.45, r * 0.22, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,226,234,${a * 0.8})`;
    ctx.fill();
    ctx.restore();
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
    swirl *= 0.9;
    const wind = 6 + Math.sin(time * 0.37) * 16 + gust;
    ctx.clearRect(0, 0, W, H);
    for (const f of flakes) {
      f.y += f.v * dt - swirl * f.z * 0.5;
      f.x += Math.sin(f.ph * 2) * swirl * 0.06;
      f.ph += dt * (0.6 + f.z * 0.5);
      f.x += wind * f.z * dt;
      f.rot += f.spin * dt;
      const x = f.x + Math.sin(f.ph) * f.sway;
      if (f.x > W + 50 || f.x < -60) { respawn(f); continue; }
      // 쌓인 눈 위에 닿으면 그 자리에 쌓이고 새 눈송이로
      if (f.y >= H - surface(x)) {
        if (x > -4 && x < W + 4) deposit(x, (f.crystal ? 1.4 : 0.7) * f.z, f.r * 3 + 4);
        respawn(f);
        continue;
      }
      const a = Math.min(0.95, 0.35 + f.z * 0.45);
      if (f.petal) petal(x, f.y, f.r + 2.4, f.rot, a);
      else if (f.crystal) crystal(x, f.y, f.r, f.rot, a);
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
      if (p.gold) glitter(p.x, p.y, p.r + 1.4, p.rot, a);
      else if (p.crystal) crystal(p.x, p.y, p.r, p.rot, a);
      else dot(p.x, p.y, p.r, a);
    }
    if (flakes.some((f) => f.dead)) flakes = flakes.filter((f) => !f.dead);
    drawPile();
    walkCat(dt);
    if (man) man.style.transform = `translate(${(manX - 22).toFixed(1)}px, ${(H - surface(manX) - 52).toFixed(1)}px)`;
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
    if (nearPile(e.clientX, e.clientY)) { scoop(e.clientX, 1); buildSnowman(e.clientX); return; }
    for (let i = 0; i < 16; i++) {
      const ang = Math.random() * Math.PI * 2, sp = 50 + Math.random() * 110;
      bursts.push({
        x: e.clientX, y: e.clientY,
        vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 40,
        r: i % 4 === 0 ? 4 + Math.random() * 3 : 1 + Math.random() * 2,
        crystal: i % 4 === 0, gold: i % 4 === 2, rot: Math.random() * 3, spin: (Math.random() - 0.5) * 6,
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
  // turn: 크게 보기에서 넘길 때는 종이책 페이지가 넘어가듯 접혔다 펴짐
  const show = (i, turn) => {
    const next = (i + n) % n, dir = i > cur ? 1 : -1;
    const apply = () => {
      cur = next;
      img.src = galleryFull[cur];
      $('#lbCount').textContent = `${cur + 1} / ${n}`;
      // 앞뒤 사진 미리 불러오기
      [cur + 1, cur - 1].forEach((j) => { new Image().src = galleryFull[(j + n) % n]; });
    };
    if (!turn || reduceMotion || !img.animate) return apply();
    const out = dir > 0 ? 'left center' : 'right center', inn = dir > 0 ? 'right center' : 'left center';
    img.getAnimations().forEach((a) => a.finish());
    img.animate([
      { transform: 'perspective(1600px) rotateY(0)', transformOrigin: out, filter: 'brightness(1)' },
      { transform: `perspective(1600px) rotateY(${dir > 0 ? -88 : 88}deg) skewY(${dir > 0 ? 3 : -3}deg)`, transformOrigin: out, filter: 'brightness(.7)' },
    ], { duration: 240, easing: 'cubic-bezier(.5,0,.8,.6)' }).finished.then(() => {
      apply();
      img.animate([
        { transform: `perspective(1600px) rotateY(${dir > 0 ? 88 : -88}deg) skewY(${dir > 0 ? -3 : 3}deg)`, transformOrigin: inn, filter: 'brightness(.7)' },
        { transform: 'none', transformOrigin: inn, filter: 'brightness(1)' },
      ], { duration: 320, easing: 'cubic-bezier(.2,.6,.3,1)' });
    });
  };
  // 열 때 방문 기록을 하나 쌓아 두어서, 휴대폰 뒤로가기를 누르면 페이지를 나가지 않고 사진만 닫힘
  const open = (i) => {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    lb.style.transform = '';
    document.body.style.overflow = 'hidden';
    if (!history.state?.lb) history.pushState({ lb: 1 }, '');
    $('#lbClose').focus();
  };
  const hide = () => {
    if (lb.hidden) return;
    lb.hidden = true;
    document.body.style.overflow = '';
    lastFocus?.focus();
  };
  const close = () => { if (history.state?.lb) history.back(); else hide(); };
  window.addEventListener('popstate', hide);
  // 옆으로 넘기는 폴라로이드: 가운데 사진은 반듯하고 크게, 옆 사진은 기울고 작고 흐리게
  // 위아래로 미는 건 브라우저가 그대로 페이지를 스크롤하고(touch-action: pan-y), 좌우로 미는 것만 직접 받아서 넘김
  const box = $('#gallery'), track = box.firstElementChild, slides = [...track.querySelectorAll('.slide')];  // n: 위에서 센 사진 수
  let active = 0, offset = 0, anim = 0, drag = null, moved = false;
  const centerOf = (i) => slides[i].offsetLeft + slides[i].offsetWidth / 2;
  const targetFor = (i) => box.clientWidth / 2 - centerOf(i);
  const nearest = () => {
    let best = 0, bd = Infinity;
    slides.forEach((_, i) => { const d = Math.abs(centerOf(i) + offset - box.clientWidth / 2); if (d < bd) { bd = d; best = i; } });
    return best;
  };
  const layout = () => {
    track.style.transform = `translateX(${offset.toFixed(1)}px)`;
    const mid = box.clientWidth / 2;
    slides.forEach((s, i) => {
      const d = (centerOf(i) + offset - mid) / s.offsetWidth;
      const k = Math.min(Math.abs(d), 1);
      const card = s.firstElementChild;
      card.style.transform = `perspective(700px) translateY(${k * 18}px) rotate(${Math.max(-1, Math.min(1, d)) * 7}deg) scale(${1 - k * 0.14}) rotateX(var(--tx, 0deg)) rotateY(var(--ty, 0deg))`;
      card.style.opacity = String(1 - k * 0.45);
      card.style.setProperty('--sh', `${(Math.max(-1, Math.min(1, d)) * 130).toFixed(1)}%`);
      card.style.setProperty('--sho', (1 - k).toFixed(2));
    });
    $('#gCount').textContent = `${nearest() + 1} / ${n}`;
  };
  // 목표 사진까지 부드럽게 이동 (이동하는 동안에도 기울기가 계속 바뀌도록 직접 그림)
  const animateTo = (i) => {
    active = Math.max(0, Math.min(n - 1, i));
    const from = offset, to = targetFor(active), t0 = performance.now(), dur = reduceMotion ? 1 : 420;
    cancelAnimationFrame(anim);
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      offset = from + (to - from) * (1 - Math.pow(1 - p, 3));
      layout();
      if (p < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  };
  const go = (i) => animateTo((i + n) % n);
  box.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    cancelAnimationFrame(anim);
    drag = { x: e.clientX, start: offset, t: performance.now() };
    moved = false;
  });
  box.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (!moved && Math.abs(dx) > 6) {
      moved = true;
      try { box.setPointerCapture(e.pointerId); } catch { /* 이미 끝난 터치 */ }
    }
    if (!moved) return;
    // 처음·마지막 사진 너머로는 고무줄처럼 살짝만 끌림
    let o = drag.start + dx;
    const max = targetFor(0), min = targetFor(n - 1);
    if (o > max) o = max + (o - max) * 0.35;
    if (o < min) o = min + (o - min) * 0.35;
    offset = o;
    layout();
  });
  const release = (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x, v = dx / Math.max(performance.now() - drag.t, 1);
    drag = null;
    if (!moved) { animateTo(active); return; }
    let i = nearest();
    // 살짝 튕기듯 밀어도 다음 사진으로
    if (i === active && Math.abs(v) > 0.35) i = active + (dx < 0 ? 1 : -1);
    animateTo(i);
    setTimeout(() => { moved = false; }, 80);
  };
  box.addEventListener('pointerup', release);
  box.addEventListener('pointercancel', () => { drag = null; animateTo(active); });
  window.addEventListener('resize', () => { offset = targetFor(active); layout(); });
  layout();
  $('#gPrev').addEventListener('click', () => go(active - 1));
  $('#gNext').addEventListener('click', () => go(active + 1));
  // 가운데 사진을 누르면 크게 보기, 옆 사진을 누르면 그 사진으로 넘김 (끌어서 넘긴 직후의 클릭은 무시)
  let tapTimer = 0;
  box.addEventListener('click', (e) => {
    if (moved) { moved = false; return; }
    const s = e.target.closest('.slide');
    if (!s) return;
    const i = Number(s.dataset.i);
    if (i !== active) { go(i); return; }
    // 두 번 톡톡 누르면 하트, 한 번이면 잠깐 기다렸다가 크게 보기
    if (tapTimer) { clearTimeout(tapTimer); tapTimer = 0; heartBurst(e.clientX, e.clientY); return; }
    tapTimer = setTimeout(() => { tapTimer = 0; open(i); }, 280);
  });
  // 가운데 사진을 누르고 있으면 손가락 쪽으로 살짝 기울어짐 (마우스는 올리기만 해도)
  const tilt = (e, on) => {
    const card = slides[active].firstElementChild, r = card.getBoundingClientRect();
    if (!on || e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
      card.style.setProperty('--tx', '0deg'); card.style.setProperty('--ty', '0deg');
      return;
    }
    card.style.setProperty('--ty', `${(((e.clientX - r.left) / r.width - 0.5) * 16).toFixed(1)}deg`);
    card.style.setProperty('--tx', `${((0.5 - (e.clientY - r.top) / r.height) * 12).toFixed(1)}deg`);
  };
  box.addEventListener('pointerdown', (e) => tilt(e, true));
  box.addEventListener('pointermove', (e) => tilt(e, e.pointerType === 'mouse' || (drag && !moved)));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach((ev) => box.addEventListener(ev, (e) => tilt(e, false)));
  $('#lbClose').addEventListener('click', close);
  $('#lbPrev').addEventListener('click', () => show(cur - 1, true));
  $('#lbNext').addEventListener('click', () => show(cur + 1, true));
  lb.addEventListener('click', (e) => { if (e.target === lb) close(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(cur - 1, true);
    else if (e.key === 'ArrowRight') show(cur + 1, true);
  });
  // 좌우로 밀어서 넘기기
  let sx = null;
  // 좌우로 밀면 넘기고, 아래로 쓸어내리면 사진이 따라 내려가다 닫힘
  let sy = 0;
  lb.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  lb.addEventListener('touchmove', (e) => {
    if (sx === null) return;
    const dy = e.touches[0].clientY - sy, dx = e.touches[0].clientX - sx;
    if (dy > 0 && dy > Math.abs(dx)) {
      img.style.transition = 'none';
      img.style.transform = `translateY(${dy}px) scale(${Math.max(0.85, 1 - dy / 900)})`;
      lb.style.backgroundColor = `rgba(18,18,24,${Math.max(0.35, 0.94 - dy / 500)})`;
    }
  }, { passive: true });
  lb.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    sx = null;
    img.style.transition = '';
    img.style.transform = '';
    lb.style.backgroundColor = '';
    if (dy > 90 && dy > Math.abs(dx)) close();
    else if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1), true);
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
  b.addEventListener('click', () => { pawStamp(b); flyEnvelope(b); copy(b.dataset.copy, '계좌번호를 복사했어요'); })
);
$('#copyLink').addEventListener('click', (e) => { heartRain(e.currentTarget); copy(location.href, '청첩장 링크를 복사했어요'); });

// ---------- 청첩장 사진으로 저장: 중요한 정보를 한 장의 이미지로 만들어 보여 주고 저장/공유 ----------
(() => {
  const modal = $('#saveModal'), img = $('#saveImg'), shareBtn = $('#saveShare');
  // 파일 이름은 영문으로 (한글 이름은 일부 휴대폰에서 '지원하지 않는 형식'으로 저장됨)
  const fileName = `wedding-${c.groom.englishName}-${c.bride.englishName}.jpg`.toLowerCase();
  let blob = null, url = '', busy = false;
  // 카카오톡 안 브라우저는 파일 저장이 막혀 있어서, 휴대폰 기본 브라우저로 여는 길을 함께 보여 줌
  const inKakao = /KAKAOTALK/i.test(navigator.userAgent);
  if (inKakao) {
    const out = $('#saveOut');
    out.hidden = false;
    out.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(location.href)}`;
  }
  $('#saveImage').addEventListener('click', async () => {
    if (busy) return;
    busy = true;
    toast('청첩장 이미지를 만드는 중이에요…');
    try {
      if (!blob) {
        const made = await makeInvitationImage({ c, w, dowKo: DOW_KO[dow], timeKo, photo: mainPhoto, groom, bride, cat });
        blob = made.blob;
        url = made.dataUrl;
        img.src = url;
        const file = new File([blob], fileName, { type: 'image/jpeg' });
        shareBtn.hidden = !(navigator.canShare && navigator.canShare({ files: [file] }));
      }
      $('#toast').classList.remove('show');
      modal.hidden = false;
      if (!history.state?.save) history.pushState({ save: 1 }, '');
      document.body.style.overflow = 'hidden';
    } catch (e) {
      toast('이미지를 만들지 못했어요. 화면을 캡처해 주세요');
    }
    busy = false;
  });
  const hide = () => { if (modal.hidden) return; modal.hidden = true; document.body.style.overflow = ''; };
  const close = () => { if (history.state?.save) history.back(); else hide(); };
  window.addEventListener('popstate', hide);
  $('#saveClose').addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  $('#saveDl').addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast(inKakao ? '카카오톡에서는 이미지를 길게 눌러 저장해 주세요' : '사진을 저장했어요. 안 되면 이미지를 길게 눌러 주세요');
  });
  // 휴대폰 공유창의 '이미지 저장'으로 사진첩에 바로 넣을 수 있음
  shareBtn.addEventListener('click', async () => {
    try { await navigator.share({ files: [new File([blob], fileName, { type: 'image/jpeg' })], title: c.meta.title }); } catch { /* 취소 */ }
  });
})();
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
$('#share').addEventListener('click', async (e) => {
  if (!reduceMotion) heartRain(e.currentTarget);
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

// ---------- 맨 위로: 두 사람과 고양이가 썰매를 타고 위로 슝 ----------
$('#toTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  if (reduceMotion) return;
  const s = document.createElement('div');
  s.className = 'sled';
  s.setAttribute('aria-hidden', 'true');
  s.innerHTML = `<div class="sled-riders">${groom()}${bride()}${cat('calico', 'sled-cat')}</div>
    <svg class="sled-base" viewBox="0 0 120 30"><path d="M8 8h96" stroke="#9C6B4E" stroke-width="5" stroke-linecap="round"/>
      <path d="M14 10v10M40 10v10M72 10v10M98 10v10" stroke="#7A5240" stroke-width="3"/>
      <path d="M4 22h96q14 0 16-12" stroke="#B9C7D3" stroke-width="3.4" fill="none" stroke-linecap="round"/></svg>`;
  document.body.appendChild(s);
  s.animate([
    { transform: 'translate(-50%, 0) rotate(-8deg)' },
    { transform: `translate(-50%, ${-(window.innerHeight + 220)}px) rotate(-14deg)` },
  ], { duration: 1500, easing: 'cubic-bezier(.45,0,.25,1)' }).finished.then(() => s.remove());
});

// ---------- 배경음악: 처음엔 꺼져 있고, 레코드판을 누르면 재생 (다시 누르면 멈춤) ----------
// music 폴더에 파일이 있으면 그 곡, 없으면 청첩장 전용 오르골 왈츠(musicbox.js)
if (bgm || fx.music !== false) {
  const b = document.createElement('button');
  b.className = 'bgm';
  b.type = 'button';
  b.setAttribute('aria-label', '배경음악 켜기');
  b.innerHTML = '<span class="vinyl" aria-hidden="true"></span><i class="bgm-note" aria-hidden="true">♪</i>';
  document.body.appendChild(b);
  const audio = new Audio();
  audio.loop = true;
  audio.volume = bgm ? 0.55 : 0.7;
  // 오르골 곡은 누르는 순간 바로 재생되도록 미리 만들어 둠 (휴대폰은 누른 직후에만 소리를 틀 수 있음)
  const ready = bgm ? Promise.resolve(bgm) : new Promise((ok) => setTimeout(ok, 1500)).then(renderMusicBox);
  ready.then((src) => { if (src) audio.src = src; else b.remove(); });
  b.addEventListener('click', async () => {
    if (audio.paused) {
      if (!audio.src) { toast('음악을 준비하고 있어요'); await ready; }
      try { await audio.play(); } catch { return; }
      b.classList.add('on');
      b.setAttribute('aria-label', '배경음악 끄기');
    } else {
      audio.pause();
      b.classList.remove('on');
      b.setAttribute('aria-label', '배경음악 켜기');
    }
  });
  // 다른 앱으로 나가면 잠시 멈춤
  document.addEventListener('visibilitychange', () => { if (document.hidden && !audio.paused) { audio.pause(); b.classList.remove('on'); } });
}
