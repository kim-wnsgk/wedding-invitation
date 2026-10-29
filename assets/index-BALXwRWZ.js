(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(o){if(o.ep)return;o.ep=!0;const t=s(o);fetch(o.href,t)}})();const F=""+new URL("KakaoTalk_20261029_223737949_04-Dc1mySsh.webp",import.meta.url).href,B=""+new URL("KakaoTalk_20261029_223737949 copy-BpHqS77F.webp",import.meta.url).href,z=""+new URL("KakaoTalk_20261029_223737949_01-Ddo5uJdo.webp",import.meta.url).href,J=""+new URL("KakaoTalk_20261029_223737949_02-DyU9efG9.webp",import.meta.url).href,G=""+new URL("KakaoTalk_20261029_223737949_03-BF2uVxMw.webp",import.meta.url).href,Q=""+new URL("KakaoTalk_20261029_223737949 copy-DiEV5U4M.webp",import.meta.url).href,V=""+new URL("KakaoTalk_20261029_223737949_01-DQEI0XBZ.webp",import.meta.url).href,X=""+new URL("KakaoTalk_20261029_223737949_02-Ck-Hxmy2.webp",import.meta.url).href,Y=""+new URL("KakaoTalk_20261029_223737949_03-BskoYlLk.webp",import.meta.url).href,a={meta:{title:"준하 ♥ 재은 결혼합니다",description:"2027년 2월 20일 토요일 오후 3시, 수원 WI컨벤션 W홀"},groom:{name:"김준하",firstName:"준하",englishName:"Junha",father:"김경희",mother:"이선애",relation:"아들"},bride:{name:"이재은",firstName:"재은",englishName:"Jaeeun",father:"이점태",mother:"김성연",relation:"딸"},wedding:{year:2027,month:2,day:20,hour:15,minute:0},greeting:{title:"소중한 분들을 초대합니다",paragraphs:[["서로가 마주 보며 다져온 사랑을","이제 함께 한곳을 바라보며","걸어가고자 합니다."],["저희 두 사람의 새로운 시작을","축복해 주시면 더없는 기쁨으로","간직하겠습니다."]]},venue:{name:"수원 WI컨벤션 W홀",address:"경기도 수원시 팔달구 월드컵로 310",detail:"수원월드컵경기장 내",tel:"031-241-6000",mapQuery:"WI컨벤션"},directions:[{title:"셔틀버스",text:"수인분당선 수원시청역 9번 출구 앞에서 무료 셔틀버스가 약 15~20분 간격으로 운행합니다."},{title:"버스",text:"‘수원월드컵경기장’ 정류장 하차 후 도보 이동"},{title:"자가용",text:"내비게이션에 ‘WI컨벤션’ 또는 ‘수원월드컵경기장’을 입력해 주세요. 동수원IC에서 약 10분 거리입니다."},{title:"주차",text:"수원월드컵경기장 주차장을 이용해 주세요. 2시간 무료이며, 웨딩홀 안내데스크에서 차량 등록을 해 주세요. 경기장 행사가 있는 날은 혼잡할 수 있습니다."}],accounts:{note:["참석이 어려우신 분들을 위해 기재했습니다.","너그러운 마음으로 양해 부탁드립니다."],groom:[{who:"신랑 김준하",bank:"우리은행",number:"1002-358-192105"},{who:"아버지 김경희",bank:"신한은행",number:"110-134-651499"},{who:"어머니 이선애",bank:"농협은행",number:"1094-12-019067"}],bride:[{who:"신부 이재은",bank:"ABC은행",number:"123456789"}]},closing:"함께해 주셔서 감사합니다.",effects:{eyebrow:"The Wedding of",monogram:"J&J",snow:!0}},d=e=>document.querySelector(e),r=e=>String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),C=e=>e.map(r).join("<br>"),b=e=>String(e).padStart(2,"0"),N=(e,n)=>[...e].map((s,i)=>`<i style="--i:${n+i}">${r(s)}</i>`).join(""),L=window.matchMedia("(prefers-reduced-motion: reduce)").matches,m=a.wedding,Z=new Date(Date.UTC(m.year,m.month-1,m.day,m.hour-9,m.minute)),R=new Date(Date.UTC(m.year,m.month-1,m.day)).getUTCDay(),ee=["일","월","화","수","목","금","토"],H=["SUN","MON","TUE","WED","THU","FRI","SAT"],te="오후",W=m.hour%12,ne=`${te} ${W}시`,D=`${m.year}년 ${m.month}월 ${m.day}일 ${ee[R]}요일 ${ne}`,oe=`${m.year}. ${b(m.month)}. ${b(m.day)} ${H[R]} ${W}:${b(m.minute)} PM`,T=`${a.groom.firstName} ♥ ${a.bride.firstName}`,x=a.effects||{},M=e=>Object.keys(e).sort((n,s)=>n.localeCompare(s,void 0,{numeric:!0})).map(n=>e[n]),_=M(Object.assign({"/photos/main/KakaoTalk_20261029_223737949_04.jpg":F}))[0],w=M(Object.assign({"/photos/gallery/KakaoTalk_20261029_223737949 copy.jpg":B,"/photos/gallery/KakaoTalk_20261029_223737949_01.jpg":z,"/photos/gallery/KakaoTalk_20261029_223737949_02.jpg":J,"/photos/gallery/KakaoTalk_20261029_223737949_03.jpg":G})),E=M(Object.assign({"/photos/gallery/KakaoTalk_20261029_223737949 copy.jpg":Q,"/photos/gallery/KakaoTalk_20261029_223737949_01.jpg":V,"/photos/gallery/KakaoTalk_20261029_223737949_02.jpg":X,"/photos/gallery/KakaoTalk_20261029_223737949_03.jpg":Y})),U=9;document.title=a.meta.title;function j(e){return`<svg class="seal ${e}" viewBox="0 0 120 120" aria-hidden="true">
    <circle class="ring-dot" cx="60" cy="60" r="54" stroke-dasharray="1 5" stroke-linecap="round"/>
    <circle class="ring" cx="60" cy="60" r="46" pathLength="1" transform="rotate(-90 60 60)"/>
    <text x="60" y="62" text-anchor="middle" dominant-baseline="middle">${r(x.monogram||`${a.groom.englishName[0]}&${a.bride.englishName[0]}`)}</text>
  </svg>`}const A=(e,n)=>n.length?`<details>
        <summary>${r(e)}</summary>
        ${n.map(s=>{const i=`${s.bank} ${s.number}`;return`<div class="acct">
              <div><div class="who">${r(s.who)}</div><div class="num">${r(i)}</div></div>
              <button class="btn" type="button" data-copy="${r(i)}">복사</button>
            </div>`}).join("")}
      </details>`:"";d("#app").innerHTML=`
<main class="wrap">
  <section class="hero">
    ${x.snow?'<canvas id="snow" aria-hidden="true"></canvas>':""}
    <div class="hero-in">
      <div class="save">${r(x.eyebrow||"The Wedding of")}</div>
      ${_?`<div class="hero-photo"><img src="${_}" alt="${r(T)}" fetchpriority="high"></div>`:j("seal-hero")}
      <div class="names">
        <span class="sr">${r(a.groom.englishName)} &amp; ${r(a.bride.englishName)}</span>
        <span class="nm" aria-hidden="true">${N(a.groom.englishName,0)}</span>
        <span class="amp" aria-hidden="true">&amp;</span>
        <span class="nm" aria-hidden="true">${N(a.bride.englishName,a.groom.englishName.length+2)}</span>
      </div>
      <div class="ko">${r(a.groom.name)} <i>·</i> ${r(a.bride.name)}</div>
      <div class="date-en">${oe}</div>
      <div class="when">${D}<br>${r(a.venue.name)}</div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>

  <section class="greet rv">
    <div class="eyebrow">Invitation</div>
    <h2>${r(a.greeting.title)}</h2>
    ${a.greeting.paragraphs.map(e=>`<p>${C(e)}</p>`).join("")}
    <div class="parents">
      <div>${r(a.groom.father)} · ${r(a.groom.mother)} <span class="rel">의 ${r(a.groom.relation)}</span> <b>${r(a.groom.name)}</b></div>
      <div>${r(a.bride.father)} · ${r(a.bride.mother)} <span class="rel">의 ${r(a.bride.relation)}</span> <b>${r(a.bride.name)}</b></div>
    </div>
  </section>

  ${E.length?`<section class="rv">
    <div class="eyebrow">Gallery</div>
    <h2>우리의 사진</h2>
    <div class="gallery" id="gallery">
      ${E.map((e,n)=>`<button type="button" class="g-item${n>=U?" g-hidden":""}" data-i="${n}" aria-label="사진 ${n+1} 크게 보기"><img src="${e}" alt="" loading="lazy"></button>`).join("")}
    </div>
    ${E.length>U?'<button class="btn g-more" type="button" id="gMore">사진 더보기</button>':""}
  </section>`:""}

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${D}</h2>
    <div class="cal-head"><span>${m.year}</span>${m.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
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
    <div class="note">${C(a.accounts.note)}</div>
    ${A("신랑측 계좌번호",a.accounts.groom)}
    ${A("신부측 계좌번호",a.accounts.bride)}
  </section>`}

  <section class="foot rv">
    ${j("seal-foot")}
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
`;(()=>{const e=t=>t===0?" sun":t===6?" sat":"";let n=H.map((t,l)=>`<div class="dow${e(l)}" style="--i:${l}">${t}</div>`).join("");const s=new Date(m.year,m.month-1,1).getDay(),i=new Date(m.year,m.month,0).getDate();n+='<div class="d"></div>'.repeat(s);const o='<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>';for(let t=1;t<=i;t++){const l=(s+t-1)%7,h=`style="--i:${7+s+t}"`;n+=t===m.day?`<div class="d${e(l)} on" ${h}>${o}<span>${t}</span></div>`:`<div class="d${e(l)}" ${h}>${t}</div>`}d("#cal").innerHTML=n})();d("#dday").innerHTML=`${r(T)}의 결혼식이 <strong id="ddayNum"></strong> 남았습니다`;d("#count").innerHTML=["Days","Hours","Mins","Secs"].map(e=>`<div><b></b><small>${e}</small></div>`).join("");const ae=[...document.querySelectorAll("#count b")];let k=0,$=!1,S=!1;function q(){const e=Z-new Date;if(e<=0){d("#dday").innerHTML=`${r(T)}의 결혼식이 <strong>진행되었습니다</strong>`,d("#count").innerHTML="";return}const n=Math.floor(e/1e3),s=Math.floor(n/86400),i=Math.floor(n%86400/3600),o=Math.floor(n%3600/60),t=n%60;k=s+1,$||(d("#ddayNum").textContent=`${k}일`),[s,b(i),b(o),b(t)].forEach((l,h)=>{const p=ae[h];p.textContent!==String(l)&&(p.textContent=l,S&&!L&&(p.classList.remove("roll"),p.offsetWidth,p.classList.add("roll")))}),S=!0}q();setInterval(q,1e3);const se=[["section:not(.hero) > .eyebrow","track"],["section:not(.hero) > h2","blur",()=>120],[".greet > p","up",e=>200+e*140],[".parents > div:first-child","left"],[".parents > div:last-child","right",()=>150],[".g-item","zoom",e=>e%3*90],[".g-more, .cal-head, .dday, .count, .venue, .addr, .copy-addr, .note, .foot .sign, .share-row","up"],[".btn-row .btn","up",e=>e*90],[".ways > div","left",e=>e*110],["details","up",e=>e*120]];(()=>{se.forEach(([t,l,h])=>document.querySelectorAll(t).forEach((p,v)=>{p.classList.add("a",`a-${l}`),h&&p.style.setProperty("--d",`${h(v)}ms`)}));const e=document.querySelectorAll(".a, .cal, .seal-foot, section:not(.hero)");if(L||!("IntersectionObserver"in window)){e.forEach(t=>t.classList.add("in"));return}const n=t=>{t.classList.contains("in")||(t.classList.add("in"),t.id==="dday"&&ie())},s=new IntersectionObserver(t=>t.forEach(l=>l.isIntersecting&&n(l.target)),{rootMargin:"0px 0px -12% 0px"}),i=new IntersectionObserver(t=>t.forEach(l=>!l.isIntersecting&&l.target.classList.remove("in")));e.forEach(t=>{s.observe(t),i.observe(t)}),window.addEventListener("scroll",()=>{window.innerHeight+window.scrollY<document.documentElement.scrollHeight-4||e.forEach(t=>t.getBoundingClientRect().top<window.innerHeight&&n(t))},{passive:!0});const o=d(".hero");o.classList.add("play"),new IntersectionObserver(([t])=>o.classList.toggle("play",t.isIntersecting)).observe(o)})();function ie(){const e=d("#ddayNum");if(!e||!k||$)return;$=!0;const n=performance.now(),s=1400,i=o=>{const t=Math.min((o-n)/s,1);e.textContent=`${Math.round(k*(1-Math.pow(1-t,3)))}일`,t<1?requestAnimationFrame(i):$=!1};requestAnimationFrame(i)}(()=>{if(L)return;const e=document.createElement("div");e.className="progress",document.body.appendChild(e);const n=d(".hero-photo img");let s=!1;const i=()=>{s=!1;const o=window.scrollY,t=document.documentElement.scrollHeight-window.innerHeight;e.style.transform=`scaleX(${t>0?Math.min(o/t,1):0})`,n&&o<window.innerHeight*1.5&&(n.style.translate=`0 ${-Math.min(o*.12,52)}px`)};window.addEventListener("scroll",()=>{s||(s=!0,requestAnimationFrame(i))},{passive:!0}),i()})();(()=>{const e=d("#snow");if(!e||L)return;const n=e.getContext("2d"),s=e.parentElement;let i=0,o=0,t=[],l=!0,h=0;const p=c=>({x:Math.random()*i,y:c??Math.random()*o,r:.8+Math.random()*2,v:12+Math.random()*22,sway:6+Math.random()*14,ph:Math.random()*Math.PI*2});function v(){const c=Math.min(window.devicePixelRatio||1,2);i=s.clientWidth,o=s.clientHeight,e.width=i*c,e.height=o*c,n.setTransform(c,0,0,c,0,0),t=Array.from({length:Math.round(i/9)},()=>p())}function u(c){const y=Math.min((c-h)/1e3||0,.05);h=c,n.clearRect(0,0,i,o);for(const g of t){g.y+=g.v*y,g.ph+=y*.8,g.y>o+4&&Object.assign(g,p(-4));const P=g.x+Math.sin(g.ph)*g.sway,I=Math.max(0,1-g.y/o)*.9;n.beginPath(),n.arc(P,g.y,g.r,0,Math.PI*2),n.fillStyle=`rgba(255,255,255,${I})`,n.fill(),n.lineWidth=.6,n.strokeStyle=`rgba(92,116,140,${I*.2})`,n.stroke()}l&&requestAnimationFrame(u)}v(),window.addEventListener("resize",v),new IntersectionObserver(([c])=>{const y=l;l=c.isIntersecting,l&&!y&&requestAnimationFrame(g=>{h=g,u(g)})}).observe(s),requestAnimationFrame(c=>{h=c,u(c)})})();(()=>{var v;if(!w.length)return;const e=d("#lb"),n=d("#lbImg"),s=w.length;let i=0,o=null;const t=u=>{i=(u+s)%s,n.src=w[i],d("#lbCount").textContent=`${i+1} / ${s}`,[i+1,i-1].forEach(c=>{new Image().src=w[(c+s)%s]})},l=u=>{o=document.activeElement,t(u),e.hidden=!1,document.body.style.overflow="hidden",d("#lbClose").focus()},h=()=>{e.hidden=!0,document.body.style.overflow="",o==null||o.focus()};d("#gallery").addEventListener("click",u=>{const c=u.target.closest(".g-item");c&&l(Number(c.dataset.i))}),(v=d("#gMore"))==null||v.addEventListener("click",u=>{document.querySelectorAll(".g-hidden").forEach(c=>c.classList.remove("g-hidden")),u.currentTarget.remove()}),d("#lbClose").addEventListener("click",h),d("#lbPrev").addEventListener("click",()=>t(i-1)),d("#lbNext").addEventListener("click",()=>t(i+1)),e.addEventListener("click",u=>{u.target===e&&h()}),document.addEventListener("keydown",u=>{e.hidden||(u.key==="Escape"?h():u.key==="ArrowLeft"?t(i-1):u.key==="ArrowRight"&&t(i+1))});let p=null;e.addEventListener("touchstart",u=>{p=u.touches[0].clientX},{passive:!0}),e.addEventListener("touchend",u=>{if(p===null)return;const c=u.changedTouches[0].clientX-p;p=null,Math.abs(c)>40&&t(i+(c<0?1:-1))})})();let K;function O(e){const n=d("#toast");n.textContent=e,n.classList.add("show"),clearTimeout(K),K=setTimeout(()=>n.classList.remove("show"),1800)}function f(e,n){var i;const s=()=>{const o=document.createElement("textarea");o.value=e,o.setAttribute("readonly",""),o.style.cssText="position:fixed;opacity:0",document.body.appendChild(o),o.select();let t=!1;try{t=document.execCommand("copy")}catch{}o.remove(),O(t?n:"복사하지 못했어요. 길게 눌러 직접 복사해 주세요")};(i=navigator.clipboard)!=null&&i.writeText?navigator.clipboard.writeText(e).then(()=>O(n),s):s()}d("#copyAddr").addEventListener("click",()=>f(a.venue.address,"주소를 복사했어요"));document.querySelectorAll("[data-copy]").forEach(e=>e.addEventListener("click",()=>f(e.dataset.copy,"계좌번호를 복사했어요")));d("#copyLink").addEventListener("click",()=>f(location.href,"청첩장 링크를 복사했어요"));function re(e){const n=window.Kakao;if(!(n!=null&&n.isInitialized()))return!1;const s={mobileWebUrl:e,webUrl:e},i=[{title:"청첩장 보기",link:s}];return _?n.Share.sendDefault({objectType:"feed",content:{title:a.meta.title,description:a.meta.description,imageUrl:new URL(_,location.href).href,link:s},buttons:i}):n.Share.sendDefault({objectType:"text",text:`${a.meta.title}
${a.meta.description}`,link:s,buttons:i}),!0}d("#share").addEventListener("click",async()=>{const e=location.origin+location.pathname;if(re(e))return;const n={title:a.meta.title,text:a.meta.description,url:e};if(navigator.share)try{await navigator.share(n)}catch(s){s.name!=="AbortError"&&f(location.href,"청첩장 링크를 복사했어요")}else f(location.href,"청첩장 링크를 복사했어요")});
