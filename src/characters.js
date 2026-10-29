// ============================================================
//  두 사람과 고양이 여덟 마리 캐릭터 (SVG)
//  → 사진을 바탕으로 그린 귀여운 2등신 캐릭터입니다.
//  → 고양이 무늬는 CATS 목록에서 바꿀 수 있어요.
// ============================================================

const SKIN = '#F8DCC8', BLUSH = '#F4A6A6', EYE = '#2A2224', MOUTH = '#A0574F';
let uid = 0;

// 얼굴 공통: 눈(깜빡임) · 볼터치 · 웃는 입
const face = (cx, cy) => `
  <g class="eyes">
    <ellipse cx="${cx - 4}" cy="${cy + 1.5}" rx="1.15" ry="1.55" fill="${EYE}"/>
    <ellipse cx="${cx + 4}" cy="${cy + 1.5}" rx="1.15" ry="1.55" fill="${EYE}"/>
  </g>
  <ellipse cx="${cx - 6.6}" cy="${cy + 4.6}" rx="2" ry="1.1" fill="${BLUSH}" opacity=".6"/>
  <ellipse cx="${cx + 6.6}" cy="${cy + 4.6}" rx="2" ry="1.1" fill="${BLUSH}" opacity=".6"/>
  <path d="M${cx - 1.7} ${cy + 5.2}q1.7 1.6 3.4 0" stroke="${MOUTH}" stroke-width=".9" stroke-linecap="round" fill="none"/>`;

// ---------- 신랑: 검은 머리(옆으로 넘긴 앞머리) · 검은 턱시도 · 나비넥타이 ----------
export function groom(cls = '') {
  return `<svg class="ch ch-groom ${cls}" viewBox="0 0 40 64" aria-hidden="true">
    <g class="leg leg-l"><rect x="14.2" y="47" width="5" height="12.5" rx="2" fill="#26242C"/><ellipse cx="16.2" cy="60.4" rx="3.6" ry="1.8" fill="#141217"/></g>
    <g class="leg leg-r"><rect x="20.8" y="47" width="5" height="12.5" rx="2" fill="#26242C"/><ellipse cx="23.8" cy="60.4" rx="3.6" ry="1.8" fill="#141217"/></g>
    <g class="arm arm-l"><path d="M11.5 31q-3.6 7-2.4 14" stroke="#2C2A33" stroke-width="4.6" stroke-linecap="round" fill="none"/><circle cx="9.2" cy="45.6" r="2.3" fill="${SKIN}"/></g>
    <g class="arm arm-r"><path d="M28.5 31q3.6 7 2.4 14" stroke="#2C2A33" stroke-width="4.6" stroke-linecap="round" fill="none"/><circle cx="30.8" cy="45.6" r="2.3" fill="${SKIN}"/></g>
    <path d="M11 30.5q9-5.2 18 0l1.6 18.5H9.4z" fill="#2C2A33"/>
    <path d="M17 27.2h6l-3 12.5z" fill="#FFFFFF"/>
    <path d="M20 39.7l-1.4-6.6M20 39.7l1.4-6.6" stroke="#1B1A20" stroke-width=".6"/>
    <path d="M17.1 28.4l2.9 1.5-2.9 1.5zM22.9 28.4L20 29.9l2.9 1.5z" fill="#121116"/>
    <rect x="18.2" y="24.5" width="3.6" height="3.4" fill="${SKIN}"/>
    <circle cx="9.7" cy="17.2" r="2" fill="${SKIN}"/><circle cx="30.3" cy="17.2" r="2" fill="${SKIN}"/>
    <circle cx="20" cy="15.8" r="10.4" fill="${SKIN}"/>
    <path d="M9.5 16.4C8.8 7.6 14.6 3.6 21 3.8c6.6.3 10.6 4.8 9.8 11.6-1.5-3.3-4.4-5.1-8-5.6 1 1.7.9 3.1.2 4.1-2.4-2.9-6.7-4.3-10.7-3.4-1.3.7-2.3 2.4-2.8 5.9z" fill="#1F1B1D"/>
    ${face(20, 16)}
  </svg>`;
}

