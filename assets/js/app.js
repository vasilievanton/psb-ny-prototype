/* ===== Утилиты ===== */
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function plural(n,a,b,c){n=Math.abs(n)%100;const k=n%10;if(n>10&&n<20)return c;if(k>1&&k<5)return b;if(k===1)return a;return c;}
function num(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');}
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function initials(nick){return String(nick||'').split(/\s+/).filter(Boolean).map(w=>w[0]).join('').toUpperCase().slice(0,2);}
const MONTHS=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const MSH=['янв','фев','мар','апр','мая','июн','июл','авг','сен','окт','ноя','дек'];
function dateOf(d){return new Date(2026,11,1+d,12,0,0);}
function fmt(d,short){const t=dateOf(d);return t.getDate()+' '+(short?MSH:MONTHS)[t.getMonth()];}
const LAST_DAY=45, NY_DAY=31;
const ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX','X'];

const I={
  route:'<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h7a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h7"/>',
  book:'<path d="M2 5h6a4 4 0 0 1 4 4v11a3 3 0 0 0-3-3H2z"/><path d="M22 5h-6a4 4 0 0 0-4 4v11a3 3 0 0 1 3-3h7z"/>',
  house:'<path d="M3 11 12 3l9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  chest:'<rect x="3" y="10" width="18" height="10" rx="2"/><path d="M3 11a9 6 0 0 1 18 0"/><path d="M12 13v3"/>',
  trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
  back:'<path d="M15 18l-6-6 6-6"/>',
  flake:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7"/><path d="M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5M3.6 10.8l3.4-.9-.9-3.4M20.4 13.2l-3.4.9.9 3.4M3.6 13.2l3.4.9-.9 3.4M20.4 10.8l-3.4-.9.9-3.4"/>',
  play:'<path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/>',
  pause:'<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" stroke="none"/>',
  sliders:'<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  dice:'<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/>',
  copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a1 1 0 0 1 1-1h10"/>',
  down:'<path d="M12 4v12M7 11l5 5 5-5M5 20h14"/>',
  up:'<path d="M12 20V8M7 13l5-5 5 5M5 4h14"/>',
  lock:'<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
  check:'<path d="M5 12l5 5 9-10"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  photo:'<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6l2-3h4l2 3"/>'
};
function svg(n,a=''){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${a}>${I[n]}</svg>`;}
const ICON_STAR='<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7.1L12 17.3 5.8 21l1.6-7.1L2 9.2l7.1-.6z" fill="#f3c96b"/></svg>';
const STAR_SM=ICON_STAR.replace('width="16" height="16"','width="12" height="12"');
const ICON_GIFT='<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="1.5" fill="#d8423a"/><rect x="2" y="7" width="20" height="4" rx="1" fill="#e5574d"/><rect x="10.5" y="7" width="3" height="14" fill="#f6d27a"/><path d="M12 7C9 2 5 4 7 7M12 7c3-5 7-3 5 0" stroke="#f6d27a" stroke-width="2" fill="none"/></svg>';
const ICON_BANK='<svg viewBox="0 0 24 24"><path d="M12 2 2 7v2h20V7z" fill="#f3c96b"/><rect x="4" y="10" width="2.5" height="8" fill="#f3c96b"/><rect x="10.75" y="10" width="2.5" height="8" fill="#f3c96b"/><rect x="17.5" y="10" width="2.5" height="8" fill="#f3c96b"/><rect x="2" y="19" width="20" height="3" fill="#f3c96b"/></svg>';
function hearts(n){return [0,1,2].map(i=>`<svg viewBox="0 0 24 24" class="${i<n?'on':''}"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>`).join('');}
const ICON_HEART='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill="#e8473f"/></svg>';

/* ===== Состояние ===== */
const KEY='psb-ny-proto-v5';
function fresh(day){return {screen:'prologue',view:'route',day:day==null?14:day,user:null,
  quiz:{},forest:{best:0,bestGifts:0,gifts:0,runs:0},tree:{style:0,ball:null,hung:false,made:0},
  serial:{votes:{}},chest:{used:false,prize:null},final:{code:null,seen:false},log:[]};}
let st;try{st=Object.assign(fresh(),JSON.parse(localStorage.getItem(KEY)||'null')||{});}catch(e){st=fresh();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){try{const c=Object.assign({},st,{tree:Object.assign({},st.tree,{ball:null})});localStorage.setItem(KEY,JSON.stringify(c));}catch(e2){}}}
const AUTH0=()=>({code:null,email:'',err:'',sentTo:null});
const ui={auth:AUTH0(),nick:null,pending:null,city:'',treeSide:0,quiz:null,quizRound:null,bookOpen:false,turn:false,
  tree:{step:0,src:null,style:0,ball:null},chapter:null,izba:{cur:null,playing:false,pos:0},chest:{err:'',spinning:false,reel:null},demo:false,
  sheet:null,seg:{rt:'top',pf:'points',ft:0},fmode:false,pro:0,bar:null};
/* ===== Страницы ===== */
// Каждый экран — отдельная HTML-страница. Общее состояние живёт в localStorage, переходы — обычные ссылки.
const PAGE=document.body.dataset.page||'cover';
const PAGES={cover:'index.html',prologue:'prologue.html',nick:'hero.html',auth:'code.html',route:'route.html',quiz:'quiz.html',forest:'forest.html',tree:'tree.html',final:'final.html',chest:'chest.html',serial:'serial.html',chapter:'chapter.html',fulltale:'tale.html',izba:'izba.html',rating:'rating.html',profile:'profile.html'};
const QS=new URLSearchParams(location.search);
// Сессионные флаги, которые переходят на следующую страницу: анимация перелистывания и всплывающее сообщение
const SS={get(k){try{return JSON.parse(sessionStorage.getItem('psb-'+k));}catch(e){return null;}},set(k,v){try{sessionStorage.setItem('psb-'+k,JSON.stringify(v));}catch(e){}},del(k){try{sessionStorage.removeItem('psb-'+k);}catch(e){}}};
function href(view,q){return (PAGES[view]||'route.html')+(q||'');}
function flash(m){SS.set('toast',m);}
// Черновик персонажа: живёт между страницами «Имя героя» и «Персональный код», после «В путь» удаляется
function saveDraft(){st.draft={nick:ui.nick,city:ui.city,pending:ui.pending,auth:{code:ui.auth.code,email:ui.auth.email,sentTo:ui.auth.sentTo}};save();}
if(st.draft){ui.nick=st.draft.nick||null;ui.city=st.draft.city||'';ui.pending=st.draft.pending||null;ui.auth=Object.assign(AUTH0(),st.draft.auth||{});}
let game=null, timers=[];
function clearTimers(){timers.forEach(t=>clearInterval(t));timers=[];if(game){game.destroy();game=null;}}

/* ===== Производные ===== */
function pts(){const q=Object.values(st.quiz).reduce((s,r)=>s+(r.best||0)*20,0);const f=(st.forest.bestGifts||0)*10;const t=st.tree.hung?100:0;return {q,f,t,total:q+f+t};}
const OPEN={quiz:0,forest:7,tree:14,final:21,chest:24,chestEnd:30};
const done={quiz:()=>Object.values(st.quiz).some(r=>r.done),forest:()=>st.forest.runs>0,tree:()=>st.tree.hung};
function allDone(){return done.quiz()&&done.forest()&&done.tree();}
function stepsDone(){return (done.quiz()?1:0)+(done.forest()?1:0)+(done.tree()?1:0)+(st.final.seen?1:0)+(st.chest.used?1:0);}
function addLog(k,t,p){(st.log=st.log||[]).push({d:st.day,k,t,p});}
function nyLeft(){const d=NY_DAY-st.day;return d>0?`до Нового года ${d} ${plural(d,'день','дня','дней')}`:'С Новым годом!';}
function bankTotal(){const k=st.day-6;return (k>0?Math.round(k*9137+k*k*210):0)+(st.forest.gifts||0);}
function participants(){return Math.min(16800,Math.round(2100+st.day*520));}
function citiesCount(){return Math.min(74,31+st.day*2);}
function treeCount(){return st.day<OPEN.tree?(st.tree.hung?1:0):Math.round(1200+(st.day-OPEN.tree)*610)+(st.tree.hung?1:0);}
function quizWords(){return Object.values(st.quiz).reduce((s,r)=>s+(r.best||0),0);}
const FAKES=(()=>{const r=rng(2026);const out=[];const used=new Set();while(out.length<48){const g=r()<.5?0:1;const A2=D.ADJ[Math.floor(r()*D.ADJ.length)][g];const L=g?D.NOUN_F:D.NOUN_M;const nick=A2+' '+L[Math.floor(r()*L.length)];if(used.has(nick))continue;used.add(nick);out.push({nick,city:r()<.28?'Москва':D.CITIES[Math.floor(r()*D.CITIES.length)],w:.3+r()*.7});}return out;})();
function board(){
  const prog=Math.min(1,(st.day+1)/24);
  const list=FAKES.map(f=>({nick:f.nick,city:f.city,p:Math.round(f.w*prog*82)*10}));
  if(st.user)list.push({nick:st.user.nick,city:st.user.city||'',p:pts().total,me:true});
  list.sort((a,b)=>b.p-a.p||(a.me?-1:0));
  list.forEach((x,i)=>x.place=i+1);
  return list;
}
const NOUNS=[...D.NOUN_M.map(w=>({w,g:0})),...D.NOUN_F.map(w=>({w,g:1}))];
function nickOf(n){const N=NOUNS[n.n];return {nick:D.ADJ[n.a][N.g]+' '+N.w,g:N.g};}
function rndNick(){return {a:Math.floor(Math.random()*D.ADJ.length),n:Math.floor(Math.random()*NOUNS.length)};}
function ava(nick,size,me){return `<span class="ava${me?' me':''}" style="--s:${size}px"><b>${esc(initials(nick))}</b></span>`;}
function genCode(prefix){const a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<8;i++){s+=a[Math.floor(Math.random()*a.length)];if(i===3)s+='-';}return prefix+'-'+s;}
function v(m,f){return st.user&&st.user.g?f:m;}
function ensureUser(){if(!st.user){st.user={email:'',nick:'Серый Волк',g:0,city:'Москва',code:genCode('PSB'),confirmed:true};save();}}


/* ===== Мобильная вёрстка: кирпичики ===== */
// Рамка-терем целиком (арка, башенки, снежные углы) — только на обложке
function frame(inner,mod){
  return `<div class="tm ${mod||''}">
  <div class="tm-top" aria-hidden="true"><i class="mold"></i><i class="twl"></i><i class="arch"></i><i class="twr"></i></div>
  <div class="tm-body"><i class="brl" aria-hidden="true"></i><i class="brr" aria-hidden="true"></i>${inner}</div>
  <div class="tm-bot" aria-hidden="true"><i class="mold"></i><i class="gem"></i></div>
  <i class="snl" aria-hidden="true"></i><i class="snr" aria-hidden="true"></i></div>`;
}
// Страница экрана: компактная рамка-терем — карниз с солнцем-луной, золотые столбы по бокам, карниз с самоцветом
function page(inner,o={}){
  return `<section class="pf ${o.cls||''}"><div class="pf-top" aria-hidden="true"><i class="m"></i>${o.sun===false?'':'<i class="sun"></i>'}</div>
    <div class="pf-in">${inner}</div><div class="pf-bot" aria-hidden="true"><i class="m"></i><i class="gem"></i></div></section>`;
}
// Неразрывные связки: тире и «·» не начинают строку, короткие слова и цифры не висят в конце строки
function nb(t){const w=String(t).split(' ');return w.map((x,i)=>i<w.length-1?x+(/^[А-Яа-яЁё\d]{1,2}$/.test(x)||/^[—–·]$/.test(w[i+1])?' ':' '):x).join('');}
// Заголовок: золотое тиснение, звёзды «приклеены» к первому и последнему слову
function pt(t,sub,tag){
  tag=tag||'h2';
  const w=nb(t).split(' '),star='<i class="st" aria-hidden="true"></i>';
  const inner=w.length===1?`<span class="nw">${star}${esc(w[0])}${star}</span>`
    :`<span class="nw">${star}${esc(w[0])}</span> ${w.slice(1,-1).map(esc).join(' ')}${w.length>2?' ':''}<span class="nw">${esc(w[w.length-1])}${star}</span>`;
  return `<header class="pt"><${tag} class="ttl"><span class="g">${inner}</span></${tag}><div class="rule"></div>${sub?`<div class="sub">${nb(sub)}</div>`:''}</header>`;
}
function lbl(t,cls){return `<div class="lbl ${cls||''}"><span>${t}</span></div>`;}
function say(img,who,text,cls){return `<div class="say ${cls||''}"><span class="face"><img src="${A[img]}" alt=""></span><div class="bubble"><b>${who}:</b> ${text}</div></div>`;}
function por(k,size){return `<span class="por ${size||''}"><img src="${A[k]}" alt=""></span>`;}
// Абзац сказки; cap — с буквицей. Абзац с реплики или кавычки идёт без буквицы
function tale(text,cap){
  const s=String(text);
  if(!cap||!/^[A-Za-zА-Яа-яЁё]/.test(s))return `<p class="tale">${esc(s)}</p>`;
  return `<p class="tale cap"><span class="drop" aria-hidden="true"><b>${esc(s[0])}</b></span><span class="sr">${esc(s[0])}</span>${esc(s.slice(1))}</p>`;
}
function flowers(){return '<i class="fl tl"></i><i class="fl tr"></i><i class="fl bl"></i><i class="fl br"></i>';}
// Верхняя панель: на корневых экранах — солнце и раздел, на вложенных — «назад»
function bar(title,sub,back){ui.bar={title,sub,back};}
function appbar(o){
  const left=o.back?`<a class="ab-back" href="${href(o.back)}" aria-label="Назад">${svg('back')}</a>`:`<a class="ab-sun" href="${href('route')}" aria-label="Маршрут"><i class="sm"></i></a>`;
  const right=st.user&&st.screen==='app'?`<span class="chip pts" title="Баллы в турнирной таблице">${ICON_STAR} <b>${num(pts().total)}</b></span>`:'';
  return `<header class="abar">${left}<div class="ab-t"><b>${o.title}</b>${o.sub?`<small>${o.sub}</small>`:''}</div>${right}</header>`;
}
const TABS=[['route','Маршрут','route','Маршрут'],['serial','Сказка-сериал','book','Сериал'],['izba','Пряничная избушка','house','Избушка'],['rating','Турнирная таблица','trophy','Рейтинг'],['profile','Личный кабинет','user','Кабинет']];
const ROOTS=['route','serial','izba','rating','profile'];
function tabOf(v){if(['serial','chapter','fulltale'].includes(v))return 'serial';if(['izba','rating','profile'].includes(v))return v;return 'route';}
function tabbar(){const a=tabOf(st.view);return `<nav class="tabbar">${TABS.map(t=>`<a class="${a===t[0]?'on':''}" href="${href(t[0])}"${a===t[0]?' aria-current="page"':''}>${svg(t[2])}<span>${t[3]}</span></a>`).join('')}</nav>`;}
// Кнопка: {t, act|href, v, i, s, gold, disabled}
function btn(b){
  const cls=`btn ${b.gold?'btn-gold':'btn-ghost'} ${b.cls||''}`;
  if(b.href)return `<a class="${cls}" href="${b.href}">${b.t}</a>`;
  const data=['v','i','s','k'].map(k=>b[k]!=null?` data-${k}="${b[k]}"`:'').join('');
  return `<button class="${cls}" data-act="${b.act}"${data}${b.disabled?' disabled':''}>${b.t}${b.gold&&!b.noarrow?' '+svg('arrow','width="18" height="18"'):''}</button>`;
}
// Липкая панель действий внизу экрана: главная кнопка + второстепенная
function actbar(items,note){items=items.filter(Boolean);if(!items.length)return '';return `<div class="actbar">${note?`<p class="ab-note">${note}</p>`:''}<div class="ab-row">${items.map(btn).join('')}</div></div>`;}
// Шторка снизу
function sheet(inner,o={}){return `<div class="sheet-bg" data-act="${o.close||'sheetClose'}"></div><div class="sheet ${o.cls||''}" role="dialog" aria-modal="true"><i class="grab" aria-hidden="true"></i><button class="sheet-x" data-act="${o.close||'sheetClose'}" aria-label="Закрыть">×</button>${inner}</div>`;}
// Вкладки внутри экрана
function seg(key,items,cur){return `<div class="seg" role="tablist">${items.map(([v,t])=>`<button role="tab" class="${cur===v?'on':''}" aria-selected="${cur===v}" data-act="seg" data-k="${key}" data-v="${v}">${t}</button>`).join('')}</div>`;}
function lockChip(day){return `<span class="chip lock">${svg('lock','width="12" height="12"')} ${fmt(day,true)}</span>`;}
function endBanner(){return st.day>LAST_DAY?'':st.day>=40?`<div class="ribbon">Платформа работает до 15 января — успейте пройти маршрут и послушать сказки</div>`:'';}
const ROUTE_BTN={t:'На маршрут',act:'go',v:'route'};

/* ===== Обложка и пролог ===== */
const FAMILY=[['m_mikhail','Медведь Михаил','Он и есть Дед Мороз. Сквозной герой всего пути'],['m_zhena','Жена','Читает детям сказки народов России'],['m_star','Старший сын','Бежит по лесу и собирает подарки'],['m_mlad','Младший сын','Расспрашивает местных, приносит слова и узоры'],['m_doch','Дочь','Наряжает ёлку шарами из ваших фото']];
function vCover(){
  return `<div class="cover-wrap">${frame(`<div class="cv">
    <div class="cv-top">ПСБ · для сотрудников банка</div>
    <h1 class="cv-title"><span>Новогодняя ночь</span><span>длиной в страну</span></h1>
    <div class="cv-rule"></div>
    <div class="cv-win"><img src="${A.hero}" alt="Сотрудники входят в новогоднюю сказку"></div>
    <p class="cv-sub">Сказка, в которую попадает каждый сотрудник</p>
    <div class="cv-cta"><button class="btn btn-gold btn-lg" data-act="openBook">${svg('book','width="20" height="20"')} Открыть книгу</button>
      ${st.user?`<button class="btn btn-ghost" data-act="enter">Продолжить: ${esc(st.user.nick)}</button>`:''}</div>
  </div>`,'cover')}</div>`;
}
// Пролог — три страницы, листаются свайпом
const PRO_N=3;
function vPrologue(){
  if(!ui.bookOpen)return vCover();
  const slides=[
    page(`${pt('Завязка','Одна ночь — одиннадцать полуночей','h1')}
      <figure class="b11"><img src="${A.b11}" alt="11"><figcaption>раз наступает Новый год в России за одну ночь</figcaption></figure>
      ${tale('В новогоднюю ночь Дед Мороз идёт через всю страну с востока на запад: одиннадцать Новых годов за одну ночь, ни минуты лишней.',true)}`),
    page(`${pt('Нужен помощник','Мешок порвался в тайге','h1')}
      <img class="pro-img" src="${A.bear_lamp}" alt="">
      ${tale('Где-то в тайге мешок рвётся о еловый сук — подарки рассыпаются по всему лесу. Один он не успеет. Нужен помощник, и это вы.',true)}`),
    page(`${pt('Кто встретит вас','Семья Деда Мороза','h1')}
      <div class="fam-lead">${por('m_mikhail','lg')}<div><b>Медведь Михаил</b><span>Он и есть Дед Мороз. Сквозной герой всего пути</span></div></div>
      <div class="fam">${FAMILY.slice(1).map(f=>`<div class="fm">${por(f[0])}<b>${f[1]}</b><span>${f[2]}</span></div>`).join('')}</div>`)
  ];
  const i=Math.min(ui.pro||0,PRO_N-1);
  return `<div class="pro">
    <div class="pro-top"><a class="ab-sun" href="${href('cover')}" aria-label="К обложке"><i class="sm"></i></a><span class="pro-t">Новогодняя ночь</span>
      ${st.user?`<button class="link" data-act="enter">Продолжить</button>`:`<button class="link" data-act="startAuth">Пропустить</button>`}</div>
    <div class="slides" id="slides">${slides.map((s,k)=>`<div class="slide" data-k="${k}">${s}</div>`).join('')}</div>
    <div class="dots" id="dots">${slides.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
    <div class="actbar"><div class="ab-row"><button class="btn btn-gold btn-lg" id="proBtn" data-act="proNext">${proLabel(i)}</button></div></div>
  </div>`;
}
function proLabel(i){return i<PRO_N-1?'Дальше':(st.user?'Вернуться в сказку':'Стать помощником Деда Мороза');}
function mountPrologue(){
  const s=$('#slides');if(!s)return;
  if(ui.pro)s.scrollLeft=ui.pro*s.clientWidth;
  s.addEventListener('scroll',()=>{const i=Math.round(s.scrollLeft/Math.max(1,s.clientWidth));if(i===ui.pro)return;ui.pro=i;
    $$('#dots i').forEach((d,k)=>d.classList.toggle('on',k===i));const b=$('#proBtn');if(b)b.textContent=proLabel(i);},{passive:true});
}

/* ===== Формирование персонажа: шаг 1 — имя ===== */
function nkRow(nick){return `<span class="pl">—</span>${ava(nick,32,true)}<span class="n">${esc(nick)} <span class="tag">вы</span><small id="nkCity">${esc((ui.city||'').trim())}</small></span><span class="p">0</span>`;}
function vNick(){
  if(!ui.nick)ui.nick=rndNick();
  const cur=nickOf(ui.nick), g=cur.g;
  bar('Имя героя','Формирование персонажа · шаг 1 из 2','prologue');
  return `${page(`
    <div class="nk-prev"><span id="nkAva">${ava(cur.nick,72,true)}</span>
      <div class="nickplate">${flowers()}<div class="hint">Ваше игровое имя</div><div class="nk" id="nkText">${esc(cur.nick)}</div></div></div>
    <p class="note">Аватарка — из инициалов: <span id="nkHint">«${esc(cur.nick)}» → «${esc(initials(cur.nick))}»</span>. Имя не влияет на механику игры.</p>
    <div class="pickrow"><span class="lbl-s">Первое слово</span><button class="dice" data-act="rndA" aria-label="Случайное первое слово">${svg('dice')}</button></div>
    <div class="chips3" id="pA">${D.ADJ.map((a,i)=>`<button class="${i===ui.nick.a?'on':''}" data-act="pickA" data-i="${i}">${a[g]}</button>`).join('')}</div>
    <div class="pickrow"><span class="lbl-s">Второе слово</span><button class="dice" data-act="rndN" aria-label="Случайное второе слово">${svg('dice')}</button></div>
    <div class="chips3" id="pN">${NOUNS.map((x,i)=>`<button class="${i===ui.nick.n?'on':''}" data-act="pickN" data-i="${i}">${x.w}</button>`).join('')}</div>
    <button class="btn btn-ghost btn-block" data-act="regen">${svg('dice','width="18" height="18"')} Случайное имя целиком</button>
    <label class="field"><span>Ваш город — по желанию</span>
      <input class="input" id="city" list="cities" placeholder="Например, Казань" value="${esc(ui.city)}" autocomplete="off">
      <datalist id="cities">${D.CITIES.map(c=>`<option value="${c}">`).join('')}</datalist></label>
    <p class="note left">Город нужен, чтобы показать, из скольких городов страны собрались помощники</p>
    ${lbl('Так вас увидят в турнирной таблице','s')}
    <div class="lbmini prev"><div class="r me" id="nkRow">${nkRow(cur.nick)}</div></div>`)}
  ${actbar([{t:'Дальше: персональный код',act:'saveNick',gold:1}])}`;
}
function patchNick(scroll){
  const cur=nickOf(ui.nick), g=cur.g;
  saveDraft();
  const row=$('#nkRow');if(row)row.innerHTML=nkRow(cur.nick);
  $('#nkText').textContent=cur.nick;$('#nkAva').innerHTML=ava(cur.nick,72,true);$('#nkHint').textContent=`«${cur.nick}» → «${initials(cur.nick)}»`;
  $$('#pA button').forEach((b,i)=>{b.textContent=D.ADJ[i][g];b.classList.toggle('on',i===ui.nick.a);});
  $$('#pN button').forEach((b,i)=>b.classList.toggle('on',i===ui.nick.n));
  if(scroll)['#pA','#pN'].forEach(s=>{const box=$(s),b=$(s+' .on');if(box&&b)box.scrollTo({left:b.offsetLeft-box.clientWidth/2+b.offsetWidth/2,behavior:'smooth'});});
}

/* ===== Формирование персонажа: шаг 2 — персональный код (регистрации нет) ===== */
function vAuth(){
  const a=ui.auth;
  if(!a.code)a.code=genCode('PSB');
  if(!ui.pending){const n=nickOf(ui.nick||rndNick());ui.pending={nick:n.nick,g:n.g,city:''};}
  const sent=a.sentTo;
  bar('Персональный код','Формирование персонажа · шаг 2 из 2','nick');
  return `${page(`
    <div class="code-hero"><img class="mascot" src="${A.bear_archer}" alt="">${tale(`${ui.pending.nick}, это ваш код участника. Сохраните его — по нему платформа узнаёт вас.`)}</div>
    <div class="codebox"><div class="lbl-s">Персональный код</div><div class="code">${a.code}</div>
      <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${a.code}">${svg('copy','width="15" height="15"')} Скопировать</button></div>
    ${lbl('Почта — по желанию','s')}
    <p class="tale small">Введите адрес — и код придёт письмом. Больше почта ни для чего не используется.</p>
    <div class="field">
      ${sent?`<div class="sent">${svg('check','width="16" height="16"')}<span>Отправили код на <b>${esc(sent)}</b></span><button class="link" data-act="mailEdit">Изменить</button></div>`
      :`<div class="row"><input class="input ${a.err?'err':''}" id="email" type="email" inputmode="email" autocomplete="email" placeholder="name@mail.ru" value="${esc(a.email)}"><button class="btn btn-ghost" data-act="mailSend">Отправить</button></div>
        ${a.err?`<div class="err-t">${a.err}</div>`:''}`}
    </div>
    <p class="note"><a class="link" href="#" data-act="toNick">Изменить имя</a></p>`)}
  ${actbar([{t:'В путь',act:'codeNext',gold:1}])}`;
}

/* ===== Маршрут ===== */
const STOPS=[
  {k:'quiz',n:1,t:'«Спроси дорогу»',d:'Квиз · новый набор каждую неделю',m:'m_mlad',who:'Младший сын',pts:`до ${D.QUIZ.reduce((s,r)=>s+r.qs.length,0)*20} баллов`,halt:[0,1]},
  {k:'forest',n:2,t:'«Лес»',d:'Раннер: собрать рассыпанные подарки',m:'m_star',who:'Старший сын',pts:'10 баллов за подарок',halt:[2,3]},
  {k:'tree',n:3,t:'«Ёлка»',d:'Шар из вашего фото на общую ёлку',m:'m_doch',who:'Дочь',pts:'100 баллов',halt:[4,5]},
  {k:'final',n:4,t:'Финал',d:'Готовая сказка и карточка героя',m:'m_mikhail',who:'Дед Мороз Михаил',halt:['full']},
  {k:'chest',n:5,t:'«Сундук чудес»',d:'Лототрон перед Новым годом: код на подарок',m:'chest',who:'Подарок от Михаила'}
];
function haltHTML(s){
  if(!s.halt)return '';
  const items=s.halt.map(h=>{
    if(h==='full'){const lk=st.day<D.FULL_TALE_DAY;return `<button class="hc ${lk?'soon':'out'}" data-act="go" data-v="fulltale" ${lk?'disabled':''}><b>Вся сказка</b><span>${lk?fmt(D.FULL_TALE_DAY,true):'читать · PDF'}</span></button>`;}
    const c=D.CHAPTERS[h],s2=chState(h),voted=st.serial.votes[h]!=null;
    const lab=s2==='soon'?fmt(c.day,true):s2==='vote'?(voted?'вы голосовали':'голосование'):'читать';
    return `<button class="hc ${s2}" data-act="openCh" data-i="${h}" ${s2==='soon'?'disabled':''}><b>Глава ${ROMAN[h]}</b><span>${lab}</span></button>`;}).join('');
  return `<div class="halt"><span class="hl">${svg('book','width="13" height="13"')} Привал</span><div class="hcs">${items}</div></div>`;
}
function stopHTML(s){
  let state='open',btnH='',dn=false;
  const b=(t,gold)=>`<button class="btn ${gold?'btn-gold':'btn-ghost'} btn-sm" data-act="go" data-v="${s.k}">${t}</button>`;
  if(s.k==='final'){
    if(st.day<OPEN.final){state='locked';btnH=lockChip(OPEN.final);}
    else if(!allDone()){btnH=b('Что осталось');}
    else {dn=st.final.seen;btnH=b(dn?'Открыть':'К финалу',!dn);}
  } else if(s.k==='chest'){
    if(st.day<OPEN.chest){state='locked';btnH=lockChip(OPEN.chest);}
    else if(st.day>OPEN.chestEnd){dn=st.chest.used;btnH=b(st.chest.used?'Мой код':'Итоги');}
    else {dn=st.chest.used;btnH=b(dn?'Мой код':'Запустить',!dn);}
  } else {
    if(st.day<OPEN[s.k]){state='locked';btnH=lockChip(OPEN[s.k]);}
    else {dn=done[s.k]();btnH=b(dn?(s.k==='tree'?'К ёлке':'Ещё раз'):'Начать',!dn);}
  }
  return `<div class="stop ${state} ${dn?'done':''}">
    <div class="sm"><img class="med" src="${A['med'+s.n]}" alt="${s.n}">${dn?`<span class="done-mark">${svg('check','width="12" height="12" stroke-width="3"')}</span>`:''}</div>
    <div class="sb"><b class="tt">${s.t}</b><span class="ds">${s.d}</span><span class="meta"><img src="${A[s.m]}" alt="" ${s.k==='chest'?'class="obj"':''}>${s.who}${s.pts?` · <em>${s.pts}</em>`:''}</span></div>
    <div class="st">${btnH}</div>
  </div>${haltHTML(s)}`;
}
// Главное действие на сегодня — то, что маршрут предлагает сделать прямо сейчас
function nextStep(){
  if(!done.quiz())return {k:'quiz',m:'med1',t:'Пройдите квиз «Спроси дорогу»',d:'Младший сын ждёт у местных — без их подсказок тропу не найти',b:'Начать'};
  if(st.day>=OPEN.forest&&!done.forest())return {k:'forest',m:'med2',t:'Соберите подарки в «Лесу»',d:'Старший сын уже бежит — догоняйте',b:'Бежать'};
  if(st.day>=OPEN.tree&&!done.tree())return {k:'tree',m:'med3',t:'Повесьте свой шар на общую ёлку',d:'Дочь наряжает ёлку шарами из ваших фото',b:'Украсить'};
  if(st.day>=OPEN.final&&allDone()&&!st.final.seen)return {k:'final',m:'med4',t:'Ваша сказка готова',d:'Михаил вручит сказку и карточку героя',b:'К финалу'};
  if(st.day>=OPEN.chest&&st.day<=OPEN.chestEnd&&!st.chest.used)return {k:'chest',m:'med5',t:'Запустите лототрон',d:'В «Сундуке чудес» — подарок для каждого помощника',b:'Запустить'};
  const nx=[[OPEN.forest,'«Лес»'],[OPEN.tree,'«Ёлка»'],[OPEN.final,'финал маршрута'],[OPEN.chest,'«Сундук чудес»']].find(([dd])=>st.day<dd);
  if(nx)return {k:null,m:'clock',t:`Дальше — ${nx[1]}`,d:`Откроется ${fmt(nx[0])}. А пока — сказка-сериал и избушка`};
  return {k:null,m:'chest',t:'Маршрут пройден',d:'Следите за сказкой-сериалом и турнирной таблицей'};
}
function weeklyBlock(){
  let cur=-1;D.CHAPTERS.forEach((c,i)=>{if(st.day>=c.day)cur=i;});
  let sc;
  if(cur<0){sc=`<div class="wcard"><img class="wim" src="${A.book}" alt=""><div class="wb"><span class="lbl-s">Сказка-сериал</span><b>Первая глава — 1 декабря</b><span>Каждые 3–4 дня — новая глава, а сюжет решает общее голосование</span></div></div>`;}
  else{
    const c=D.CHAPTERS[cur],s=chState(cur),voted=st.serial.votes[cur]!=null,full=st.day>=D.FULL_TALE_DAY,nx=D.CHAPTERS[cur+1];
    const live=s==='vote'&&!full;
    const txt=full?'Все главы собраны в одну сказку — читайте целиком и скачивайте PDF':live?(voted?'Ваш голос учтён. Итоги — после закрытия голосования':`Голосование до ${fmt(c.day+2)}, 10:00 — выберите, куда повернёт сюжет`):nx?`Голосование завершено. Глава ${ROMAN[cur+1]} выйдет ${fmt(nx.day)}`:`Цельная сказка выйдет ${fmt(D.FULL_TALE_DAY)}`;
    const bt=full?`<button class="btn btn-gold btn-sm" data-act="go" data-v="fulltale">Читать сказку</button>`:`<button class="btn ${live&&!voted?'btn-gold':'btn-ghost'} btn-sm" data-act="openCh" data-i="${cur}">${live&&!voted?'Читать и голосовать':'Читать главу '+ROMAN[cur]}</button>`;
    sc=`<div class="wcard ${live?'hot':''}"><img class="wim" src="${A.book}" alt=""><div class="wb"><div class="row tight"><span class="lbl-s">Сказка-сериал</span>${live?'<span class="chip live">голосование</span>':''}</div>
      <b>${full?'Большая книга сказок':`Глава ${ROMAN[cur]}. ${c.t}`}</b><span>${txt}</span>${bt}</div></div>`;
  }
  let qi=-1;D.QUIZ.forEach((r,i)=>{if(st.day>=r.open)qi=i;});
  const R=D.QUIZ[qi],res=st.quiz[qi],nx=D.QUIZ[qi+1],fresh=!(res&&res.done);
  const qc=`<div class="wcard ${fresh?'hot':''}"><span class="wim face">${por('m_mlad')}</span><div class="wb"><div class="row tight"><span class="lbl-s">Квиз</span>${fresh?'<span class="chip live">новый набор</span>':''}</div>
    <b>Набор ${qi+1}. ${R.title}</b><span>${fresh?`${R.qs.length} новых слов и узоров — 20 баллов за верный ответ`:`Пройден: ${res.best} из ${R.qs.length}${res.best<R.qs.length?' — можно улучшить':''}`}. ${nx?`Следующий — ${fmt(nx.open)}`:'Это последний набор'}</span>
    <div class="qweeks">${D.QUIZ.map((r,i)=>`<i class="${i<qi?'past':i===qi?'now':''}">${fmt(r.open,true)}</i>`).join('')}</div>
    <button class="btn ${fresh?'btn-gold':'btn-ghost'} btn-sm" data-act="goQuiz" data-i="${qi}">${fresh?'Пройти набор':'Ещё раз'}</button></div></div>`;
  return `<section class="weekly">${lbl('Новое на этой неделе')}<div class="hs">${sc}${qc}</div></section>`;
}
function talesOpen(){return D.TALES.filter(t=>st.day>=t.open).length;}
function vRoute(){
  bar('Маршрут',`${fmt(st.day,true)} · ${nyLeft()}`);
  const sd=stepsDone(), lit=Math.max(1,Math.round(sd/5*11)), ns=nextStep();
  const lb=board(), me=lb.find(x=>x.me);
  return `${endBanner()}${page(`
    <div class="midnights">${lbl('Одна ночь — одиннадцать полуночей','s')}
      <div class="tz">${D.TZ.map((z,i)=>`<div class="z ${i<lit?'on':''} ${i===lit-1?'cur':''}" title="${z[1]} · UTC${z[0]}"><i></i><b>${z[0]}</b></div>`).join('')}</div>
      <div class="row ew"><span>Восток</span><span class="cnt">${D.TZ[lit-1][1]} · ${lit} из 11</span><span>Запад</span></div></div>
    <div class="nextc ${ns.k?'':'idle'}"><img class="${ns.m.startsWith('med')?'med':'obj'}" src="${A[ns.m]}" alt=""><div class="nb"><span class="lbl-s">Следующий шаг</span><b>${ns.t}</b><span>${ns.d}</span></div>
      ${ns.k?`<button class="btn btn-gold btn-sm" data-act="go" data-v="${ns.k}">${ns.b}</button>`:''}</div>
    ${weeklyBlock()}
    ${lbl('Путь героя')}
    <div class="route">${STOPS.map(stopHTML).join('')}</div>
    <div class="cart bank"><div class="row tight">${ICON_BANK}<span class="lbl-s">Общий счётчик банка</span></div>
      <div class="num">${num(bankTotal())}</div><div class="small ink2">подарков собрали сотрудники в «Лесу»${st.forest.gifts?` · ваших — ${st.forest.gifts}`:''}</div>
      <div class="stats"><div><b>${num(participants())}</b>помощников</div><div><b>${citiesCount()}</b>${plural(citiesCount(),'город','города','городов')}</div></div>
      <img class="deco" src="${A.bear_sack}" alt=""></div>
    <a class="kids" href="${href('izba')}"><img src="${A.hut}" alt=""><span class="kb"><span class="lbl-s">Для детей</span><b>Пряничная избушка</b><span>Аудиосказки на ночь · доступно ${talesOpen()} из 10</span></span>${svg('arrow','width="20" height="20"')}</a>
    <a class="myrank" href="${href('rating')}">${ava(me.nick,34,true)}<span class="mr"><b>${me.place} место в рейтинге</b><span>${num(me.p)} баллов</span></span>${svg('arrow','width="20" height="20"')}</a>`)}`;
}

/* ===== Квиз «Спроси дорогу» ===== */
function roundsList(R){
  return `<div class="rounds">${D.QUIZ.map((r,i)=>{const lk=st.day<r.open;const res=st.quiz[i];return `<button class="rnd ${R===i?'on':''}" data-act="qRound" data-i="${i}" ${lk?'disabled':''}><span class="rn">${ROMAN[i]}</span><span class="rt"><b>${r.title}</b><small>${lk?'Откроется '+fmt(r.open):res&&res.done?`Лучший результат: ${res.best} из ${r.qs.length}`:r.qs.length+' вопросов · '+fmt(r.open,true)}</small></span>${res&&res.done?`<span class="rs">${res.best}/${r.qs.length}</span>`:''}</button>`;}).join('')}</div>`;
}
function vQuiz(){
  bar('Спроси дорогу','Испытание 1 · квиз','route');
  if(st.day<OPEN.quiz)return lockView('Квиз откроется 1 декабря');
  const q=ui.quiz;
  if(!q){
    if(ui.quizRound==null){const f=D.QUIZ.findIndex((r,i)=>st.day>=r.open&&!(st.quiz[i]&&st.quiz[i].done));ui.quizRound=f>=0?f:0;}
    const R=ui.quizRound;
    return `${page(`
      ${say('m_mlad','Младший сын','чтобы понять, куда идти и где застрял папа, нужно расспросить местных. Но говорят они на своём: одна просит принести шаньги, другой упоминает камусы, третий зовёт к айрану. Не понял слова — не нашёл тропу!','compact')}
      <p class="tale small">Слово на диалекте или узор на рукавице — и четыре варианта ответа. После выбора — короткий рассказ: откуда слово и что оно означает. Ошибаться не страшно.</p>
      ${lbl('Наборы вопросов · новый каждую неделю','s')}${roundsList(R)}
      <p class="note">${STAR_SM} 20 баллов за каждый верный ответ · в зачёт лучший результат</p>`)}
    ${actbar([{t:st.quiz[R]&&st.quiz[R].done?'Пройти набор ещё раз':'Расспросить местных',act:'qStart',gold:1}])}`;
  }
  const R=D.QUIZ[q.r];
  if(q.finished){
    bar('Спроси дорогу',`Набор ${q.r+1} · итог`,'route');
    const c=q.correct;
    return `${page(`${pt('Тропа найдена',`Набор ${q.r+1} · ${R.title}`,'h1')}
      <div class="score"><span class="big">${c}</span><span class="of">из ${R.qs.length}</span></div>
      <p class="gain">${q.gain>0?`+${q.gain} баллов в таблицу`:'Лучший результат по этому набору сохранён'}</p>
      ${say('m_mlad','Младший сын','местные показали дорогу! Папа застрял где-то в лесу — там уже ждёт мой старший брат.','compact')}
      ${st.day<OPEN.forest?`<p class="note">«Лес» откроется ${fmt(OPEN.forest)}</p>`:''}
      ${lbl('Все наборы','s')}${roundsList(q.r)}`)}
    ${actbar([st.day>=OPEN.forest?{t:'Дальше: в «Лес»',act:'go',v:'forest',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1},{t:'Другой набор',act:'qAgain'}])}`;
  }
  const Q=R.qs[q.i], ans=q.answered;
  bar('Спроси дорогу',`Набор ${q.r+1} · вопрос ${q.i+1} из ${R.qs.length}`,'route');
  const expl=`<div class="explain"><div class="where">${Q.where}</div><div class="ttl2">${Q.t==='w'?Q.w:'Узор: '+Q.o[Q.a]}</div><p>${Q.ex}</p>
    <div class="verdict ${q.pick===Q.a?'ok':''}">${q.pick===Q.a?'Верно! +20 баллов':`Правильный ответ — «${Q.o[Q.a]}». Теперь и вы знаете!`}</div></div>`;
  const nextT=q.i<R.qs.length-1?'Следующий вопрос':'Узнать, куда идти';
  return `${page(`
    <div class="qbar" aria-label="Вопрос ${q.i+1} из ${R.qs.length}">${R.qs.map((_,i)=>`<i class="${i<q.i?'done':i===q.i?'on':''}"></i>`).join('')}</div>
    ${say('m_mlad','Младший сын',Q.t==='w'?`местные сказали «${Q.w.toLowerCase()}». Что бы это значило?`:`смотри, какой узор на ${Q.on}! Из какого он края?`,'compact')}
    <div class="qword-wrap"><div class="plabel">${Q.t==='w'?'Что означает это слово':'Чей это узор?'}</div>
      <div class="qword ${Q.t==='w'?'':'pat'}">${flowers()}${Q.t==='w'?`<div class="w">${Q.w}</div>`:`${patternSVG(Q.p)}<div class="on">Узор на ${Q.on}</div>`}</div></div>
    <div class="opts ${ans?'answered':''}">${Q.o.map((o,i)=>{let cl='';if(ans){if(i===Q.a)cl='right';else if(i===q.pick)cl='wrong';else cl='dim';}return `<button class="opt ${cl}" data-act="qPick" data-i="${i}"><span>${o}</span></button>`;}).join('')}</div>
    ${ans?'':'<p class="note">Выберите вариант — после ответа Младший сын расскажет, что это за слово</p>'}`,{sun:false})}
  ${ans?actbar([{t:nextT,act:'qNext',gold:1},{t:'Пояснение',act:'sheetOpen',v:'explain'}]):''}
  ${ans&&ui.sheet==='explain'?sheet(`${expl}<button class="btn btn-gold btn-block" data-act="qNext">${nextT} ${svg('arrow','width="18" height="18"')}</button>`,{cls:'parchsheet'}):''}`;
}

/* ===== Лес ===== */
function stageBar(n){return `<span>Этап ${n} из 20</span><b class="sprog"><i style="width:${n*5}%"></i></b>`;}
function vForest(){
  bar('Лес','Испытание 2 · раннер','route');
  if(st.day<OPEN.forest)return lockView('«Лес» откроется 8 декабря','После того как тропа найдена, герой вместе со Старшим сыном попадает в лес, где рассыпаны подарки Деда Мороза.','m_star');
  if(ui.fmode)return gameMode();
  const best=st.forest.bestGifts;
  return `${page(`
    ${say('m_star','Старший сын','тропа найдена! Папины подарки рассыпались по всему лесу — бежим вместе собирать. Управляешь мной ты. Всё, что соберём, пойдёт в общий счётчик банка.','compact')}
    <div class="howto"><div>${svg('up')}<b>Тап по игре</b><span>прыжок</span></div><div>${svg('arrow')}<b>Держите «Быстрее»</b><span>ускорение</span></div><div>${ICON_HEART}<b>3 жизни</b><span>столкновение — минус одна</span></div></div>
    <p class="tale small center">Просто беги и собирай: чем больше подарков — тем лучше. 20 этапов, бег всё быстрее.</p>
    ${st.forest.runs?`<div class="rcs"><div><b>${best}</b><span>рекорд, подарков</span></div><div><b>${num(best*10)}</b><span>баллов в таблице</span></div><div><b>${st.forest.gifts}</b><span>всего в общем счётчике</span></div></div>`:''}
    <p class="note">Игра тормозит или не запускается? <a class="link" href="#" data-act="fLite">Альтернативный способ заработать баллы</a> — для старых браузеров и слабых компьютеров</p>`)}
  ${actbar([{t:st.forest.runs?'Ещё забег':'Бежать!',act:'fPlay',gold:1}])}`;
}
// Игра во весь экран: сверху жизни и подарки, в центре поле, снизу большие кнопки под большие пальцы
function gameMode(){
  return `<div class="gm" id="gm">
    <div class="gm-top"><span class="hearts" id="hLives">${hearts(3)}</span><span class="gm-g">${ICON_GIFT}<b id="hGifts">0</b></span>
      <span class="gm-sb" id="sbar">${stageBar(1)}</span><button class="gm-x" data-act="fExit" aria-label="Закончить забег">×</button></div>
    <div class="gm-mid"><div class="stage" id="stage"><canvas id="cv" data-ratio="1.15" data-lw="620"></canvas>
      <div class="overlay" id="ov"><div class="inner"><div class="ov-t">Готовы?</div><button class="btn btn-gold btn-lg" data-act="fStart">Старт</button><p class="small">Тап по игре — тоже прыжок</p></div></div></div></div>
    <div class="gm-ctrl" id="ctrl"><button class="btn btn-ghost" id="bJump">${svg('up','width="22" height="22"')} Прыжок</button><button class="btn btn-ghost" id="bFwd">Быстрее ${svg('arrow','width="22" height="22"')}</button></div>
  </div>`;
}
function mountForest(){
  const cv=$('#cv'); if(!cv) return;
  cv.dataset.maxh=String(Math.max(200,innerHeight-(innerWidth>innerHeight?110:250)));
  game=ForestGame(cv,{
    hud(S){const a=$('#hLives'),b=$('#hGifts');if(a)a.innerHTML=hearts(S.lives);if(b)b.textContent=S.gifts;},
    stage(n){const s=$('#sbar');if(s)s.innerHTML=stageBar(n);},
    end(S){finishForest(S.gifts,S.score,S.early?S.stage:0,S.out?S.stage:0);}
  });
  const j=$('#bJump'),f=$('#bFwd');
  j.addEventListener('pointerdown',e=>{e.preventDefault();game&&game.jump();});
  const on=e=>{e.preventDefault();game&&game.boost(true);},off=()=>game&&game.boost(false);
  f.addEventListener('pointerdown',on);f.addEventListener('pointerup',off);f.addEventListener('pointerleave',off);f.addEventListener('pointercancel',off);
}
function finishForest(gifts,score,earlyStage,outStage){
  const first=!st.forest.runs, prevBest=st.forest.bestGifts;
  st.forest.runs++;st.forest.gifts+=gifts;if(gifts>prevBest){addLog('forest',prevBest?`Новый рекорд: ${gifts} ${plural(gifts,'подарок','подарка','подарков')} (было ${prevBest})`:`Забег: ${gifts} ${plural(gifts,'подарок','подарка','подарков')}`,(gifts-prevBest)*10);st.forest.bestGifts=gifts;}save();
  const head=outStage?`Жизни закончились на этапе ${outStage} из 20`:earlyStage?`Забег окончен на этапе ${earlyStage} из 20`:'Все 20 этапов пройдены';
  const nx=st.day>=OPEN.tree?{t:'Дальше: «Ёлка»',act:'go',v:'tree',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1};
  const gm=$('#gm');if(!gm)return;
  const old=gm.querySelector('.sheet');if(old){old.previousElementSibling.remove();old.remove();}
  gm.insertAdjacentHTML('beforeend',sheet(`<div class="lbl-s center">${head}</div>
    <div class="fres"><b>${gifts}</b><span>${plural(gifts,'подарок','подарка','подарков')}</span></div>
    ${say('m_star','Старший сын',outStage?'уф, споткнулись! Отдышимся — и ещё забег? Подарки, что успели собрать, уже в мешке.':'собрали! Бегу отдать папе мешок — а сестрёнка уже ждёт у ёлки.','compact')}
    <div class="rcs"><div><b>+${gifts}</b><span>в общий счётчик банка</span></div><div><b>${gifts>prevBest?'+'+(gifts-prevBest)*10:st.forest.bestGifts}</b><span>${gifts>prevBest?'баллов — новый рекорд':'ваш рекорд, подарков'}</span></div></div>
    <div class="sheet-acts">${btn(nx)}${btn({t:'Ещё забег',act:'fAgain'})}${nx.v!=='route'?btn({t:'На маршрут',act:'go',v:'route'}):''}</div>
    ${st.day<OPEN.tree?`<p class="note">«Ёлка» откроется ${fmt(OPEN.tree)}</p>`:''}`,{cls:'darksheet',close:'fAgain'}));
  updateHeader();
  if(first)toast('Подарки ушли в общий счётчик банка');
}
function startLite(){
  if(game)game.destroy(),game=null;
  const ov=$('#ov'); ov.classList.remove('hidden');
  const sg=$('#stage');if(sg)sg.classList.add('lite-on');
  let n=0,got=0,cur=-1;
  ov.innerHTML=`<div class="inner"><div class="lbl-s">Альтернативный способ заработать баллы</div><p class="small">Нажимайте на подарки, пока они не исчезли</p><div class="lite" id="lite">${[...Array(9)].map((_,i)=>`<button data-li="${i}"></button>`).join('')}</div><div class="small" id="liteC">Собрано: 0</div></div>`;
  $('#lite').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-li]');if(b&&+b.dataset.li===cur){got++;cur=-1;b.classList.remove('has');b.textContent='';$('#liteC').textContent='Собрано: '+got;const g=$('#hGifts');if(g)g.textContent=got;}});
  const t=setInterval(()=>{
    $$('#lite button').forEach(b=>{b.classList.remove('has');b.textContent='';});
    if(n>=18){clearInterval(t);finishForest(got,got*10);return;}
    cur=Math.floor(Math.random()*9);const b=$(`#lite [data-li="${cur}"]`);b.classList.add('has');b.textContent='🎁';n++;
  },850); timers.push(t);
}

