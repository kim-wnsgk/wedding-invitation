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

```bash
npm run deploy
```

이 한 줄이 빌드(`vite build`)를 하고 `dist` 폴더를 `gh-pages` 브랜치에 올립니다. 내용을 고칠 때마다 다시 실행하면 됩니다.

처음 한 번만, 저장소의 Settings → Pages에서 Source는 `Deploy from a branch`, Branch는 `gh-pages` / `/(root)`로 지정하세요.
주소는 `https://<아이디>.github.io/<저장소 이름>/` 입니다.

> `npm run deploy`는 사이트만 올립니다. 소스 코드 변경 사항은 따로 `git add` → `git commit` → `git push` 해 주세요.

## 6. 사진 넣기

`photos/` 폴더에 사진 파일만 넣으면 됩니다. 원본을 그대로 넣어도 빌드할 때 휴대폰에 맞게 줄여 줍니다.

| 폴더 | 쓰이는 곳 |
| --- | --- |
| `photos/main/` | 첫 화면 아치 액자 대표 사진 (이름순 첫 번째 1장) |
| `photos/gallery/` | 갤러리 (이름순, `01.jpg`, `02.jpg` … 처럼 이름 붙이면 순서 지정) |
| `photos/kakao/` | (선택) 카카오톡 미리보기 전용 가로 사진 |

- jpg, jpeg, png, webp를 지원합니다. 아이폰 HEIC 사진은 jpg로 바꿔서 넣으세요.
- 폴더가 비어 있으면 해당 부분은 화면에 나오지 않습니다.

### 카카오톡 미리보기 사진

링크를 보낼 때 보이는 미리보기 사진은 빌드할 때 자동으로 만들어집니다. `photos/main/` 사진을 1200×630으로 잘라 `og-image.jpg`로 저장합니다.

- `photos/kakao/`에 사진이 있으면 그 사진을 대신 씁니다.
- 주소는 `src/config.js`의 `siteUrl`로 만들어지니, 배포 주소가 바뀌면 그 값도 바꾸세요.
- 카카오톡에 예전 미리보기가 남아 있다면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 초기화하세요.

## 7. 카카오톡 공유하기 버튼 (선택)

카카오톡 안에서 열린 청첩장은 휴대폰 공유창을 지원하지 않습니다. 그래서 '공유하기'를 누르면 링크 복사만 됩니다. 카카오 앱 키를 넣으면 카카오톡 친구·단톡방을 바로 고르는 공유 화면이 뜹니다.

1. https://developers.kakao.com 에 카카오 계정으로 로그인하고, **내 애플리케이션 → 애플리케이션 추가하기**로 앱을 만듭니다. 앱 이름은 아무거나 쓰면 됩니다.
2. **앱 키**에서 **JavaScript 키**를 복사해 `src/config.js`의 `kakao.jsKey`에 붙여 넣습니다.
3. **플랫폼 → Web**(또는 JavaScript SDK 도메인)에 아래 두 주소를 등록합니다.
   - `https://kim-wnsgk.github.io` (배포 주소)
   - `http://localhost:5173` (내 컴퓨터에서 확인용)
4. 다시 배포합니다.

앱 키가 비어 있으면 휴대폰 공유창이 뜨고, 그것도 안 되는 곳에서는 링크 복사로 동작합니다.

## 8. 참석 여부 · 방명록 (Firebase 무료 요금제)

하객이 보낸 참석 여부와 방명록은 Google Firebase의 Firestore에 저장됩니다. **무료(Spark) 요금제**로 충분하고 카드 등록도 필요 없습니다.

| 무료 한도 (하루) | 청첩장 기준 |
| --- | --- |
| 읽기 50,000회 | 방명록은 한 번에 최대 60개를 읽음 → 하루 800명 넘게 봐도 괜찮음 |
| 쓰기 20,000회 | 참석 여부·방명록 한 건 = 1회 |
| 저장 1GB | 글 수만 개를 써도 수 MB |

