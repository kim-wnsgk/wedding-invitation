# 준하 ♥ 재은 모바일 청첩장

Vite로 만든 정적 웹사이트입니다. 서버나 DB 없이 HTML/CSS/JS 파일만으로 동작해서 무료 호스팅에 바로 올릴 수 있습니다.

## 폴더 구조

```
wedding-invitation/
├─ index.html        ← 탭 제목, 카카오톡 미리보기(og 태그), 폰트
├─ src/
│  ├─ config.js      ← ★ 이름·날짜·장소·오시는 길·계좌 등 내용 (대부분 여기만 수정)
│  ├─ style.css      ← 디자인 (색은 맨 위 :root 변수만 바꾸면 됨)
│  └─ main.js        ← 화면을 그리는 코드 (달력, D-day, 복사 버튼)
├─ public/           ← 사진 등 그대로 복사될 파일 (예: og-image.jpg)
├─ package.json
└─ vite.config.js
```

## 1. 준비

[Node.js](https://nodejs.org) 18 이상(LTS 버전 권장)을 설치하세요. 설치가 끝나면 터미널에서 확인합니다.

```bash
node -v   # v18 이상이면 OK
```

## 2. 실행해 보기 (개발 모드)

```bash
cd wedding-invitation
npm install      # 처음 한 번만
npm run dev
```

터미널에 나온 주소(보통 http://localhost:5173)를 브라우저로 여세요.
`src/config.js`나 `src/style.css`를 저장하면 화면이 바로 바뀝니다.

> 휴대폰에서 확인하려면 `npm run dev -- --host` 로 실행하고, 같은 와이파이에서 터미널에 나온 Network 주소로 접속하세요.

## 3. 내용 수정

- **글자 내용**은 `src/config.js`를 고치세요. 항목마다 주석이 달려 있습니다.
  - 날짜는 `wedding`의 year/month/day/hour 를 고치면 됩니다. 요일, 달력, D-day는 자동으로 계산됩니다.
  - 계좌를 추가하려면 `accounts.groom` / `accounts.bride` 배열에 `{ who, bank, number }` 한 줄을 추가하세요.
  - 계좌 섹션을 숨기려면 `accounts.show: false` 로 바꾸세요.
- **탭 제목과 카카오톡 미리보기 문구**는 `index.html`의 `<title>`과 `og:` 태그를 고치세요.
- **색상**은 `src/style.css` 맨 위 `:root` 변수를 고치세요. 예를 들어 `--rose`는 포인트 색, `--paper`는 바깥 배경색입니다.

## 4. 빌드

```bash
npm run build     # dist/ 폴더에 배포용 파일 생성
npm run preview   # 빌드 결과를 로컬에서 확인 (http://localhost:4173)
```

`dist/` 폴더 안의 파일이 실제로 올릴 웹사이트입니다.

## 5. 배포 (무료, 셋 중 하나만 고르세요)

### A. Netlify Drop (가장 쉬움, 가입만 하면 됨)

1. `npm run build`를 실행합니다.
2. https://app.netlify.com/drop 에 접속해서 `dist` 폴더를 끌어다 놓습니다.
3. 주소가 바로 생깁니다. Site settings에서 주소 이름을 `junha-jaeeun` 같은 이름으로 바꿀 수 있습니다.

### B. Vercel

1. 이 폴더를 GitHub 저장소에 올립니다.
2. https://vercel.com 에서 저장소를 Import 합니다. Framework는 Vite가 자동으로 잡힙니다.
3. 이후 GitHub에 push할 때마다 자동으로 다시 배포됩니다.

### C. GitHub Pages

1. `npm run build`를 실행합니다.
2. `dist` 폴더의 내용을 `gh-pages` 브랜치에 올립니다. `npx gh-pages -d dist` 한 줄이면 됩니다.
3. 저장소의 Settings → Pages에서 Branch를 `gh-pages`로 지정합니다.

## 6. 카카오톡 미리보기 사진 넣기 (선택)

1. 대표 사진을 `public/og-image.jpg`로 넣습니다. 가로 1200 × 세로 630px 정도를 권장합니다.
2. `index.html`에서 주석 처리된 `og:image` 줄을 풀고, 배포된 주소로 바꿉니다.
   예: `https://junha-jaeeun.netlify.app/og-image.jpg`
3. 다시 빌드하고 배포합니다.
4. 카카오톡에 예전 미리보기가 남아 있다면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 초기화하세요.

## 참고

- 오시는 길(셔틀 간격, 무료 주차 시간)은 인터넷 후기를 참고한 내용입니다. 계약 시 웨딩홀에서 한 번 더 확인하세요.
- 계좌번호는 현재 임시값(ABC은행 123456789)입니다. 배포 전에 꼭 바꿔 주세요.