/* ===== Ёлка ===== */
function doch(t,cls){return say('m_doch','Дочь',t,cls);}
function treeSides(){return Math.max(1,Math.ceil(treeCount()/40));}
function sideLabel(){const n=treeSides();return `Сторона ${ui.treeSide+1} из ${num(n)}${ui.treeSide===0?' · новые':''}`;}
function sideBalls(side){
  const r=rng(500+side*7);const out=[];const total=treeCount();const cnt=Math.min(40,Math.max(0,total-side*40-(side===0&&st.tree.hung?1:0)));
  for(let i=0;i<cnt;i++){const N=NOUNS[Math.floor(r()*NOUNS.length)];out.push({nick:D.ADJ[Math.floor(r()*D.ADJ.length)][N.g]+' '+N.w,city:r()<.25?'Москва':D.CITIES[Math.floor(r()*D.CITIES.length)],img:r()<.4?Math.floor(r()*6):-1});}
  return out;
}
function treeBox(){return treeSVG(ui.treeSide===0?st.tree.ball:null,sideBalls(ui.treeSide),900+ui.treeSide);}
function rotateTree(dir,to){
  const n=treeSides();ui.treeSide=to!=null?to:((ui.treeSide+dir)%n+n)%n;
  const box=$('#treebox');if(!box)return render();
  box.classList.add(dir>0?'out-l':'out-r');
  setTimeout(()=>{box.innerHTML=treeBox();box.classList.remove('out-l','out-r');box.classList.add(dir>0?'in-r':'in-l');
    const l=$('#tside');if(l)l.textContent=sideLabel();const m=$('#toMine');if(m)m.classList.toggle('hidden',ui.treeSide===0||!st.tree.ball);},230);
  setTimeout(()=>box.classList.remove('in-r','in-l'),560);
}
const TREE_STEPS=['Выберите игрушку','Загрузите фото','ИИ создаёт игрушку','Готово!'];
function vTree(){
  bar('Украсить ёлку','Испытание 3 · общая ёлка банка','route');
  if(st.day<OPEN.tree)return lockView('«Ёлка» откроется 15 декабря','Когда подарки собраны и Дед Мороз отправился их развозить, Дочь зовёт всех вместе нарядить ёлку к празднику.','m_doch');
  const T=ui.tree, step=T.step||0;
  if(!step){
    const nx=st.day>=OPEN.final?{t:'Дальше: финал',act:'go',v:'final',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1};
    return `${page(`
      <div class="tcount"><b>${num(treeCount())}</b> ${plural(treeCount(),'игрушка','игрушки','игрушек')} на общей ёлке</div>
      <div class="treebox" id="treebox">${treeBox()}</div>
      <div class="rot"><button class="btn btn-ghost btn-sm" data-act="treeRot" data-d="-1" aria-label="Повернуть влево">‹</button><div class="rotlab" id="tside">${sideLabel()}</div><button class="btn btn-ghost btn-sm" data-act="treeRot" data-d="1" aria-label="Повернуть вправо">›</button></div>
      <p class="note">Крутите ёлку свайпом. Нажмите на шар — увидите, кто его повесил</p>
      ${doch(st.tree.hung?'ёлка большая — у неё много сторон. Крути её: на каждой стороне игрушки коллег со всей страны.':'подарки собраны, папа уехал их развозить. Осталось вместе нарядить ёлку! Сделаем твой шар?','compact')}
      ${st.tree.ball?`<div class="mytoy"><img src="${st.tree.ball}" alt=""><div><b>Ваша игрушка — на ёлке</b><span>Висит на передней стороне, в самом центре</span>
        <span class="row tight"><button class="link ${ui.treeSide===0?'hidden':''}" id="toMine" data-act="treeMine">Показать</button><button class="link" data-act="tDownloadMine">Скачать</button></span></div></div>`:''}
      ${st.tree.hung&&st.day<OPEN.final?`<p class="note">Финал маршрута откроется ${fmt(OPEN.final)}</p>`:''}`)}
    ${actbar(st.tree.hung?[nx,{t:'Ещё игрушка',act:'tStep',s:1}]:[{t:'Сделать свой шар',act:'tStep',s:1,gold:1}])}`;
  }
  bar('Украсить ёлку',`Шаг ${step} из 4 · ${TREE_STEPS[step-1]}`,'route');
  const lines={1:'выбери, какой шар мы сделаем. Стиль можно поменять в любой момент.',2:'теперь нужна картинка: твоё фото, фото с коллегами или рисунок ребёнка. Я превращу её в ёлочную игрушку.',3:'колдую над игрушкой… ещё чуть-чуть!',4:'какая красота! Повесим её на нашу общую ёлку?'};
  const steps=`<ol class="wiz" aria-label="Шаг ${step} из 4">${TREE_STEPS.map((s,i)=>`<li class="${i+1===step?'on':''} ${i+1<step?'done':''}"><i>${i+1<step?'✓':i+1}</i><span>${s}</span></li>`).join('')}</ol>`;
  if(step===1)return `${page(`${steps}${doch(lines[1],'compact')}
      <div class="styles">${BALL_STYLES.map((s,i)=>`<button class="${(T.style||0)===i?'on':''}" data-act="tStyle" data-i="${i}"><img src="${A['ball'+i]}" alt=""><span>${s.n}</span></button>`).join('')}</div>`,{sun:false})}
    ${actbar([{t:'Дальше: фото',act:'tStep',s:2,gold:1},{t:'К ёлке',act:'tStep',s:0}])}`;
  if(step===2)return `${page(`${steps}${doch(lines[2],'compact')}
      <label class="dropzone" id="drop">${T.src?`<img class="pv" src="${T.src}" alt="">`:`<span class="dz">${svg('photo','width="40" height="40"')}</span>`}
        <b>${T.src?'Фото загружено':'Выбрать фото'}</b><span class="small">${T.src?'Нажмите, чтобы заменить':'JPG или PNG — с телефона или компьютера'}</span>
        <input type="file" accept="image/*" id="file" class="sr"></label>
      ${lbl('или попробуйте на примере','s')}
      <div class="samples">${[['sample_girl','Своё фото'],['sample_team','С коллегами'],['sample_draw','Рисунок ребёнка']].map(([k,l])=>`<button data-act="tSample" data-k="${k}"><img src="${A[k]}" alt=""><span>${l}</span></button>`).join('')}</div>
      <p class="note">Фото обрабатываются только для создания игрушки</p>`,{sun:false})}
    ${actbar([{t:'Создать игрушку',act:'tMake',gold:1,disabled:!T.src},{t:'Назад',act:'tStep',s:1}])}`;
  if(step===3)return page(`${steps}${doch(lines[3],'compact')}<div class="making"><div class="orb"><img src="${T.src}" alt=""></div><div class="mk" id="mk">Преобразуем фото в стилизованный новогодний шар…</div></div>`,{sun:false});
  return `${page(`${steps}${doch(lines[4],'compact')}
      <div class="ballout"><img src="${T.ball}" alt="Ваша игрушка"></div>
      <p class="tale small center">Её увидят коллеги из всех городов. Или сохраните к себе на устройство.</p>
      <p class="note">${st.tree.hung?'':`${STAR_SM} +100 баллов за первую игрушку на ёлке · `}<a class="link" href="#" data-act="tStep" data-s="1">Сделать другую</a></p>`,{sun:false})}
    ${actbar([{t:'Повесить на ёлку',act:'tHang',gold:1},{t:'Скачать',act:'tDownload'}])}`;
}
function setTreeSrc(src){ui.tree.src=src;render();}
async function makeBall(){
  ui.tree.step=3;render();
  const msgs=['Подбираем стиль…','Добавляем снег и огоньки…','Вешаем петельку…'];let i=0;
  const t=setInterval(()=>{const m=$('#mk');if(m)m.textContent=msgs[i++%msgs.length];},800);timers.push(t);
  const [ball]=await Promise.all([renderBall(ui.tree.src,ui.tree.style||0),new Promise(r=>setTimeout(r,2400))]);
  clearInterval(t);ui.tree.ball=ball;ui.tree.step=4;if(st.view==='tree')render();
}
function download(dataUrl,name){const a=document.createElement('a');a.href=dataUrl;a.download=name;document.body.appendChild(a);a.click();a.remove();}

