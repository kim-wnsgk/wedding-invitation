// ============================================================
//  청첩장을 한 장짜리 이미지로 그리기 (캔버스)
//  대표 사진 · 이름 · 날짜와 시간 · 예식장과 주소 · 부모님 · 캐릭터
// ============================================================

const W = 1080, H = 2050;
const INK = '#2E2B38', MUTED = '#6B6775', ROSE = '#A8616E', GOLD = '#B8894F', PAPER = '#FFFEFC';

const loadImg = (src) => new Promise((ok, fail) => {
  const im = new Image();
  im.onload = () => ok(im);
  im.onerror = fail;
  im.src = src;
});
// 캐릭터 SVG 문자열 → 그림
const svgImg = (svg) => loadImg(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" '))}`);

// 글자 사이를 띄워 가운데 정렬로 쓰기
function spaced(ctx, text, x, y, gap) {
  const chars = [...text], widths = chars.map((ch) => ctx.measureText(ch).width);
  let cx = x - (widths.reduce((a, b) => a + b, 0) + gap * (chars.length - 1)) / 2;
  ctx.textAlign = 'left';
  chars.forEach((ch, i) => { ctx.fillText(ch, cx, y); cx += widths[i] + gap; });
  ctx.textAlign = 'center';
}

export async function makeInvitationImage({ c, w, dow, dowKo, timeKo, photo, groom, bride, cat, siteUrl }) {
  const ko = '"Noto Serif KR", serif', name = '"Cormorant Garamond", "Playfair Display", serif', en = '"Playfair Display", serif';
  // 캔버스에 쓸 글꼴을 미리 불러 둠 (한글은 쓰는 글자만)
  const allKo = [c.groom.name, c.bride.name, c.venue.name, c.venue.address, c.groom.father, c.groom.mother, c.bride.father, c.bride.mother,
    `${dowKo}요일 ${timeKo}`, '의 아들 딸 · 소중한 분들을 초대합니다', c.groom.relation, c.bride.relation].join('');
  await Promise.all([
    document.fonts.load(`500 40px ${ko}`, allKo), document.fonts.load(`700 40px ${ko}`, allKo),
    document.fonts.load(`600 90px ${name}`, 'Junha&Jaeeun'), document.fonts.load(`italic 500 80px ${name}`, '&'),
    document.fonts.load(`500 80px ${en}`, '0123456789. THEWDGOF'),
  ].map((p) => p.catch(() => null)));

  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, W, H);

  // ① 대표 사진 (위쪽 가득, 아래로 갈수록 종이색에 녹아듦)
  const PH = 1000;
  if (photo) {
    try {
      const im = await loadImg(photo);
      const s = Math.max(W / im.width, PH / im.height), dw = im.width * s, dh = im.height * s;
      // 사진 영역 밖으로 넘치지 않게 잘라서 그림
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, W, PH);
      ctx.clip();
      ctx.drawImage(im, (W - dw) / 2, (PH - dh) * 0.3, dw, dh);
      ctx.restore();
    } catch { /* 사진을 못 불러오면 하늘색 바탕만 */ }
  } else {
    const sky = ctx.createLinearGradient(0, 0, 0, PH);
    sky.addColorStop(0, '#D9E3EB');
    sky.addColorStop(1, PAPER);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, PH);
  }
  const fade = ctx.createLinearGradient(0, PH - 380, 0, PH + 10);
  fade.addColorStop(0, 'rgba(255,254,252,0)');
  fade.addColorStop(0.6, 'rgba(255,254,252,.75)');
  fade.addColorStop(1, PAPER);
  ctx.fillStyle = fade;
  ctx.fillRect(0, PH - 380, W, 400);
  // 사진 위로 흩날리는 눈
  for (let i = 0; i < 90; i++) {
    const x = Math.random() * W, y = Math.random() * (PH - 120), r = 1.5 + Math.random() * 4;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.5 + Math.random() * 0.45})`;
    ctx.fill();
  }

  // ② 글자
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  let y = PH + 30;
  ctx.fillStyle = GOLD;
  ctx.font = `500 28px ${en}`;
  spaced(ctx, 'THE WEDDING OF', W / 2, y, 9);

  y += 110;
  ctx.font = `600 96px ${name}`;
  const g = c.groom.englishName, b = c.bride.englishName;
  ctx.font = `600 96px ${name}`;
  const gw = ctx.measureText(g).width, bw = ctx.measureText(b).width;
  ctx.font = `italic 500 78px ${name}`;
  const aw = ctx.measureText('&').width + 44;
  let x = W / 2 - (gw + aw + bw) / 2;
  ctx.textAlign = 'left';
  ctx.fillStyle = INK;
  ctx.font = `600 96px ${name}`;
  ctx.fillText(g, x, y);
  ctx.fillStyle = GOLD;
  ctx.font = `italic 500 78px ${name}`;
  ctx.fillText('&', x + gw + 22, y - 4);
  ctx.fillStyle = INK;
  ctx.font = `600 96px ${name}`;
  ctx.fillText(b, x + gw + aw, y);
  ctx.textAlign = 'center';

  y += 70;
  ctx.font = `500 40px ${ko}`;
  ctx.fillStyle = INK;
  spaced(ctx, `${c.groom.name}  ·  ${c.bride.name}`, W / 2, y, 4);

  y += 52;
  ctx.fillStyle = ROSE;
  ctx.globalAlpha = 0.55;
  ctx.fillRect(W / 2 - 36, y, 72, 2);
  ctx.globalAlpha = 1;

  y += 108;
  ctx.fillStyle = INK;
  ctx.font = `500 86px ${en}`;
  spaced(ctx, `${w.year}. ${String(w.month).padStart(2, '0')}. ${String(w.day).padStart(2, '0')}`, W / 2, y, 6);

  y += 70;
  ctx.font = `700 46px ${ko}`;
  ctx.fillText(`${dowKo}요일 ${timeKo}`, W / 2, y);

  // 예식장 (핀) · 주소
  y += 74;
  ctx.font = `700 42px ${ko}`;
  const vw = ctx.measureText(c.venue.name).width;
  const px = W / 2 - vw / 2 - 26;
  ctx.fillStyle = ROSE;
  ctx.beginPath();
  ctx.moveTo(px, y + 2);
  ctx.bezierCurveTo(px - 16, y - 18, px - 16, y - 38, px, y - 38);
  ctx.bezierCurveTo(px + 16, y - 38, px + 16, y - 18, px, y + 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(px, y - 25, 5.5, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = INK;
  ctx.fillText(c.venue.name, W / 2 + 10, y);
  y += 52;
  ctx.font = `500 32px ${ko}`;
  ctx.fillStyle = MUTED;
  ctx.fillText(c.venue.address, W / 2, y);

  // 부모님
  y += 82;
  ctx.font = `500 32px ${ko}`;
  for (const [p, rel, nm] of [[c.groom, '아들', c.groom.name], [c.bride, '딸', c.bride.name]]) {
    const left = `${p.father} · ${p.mother}`, mid = `의 ${p.relation.trim() || rel}`;
    ctx.font = `500 32px ${ko}`;
    const lw = ctx.measureText(left).width;
    ctx.font = `500 26px ${ko}`;
    const mw = ctx.measureText(mid).width;
    ctx.font = `700 32px ${ko}`;
    const nw = ctx.measureText(nm).width;
    let sx = W / 2 - (lw + mw + nw + 40) / 2;
    ctx.textAlign = 'left';
    ctx.font = `500 32px ${ko}`; ctx.fillStyle = INK; ctx.fillText(left, sx, y); sx += lw + 20;
    ctx.font = `500 26px ${ko}`; ctx.fillStyle = MUTED; ctx.fillText(mid, sx, y); sx += mw + 20;
    ctx.font = `700 32px ${ko}`; ctx.fillStyle = INK; ctx.fillText(nm, sx, y);
    ctx.textAlign = 'center';
    y += 50;
  }

  // ③ 두 사람과 고양이들
  try {
    const [gi, bi, ...cats] = await Promise.all([svgImg(groom()), svgImg(bride()),
      ...['whiteLong', 'tortie', 'cheeseTabby', 'yellowSpot1', 'yellowSpot2', 'calico', 'cow', 'black'].map((k) => svgImg(cat(k)))]);
    const base = H - 130;
    ctx.drawImage(gi, W / 2 - 92, base - 150, 84, 134);
    ctx.drawImage(bi, W / 2 + 8, base - 150, 84, 134);
    ctx.fillStyle = ROSE;
    ctx.font = `28px ${ko}`;
    ctx.fillText('♥', W / 2, base - 92);
    const cw = 74, ch = 67, gap = 14;
    const rowW = cats.length * cw + gap;
    cats.forEach((im, i) => ctx.drawImage(im, W / 2 - rowW / 2 + i * cw + (i >= 3 ? gap : 0), base - ch + 30, cw, ch));
  } catch { /* 캐릭터 없이 */ }

  // ④ 테두리 · 주소
  ctx.strokeStyle = 'rgba(168,97,110,.28)';
  ctx.lineWidth = 2;
  ctx.strokeRect(28, 28, W - 56, H - 56);
  if (siteUrl) {
    ctx.font = `500 24px ${en}`;
    ctx.fillStyle = MUTED;
    ctx.fillText(siteUrl.replace(/^https?:\/\//, '').replace(/\/$/, ''), W / 2, H - 56);
  }

  return new Promise((ok) => cv.toBlob(ok, 'image/jpeg', 0.92));
}