// ---------- 신부: 높게 묶은 갈색 머리 · 오프숄더 흰 드레스 · 분홍 부케 ----------
export function bride(cls = '') {
  return `<svg class="ch ch-bride ${cls}" viewBox="0 0 40 64" aria-hidden="true">
    <g class="dress"><path d="M14.6 33h10.8l9.4 26.6q-14.8 3.4-29.6 0z" fill="#FFFFFF" stroke="#D8CDD3" stroke-width=".8"/>
      <path d="M12 58.4q4 1.6 8 0M20 58.4q4 1.6 8 0" stroke="#E6DDE2" stroke-width=".7" fill="none"/></g>
    <path d="M12.6 29.4q7.4-3.6 14.8 0" stroke="${SKIN}" stroke-width="3.4" stroke-linecap="round" fill="none"/>
    <path d="M13.4 29.6q6.6-1.8 13.2 0l-1.2 5.6h-10.8z" fill="#FFFFFF" stroke="#D8CDD3" stroke-width=".8"/>
    <g class="arm arm-l"><path d="M12.8 30.6q.6 6 5.4 7.6" stroke="${SKIN}" stroke-width="3.3" stroke-linecap="round" fill="none"/></g>
    <g class="arm arm-r"><path d="M27.2 30.6q-.6 6-5.4 7.6" stroke="${SKIN}" stroke-width="3.3" stroke-linecap="round" fill="none"/></g>
    <g class="bouquet">
      <path d="M17 41l3-3 3 3" stroke="#8DAF8A" stroke-width="1.4" fill="none"/>
      <circle cx="17.4" cy="37.2" r="2.4" fill="#F2B6C4"/><circle cx="22.6" cy="37.2" r="2.4" fill="#F7D3DC"/>
      <circle cx="20" cy="35.4" r="2.6" fill="#E890A8"/><circle cx="20" cy="38.6" r="2.1" fill="#FBE4EA"/>
    </g>
    <rect x="18.3" y="24.5" width="3.4" height="3.2" fill="${SKIN}"/>
    <circle cx="20" cy="4.6" r="4.6" fill="#4A322A"/>
    <circle cx="23.6" cy="6.2" r="1.1" fill="#FFFFFF"/>
    <circle cx="20" cy="15.8" r="10.4" fill="${SKIN}"/>
    <path d="M9.6 17.6c-.8-7.6 4.4-12.8 10.6-12.8 6.4 0 11.2 5 10.2 12.6-2-4.2-5.6-6.8-10-7.4-4 .6-7.6 3.2-10.8 7.6z" fill="#4A322A"/>
    <path d="M9.8 16.6q-.4 4.6 1.6 7.2M30.2 16.6q.4 4.6-1.6 7.2" stroke="#4A322A" stroke-width="1.6" stroke-linecap="round" fill="none"/>
    ${face(20, 16)}
  </svg>`;
}

// ---------- 고양이: 앉아 있는 모습, 무늬별로 다르게 ----------
// base 바탕색, tail 꼬리색, patches [색, cx, cy, rx, ry], stripes 줄무늬색, long 장모, eye 눈색
export const CATS = {
  // 신부 고양이 다섯
  yellowSpot1: { base: '#FFFDF8', tail: '#F3C77A', patches: [['#F3C77A', 16, 8, 6, 4.2], ['#F3C77A', 28, 27, 6, 4.4]] },
  yellowSpot2: { base: '#FFFDF8', tail: '#FFFDF8', patches: [['#F3C77A', 28, 9, 5.6, 4.6], ['#F3C77A', 15, 30, 5, 4]] },
  calico: { base: '#FFFDF8', tail: '#2F2A2D', patches: [['#E9A04B', 15.5, 9.5, 6, 5], ['#2F2A2D', 28.5, 10.5, 5, 4.6], ['#E9A04B', 28.5, 29, 6, 5], ['#2F2A2D', 14.5, 27, 4, 4]] },
  cow: { base: '#FFFFFF', tail: '#262327', patches: [['#262327', 27.5, 9.5, 7, 5.2], ['#262327', 16, 28, 6, 5], ['#262327', 30, 33, 3, 2.2]] },
  black: { base: '#2B2830', tail: '#2B2830', patches: [], eye: '#E8C547', inner: '#6B5560' },
  // 신랑 고양이 셋
  whiteLong: { base: '#FFFFFF', tail: '#FFFFFF', patches: [], long: true },
  tortie: { base: '#3A2C2A', tail: '#3A2C2A', inner: '#7A5550',
    patches: [['#C98443', 17, 9, 3.2, 2.4], ['#E2A35C', 26.5, 12.5, 2.6, 1.8], ['#C98443', 29, 25, 3.4, 2.6], ['#E2A35C', 15.5, 31, 3, 2.2], ['#C98443', 22, 32.5, 2.4, 1.6], ['#FFF6EC', 22, 25, 3, 2.2]] },
  cheeseTabby: { base: '#F0B66A', tail: '#F0B66A', stripes: '#D48A3A', patches: [['#FBE3BE', 22, 27, 5, 6]] },
};