/* ===== Финал ===== */
function personalTale(){
  const u=st.user,n=quizWords(),g=st.forest.bestGifts;
  const nick=u.nick;
  return [
    `${v('Жил-был','Жила-была')} ${nick}. В новогоднюю ночь у Деда Мороза Михаила порвался мешок — подарки рассыпались по всему лесу, а до первой полуночи оставались считаные минуты.`,
    `${nick} ${v('пришёл','пришла')} на помощь. Сначала ${v('расспросил','расспросила')} местных и ${v('разгадал','разгадала')} ${n} ${plural(n,'загадку','загадки','загадок')} о словах и узорах разных краёв — так нашлась тропа. Потом ${v('пробежал','пробежала')} через лес и ${v('собрал','собрала')} ${g} ${plural(g,'подарок','подарка','подарков')}. А под конец ${v('повесил','повесила')} на общую ёлку свою игрушку — её видно из любого края страны.`,
    `Михаил успел во все одиннадцать полуночей. Тут и сказке конец, а ${nick} — ${v('её главный герой','её главная героиня')}.`
  ];
}
function vFinal(){
  bar('Финал маршрута','Сказка о помощнике','route');
  if(st.day<OPEN.final)return lockView('Финал маршрута откроется 22 декабря','Дед Мороз Михаил вручит готовую сказку, где главный герой — вы, и карточку героя.','m_mikhail');
  if(!allDone()){
    const items=[['quiz','«Спроси дорогу» — квиз',done.quiz()],['forest','«Лес» — собрать подарки',done.forest()],['tree','«Ёлка» — повесить игрушку',done.tree()]];
    return `${page(`${pt('Сказка почти готова','Финал маршрута','h1')}
      ${say('m_mikhail','Дед Мороз Михаил','осталось совсем немного! Пройдите все три испытания — и сказка станет вашей: свой персонаж, свой путь, свой результат, свой подарок.','compact')}
      <ul class="checklist">${items.map(([k,l,ok])=>`<li class="${ok?'ok':''}"><i>${ok?'✓':''}</i><span>${l}</span>${ok?'':st.day>=OPEN[k]?`<button class="btn btn-gold btn-sm" data-act="go" data-v="${k}">Пройти</button>`:lockChip(OPEN[k])}</li>`).join('')}</ul>`)}
    ${actbar([ROUTE_BTN])}`;
  }
  if(!st.final.seen){st.final.seen=true;setTimeout(()=>toast('Сказка готова!'),300);}
  save();
  const u=st.user,p=pts(),T=personalTale();
  return `${page(`${pt('Сказка о помощнике','Финал маршрута','h1')}
    ${say('m_mikhail','Дед Мороз Михаил','спасибо, помощник! Благодаря вам я успел во все одиннадцать полуночей. Вот ваша сказка.','compact')}
    <div class="parch story">${flowers()}${T.map((x,i)=>i===0?tale(x,true):tale(x)).join('')}<div class="fin">Конец</div></div>
    ${lbl('Карточка героя')}
    <div class="herocard">${ava(u.nick,84,true)}<div class="nk">${esc(u.nick)}</div><div class="city">${esc(u.city||'')}</div>
      <div class="herostats"><div><b>${quizWords()}</b><span>слов и узоров</span></div><div><b>${st.forest.bestGifts}</b><span>подарков</span></div><div><b>${num(p.total)}</b><span>баллов</span></div></div>
      <button class="btn btn-ghost btn-block" data-act="cardDl">${svg('down','width="17" height="17"')} Скачать карточку героя</button></div>
    <div class="cart chestinv"><img src="${A.chest}" alt="">${lbl('Подарок — в «Сундуке чудес»','s')}
      <p class="small">${st.chest.used?`Ваш подарок: ${num(st.chest.prize)} баллов. Код — в сундуке и в личном кабинете.`:'С 25 по 31 декабря запустите лототрон: он выберет подарок и выдаст код. Один запуск на участника.'}</p></div>`)}
  ${actbar([st.day>=OPEN.chest?{t:st.chest.used?'Мой подарок':'Запустить лототрон',act:'go',v:'chest',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1},{t:'Сериал',act:'go',v:'serial'}],st.day<OPEN.chest?'«Сундук чудес» откроется 25 декабря':'')}`;
}