`src/config.js`의 `firebase` 값이 비어 있으면 두 섹션은 화면에 나오지 않습니다. 설정 전에 모양을 보고 싶으면 `npm run dev` 후 주소 끝에 `?demo`를 붙이세요(이 브라우저에만 저장되는 미리보기).

### 설정 순서 (처음 한 번, 10분 정도)

1. https://console.firebase.google.com 에 Google 계정으로 로그인 → **프로젝트 추가** (이름 예: `junha-jaeeun-wedding`, Google 애널리틱스는 꺼도 됨)
2. 프로젝트 화면에서 **웹 앱 추가(`</>` 아이콘)** → 앱 이름 입력 → 등록하면 나오는 `firebaseConfig`에서 `apiKey`, `authDomain`, `projectId`, `appId` 네 값을 `src/config.js`의 `firebase`에 붙여 넣기
3. 왼쪽 메뉴 **빌드 → Firestore Database → 데이터베이스 만들기**
   - 위치: `asia-northeast3 (서울)`
   - **프로덕션 모드**로 시작
4. Firestore의 **규칙(Rules)** 탭에서 내용을 모두 지우고, 이 폴더의 `firestore.rules` 파일 내용을 붙여 넣은 뒤 **게시**
5. `npm run deploy`로 다시 배포

> `apiKey`는 이름과 달리 비밀번호가 아니라 공개돼도 괜찮은 값입니다. 하객이 할 수 있는 일은 4번의 규칙으로 막아 둡니다:
> 하객이 보내는 글의 형식(이름·글자 수 등)과 수정 금지를 규칙으로 지킵니다.

### 신랑·신부 관리 페이지 (`주소?admin`)

청첩장 주소 끝에 `?admin`을 붙이면(예: `https://kim-wnsgk.github.io/wedding-invitation/?admin`) 관리 페이지가 열립니다. 비밀번호(`0220`)를 넣으면 참석 인원 통계·응답 목록·엑셀(CSV) 받기, 공개/비공개 방명록 보기, 삭제를 할 수 있어요. 한 번 들어가면 그 기기에서는 기억합니다('잠그기'로 해제).

- 처음 한 번, Firestore 규칙 탭에 `firestore.rules` 내용을 다시 붙여 넣고 **게시**해야 관리 페이지에서 읽고 지울 수 있어요.
- 비밀번호를 바꾸려면 터미널에서 `node -e "console.log(require('crypto').createHash('sha256').update('새비밀번호').digest('hex'))"` 로 나온 값을 `src/admin.js`의 `PASS_HASH`에 넣고 다시 배포하세요.
- ⚠️ 이 비밀번호는 화면만 가리는 간단한 잠금이에요. 규칙에서 읽기·삭제를 열어 두었기 때문에, 코드를 분석할 줄 아는 사람은 비밀번호 없이도 참석 명단을 보거나 지울 수 있습니다. (두 분이 감수하기로 한 부분)
- `?admin&demo`로 열면 이 브라우저의 미리보기 데이터로 화면을 확인할 수 있어요.

### 사용량 보호

- 무료(Spark) 요금제는 카드가 없어서 **요금이 나오지 않습니다.** 누가 일부러 사용량을 다 써도 그날 하루 방명록이 멈추는 정도이고, 다음 날(한국 시간 오후 4~5시) 초기화됩니다.
- 방명록은 처음에 12개만 불러오고, 5분 동안은 다시 읽지 않습니다(새로고침해도 기억해 둔 것 사용).
- 장난 글은 관리 페이지에서 지우면 됩니다.

### 모인 내용 보기 · 관리

- **참석 여부**: Firebase 콘솔 → Firestore Database → `rsvp` 모음. 항목마다 `side`(groom 신랑측/bride 신부측), `name`, `attend`(true 참석), `count`(인원), `meal`(yes/no/unknown), `note`가 있습니다.
- **방명록**: `guestbook` 모음. 부적절한 글은 콘솔에서 해당 문서를 삭제하면 바로 사라집니다.

## 참고

- 오시는 길(셔틀 간격, 무료 주차 시간)은 인터넷 후기를 참고한 내용입니다. 계약 시 웨딩홀에서 한 번 더 확인하세요.
