(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&r(d)}).observe(document,{childList:!0,subtree:!0});function i(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(t){if(t.ep)return;t.ep=!0;const o=i(t);fetch(t.href,o)}})();const s={meta:{title:"준하 ♥ 재은 결혼합니다"},groom:{name:"김준하",firstName:"준하",englishName:"Junha",father:"김경희",mother:"이선애",relation:"아들"},bride:{name:"이재은",firstName:"재은",englishName:"Jaeeun",father:"이점태",mother:"김성연",relation:"딸"},wedding:{year:2027,month:2,day:20,hour:15,minute:0},greeting:{title:"소중한 분들을 초대합니다",paragraphs:[["서로가 마주 보며 다져온 사랑을","이제 함께 한곳을 바라보며","걸어가고자 합니다."],["저희 두 사람의 새로운 시작을","축복해 주시면 더없는 기쁨으로","간직하겠습니다."]]},venue:{name:"수원 WI컨벤션 W홀",address:"경기도 수원시 팔달구 월드컵로 310",detail:"수원월드컵경기장 내",tel:"031-241-6000",mapQuery:"WI컨벤션"},directions:[{title:"셔틀버스",text:"수인분당선 수원시청역 9번 출구 앞에서 무료 셔틀버스가 약 15~20분 간격으로 운행합니다."},{title:"버스",text:"‘수원월드컵경기장’ 정류장 하차 후 도보 이동"},{title:"자가용",text:"내비게이션에 ‘WI컨벤션’ 또는 ‘수원월드컵경기장’을 입력해 주세요. 동수원IC에서 약 10분 거리입니다."},{title:"주차",text:"수원월드컵경기장 주차장을 이용해 주세요. 2시간 무료이며, 웨딩홀 안내데스크에서 차량 등록을 해 주세요. 경기장 행사가 있는 날은 혼잡할 수 있습니다."}],accounts:{note:["참석이 어려우신 분들을 위해 기재했습니다.","너그러운 마음으로 양해 부탁드립니다."],groom:[{who:"신랑 김준하",bank:"ABC은행",number:"123456789"}],bride:[{who:"신부 이재은",bank:"ABC은행",number:"123456789"}]},closing:"함께해 주셔서 감사합니다.",effects:{monogram:"J&J",snow:!0}},h=e=>document.querySelector(e),a=e=>String(e).replace(/[&<>"']/g,n=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[n]),x=e=>e.map(a).join("<br>"),v=e=>String(e).padStart(2,"0"),I=window.matchMedia("(prefers-reduced-motion: reduce)").matches,c=s.wedding,f=new Date(Date.UTC(c.year,c.month-1,c.day,c.hour-9,c.minute)),A=new Date(Date.UTC(c.year,c.month-1,c.day)).getUTCDay(),U=["일","월","화","수","목","금","토"],O=["SUN","MON","TUE","WED","THU","FRI","SAT"],W="오후",S=c.hour%12,H=`${W} ${S}시`,E=`${c.year}년 ${c.month}월 ${c.day}일 ${U[A]}요일 ${H}`,P=`${c.year}. ${v(c.month)}. ${v(c.day)} ${O[A]} ${S}:${v(c.minute)} PM`,g=`${s.groom.firstName} ♥ ${s.bride.firstName}`,k=s.effects||{};document.title=s.meta.title;let j=0;function D(e){const n=`seal${++j}`,i=[];for(let r=0;r<120;r++){const t=r/120*Math.PI*2,o=52+2.4*Math.sin(t*9)+1.4*Math.sin(t*4+1.3)+.8*Math.sin(t*17);i.push(`${(60+o*Math.cos(t)).toFixed(1)},${(60+o*Math.sin(t)).toFixed(1)}`)}return`<svg class="seal ${e}" viewBox="0 0 120 120" aria-hidden="true">
    <defs>
      <radialGradient id="${n}g" cx="38%" cy="32%" r="75%">
        <stop offset="0" stop-color="#C98B97"/><stop offset=".55" stop-color="#A8616E"/><stop offset="1" stop-color="#7E4250"/>
      </radialGradient>
    </defs>
    <polygon points="${i.join(" ")}" fill="url(#${n}g)"/>
    <circle cx="60" cy="60" r="38" fill="none" stroke="rgba(0,0,0,.14)" stroke-width="2.5"/>
    <circle cx="60" cy="60" r="36" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="1"/>
    <text x="60" y="61" text-anchor="middle" dominant-baseline="middle">${a(k.monogram||`${s.groom.englishName[0]}&${s.bride.englishName[0]}`)}</text>
  </svg>`}const N=(e,n)=>n.length?`<details>
        <summary>${a(e)}</summary>
        ${n.map(i=>{const r=`${i.bank} ${i.number}`;return`<div class="acct">
              <div><div class="who">${a(i.who)}</div><div class="num">${a(r)}</div></div>
              <button class="btn" type="button" data-copy="${a(r)}">복사</button>
            </div>`}).join("")}
      </details>`:"";h("#app").innerHTML=`
<main class="wrap">
  <section class="hero">
    ${k.snow?'<canvas id="snow" aria-hidden="true"></canvas>':""}
    <div class="hero-in">
      <div class="save">Save the Date</div>
      ${D("seal-hero")}
      <div class="names">${a(s.groom.englishName)}<span>&amp;</span>${a(s.bride.englishName)}</div>
      <div class="ko">${a(s.groom.name)} <i>·</i> ${a(s.bride.name)}</div>
      <div class="date-en">${P}</div>
      <div class="when">${E}<br>${a(s.venue.name)}</div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>

  <section class="greet rv">
    <div class="eyebrow">Invitation</div>
    <h2>${a(s.greeting.title)}</h2>
    ${s.greeting.paragraphs.map(e=>`<p>${x(e)}</p>`).join("")}
    <div class="parents">
      <div>${a(s.groom.father)} · ${a(s.groom.mother)} <span class="rel">의 ${a(s.groom.relation)}</span> <b>${a(s.groom.firstName)}</b></div>
      <div>${a(s.bride.father)} · ${a(s.bride.mother)} <span class="rel">의 ${a(s.bride.relation)}</span> <b>${a(s.bride.firstName)}</b></div>
    </div>
  </section>

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${E}</h2>
    <div class="cal-head"><span>${c.year}</span>${c.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
    <button class="btn ics" type="button" id="ics">내 캘린더에 저장</button>
  </section>

  <section class="rv">
    <div class="eyebrow">Location</div>
    <h2>오시는 길</h2>
    <div class="venue">${a(s.venue.name)}</div>
    <div class="addr">${a(s.venue.address)}</div>
    <div class="addr">${a(s.venue.detail)}${` · Tel. ${a(s.venue.tel)}`}</div>
    <button class="btn copy-addr" type="button" id="copyAddr">주소 복사</button>
    <div class="btn-row">
      <a class="btn" target="_blank" rel="noopener" href="https://map.naver.com/p/search/${encodeURIComponent(s.venue.mapQuery)}">네이버 지도</a>
      <a class="btn" target="_blank" rel="noopener" href="https://map.kakao.com/?q=${encodeURIComponent(s.venue.mapQuery)}">카카오맵</a>
      <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.venue.address)}">구글 지도</a>
    </div>
    <div class="ways">
      ${s.directions.map(e=>`<div><h3>${a(e.title)}</h3><p>${a(e.text)}</p></div>`).join("")}
    </div>
  </section>

  ${`<section class="rv">
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${x(s.accounts.note)}</div>
    ${N("신랑측 계좌번호",s.accounts.groom)}
    ${N("신부측 계좌번호",s.accounts.bride)}
  </section>`}

  <section class="foot rv">
    ${D("seal-foot")}
    <div class="sign">${a(s.groom.englishName)} &amp; ${a(s.bride.englishName)}</div>
    ${a(s.closing)}<br>
    <button class="btn" type="button" id="share">청첩장 링크 복사</button>
  </section>
</main>
<div class="toast" id="toast" role="status" aria-live="polite"></div>
`;(()=>{const e=o=>o===0?" sun":o===6?" sat":"";let n=O.map((o,d)=>`<div class="dow${e(d)}">${o}</div>`).join("");const i=new Date(c.year,c.month-1,1).getDay(),r=new Date(c.year,c.month,0).getDate();n+='<div class="d"></div>'.repeat(i);const t='<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>';for(let o=1;o<=r;o++){const d=(i+o-1)%7;n+=o===c.day?`<div class="d${e(d)} on">${t}<span>${o}</span></div>`:`<div class="d${e(d)}">${o}</div>`}h("#cal").innerHTML=n})();function C(){const e=f-new Date;if(e<=0){h("#dday").innerHTML=`${a(g)}의 결혼식이 <strong>진행되었습니다</strong>`,h("#count").innerHTML="";return}const n=Math.floor(e/1e3),i=Math.floor(n/86400),r=Math.floor(n%86400/3600),t=Math.floor(n%3600/60),o=n%60;h("#dday").innerHTML=`${a(g)}의 결혼식이 <strong>${i+1}일</strong> 남았습니다`,h("#count").innerHTML=[[i,"Days"],[v(r),"Hours"],[v(t),"Mins"],[v(o),"Secs"]].map(([d,u])=>`<div><b>${d}</b><small>${u}</small></div>`).join("")}C();setInterval(C,1e3);(()=>{const e=document.querySelectorAll(".rv");if(I||!("IntersectionObserver"in window)){e.forEach(i=>i.classList.add("in"));return}const n=new IntersectionObserver(i=>i.forEach(r=>{r.isIntersecting&&(r.target.classList.add("in"),n.unobserve(r.target))}),{threshold:.15});e.forEach(i=>n.observe(i))})();(()=>{const e=h("#snow");if(!e||I)return;const n=e.getContext("2d"),i=e.parentElement;let r=0,t=0,o=[],d=!0,u=0;const b=l=>({x:Math.random()*r,y:l??Math.random()*t,r:.8+Math.random()*2,v:12+Math.random()*22,sway:6+Math.random()*14,ph:Math.random()*Math.PI*2});function w(){const l=Math.min(window.devicePixelRatio||1,2);r=i.clientWidth,t=i.clientHeight,e.width=r*l,e.height=t*l,n.setTransform(l,0,0,l,0,0),o=Array.from({length:Math.round(r/9)},()=>b())}function $(l){const p=Math.min((l-u)/1e3||0,.05);u=l,n.clearRect(0,0,r,t);for(const m of o){m.y+=m.v*p,m.ph+=p*.8,m.y>t+4&&Object.assign(m,b(-4));const R=m.x+Math.sin(m.ph)*m.sway,M=Math.max(0,1-m.y/t)*.9;n.beginPath(),n.arc(R,m.y,m.r,0,Math.PI*2),n.fillStyle=`rgba(255,255,255,${M})`,n.fill(),n.lineWidth=.6,n.strokeStyle=`rgba(168,97,110,${M*.22})`,n.stroke()}d&&requestAnimationFrame($)}w(),window.addEventListener("resize",w),new IntersectionObserver(([l])=>{const p=d;d=l.isIntersecting,d&&!p&&requestAnimationFrame(m=>{u=m,$(m)})}).observe(i),requestAnimationFrame(l=>{u=l,$(l)})})();let T;function L(e){const n=h("#toast");n.textContent=e,n.classList.add("show"),clearTimeout(T),T=setTimeout(()=>n.classList.remove("show"),1800)}function y(e,n){var r;const i=()=>{const t=document.createElement("textarea");t.value=e,t.setAttribute("readonly",""),t.style.cssText="position:fixed;opacity:0",document.body.appendChild(t),t.select();let o=!1;try{o=document.execCommand("copy")}catch{}t.remove(),L(o?n:"복사하지 못했어요. 길게 눌러 직접 복사해 주세요")};(r=navigator.clipboard)!=null&&r.writeText?navigator.clipboard.writeText(e).then(()=>L(n),i):i()}h("#copyAddr").addEventListener("click",()=>y(s.venue.address,"주소를 복사했어요"));document.querySelectorAll("[data-copy]").forEach(e=>e.addEventListener("click",()=>y(e.dataset.copy,"계좌번호를 복사했어요")));h("#share").addEventListener("click",()=>y(location.href,"청첩장 링크를 복사했어요"));h("#ics").addEventListener("click",()=>{const e=o=>o.toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,""),n=o=>String(o).replace(/[\\,;]/g,d=>`\\${d}`),i=new Date(f.getTime()+72e5),r=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//wedding-invitation//KO","BEGIN:VEVENT",`UID:${e(f)}-wedding@invitation`,`DTSTAMP:${e(new Date)}`,`DTSTART:${e(f)}`,`DTEND:${e(i)}`,`SUMMARY:${n(`${g} 결혼식`)}`,`LOCATION:${n(`${s.venue.name}, ${s.venue.address}`)}`,"END:VEVENT","END:VCALENDAR"].join(`\r
`),t=document.createElement("a");t.href=URL.createObjectURL(new Blob([r],{type:"text/calendar;charset=utf-8"})),t.download="wedding.ics",document.body.appendChild(t),t.click(),t.remove(),setTimeout(()=>URL.revokeObjectURL(t.href),1e3)});