/* ===== Сундук чудес ===== */
const PRIZES=[[50,45],[100,45],[500,7],[1000,2.5],[5000,.5]];
function rollPrize(){let r=Math.random()*100;for(const [v2,w] of PRIZES){if((r-=w)<0)return v2;}return 50;}
function vChest(){
  bar('Сундук чудес','Награда в конце пути','route');
  const before=st.day<OPEN.chest, after=st.day>OPEN.chestEnd;
  const C=ui.chest, won=st.chest.prize&&!C.reel;
  const prizes=`${lbl('Призовой фонд','s')}<div class="prizes">${[[50,'часто'],[100,'часто'],[500,'штучно'],[1000,'штучно'],[5000,'штучно']].map(([v2,l])=>`<div><b>${num(v2)}</b><span>${l}</span></div>`).join('')}</div>
    <p class="note">Основная масса выигрышей — 50–100 баллов, крупные номиналы распределены штучно</p>`;
  const top10=`<div class="cart">${lbl('Топ-10 турнирной таблицы','s')}<p class="small">Сверх лотереи десять лучших по баллам получают мерч — единственный приз, который нельзя выиграть случайно.</p><a class="link" href="${href('rating')}">Открыть таблицу</a></div>`;
  const chestImg=`<div class="chestimg ${before||after&&!st.chest.prize?'locked':''} ${C.reel?'shake':''} ${st.chest.prize&&!before?'open':''}" id="chestimg"><span class="burst"></span><img src="${A.chest}" alt="Сундук чудес">${before?`<div class="lockb"><span class="chip lock">${svg('lock','width="15" height="15"')} 25 декабря</span></div>`:''}</div>`;
  if(won||after&&st.chest.prize){
    return `${page(`${pt('Ваш подарок','Код на подарок — забирайте','h1')}
      <div class="win"><div class="val">${num(st.chest.prize)}</div><div class="unit">баллов</div></div>
      <div class="codebox"><div class="lbl-s">Код на подарок</div><div class="code">${st.chest.code}</div>
        <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${st.chest.code}">${svg('copy','width="15" height="15"')} Скопировать</button></div>
      <p class="tale small center">Баллы — для магазина мерча банка. Код сохранён в личном кабинете${st.user&&st.user.email?` и продублирован на ${esc(st.user.email)}`:''}.</p>
      ${chestImg}${top10}`)}
    ${actbar([{t:'Личный кабинет',act:'go',v:'profile',gold:1},ROUTE_BTN])}`;
  }
  if(before){
    const d=OPEN.chest-st.day;
    return `${page(`${say('m_mikhail','Дед Мороз Михаил','это мой сундук чудес. В нём подарок для каждого помощника — без проигрышей.','compact')}
      ${chestImg}<p class="tale center">Откроется 25 декабря — осталось ${d} ${plural(d,'день','дня','дней')}. Перед Новым годом каждый участник один раз запустит лототрон и заберёт код на подарок.</p>
      ${prizes}${top10}`)}
    ${actbar([ROUTE_BTN])}`;
  }
  if(after)return `${page(`${pt('Розыгрыш завершён','Сундук закрылся 31 декабря','h1')}${chestImg}<p class="tale center">Спасибо всем, кто участвовал!</p>${top10}`)}${actbar([ROUTE_BTN])}`;
  return `${page(`${say('m_mikhail','Дед Мороз Михаил','это мой сундук чудес. В нём подарок для каждого помощника — без проигрышей.','compact')}
    ${chestImg}
    ${C.reel?`<div class="reel"><span class="mark"></span><div class="strip" id="strip">${C.reel.map(v2=>`<div class="cell ${v2>=500?'big':''}"><div>${num(v2)}<small>баллов</small></div></div>`).join('')}</div></div>`
      :`<div class="reel idle"><span class="mark"></span><div class="strip">${[100,50,0,100,1000].map(v2=>v2?`<div class="cell ${v2>=500?'big':''}"><div>${num(v2)}<small>баллов</small></div></div>`:`<div class="cell q"><div>?<small>ваш подарок</small></div></div>`).join('')}</div></div>
        <ol class="how"><li><i>1</i><span>Нажмите «Запустить»</span></li><li><i>2</i><span>Лототрон покрутится и остановится на подарке</span></li><li><i>3</i><span>Забирайте код — он сохранится в кабинете</span></li></ol>`}
    ${prizes}${top10}`)}
  ${C.reel?'':actbar([{t:'✦ Запустить лототрон ✦',act:'chestGo',gold:1,noarrow:1}],'Открыт до 31 декабря · один запуск на участника')}`;
}
function chestGo(){
  const C=ui.chest;if(st.chest.used||C.reel)return;
  const prize=rollPrize();
  const reel=[...Array(44)].map(()=>[50,100,50,100,500,1000,50,100,5000,100][Math.floor(Math.random()*10)]);reel[38]=prize;C.reel=reel;
  st.chest.used=true;st.chest.prize=prize;st.chest.code=genCode('GIFT');save();render();
  const r=$('.reel');if(r)r.scrollIntoView({behavior:'smooth',block:'center'});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const s=$('#strip');if(!s)return;const w=s.parentElement.clientWidth;s.style.transform=`translateX(${-(38*110+55-w/2)}px)`;}));
  setTimeout(()=>{C.reel=null;if(st.view==='chest'){render();window.scrollTo({top:0,behavior:'smooth'});}toast(`Ваш подарок: ${num(prize)} баллов — код готов`);},3800);
}

