(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function o(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(i){if(i.ep)return;i.ep=!0;const a=o(i);fetch(i.href,a)}})();const Q=""+new URL("KakaoTalk_20261029_223737949_04-Dc1mySsh.webp",import.meta.url).href,Z=""+new URL("JC_00629-CFBRVBsb.webp",import.meta.url).href,G=""+new URL("JC_00643-IT4I41Ea.webp",import.meta.url).href,ee=""+new URL("JC_01262-DgmqgBbh.webp",import.meta.url).href,te=""+new URL("JC_01355-BNTTDyWi.webp",import.meta.url).href,ae=""+new URL("JC_01373-DpI-pvgI.webp",import.meta.url).href,ne=""+new URL("JC_01437-BdeEpMYX.webp",import.meta.url).href,oe=""+new URL("JC_01472-B0sKp6Zw.webp",import.meta.url).href,se=""+new URL("KakaoTalk_20261029_223737949 copy-BpHqS77F.webp",import.meta.url).href,ie=""+new URL("KakaoTalk_20261029_223737949_01-Ddo5uJdo.webp",import.meta.url).href,re=""+new URL("KakaoTalk_20261029_223737949_02-DyU9efG9.webp",import.meta.url).href,le=""+new URL("KakaoTalk_20261029_223737949_03-BF2uVxMw.webp",import.meta.url).href,ce=""+new URL("JC_00629-CaqM5AsW.webp",import.meta.url).href,de=""+new URL("JC_00643-eqLQgBiU.webp",import.meta.url).href,me=""+new URL("JC_01262-DDRYvNs0.webp",import.meta.url).href,he=""+new URL("JC_01355-Bm_HchkM.webp",import.meta.url).href,pe=""+new URL("JC_01373-0I900OZ5.webp",import.meta.url).href,ue=""+new URL("JC_01437-YCYTuTbV.webp",import.meta.url).href,ge=""+new URL("JC_01472-CF-lMpPm.webp",import.meta.url).href,fe=""+new URL("KakaoTalk_20261029_223737949 copy-Dq2A0w_C.webp",import.meta.url).href,ve=""+new URL("KakaoTalk_20261029_223737949_01-BOqhy5WE.webp",import.meta.url).href,be=""+new URL("KakaoTalk_20261029_223737949_02-BJMUnO9v.webp",import.meta.url).href,_e=""+new URL("KakaoTalk_20261029_223737949_03-Dqd6hg4f.webp",import.meta.url).href,n={meta:{title:"준하 ♥ 재은 결혼합니다",description:"2027년 2월 20일 토요일 오후 3시, 수원 WI컨벤션 W홀"},groom:{name:"김준하",firstName:"준하",englishName:"Junha",father:"김경희",mother:"이선애",relation:"아들"},bride:{name:"이재은",firstName:"재은",englishName:"Jaeeun",father:"이점태",mother:"김성연",relation:"딸"},wedding:{year:2027,month:2,day:20,hour:15,minute:0},greeting:{title:"열 번째 겨울에, 결혼합니다",paragraphs:[["2017년 처음 만난 두 사람이","어느덧 열 번의 겨울을 함께 보냈습니다."],["서로에게 가장 편한 사람이 되어 준 시간을","이제 평생의 약속으로 이어 가려 합니다."],["따뜻한 마음으로 함께해 주시면","더없는 기쁨으로 간직하겠습니다."]],since:2017},venue:{name:"수원 WI컨벤션 W홀",address:"경기도 수원시 팔달구 월드컵로 310",detail:"수원월드컵경기장 내",tel:"031-241-6000",mapQuery:"WI컨벤션"},directions:[{title:"셔틀버스",text:"수인분당선 수원시청역 9번 출구 앞에서 무료 셔틀버스가 약 15~20분 간격으로 운행합니다."},{title:"버스",text:"‘수원월드컵경기장’ 정류장 하차 후 도보 이동"},{title:"자가용",text:"내비게이션에 ‘WI컨벤션’ 또는 ‘수원월드컵경기장’을 입력해 주세요. 동수원IC에서 약 10분 거리입니다."},{title:"주차",text:"수원월드컵경기장 주차장을 이용해 주세요. 2시간 무료이며, 웨딩홀 안내데스크에서 차량 등록을 해 주세요. 경기장 행사가 있는 날은 혼잡할 수 있습니다."}],accounts:{note:["참석이 어려우신 분들을 위해 기재했습니다.","너그러운 마음으로 양해 부탁드립니다."],groom:[{who:"신랑 김준하",bank:"우리은행",number:"1002-358-192105"},{who:"아버지 김경희",bank:"신한은행",number:"110-134-651499"},{who:"어머니 이선애",bank:"농협은행",number:"1094-12-019067"}],bride:[{who:"신부 이재은",bank:"ABC은행",number:"123456789"}]},closing:"함께해 주셔서 감사합니다.",effects:{eyebrow:"The Wedding of",monogram:"J&J",snow:!0}},p=e=>document.querySelector(e),r=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),S=e=>e.map(r).join("<br>"),$=e=>String(e).padStart(2,"0"),C=(e,t)=>[...e].map((o,s)=>`<i style="--i:${t+s}">${r(o)}</i>`).join(""),x=window.matchMedia("(prefers-reduced-motion: reduce)").matches,u=n.wedding,ye=new Date(Date.UTC(u.year,u.month-1,u.day,u.hour-9,u.minute)),z=new Date(Date.UTC(u.year,u.month-1,u.day)).getUTCDay(),we=["일","월","화","수","목","금","토"],V=["SUN","MON","TUE","WED","THU","FRI","SAT"],$e="오후",Y=u.hour%12,ke=`${$e} ${Y}시`,R=`${u.year}년 ${u.month}월 ${u.day}일 ${we[z]}요일 ${ke}`,q=`${u.year}. ${$(u.month)}. ${$(u.day)} ${V[z]} ${Y}:${$(u.minute)} PM`,D=`${n.groom.firstName} ♥ ${n.bride.firstName}`,U=n.effects||{},W=e=>Object.keys(e).sort((t,o)=>t.localeCompare(o,void 0,{numeric:!0})).map(t=>e[t]),j=W(Object.assign({"/photos/main/KakaoTalk_20261029_223737949_04.jpg":Q}))[0],T=W(Object.assign({"/photos/gallery/JC_00629.jpg":Z,"/photos/gallery/JC_00643.jpg":G,"/photos/gallery/JC_01262.jpg":ee,"/photos/gallery/JC_01355.jpg":te,"/photos/gallery/JC_01373.jpg":ae,"/photos/gallery/JC_01437.jpg":ne,"/photos/gallery/JC_01472.jpg":oe,"/photos/gallery/KakaoTalk_20261029_223737949 copy.jpg":se,"/photos/gallery/KakaoTalk_20261029_223737949_01.jpg":ie,"/photos/gallery/KakaoTalk_20261029_223737949_02.jpg":re,"/photos/gallery/KakaoTalk_20261029_223737949_03.jpg":le})),J=W(Object.assign({"/photos/gallery/JC_00629.jpg":ce,"/photos/gallery/JC_00643.jpg":de,"/photos/gallery/JC_01262.jpg":me,"/photos/gallery/JC_01355.jpg":he,"/photos/gallery/JC_01373.jpg":pe,"/photos/gallery/JC_01437.jpg":ue,"/photos/gallery/JC_01472.jpg":ge,"/photos/gallery/KakaoTalk_20261029_223737949 copy.jpg":fe,"/photos/gallery/KakaoTalk_20261029_223737949_01.jpg":ve,"/photos/gallery/KakaoTalk_20261029_223737949_02.jpg":be,"/photos/gallery/KakaoTalk_20261029_223737949_03.jpg":_e}));document.title=n.meta.title;function O(e){const t=[[12,62],[27,48],[44,70],[58,52],[73,66],[88,50]].map(([o,s],i)=>`<i style="left:${o}%;top:${s}%;--i:${i}"></i>`).join("");return`<div class="drift ${e}" aria-hidden="true">
    <svg viewBox="0 0 400 90" preserveAspectRatio="none">
      <path class="d-back" d="M0 52C40 30 80 40 120 34s70-22 110-12 60 26 100 16 50-24 70-20V90H0Z"/>
      <path class="d-front" d="M0 66c30-14 60-12 90-4s52 6 82-6 58-16 92-4 40 18 70 10 44-16 66-14V90H0Z"/>
    </svg>${t}
  </div>`}function H(e){return`<svg class="seal ${e}" viewBox="0 0 120 120" aria-hidden="true">
    <circle class="ring-dot" cx="60" cy="60" r="54" stroke-dasharray="1 5" stroke-linecap="round"/>
    <circle class="ring" cx="60" cy="60" r="46" pathLength="1" transform="rotate(-90 60 60)"/>
    <text x="60" y="62" text-anchor="middle" dominant-baseline="middle">${r(U.monogram||`${n.groom.englishName[0]}&${n.bride.englishName[0]}`)}</text>
  </svg>`}const K=(e,t)=>t.length?`<details>
        <summary>${r(e)}</summary>
        ${t.map(o=>{const s=`${o.bank} ${o.number}`;return`<div class="acct">
              <div><div class="who">${r(o.who)}</div><div class="num">${r(s)}</div></div>
              <button class="btn" type="button" data-copy="${r(s)}">복사</button>
            </div>`}).join("")}
      </details>`:"";p("#app").innerHTML=`
<main class="wrap">
  ${j?`<section class="hero hero-full">
    <div class="cover"><img src="${j}" alt="${r(D)}" fetchpriority="high">${O("drift-cover")}</div>
    <div class="hero-in">
      <div class="save">${r(U.eyebrow||"The Wedding of")}</div>
      <div class="names">
        <span class="sr">${r(n.groom.englishName)} &amp; ${r(n.bride.englishName)}</span>
        <span class="nm" aria-hidden="true">${C(n.groom.englishName,0)}</span>
        <span class="amp" aria-hidden="true">&amp;</span>
        <span class="nm" aria-hidden="true">${C(n.bride.englishName,n.groom.englishName.length+2)}</span>
      </div>
      <div class="ko">${r(n.groom.name)} <i>·</i> ${r(n.bride.name)}</div>
      <div class="date-en">${q}</div>
      <div class="when">${R}<br>${r(n.venue.name)}</div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>`:`<section class="hero">
    <div class="hero-in">
      <div class="save">${r(U.eyebrow||"The Wedding of")}</div>
      ${H("seal-hero")}
      <div class="names">
        <span class="sr">${r(n.groom.englishName)} &amp; ${r(n.bride.englishName)}</span>
        <span class="nm" aria-hidden="true">${C(n.groom.englishName,0)}</span>
        <span class="amp" aria-hidden="true">&amp;</span>
        <span class="nm" aria-hidden="true">${C(n.bride.englishName,n.groom.englishName.length+2)}</span>
      </div>
      <div class="ko">${r(n.groom.name)} <i>·</i> ${r(n.bride.name)}</div>
      <div class="date-en">${q}</div>
      <div class="when">${R}<br>${r(n.venue.name)}</div>
    </div>
    <div class="scroll-cue" aria-hidden="true"><span></span></div>
  </section>`}

  <section class="greet rv">
    <div class="eyebrow">Invitation</div>
    <h2>${r(n.greeting.title)}</h2>
    ${n.greeting.paragraphs.map(e=>`<p>${S(e)}</p>`).join("")}
    ${`<figure class="since" aria-label="${n.greeting.since}년부터 ${u.year}년까지">
      <svg viewBox="0 0 320 112" aria-hidden="true">
        <path class="since-path" d="M22 74C64 26 104 102 158 68S250 26 296 56"/>
        <g class="since-nodes"></g>
      </svg>
      <figcaption>처음 만난 해부터 열 번째 겨울까지</figcaption>
    </figure>`}
    <div class="parents">
      <div>${r(n.groom.father)} · ${r(n.groom.mother)} <span class="rel">의 ${r(n.groom.relation)}</span> <b>${r(n.groom.name)}</b></div>
      <div>${r(n.bride.father)} · ${r(n.bride.mother)} <span class="rel">의 ${r(n.bride.relation)}</span> <b>${r(n.bride.name)}</b></div>
    </div>
  </section>

  ${J.length?`<section class="rv">
    <div class="eyebrow">Gallery</div>
    <h2>우리의 사진</h2>
    <div class="carousel" id="gallery">
      ${J.map((e,t)=>`<button type="button" class="slide" data-i="${t}" aria-label="사진 ${t+1} 크게 보기">
          <span class="polaroid"><img src="${e}" alt="" loading="lazy" draggable="false"><small>${$(t+1)}</small></span>
        </button>`).join("")}
    </div>
    <div class="g-nav">
      <button type="button" id="gPrev" aria-label="이전 사진">&#8249;</button>
      <span id="gCount">1 / ${J.length}</span>
      <button type="button" id="gNext" aria-label="다음 사진">&#8250;</button>
    </div>
  </section>`:""}

  <section class="rv">
    <div class="eyebrow">Wedding Day</div>
    <h2>${R}</h2>
    <div class="cal-head"><span>${u.year}</span>${u.month}월</div>
    <div class="cal" id="cal"></div>
    <div class="dday" id="dday"></div>
    <div class="count" id="count"></div>
  </section>

  <section class="rv">
    <div class="eyebrow">Location</div>
    <h2>오시는 길</h2>
    <div class="venue">${r(n.venue.name)}</div>
    <div class="addr">${r(n.venue.address)}</div>
    <div class="addr">${r(n.venue.detail)}${` · Tel. ${r(n.venue.tel)}`}</div>
    <div class="map">
      <iframe src="https://maps.google.com/maps?q=${encodeURIComponent(n.venue.address)}&z=16&output=embed" title="${r(n.venue.name)} 지도" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
    <button class="btn copy-addr" type="button" id="copyAddr">주소 복사</button>
    <div class="btn-row">
      <a class="btn" target="_blank" rel="noopener" href="https://map.naver.com/p/search/${encodeURIComponent(n.venue.mapQuery)}">네이버 지도</a>
      <a class="btn" target="_blank" rel="noopener" href="https://map.kakao.com/?q=${encodeURIComponent(n.venue.mapQuery)}">카카오맵</a>
      <a class="btn" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(n.venue.address)}">구글 지도</a>
    </div>
    <div class="ways">
      ${n.directions.map(e=>`<div><h3>${r(e.title)}</h3><p>${r(e.text)}</p></div>`).join("")}
    </div>
  </section>

  ${`<section class="rv">
    <div class="eyebrow">With Heart</div>
    <h2>마음 전하실 곳</h2>
    <div class="note">${S(n.accounts.note)}</div>
    ${K("신랑측 계좌번호",n.accounts.groom)}
    ${K("신부측 계좌번호",n.accounts.bride)}
  </section>`}

  <section class="foot rv">
    ${H("seal-foot")}
    <div class="sign">${r(n.groom.englishName)} &amp; ${r(n.bride.englishName)}</div>
    ${r(n.closing)}
    <div class="share-row">
      <button class="link-btn" type="button" id="share">공유하기</button>
      <button class="link-btn" type="button" id="copyLink">링크 복사</button>
    </div>
    ${O("drift-foot")}
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
`;(()=>{const e=a=>a===0?" sun":a===6?" sat":"";let t=V.map((a,d)=>`<div class="dow${e(d)}" style="--i:${d}">${a}</div>`).join("");const o=new Date(u.year,u.month-1,1).getDay(),s=new Date(u.year,u.month,0).getDate();t+='<div class="d"></div>'.repeat(o);const i=`<svg viewBox="0 0 48 48" aria-hidden="true"><path pathLength="1" d="M37 11C30 4 14 5 8 16S7 40 22 43s21-6 22-18-7-18-17-19"/></svg>
    <svg class="cal-flake" viewBox="-10 -10 20 20" aria-hidden="true"><path d="M0-9V9M-7.8-4.5 7.8 4.5M-7.8 4.5 7.8-4.5M0-5.5l2.4-2M0-5.5l-2.4-2M0 5.5l2.4 2M0 5.5l-2.4 2"/></svg>`;for(let a=1;a<=s;a++){const d=(o+a-1)%7,b=`style="--i:${7+o+a}"`;t+=a===u.day?`<div class="d${e(d)} on" ${b}>${i}<span>${a}</span></div>`:`<div class="d${e(d)}" ${b}>${a}</div>`}p("#cal").innerHTML=t})();(()=>{const e=p(".since-path");if(!e)return;const t=n.greeting.since,o=u.year-t,s=e.getTotalLength();e.style.setProperty("--len",s);const i="M0-4.2V4.2M-3.6-2.1 3.6 2.1M-3.6 2.1 3.6-2.1";let a="";for(let d=0;d<=o;d++){const b=e.getPointAtLength(s*d/o),g=b.x.toFixed(1),_=b.y.toFixed(1),y=`style="--t:${(.15+2.1*d/o).toFixed(2)}s"`;d===0?a+=`<g transform="translate(${g} ${_})"><g class="node" ${y}><circle r="4.2" class="dot"/>
        <text y="22" text-anchor="middle">${t}</text></g></g>`:d===o?a+=`<g transform="translate(${g} ${_})"><g class="node rings" ${y}>
        <circle cx="-3.6" r="6.2"/><circle cx="3.6" r="6.2"/>
        <text y="-14" text-anchor="middle">${u.year}</text></g></g>`:a+=`<g transform="translate(${g} ${_})"><g class="node" ${y}><circle r="5" class="bg"/><path d="${i}" class="fl"/></g></g>`}p(".since-nodes").innerHTML=a})();p("#dday").innerHTML=`${r(D)}의 결혼식이 <strong id="ddayNum"></strong> 남았습니다`;p("#count").innerHTML=["Days","Hours","Mins","Secs"].map(e=>`<div><b></b><small>${e}</small></div>`).join("");const Me=[...document.querySelectorAll("#count b")];let N=0,E=!1,P=!1;function X(){const e=ye-new Date;if(e<=0){p("#dday").innerHTML=`${r(D)}의 결혼식이 <strong>진행되었습니다</strong>`,p("#count").innerHTML="";return}const t=Math.floor(e/1e3),o=Math.floor(t/86400),s=Math.floor(t%86400/3600),i=Math.floor(t%3600/60),a=t%60;N=o+1,E||(p("#ddayNum").textContent=`${N}일`),[o,$(s),$(i),$(a)].forEach((d,b)=>{const g=Me[b];g.textContent!==String(d)&&(g.textContent=d,P&&!x&&(g.classList.remove("roll"),g.offsetWidth,g.classList.add("roll")))}),P=!0}X();setInterval(X,1e3);const Le=[["section:not(.hero) > .eyebrow","track"],["section:not(.hero) > h2","blur",()=>120],[".greet > p","up",e=>200+e*140],[".parents > div:first-child","left"],[".parents > div:last-child","right",()=>150],[".carousel","frost",()=>150],[".g-nav, .since, .cal-head, .dday, .count, .venue, .addr, .copy-addr, .note, .foot .sign, .share-row","up"],[".btn-row .btn","up",e=>e*90],[".map","zoom"],[".ways > div","left",e=>e*110],["details","up",e=>e*120]];(()=>{Le.forEach(([a,d,b])=>document.querySelectorAll(a).forEach((g,_)=>{g.classList.add("a",`a-${d}`),b&&g.style.setProperty("--d",`${b(_)}ms`)}));const e=document.querySelectorAll(".a, .cal, .seal-foot, .drift-foot, section:not(.hero)");if(x||!("IntersectionObserver"in window)){e.forEach(a=>a.classList.add("in"));return}const t=a=>{a.classList.contains("in")||(a.classList.add("in"),a.id==="dday"&&xe())},o=new IntersectionObserver(a=>a.forEach(d=>d.isIntersecting&&t(d.target)),{rootMargin:"0px 0px -12% 0px"}),s=new IntersectionObserver(a=>a.forEach(d=>!d.isIntersecting&&d.target.classList.remove("in")));e.forEach(a=>{o.observe(a),s.observe(a)}),window.addEventListener("scroll",()=>{window.innerHeight+window.scrollY<document.documentElement.scrollHeight-4||e.forEach(a=>a.getBoundingClientRect().top<window.innerHeight&&t(a))},{passive:!0});const i=p(".hero");i.classList.add("play"),new IntersectionObserver(([a])=>i.classList.toggle("play",a.isIntersecting)).observe(i)})();function xe(){const e=p("#ddayNum");if(!e||!N||E)return;E=!0;const t=performance.now(),o=1400,s=i=>{const a=Math.min((i-t)/o,1);e.textContent=`${Math.round(N*(1-Math.pow(1-a,3)))}일`,a<1?requestAnimationFrame(s):E=!1};requestAnimationFrame(s)}(()=>{if(x)return;const e=document.createElement("div");e.className="progress",document.body.appendChild(e);const t=p(".cover img");let o=!1;const s=()=>{o=!1;const i=window.scrollY,a=document.documentElement.scrollHeight-window.innerHeight;e.style.transform=`scaleX(${a>0?Math.min(i/a,1):0})`,t&&i<window.innerHeight*1.5&&(t.style.translate=`0 ${-Math.min(i*.12,52)}px`)};window.addEventListener("scroll",()=>{o||(o=!0,requestAnimationFrame(s))},{passive:!0}),s()})();(()=>{if(!U.snow||x)return;const e=document.createElement("canvas");e.className="snow",e.setAttribute("aria-hidden","true"),document.body.appendChild(e);const t=e.getContext("2d");let o=0,s=0,i=[],a=[],d=0,b=0;const g=f=>{const m=.4+Math.random(),l=Math.random()<.12;return{x:Math.random()*(o+80)-40,y:f?-12:Math.random()*s,z:m,crystal:l,r:l?(4+Math.random()*4)*m:(.7+Math.random()*1.8)*m,v:(l?18:26)*m+Math.random()*14,sway:8+Math.random()*18,ph:Math.random()*Math.PI*2,rot:Math.random()*Math.PI,spin:(Math.random()-.5)*1.2}};function _(){const f=Math.min(window.devicePixelRatio||1,2);o=window.innerWidth,s=window.innerHeight,e.width=o*f,e.height=s*f,t.setTransform(f,0,0,f,0,0);const m=Math.max(50,Math.min(130,Math.round(o*s/6500)));i=Array.from({length:m},()=>g(!1))}function y(f,m,l,v){t.beginPath(),t.arc(f,m,l,0,Math.PI*2),t.fillStyle=`rgba(255,255,255,${v})`,t.fill(),t.lineWidth=.7,t.strokeStyle=`rgba(110,140,168,${v*.38})`,t.stroke()}function k(f,m,l,v,c){t.save(),t.translate(f,m),t.rotate(v),t.beginPath();for(let h=0;h<6;h++)t.rotate(Math.PI/3),t.moveTo(0,0),t.lineTo(0,-l),t.moveTo(0,-l*.55),t.lineTo(l*.28,-l*.8),t.moveTo(0,-l*.55),t.lineTo(-l*.28,-l*.8);t.lineCap="round",t.lineWidth=2.4,t.strokeStyle=`rgba(255,255,255,${c})`,t.stroke(),t.lineWidth=1,t.strokeStyle=`rgba(120,150,180,${c*.75})`,t.stroke(),t.restore()}function M(f){const m=Math.min((f-d)/1e3||0,.05);d=f,b+=m;const l=Math.max(0,Math.sin(b*.23)-.55)*90,v=10+Math.sin(b*.37)*12+l;t.clearRect(0,0,o,s);for(const c of i){c.y+=c.v*m,c.ph+=m*(.6+c.z*.5),c.x+=v*c.z*m,c.rot+=c.spin*m,(c.y>s+12||c.x>o+50)&&Object.assign(c,g(!0));const h=c.x+Math.sin(c.ph)*c.sway,w=Math.min(.95,.35+c.z*.45);c.crystal?k(h,c.y,c.r,c.rot,w):y(h,c.y,c.r,w)}for(let c=a.length-1;c>=0;c--){const h=a[c];if(h.life-=m,h.life<=0){a.splice(c,1);continue}h.vy+=60*m,h.vx*=.98,h.x+=h.vx*m,h.y+=h.vy*m,h.rot+=h.spin*m;const w=Math.min(1,h.life/.8);h.crystal?k(h.x,h.y,h.r,h.rot,w):y(h.x,h.y,h.r,w)}requestAnimationFrame(M)}window.addEventListener("pointerdown",f=>{if(!f.target.closest(".lb"))for(let m=0;m<16;m++){const l=Math.random()*Math.PI*2,v=50+Math.random()*110;a.push({x:f.clientX,y:f.clientY,vx:Math.cos(l)*v,vy:Math.sin(l)*v-40,r:m%4===0?4+Math.random()*3:1+Math.random()*2,crystal:m%4===0,rot:Math.random()*3,spin:(Math.random()-.5)*6,life:1.1+Math.random()*.6})}},{passive:!0}),_(),window.addEventListener("resize",_),requestAnimationFrame(f=>{d=f,M(f)})})();(()=>{if(!T.length)return;const e=p("#lb"),t=p("#lbImg"),o=T.length;let s=0,i=null;const a=l=>{s=(l+o)%o,t.src=T[s],p("#lbCount").textContent=`${s+1} / ${o}`,[s+1,s-1].forEach(v=>{new Image().src=T[(v+o)%o]})},d=l=>{i=document.activeElement,a(l),e.hidden=!1,document.body.style.overflow="hidden",p("#lbClose").focus()},b=()=>{e.hidden=!0,document.body.style.overflow="",i==null||i.focus()},g=p("#gallery"),_=[...g.querySelectorAll(".slide")];let y=0,k=!1;const M=()=>{k=!1;const l=g.scrollLeft+g.clientWidth/2;let v=1/0;_.forEach((c,h)=>{const w=(c.offsetLeft-g.offsetLeft+c.offsetWidth/2-l)/c.offsetWidth,I=Math.min(Math.abs(w),1),A=c.firstElementChild;A.style.transform=`translateY(${I*18}px) rotate(${Math.max(-1,Math.min(1,w))*7}deg) scale(${1-I*.14})`,A.style.opacity=String(1-I*.45),Math.abs(w)<v&&(v=Math.abs(w),y=h)}),p("#gCount").textContent=`${y+1} / ${_.length}`},f=l=>{const v=_[(l+_.length)%_.length];g.scrollTo({left:v.offsetLeft-g.offsetLeft+v.offsetWidth/2-g.clientWidth/2,behavior:x?"auto":"smooth"})};g.addEventListener("scroll",()=>{k||(k=!0,requestAnimationFrame(M))},{passive:!0}),window.addEventListener("resize",M),M(),p("#gPrev").addEventListener("click",()=>f(y-1)),p("#gNext").addEventListener("click",()=>f(y+1)),g.addEventListener("click",l=>{const v=l.target.closest(".slide");if(!v)return;const c=Number(v.dataset.i);c===y?d(c):f(c)}),p("#lbClose").addEventListener("click",b),p("#lbPrev").addEventListener("click",()=>a(s-1)),p("#lbNext").addEventListener("click",()=>a(s+1)),e.addEventListener("click",l=>{l.target===e&&b()}),document.addEventListener("keydown",l=>{e.hidden||(l.key==="Escape"?b():l.key==="ArrowLeft"?a(s-1):l.key==="ArrowRight"&&a(s+1))});let m=null;e.addEventListener("touchstart",l=>{m=l.touches[0].clientX},{passive:!0}),e.addEventListener("touchend",l=>{if(m===null)return;const v=l.changedTouches[0].clientX-m;m=null,Math.abs(v)>40&&a(s+(v<0?1:-1))})})();let B;function F(e){const t=p("#toast");t.textContent=e,t.classList.add("show"),clearTimeout(B),B=setTimeout(()=>t.classList.remove("show"),1800)}function L(e,t){var s;const o=()=>{const i=document.createElement("textarea");i.value=e,i.setAttribute("readonly",""),i.style.cssText="position:fixed;opacity:0",document.body.appendChild(i),i.select();let a=!1;try{a=document.execCommand("copy")}catch{}i.remove(),F(a?t:"복사하지 못했어요. 길게 눌러 직접 복사해 주세요")};(s=navigator.clipboard)!=null&&s.writeText?navigator.clipboard.writeText(e).then(()=>F(t),o):o()}p("#copyAddr").addEventListener("click",()=>L(n.venue.address,"주소를 복사했어요"));document.querySelectorAll("[data-copy]").forEach(e=>e.addEventListener("click",()=>L(e.dataset.copy,"계좌번호를 복사했어요")));p("#copyLink").addEventListener("click",()=>L(location.href,"청첩장 링크를 복사했어요"));function Ce(e){const t=window.Kakao;if(!(t!=null&&t.isInitialized()))return!1;const o={mobileWebUrl:e,webUrl:e},s=[{title:"청첩장 보기",link:o}];return j?t.Share.sendDefault({objectType:"feed",content:{title:n.meta.title,description:n.meta.description,imageUrl:new URL(j,location.href).href,link:o},buttons:s}):t.Share.sendDefault({objectType:"text",text:`${n.meta.title}
${n.meta.description}`,link:o,buttons:s}),!0}p("#share").addEventListener("click",async()=>{const e=location.origin+location.pathname;if(Ce(e))return;const t={title:n.meta.title,text:n.meta.description,url:e};if(navigator.share)try{await navigator.share(t)}catch(o){o.name!=="AbortError"&&L(location.href,"청첩장 링크를 복사했어요")}else L(location.href,"청첩장 링크를 복사했어요")});
