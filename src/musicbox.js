// ============================================================
//  청첩장 전용 오르골 왈츠 (직접 작곡 · 저작권 걱정 없음)
//  바장조 3/4박자, 16마디(약 36초)를 휴대폰 안에서 소리로 만들어 반복 재생합니다.
//  → music 폴더에 mp3를 넣으면 그 곡이 대신 나와요.
// ============================================================

const SR = 22050, BPM = 80, BEAT = 60 / BPM, BARS = 16, LOOP = BARS * 3 * BEAT, TAIL = 3;
const hz = (m) => 440 * 2 ** ((m - 69) / 12);

// 마디별 화음: [베이스, [화음 세 음]]  F – C/E – Dm – B♭ – F/A – Gm – C – F
const PROG = [
  [53, [65, 69, 72]], [52, [64, 67, 72]], [50, [62, 65, 69]], [46, [62, 65, 70]],
  [45, [65, 69, 72]], [43, [62, 67, 70]], [48, [64, 67, 72]], [41, [65, 69, 72]],
];
const CHORDS = [...PROG, ...PROG.slice(0, 6), [48, [64, 67, 70]], PROG[7]];

// 멜로디: 마디마다 [음, 박자] — 앞 8마디는 잔잔하게, 뒤 8마디는 한 옥타브 위로 피어오르듯
const MELODY = [
  [[69, 1], [72, 1], [77, 1]], [[76, 2], [72, 1]], [[74, 1], [77, 1], [81, 1]], [[77, 2], [74, 1]],
  [[72, 1], [77, 1], [81, 1]], [[79, 1], [77, 1], [74, 1]], [[76, 2], [79, 1]], [[77, 3]],
  [[84, 1], [81, 1], [77, 1]], [[79, 2], [76, 1]], [[77, 1], [74, 1], [81, 1]], [[82, 2], [74, 1]],
  [[81, 1], [84, 1], [81, 1]], [[79, 1], [82, 1], [74, 1]], [[76, 1], [79, 1], [82, 1]], [[77, 3]],
];

// 사람이 친 것처럼 아주 조금씩 다르게 (매번 같은 결과가 나오도록 고정된 난수)
let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

function wav(samples) {
  const b = new DataView(new ArrayBuffer(44 + samples.length * 2));
  const str = (o, s) => [...s].forEach((ch, i) => b.setUint8(o + i, ch.charCodeAt(0)));
  str(0, 'RIFF'); b.setUint32(4, 36 + samples.length * 2, true); str(8, 'WAVE');
  str(12, 'fmt '); b.setUint32(16, 16, true); b.setUint16(20, 1, true); b.setUint16(22, 1, true);
  b.setUint32(24, SR, true); b.setUint32(28, SR * 2, true); b.setUint16(32, 2, true); b.setUint16(34, 16, true);
  str(36, 'data'); b.setUint32(40, samples.length * 2, true);
  samples.forEach((v, i) => b.setInt16(44 + i * 2, Math.max(-1, Math.min(1, v)) * 0x7fff, true));
  return new Blob([b], { type: 'audio/wav' });
}

// 곡을 만들어 반복 재생용 오디오 주소(blob URL)로 돌려줌
export async function renderMusicBox() {
  const OAC = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  if (!OAC) return null;
  const ctx = new OAC(1, Math.ceil((LOOP + TAIL) * SR), SR);

  // 은은한 잔향 (작은 홀에서 울리는 느낌)
  const ir = ctx.createBuffer(1, Math.floor(SR * 2.4), SR), d = ir.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (rnd() * 2 - 1) * Math.pow(1 - i / d.length, 3.2);
  const verb = ctx.createConvolver();
  verb.buffer = ir;
  const bus = ctx.createGain(), dry = ctx.createGain(), wet = ctx.createGain(), master = ctx.createGain();
  dry.gain.value = 0.8; wet.gain.value = 0.32; master.gain.value = 0.5;
  bus.connect(dry); bus.connect(verb); verb.connect(wet);
  dry.connect(master); wet.connect(master); master.connect(ctx.destination);

  // 오르골 음: 기음 + 맑은 배음, 톡 치고 서서히 사라짐
  const tine = (m, t, vel, len = 2.6) => {
    [[1, 1], [2, 0.3], [3.01, 0.11], [4.2, 0.045]].forEach(([k, a]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = hz(m) * k;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(vel * a, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + len * (k > 1 ? 0.45 : 1));
      o.connect(g); g.connect(bus);
      o.start(t); o.stop(t + len);
    });
  };
  // 뒤에 깔리는 부드러운 화음
  const pad = (ms, t, dur) => ms.forEach((m) => {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.value = hz(m - 12);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.012, t + 0.5);
    g.gain.linearRampToValueAtTime(0, t + dur + 0.4);
    o.connect(g); g.connect(bus);
    o.start(t); o.stop(t + dur + 0.5);
  });

  CHORDS.forEach(([bass, tones], bar) => {
    const t = bar * 3 * BEAT;
    tine(bass, t, 0.2, 3.2);
    tine(tones[0], t + BEAT, 0.08); tine(tones[1], t + BEAT, 0.07);
    tine(tones[1], t + 2 * BEAT, 0.07); tine(tones[2], t + 2 * BEAT, 0.07);
    pad(tones, t, 3 * BEAT);
    let b = 0;
    MELODY[bar].forEach(([m, beats]) => {
      const jitter = (rnd() - 0.5) * 0.016;
      tine(m, t + b * BEAT + Math.max(0, jitter), 0.3 + (rnd() - 0.5) * 0.06, beats > 1 ? 3.4 : 2.6);
      b += beats;
    });
  });

  const out = (await ctx.startRendering()).getChannelData(0);
  // 끝부분 울림을 처음에 겹쳐서 이음새 없이 반복되게
  const L = Math.floor(LOOP * SR), loop = out.slice(0, L);
  for (let i = 0; L + i < out.length; i++) loop[i] += out[L + i];
  let peak = 0;
  for (const v of loop) peak = Math.max(peak, Math.abs(v));
  const k = peak > 0 ? 0.85 / peak : 1;
  for (let i = 0; i < loop.length; i++) loop[i] *= k;
  return URL.createObjectURL(wav(loop));
}