/* ===== Сказка-сериал ===== */
function chState(i){const c=D.CHAPTERS[i];if(st.day<c.day)return 'soon';if(!c.final&&st.day<=c.day+1)return 'vote';return 'out';}
function vSerial(){
  bar('Сказка-сериал','Пишут все вместе');
  const ch=D.CHAPTERS;
  let live=-1;ch.forEach((c,i)=>{if(chState(i)==='vote')live=i;});
  return `${endBanner()}${page(`
    <div class="ser-head"><img class="illo" src="${A.serial}" alt=""><p class="tale small">Выходит глава — после неё герою нужно сделать выбор из трёх вариантов. Вариант с большинством голосов ложится в основу следующей главы. И так — до финала.</p></div>
    <div class="stats3"><div><b>3–4 дня</b><span>новая глава</span></div><div><b>48 часов</b><span>на голосование</span></div><div><b>PDF</b><span>в финале</span></div></div>
    ${live>=0?`<div class="wcard hot"><img class="wim" src="${A[ch[live].img]}" alt=""><div class="wb"><div class="row tight"><span class="lbl-s">Глава ${ROMAN[live]}</span><span class="chip live">голосование</span></div><b>${ch[live].t}</b>
      <span>${st.serial.votes[live]!=null?'Ваш голос учтён — следите за итогами':'Выберите, куда повернёт сюжет'}</span>${btn({t:st.serial.votes[live]!=null?'Читать главу':'Читать и голосовать',act:'openCh',i:live,gold:st.serial.votes[live]==null,cls:'btn-sm'})}</div></div>`:''}
    ${lbl('Оглавление','s')}
    <div class="toc">${ch.map((c,i)=>{const s=chState(i);return `<button class="tocr ${s}" data-act="openCh" data-i="${i}" ${s==='soon'?'disabled':''}><span class="rn">${ROMAN[i]}</span><span class="rt"><b>${s==='soon'?'Скоро':c.t}</b><small>${s==='soon'?'Выйдет '+fmt(c.day):s==='vote'?(st.serial.votes[i]!=null?'Ваш голос учтён':'Идёт голосование'):c.final?'Финальная глава':`Выбор читателей: «${c.o[c.win]}»`}</small></span><span class="pg-n">${fmt(c.day,true)}</span></button>`;}).join('')}
      <button class="tocr fin ${st.day<D.FULL_TALE_DAY?'soon':''}" data-act="go" data-v="fulltale" ${st.day<D.FULL_TALE_DAY?'disabled':''}><span class="rn">✦</span><span class="rt"><b>Цельная сказка</b><small>${st.day<D.FULL_TALE_DAY?'Выйдет '+fmt(D.FULL_TALE_DAY):'Читать и скачать PDF'}</small></span><span class="pg-n">${fmt(D.FULL_TALE_DAY,true)}</span></button></div>`)}`;
}
function voteHTML(i){
  const c=D.CHAPTERS[i],s=chState(i),myv=st.serial.votes[i],open=s==='vote';
  const frac=open?(st.day===c.day?.55:.88):1;
  const tot=Math.round(c.votes*frac)+(ui.liveBump||0)+(myv!=null?1:0);
  const cnt=c.pct.map((p,k)=>Math.round(tot*p/100)+(myv===k?1:0));
  const sum=cnt.reduce((a,b)=>a+b,0), show=myv!=null||!open;
  return `${pt('Как продолжится сказка?',open?'Выбор за вами':'Голосование завершено')}
    <div class="vote-h">${open?`<span class="chip live" id="vcd">${countdown(c.day)}</span>`:`<span class="chip">Проголосовали ${num(sum)}</span>`}</div>
    <p class="tale small center">${open?(myv!=null?'Спасибо! Ваш голос учтён — следите за счётчиком.':'Выберите вариант — большинство решит, что будет дальше.'):'Вариант, набравший больше всего голосов, лёг в основу следующей главы.'}</p>
    <div class="vopts">${c.o.map((o,k)=>{const pc=Math.round(cnt[k]/sum*100);const win=!open&&k===c.win;return `<button class="vopt ${myv===k?'mine':''} ${win?'win':''}" data-act="vote" data-k="${k}" ${show?'disabled':''}>${show?`<span class="bar" style="width:${pc}%"></span>`:''}<span class="k">${'АБВ'[k]}</span><span class="vt">${o}${myv===k?'<span class="tag">ваш выбор</span>':''}${win?'<span class="tag">победил</span>':''}</span>${show?`<span class="pc">${pc}%</span>`:''}</button>`;}).join('')}</div>
    ${open&&show?`<p class="note">Голосов: <b id="vtot">${num(sum)}</b> · счётчик обновляется вживую</p>`:''}`;
}
function vChapter(){
  const i=ui.chapter||0,c=D.CHAPTERS[i],s=chState(i);
  if(s==='soon')return vSerial();
  bar(`Глава ${ROMAN[i]}`,c.t,'serial');
  const myv=st.serial.votes[i],open=s==='vote',nx=D.CHAPTERS[i+1],nxOut=nx&&st.day>=nx.day;
  let acts;
  if(c.final)acts=[st.day>=D.FULL_TALE_DAY?{t:'Читать сказку целиком',act:'go',v:'fulltale',gold:1}:{t:'Все главы',act:'go',v:'serial',gold:1}];
  else if(open&&myv==null)acts=[{t:'Выбрать продолжение',act:'sheetOpen',v:'vote',gold:1}];
  else acts=[nxOut?{t:`Глава ${ROMAN[i+1]}`,act:'openCh',i:i+1,gold:1}:{t:'Все главы',act:'go',v:'serial',gold:1},{t:open?'Ход голосования':'Итоги',act:'sheetOpen',v:'vote'}];
  const note=c.final?(st.day>=D.FULL_TALE_DAY?'':`Цельная сказка с инфографикой голосований выйдет ${fmt(D.FULL_TALE_DAY)}`):open?'':nx&&!nxOut?`Глава ${ROMAN[i+1]} выйдет ${fmt(nx.day)}`:'';
  return `${page(`
    <div class="illu"><img src="${A[c.img]}" alt=""></div>
    ${pt(c.t,`Глава ${ROMAN[i]} · ${fmt(c.day)}`,'h1')}
    ${open?`<div class="vote-h"><span class="chip live" id="vcd2">${countdown(c.day)}</span></div>`:''}
    <div class="parch story">${flowers()}${c.p.map((x,k)=>tale(x,k===0)).join('')}${!c.final&&!open?`<p class="choice">Выбор читателей: «${c.o[c.win]}» — ${c.pct[c.win]}% голосов</p>`:''}</div>`)}
  ${actbar(acts,note)}
  ${ui.sheet==='vote'&&!c.final?sheet(voteHTML(i)):''}`;
}
function countdown(day){const end=new Date(2026,11,1+day+2,10,0,0);const now=new Date(dateOf(st.day).getTime()+(Date.now()-T0));let s=Math.max(0,Math.floor((end-now)/1000));const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600);s%=3600;const m=Math.floor(s/60);s%=60;return `до конца ${d?d+' д ':''}${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
const T0=Date.now();
function mountChapter(){
  const i=ui.chapter||0;if(chState(i)!=='vote')return;
  const t=setInterval(()=>{['#vcd','#vcd2'].forEach(s=>{const cd=$(s);if(cd)cd.innerHTML=countdown(D.CHAPTERS[i].day);});},1000);timers.push(t);
  const t2=setInterval(()=>{if(st.serial.votes[i]==null)return;ui.liveBump=(ui.liveBump||0)+Math.floor(1+Math.random()*4);const el=$('#vtot');if(el){const c=D.CHAPTERS[i];const frac=st.day===c.day?.55:.88;el.textContent=num(Math.round(c.votes*frac)+ui.liveBump+1);}},1500);timers.push(t2);
}
function chapterHTML(c,i){return `<h3 class="ch-t"><small>Глава ${ROMAN[i]}</small>${c.t}</h3>${c.p.map((x,k)=>tale(x,k===0)).join('')}${!c.final?`<p class="choice">Выбор читателей: «${c.o[c.win]}» — ${c.pct[c.win]}% голосов</p>`:''}`;}
function fullTaleHTML(forPrint){
  return D.CHAPTERS.map((c,i)=>forPrint?`<h3 style="font-family:Georgia;margin:28px 0 8px">Глава ${i+1}. ${c.t}</h3>${c.p.map(x=>`<p>${esc(x)}</p>`).join('')}${!c.final?`<p style="font-style:italic;color:#7a6a40">Выбор читателей: «${c.o[c.win]}» — ${c.pct[c.win]}% голосов</p>`:''}`:chapterHTML(c,i)).join('');
}
// Цельная сказка: читается по главам, переключатель глав сверху
function vFullTale(){
  bar('Большая книга сказок','Сказка-сериал · финал','serial');
  if(st.day<D.FULL_TALE_DAY)return lockView('Цельная сказка выйдет 25 декабря','Все главы соберутся в одну сказку — её можно будет прочитать и скачать в PDF.','book');
  const ch=D.CHAPTERS, k=Math.min(ui.seg.ft||0,ch.length-1);
  return `${page(`
    <div class="infog"><div class="bign">${num(D.SERIAL_AUTHORS)}</div><div><b>человек написали эту сказку</b><span>5 голосований, ${num(ch.filter(c=>!c.final).reduce((s,c)=>s+c.votes,0))} голосов. Каждый поворот сюжета выбрали сотрудники ПСБ.</span></div></div>
    <details class="more"><summary>Итоги голосований</summary><div class="winners">${ch.filter(c=>!c.final).map((c,i)=>`<div class="wr"><span class="rn">${ROMAN[i]}</span><span class="wt">${c.o[c.win]}</span><b>${c.pct[c.win]}%</b></div>`).join('')}</div></details>
    <div class="chsel" id="chsel">${ch.map((c,i)=>`<button class="${i===k?'on':''}" data-act="ftCh" data-i="${i}" aria-label="Глава ${i+1}">${ROMAN[i]}</button>`).join('')}</div>
    <div class="parch story">${flowers()}${chapterHTML(ch[k],k)}${k===ch.length-1?'<div class="fin">Конец</div>':''}</div>
    <div class="chnav">${k>0?`<button class="btn btn-ghost btn-sm" data-act="ftCh" data-i="${k-1}">‹ Глава ${ROMAN[k-1]}</button>`:'<span></span>'}${k<ch.length-1?`<button class="btn btn-ghost btn-sm" data-act="ftCh" data-i="${k+1}">Глава ${ROMAN[k+1]} ›</button>`:''}</div>`)}
  ${actbar([{t:`${svg('down','width="18" height="18"')} Скачать сказку в PDF`,act:'pdf',gold:1,noarrow:1}])}`;
}

/* ===== Пряничная избушка ===== */
function taleCover(t,i){const [a,b]=t.c;return `<svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="tc${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="#0b1538"/></linearGradient></defs><rect width="160" height="120" fill="url(#tc${i})"/>
  <circle cx="${30+i*11%100}" cy="28" r="12" fill="${b}" opacity=".9"/>${[...Array(7)].map((_,k)=>`<circle cx="${(k*37+i*13)%160}" cy="${(k*23+i*7)%60+6}" r="1.2" fill="#fff"/>`).join('')}
  <path d="M0 96 Q40 76 80 92 T160 86 V120 H0Z" fill="#eef4ff" opacity=".9"/><path d="M14 96 l12-30 12 30z M120 92 l10-26 10 26z" fill="#173a5c"/>
  <g fill="none" stroke="${b}" stroke-width="1.4" opacity=".7"><path d="M70 112 l6-6 6 6 6-6 6 6"/></g></svg>`;}
function vIzba(){
  bar('Пряничная избушка','Аудиосказки на ночь');
  const cur=ui.izba.cur;
  const player=cur!=null?`<div class="player"><span class="face"><img src="${A.m_zhena}" alt=""></span><button class="pp" data-act="pp" aria-label="${ui.izba.playing?'Пауза':'Слушать'}">${ui.izba.playing?svg('pause'):svg('play')}</button>
    <div class="meta"><b>${D.TALES[cur].t}</b><span>${D.TALES[cur].n} · читает жена Михаила</span><div class="bar"><i id="pbar" style="width:${(ui.izba.pos/(D.TALES[cur].d*60))*100}%"></i></div></div>
    <span class="tm-l" id="ptm">${mmss(ui.izba.pos)} / ${D.TALES[cur].d}:00</span></div>`:'';
  return `${endBanner()}${page(`
    <img class="illo" src="${A.izba}" alt="">
    ${say('m_zhena','Жена Михаила','устраивайтесь поудобнее. Каждую неделю я читаю две новые сказки — заходите почаще!','compact')}
    <div class="stats3"><div><b>${talesOpen()} из 10</b><span>сказок доступно</span></div><div><b>+2</b><span>каждую неделю</span></div><div><b>5–10</b><span>минут сказка</span></div></div>
    ${lbl(`Сказки на ночь`,'s')}
    <div class="tales">${D.TALES.map((t,i)=>{const lk=st.day<t.open;return `<button class="tale-r ${cur===i?'playing':''}" data-act="play" data-i="${i}" ${lk?'disabled':''}><span class="cv">${taleCover(t,i)}</span><span class="tt"><b>${t.t}</b><small>${t.n} · ${lk?'откроется '+fmt(t.open):t.d+' мин'}</small></span><span class="pl">${lk?svg('lock'):cur===i&&ui.izba.playing?svg('pause'):svg('play')}</span></button>`;}).join('')}</div>
    <div class="stream"><span class="small ink2">Слушайте и вне платформы:</span><div class="row-c"><button class="btn btn-ghost btn-sm" data-act="toast" data-m="Ссылка на плейлист появится после публикации">VK Музыка</button><button class="btn btn-ghost btn-sm" data-act="toast" data-m="Ссылка на плейлист появится после публикации">Яндекс Музыка</button></div></div>`)}
  ${player}`;
}
function mmss(s){s=Math.floor(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
function mountIzba(){
  if(ui.izba.cur==null)return;
  const t=setInterval(()=>{if(!ui.izba.playing)return;const T=D.TALES[ui.izba.cur];ui.izba.pos=Math.min(T.d*60,ui.izba.pos+1);const b=$('#pbar'),m=$('#ptm');if(b)b.style.width=(ui.izba.pos/(T.d*60)*100)+'%';if(m)m.textContent=mmss(ui.izba.pos)+' / '+T.d+':00';},1000);timers.push(t);
}

/* ===== Рейтинг ===== */
function lbRow(x){return `<tr class="${x.me?'me':''} ${x.place<=3?'t3 p'+x.place:''}"><td class="pl"><span>${x.place}</span></td><td><div class="nm">${ava(x.nick,32,x.me)}<div><b>${esc(x.nick)}</b>${x.me?'<span class="tag">вы</span>':''}${x.place<=10?'<span class="merch">мерч</span>':''}${x.city?`<small>${esc(x.city)}</small>`:''}</div></div></td><td class="p">${num(x.p)}</td></tr>`;}
function vRating(){
  bar('Турнирная таблица','Топ-10 получают мерч');
  const lb=board(),me=lb.find(x=>x.me);
  const gap=me.place<=10?0:Math.max(10,lb[9].p-me.p+10);
  const tab=ui.seg.rt||'top';
  const from=Math.max(0,Math.min(lb.length-7,me.place-4)), near=lb.slice(from,from+7);
  return `${endBanner()}${page(`
    <div class="mypos">${ava(me.nick,64,true)}<div><b>${esc(me.nick)}</b><span>${me.place} место · ${num(me.p)} баллов</span><span class="gap">${me.place<=10?'Вы в топ-10 — претендуете на мерч':`До топ-10 — ${num(gap)} баллов`}</span></div></div>
    ${seg('rt',[['top','Топ-10'],['near','Рядом со мной']],tab)}
    <table class="lb">${(tab==='top'?lb.slice(0,10):near).map(lbRow).join('')}</table>
    <a class="btn btn-ghost btn-block" href="${href('profile','?tab=earn')}">Где ещё заработать баллы</a>
    <details class="more"><summary>Как начисляются баллы</summary>
      <ul class="rules"><li><b>«Спроси дорогу»</b> — 20 за каждый верный ответ, в зачёт лучший результат по каждому набору</li><li><b>«Лес»</b> — 10 за каждый подарок в лучшем забеге</li><li><b>«Ёлка»</b> — 100 за первую игрушку на общей ёлке</li></ul>
      <p class="note left">Баллы дают только испытания маршрута. Сказка-сериал, Пряничная избушка и Сундук чудес — без баллов. Итоги и награждение — после завершения маршрута.</p></details>`)}`;
}

/* ===== Личный кабинет ===== */
const SRC={quiz:['«Спроси дорогу»','m_mlad'],forest:['«Лес»','m_star'],tree:['«Ёлка»','m_doch']};
function opportunities(){
  const o=[];
  const item=(k,t,d,p,act)=>`<div class="opp">${por(SRC[k][1],'sm')}<div class="ot"><b>${t}</b><span>${d}</span><div class="oa"><span class="chip">${STAR_SM} ${p}</span>${act}</div></div></div>`;
  const lk=d=>`<span class="chip lock">${svg('lock','width="12" height="12"')} ${fmt(d,true)}</span>`;
  D.QUIZ.forEach((r,i)=>{const res=st.quiz[i];
    const n=r.qs.length;
    if(st.day<r.open)o.push(item('quiz',`«Спроси дорогу» · набор ${i+1}`,`«${r.title}» — откроется ${fmt(r.open)}`,`до ${n*20}`,lk(r.open)));
    else if(!res||!res.done)o.push(item('quiz',`«Спроси дорогу» · набор ${i+1}`,`«${r.title}» — 20 баллов за каждый верный ответ`,`до ${n*20}`,`<button class="btn btn-gold btn-sm" data-act="goQuiz" data-i="${i}">Пройти</button>`));
    else if(res.best<n)o.push(item('quiz',`«Спроси дорогу» · набор ${i+1}`,`Ваш результат — ${res.best} из ${n}, можно улучшить`,`ещё до ${(n-res.best)*20}`,`<button class="btn btn-ghost btn-sm" data-act="goQuiz" data-i="${i}">Ещё раз</button>`));
  });
  if(st.day<OPEN.forest)o.push(item('forest','«Лес»','Раннер откроется '+fmt(OPEN.forest),'10 за подарок',lk(OPEN.forest)));
  else o.push(item('forest','«Лес»',st.forest.runs?`Ваш рекорд — ${st.forest.bestGifts} ${plural(st.forest.bestGifts,'подарок','подарка','подарков')}. Каждый подарок сверх него — +10`:'Каждый собранный подарок — 10 баллов','10 за подарок',`<button class="btn ${st.forest.runs?'btn-ghost':'btn-gold'} btn-sm" data-act="go" data-v="forest">${st.forest.runs?'Побить рекорд':'Бежать'}</button>`));
  if(!st.tree.hung){if(st.day<OPEN.tree)o.push(item('tree','«Ёлка»','Откроется '+fmt(OPEN.tree),'100',lk(OPEN.tree)));else o.push(item('tree','«Ёлка»','Первая игрушка на общей ёлке','100',`<button class="btn btn-gold btn-sm" data-act="go" data-v="tree">Сделать шар</button>`));}
  return o;
}
function vProfile(){
  bar('Личный кабинет',esc(st.user.nick));
  const u=st.user,p=pts(),lb=board(),me=lb.find(x=>x.me);
  const gap=me.place<=10?0:Math.max(10,lb[9].p-me.p+10);
  const log=[...(st.log||[])].reverse(), opp=opportunities(), tab=ui.seg.pf||'points';
  let body;
  if(tab==='history')body=log.length?`<div class="hist">${log.map(e=>`<div class="hr"><span class="d">${fmt(e.d,true)}</span><span class="w"><b>${SRC[e.k][0]}</b><small>${esc(e.t)}</small></span><span class="p">+${num(e.p)}</span></div>`).join('')}<div class="hr tot"><span class="w"><b>Итого</b></span><span class="p">${num(p.total)}</span></div></div>`
      :`<p class="tale small">Пока пусто. Первые баллы — за квиз «Спроси дорогу».</p>`;
  else if(tab==='earn')body=`${opp.length?`<div class="opps">${opp.join('')}</div>`:`<p class="tale small">Все доступные баллы собраны — осталось удержаться в таблице.</p>`}
      <p class="note">Баллы в таблицу дают только испытания маршрута. Топ-10 по итогам получают мерч.</p>`;
  else body=`<div class="bysrc">${[['quiz',p.q],['forest',p.f],['tree',p.t]].map(([k,val])=>`<div>${por(SRC[k][1],'sm')}<span>${SRC[k][0]}</span><b>${num(val)}</b></div>`).join('')}</div>
      <div class="codebox"><div class="lbl-s">Персональный код</div><div class="code sm">${u.code}</div>
        <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${u.code}">${svg('copy','width="14" height="14"')} Копировать</button>
        ${u.email?`<div class="note">Продублирован на ${esc(u.email)}</div>`:''}</div>
      ${st.chest.prize?`<div class="cart prize">${lbl('Подарок из «Сундука чудес»','s')}<div class="row"><img src="${A.chest}" alt=""><div><b class="pz">${num(st.chest.prize)} баллов</b><div class="small ink2">для магазина мерча банка · в турнирную таблицу не идут</div></div></div>
        <div class="codebox"><div class="lbl-s">Код на подарок</div><div class="code sm">${st.chest.code||''}</div><button class="btn btn-ghost btn-sm" data-act="copy" data-t="${st.chest.code||''}">${svg('copy','width="14" height="14"')} Копировать</button></div></div>`:''}`;
  return page(`
    <div class="pcard">${ava(u.nick,64,true)}<div><b>${esc(u.nick)}</b><span>${esc(u.city||'Город не указан')}</span></div></div>
    <div class="herostats"><div><b>${num(p.total)}</b><span>баллов</span></div><div><b>${me.place}</b><span>место</span></div><div><b>${me.place<=10?'топ-10':num(gap)}</b><span>${me.place<=10?'мерч':'до топ-10'}</span></div></div>
    ${seg('pf',[['points','Баллы'],['history','История'],['earn','Заработать']],tab)}
    ${body}`);
}

/* ===== Заглушка закрытого раздела ===== */
function lockView(title,text,img){
  return `${page(`${pt(title,'Раздел пока закрыт','h1')}
    <img class="lock-img" src="${A[img||'clock']}" alt="">
    ${text?tale(text):''}
    <p class="note">Сейчас в прототипе — ${fmt(st.day)}. Дату можно сменить в панели «Прототип».</p>`)}
  ${actbar([{t:'На маршрут',act:'go',v:'route',gold:1}])}`;
}

/* ===== Рендер ===== */
const VIEWS={route:vRoute,profile:vProfile,quiz:vQuiz,forest:vForest,tree:vTree,final:vFinal,serial:vSerial,chapter:vChapter,fulltale:vFullTale,izba:vIzba,chest:vChest,rating:vRating};
const MOUNTS={forest:()=>{if(ui.fmode)mountForest();},chapter:mountChapter,izba:mountIzba};
function render(){
  clearTimers();
  const app=$('#app'); ui.bar=null;
  let html, root=false;
  if(st.screen==='prologue')html=vPrologue();
  else if(st.screen==='auth')html=vAuth();
  else if(st.screen==='nick')html=vNick();
  else {ensureUser();root=ROOTS.includes(st.view);html=(VIEWS[st.view]||vRoute)();}
  const scr=st.screen==='app'?st.view:(st.screen==='prologue'&&!ui.bookOpen?'cover':st.screen);
  document.body.dataset.screen=scr;
  document.body.classList.toggle('tabbed',root);
  document.body.classList.toggle('gm-on',st.screen==='app'&&st.view==='forest'&&!!ui.fmode);
  app.innerHTML=(ui.bar?appbar(ui.bar):'')+`<main class="app">${html}${root?'<p class="foot">Прототип платформы · Deep × ПСБ · контент и цифры — примеры</p>':''}</main>`+(root?tabbar():'');
  if(st.screen==='app')(MOUNTS[st.view]||(()=>{}))();
  if(st.screen==='prologue'&&ui.bookOpen)mountPrologue();
  if(ui.turn){app.classList.remove('turn');void app.offsetWidth;app.classList.add('turn');clearTimeout(render._t);render._t=setTimeout(()=>app.classList.remove('turn'),700);ui.turn=false;}
  renderDemo();
}
function updateHeader(){const c=$('.abar .chip.pts b');if(c)c.textContent=num(pts().total);}
function go(view,q){save();SS.set('turn',1);clearTimers();location.href=href(view,q);}
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600);}
function copy(t){const done2=()=>toast('Скопировано: '+t);if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(done2,()=>fallback());}else fallback();function fallback(){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');done2();}catch(e){toast(t);}a.remove();}}

/* ===== Панель прототипа ===== */
const MARKS=[[0,'1 дек · старт'],[7,'8 дек · «Лес»'],[14,'15 дек · «Ёлка»'],[21,'22 дек · финал'],[24,'25 дек · сундук'],[31,'1 января'],[45,'15 янв · конец']];
const JUMPS=[['prologue','Обложка'],['nick','Имя героя'],['auth','Персональный код'],['route','Маршрут'],['quiz','Квиз'],['forest','Лес'],['tree','Ёлка'],['final','Финал'],['serial','Сериал'],['chapter','Глава + голосование'],['izba','Избушка'],['chest','Сундук'],['rating','Рейтинг'],['profile','Кабинет']];
function renderDemo(){
  const el=$('#demo');
  el.innerHTML=`<button class="demo-fab" data-act="demo" aria-label="Панель прототипа">${svg('sliders')}<span>Прототип</span></button>
  ${ui.demo?`<div class="demo" role="dialog" aria-label="Панель прототипа"><button class="x" data-act="demo" aria-label="Закрыть">×</button>
    <h4>Панель прототипа</h4><p>На платформе её не будет. Двигайте дату — разделы открываются по графику запуска.</p>
    <div class="dl">Дата на платформе</div>
    <div class="dv"><b id="dlab">${fmt(st.day)}${st.day>=31?' 2027':''}</b><span class="small">${st.day<31?nyLeft():''}</span></div>
    <input type="range" min="0" max="${LAST_DAY}" value="${st.day}" id="dayr" aria-label="Дата">
    <div class="marks">${MARKS.map(([d,l])=>`<button data-act="setDay" data-d="${d}">${l}</button>`).join('')}</div>
    <div class="dl">Прогресс</div>
    <div class="acts"><button data-act="fillAll">Пройти всё за меня</button><button class="alt" data-act="resetAll">Сбросить</button></div>
    <div class="dl">Перейти к экрану</div>
    <div class="jump">${JUMPS.map(([k,l])=>`<button data-act="jump" data-k="${k}">${l}</button>`).join('')}</div>
    <p style="margin:14px 0 0;font-size:11px">Прототип Deep × ПСБ. Тексты, цифры и баллы — примеры для демонстрации механик.</p>
  </div>`:''}`;
  const r=$('#dayr');
  if(r){r.addEventListener('input',()=>{$('#dlab').textContent=fmt(+r.value)+(+r.value>=31?' 2027':'');});r.addEventListener('change',()=>setDay(+r.value));}
}
function setDay(d){st.day=d;ui.quizRound=null;ui.sheet=null;save();render();}
async function fillAll(){
  ensureUser();
  D.QUIZ.forEach((r,i)=>{if((st.day>=r.open||i===0)&&!(st.quiz[i]&&st.quiz[i].done)){const n=r.qs.length,b=n-2;st.quiz[i]={best:b,done:true};addLog('quiz',`Набор ${i+1} «${r.title}»: ${b} из ${n} верных`,b*20);}});
  if(!st.forest.runs){st.forest.runs=1;st.forest.bestGifts=26;st.forest.gifts+=26;addLog('forest','Забег: 26 подарков',260);}
  if(!st.tree.hung){st.tree.ball=await renderBall(AI.sample_girl,0);st.tree.hung=true;st.tree.made=1;addLog('tree','Первая игрушка на общей ёлке',100);}
  save();
  if(st.screen!=='app'){flash('Готово: все испытания отмечены пройденными');go('route');return;}
  ui.demo=false;render();toast('Готово: все испытания отмечены пройденными');
}

/* ===== События ===== */
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const ACT={
  go:d=>go(d.v), enter:()=>{ensureUser();go('route');},
  toast:(d,e,ev)=>{ev.preventDefault();toast(d.m);}, copy:d=>copy(d.t),
  openBook:()=>{const c=$('.tm.cover');if(!c||reduced()){go('prologue');return;}c.classList.add('opening');setTimeout(()=>go('prologue'),720);},
  closeBook:()=>go('cover'),
  proNext:()=>{const s=$('#slides');if(!s)return;const i=Math.round(s.scrollLeft/Math.max(1,s.clientWidth));
    if(i<PRO_N-1)s.scrollTo({left:(i+1)*s.clientWidth,behavior:reduced()?'auto':'smooth'});else if(st.user)go('route');else ACT.startAuth();},
  startAuth:()=>{if(st.user){go('route');return;}st.draft=null;go('nick');},
  toNick:(d,e,ev)=>{ev.preventDefault();saveDraft();go('nick');},
  pickA:d=>{ui.nick.a=+d.i;patchNick(false);}, pickN:d=>{ui.nick.n=+d.i;patchNick(false);},
  rndA:()=>{ui.nick.a=Math.floor(Math.random()*D.ADJ.length);patchNick(true);}, rndN:()=>{ui.nick.n=Math.floor(Math.random()*NOUNS.length);patchNick(true);},
  regen:()=>{ui.nick=rndNick();patchNick(true);},
  mailSend:()=>{const v2=$('#email').value.trim();ui.auth.email=v2;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v2)){ui.auth.err='Похоже, в адресе ошибка — проверьте, пожалуйста';return render();}
    ui.auth.err='';ui.auth.sentTo=v2;saveDraft();render();toast('Код отправлен на '+v2);},
  mailEdit:()=>{ui.auth.sentTo=null;saveDraft();render();const e=$('#email');e&&e.focus();},
  saveNick:()=>{const city=($('#city').value||'').trim();ui.city=city;const n=nickOf(ui.nick);ui.pending={nick:n.nick,g:n.g,city};saveDraft();go('auth');},
  codeNext:()=>{const p=ui.pending;st.user={email:ui.auth.sentTo||'',nick:p.nick,g:p.g,city:p.city,code:ui.auth.code,confirmed:true};st.draft=null;flash(`Добро пожаловать в сказку, ${p.nick}!`);go('route');},
  sheetOpen:d=>{ui.sheet=d.v;render();}, sheetClose:()=>{ui.sheet=null;render();},
  seg:d=>{ui.seg[d.k]=d.v;render();},
  // квиз
  qRound:d=>{ui.quiz=null;ui.quizRound=+d.i;render();},
  qStart:()=>{ui.quiz={r:ui.quizRound||0,i:0,correct:0,answered:false,pick:null};ui.sheet=null;ui.turn=true;render();window.scrollTo(0,0);},
  qPick:d=>{const q=ui.quiz;if(q.answered)return;q.pick=+d.i;q.answered=true;if(q.pick===D.QUIZ[q.r].qs[q.i].a)q.correct++;ui.sheet='explain';render();},
  qNext:()=>{const q=ui.quiz,R=D.QUIZ[q.r];ui.sheet=null;
    if(q.i<R.qs.length-1){q.i++;q.answered=false;q.pick=null;ui.turn=true;render();window.scrollTo(0,0);return;}
    const prev=st.quiz[q.r],old=prev?prev.best:0,n=R.qs.length;q.gain=Math.max(0,q.correct-old)*20;
    if(q.gain>0)addLog('quiz',prev?`Набор ${q.r+1} «${R.title}»: улучшен результат ${old} → ${q.correct} из ${n}`:`Набор ${q.r+1} «${R.title}»: ${q.correct} из ${n} верных`,q.gain);
    st.quiz[q.r]={best:Math.max(old,q.correct),done:true};q.finished=true;ui.turn=true;save();render();window.scrollTo(0,0);},
  goQuiz:d=>go('quiz','?set='+(+d.i+1)),
  qAgain:()=>{ui.quiz=null;ui.quizRound=null;ui.turn=true;render();window.scrollTo(0,0);},
  // лес
  fPlay:()=>{ui.fmode=true;render();},
  fStart:()=>{if(!game)mountForest();const ov=$('#ov');if(ov)ov.classList.add('hidden');game.start();},
  fAgain:()=>{ui.fmode=true;render();},
  fExit:()=>{if(game&&game.state.run){game.finish();return;}ui.fmode=false;render();window.scrollTo(0,0);},
  fLite:(d,e,ev)=>{ev&&ev.preventDefault();ui.fmode=true;render();startLite();},
  // ёлка
  tStyle:d=>{ui.tree.style=+d.i;render();},
  tStep:(d,e,ev)=>{ev&&ev.preventDefault();ui.tree.step=+d.s;ui.turn=true;render();window.scrollTo(0,0);},
  tSample:d=>setTreeSrc(AI[d.k]||A[d.k]),
  tMake:()=>makeBall(),
  treeRot:d=>rotateTree(+d.d), treeMine:()=>{if(ui.treeSide!==0)rotateTree(-1,0);},
  tHang:()=>{const first=!st.tree.hung;if(first)addLog('tree','Первая игрушка на общей ёлке',100);ui.treeSide=0;st.tree.ball=ui.tree.ball;st.tree.hung=true;st.tree.made++;st.tree.style=ui.tree.style||0;save();ui.tree.step=0;ui.turn=true;render();window.scrollTo({top:0,behavior:'smooth'});toast(first?'Игрушка на ёлке! +100 баллов':'Игрушка на ёлке!');},
  tDownload:()=>download(ui.tree.ball,'novogodnyaya-igrushka.png'),
  tDownloadMine:()=>download(st.tree.ball,'novogodnyaya-igrushka.png'),
  cardDl:async()=>{toast('Готовим карточку…');const p=pts();const url=await renderHeroCard(st.user,{words:quizWords(),gifts:st.forest.bestGifts,points:p.total},st.tree.ball);download(url,'kartochka-geroya.png');},
  // сериал
  openCh:d=>go('chapter','?ch='+(+d.i+1)),
  vote:d=>{const i=ui.chapter;if(st.serial.votes[i]!=null)return;st.serial.votes[i]=+d.k;save();ui.sheet='vote';render();toast('Голос учтён');},
  ftCh:d=>{ui.seg.ft=+d.i;render();const s=$('#chsel');if(s)s.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});},
  pdf:()=>{const w=window.open('','_blank');if(!w){toast('Разрешите всплывающие окна, чтобы скачать PDF');return;}
    w.document.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Большая книга сказок — ПСБ</title><style>body{font:16px/1.7 Georgia,serif;max-width:680px;margin:40px auto;padding:0 24px;color:#222}h1{text-align:center;font-size:30px}p.sub{text-align:center;color:#777}</style></head><body><h1>Большая книга сказок</h1><p class="sub">Эту сказку написали ${num(D.SERIAL_AUTHORS)} сотрудников ПСБ</p>${fullTaleHTML(true)}<script>setTimeout(()=>print(),300)<\/script></body></html>`);w.document.close();},
  // избушка
  play:d=>{const i=+d.i;if(ui.izba.cur===i){ui.izba.playing=!ui.izba.playing;}else{ui.izba={cur:i,playing:true,pos:0};}render();},
  pp:()=>{ui.izba.playing=!ui.izba.playing;render();},
  chestGo:()=>chestGo(),
  // панель прототипа
  demo:()=>{ui.demo=!ui.demo;renderDemo();},
  setDay:d=>setDay(+d.d),
  fillAll:()=>fillAll(),
  resetAll:()=>{if(!confirm('Сбросить прогресс прототипа и начать с обложки?'))return;const day=st.day;st=fresh(day);go('cover');},
  jump:d=>{const k=d.k;
    if(k==='nick')st.draft=null;
    else if(k==='auth'){if(st.draft)st.draft.auth=null;}
    else if(k!=='prologue')ensureUser();
    go(k==='prologue'?'cover':k);}
};
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a&&!a.dataset.act&&!a.target&&e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&/^[\w-]+\.html(\?|$)/.test(a.getAttribute('href'))){save();SS.set('turn',1);}});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t||t.disabled)return;const fn=ACT[t.dataset.act];if(fn){if(t.tagName==='A')e.preventDefault();fn(t.dataset,t,e);}});
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.id==='email')ACT.mailSend();
  if(e.key==='Escape'){if(ui.sheet){ui.sheet=null;render();}else if($('#gm .sheet'))ACT.fAgain();}
});
document.addEventListener('change',e=>{
  if(e.target.id==='file'){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>setTreeSrc(r.result);r.readAsDataURL(f);}
});
document.addEventListener('input',e=>{if(e.target.id==='city'){ui.city=e.target.value;saveDraft();const c=$('#nkCity');if(c)c.textContent=e.target.value.trim();}});
document.addEventListener('dragover',e=>{const d=e.target.closest('#drop');if(d){e.preventDefault();d.classList.add('over');}});
document.addEventListener('dragleave',e=>{const d=e.target.closest('#drop');if(d)d.classList.remove('over');});
document.addEventListener('drop',e=>{const d=e.target.closest('#drop');if(!d)return;e.preventDefault();const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/')){const r=new FileReader();r.onload=()=>setTreeSrc(r.result);r.readAsDataURL(f);}});
let swX=null;
document.addEventListener('pointerdown',e=>{if(e.target.closest('#treebox'))swX=e.clientX;});
document.addEventListener('pointerup',e=>{if(swX==null)return;const dx=e.clientX-swX;swX=null;if(Math.abs(dx)>40&&$('#treebox'))rotateTree(dx<0?1:-1);});
let tipEl=null;
document.addEventListener('mouseover',e=>{const g=e.target.closest('[data-tip]');if(!g){if(tipEl){tipEl.remove();tipEl=null;}return;}if(!tipEl){tipEl=document.createElement('div');tipEl.className='tip';document.body.appendChild(tipEl);}tipEl.textContent=g.dataset.tip;});
document.addEventListener('mousemove',e=>{if(tipEl){tipEl.style.left=(e.clientX+14)+'px';tipEl.style.top=(e.clientY+14)+'px';}});
document.addEventListener('pointerdown',e=>{const g=e.target.closest('.treesvg [data-tip]');if(g&&e.pointerType!=='mouse')toast(g.dataset.tip);});

/* ===== Старт страницы ===== */
function applyPage(){
  if(PAGE==='cover'||PAGE==='prologue'){st.screen='prologue';ui.bookOpen=PAGE==='prologue';}
  else if(PAGE==='nick'||PAGE==='auth'){st.screen=PAGE;}
  else {st.screen='app';st.view=PAGE;}
}
(function boot(){
  applyPage();
  if(PAGE==='quiz'){const n=+QS.get('set');if(n>=1&&n<=D.QUIZ.length&&st.day>=D.QUIZ[n-1].open)ui.quizRound=n-1;}
  if(PAGE==='chapter'){const n=+QS.get('ch');if(n>=1&&n<=D.CHAPTERS.length)ui.chapter=n-1;else{let i=0;D.CHAPTERS.forEach((c,j)=>{if(st.day>=c.day)i=j;});ui.chapter=i;}}
  if(PAGE==='profile'){const t=QS.get('tab');if(['points','history','earn'].includes(t))ui.seg.pf=t;}
  if(SS.get('turn')){SS.del('turn');ui.turn=true;}
  render();
  if(PAGE==='nick'||PAGE==='auth')saveDraft();
  const m=SS.get('toast');if(m){SS.del('toast');setTimeout(()=>toast(m),350);}
})();
// Вернулись кнопкой «Назад» из кэша браузера — перечитываем состояние, оно могло измениться на другой странице
window.addEventListener('pageshow',e=>{if(!e.persisted)return;try{st=Object.assign(fresh(),JSON.parse(localStorage.getItem(KEY)||'null')||{});}catch(err){}applyPage();ui.fmode=false;render();});