export function cat(kind, cls = '') {
  const k = CATS[kind] || CATS.calico, id = `cat${++uid}`;
  const dark = k.base === '#2B2830' || k.base === '#3A2C2A';
  const line = dark ? 'rgba(0,0,0,.25)' : '#CFC4C9';
  const silhouette = 'M13 30.5a9 8 0 0 0 18 0 9 8 0 0 0-18 0ZM13 15a9 9 0 1 0 18 0 9 9 0 1 0-18 0ZM14.5 10 15.5 2.5 20.5 7.5ZM29.5 10 28.5 2.5 23.5 7.5Z';
  const stripes = k.stripes
    ? `<path d="M19.5 7.5l.6 3.6M22 7l0 3.8M24.5 7.5l-.6 3.6M13.5 26q3 1.2 3.6 4M30.5 26q-3 1.2-3.6 4M15 33q2 .6 3 2.4M29 33q-2 .6-3 2.4" stroke="${k.stripes}" stroke-width="1.5" stroke-linecap="round" fill="none"/>`
    : '';
  const fluff = k.long
    ? `<g fill="${k.base}" stroke="${line}" stroke-width=".7">${[[14, 22], [17, 24], [22, 24.8], [27, 24], [30, 22]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g>
       <path d="M12.6 16.5l-2.4 1.4 2.6 1M31.4 16.5l2.4 1.4-2.6 1" stroke="${line}" stroke-width=".7" fill="${k.base}"/>`
    : '';
  return `<svg class="cat ${cls}" viewBox="0 0 44 40" aria-hidden="true" style="--blink:${(Math.random() * 4).toFixed(1)}s;--wag:${(Math.random() * 1.5).toFixed(1)}s">
    <defs><clipPath id="${id}"><path d="${silhouette}"/></clipPath></defs>
    <path class="tail" d="M30 33q11 1 9.4-10.6" stroke="${line}" stroke-width="${k.long ? 8.4 : 5.4}" stroke-linecap="round" fill="none"/>
    <path class="tail" d="M30 33q11 1 9.4-10.6" stroke="${k.tail}" stroke-width="${k.long ? 7 : 4}" stroke-linecap="round" fill="none"/>
    <g clip-path="url(#${id})">
      <rect width="44" height="40" fill="${k.base}"/>
      ${k.patches.map(([c, x, y, rx, ry]) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${c}"/>`).join('')}
      ${stripes}
    </g>
    <path d="${silhouette}" fill="none" stroke="${line}" stroke-width=".8"/>
    ${fluff}
    <path d="M16 8.6 16.4 4.6 19 7.4ZM28 8.6 27.6 4.6 25 7.4Z" fill="${k.inner || '#F5BFC8'}"/>
    <ellipse cx="18.6" cy="36.6" rx="2.6" ry="1.6" fill="${k.base}" stroke="${line}" stroke-width=".7"/>
    <ellipse cx="25.4" cy="36.6" rx="2.6" ry="1.6" fill="${k.base}" stroke="${line}" stroke-width=".7"/>
    <g class="eyes">
      <ellipse cx="18.4" cy="15.4" rx="${k.eye ? 1.6 : 1.1}" ry="1.6" fill="${k.eye || EYE}"/>
      <ellipse cx="25.6" cy="15.4" rx="${k.eye ? 1.6 : 1.1}" ry="1.6" fill="${k.eye || EYE}"/>
      ${k.eye ? `<ellipse cx="18.4" cy="15.4" rx=".45" ry="1.3" fill="#1A1719"/><ellipse cx="25.6" cy="15.4" rx=".45" ry="1.3" fill="#1A1719"/>` : ''}
    </g>
    <path d="M21.2 18.4h1.6l-.8 1z" fill="#E98C9C"/>
    <path d="M22 19.4q-.8 1.2-1.9.8M22 19.4q.8 1.2 1.9.8" stroke="${dark ? '#9C8C92' : '#8A7378'}" stroke-width=".6" fill="none" stroke-linecap="round"/>
    <path d="M15.8 18.6l-4.2-.6M15.8 19.8l-4 .8M28.2 18.6l4.2-.6M28.2 19.8l4 .8" stroke="${dark ? 'rgba(255,255,255,.4)' : 'rgba(120,105,110,.45)'}" stroke-width=".45"/>
  </svg>`;
}
