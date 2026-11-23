const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index.esm-u7CesS3D.js","./index.esm2017-DD_ESRGu.js","./index.esm-B9QTirS6.js"])))=>i.map(i=>d[i]);
import{_ as A,c as $}from"./config-mrYz-h87.js";const l=(e,t=document)=>t.querySelector(e),d=e=>String(e??"").replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),v=l("#admin"),S=new URLSearchParams(location.search).has("demo"),_={groom:"신랑측",bride:"신부측"},f={yes:"식사함",no:"식사 안 함",unknown:"식사 미정","":""},h="42ca2cc50238a49486ffbdacfe7229988db5049c4bb1c5f1de26fdb0883a48a0",y="admin-ok",D=async e=>[...new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(e)))].map(t=>t.toString(16).padStart(2,"0")).join(""),R=()=>{try{return localStorage.getItem(y)===h}catch{return!1}},E=e=>{try{e?localStorage.setItem(y,h):localStorage.removeItem(y)}catch{}},L=e=>e.toLocaleString("ko-KR",{month:"numeric",day:"numeric",hour:"numeric",minute:"2-digit"});async function j(){const[{initializeApp:e},t]=await Promise.all([A(()=>import("./index.esm-u7CesS3D.js"),__vite__mapDeps([0,1]),import.meta.url),A(()=>import("./index.esm-B9QTirS6.js"),__vite__mapDeps([2,1]),import.meta.url)]),a=t.getFirestore(e($.firebase));return{list:async s=>(await t.getDocs(t.query(t.collection(a,s),t.orderBy("createdAt","desc")))).docs.map(c=>{var m,w;return{id:c.id,...c.data(),createdAt:((w=(m=c.data().createdAt)==null?void 0:m.toDate)==null?void 0:w.call(m))||new Date}}),remove:(s,i)=>t.deleteDoc(t.doc(a,s,i))}}function I(){const e={rsvp:"demo-rsvp",guestbook:"demo-guestbook",guestbook_private:"demo-guestbook-private"},t=n=>{try{return JSON.parse(localStorage.getItem(n)||"[]")}catch{return[]}},a=(n,s)=>{try{localStorage.setItem(n,JSON.stringify(s))}catch{}};if(!t(e.rsvp).length){const n=Date.now();a(e.rsvp,[{side:"groom",name:"예시 친구",attend:!0,count:2,meal:"yes",note:"부부 같이 갈게요",createdAt:n-72e5},{side:"bride",name:"예시 동료",attend:!0,count:1,meal:"unknown",note:"",createdAt:n-36e5},{side:"bride",name:"예시 친척",attend:!1,count:0,meal:"",note:"해외라 못 가요. 축하해!",createdAt:n-6e5}])}return{demo:!0,list:async n=>t(e[n]).map(s=>({...s,id:String(s.createdAt),createdAt:new Date(s.createdAt)})).sort((s,i)=>i.createdAt-s.createdAt),remove:async(n,s)=>a(e[n],t(e[n]).filter(i=>String(i.createdAt)!==s))}}const u=(e="")=>`<header class="ad-head">
  <div><small>Admin</small><b>${d($.groom.firstName)} <em>&amp;</em> ${d($.bride.firstName)}</b></div>${e}</header>`;function p(e){v.innerHTML=e}function k(e,t=""){p(`${u()}<main class="ad-login">
    <p>참석 여부와 방명록을 보고 관리하는<br>신랑·신부 전용 페이지예요.</p>
    <form id="pw" class="ad-pw">
      <input type="password" inputmode="numeric" autocomplete="current-password" placeholder="비밀번호" aria-label="비밀번호" required>
      <button class="ad-btn ad-google">들어가기</button>
    </form>
    ${t?`<p class="ad-err">${t}</p>`:""}
  </main>`);const a=l("#pw"),n=l("input",a);n.focus(),a.onsubmit=async s=>{s.preventDefault(),await D(n.value.trim())===h?(E(!0),b(e)):k(e,"비밀번호가 맞지 않아요.")}}const o={tab:"rsvp",side:"all",attend:"all",gb:"all",rsvp:[],guestbook:[]};function O(e){const t=e.filter(i=>i.attend),a=i=>i.reduce((c,m)=>c+(Number(m.count)||0),0),n=i=>t.filter(c=>c.side===i),s=i=>a(t.filter(c=>c.meal===i));return`<div class="ad-stats">
    <div class="ad-stat big"><b>${a(t)}</b><span>참석 예정 인원</span></div>
    <div class="ad-stat"><b>${a(n("groom"))}</b><span>신랑측</span></div>
    <div class="ad-stat"><b>${a(n("bride"))}</b><span>신부측</span></div>
    <div class="ad-stat"><b>${e.length}</b><span>응답 수</span></div>
    <div class="ad-stat"><b>${e.length-t.length}</b><span>불참 응답</span></div>
    <div class="ad-stat"><b>${s("yes")}</b><span>식사 인원</span></div>
    <div class="ad-stat"><b>${s("unknown")}</b><span>식사 미정</span></div>
    <div class="ad-stat"><b>${s("no")}</b><span>식사 안 함</span></div>
  </div>`}const r=(e,t,a)=>`<button class="ad-chip${o[e]===t?" on":""}" data-group="${e}" data-value="${t}">${a}</button>`;function q(){const e=o.rsvp.filter(t=>o.side==="all"||t.side===o.side).filter(t=>o.attend==="all"||o.attend==="yes"==!!t.attend);return`${O(o.rsvp)}
  <div class="ad-filters">
    <div>${r("side","all","전체")}${r("side","groom","신랑측")}${r("side","bride","신부측")}</div>
    <div>${r("attend","all","전체")}${r("attend","yes","참석")}${r("attend","no","불참")}</div>
  </div>
  <div class="ad-bar"><span>${e.length}건</span><button class="ad-link" id="csv">엑셀(CSV)로 받기</button></div>
  <ul class="ad-list">${e.map(t=>`<li class="ad-item${t.attend?"":" no"}">
    <div class="ad-row"><b>${d(t.name)}</b><span class="ad-badge ${d(t.side)}">${_[t.side]||""}</span>
      <time>${L(t.createdAt)}</time></div>
    <div class="ad-meta">${t.attend?`참석 · ${Number(t.count)||0}명${f[t.meal]?` · ${f[t.meal]}`:""}`:"불참"}</div>
    ${t.note?`<p class="ad-note">${d(t.note)}</p>`:""}
    <button class="ad-del" data-col="rsvp" data-id="${d(t.id)}" data-name="${d(t.name)}">삭제</button>
  </li>`).join("")||'<li class="ad-empty">아직 응답이 없어요.</li>'}</ul>`}function P(){const e=o.guestbook.filter(a=>a.col==="guestbook_private").length,t=o.guestbook.filter(a=>o.gb==="all"||o.gb==="private"==(a.col==="guestbook_private"));return`<div class="ad-filters"><div>${r("gb","all","전체")}${r("gb","public",`공개 ${o.guestbook.length-e}`)}${r("gb","private",`비공개 ${e}`)}</div></div>
  <div class="ad-bar"><span>${t.length}건</span></div>
  <ul class="ad-list">${t.map(a=>`<li class="ad-item${a.col==="guestbook_private"?" secret":""}">
    <div class="ad-row"><b>${d(a.name)}</b>${a.col==="guestbook_private"?'<span class="ad-badge secret">비공개</span>':""}<time>${L(a.createdAt)}</time></div>
    <p class="ad-note">${d(a.message)}</p>
    <button class="ad-del" data-col="${a.col}" data-id="${d(a.id)}" data-name="${d(a.name)}">삭제</button>
  </li>`).join("")||'<li class="ad-empty">아직 방명록이 없어요.</li>'}</ul>`}function g(e){var t;p(`${u('<div class="ad-user"><button class="ad-link" id="logout">잠그기</button></div>')}
  <nav class="ad-tabs">
    <button data-tab="rsvp" class="${o.tab==="rsvp"?"on":""}">참석 여부 <i>${o.rsvp.length}</i></button>
    <button data-tab="guestbook" class="${o.tab==="guestbook"?"on":""}">방명록 <i>${o.guestbook.length}</i></button>
    <button class="ad-refresh" id="refresh" aria-label="새로고침">↻</button>
  </nav>
  <main class="ad-main">${o.tab==="rsvp"?q():P()}</main>`),l("#logout").onclick=()=>{E(!1),k(e)},l("#refresh").onclick=()=>b(e),v.querySelectorAll("[data-tab]").forEach(a=>{a.onclick=()=>{o.tab=a.dataset.tab,g(e)}}),v.querySelectorAll(".ad-chip").forEach(a=>{a.onclick=()=>{o[a.dataset.group]=a.dataset.value,g(e)}}),(t=l("#csv"))==null||t.addEventListener("click",N),v.querySelectorAll(".ad-del").forEach(a=>{a.onclick=async()=>{const n=a.dataset.col==="rsvp"?"참석 여부":"방명록",s=a.dataset.col==="rsvp"?"rsvp":"guestbook";if(confirm(`${a.dataset.name} 님의 ${n}를 삭제할까요?
삭제하면 되돌릴 수 없어요.`)){a.disabled=!0,a.textContent="삭제 중…";try{await e.remove(a.dataset.col,a.dataset.id),o[s]=o[s].filter(i=>!(i.id===a.dataset.id&&i.col===a.dataset.col)),g(e)}catch(i){alert(`삭제하지 못했어요. (${i.code||i.message})`),a.disabled=!1,a.textContent="삭제"}}}})}function N(){const e=s=>`"${String(s??"").replace(/"/g,'""')}"`,t=[["구분","이름","참석","인원","식사","남긴 말","보낸 시각"],...o.rsvp.map(s=>[_[s.side]||s.side,s.name,s.attend?"참석":"불참",s.attend?s.count:0,f[s.meal]||"",s.note||"",s.createdAt.toLocaleString("ko-KR")])],a=new Blob(["\uFEFF"+t.map(s=>s.map(e).join(",")).join(`\r
`)],{type:"text/csv;charset=utf-8"}),n=Object.assign(document.createElement("a"),{href:URL.createObjectURL(a),download:"rsvp.csv"});n.click(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)}async function b(e){p(`${u()}<main class="ad-login"><p>불러오는 중…</p></main>`);try{const[t,a,n]=await Promise.all([e.list("rsvp"),e.list("guestbook"),e.list("guestbook_private")]);o.rsvp=t.map(s=>({...s,col:"rsvp"})),o.guestbook=[...a.map(s=>({...s,col:"guestbook"})),...n.map(s=>({...s,col:"guestbook_private"}))].sort((s,i)=>i.createdAt-s.createdAt),g(e)}catch(t){t.code==="permission-denied"?(p(`${u()}<main class="ad-login">
        <p>데이터를 읽을 권한이 없어요.</p>
        <p class="ad-tip">Firebase 콘솔의 Firestore 규칙 탭에<br>이 폴더의 firestore.rules 내용을 다시 게시해 주세요.</p>
        <button class="ad-btn" id="retry">다시 시도</button></main>`),l("#retry").onclick=()=>b(e)):(p(`${u()}<main class="ad-login"><p class="ad-err">불러오지 못했어요. (${d(t.code||t.message)})</p>
        <button class="ad-btn" id="retry">다시 시도</button></main>`),l("#retry").onclick=()=>b(e))}}(async()=>{var t;if(!S&&!((t=$.firebase)!=null&&t.apiKey)){p(`${u()}<main class="ad-login"><p>config.js 의 firebase 설정이 비어 있어요.</p></main>`);return}p(`${u()}<main class="ad-login"><p>불러오는 중…</p></main>`);const e=S?I():await j();R()?b(e):k(e)})();
