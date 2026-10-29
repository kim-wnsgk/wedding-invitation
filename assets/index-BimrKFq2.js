(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(a){if(a.ep)return;a.ep=!0;const s=i(a);fetch(a.href,s)}})();const n={meta:{title:"준하 ♥ 재은 결혼합니다",description:"2027년 2월 20일 토요일 오후 3시, 수원 WI컨벤션 W홀"},groom:{name:"김준하",firstName:"준하",englishName:"Junha",father:"김경희",mother:"이선애",relation:"아들"},bride:{name:"이재은",firstName:"재은",englishName:"Jaeeun",father:"이점태",mother:"김성연",relation:"딸"},wedding:{year:2027,month:2,day:20,hour:15,minute:0},greeting:{title:"소중한 분들을 초대합니다",paragraphs:[["서로가 마주 보며 다져온 사랑을","이제 함께 한곳을 바라보며","걸어가고자 합니다."],["저희 두 사람의 새로운 시작을","축복해 주시면 더없는 기쁨으로","간직하겠습니다."]]},venue:{name:"수원 WI컨벤션 W홀",address:"경기도 수원시 팔달구 월드컵로 310",detail:"수원월드컵경기장 내",tel:"031-241-6000",mapQuery:"WI컨벤션"},directions:[{title:"셔틀버스",text:"수인분당선 수원시청역 9번 출구 앞에서 무료 셔틀버스가 약 15~20분 간격으로 운행합니다."},{title:"버스",text:"‘수원월드컵경기장’ 정류장 하차 후 도보 이동"},{title:"자가용",text:"내비게이션에 ‘WI컨벤션’ 또는 ‘수원월드컵경기장’을 입력해 주세요. 동수원IC에서 약 10분 거리입니다."},{title:"주차",text:"수원월드컵경기장 주차장을 이용해 주세요. 2시간 무료이며, 웨딩홀 안내데스크에서 차량 등록을 해 주세요. 경기장 행사가 있는 날은 혼잡할 수 있습니다."}],accounts:{note:["참석이 어려우신 분들을 위해 기재했습니다.","너그러운 마음으로 양해 부탁드립니다."],groom:[{who:"신랑 김준하",bank:"ABC은행",number:"123456789"}],bride:[{who:"신부 이재은",bank:"ABC은행",number:"123456789"}]},closing:"함께해 주셔서 감사합니다.",effects:{monogram:"J&J",snow:!0}},v=e=>document.querySelector(e),o=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),E=e=>e.map(o).join("<br>"),h=e=>String(e).padStart(2,"0"),I=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=n.wedding,$=new Date(Date.UTC(c.year,c.month-1,c.day,c.hour-9,c.minute)),k=new Date(Date.UTC(c.year,c.month-1,c.day)).getUTCDay(),U=["일","월","화","수","목","금","토"],A=["SUN","MON","TUE","WED","THU","FRI","SAT"],W="오후",O=c.hour%12,H=`${W} ${O}시`,L=`${c.year}년 ${c.month}월 ${c.day}일 ${U[k]}요일 ${H}`,P=`${c.year}. ${h(c.month)}. ${h(c.day)} ${A[k]} ${O}:${h(c.minute)} PM`,y=`${n.groom.firstName} ♥ ${n.bride.firstName}`,S=n.effects||{};document.title=n.meta.title;function D(e){return`<svg class="seal ${e}" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" stroke-dasharray="1 5" stroke-linecap="round"/>
    <circle cx="60" cy="60" r="46"/>
    <text x="60" y="62" text-anchor="middle" dominant-baseline="middle">${o(S.monogram||`${n.groom.englishName[0]}&${n.bride.englishName[0]}`)}</text>
  </svg>`}const N=(e,t)=>t.length?`<details>
        <summary>${o(e)}</summary>
        ${t.map(i=>{const r=`${i.bank} ${i.number}`;return`<div class="acct">
              <div><div class="who">${o(i.who)}</div><div class="num">${o(r)}</div></div>
              <button class="btn" type="button" data-copy="${o(r)}">복사</button>
            </div>`}).join("")}
      </details>`:"";v("#app").innerHTML=`
<main class="wrap">
  <section class="hero">
    ${S.snow?'<canvas id="snow" aria-hidden="true"></canvas>':""}
    <div class="hero-in">
      <div class="save">Save the Date</div>
      ${D("seal-hero")}
      <div class="names">${o(n.groom.englishName)}<span>&amp;</span>${o(n.bride.englishName)}</div>
      <div class="ko">${o(n.groom.name)} <i>·</i> ${o(n.bride.name)}</div>
      <div class="date-en">${P}</div>
      <div class="when">${L}<br>${o(n.venue.name)}</div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>

  <section class="greet rv">
    <div class="eyebrow">Invitation</div>
    <h2>${o(n.greeting.title)}</h2>
    ${n.greeting.paragraphs.map(e=>`<p>${E(e)}</p>`).join("")}
    <div class="parents">
      <div>${o(n.groom.father)} · ${o(n.groom.mother)} <span class="rel">의 ${o(n.groom.relation)}</span> <b>${o(n.groom.firstName)}</b></div>
      <div>${o(n.bride.father)} · ${o(n.bride.mother)} <span class="rel">의 ${o(n.bride.relation)}</span> <b>${o(n.bride.firstName)}</b></div>
    </div>
  </section>

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${L}</h2>
    <div class="cal-head"><span>${c.year}</span>${c.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
    <button class="btn ics" type="button" id="ics">내 캘린더에 저장</button>
  </section>

  <section class="rv">
    <div class="eyebrow">Location</div>
    <h2>오시는 길</h2>
    <div class="venue">${o(n.venue.name)}</div>
    <div class="addr">${o(n.venue.address)}</div>
    <div class="addr">${o(n.venue.detail)}${` · Tel. ${o(n.venue.tel)}`}</div>
    <button class="btn copy-addr" type="button" id="copyAddr">주소 복사</button>
    <div class="btn-row">
      <a class="btn" target="_blank" rel="noopener" href="https://map.naver.com/p/search/${encodeURIComponent(n.venue.mapQuery)}">네이버 지도</a>
      <a class="btn" target="_blank" rel="noopener" href="https://map.kakao.com/?q=${encodeURIComponent(n.venue.mapQuery)}">카카오맵</a>
      <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.venue.address)}">구글 지도</a>
    </div>
    <div class="ways">
      ${n.directions.map(e=>`<div><h3>${o(e.title)}</h3><p>${o(e.text)}</p></div>`).join("")}
    </div>
  </section>

  ${`<section class="rv">
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${E(n.accounts.note)}</div>
    ${N("신랑측 계좌번호",n.accounts.groom)}
    ${N("신부측 계좌번호",n.accounts.bride)}
  </section>`}

  <section class="foot rv">
    ${D("seal-foot")}
    <div class="sign">${o(n.groom.englishName)} &amp; ${o(n.bride.englishName)}</div>
    ${o(n.closing)}
    <div class="share-row">
      <button class="link-btn" type="button" id="share">공유하기</button>
      <button class="link-btn" type="button" id="copyLink">링크 복사</button>
    </div>
  </section>
</main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
`;(()=>{const e=s=>s===0?" sun":s===6?" sat":"";let t=A.map((s,d)=>`<div class="dow${e(d)}">${s}</div>`).join("");const i=new Date(c.year,c.month-1,1).getDay(),r=new Date(c.year,c.month,0).getDate();t+='<div class="d"></div>'.repeat(i);const a='<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>';for(let s=1;s<=r;s++){const d=(i+s-1)%7;t+=s===c.day?`<div class="d${e(d)} on">${a}<span>${s}</span></div>`:`<div class="d${e(d)}">${s}</div>`}v("#cal").innerHTML=t})();function C(){const e=$-new Date;if(e<=0){v("#dday").innerHTML=`${o(y)}의 결혼식이 <strong>진행되었습니다</strong>`,v("#count").innerHTML="";return}const t=Math.floor(e/1e3),i=Math.floor(t/86400),r=Math.floor(t%86400/3600),a=Math.floor(t%3600/60),s=t%60;v("#dday").innerHTML=`${o(y)}의 결혼식이 <strong>${i+1}일</strong> 남았습니다`,v("#count").innerHTML=[[i,"Days"],[h(r),"Hours"],[h(a),"Mins"],[h(s),"Secs"]].map(([d,u])=>`<div><b>${d}</b><small>${u}</small></div>`).join("")}C();setInterval(C,1e3);(()=>{const e=document.querySelectorAll(".rv");if(I||!("IntersectionObserver"in window)){e.forEach(i=>i.classList.add("in"));return}const t=new IntersectionObserver(i=>i.forEach(r=>{r.isIntersecting&&(r.target.classList.add("in"),t.unobserve(r.target))}),{threshold:.15});e.forEach(i=>t.observe(i))})();(()=>{const e=v("#snow");if(!e||I)return;const t=e.getContext("2d"),i=e.parentElement;let r=0,a=0,s=[],d=!0,u=0;const b=l=>({x:Math.random()*r,y:l??Math.random()*a,r:.8+Math.random()*2,v:12+Math.random()*22,sway:6+Math.random()*14,ph:Math.random()*Math.PI*2});function w(){const l=Math.min(window.devicePixelRatio||1,2);r=i.clientWidth,a=i.clientHeight,e.width=r*l,e.height=a*l,t.setTransform(l,0,0,l,0,0),s=Array.from({length:Math.round(r/9)},()=>b())}function g(l){const f=Math.min((l-u)/1e3||0,.05);u=l,t.clearRect(0,0,r,a);for(const m of s){m.y+=m.v*f,m.ph+=f*.8,m.y>a+4&&Object.assign(m,b(-4));const R=m.x+Math.sin(m.ph)*m.sway,M=Math.max(0,1-m.y/a)*.9;t.beginPath(),t.arc(R,m.y,m.r,0,Math.PI*2),t.fillStyle=`rgba(255,255,255,${M})`,t.fill(),t.lineWidth=.6,t.strokeStyle=`rgba(92,116,140,${M*.2})`,t.stroke()}d&&requestAnimationFrame(g)}w(),window.addEventListener("resize",w),new IntersectionObserver(([l])=>{const f=d;d=l.isIntersecting,d&&!f&&requestAnimationFrame(m=>{u=m,g(m)})}).observe(i),requestAnimationFrame(l=>{u=l,g(l)})})();let T;function x(e){const t=v("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(T),T=setTimeout(()=>t.classList.remove("show"),1800)}function p(e,t){var r;const i=()=>{const a=document.createElement("textarea");a.value=e,a.setAttribute("readonly",""),a.style.cssText="position:fixed;opacity:0",document.body.appendChild(a),a.select();let s=!1;try{s=document.execCommand("copy")}catch{}a.remove(),x(s?t:"복사하지 못했어요. 길게 눌러 직접 복사해 주세요")};(r=navigator.clipboard)!=null&&r.writeText?navigator.clipboard.writeText(e).then(()=>x(t),i):i()}v("#copyAddr").addEventListener("click",()=>p(n.venue.address,"주소를 복사했어요"));document.querySelectorAll("[data-copy]").forEach(e=>e.addEventListener("click",()=>p(e.dataset.copy,"계좌번호를 복사했어요")));v("#copyLink").addEventListener("click",()=>p(location.href,"청첩장 링크를 복사했어요"));v("#share").addEventListener("click",async()=>{const e={title:n.meta.title,text:n.meta.description,url:location.href};if(navigator.share)try{await navigator.share(e)}catch(t){t.name!=="AbortError"&&p(location.href,"청첩장 링크를 복사했어요")}else p(location.href,"청첩장 링크를 복사했어요")});v("#ics").addEventListener("click",()=>{const e=s=>s.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),t=s=>String(s).replace(/[\\,;]/g,d=>`\\${d}`),i=new Date($.getTime()+72e5),r=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//wedding-invitation//KO","BEGIN:VEVENT",`UID:${e($)}-wedding@invitation`,`DTSTAMP:${e(new Date)}`,`DTSTART:${e($)}`,`DTEND:${e(i)}`,`SUMMARY:${t(`${y} 결혼식`)}`,`LOCATION:${t(`${n.venue.name}, ${n.venue.address}`)}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`),a=document.createElement("a");a.href=URL.createObjectURL(new Blob([r],{type:"text/calendar;charset=utf-8"})),a.download="wedding.ics",document.body.appendChild(a),a.click(),a.remove(),setTimeout(()=>URL.revokeObjectURL(a.href),1e3)});
