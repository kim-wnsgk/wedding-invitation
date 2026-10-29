(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const u of o.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();const P=""+new URL("KakaoTalk_20261029_223737949_04-Dc1mySsh.webp",import.meta.url).href,H=""+new URL("KakaoTalk_20261029_223737949 copy-BpHqS77F.webp",import.meta.url).href,q=""+new URL("KakaoTalk_20261029_223737949_01-Ddo5uJdo.webp",import.meta.url).href,B=""+new URL("KakaoTalk_20261029_223737949_02-DyU9efG9.webp",import.meta.url).href,V=""+new URL("KakaoTalk_20261029_223737949_03-BF2uVxMw.webp",import.meta.url).href,F=""+new URL("KakaoTalk_20261029_223737949 copy-DiEV5U4M.webp",import.meta.url).href,G=""+new URL("KakaoTalk_20261029_223737949_01-DQEI0XBZ.webp",import.meta.url).href,J=""+new URL("KakaoTalk_20261029_223737949_02-Ck-Hxmy2.webp",import.meta.url).href,z=""+new URL("KakaoTalk_20261029_223737949_03-BskoYlLk.webp",import.meta.url).href,a={meta:{title:"준하 ♥ 재은 결혼합니다",description:"2027년 2월 20일 토요일 오후 3시, 수원 WI컨벤션 W홀"},groom:{name:"김준하",firstName:"준하",englishName:"Junha",father:"김경희",mother:"이선애",relation:"아들"},bride:{name:"이재은",firstName:"재은",englishName:"Jaeeun",father:"이점태",mother:"김성연",relation:"딸"},wedding:{year:2027,month:2,day:20,hour:15,minute:0},greeting:{title:"소중한 분들을 초대합니다",paragraphs:[["서로가 마주 보며 다져온 사랑을","이제 함께 한곳을 바라보며","걸어가고자 합니다."],["저희 두 사람의 새로운 시작을","축복해 주시면 더없는 기쁨으로","간직하겠습니다."]]},venue:{name:"수원 WI컨벤션 W홀",address:"경기도 수원시 팔달구 월드컵로 310",detail:"수원월드컵경기장 내",tel:"031-241-6000",mapQuery:"WI컨벤션"},directions:[{title:"셔틀버스",text:"수인분당선 수원시청역 9번 출구 앞에서 무료 셔틀버스가 약 15~20분 간격으로 운행합니다."},{title:"버스",text:"‘수원월드컵경기장’ 정류장 하차 후 도보 이동"},{title:"자가용",text:"내비게이션에 ‘WI컨벤션’ 또는 ‘수원월드컵경기장’을 입력해 주세요. 동수원IC에서 약 10분 거리입니다."},{title:"주차",text:"수원월드컵경기장 주차장을 이용해 주세요. 2시간 무료이며, 웨딩홀 안내데스크에서 차량 등록을 해 주세요. 경기장 행사가 있는 날은 혼잡할 수 있습니다."}],accounts:{note:["참석이 어려우신 분들을 위해 기재했습니다.","너그러운 마음으로 양해 부탁드립니다."],groom:[{who:"신랑 김준하",bank:"우리은행",number:"1002-358-192105"},{who:"아버지 김경희",bank:"신한은행",number:"110-134-651499"},{who:"어머니 이선애",bank:"농협은행",number:"1094-12-019067"}],bride:[{who:"신부 이재은",bank:"ABC은행",number:"123456789"}]},closing:"함께해 주셔서 감사합니다.",effects:{eyebrow:"The Wedding of",monogram:"J&J",snow:!0}},m=e=>document.querySelector(e),r=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),M=e=>e.map(r).join("<br>"),b=e=>String(e).padStart(2,"0"),j=window.matchMedia("(prefers-reduced-motion: reduce)").matches,l=a.wedding,_=new Date(Date.UTC(l.year,l.month-1,l.day,l.hour-9,l.minute)),O=new Date(Date.UTC(l.year,l.month-1,l.day)).getUTCDay(),Q=["일","월","화","수","목","금","토"],A=["SUN","MON","TUE","WED","THU","FRI","SAT"],X="오후",C=l.hour%12,Y=`${X} ${C}시`,D=`${l.year}년 ${l.month}월 ${l.day}일 ${Q[O]}요일 ${Y}`,Z=`${l.year}. ${b(l.month)}. ${b(l.day)} ${A[O]} ${C}:${b(l.minute)} PM`,w=`${a.groom.firstName} ♥ ${a.bride.firstName}`,T=a.effects||{},E=e=>Object.keys(e).sort((t,i)=>t.localeCompare(i,void 0,{numeric:!0})).map(t=>e[t]),k=E(Object.assign({"/photos/main/KakaoTalk_20261029_223737949_04.jpg":P}))[0],$=E(Object.assign({"/photos/gallery/KakaoTalk_20261029_223737949 copy.jpg":H,"/photos/gallery/KakaoTalk_20261029_223737949_01.jpg":q,"/photos/gallery/KakaoTalk_20261029_223737949_02.jpg":B,"/photos/gallery/KakaoTalk_20261029_223737949_03.jpg":V})),L=E(Object.assign({"/photos/gallery/KakaoTalk_20261029_223737949 copy.jpg":F,"/photos/gallery/KakaoTalk_20261029_223737949_01.jpg":G,"/photos/gallery/KakaoTalk_20261029_223737949_02.jpg":J,"/photos/gallery/KakaoTalk_20261029_223737949_03.jpg":z})),N=9;document.title=a.meta.title;function I(e){return`<svg class="seal ${e}" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" stroke-dasharray="1 5" stroke-linecap="round"/>
    <circle cx="60" cy="60" r="46"/>
    <text x="60" y="62" text-anchor="middle" dominant-baseline="middle">${r(T.monogram||`${a.groom.englishName[0]}&${a.bride.englishName[0]}`)}</text>
  </svg>`}const U=(e,t)=>t.length?`<details>
        <summary>${r(e)}</summary>
        ${t.map(i=>{const s=`${i.bank} ${i.number}`;return`<div class="acct">
              <div><div class="who">${r(i.who)}</div><div class="num">${r(s)}</div></div>
              <button class="btn" type="button" data-copy="${r(s)}">복사</button>
            </div>`}).join("")}
      </details>`:"";m("#app").innerHTML=`
<main class="wrap">
  <section class="hero">
    ${T.snow?'<canvas id="snow" aria-hidden="true"></canvas>':""}
    <div class="hero-in">
      <div class="save">${r(T.eyebrow||"The Wedding of")}</div>
      ${k?`<div class="hero-photo"><img src="${k}" alt="${r(w)}" fetchpriority="high"></div>`:I("seal-hero")}
      <div class="names">${r(a.groom.englishName)}<span>&amp;</span>${r(a.bride.englishName)}</div>
      <div class="ko">${r(a.groom.name)} <i>·</i> ${r(a.bride.name)}</div>
      <div class="date-en">${Z}</div>
      <div class="when">${D}<br>${r(a.venue.name)}</div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>

  <section class="greet rv">
    <div class="eyebrow">Invitation</div>
    <h2>${r(a.greeting.title)}</h2>
    ${a.greeting.paragraphs.map(e=>`<p>${M(e)}</p>`).join("")}
    <div class="parents">
      <div>${r(a.groom.father)} · ${r(a.groom.mother)} <span class="rel">의 ${r(a.groom.relation)}</span> <b>${r(a.groom.name)}</b></div>
      <div>${r(a.bride.father)} · ${r(a.bride.mother)} <span class="rel">의 ${r(a.bride.relation)}</span> <b>${r(a.bride.name)}</b></div>
    </div>
  </section>

  ${L.length?`<section class="rv">
    <div class="eyebrow">Gallery</div>
    <h2>우리의 사진</h2>
    <div class="gallery" id="gallery">
      ${L.map((e,t)=>`<button type="button" class="g-item${t>=N?" g-hidden":""}" data-i="${t}" aria-label="사진 ${t+1} 크게 보기"><img src="${e}" alt="" loading="lazy"></button>`).join("")}
    </div>
    ${L.length>N?'<button class="btn g-more" type="button" id="gMore">사진 더보기</button>':""}
  </section>`:""}

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${D}</h2>
    <div class="cal-head"><span>${l.year}</span>${l.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
    <button class="btn ics" type="button" id="ics">내 캘린더에 저장</button>
  </section>

  <section class="rv">
    <div class="eyebrow">Location</div>
    <h2>오시는 길</h2>
    <div class="venue">${r(a.venue.name)}</div>
    <div class="addr">${r(a.venue.address)}</div>
    <div class="addr">${r(a.venue.detail)}${` · Tel. ${r(a.venue.tel)}`}</div>
    <button class="btn copy-addr" type="button" id="copyAddr">주소 복사</button>
    <div class="btn-row">
      <a class="btn" target="_blank" rel="noopener" href="https://map.naver.com/p/search/${encodeURIComponent(a.venue.mapQuery)}">네이버 지도</a>
      <a class="btn" target="_blank" rel="noopener" href="https://map.kakao.com/?q=${encodeURIComponent(a.venue.mapQuery)}">카카오맵</a>
      <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.venue.address)}">구글 지도</a>
    </div>
    <div class="ways">
      ${a.directions.map(e=>`<div><h3>${r(e.title)}</h3><p>${r(e.text)}</p></div>`).join("")}
    </div>
  </section>

  ${`<section class="rv">
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${M(a.accounts.note)}</div>
    ${U("신랑측 계좌번호",a.accounts.groom)}
    ${U("신부측 계좌번호",a.accounts.bride)}
  </section>`}

  <section class="foot rv">
    ${I("seal-foot")}
    <div class="sign">${r(a.groom.englishName)} &amp; ${r(a.bride.englishName)}</div>
    ${r(a.closing)}
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
`;(()=>{const e=o=>o===0?" sun":o===6?" sat":"";let t=A.map((o,u)=>`<div class="dow${e(u)}">${o}</div>`).join("");const i=new Date(l.year,l.month-1,1).getDay(),s=new Date(l.year,l.month,0).getDate();t+='<div class="d"></div>'.repeat(i);const n='<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>';for(let o=1;o<=s;o++){const u=(i+o-1)%7;t+=o===l.day?`<div class="d${e(u)} on">${n}<span>${o}</span></div>`:`<div class="d${e(u)}">${o}</div>`}m("#cal").innerHTML=t})();function K(){const e=_-new Date;if(e<=0){m("#dday").innerHTML=`${r(w)}의 결혼식이 <strong>진행되었습니다</strong>`,m("#count").innerHTML="";return}const t=Math.floor(e/1e3),i=Math.floor(t/86400),s=Math.floor(t%86400/3600),n=Math.floor(t%3600/60),o=t%60;m("#dday").innerHTML=`${r(w)}의 결혼식이 <strong>${i+1}일</strong> 남았습니다`,m("#count").innerHTML=[[i,"Days"],[b(s),"Hours"],[b(n),"Mins"],[b(o),"Secs"]].map(([u,v])=>`<div><b>${u}</b><small>${v}</small></div>`).join("")}K();setInterval(K,1e3);(()=>{const e=document.querySelectorAll(".rv");if(j||!("IntersectionObserver"in window)){e.forEach(i=>i.classList.add("in"));return}const t=new IntersectionObserver(i=>i.forEach(s=>{s.isIntersecting&&(s.target.classList.add("in"),t.unobserve(s.target))}),{threshold:.15});e.forEach(i=>t.observe(i))})();(()=>{const e=m("#snow");if(!e||j)return;const t=e.getContext("2d"),i=e.parentElement;let s=0,n=0,o=[],u=!0,v=0;const p=c=>({x:Math.random()*s,y:c??Math.random()*n,r:.8+Math.random()*2,v:12+Math.random()*22,sway:6+Math.random()*14,ph:Math.random()*Math.PI*2});function g(){const c=Math.min(window.devicePixelRatio||1,2);s=i.clientWidth,n=i.clientHeight,e.width=s*c,e.height=n*c,t.setTransform(c,0,0,c,0,0),o=Array.from({length:Math.round(s/9)},()=>p())}function d(c){const y=Math.min((c-v)/1e3||0,.05);v=c,t.clearRect(0,0,s,n);for(const h of o){h.y+=h.v*y,h.ph+=y*.8,h.y>n+4&&Object.assign(h,p(-4));const W=h.x+Math.sin(h.ph)*h.sway,x=Math.max(0,1-h.y/n)*.9;t.beginPath(),t.arc(W,h.y,h.r,0,Math.PI*2),t.fillStyle=`rgba(255,255,255,${x})`,t.fill(),t.lineWidth=.6,t.strokeStyle=`rgba(92,116,140,${x*.2})`,t.stroke()}u&&requestAnimationFrame(d)}g(),window.addEventListener("resize",g),new IntersectionObserver(([c])=>{const y=u;u=c.isIntersecting,u&&!y&&requestAnimationFrame(h=>{v=h,d(h)})}).observe(i),requestAnimationFrame(c=>{v=c,d(c)})})();(()=>{var g;if(!$.length)return;const e=m("#lb"),t=m("#lbImg"),i=$.length;let s=0,n=null;const o=d=>{s=(d+i)%i,t.src=$[s],m("#lbCount").textContent=`${s+1} / ${i}`,[s+1,s-1].forEach(c=>{new Image().src=$[(c+i)%i]})},u=d=>{n=document.activeElement,o(d),e.hidden=!1,document.body.style.overflow="hidden",m("#lbClose").focus()},v=()=>{e.hidden=!0,document.body.style.overflow="",n==null||n.focus()};m("#gallery").addEventListener("click",d=>{const c=d.target.closest(".g-item");c&&u(Number(c.dataset.i))}),(g=m("#gMore"))==null||g.addEventListener("click",d=>{document.querySelectorAll(".g-hidden").forEach(c=>c.classList.remove("g-hidden")),d.currentTarget.remove()}),m("#lbClose").addEventListener("click",v),m("#lbPrev").addEventListener("click",()=>o(s-1)),m("#lbNext").addEventListener("click",()=>o(s+1)),e.addEventListener("click",d=>{d.target===e&&v()}),document.addEventListener("keydown",d=>{e.hidden||(d.key==="Escape"?v():d.key==="ArrowLeft"?o(s-1):d.key==="ArrowRight"&&o(s+1))});let p=null;e.addEventListener("touchstart",d=>{p=d.touches[0].clientX},{passive:!0}),e.addEventListener("touchend",d=>{if(p===null)return;const c=d.changedTouches[0].clientX-p;p=null,Math.abs(c)>40&&o(s+(c<0?1:-1))})})();let R;function S(e){const t=m("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(R),R=setTimeout(()=>t.classList.remove("show"),1800)}function f(e,t){var s;const i=()=>{const n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.cssText="position:fixed;opacity:0",document.body.appendChild(n),n.select();let o=!1;try{o=document.execCommand("copy")}catch{}n.remove(),S(o?t:"복사하지 못했어요. 길게 눌러 직접 복사해 주세요")};(s=navigator.clipboard)!=null&&s.writeText?navigator.clipboard.writeText(e).then(()=>S(t),i):i()}m("#copyAddr").addEventListener("click",()=>f(a.venue.address,"주소를 복사했어요"));document.querySelectorAll("[data-copy]").forEach(e=>e.addEventListener("click",()=>f(e.dataset.copy,"계좌번호를 복사했어요")));m("#copyLink").addEventListener("click",()=>f(location.href,"청첩장 링크를 복사했어요"));function ee(e){const t=window.Kakao;if(!(t!=null&&t.isInitialized()))return!1;const i={mobileWebUrl:e,webUrl:e},s=[{title:"청첩장 보기",link:i}];return k?t.Share.sendDefault({objectType:"feed",content:{title:a.meta.title,description:a.meta.description,imageUrl:new URL(k,location.href).href,link:i},buttons:s}):t.Share.sendDefault({objectType:"text",text:`${a.meta.title}
${a.meta.description}`,link:i,buttons:s}),!0}m("#share").addEventListener("click",async()=>{const e=location.origin+location.pathname;if(ee(e))return;const t={title:a.meta.title,text:a.meta.description,url:e};if(navigator.share)try{await navigator.share(t)}catch(i){i.name!=="AbortError"&&f(location.href,"청첩장 링크를 복사했어요")}else f(location.href,"청첩장 링크를 복사했어요")});m("#ics").addEventListener("click",()=>{const e=o=>o.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),t=o=>String(o).replace(/[\\,;]/g,u=>`\\${u}`),i=new Date(_.getTime()+72e5),s=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//wedding-invitation//KO","BEGIN:VEVENT",`UID:${e(_)}-wedding@invitation`,`DTSTAMP:${e(new Date)}`,`DTSTART:${e(_)}`,`DTEND:${e(i)}`,`SUMMARY:${t(`${w} 결혼식`)}`,`LOCATION:${t(`${a.venue.name}, ${a.venue.address}`)}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`),n=document.createElement("a");n.href=URL.createObjectURL(new Blob([s],{type:"text/calendar;charset=utf-8"})),n.download="wedding.ics",document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(n.href),1e3)});
