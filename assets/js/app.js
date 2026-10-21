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
// Платформа работает с 1 декабря по 17 января (день 47). После — архив: итоги, книга сказок, аудиосказки
const LAST_DAY=47, NY_DAY=31;
const ARCH=()=>st.day>LAST_DAY, ARCH_PAGES=['route','fulltale','izba'];
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
  chev:'<path d="M6 9l6 6 6-6"/>',
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
// Логотип ПСБ для тёмного фона — из брендбука банка (Лого_RGB → Без дескриптора → dark theme). Не перекрашивать
const LOGO='<svg class="psb-logo" xmlns="http://www.w3.org/2000/svg" viewBox="719.99 477.87 479.43 125" role="img" aria-label="ПСБ"><path fill="#ff6200" d="M803.15,477.87l-41.49,41.78h41.49v83.22l41.84-41.43v-83.57h-41.84Z"/><path fill="#8d87ff" d="M761.83,602.87l41.49-41.78h-41.49v-83.22l-41.84,41.43v83.57h41.84Z"/><path fill="#fff" d="M1160.4,573.06h-24.01v-24.69h24.01c9.14,0,13.39,3.92,13.39,12.26s-4.24,12.42-13.39,12.42ZM1110.43,483.31v114.44h51.27c24.33,0,37.72-13.41,37.72-37.11s-13.39-36.95-37.72-36.95h-25.31v-15.2h55.69v-25.18h-81.65ZM1019.31,540.37c0-20.11,11.1-33.84,26.94-33.84,11.92,0,21.23,7.68,23.35,20.27h27.11c-2.78-27.47-23.35-45.77-50.46-45.77-31.68,0-54.05,24.85-54.05,59.34s22.37,59.34,54.05,59.34c27.44,0,48.17-18.96,50.62-46.76h-27.27c-1.63,13.24-11.11,21.25-23.35,21.25-15.84,0-26.94-13.73-26.94-33.84ZM887.37,483.31v114.44h26.62v-88.77h38.21v88.77h26.45v-114.44h-91.28Z"/></svg>';
const PSB=`<span class="psb">${LOGO}</span><i class="vr" aria-hidden="true"></i>`;
const ICON_HEART='<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z" fill="#e8473f"/></svg>';

/* ===== Состояние ===== */
const KEY='psb-ny-proto-v6';
function fresh(day){return {screen:'prologue',view:'route',day:day==null?14:day,user:null,
  quiz:{},forest:{best:0,bestGifts:0,gifts:0,runs:0},tree:{style:0,ball:null,hung:false,made:0,rev:null},
  serial:{votes:{}},chest:{win:false,seen:false},final:{code:null,seen:false},log:[]};}
let st;try{st=Object.assign(fresh(),JSON.parse(localStorage.getItem(KEY)||'null')||{});}catch(e){st=fresh();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){try{const c=Object.assign({},st,{tree:Object.assign({},st.tree,{ball:null})});localStorage.setItem(KEY,JSON.stringify(c));}catch(e2){}}}
const AUTH0=()=>({code:null,email:'',err:'',sentTo:null});
// Имитация сервера: участники по персональному коду. На платформе это база на бэкенде (README, раздел 11)
const REGKEY='psb-ny-proto-codes';
const REG={all(){try{return JSON.parse(localStorage.getItem(REGKEY)||'{}')||{};}catch(e){return {};}},
  get(c){return this.all()[c]||null;},
  put(s){if(!s||!s.user)return;const a=this.all();a[s.user.code]=s;try{localStorage.setItem(REGKEY,JSON.stringify(a));}catch(e){try{a[s.user.code]=Object.assign({},s,{tree:Object.assign({},s.tree,{ball:null})});localStorage.setItem(REGKEY,JSON.stringify(a));}catch(e2){}}}};
function snapshot(){const {user,quiz,forest,tree,serial,chest,final,log,qrun,qpart}=st;return JSON.parse(JSON.stringify({user,quiz,forest,tree,serial,chest,final,log,qrun:qrun||null,qpart:qpart||{}}));}
// Код можно ввести в любом регистре, без дефисов и без «PSB»; кириллические двойники латинских букв
// (набрали в русской раскладке) заменяем на латиницу
const CYR={'А':'A','В':'B','Е':'E','К':'K','М':'M','Н':'H','О':'O','Р':'P','С':'C','Т':'T','Х':'X','У':'Y'};
function normCode(v){let x=String(v||'').toUpperCase().replace(/[АВЕКМНОРСТХУ]/g,c=>CYR[c]).replace(/[^A-Z0-9]/g,'');
  if(x.length===8)x='PSB'+x;
  return x.length===11&&x.startsWith('PSB')?`PSB-${x.slice(3,7)}-${x.slice(7)}`:x;}
const ui={auth:AUTH0(),nick:null,pending:null,city:'',treeSide:0,quiz:null,quizRound:null,bookOpen:false,turn:false,
  tree:{step:0,src:null,style:0,ball:null},chapter:null,izba:{cur:null,playing:false,pos:0},svOk:false,pubOk:false,demo:false,
  sheet:null,seg:{rt:'top',pf:'points',ft:0},fmode:false,pro:0,bar:null,login:{code:'',err:''},logout:false,pmail:false,pmailVal:''};
/* ===== Страницы ===== */
// Каждый экран — отдельная HTML-страница. Общее состояние живёт в localStorage, переходы — обычные ссылки.
const PAGE=document.body.dataset.page||'cover';
const PAGES={cover:'index.html',prologue:'prologue.html',nick:'hero.html',auth:'code.html',login:'login.html',route:'route.html',quiz:'quiz.html',forest:'forest.html',tree:'tree.html',final:'final.html',chest:'chest.html',serial:'serial.html',chapter:'chapter.html',fulltale:'tale.html',izba:'izba.html',rating:'rating.html',profile:'profile.html'};
const QS=new URLSearchParams(location.search);
// Режим вёрстки: телефон (основной) или компьютер — от 900 px
const MQ=window.matchMedia('(min-width:900px)');
let DESK=MQ.matches;
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
// Квиз: в таблицу идёт результат первой попытки, повторные прохождения — без баллов
function qFirst(r){return r?(r.first!=null?r.first:(r.best||0)):0;}
// Незаконченная первая попытка не сбрасывается, если уйти в другой набор: данные ответы засчитаны, набор продолжится с того же места
function stashRun(){const q=st.qrun;if(q&&!q.replay)(st.qpart=st.qpart||{})[q.r]=Object.assign({},q);st.qrun=null;}
function qPend(i){return st.qrun&&st.qrun.r===i?st.qrun:(st.qpart&&st.qpart[i])||null;}
function anyPend(){return st.qrun||(st.qpart&&Object.values(st.qpart)[0])||null;}
function pts(){const q=Object.values(st.quiz).reduce((s,r)=>s+qFirst(r)*20,0);const f=(st.forest.bestGifts||0)*10;const t=st.tree.hung?100:0;return {q,f,t,total:q+f+t};}
// Разделы открываются в 00:00 мск указанного дня (день 0 — 1 декабря). chest — розыгрыш «Сундука чудес», 25 декабря
const OPEN={quiz:0,forest:7,tree:14,final:21,chest:24};
const done={quiz:()=>Object.values(st.quiz).some(r=>r.done),forest:()=>st.forest.runs>0,tree:()=>st.tree.hung||!!st.tree.rev};
function allDone(){return done.quiz()&&done.forest()&&done.tree();}
/* Подпись в турнирной таблице: имя героя и город в родительном падеже — «Снежный Лось из Барнаула».
   Города из подсказок и названия, которые не склоняются по общим правилам, — словарём; остальные — по правилам */
const CITY_GEN={'москва':'Москвы','санкт-петербург':'Санкт-Петербурга','петербург':'Петербурга','новосибирск':'Новосибирска','екатеринбург':'Екатеринбурга',
  'казань':'Казани','нижний новгород':'Нижнего Новгорода','челябинск':'Челябинска','красноярск':'Красноярска','самара':'Самары','уфа':'Уфы',
  'ростов-на-дону':'Ростова-на-Дону','омск':'Омска','краснодар':'Краснодара','воронеж':'Воронежа','пермь':'Перми','волгоград':'Волгограда',
  'саратов':'Саратова','тюмень':'Тюмени','иркутск':'Иркутска','хабаровск':'Хабаровска','владивосток':'Владивостока','ярославль':'Ярославля',
  'калининград':'Калининграда','якутск':'Якутска','мурманск':'Мурманска','петропавловск-камчатский':'Петропавловска-Камчатского','тула':'Тулы',
  'сочи':'Сочи','барнаул':'Барнаула','томск':'Томска',
  'набережные челны':'Набережных Челнов','чебоксары':'Чебоксар','химки':'Химок','мытищи':'Мытищ','люберцы':'Люберец','великие луки':'Великих Лук',
  'минеральные воды':'Минеральных Вод','тольятти':'Тольятти','улан-удэ':'Улан-Удэ','орел':'Орла','елец':'Ельца','тверь':'Твери','анадырь':'Анадыря',
  'кемерово':'Кемерова','иваново':'Иванова','гусь-хрустальный':'Гуся-Хрустального','пятигорск':'Пятигорска'};
function genWord(w,adjNext){
  const l=w.toLowerCase(), cut=(n,add)=>w.slice(0,w.length-n)+add;
  if(/[гкх]ий$|(ск|цк)ий$|ый$/.test(l))return cut(2,'ого');   // Камчатский, Великий, Новый
  if(/ий$/.test(l))return cut(2,'его');                       // Нижний
  if(/ая$/.test(l))return cut(2,'ой');                        // Старая (Русса)
  if(/яя$/.test(l))return cut(2,'ей');                        // Верхняя (Пышма)
  if(/ое$/.test(l))return cut(2,'ого');                       // Красное (Село)
  if(/ые$/.test(l))return cut(2,'ых');                        // Набережные
  if(/ие$/.test(l))return cut(2,'их');                        // Великие
  if(/ой$/.test(l))return adjNext||/(н|ск|цк|в|т|д|р)ой$/.test(l)?cut(2,'ого'):cut(1,'я'); // Лесной → Лесного, Уренгой → Уренгоя
  if(/(ов|ев|ин|ын)о$/.test(l))return cut(1,'а');             // Иваново → Иванова
  if(/[еёиоуыэю]$/.test(l))return w;                          // Сочи, Улан-Удэ — не склоняются
  if(/[гкхжшчщ]а$|я$/.test(l))return cut(1,'и');              // Калуга → Калуги, Евпатория → Евпатории
  if(/а$/.test(l))return cut(1,'ы');                          // Москва → Москвы
  if(/сталь$/.test(l))return cut(1,'и');                      // Электросталь → Электростали
  if(/(ль|ырь)$/.test(l))return cut(1,'я');                   // Ставрополь, Суздаль, Анадырь → -я
  if(/ец$/.test(l))return cut(2,'ца');                        // Череповец → Череповца
  if(/ь$/.test(l))return cut(1,'и');                          // Тюмень → Тюмени
  if(/й$/.test(l))return cut(1,'я');
  if(/[бвгджзклмнпрстфхцчшщ]$/.test(l))return w+'а';          // Барнаул → Барнаула
  return w;
}
const CITY_DIR=new Map(D.CITIES.map(([n,g])=>[n.toLowerCase().replace(/ё/g,'е'),g]));
function cityGen(raw){
  let c=String(raw||'').trim().replace(/^(г\.\s*|город\s+)/i,'').split(/[,(]/)[0].trim().replace(/\s+/g,' ');
  if(!c)return '';
  const key=c.toLowerCase().replace(/ё/g,'е');
  if(CITY_DIR.has(key))return CITY_DIR.get(key);
  if(CITY_GEN[key])return CITY_GEN[key];
  if(!/^[А-Яа-яЁё][А-Яа-яЁё\s-]*$/.test(c))return c;
  c=c.replace(/(^|[\s-])([а-яё])/g,(m,p,ch)=>p+ch.toUpperCase()).replace(/-(На|Над|Под)-/g,(m,p)=>'-'+p.toLowerCase()+'-');
  const na=c.match(/^(.+?)(-(?:на|над|под)-.+)$/);if(na)return genWord(na[1])+na[2];   // Ростов-на-Дону
  return c.split(' ').map((w,i,a)=>{
    if(!w.includes('-'))return genWord(w,i<a.length-1);
    const ps=w.split('-'),last=ps.length-1;
    // Каменск-Уральский — склоняются обе части; Южно-Сахалинск, Йошкар-Ола — последняя
    return ps.map((x,k)=>k===last||(k===0&&/(ий|ый|ой)$/i.test(ps[last]))?genWord(x):x).join('-');}).join(' ');
}
// Город из справочника показывается в таблице сразу, свой вариант — после проверки модератором
function cityKey(raw){return String(raw||'').trim().replace(/^(г\.\s*|город\s+)/i,'').split(/[,(]/)[0].trim().replace(/\s+/g,' ').toLowerCase().replace(/ё/g,'е');}
function cityNote(raw){const k=cityKey(raw);return k&&!CITY_DIR.has(k)?'Такого города нет в справочнике — в таблице он появится после проверки модератором':'Выберите из списка или впишите свой. Город добавится к имени в турнирной таблице';}
function tname(nick,city){const g=cityGen(city);return esc(nick)+(g?` <span class="from">из\u00a0${esc(g)}</span>`:'');}
function addLog(k,t,p){(st.log=st.log||[]).push({d:st.day,k,t,p});}
function nyLeft(){const d=NY_DAY-st.day;return d>0?`до Нового года ${d} ${plural(d,'день','дня','дней')}`:'С Новым годом!';}
function bankTotal(){const k=st.day-6;return (k>0?Math.round(k*9137+k*k*210):0)+(st.forest.gifts||0);}
function participants(){return Math.min(16800,Math.round(2100+st.day*520));}
function citiesCount(){return Math.min(74,31+st.day*2);}
function treeCount(){return st.day<OPEN.tree?(st.tree.hung?1:0):Math.round(1200+(st.day-OPEN.tree)*610)+(st.tree.hung?1:0);}
function quizWords(){return Object.values(st.quiz).reduce((s,r)=>s+(r.best||0),0);}
const NOUNS=D.NOUNS.map(([w,g,gr])=>({w,g,gr}));
const FAKES=(()=>{const r=rng(2026);const out=[];const used=new Set();while(out.length<48){const N=NOUNS[Math.floor(r()*NOUNS.length)];const nick=D.ADJ[Math.floor(r()*D.ADJ.length)][N.g]+' '+N.w;if(used.has(nick))continue;used.add(nick);out.push({nick,city:r()<.28?'Москва':D.CITIES[Math.floor(r()*60)][0],w:.3+r()*.7});}return out;})();
function board(){
  const prog=Math.min(1,(st.day+1)/24);
  const list=FAKES.map(f=>({nick:f.nick,city:f.city,p:Math.round(f.w*prog*82)*10}));
  if(st.user)list.push({nick:st.user.nick,city:st.user.city||'',p:pts().total,me:true});
  list.sort((a,b)=>b.p-a.p||(a.me?-1:0));
  list.forEach((x,i)=>x.place=i+1);
  return list;
}
function nickOf(n){const N=NOUNS[n.n];return {nick:D.ADJ[n.a][N.g]+' '+N.w,g:N.g};}
// Имена не повторяются: на платформе это проверяет сервер (уникальное сочетание «первое слово + второе»).
// В прототипе занятые — имена соперников из таблицы и примерно треть сочетаний
const TAKEN=new Set(FAKES.map(f=>f.nick));
function nameTaken(a,n){const N=NOUNS[n];return TAKEN.has(D.ADJ[a][N.g]+' '+N.w)||((a*7919+n*104729)%100)<30;}
function rndNick(){for(let t=0;t<500;t++){const x={a:Math.floor(Math.random()*D.ADJ.length),n:Math.floor(Math.random()*NOUNS.length)};if(!nameTaken(x.a,x.n))return x;}return {a:0,n:0};}
// Свободные похожие: то же второе слово с другим первым или наоборот
function nameAlts(a,n,k){const out=[],seen=new Set();for(let t=0;t<600&&out.length<(k||3);t++){const x=t%2?{a:Math.floor(Math.random()*D.ADJ.length),n}:{a,n:Math.floor(Math.random()*NOUNS.length)};const key=x.a+'.'+x.n;if(seen.has(key)||nameTaken(x.a,x.n))continue;seen.add(key);out.push(x);}return out;}
function ava(nick,size,me){return `<span class="ava${me?' me':''}" style="--s:${size}px"><b>${esc(initials(nick))}</b></span>`;}
function genCode(prefix){const a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='';for(let i=0;i<8;i++){s+=a[Math.floor(Math.random()*a.length)];if(i===3)s+='-';}return prefix+'-'+s;}
function v(m,f){return st.user&&st.user.g?f:m;}
function ensureUser(){if(!st.user){st.user={email:'',nick:'Серый Волк',g:0,city:'Москва',code:genCode('PSB'),confirmed:true};save();}}

/* ===== Вёрстка: телефон и компьютер =====
   Основная вёрстка — мобильная: экран-страница в компактной рамке, нижнее меню, кнопки действий у нижнего края.
   От 900 px — десктоп: развороты книги в полной рамке-тереме, меню в шапке, «Что дальше» на правой странице.
   Каждый экран описывается один раз: L — левая страница, R — правая (на телефоне идут подряд), acts — кнопки «что дальше». */

// Рамка-терем целиком (арка, башенки, кронштейны, снежные углы): обложка и все развороты на десктопе
function frame(inner,mod){
  return `<div class="tm ${mod||''}">
  <div class="tm-top" aria-hidden="true"><i class="mold"></i><i class="twl"></i><i class="arch"></i><i class="twr"></i></div>
  <div class="tm-body"><i class="brl" aria-hidden="true"></i><i class="brr" aria-hidden="true"></i>${inner}</div>
  <div class="tm-bot" aria-hidden="true"><i class="mold"></i><i class="gem"></i></div>
  <i class="snl" aria-hidden="true"></i><i class="snr" aria-hidden="true"></i></div>`;
}
// Телефон: страница в компактной рамке — карниз с солнцем-луной, золотые столбы, карниз с самоцветом
function page(inner,o={}){
  return `<section class="pf ${o.cls||''}"><div class="pf-top" aria-hidden="true"><i class="m"></i>${o.sun===false?'':'<i class="sun"></i>'}</div>
    <div class="pf-in">${inner}</div><div class="pf-bot" aria-hidden="true"><i class="m"></i><i class="gem"></i></div></section>`;
}
// Десктоп: разворот из двух страниц с корешком; full — блок на весь разворот под страницами (игровое поле)
function book(L,R,o={}){
  const pn=o.pn, n=k=>pn?`<div class="pnum">${k}</div>`:'';
  const hasFull=o.full!=null;
  return frame(`<div class="spread two ${o.cls||''}">
    <section class="pg pl">${L}${hasFull?'':n(pn)}</section>
    <section class="pg pr">${R}${hasFull?'':n(pn+1)}</section>
    ${hasFull?`<div class="pg-full">${o.full}</div>${pn?`<div class="pnums">${n(pn)}${n(pn+1)}</div>`:''}`:''}
  </div>`);
}
// Десктоп: одиночная страница — закрытые разделы, чек-лист финала
function leaf(C,o={}){return frame(`<div class="spread one ${o.cls||''}"><section class="pg">${C}</section></div>`,'narrow');}
// Сборка экрана под текущий режим
function compose(v){
  if(typeof v==='string')return v;
  if(v.raw!=null)return v.raw;
  const pre=v.pre||'',post=v.post||'';
  if(!DESK){
    const M=v.M!=null?v.M:v.one!=null?v.one:(v.L||'')+(v.R||'');
    return pre+page(M,{cls:v.cls,sun:v.sun})+actbar(v.acts||[],v.note)+(v.sheet||'')+post;
  }
  const acts=((v.dacts!==undefined?v.dacts:v.acts)||[]).filter(Boolean);
  const nbH=acts.length?nextBar(acts,v.dnote!==undefined?v.dnote:v.note,v.nbt):'';
  if(v.L==null&&v.one!=null)return pre+leaf(v.one+nbH,{cls:v.cls})+post;
  return pre+book(v.L||'',(v.R||'')+nbH,{pn:v.pn,cls:v.cls,full:v.full})+post;
}

// Неразрывные связки: тире и «·» не начинают строку, короткие слова и цифры не висят в конце строки
function nb(t){const w=String(t).split(' ');return w.map((x,i)=>i<w.length-1?x+(/^[А-Яа-яЁё\d]{1,2}$/.test(x)||/^[—–·]$/.test(w[i+1])?' ':' '):x).join('');}
// Заголовок: золотое тиснение, звёзды «приклеены» к первому и последнему слову
function pt(t,sub,tag){
  tag=tag||'h2';
  const w=nb(t).split(' '),star='<i class="st" aria-hidden="true"></i>';
  const inner=w.length===1?`<span class="nw">${star}${esc(w[0])}${star}</span>`
    :`<span class="nw">${star}${esc(w[0])}</span> ${w.slice(1,-1).map(esc).join(' ')}${w.length>2?' ':''}<span class="nw">${esc(w[w.length-1])}${star}</span>`;
  return `<header class="pt"><${tag} class="ttl"><span class="g">${inner}</span></${tag}><div class="rule"></div>${sub?`<div class="sub">${nb(sub)}</div>`:''}</header>`;
}
// Заголовок только на десктопе (на телефоне раздел назван в верхней панели)
function dpt(t,sub,tag){return DESK?pt(t,sub,tag):'';}
function lbl(t,cls){return `<div class="lbl ${cls||''}"><span>${t}</span></div>`;}
function say(img,who,text,cls){return `<div class="say ${cls||''}"><span class="face"><img src="${A[img]}" alt=""></span><div class="bubble"><b>${who}:</b> ${text}</div></div>`;}
function por(k,size){return `<span class="por ${size||''}"><img src="${A[k]}" alt=""></span>`;}
// Абзац сказки; cap — первый абзац страницы: в начале значок-снежинка в плашке.
// Буквиц нет: текст остаётся целым, и вёрстка не зависит от первой буквы
const ICON_FLAKE='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7"/><path d="M9.5 3.5 12 6l2.5-2.5M9.5 20.5 12 18l2.5 2.5M3.6 10.8l3.4-.9-.9-3.4M20.4 13.2l-3.4.9.9 3.4M3.6 13.2l3.4.9-.9 3.4M20.4 10.8l-3.4-.9.9-3.4"/></svg>';
function tale(text,cap){
  const s=String(text);
  return cap?`<p class="tale lead"><i class="orn" aria-hidden="true">${ICON_FLAKE}</i>${esc(s)}</p>`:`<p class="tale">${esc(s)}</p>`;
}
function flowers(){return '<i class="fl tl"></i><i class="fl tr"></i><i class="fl bl"></i><i class="fl br"></i>';}

/* ===== Навигация ===== */
// Телефон: верхняя панель — на главных разделах солнце и раздел, на вложенных — «назад»
function bar(title,sub,back){ui.bar={title,sub,back};}
function appbar(o){
  const left=o.back?`<a class="ab-back" href="${href(o.back)}" aria-label="Назад">${svg('back')}</a>`:`<a class="ab-sun" href="${href('route')}" aria-label="Маршрут"><i class="sm"></i></a>`;
  const right=st.user&&st.screen==='app'&&!ARCH()?`<span class="chip pts" title="Баллы в турнирной таблице">${ICON_STAR} <b>${num(pts().total)}</b></span>`:'';
  return `<header class="abar">${left}<div class="ab-t"><b>${o.title}</b>${o.sub?`<small>${o.sub}</small>`:''}</div>${right}</header>`;
}
const TABS=[['route','Маршрут','route','Маршрут'],['serial','Сказка-сериал','book','Сериал'],['izba','Пряничная избушка','house','Избушка'],['rating','Турнирная таблица','trophy','Рейтинг'],['profile','Личный кабинет','user','Кабинет']];
const ROOTS=['route','serial','izba','rating','profile'];
// После 17 января: итоги, книга сказок и избушка — открыты всем, без героя и кода
const TABS_A=[['route','Итоги сказки','flake','Итоги'],['fulltale','Большая книга сказок','book','Книга'],['izba','Пряничная избушка','house','Избушка']];
function tabs(){return ARCH()?TABS_A:TABS;}
function tabOf(v){if(ARCH())return ARCH_PAGES.includes(v)?v:'route';if(['serial','chapter','fulltale'].includes(v))return 'serial';if(['izba','rating','profile'].includes(v))return v;return 'route';}
// Телефон: нижнее меню на пяти главных разделах
function tabbar(){const a=tabOf(st.view);return `<nav class="tabbar${ARCH()?' t3':''}">${tabs().map(t=>`<a class="${a===t[0]?'on':''}" href="${href(t[0])}"${a===t[0]?' aria-current="page"':''}>${svg(t[2])}<span>${t[3]}</span></a>`).join('')}</nav>`;}
// Десктоп: шапка с меню, датой, баллами и кабинетом
function header(){
  const u=st.user, a=tabOf(st.view);
  return `<header class="top"><div class="bar">
    ${PSB}<a class="brand" href="${href('route')}"><i class="sm"></i><span class="bt"><b>Новогодняя ночь</b><small>длиной в страну</small></span></a>
    <nav class="nav">${tabs().map(t=>`<a class="${a===t[0]?'on':''}" href="${href(t[0])}" title="${t[1]}"${a===t[0]?' aria-current="page"':''}>${t[3]}</a>`).join('')}</nav>
    <div class="spacer"></div>
    ${ARCH()?'<span class="chip date">Сказка завершилась 17 января</span>':`<span class="chip date hide-l">${fmt(st.day,true)} · ${nyLeft()}</span>
    <span class="chip pts" title="Баллы в турнирной таблице">${ICON_STAR} <b>${num(pts().total)}</b></span>
    <a class="avabtn" href="${href('profile')}" title="Личный кабинет"><span class="nm">${esc(u.nick)}</span>${ava(u.nick,38,true)}</a>`}
  </div></header>`;
}
// Десктоп: ссылка «назад» над разворотом
const CRUMB={route:'Маршрут',serial:'Сказка-сериал',prologue:'Пролог',nick:'Имя героя',cover:'Обложка'};
function crumb(to){return `<a class="crumb" href="${href(to)}">${svg('back')}<span>${CRUMB[to]||'Назад'}</span></a>`;}
// Кнопка: {t, act|href, v, i, s, k, gold, disabled, noarrow, cls}
function btn(b){
  const cls=`btn ${b.gold?'btn-gold':'btn-ghost'} ${b.cls||''}`;
  if(b.href)return `<a class="${cls}" href="${b.href}">${b.t}${b.gold&&!b.noarrow?' '+svg('arrow','width="18" height="18"'):''}</a>`;
  const data=['v','i','s','k'].map(k=>b[k]!=null?` data-${k}="${b[k]}"`:'').join('');
  return `<button class="${cls}" data-act="${b.act}"${data}${b.disabled?' disabled':''}>${b.t}${b.gold&&!b.noarrow?' '+svg('arrow','width="18" height="18"'):''}</button>`;
}
// Телефон: кнопки действий закреплены у нижнего края экрана
function actbar(items,note){items=items.filter(Boolean);if(!items.length)return '';return `<div class="actbar">${note?`<p class="ab-note">${note}</p>`:''}<div class="ab-row">${items.map(btn).join('')}</div></div>`;}
// Десктоп: блок «Что дальше» в конце правой страницы
function nextBar(items,note,title){items=items.filter(Boolean);return `<div class="nextbar">${title===false?'':lbl(title||'Что дальше')}<div class="nb">${items.map(btn).join('')}</div>${note?`<p class="note">${note}</p>`:''}</div>`;}
// Телефон: шторка снизу
function sheet(inner,o={}){return `<div class="sheet-bg" data-act="${o.close||'sheetClose'}"></div><div class="sheet ${o.cls||''}" role="dialog" aria-modal="true"><i class="grab" aria-hidden="true"></i><button class="sheet-x" data-act="${o.close||'sheetClose'}" aria-label="Закрыть">×</button>${inner}</div>`;}
// Компьютер: модальное окно по центру — то же содержимое, что в шторке на телефоне
function modal(inner,o={}){return `<div class="modal-bg" data-act="${o.close||'sheetClose'}"></div><div class="modal ${o.cls||''}" role="dialog" aria-modal="true"><button class="sheet-x" data-act="${o.close||'sheetClose'}" aria-label="Закрыть">×</button>${inner}</div>`;}
// Телефон: вкладки внутри экрана
function seg(key,items,cur){return `<div class="seg" role="tablist">${items.map(([v,t])=>`<button role="tab" class="${cur===v?'on':''}" aria-selected="${cur===v}" data-act="seg" data-k="${key}" data-v="${v}">${t}</button>`).join('')}</div>`;}
function lockChip(day){return `<span class="chip lock">${svg('lock','width="12" height="12"')} ${DESK?'Откроется '+fmt(day):fmt(day,true)}</span>`;}
// Последняя неделя работы платформы — напоминание на главных разделах
function endBanner(){return st.day>LAST_DAY||st.day<LAST_DAY-6?'':`<div class="ribbon">Платформа работает до 17 января — успейте пройти маршрут и послушать сказки</div>`;}
const ROUTE_BTN={t:'На маршрут',act:'go',v:'route'};

/* ===== Обложка и пролог ===== */
const FAMILY=[['m_mikhail','Медведь Михаил','Он и есть Дед Мороз. Ему вы и помогаете'],['m_zhena','Жена','Читает детям сказки народов России'],['m_star','Старший сын','Бежит по лесу и собирает подарки'],['m_mlad','Младший сын','Расспрашивает местных, приносит слова и узоры'],['m_doch','Дочь','Наряжает ёлку шарами из ваших картинок']];
function vCover(){
  return {raw:`<div class="cover-wrap">${frame(`<div class="cv">
    <div class="cv-top">${PSB}<span>для сотрудников банка</span></div>
    <h1 class="cv-title"><span>Новогодняя ночь</span><span>длиной в страну</span></h1>
    <div class="cv-rule"></div>
    <div class="cv-win"><img src="${A.hero}" alt="Сотрудники входят в новогоднюю сказку"></div>
    <p class="cv-sub">Сказка, в которую попадает каждый сотрудник</p>
    <div class="cv-cta"><button class="btn btn-gold btn-lg" data-act="openBook">${svg('book','width="20" height="20"')} Открыть книгу</button>
      ${st.user?`<button class="btn btn-ghost" data-act="enter">Продолжить: ${esc(st.user.nick)}</button>`:`<button class="link" data-act="toLogin">У меня уже есть код</button>`}</div>
  </div>`,'cover')}</div>`};
}
const PRO_N=3;
const PRO_T1='В новогоднюю ночь Дед Мороз идёт через всю страну с востока на запад: одиннадцать Новых годов за одну ночь, ни минуты лишней.';
const PRO_T2='Где-то в тайге мешок рвётся о еловый сук — подарки рассыпаются по всему лесу. Один он не успеет. Нужен помощник, и это вы.';
function famHTML(lead){return `<div class="fam-lead">${por('m_mikhail',lead)}<div><b>Медведь Михаил</b><span>Он и есть Дед Мороз. Ему вы и помогаете</span></div></div>
  <div class="fam">${FAMILY.slice(1).map(f=>`<div class="fm">${por(f[0])}<b>${f[1]}</b><span>${f[2]}</span></div>`).join('')}</div>`;}
function vPrologue(){
  if(!ui.bookOpen)return vCover();
  const b11=`<figure class="b11"><img src="${A.b11}" alt="11"><figcaption>раз наступает Новый год в России за одну ночь</figcaption></figure>`;
  if(DESK){
    // Десктоп: первый разворот книги
    const L=`${pt('Завязка','Одна ночь — одиннадцать полуночей','h1')}${b11}${tale(PRO_T1,true)}${tale(PRO_T2)}<img class="vign" src="${A.bear_lamp}" alt="">`;
    const R=`${pt('Кто встретит вас на пути','Семья Деда Мороза')}${famHTML('xl')}
      <div class="cta"><button class="btn btn-gold btn-lg" data-act="${st.user?'enter':'startAuth'}">${st.user?'Вернуться в сказку':'Стать помощником Деда Мороза'} ${svg('arrow','width="18" height="18"')}</button></div>`;
    return {raw:`<div class="topstrip">${PSB}<a class="brand" href="${href('cover')}" title="К обложке"><i class="sm"></i><span class="bt"><b>Новогодняя ночь</b><small>для сотрудников банка</small></span></a><div class="spacer"></div>
      ${st.user?`<button class="btn btn-ghost btn-sm" data-act="enter">Продолжить: ${esc(st.user.nick)}</button>`:`<button class="btn btn-ghost btn-sm" data-act="toLogin">Войти по коду</button>`}</div>${book(L,R,{pn:1})}`};
  }
  // Телефон: три страницы, листаются свайпом
  const slides=[
    page(`${pt('Завязка','Одна ночь — одиннадцать полуночей','h1')}${b11}${tale(PRO_T1,true)}`),
    page(`${pt('Нужен помощник','Мешок порвался в тайге','h1')}<img class="pro-img" src="${A.bear_lamp}" alt="">${tale(PRO_T2,true)}`),
    page(`${pt('Кто встретит вас','Семья Деда Мороза','h1')}${famHTML('lg')}`)
  ];
  const i=Math.min(ui.pro||0,PRO_N-1);
  return {raw:`<div class="pro">
    <div class="pro-top"><a class="ab-sun" href="${href('cover')}" aria-label="К обложке"><i class="sm"></i></a><span class="pro-t">Новогодняя ночь</span>
      ${st.user?`<button class="link" data-act="enter">Продолжить</button>`:`<button class="link" data-act="startAuth">Пропустить</button>`}</div>
    <div class="slides" id="slides">${slides.map((s,k)=>`<div class="slide" data-k="${k}">${s}</div>`).join('')}</div>
    <div class="dots" id="dots">${slides.map((_,k)=>`<i class="${k===i?'on':''}"></i>`).join('')}</div>
    <div class="actbar"><div class="ab-row"><button class="btn btn-gold btn-lg" id="proBtn" data-act="proNext">${proLabel(i)}</button></div></div>
  </div>`};
}
function proLabel(i){return i<PRO_N-1?'Дальше':(st.user?'Вернуться в сказку':'Стать помощником Деда Мороза');}
function mountPrologue(){
  const s=$('#slides');if(!s)return;
  if(ui.pro)s.scrollLeft=ui.pro*s.clientWidth;
  s.addEventListener('scroll',()=>{const i=Math.round(s.scrollLeft/Math.max(1,s.clientWidth));if(i===ui.pro)return;ui.pro=i;
    $$('#dots i').forEach((d,k)=>d.classList.toggle('on',k===i));const b=$('#proBtn');if(b)b.textContent=proLabel(i);},{passive:true});
}

/* ===== Формирование персонажа: шаг 1 — имя ===== */
function nkRow(nick){return `<span class="pl">—</span>${ava(nick,32,true)}<span class="n">${tname(nick,ui.city)} <span class="tag">вы</span></span><span class="p">0</span>`;}
const NK_AVA=()=>DESK?96:72;
const lc=w=>String(w).toLowerCase().replace(/ё/g,'е');
// Длинное имя («Смекалистый Можжевельник») — на табличке кегль меньше, чтобы слова не вылезали
const nkLong=n=>n.length>=19||n.split(' ').some(w=>w.length>=11);
function pkItem(k,i,w,busy,on){return `<button class="pk-i${on?' on':''}${busy?' busy':''}" data-act="${k==='a'?'pickA':'pickN'}" data-i="${i}" data-w="${lc(w)}"><span>${w}</span>${busy?'<small>занято</small>':''}</button>`;}
// Списки слов по темам; у первого слова форма — по роду второго
function pkItems(k){
  const g=NOUNS[ui.nick.n].g;
  if(k==='a')return D.ADJ_G.map((t,gi)=>`<div class="pk-g">${t}</div>`+D.ADJ.map((x,i)=>x[2]===gi?pkItem('a',i,x[g],nameTaken(i,ui.nick.n),i===ui.nick.a):'').join('')).join('');
  return D.NOUN_G.map((t,gi)=>`<div class="pk-g">${t}</div>`+NOUNS.map((x,j)=>x.gr===gi?pkItem('n',j,x.w,nameTaken(ui.nick.a,j),j===ui.nick.n):'').join('')).join('');
}
function pkBox(k,head){return `<div class="pk-box">${head||''}<input class="input pk-q" type="search" placeholder="Найти слово" autocomplete="off" aria-label="Найти слово"><div class="pk-list" data-k="${k}">${pkItems(k)}</div></div>`;}
function nickStat(){
  if(!nameTaken(ui.nick.a,ui.nick.n))return `<div class="nkstat ok">${svg('check','width="16" height="16"')}<span>Имя свободно — такого больше ни у кого не будет</span></div>`;
  return `<div class="nkstat busy"><span>Такое имя уже есть у другого помощника. Свободные похожие:</span><div class="alts">${nameAlts(ui.nick.a,ui.nick.n).map(x=>`<button class="chip" data-act="pickPair" data-a="${x.a}" data-n="${x.n}">${esc(nickOf(x).nick)}</button>`).join('')}</div></div>`;
}
function vNick(){
  if(!ui.nick||ui.nick.a>=D.ADJ.length||ui.nick.n>=NOUNS.length)ui.nick=rndNick();
  const cur=nickOf(ui.nick);
  bar('Имя героя','Формирование персонажа · шаг 1 из 2','prologue');
  const plate=`<div class="nickplate">${flowers()}<div class="hint">Ваше игровое имя</div><div class="nk${nkLong(cur.nick)?' long':''}" id="nkText">${esc(cur.nick)}</div></div>`;
  const hint=`<p class="note">Аватар — из инициалов: <span id="nkHint">«${esc(cur.nick)}» → «${esc(initials(cur.nick))}»</span>. Имена не повторяются: у каждого помощника — своё.</p>`;
  const stat=`<div id="nkStat">${nickStat()}</div>`;
  const dice=(act,l)=>`<button class="dice" data-act="${act}" aria-label="${l}" title="${l}">${svg('dice')}</button>`;
  const city=`<label class="field"><span>Ваш город — по желанию</span>
      <input class="input" id="city" list="cities" placeholder="Например, Казань" value="${esc(ui.city)}" autocomplete="off">
      <datalist id="cities">${D.CITIES.map(c=>`<option value="${c[0]}">`).join('')}</datalist></label>
    <p class="note left" id="cityNote">${cityNote(ui.city)}</p>`;
  const preview=`${lbl('Так вас увидят в турнирной таблице','s')}<div class="lbmini prev"><div class="r me" id="nkRow">${nkRow(cur.nick)}</div></div>`;
  const regen=`<button class="btn btn-ghost btn-block" data-act="regen">${svg('dice','width="18" height="18"')} Другое имя</button>`;
  const acts=[{t:'Дальше: персональный код',act:'saveNick',gold:1}];
  if(DESK)return {
    L:`${pt('Имя героя','Формирование персонажа · шаг 1 из 2','h1')}
      <div class="nick-hero"><img class="mascot" src="${A.bear_juggler}" alt=""><div class="nick-prev"><span id="nkAva">${ava(cur.nick,NK_AVA(),true)}</span>${plate}</div></div>${hint}${preview}`,
    R:`${pt('Соберите имя','Случайное или из двух слов')}${regen}${stat}
      <div class="pk2">${pkBox('a',`<div class="phd"><span>Первое слово</span>${dice('rndA','Случайное первое слово')}</div>`)}${pkBox('n',`<div class="phd"><span>Второе слово</span>${dice('rndN','Случайное второе слово')}</div>`)}</div>
      ${city}`,
    acts,nbt:false,dnote:'Уже участвуете? <a class="link" href="#" data-act="toLogin">Войти по коду</a>',pn:3,cls:'onb'};
  // Телефон: два поля-выбора; список слов с поиском — в шторке
  const picker=(k,l,w)=>`<button class="picker" data-act="pkOpen" data-k="${k}"><span class="pk-tx"><span class="pk-l">${l}</span><b id="pk${k.toUpperCase()}">${esc(w)}</b></span>${svg('chev','width="18" height="18"')}</button>`;
  const N=NOUNS[ui.nick.n];
  const sh=ui.sheet==='pkA'||ui.sheet==='pkN'?sheet(`<h3 class="pk-t">${ui.sheet==='pkA'?'Первое слово':'Второе слово'}</h3>${pkBox(ui.sheet==='pkA'?'a':'n')}`,{cls:'pksheet'}):'';
  return {M:`<div class="nk-prev"><span id="nkAva">${ava(cur.nick,NK_AVA(),true)}</span>${plate}</div>${hint}${stat}
    ${regen}<div class="pickers">${picker('a','Первое слово',D.ADJ[ui.nick.a][N.g])}${picker('n','Второе слово',N.w)}</div>
    ${city}${preview}<p class="note">Уже участвуете? <a class="link" href="#" data-act="toLogin">Войти по коду</a></p>`,acts,sheet:sh};
}
// Выбор слова без перерисовки экрана: обновляем табличку, превью, статус и списки (прокрутка и поиск сохраняются)
function patchNick(scroll){
  const cur=nickOf(ui.nick), g=cur.g;
  saveDraft();
  const set=(sel,f)=>{const el=$(sel);if(el)f(el);};
  set('#nkRow',el=>el.innerHTML=nkRow(cur.nick));
  set('#nkText',el=>{el.textContent=cur.nick;el.classList.toggle('long',nkLong(cur.nick));});set('#nkAva',el=>el.innerHTML=ava(cur.nick,NK_AVA(),true));set('#nkHint',el=>el.textContent=`«${cur.nick}» → «${initials(cur.nick)}»`);
  set('#nkStat',el=>el.innerHTML=nickStat());
  set('#pkA',el=>el.textContent=D.ADJ[ui.nick.a][g]);set('#pkN',el=>el.textContent=NOUNS[ui.nick.n].w);
  $$('.pk-list[data-k=a] .pk-i').forEach(b=>{const i=+b.dataset.i,w=D.ADJ[i][g],busy=nameTaken(i,ui.nick.n);b.classList.toggle('on',i===ui.nick.a);b.classList.toggle('busy',busy);b.dataset.w=lc(w);b.innerHTML=`<span>${w}</span>${busy?'<small>занято</small>':''}`;});
  $$('.pk-list[data-k=n] .pk-i').forEach(b=>{const j=+b.dataset.i,busy=nameTaken(ui.nick.a,j);b.classList.toggle('on',j===ui.nick.n);b.classList.toggle('busy',busy);b.innerHTML=`<span>${NOUNS[j].w}</span>${busy?'<small>занято</small>':''}`;});
  $$('.pk-q').forEach(filterPk);
  if(scroll)$$('.pk-list').forEach(l=>{const on=l.querySelector('.pk-i.on');if(on)l.scrollTop=on.offsetTop-l.offsetTop-l.clientHeight/2+on.offsetHeight/2;});
}
// Поиск по списку слов: прячем несовпавшие слова и пустые темы
function filterPk(inp){
  const box=inp.closest('.pk-box');if(!box)return;const q=lc(inp.value.trim());let head=null,any=false;
  [...box.querySelector('.pk-list').children].forEach(el=>{
    if(el.classList.contains('pk-g')){if(head)head.classList.toggle('hidden',!any);head=el;any=false;return;}
    const ok=!q||el.dataset.w.includes(q);el.classList.toggle('hidden',!ok);if(ok)any=true;});
  if(head)head.classList.toggle('hidden',!any);
}

/* ===== Формирование персонажа: шаг 2 — персональный код (регистрации нет) ===== */
function vAuth(){
  const a=ui.auth;
  if(!a.code)a.code=genCode('PSB');
  if(!ui.pending){const n=nickOf(ui.nick||rndNick());ui.pending={nick:n.nick,g:n.g,city:''};}
  const sent=a.sentTo;
  bar('Персональный код','Формирование персонажа · шаг 2 из 2','nick');
  const hero=`<div class="code-hero"><img class="mascot" src="${A.bear_archer}" alt="">${tale(`${ui.pending.nick}, это ваш персональный код. Сохраните его: по нему можно войти с другого устройства — например, с рабочего компьютера.`)}</div>`;
  const code=`<div class="codebox"><div class="lbl-s">Персональный код</div><div class="code">${a.code}</div>
      <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${a.code}">${svg('copy','width="15" height="15"')} Скопировать</button></div>`;
  const mail=`<p class="tale small">Введите адрес — и код придёт письмом. Больше почта ни для чего не используется.</p>
    <div class="field">
      ${sent?`<div class="sent">${svg('check','width="16" height="16"')}<span>Отправили код на <b>${esc(sent)}</b></span><button class="link" data-act="mailEdit">Изменить</button></div>`
      :`<div class="row"><input class="input ${a.err?'err':''}" id="email" type="email" inputmode="email" autocomplete="email" placeholder="name@mail.ru" value="${esc(a.email)}"><button class="btn btn-ghost" data-act="mailSend">Отправить</button></div>
        ${a.err?`<div class="err-t">${a.err}</div>`:''}`}
    </div>`;
  const back=`<p class="note"><a class="link" href="#" data-act="toNick">Изменить имя</a></p>`;
  const acts=[{t:'В путь',act:'codeNext',gold:1}];
  // Почту не указали — перед стартом напоминаем сохранить код: он единственный ключ к прогрессу
  const save=ui.sheet==='savecode'?`<div class="savecode"><h3 class="sv-t">Сохраните код</h3>
      <div class="codebox"><div class="code">${a.code}</div><button class="btn btn-ghost btn-sm" data-act="copy" data-t="${a.code}">${svg('copy','width="15" height="15"')} Скопировать</button></div>
      <p class="sv-w"><b>Обязательно сохраните его — это ваш единственный идентификатор.</b> Если вы его забудете, сохранить прогресс не получится: войти с другого устройства или после выхода будет нельзя.</p>
      <p class="note">Скопируйте код, сделайте скриншот или запишите. Надёжнее всего — прислать его себе на почту.</p>
      <label class="chk"><input type="checkbox" id="svOk"${ui.svOk?' checked':''}><span>Да, код точно сохранён</span></label>
      <div class="sv-acts">${btn({t:'В путь',act:'codeGo',gold:1,disabled:!ui.svOk})}${btn({t:'Прислать на почту',act:'toMail',noarrow:1})}</div></div>`:'';
  if(DESK)return {L:`${pt('Персональный код','Формирование персонажа · шаг 2 из 2','h1')}${hero}${code}`,
    R:`${pt('Почта — по желанию','Продублируем код письмом')}${mail}`,acts,nbt:false,
    dnote:'Почта нужна только для писем с кодами · <a class="link" href="#" data-act="toNick">Изменить имя</a>',pn:5,cls:'onb',post:save?modal(save):''};
  return {M:`${hero}${code}${lbl('Почта — по желанию','s')}${mail}${back}`,acts,sheet:save?sheet(save):''};
}

/* ===== Вход по коду — для тех, кто уже создал героя: другое устройство или после выхода ===== */
function vLogin(){
  bar('Вход по коду','Для тех, кто уже в сказке','cover');
  const L=ui.login;
  const form=`<div class="code-hero"><img class="mascot" src="${A.bear_archer}" alt="">${tale('Введите персональный код — его выдали, когда вы создавали героя. Если указывали почту, код есть в письме.')}</div>
    <label class="field"><span>Персональный код</span>
      <input class="input code-in ${L.err?'err':''}" id="logincode" placeholder="PSB-XXXX-XXXX" value="${esc(L.code)}" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" maxlength="20"></label>
    ${L.err?`<div class="err-t">${L.err}</div>`:''}
    <p class="note left">Регистр не важен, дефисы можно не ставить</p>`;
  // «Нет кода?» — к созданию героя; уже выбранное имя (черновик) сохраняется
  const alt='Нет кода? <a class="link" href="#" data-act="toNick">Стать помощником Деда Мороза</a>';
  const acts=[{t:'Войти',act:'login',gold:1}];
  if(DESK)return {one:`${pt('Вход по коду','Для тех, кто уже в сказке','h1')}${form}`,acts,nbt:false,dnote:alt};
  return {M:`${form}<p class="note">${alt}</p>`,acts};
}

/* ===== Маршрут ===== */
const STOPS=[
  {k:'quiz',n:1,t:'«Спроси дорогу»',d:'Квиз · новый набор каждую неделю',m:'m_mlad',who:'Младший сын',pts:`до ${D.QUIZ.reduce((s,r)=>s+r.qs.length,0)*20} баллов`,halt:[0,1]},
  {k:'forest',n:2,t:'«Лес»',d:'Игра: собрать рассыпанные подарки',m:'m_star',who:'Старший сын',pts:'10 баллов за подарок',halt:[2,3]},
  {k:'tree',n:3,t:'«Ёлка»',d:'Шар из любой картинки на общую ёлку',m:'m_doch',who:'Дочь',pts:'100 баллов',halt:[4,5]},
  {k:'final',n:4,t:'Финал',d:'Готовая сказка и карточка героя',m:'m_mikhail',who:'Дед Мороз Михаил',halt:['full']},
  {k:'chest',n:5,t:'«Сундук чудес»',d:'Розыгрыш призов среди всех помощников',m:'chest',who:'Подарок от Михаила'}
];
function haltHTML(s){
  if(!s.halt)return '';
  const items=s.halt.map(h=>{
    if(h==='full'){const lk=st.day<D.FULL_TALE_DAY;return `<button class="hc ${lk?'soon':'out'}" data-act="go" data-v="fulltale" ${lk?'disabled':''}><b>Вся сказка</b><span>${lk?fmt(D.FULL_TALE_DAY,true):'читать · PDF'}</span></button>`;}
    const c=D.CHAPTERS[h],s2=chState(h),voted=st.serial.votes[h]!=null;
    const lab=s2==='soon'?fmt(c.day,true):s2==='vote'?(voted?'вы голосовали':'голосование'):'читать';
    return `<button class="hc ${s2}" data-act="openCh" data-i="${h}" ${s2==='soon'?'disabled':''}><b>Глава ${ROMAN[h]}</b><span>${lab}</span></button>`;}).join('');
  return `<div class="halt"><span class="hl">${svg('book','width="13" height="13"')} Привал${DESK?' · сказка-сериал':''}</span><div class="hcs">${items}</div></div>`;
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
    else {dn=st.chest.seen;btnH=b('Победители',!dn);}
  } else {
    if(st.day<OPEN[s.k]){state='locked';btnH=lockChip(OPEN[s.k]);}
    else if(s.k==='quiz'&&anyPend()){btnH=b('Продолжить',true);dn=done.quiz();}
    else {dn=done[s.k]();btnH=b(dn?(s.k==='tree'?(st.tree.rev&&!st.tree.hung?'На проверке':'К ёлке'):'Ещё раз'):'Начать',!dn);}
  }
  return `<div class="stop ${state} ${dn?'done':''}">
    <div class="sm"><img class="med" src="${A['med'+s.n]}" alt="${s.n}">${dn?`<span class="done-mark">${svg('check','width="12" height="12" stroke-width="3"')}</span>`:''}</div>
    <div class="sb"><b class="tt">${s.t}</b><span class="ds">${s.d}</span><span class="meta"><span class="who"><img src="${A[s.m]}" alt="" ${s.k==='chest'?'class="obj"':''}>${s.who}</span>${s.pts?`<em>${STAR_SM}${s.pts}</em>`:''}</span></div>
    <div class="st">${btnH}</div>
  </div>${haltHTML(s)}`;
}
// Главное действие на сегодня — то, что маршрут предлагает сделать прямо сейчас
function nextStep(){
  const pq=anyPend();if(pq){const R=D.QUIZ[pq.r];return {k:'quiz',m:'med1',set:pq.r,t:`Продолжите квиз: вопрос ${pq.i+1} из ${R.qs.length}`,d:`Набор ${pq.r+1} «${R.title}» — ответы сохранены`,b:'Продолжить'};}
  if(!done.quiz())return {k:'quiz',m:'med1',t:'Пройдите квиз «Спроси дорогу»',d:'Младший сын ждёт у местных — без их подсказок тропу не найти',b:'Начать'};
  if(st.day>=OPEN.forest&&!done.forest())return {k:'forest',m:'med2',t:'Соберите подарки в «Лесу»',d:'Старший сын уже бежит — догоняйте',b:'Бежать'};
  if(st.day>=OPEN.tree&&!done.tree())return {k:'tree',m:'med3',t:'Повесьте свой шар на общую ёлку',d:'Дочь наряжает ёлку шарами из ваших картинок',b:'Украсить'};
  if(st.day>=OPEN.final&&allDone()&&!st.final.seen)return {k:'final',m:'med4',t:'Ваша сказка готова',d:'Михаил вручит сказку и карточку героя',b:'К финалу'};
  if(st.day>=OPEN.chest&&!st.chest.seen)return {k:'chest',m:'med5',t:'Итоги розыгрыша',d:'Михаил открыл «Сундук чудес» — посмотрите, кому достались подарки',b:'Смотреть'};
  const nx=[[OPEN.forest,'«Лес»'],[OPEN.tree,'«Ёлка»'],[OPEN.final,'финал маршрута'],[OPEN.chest,'«Сундук чудес»']].find(([dd])=>st.day<dd);
  if(nx)return {k:null,m:'clock',t:`Дальше — ${nx[1]}`,d:`Откроется ${fmt(nx[0])}. А пока — сказка-сериал и избушка`};
  return {k:null,m:'chest',t:'Маршрут пройден',d:'Следите за сказкой-сериалом и турнирной таблицей'};
}
// Кнопка «дальше по маршруту» для экранов вне маршрута (сериал, глава)
const STEP_NAME={quiz:'«Спроси дорогу»',forest:'«Лес»',tree:'«Ёлка»',final:'финал',chest:'«Сундук чудес»'};
function routeNext(gold){const ns=nextStep();return ns.k?{t:`Дальше: ${STEP_NAME[ns.k]}`,act:'go',v:ns.k,gold:gold?1:0}:{t:'На маршрут',act:'go',v:'route',gold:gold?1:0};}
function nextCard(){
  const ns=nextStep();
  return `<div class="nextc ${ns.k?'':'idle'}"><img class="${ns.m.startsWith('med')?'med':'obj'}" src="${A[ns.m]}" alt=""><div class="nb"><span class="lbl-s">Следующий шаг</span><b>${nb(ns.t)}</b><span>${nb(ns.d)}</span></div>
    ${ns.k?`<button class="btn btn-gold btn-sm" ${ns.set!=null?`data-act="goQuiz" data-i="${ns.set}"`:`data-act="go" data-v="${ns.k}"`}>${ns.b}</button>`:''}</div>`;
}
// Сказка-сериал: что происходит сейчас
function serialState(){
  let cur=-1;D.CHAPTERS.forEach((c,i)=>{if(st.day>=c.day)cur=i;});
  const full=st.day>=D.FULL_TALE_DAY;
  if(cur<0)return {cur,full,kind:'none'};
  const c=D.CHAPTERS[cur],s=chState(cur),voted=st.serial.votes[cur]!=null,nx=D.CHAPTERS[cur+1];
  const live=s==='vote'&&!full;
  return {cur,full,c,nx,live,voted,kind:full?'full':live?(voted?'voted':'vote'):'read'};
}
function serialCard(withBtn){
  const S=serialState();
  if(S.kind==='none')return `<div class="wcard"><img class="wim" src="${A.book}" alt=""><div class="wb"><span class="lbl-s">Сказка-сериал</span><b>Первая глава — 1 декабря</b><span>Каждые 3–4 дня — новая глава, а сюжет решает общее голосование</span></div></div>`;
  const {cur,c,nx}=S;
  const txt=S.kind==='full'?'Все главы собраны в одну сказку — читайте целиком и скачивайте PDF'
    :S.kind==='vote'?`Прочитайте главу и выберите, куда повернёт сюжет. Голосование до ${fmt(c.day+1)}, 23:59\u00a0мск`
    :S.kind==='voted'?`Ваш голос учтён. Голосование идёт до ${fmt(c.day+1)}, 23:59\u00a0мск${nx?`, глава ${ROMAN[cur+1]} выйдет ${fmt(nx.day)}`:''}`
    :nx?`Голосование завершено. Глава ${ROMAN[cur+1]} выйдет ${fmt(nx.day)}`:c.final?`Финальная глава вышла. Цельная сказка — ${fmt(D.FULL_TALE_DAY)}`:`Цельная сказка выйдет ${fmt(D.FULL_TALE_DAY)}`;
  const b=S.kind==='full'?{t:'Читать сказку',act:'go',v:'fulltale',gold:1}:S.kind==='vote'?{t:'Читать и голосовать',act:'openCh',i:cur,gold:1}:{t:S.kind==='voted'?'Ход голосования':'Читать главу '+ROMAN[cur],act:'openCh',i:cur};
  return `<div class="wcard ${S.live?'hot':''}"><img class="wim" src="${A.book}" alt=""><div class="wb"><div class="row tight"><span class="lbl-s">Сказка-сериал</span>${S.live?`<span class="chip live">${S.voted?'вы голосовали':'голосование'}</span>`:''}</div>
    <b>${S.kind==='full'?'Большая книга сказок':`Глава ${ROMAN[cur]}. ${c.t}`}</b><span>${nb(txt)}</span>${withBtn?btn(Object.assign({cls:'btn-sm',noarrow:1},b)):''}</div></div>`;
}
function quizCard(){
  let qi=-1;D.QUIZ.forEach((r,i)=>{if(st.day>=r.open)qi=i;});
  const R=D.QUIZ[qi],res=st.quiz[qi],nx=D.QUIZ[qi+1],fresh=!(res&&res.done);
  return `<div class="wcard ${fresh?'hot':''}"><span class="wim face">${por('m_mlad')}</span><div class="wb"><div class="row tight"><span class="lbl-s">Квиз${DESK?' «Спроси дорогу»':''}</span>${fresh?'<span class="chip live">новый набор</span>':''}</div>
    <b>Набор ${qi+1}. ${R.title}</b><span>${fresh?`${R.qs.length} новых слов и узоров — 20 баллов за верный ответ`:`Пройден: ${qFirst(res)} из ${R.qs.length}, повтор — без баллов`}. ${nx?`Следующий — ${fmt(nx.open)}`:'Это последний набор'}</span>
    <div class="qweeks">${D.QUIZ.map((r,i)=>`<i class="${i<qi?'past':i===qi?'now':''}">${fmt(r.open,true)}</i>`).join('')}</div>
    <button class="btn ${fresh||qPend(qi)?'btn-gold':'btn-ghost'} btn-sm" data-act="goQuiz" data-i="${qi}">${qPend(qi)?'Продолжить':fresh?'Пройти набор':'Ещё раз'}</button></div></div>`;
}
function weeklyBlock(){return `<section class="weekly">${lbl('Новое на этой неделе')}<div class="hs">${serialCard(true)}${quizCard()}</div></section>`;}
function talesOpen(){return D.TALES.filter(t=>st.day>=t.open).length;}
function vRoute(){
  bar('Маршрут',`${fmt(st.day,true)} · ${nyLeft()}`);
  const lb=board(), me=lb.find(x=>x.me);
  const route=`<div class="route">${STOPS.map(stopHTML).join('')}</div>`;
  const bank=`<div class="cart bank"><div class="row tight">${ICON_BANK}<span class="lbl-s">Общий счётчик банка</span></div>
      <div class="num">${num(bankTotal())}</div><div class="small ink2">подарков собрали сотрудники в «Лесу»${st.forest.gifts?` · ваших — ${st.forest.gifts}`:''}</div>
      <div class="stats"><div><b>${num(participants())}</b>помощников</div><div><b>${citiesCount()}</b>${plural(citiesCount(),'город','города','городов')}</div></div>
      <img class="deco" src="${A.bear_sack}" alt=""></div>`;
  const kids=`<a class="kids" href="${href('izba')}"><img src="${A.hut}" alt=""><span class="kb"><span class="lbl-s">Для детей</span><b>Пряничная избушка</b><span>Аудиосказки на ночь · доступно ${talesOpen()} из 10</span></span>${svg('arrow','width="20" height="20"')}</a>`;
  const rank=`<a class="myrank" href="${href('rating')}">${ava(me.nick,34,true)}<span class="mr"><b>${me.place} место в рейтинге</b><span>${num(me.p)} баллов</span></span>${svg('arrow','width="20" height="20"')}</a>`;
  return {pre:endBanner(),
    L:`${pt('Маршрут помощника','Помогите Михаилу успеть во все полуночи','h1')}
      <div class="intro"><img src="${A.bear_moroz}" alt="">${tale('Мешок Деда Мороза порвался о еловый сук, подарки рассыпались по лесу. Идите с востока на запад — на пути открываются испытания.',true)}</div>
      ${nextCard()}${bank}${weeklyBlock()}`,
    R:`${pt('Путь героя','Испытания · привалы · награда')}
      <p class="tale small">Испытания приносят баллы в турнирную таблицу. На привалах выходят главы сказки-сериала — читайте и голосуйте, куда повернёт сюжет.</p>
      ${route}${kids}${rank}`,
    M:`${nextCard()}${weeklyBlock()}${lbl('Путь героя')}${route}${bank}${kids}${rank}`,
    pn:7};
}

/* ===== Квиз «Спроси дорогу» ===== */
function roundsList(R){
  return `<div class="rounds">${D.QUIZ.map((r,i)=>{const lk=st.day<r.open;const res=st.quiz[i];return `<button class="rnd ${R===i?'on':''}" data-act="qRound" data-i="${i}" ${lk?'disabled':''}><span class="rn">${ROMAN[i]}</span><span class="rt"><b>${r.title}</b><small>${lk?'Откроется '+fmt(r.open):res&&res.done?`В зачёте: ${qFirst(res)} из ${r.qs.length} · повтор без баллов`:qPend(i)?`Начат: вопрос ${qPend(i).i+1} из ${r.qs.length}`:r.qs.length+' вопросов · '+fmt(r.open,true)}</small></span>${res&&res.done?`<span class="rs">${qFirst(res)}/${r.qs.length}</span>`:''}</button>`;}).join('')}</div>`;
}
const QUIZ_HELLO='чтобы понять, куда идти и где застрял папа, нужно расспросить местных. Но говорят они на своём: одна просит принести шаньги, другой упоминает камусы, третий зовёт к айрану. Не понял слова — не нашёл тропу!';
function vQuiz(){
  bar('Спроси дорогу','Испытание 1 · квиз','route');
  if(st.day<OPEN.quiz)return lockView('Квиз откроется 1 декабря');
  const q=ui.quiz;
  if(!q){
    if(ui.quizRound==null){const f=D.QUIZ.findIndex((r,i)=>st.day>=r.open&&!(st.quiz[i]&&st.quiz[i].done));ui.quizRound=f>=0?f:0;}
    const R=ui.quizRound;
    const part=st.qpart&&st.qpart[R];
    const acts=[{t:part?'Продолжить набор':st.quiz[R]&&st.quiz[R].done?'Пройти набор ещё раз':'Расспросить местных',act:'qStart',gold:1}];
    const res=st.quiz[R];
    const note=part?`<p class="note">${STAR_SM} Вы остановились на вопросе ${part.i+1} из ${D.QUIZ[R].qs.length} — ответы сохранены и засчитаны</p>`
      :res&&res.done?`<p class="note">${STAR_SM} В зачёте первая попытка: ${qFirst(res)} из ${D.QUIZ[R].qs.length}. Пройти ещё раз можно — для себя, без баллов</p>`
      :`<p class="note">${STAR_SM} 20 баллов за каждый верный ответ · в зачёт идёт первая попытка</p>`;
    return {
      L:`${pt('Спроси дорогу','Испытание 1 · слова и узоры разных краёв','h1')}${say('m_mlad','Младший сын',QUIZ_HELLO)}
        ${tale('Слово на диалекте и четыре варианта ответа. После выбора — короткий рассказ: откуда слово, что оно означает и где так говорят. Ошибаться не страшно — каждый ответ открывает что-то новое.',true)}
        ${tale('А ещё будут узоры: на рукавице, на поясе, на полотенце. Угадайте, чей это край.')}`,
      R:`${pt('Наборы вопросов','Новый набор каждую неделю')}${roundsList(R)}${note}`,
      M:`${say('m_mlad','Младший сын',QUIZ_HELLO,'compact')}
        <p class="tale small">Слово на диалекте или узор на рукавице — и четыре варианта ответа. После выбора — короткий рассказ: откуда слово и что оно означает. Ошибаться не страшно.</p>
        ${lbl('Наборы вопросов · новый каждую неделю','s')}${roundsList(R)}${note}`,
      acts,nbt:false,pn:9,cls:'quiz'};
  }
  const R=D.QUIZ[q.r], n=R.qs.length;
  if(q.finished){
    bar('Спроси дорогу',`Набор ${q.r+1} · итог`,'route');
    const top=`${pt('Тропа найдена',`Набор ${q.r+1} · ${R.title}`,'h1')}
      <div class="score"><span class="big">${q.correct}</span><span class="of">из ${n}</span></div>
      <p class="gain">${q.replay?`Повтор — без баллов. В зачёте первая попытка: ${qFirst(st.quiz[q.r])} из ${n}`:q.gain>0?`+${q.gain} баллов в таблицу`:'В этот раз без баллов — зато теперь вы знаете эти слова'}</p>
      ${say('m_mlad','Младший сын','местные показали дорогу! Папа застрял где-то в лесу — там уже ждёт мой старший брат.','compact')}
      ${st.day<OPEN.forest?`<p class="note">«Лес» откроется ${fmt(OPEN.forest)}</p>`:''}`;
    const acts=[st.day>=OPEN.forest?{t:'Дальше: «Лес»',act:'go',v:'forest',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1},{t:'Другой набор',act:'qAgain'}];
    return {L:top,R:`${pt('Что дальше')}${nextBar(st.day>=OPEN.forest?[...acts,ROUTE_BTN]:acts,'',false)}${lbl('Все наборы')}${roundsList(q.r)}`,
      M:`${top}${lbl('Все наборы','s')}${roundsList(q.r)}`,acts,dacts:[],pn:9,cls:'quiz'};
  }
  const Q=R.qs[q.i], ans=q.answered;
  bar('Спроси дорогу',`Набор ${q.r+1} · вопрос ${q.i+1} из ${n}${q.replay?' · без баллов':''}`,'route');
  const expl=`<div class="explain"><div class="where">${Q.where}</div><div class="ttl2">${Q.t==='w'?Q.w:'Узор: '+Q.o[Q.a]}</div><p>${Q.ex}</p>
    <div class="verdict ${q.pick===Q.a?'ok':''}">${q.pick===Q.a?(q.replay?'Верно!':'Верно! +20 баллов'):`Правильный ответ — «${Q.o[Q.a]}». Теперь и вы знаете!`}</div></div>`;
  const nextT=q.i<n-1?'Следующий вопрос':'Узнать, куда идти';
  const qbar=`<div class="qbar" aria-label="Вопрос ${q.i+1} из ${n}">${R.qs.map((_,i)=>`<i class="${i<q.i?'done':i===q.i?'on':''}"></i>`).join('')}</div>`;
  const ask=say('m_mlad','Младший сын',Q.t==='w'?`местные сказали «${Q.w.toLowerCase()}». Что бы это значило?`:`смотри, какой узор на ${Q.on}! Из какого он края?`,'compact');
  const word=`<div class="qword-wrap"><div class="plabel">${Q.t==='w'?'Что означает это слово':'Чей это узор?'}</div>
      <div class="qword ${Q.t==='w'?'':'pat'}">${flowers()}${Q.t==='w'?`<div class="w">${Q.w}</div>`:`${patternSVG(Q.p)}<div class="on">Узор на ${Q.on}</div>`}</div></div>`;
  const opts=`<div class="opts ${ans?'answered':''}">${Q.o.map((o,i)=>{let cl='';if(ans){if(i===Q.a)cl='right';else if(i===q.pick)cl='wrong';else cl='dim';}return `<button class="opt ${cl}" data-act="qPick" data-i="${i}"><span>${o}</span></button>`;}).join('')}</div>`;
  const hint='<p class="note">Выберите вариант — после ответа Младший сын расскажет, что это значит</p>';
  return {
    L:`${pt('Спроси дорогу',`Набор ${q.r+1} · ${R.title}`,'h1')}${ask}${word}${qbar}<div class="qcount">Вопрос ${q.i+1} из ${n}${q.replay?' · повтор без баллов':''}</div>`,
    R:`${pt('Ваш ответ')}${opts}${ans?`<div class="parch explain-in">${flowers()}${expl}</div>`:hint}`,
    M:`${qbar}${ask}${word}${opts}${ans?'':hint}`,
    acts:ans?[{t:nextT,act:'qNext',gold:1},{t:'Пояснение',act:'sheetOpen',v:'explain'}]:[],
    dacts:ans?[{t:nextT,act:'qNext',gold:1}]:[],nbt:false,
    sheet:ans&&ui.sheet==='explain'?sheet(`${expl}<button class="btn btn-gold btn-block" data-act="qNext">${nextT} ${svg('arrow','width="18" height="18"')}</button>`,{cls:'parchsheet'}):'',
    sun:false,pn:9,cls:'quiz'};
}

/* ===== Лес ===== */
function stageBar(n){return `<span>Этап ${n} из 20</span><b class="sprog"><i style="width:${n*5}%"></i></b>`;}
const LITE_NOTE='<p class="note">Игра тормозит или не запускается? <a class="link" href="#" data-act="fLite">Альтернативный способ заработать баллы</a> — для старых браузеров и слабых компьютеров</p>';
const FOREST_HELLO='тропа найдена! Папины подарки рассыпались по всему лесу — бежим вместе собирать. Управляешь мной ты. Всё, что соберём, пойдёт в общий счётчик банка.';
function vForest(){
  bar('Лес','Испытание 2 · бег за подарками','route');
  if(st.day<OPEN.forest)return lockView('«Лес» откроется 8 декабря','После того как тропа найдена, герой вместе со Старшим сыном попадает в лес, где рассыпаны подарки Деда Мороза.','m_star');
  const best=st.forest.bestGifts;
  if(DESK){
    // Десктоп: игровое поле на весь разворот, панель с жизнями и подарками на правой странице
    return {
      L:`${pt('Лес','Испытание 2 · соберите подарки, перепрыгните препятствия','h1')}${say('m_star','Старший сын',FOREST_HELLO)}`,
      R:`<div class="hud"><div>${ICON_HEART}<div><span>Жизни</span><b id="hLives" class="hearts">${hearts(3)}</b></div></div><div>${ICON_GIFT}<div><span>Подарки</span><b id="hGifts">0</b></div></div><div>${ICON_BANK}<div><span>В общий счётчик</span><b id="hBank">+0</b></div></div></div>
        <p class="tale small">Бегите и собирайте подарки: чем больше, тем лучше. 20 этапов, и с каждым бег быстрее. У вас 3 жизни — каждое столкновение отнимает одну.</p>
        <p class="note left">Пробел, ↑ или клик по игре — прыжок · удерживайте → или «Быстрее» — ускорение</p>`,
      full:`<div class="stage" id="stage"><canvas id="cv" data-ratio=".5"></canvas>
          <div class="overlay" id="ov"><div class="inner"><div class="ov-t">${st.forest.runs?'Ещё забег?':'Готовы?'}</div>
            <button class="btn btn-gold btn-lg" data-act="fStart">Бежать!</button>
            ${st.forest.runs?`<p class="small">Лучший забег: ${best} ${plural(best,'подарок','подарка','подарков')}</p>`:''}</div></div></div>
        <div class="ctrl" id="ctrl"><button class="btn btn-ghost" id="bJump">${svg('up','width="18" height="18"')} Прыжок</button><button class="btn btn-ghost" id="bFwd">Быстрее ${svg('arrow','width="18" height="18"')}</button>
          <div class="stagebar" id="sbar">${stageBar(1)}</div></div>
        <p class="note hidden" id="fin"><a class="link" href="#" data-act="fExit">Закончить забег</a> — собранные подарки засчитаются</p>${LITE_NOTE}`,
      pn:11,cls:'forest'};
  }
  if(ui.fmode)return {raw:gameMode()};
  return {M:`${say('m_star','Старший сын',FOREST_HELLO,'compact')}
    <div class="howto"><div>${svg('up')}<b>Тап по игре</b><span>прыжок</span></div><div>${svg('arrow')}<b>Держите «Быстрее»</b><span>ускорение</span></div><div>${ICON_HEART}<b>3 жизни</b><span>столкновение — минус одна</span></div></div>
    <p class="tale small center">Бегите и собирайте подарки: чем больше, тем лучше. 20 этапов, и с каждым бег быстрее.</p>
    ${st.forest.runs?`<div class="rcs"><div><b>${best}</b><span>рекорд, подарков</span></div><div><b>${num(best*10)}</b><span>баллов в таблице</span></div><div><b>${st.forest.gifts}</b><span>всего в общем счётчике</span></div></div>`:''}
    ${LITE_NOTE}`,
    acts:[{t:st.forest.runs?'Ещё забег':'Бежать!',act:'fPlay',gold:1}]};
}
// Телефон: игра во весь экран — сверху жизни и подарки, в центре поле, снизу большие кнопки под большие пальцы
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
  if(!DESK)cv.dataset.maxh=String(Math.max(200,innerHeight-(innerWidth>innerHeight?110:250)));
  game=ForestGame(cv,{
    hud(S){const a=$('#hLives'),b=$('#hGifts'),c=$('#hBank');if(a)a.innerHTML=hearts(S.lives);if(b)b.textContent=S.gifts;if(c)c.textContent='+'+S.gifts;},
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
  const line=outStage?'уф, споткнулись! Отдышимся — и ещё забег? Подарки, что успели собрать, уже в мешке.':'собрали! Бегу отдать папе мешок — а сестрёнка уже ждёт у ёлки.';
  const rec=`<div><b>${gifts>prevBest?'+'+(gifts-prevBest)*10:st.forest.bestGifts}</b><span>${gifts>prevBest?'баллов — новый рекорд':'ваш рекорд, подарков'}</span></div>`;
  const treeNote=st.day<OPEN.tree?`«Ёлка» откроется ${fmt(OPEN.tree)}`:'';
  if(DESK){
    // Десктоп: итоги — карточкой под игровым полем
    const fn=$('#fin');if(fn)fn.classList.add('hidden');
    const ov=$('#ov');if(ov){ov.classList.remove('hidden');ov.innerHTML=`<div class="inner"><div class="lbl-s">${head}</div><div class="ov-t">${gifts} ${plural(gifts,'подарок','подарка','подарков')}</div><p class="small">Итоги и кнопки — под игрой ↓</p></div>`;}
    const ctrl=$('#ctrl');if(!ctrl)return;
    ctrl.outerHTML=`<div class="resultcard" id="ctrl">${say('m_star','Старший сын',line,'compact')}
      <div class="rcs"><div><b>${gifts}</b><span>${plural(gifts,'подарок','подарка','подарков')} собрано</span></div><div><b>+${gifts}</b><span>в общий счётчик банка</span></div>${rec}</div>
      ${nextBar([nx,{t:'Ещё забег',act:'fAgain'},nx.v!=='route'?ROUTE_BTN:null],treeNote)}</div>`;
    const rc=$('#ctrl');if(rc)rc.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'center'});
  } else {
    // Телефон: итоги — шторкой поверх игры
    const gm=$('#gm');if(!gm)return;
    const old=gm.querySelector('.sheet');if(old){old.previousElementSibling.remove();old.remove();}
    gm.insertAdjacentHTML('beforeend',sheet(`<div class="lbl-s center">${head}</div>
      <div class="fres"><b>${gifts}</b><span>${plural(gifts,'подарок','подарка','подарков')}</span></div>
      ${say('m_star','Старший сын',line,'compact')}
      <div class="rcs"><div><b>+${gifts}</b><span>в общий счётчик банка</span></div>${rec}</div>
      <div class="sheet-acts">${btn(nx)}${btn({t:'Ещё забег',act:'fAgain'})}${nx.v!=='route'?btn(ROUTE_BTN):''}</div>
      ${treeNote?`<p class="note">${treeNote}</p>`:''}`,{cls:'darksheet',close:'fAgain'}));
  }
  updateHeader();
  if(first)toast('Подарки ушли в общий счётчик банка');
}
function startLite(){
  if(game)game.destroy(),game=null;
  const ov=$('#ov'); if(!ov)return; ov.classList.remove('hidden');
  const sg=$('#stage');if(sg)sg.classList.add('lite-on');
  let n=0,got=0,cur=-1;
  ov.innerHTML=`<div class="inner"><div class="lbl-s">Альтернативный способ заработать баллы</div><p class="small">Нажимайте на подарки, пока они не исчезли</p><div class="lite" id="lite">${[...Array(9)].map((_,i)=>`<button data-li="${i}"></button>`).join('')}</div><div class="small" id="liteC">Собрано: 0</div></div>`;
  $('#lite').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-li]');if(b&&+b.dataset.li===cur){got++;cur=-1;b.classList.remove('has');b.textContent='';$('#liteC').textContent='Собрано: '+got;const g=$('#hGifts');if(g)g.textContent=got;const c=$('#hBank');if(c)c.textContent='+'+got;}});
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
  for(let i=0;i<cnt;i++){const N=NOUNS[Math.floor(r()*NOUNS.length)];out.push({nick:D.ADJ[Math.floor(r()*D.ADJ.length)][N.g]+' '+N.w,city:r()<.25?'Москва':D.CITIES[Math.floor(r()*60)][0],img:r()<.4?Math.floor(r()*6):-1});}
  return out;
}
function treeBox(){return treeSVG(ui.treeSide===0?mineBall():null,sideBalls(ui.treeSide),900+ui.treeSide);}
function rotateTree(dir,to){
  const n=treeSides();ui.treeSide=to!=null?to:((ui.treeSide+dir)%n+n)%n;
  const box=$('#treebox');if(!box)return render();
  box.classList.add(dir>0?'out-l':'out-r');
  setTimeout(()=>{box.innerHTML=treeBox();box.classList.remove('out-l','out-r');box.classList.add(dir>0?'in-r':'in-l');
    const l=$('#tside');if(l)l.textContent=sideLabel();const m=$('#toMine');if(m)m.classList.toggle('hidden',ui.treeSide===0||!mineBall());},230);
  setTimeout(()=>box.classList.remove('in-r','in-l'),560);
}
const TREE_STEPS=['Выберите игрушку','Загрузите картинку','ИИ создаёт игрушку','Готово!'];
// Своя игрушка: на проверке (rev) — видна только автору; после проверки — всем на общей ёлке
function mineBall(){return st.tree.rev?st.tree.rev.ball:st.tree.ball;}
// Модерация в прототипе: игрушка «проходит проверку» при следующем переходе между страницами. На платформе — очередь в админке
function approveToy(){if(!st.tree.rev)return;const first=!st.tree.hung;st.tree.ball=st.tree.rev.ball;st.tree.style=st.tree.rev.style;st.tree.hung=true;st.tree.rev=null;
  if(first)addLog('tree','Первая игрушка на общей ёлке',100);save();flash(first?'Игрушка прошла проверку и висит на общей ёлке · +100 баллов':'Новая игрушка прошла проверку и висит на ёлке');}
function vTree(){
  bar('Украсить ёлку','Испытание 3 · общая ёлка банка','route');
  if(st.day<OPEN.tree)return lockView('«Ёлка» откроется 15 декабря','Когда подарки собраны и Дед Мороз отправился их развозить, Дочь зовёт всех вместе нарядить ёлку к празднику.','m_doch');
  const T=ui.tree, step=T.step||0;
  if(!step){
    const nx=st.day>=OPEN.final?{t:'Дальше: финал',act:'go',v:'final',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1};
    const tc=treeCount();
    const treeH=`<div class="treebox" id="treebox">${treeBox()}</div>
      <div class="rot"><button class="btn btn-ghost btn-sm" data-act="treeRot" data-d="-1" aria-label="Повернуть влево">‹${DESK?' Повернуть':''}</button><div class="rotlab" id="tside">${sideLabel()}</div><button class="btn btn-ghost btn-sm" data-act="treeRot" data-d="1" aria-label="Повернуть вправо">${DESK?'Повернуть ':''}›</button></div>
      <p class="note">${DESK?'Ёлку можно крутить и свайпом. Наведите на шар — увидите, кто его повесил':'Крутите ёлку свайпом. Нажмите на шар — увидите, кто его повесил'}</p>`;
    const rev=st.tree.rev, mb=mineBall();
    const line=rev&&!st.tree.hung?'красота! Как только модератор проверит игрушку, её увидят все. А пока покрути ёлку — на каждой стороне игрушки коллег.'
      :st.tree.hung?'ёлка большая — у неё много сторон. Крути её: на каждой стороне игрушки коллег со всей страны.':'подарки собраны, папа уехал их развозить. Осталось вместе нарядить ёлку! Сделаем твой шар?';
    const mine=mb?`<div class="mytoy"><img src="${mb}" alt=""><div><b>${rev?'Ваша игрушка — на проверке':'Ваша игрушка — на ёлке'}</b><span>${rev?(st.tree.hung?'Новая игрушка появится у всех после проверки модератором':'Пока её видите только вы. У всех она появится после проверки модератором — тогда же начислим 100 баллов'):'Висит на передней стороне, в самом центре'}</span>
        <span class="row tight"><button class="link ${ui.treeSide===0?'hidden':''}" id="toMine" data-act="treeMine">Показать</button><button class="link" data-act="tDownloadMine">Скачать</button></span></div></div>`:'';
    const note=done.tree()&&st.day<OPEN.final?`Финал маршрута откроется ${fmt(OPEN.final)}`:'';
    return {
      L:`${pt('Общая ёлка банка',`${num(tc)} ${plural(tc,'игрушка','игрушки','игрушек')}`,'h1')}${treeH}`,
      R:`${pt('Украсить ёлку','Испытание 3')}${doch(line)}${tale('Ёлка наряжается весь декабрь: свежие игрушки появляются на передней стороне, остальные — если её повернуть.')}${mine}`,
      M:`<div class="tcount"><b>${num(tc)}</b> ${plural(tc,'игрушка','игрушки','игрушек')} на общей ёлке</div>${treeH}${doch(line,'compact')}${mine}`,
      acts:done.tree()?[nx,{t:'Ещё игрушка',act:'tStep',s:1}]:[{t:'Сделать свой шар',act:'tStep',s:1,gold:1}],
      dacts:done.tree()?[nx,{t:'Сделать ещё игрушку',act:'tStep',s:1},st.day>=OPEN.final?ROUTE_BTN:null]:[{t:'Сделать свой шар',act:'tStep',s:1,gold:1}],
      note,pn:13,cls:'tree'};
  }
  bar('Украсить ёлку',`Шаг ${step} из 4 · ${TREE_STEPS[step-1]}`,'route');
  const lines={1:'выбери, какой шар мы сделаем. Стиль можно поменять в любой момент.',2:'теперь нужна картинка — любая: фото, рисунок, открытка, зимний пейзаж. Я превращу её в ёлочную игрушку.',3:'колдую над игрушкой… ещё чуть-чуть!',4:'какая красота! Повесим её на нашу общую ёлку?'};
  const steps=`<ol class="wiz" aria-label="Шаг ${step} из 4">${TREE_STEPS.map((s,i)=>`<li class="${i+1===step?'on':''} ${i+1<step?'done':''}"><i>${i+1<step?'✓':i+1}</i><span>${s}</span></li>`).join('')}</ol>`;
  const L=`${pt('Украсить ёлку','Испытание 3 · шар из любой картинки','h1')}${doch(lines[step])}${steps}
    ${done.tree()?`<p class="note left"><a class="link" href="#" data-act="tStep" data-s="0">← Вернуться к общей ёлке</a></p>`:''}`;
  const mob=x=>`${steps}${doch(lines[step],'compact')}${x}`;
  let body,head,acts=[];
  if(step===1){
    head=dpt('Выберите игрушку','Шесть стилей шара');
    body=`<div class="styles">${BALL_STYLES.map((s,i)=>`<button class="${(T.style||0)===i?'on':''}" data-act="tStyle" data-i="${i}"><img src="${A['ball'+i]}" alt=""><span>${s.n}</span></button>`).join('')}</div>`;
    acts=[{t:'Дальше: картинка',act:'tStep',s:2,gold:1},{t:'К ёлке',act:'tStep',s:0}];
  } else if(step===2){
    head=dpt('Загрузите картинку','Любую — не обязательно ваше фото');
    body=`<label class="dropzone" id="drop">${T.src?`<img class="pv" src="${T.src}" alt="">`:`<span class="dz">${svg('photo','width="40" height="40"')}</span>`}
        <b>${T.src?'Картинка загружена':DESK?'Нажмите или перетащите файл сюда':'Выбрать картинку'}</b><span class="small">${T.src?'Нажмите, чтобы заменить':'JPG или PNG — с телефона или компьютера'}</span>
        <input type="file" accept="image/*" id="file" class="sr"></label>
      ${lbl('или попробуйте на примере','s')}
      <div class="samples">${[['sample_girl','Портрет'],['sample_team','Компания'],['sample_draw','Рисунок']].map(([k,l])=>`<button data-act="tSample" data-k="${k}"><img src="${A[k]}" alt=""><span>${l}</span></button>`).join('')}</div>
      <p class="note">Подойдёт любая картинка — не обязательно ваше фото. Если на ней есть люди, загружайте, только если они не против. Картинка нужна только для игрушки и удаляется сразу после её создания</p>`;
    acts=[{t:'Создать игрушку',act:'tMake',gold:1,disabled:!T.src},{t:'Назад',act:'tStep',s:1}];
  } else if(step===3){
    head=dpt('ИИ создаёт игрушку','Пара секунд');
    body=`<div class="making"><div class="orb"><img src="${T.src}" alt=""></div><div class="mk" id="mk">Превращаем картинку в новогодний шар…</div></div>`;
  } else {
    head=dpt('Готово!','Ваша уникальная новогодняя игрушка');
    body=`<div class="ballout"><img src="${T.ball}" alt="Ваша игрушка"></div>
      <p class="tale small center">Её увидят коллеги из всех городов. Или сохраните к себе на устройство.</p>
      <label class="chk"><input type="checkbox" id="pubOk"${ui.pubOk?' checked':''}><span>Можно показать на общей ёлке: если на картинке есть люди, они не против</span></label>
      <p class="note">${st.tree.hung?'':`${STAR_SM} +100 баллов за первую игрушку — после проверки модератором · `}<a class="link" href="#" data-act="tStep" data-s="1">Сделать другую</a></p>`;
    acts=[{t:'Повесить на ёлку',act:'tHang',gold:1,disabled:!ui.pubOk},{t:'Скачать',act:'tDownload'}];
  }
  return {L,R:head+body,M:mob(body),acts,nbt:false,sun:false,pn:13,cls:'tree'};
}
function setTreeSrc(src){ui.tree.src=src;render();}
async function makeBall(){
  ui.tree.step=3;render();
  const msgs=['Подбираем стиль…','Добавляем снег и огоньки…','Вешаем петельку…'];let i=0;
  const t=setInterval(()=>{const m=$('#mk');if(m)m.textContent=msgs[i++%msgs.length];},800);timers.push(t);
  const [ball]=await Promise.all([renderBall(ui.tree.src,ui.tree.style||0),new Promise(r=>setTimeout(r,2400))]);
  clearInterval(t);ui.tree.ball=ball;ui.tree.step=4;ui.pubOk=false;if(st.view==='tree')render();
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
    return {one:`${pt('Сказка почти готова','Финал маршрута','h1')}
      ${say('m_mikhail','Дед Мороз Михаил','осталось совсем немного! Пройдите все три испытания — и сказка станет вашей: свой персонаж, свой путь, свой результат.','compact')}
      <ul class="checklist">${items.map(([k,l,ok])=>`<li class="${ok?'ok':''}"><i>${ok?'✓':''}</i><span>${l}</span>${ok?'':st.day>=OPEN[k]?`<button class="btn btn-gold btn-sm" data-act="go" data-v="${k}">Пройти</button>`:lockChip(OPEN[k])}</li>`).join('')}</ul>`,
      acts:[ROUTE_BTN]};
  }
  if(!st.final.seen){st.final.seen=true;setTimeout(()=>toast('Сказка готова!'),300);}
  save();
  const u=st.user,p=pts(),T=personalTale();
  const story=`${pt('Сказка о помощнике','Финал маршрута','h1')}
    ${say('m_mikhail','Дед Мороз Михаил','спасибо, помощник! Благодаря вам я успел во все одиннадцать полуночей. Вот ваша сказка.','compact')}
    <div class="parch story">${flowers()}${T.map((x,i)=>i===0?tale(x,true):tale(x)).join('')}<div class="fin">Конец</div></div>`;
  const card=`<div class="herocard">${ava(u.nick,DESK?96:84,true)}<div class="nk">${esc(u.nick)}</div><div class="city">${esc(u.city||'')}</div>
      <div class="herostats"><div><b>${quizWords()}</b><span>слов и узоров</span></div><div><b>${st.forest.bestGifts}</b><span>подарков</span></div><div><b>${num(p.total)}</b><span>баллов</span></div></div>
      <button class="btn btn-ghost btn-block" data-act="cardDl">${svg('down','width="17" height="17"')} Скачать карточку героя</button></div>
    <div class="cart chestinv"><img src="${A.chest}" alt="">${lbl('Розыгрыш «Сундука чудес»','s')}
      <p class="small">${st.day<OPEN.chest?'25 декабря Михаил разыграет подарки среди всех помощников — вы уже участвуете.':'Розыгрыш прошёл 25 декабря — имена победителей в «Сундуке чудес».'}</p></div>`;
  const main=st.day>=OPEN.chest?{t:'Итоги розыгрыша',act:'go',v:'chest',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1};
  return {L:story,R:`${pt('Карточка героя')}${card}`,M:`${story}${lbl('Карточка героя')}${card}`,
    acts:[main,{t:'Сериал',act:'go',v:'serial'}],
    dacts:[main,{t:'Сказка-сериал',act:'go',v:'serial'},{t:'Личный кабинет',act:'go',v:'profile'},st.day>=OPEN.chest?ROUTE_BTN:null],
    note:st.day<OPEN.chest?'Розыгрыш «Сундука чудес» — 25 декабря':'',pn:15,cls:'final'};
}

/* ===== Сундук чудес: розыгрыш ===== */
// Участнику ничего делать не нужно: 25 декабря платформа случайно выбирает победителей среди всех помощников.
// Призы и проверку, что победитель — сотрудник банка, берёт на себя банк: победитель подтверждает себя персональным кодом
const DRAW_N=10;
function drawPool(){return Math.min(16800,Math.round(2100+OPEN.chest*520));}
function drawWinners(){
  const r=rng(1225),pool=FAKES.slice(),out=[];
  while(out.length<DRAW_N&&pool.length)out.push(pool.splice(Math.floor(r()*pool.length),1)[0]);
  if(st.chest.win&&st.user)out.splice(6,1,{nick:st.user.nick,city:st.user.city,me:true});
  return out;
}
function vChest(){
  bar('Сундук чудес','Розыгрыш призов','route');
  const before=st.day<OPEN.chest,u=st.user;
  const chestImg=`<div class="chestimg ${before?'locked':'open'}" id="chestimg"><span class="burst"></span><img src="${A.chest}" alt="Сундук чудес">${before?`<div class="lockb"><span class="chip lock">${svg('lock','width="15" height="15"')} 25 декабря</span></div>`:''}</div>`;
  const top10=`<div class="cart">${lbl('Топ-10 турнирной таблицы','s')}<p class="small">Кроме розыгрыша, десять лучших по баллам получают мерч. Его не выиграть случайно — только набрать баллы.</p><a class="link" href="${href('rating')}">Открыть таблицу</a></div>`;
  if(before){
    const d=OPEN.chest-st.day;
    const hello=say('m_mikhail','Дед Мороз Михаил',`в этом сундуке — подарки для ${DRAW_N} помощников. Кому они достанутся, решит случай.`,'compact');
    const how=`<ol class="how"><li><i>1</i><span>Участвуют все помощники — делать ничего не нужно</span></li><li><i>2</i><span>25 декабря платформа случайно выберет ${DRAW_N} победителей</span></li><li><i>3</i><span>Имена победителей появятся здесь</span></li></ol>`;
    const me=`<div class="drawme">${ava(u.nick,40,true)}<div><b>${tname(u.nick,u.city)}</b><span>${svg('check','width="14" height="14"')} Вы участвуете в розыгрыше</span></div></div>`;
    const txt=`<p class="tale${DESK?'':' center'}">Розыгрыш — 25 декабря, через ${d} ${plural(d,'день','дня','дней')}. Победителей выберет случай, а не баллы: шанс есть у каждого.</p>`;
    return {pre:endBanner(),
      L:`${pt('Сундук чудес','Розыгрыш призов · 25 декабря','h1')}${hello}${chestImg}`,
      R:`${pt('Как пройдёт розыгрыш','Участвуют все помощники')}${txt}${how}${me}${top10}`,
      M:`${hello}${chestImg}${txt}${how}${me}${top10}`,
      acts:[ROUTE_BTN],pn:17,cls:'chest'};
  }
  if(!st.chest.seen){st.chest.seen=true;save();}
  const W=drawWinners(),won=W.some(x=>x.me);
  const list=`<ol class="wlist">${W.map((x,i)=>`<li class="${x.me?'me':''}"><span class="n">${i+1}</span>${ava(x.nick,DESK?34:32,x.me)}<span class="w">${tname(x.nick,x.city)}${x.me?' <span class="tag">вы</span>':''}</span></li>`).join('')}</ol>`;
  const res=won?`<div class="drawres win">${svg('check','width="20" height="20"')}<div><b>Вы среди победителей!</b><span>Чтобы получить приз, понадобится ваш персональный код — сохраните его. Как и где получить приз, сообщим на этой странице.</span></div></div>`
    :`<div class="drawres"><div><b>В этот раз удача улыбнулась другим</b><span>Спасибо, что помогали Михаилу! Сказка-сериал, аудиосказки и турнирная таблица работают до 17 января.</span></div></div>`;
  const hello=say('m_mikhail','Дед Мороз Михаил',won?'поздравляю! Подарок из моего сундука достался вам.':'сундук открыт — подарки нашли своих хозяев. Спасибо всем, кто помогал!','compact');
  const sub=`${DRAW_N} из ${num(drawPool())} помощников`;
  return {pre:endBanner(),
    L:`${pt('Сундук чудес','Итоги розыгрыша · 25 декабря','h1')}${hello}${chestImg}${res}`,
    R:`${pt('Победители розыгрыша',sub)}${list}${top10}`,
    M:`${hello}${res}${lbl('Победители · '+sub,'s')}${list}${top10}`,
    acts:won?[{t:'Мой код',act:'go',v:'profile',gold:1},ROUTE_BTN]:[ROUTE_BTN],pn:17,cls:'chest'};
}

/* ===== Сказка-сериал ===== */
function chState(i){const c=D.CHAPTERS[i];if(st.day<c.day)return 'soon';if(!c.final&&st.day<=c.day+1)return 'vote';return 'out';}
// Кнопки «что дальше» на странице сериала: сначала то, что ждёт в сериале, потом — маршрут
function serialActs(){
  const S=serialState();
  if(S.kind==='vote')return [{t:'Читать и голосовать',act:'openCh',i:S.cur,gold:1},{t:'На маршрут',act:'go',v:'route'}];
  if(S.kind==='full')return [{t:'Читать сказку',act:'go',v:'fulltale',gold:1},{t:'На маршрут',act:'go',v:'route'}];
  return [routeNext(true),S.cur>=0?{t:'Глава '+ROMAN[S.cur],act:'openCh',i:S.cur}:null];
}
function vSerial(){
  bar('Сказка-сериал','Пишут все вместе');
  const ch=D.CHAPTERS;
  const head=`<div class="ser-head"><img class="illo" src="${A.serial}" alt="">${DESK?tale('Выходит глава — после неё герою нужно сделать выбор из трёх вариантов. Вариант, набравший больше всего голосов, ложится в основу следующей главы. И так — до финала.',true):'<p class="tale small">Выходит глава — после неё герою нужно сделать выбор из трёх вариантов. Вариант с большинством голосов ложится в основу следующей главы. И так — до финала.</p>'}</div>`;
  const stats=`<div class="stats3"><div><b>3–4 дня</b><span>новая глава</span></div><div><b>48 часов</b><span>на голосование</span></div><div><b>PDF</b><span>в финале</span></div></div>`;
  const now=`${lbl('Сейчас в сериале','s')}${serialCard(DESK)}`;
  const toc=`<div class="toc">${ch.map((c,i)=>{const s=chState(i);return `<button class="tocr ${s}" data-act="openCh" data-i="${i}" ${s==='soon'?'disabled':''}><span class="rn">${ROMAN[i]}</span><span class="rt"><b>${s==='soon'?'Скоро':c.t}</b><small>${s==='soon'?'Выйдет '+fmt(c.day):s==='vote'?(st.serial.votes[i]!=null?'Ваш голос учтён':'Идёт голосование'):c.final?'Финальная глава':`Выбор читателей: «${c.o[c.win]}»`}</small></span>${s==='vote'?`<span class="chip live">${st.serial.votes[i]!=null?'учтён':'голосуем'}</span>`:`<span class="dots"></span><span class="pg-n">${fmt(c.day,true)}</span>`}</button>`;}).join('')}
      <button class="tocr fin ${st.day<D.FULL_TALE_DAY?'soon':''}" data-act="go" data-v="fulltale" ${st.day<D.FULL_TALE_DAY?'disabled':''}><span class="rn">✦</span><span class="rt"><b>Цельная сказка</b><small>${st.day<D.FULL_TALE_DAY?'Выйдет '+fmt(D.FULL_TALE_DAY):'Читать и скачать PDF'}</small></span><span class="dots"></span><span class="pg-n">${fmt(D.FULL_TALE_DAY,true)}</span></button></div>`;
  return {pre:endBanner(),
    L:`${pt('Сказка-сериал','Пишут все вместе','h1')}${head}${stats}${now}`,
    R:`${pt('Оглавление','Шесть глав и цельная сказка')}${toc}`,
    M:`${head}${stats}${now}${lbl('Оглавление','s')}${toc}`,
    acts:serialActs(),pn:19,cls:'serial'};
}
// Голосование — прямо под текстом главы, без всплывающих окон
function voteBlock(i,cd){
  const c=D.CHAPTERS[i],s=chState(i),myv=st.serial.votes[i],open=s==='vote',nx=D.CHAPTERS[i+1];
  const frac=open?(st.day===c.day?.55:.88):1;
  const tot=Math.round(c.votes*frac)+(ui.liveBump||0)+(myv!=null?1:0);
  const cnt=c.pct.map((p,k)=>Math.round(tot*p/100)+(myv===k?1:0));
  const sum=cnt.reduce((a,b)=>a+b,0), show=myv!=null||!open;
  const lead=open?(myv==null?`Выберите вариант — большинство решит, что будет дальше. Голосование до ${fmt(c.day+1)}, 23:59\u00a0мск.`:'Спасибо! Ваш голос учтён — следите за счётчиком.')
    :`Голосование завершено. Вариант «${c.o[c.win]}» лёг в основу главы ${ROMAN[i+1]}.`;
  return `<section class="vote ${open&&myv==null?'todo':''}" id="vote">${DESK?pt('Как продолжится сказка?',open?(myv==null?'Выбор за вами':'Ваш голос учтён'):'Голосование завершено'):lbl('Как продолжится сказка?')}
    ${cd||''}<p class="tale small center">${lead}</p>
    <div class="vopts">${c.o.map((o,k)=>{const pc=Math.round(cnt[k]/sum*100);const win=!open&&k===c.win;return `<button class="vopt ${myv===k?'mine':''} ${win?'win':''}" data-act="vote" data-k="${k}" ${show?'disabled':''}>${show?`<span class="bar" style="width:${pc}%"></span>`:''}<span class="k">${'АБВ'[k]}</span><span class="vt">${o}${myv===k?'<span class="tag">ваш выбор</span>':''}${win?'<span class="tag">победил</span>':''}</span>${show?`<span class="pc">${pc}%</span>`:''}</button>`;}).join('')}</div>
    ${open&&show?`<p class="note">Голосов: <b id="vtot">${num(sum)}</b> · счётчик обновляется вживую</p>`:''}
    ${open&&myv!=null?`<p class="note">Голосование идёт до ${fmt(c.day+1)}, 23:59\u00a0мск${nx?`. Глава ${ROMAN[i+1]} выйдет ${fmt(nx.day)}`:''}</p>`:''}
  </section>`;
}
function vChapter(){
  const i=ui.chapter||0,c=D.CHAPTERS[i],s=chState(i);
  if(s==='soon')return vSerial();
  bar(`Глава ${ROMAN[i]}`,c.t,'serial');
  const myv=st.serial.votes[i],open=s==='vote',nx=D.CHAPTERS[i+1],nxOut=nx&&st.day>=nx.day,full=st.day>=D.FULL_TALE_DAY;
  let acts,note='';
  if(c.final){acts=[full?{t:'Читать сказку целиком',act:'go',v:'fulltale',gold:1}:routeNext(true),{t:'Все главы',act:'go',v:'serial'}];if(!full)note=`Цельная сказка выйдет ${fmt(D.FULL_TALE_DAY)}`;}
  else if(open&&myv==null)acts=[{t:'К голосованию',act:'toVote',gold:1,noarrow:1}];
  else{acts=[nxOut?{t:`Читать главу ${ROMAN[i+1]}`,act:'openCh',i:i+1,gold:1}:routeNext(true),{t:'Все главы',act:'go',v:'serial'}];if(nx&&!nxOut&&!open)note=`Глава ${ROMAN[i+1]} выйдет ${fmt(nx.day)}`;}
  const text=`<div class="parch story">${flowers()}${c.p.map((x,k)=>tale(x,k===0)).join('')}${c.final?'<div class="fin">Конец</div>':''}</div>`;
  const cd=open?`<div class="vote-h"><span class="chip live" id="vcd2">${countdown(c.day)}</span></div>`:'';
  const fin=c.final?`<p class="tale small center">${full?'Цельная сказка уже собрана — её можно прочитать целиком и скачать.':`Это последняя глава. Цельная сказка с инфографикой голосований выйдет ${fmt(D.FULL_TALE_DAY)}.`}</p>`:'';
  return {
    L:`${pt(c.t,`Глава ${ROMAN[i]} · ${fmt(c.day)}`,'h1')}<div class="illu"><img src="${A[c.img]}" alt=""></div>${text}`,
    R:c.final?`${pt('Последняя глава','Сказка-сериал')}${fin}`:voteBlock(i,cd),
    M:`<div class="illu"><img src="${A[c.img]}" alt=""></div>${pt(c.t,`Глава ${ROMAN[i]} · ${fmt(c.day)}`,'h1')}${cd}${text}${c.final?fin:voteBlock(i,'')}`,
    acts,dacts:open&&myv==null?[]:acts,note,pn:21,cls:'chapter'};
}
// Голосование закрывается в 23:59:59 мск на следующий день после выхода главы — 48 часов
function countdown(day){const end=new Date(2026,11,1+day+2,0,0,0);const now=new Date(dateOf(st.day).getTime()+(Date.now()-T0));let s=Math.max(0,Math.floor((end-now)/1000));const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600);s%=3600;const m=Math.floor(s/60);s%=60;return `до конца ${d?d+' д ':''}${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;}
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
// Цельная сказка: читается по главам, переключатель глав
function vFullTale(){
  bar('Большая книга сказок','Сказка-сериал · финал',ARCH()?null:'serial');
  if(st.day<D.FULL_TALE_DAY)return lockView('Цельная сказка выйдет 25 декабря','Все главы соберутся в одну сказку — её можно будет прочитать и скачать в PDF.','book');
  const ch=D.CHAPTERS, k=Math.min(ui.seg.ft||0,ch.length-1);
  const info=`<div class="infog"><div class="bign">${num(D.SERIAL_AUTHORS)}</div><div><b>человек написали эту сказку</b><span>5 голосований, ${num(ch.filter(c=>!c.final).reduce((s,c)=>s+c.votes,0))} голосов. Каждый поворот сюжета выбрали сотрудники ПСБ.</span></div></div>`;
  const winners=`<div class="winners">${ch.filter(c=>!c.final).map((c,i)=>`<div class="wr"><span class="rn">${ROMAN[i]}</span><span class="wt">${c.o[c.win]}</span><b>${c.pct[c.win]}%</b></div>`).join('')}</div>`;
  const chsel=`<div class="chsel" id="chsel">${ch.map((c,i)=>`<button class="${i===k?'on':''}" data-act="ftCh" data-i="${i}" aria-label="Глава ${i+1}"${DESK?` title="${esc(c.t)}"`:''}>${ROMAN[i]}</button>`).join('')}</div>`;
  const text=`<div class="parch story">${flowers()}${chapterHTML(ch[k],k)}${k===ch.length-1?'<div class="fin">Конец</div>':''}</div>
    <div class="chnav">${k>0?`<button class="btn btn-ghost btn-sm" data-act="ftCh" data-i="${k-1}">‹ Глава ${ROMAN[k-1]}</button>`:'<span></span>'}${k<ch.length-1?`<button class="btn btn-ghost btn-sm" data-act="ftCh" data-i="${k+1}">Глава ${ROMAN[k+1]} ›</button>`:''}</div>`;
  const pdf={t:`${svg('down','width="18" height="18"')} Скачать сказку в PDF`,act:'pdf',gold:1,noarrow:1};
  return {
    L:`${pt('Большая книга сказок','Сказка-сериал · финал','h1')}${info}${lbl('Итоги голосований','s')}${winners}${lbl('Читать по главам','s')}${chsel}<div class="cta">${btn(pdf)}</div>`,
    R:text,
    M:`${info}<details class="more"><summary>Итоги голосований</summary>${winners}</details>${chsel}${text}`,
    acts:[pdf],dacts:[],pn:23,cls:'fulltale'};
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
  const hello=say('m_zhena','Жена Михаила','устраивайтесь поудобнее. Каждую неделю я читаю две новые сказки — заходите почаще!','compact');
  const stats=`<div class="stats3"><div><b>${talesOpen()} из 10</b><span>сказок доступно</span></div><div><b>+2</b><span>каждую неделю</span></div><div><b>5–10</b><span>минут сказка</span></div></div>`;
  const tales=`<div class="tales">${D.TALES.map((t,i)=>{const lk=st.day<t.open;return `<button class="tale-r ${cur===i?'playing':''}" data-act="play" data-i="${i}" ${lk?'disabled':''}><span class="cv">${taleCover(t,i)}</span><span class="tt"><b>${t.t}</b><small>${t.n} · ${lk?'откроется '+fmt(t.open):t.d+' мин'}</small></span><span class="pl">${lk?svg('lock'):cur===i&&ui.izba.playing?svg('pause'):svg('play')}</span></button>`;}).join('')}</div>`;
  const stream=`<div class="stream"><span class="small ink2">Слушайте и вне платформы:</span><div class="row-c"><button class="btn btn-ghost btn-sm" data-act="toast" data-m="Ссылка на плейлист появится после публикации">VK Музыка</button><button class="btn btn-ghost btn-sm" data-act="toast" data-m="Ссылка на плейлист появится после публикации">Яндекс Музыка</button></div><p class="note">Сказки озвучены нейросетью</p></div>`;
  return {pre:endBanner(),
    L:`${pt('Пряничная избушка','Для детей · сказка на ночь','h1')}<img class="illo wide" src="${A.izba}" alt="">${hello}${stats}${stream}`,
    R:`${pt('Сказки на ночь',`Доступно ${talesOpen()} из 10`)}${tales}`,
    M:`<img class="illo" src="${A.izba}" alt="">${hello}${stats}${lbl('Сказки на ночь','s')}${tales}${stream}`,
    post:player,pn:25,cls:'izba'};
}
function mmss(s){s=Math.floor(s);return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
function mountIzba(){
  if(ui.izba.cur==null)return;
  const t=setInterval(()=>{if(!ui.izba.playing)return;const T=D.TALES[ui.izba.cur];ui.izba.pos=Math.min(T.d*60,ui.izba.pos+1);const b=$('#pbar'),m=$('#ptm');if(b)b.style.width=(ui.izba.pos/(T.d*60)*100)+'%';if(m)m.textContent=mmss(ui.izba.pos)+' / '+T.d+':00';},1000);timers.push(t);
}

/* ===== Рейтинг ===== */
function lbRow(x){return `<tr class="${x.me?'me':''} ${x.place<=3?'t3 p'+x.place:''}"><td class="pl"><span>${x.place}</span></td><td><div class="nm">${ava(x.nick,DESK?34:32,x.me)}<div><b>${tname(x.nick,x.city)}</b>${x.me?'<span class="tag">вы</span>':''}${x.place<=10?'<span class="merch">мерч</span>':''}</div></div></td><td class="p">${num(x.p)}</td></tr>`;}
const RULES=`<ul class="rules"><li><b>«Спроси дорогу»</b> — 20 за каждый верный ответ с первой попытки; повторное прохождение набора — без баллов</li><li><b>«Лес»</b> — 10 за каждый подарок в лучшем забеге</li><li><b>«Ёлка»</b> — 100 за первую игрушку на общей ёлке</li></ul>
  <p class="note left">Баллы дают только испытания маршрута. Сказка-сериал, Пряничная избушка и Сундук чудес — без баллов. Баллы нужны только для турнирной таблицы: в баллы магазина мерча они не переводятся. Итоги и награждение — после завершения маршрута.</p>`;
function vRating(){
  bar('Турнирная таблица','Топ-10 получают мерч');
  const lb=board(),me=lb.find(x=>x.me);
  const gap=me.place<=10?0:Math.max(10,lb[9].p-me.p+10);
  const tab=ui.seg.rt||'top';
  const from=Math.max(0,Math.min(lb.length-7,me.place-4)), near=lb.slice(from,from+7);
  const from5=Math.max(0,Math.min(lb.length-5,me.place-3)), near5=lb.slice(from5,from5+5);
  const mypos=`<div class="mypos">${ava(me.nick,DESK?72:64,true)}<div><b>${tname(me.nick,me.city)}</b><span>${me.place} место · ${num(me.p)} баллов</span><span class="gap">${me.place<=10?'Вы в топ-10 — претендуете на мерч':`До топ-10 — ${num(gap)} баллов`}</span></div></div>`;
  const earn={t:'Где ещё заработать баллы',href:href('profile','?tab=earn'),gold:1};
  return {pre:endBanner(),
    L:`${pt('Турнирная таблица','Балльно-рейтинговая система','h1')}${lbl('Топ-10 · получают мерч','s')}<table class="lb">${lb.slice(0,10).map(lbRow).join('')}</table>`,
    R:`${pt('Ваше место','Ваш результат и соседи по таблице')}${mypos}${lbl('Рядом с вами','s')}<table class="lb">${near5.map(lbRow).join('')}</table>${lbl('Как начисляются баллы','s')}${RULES}`,
    M:`${mypos}${seg('rt',[['top','Топ-10'],['near','Рядом со мной']],tab)}
      <table class="lb">${(tab==='top'?lb.slice(0,10):near).map(lbRow).join('')}</table>
      <a class="btn btn-ghost btn-block" href="${href('profile','?tab=earn')}">Где ещё заработать баллы</a>
      <details class="more"><summary>Как начисляются баллы</summary>${RULES}</details>`,
    dacts:[earn,ROUTE_BTN],pn:27,cls:'rating'};
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
    else if(qPend(i))o.push(item('quiz',`«Спроси дорогу» · набор ${i+1}`,`«${r.title}» — вы остановились на вопросе ${qPend(i).i+1} из ${n}`,`до ${n*20}`,`<button class="btn btn-gold btn-sm" data-act="goQuiz" data-i="${i}">Продолжить</button>`));
    else if(!res||!res.done)o.push(item('quiz',`«Спроси дорогу» · набор ${i+1}`,`«${r.title}» — 20 баллов за каждый верный ответ`,`до ${n*20}`,`<button class="btn btn-gold btn-sm" data-act="goQuiz" data-i="${i}">Пройти</button>`));
  });
  if(st.day<OPEN.forest)o.push(item('forest','«Лес»','Раннер откроется '+fmt(OPEN.forest),'10 за подарок',lk(OPEN.forest)));
  else o.push(item('forest','«Лес»',st.forest.runs?`Ваш рекорд — ${st.forest.bestGifts} ${plural(st.forest.bestGifts,'подарок','подарка','подарков')}. Каждый подарок сверх него — +10`:'Каждый собранный подарок — 10 баллов','10 за подарок',`<button class="btn ${st.forest.runs?'btn-ghost':'btn-gold'} btn-sm" data-act="go" data-v="forest">${st.forest.runs?'Побить рекорд':'Бежать'}</button>`));
  if(!st.tree.hung){if(st.day<OPEN.tree)o.push(item('tree','«Ёлка»','Откроется '+fmt(OPEN.tree),'100',lk(OPEN.tree)));
    else if(st.tree.rev)o.push(item('tree','«Ёлка»','Ваша игрушка на проверке — баллы начислим, когда её одобрит модератор','100',''));
    else o.push(item('tree','«Ёлка»','Первая игрушка на общей ёлке','100',`<button class="btn btn-gold btn-sm" data-act="go" data-v="tree">Сделать шар</button>`));}
  return o;
}
function vProfile(){
  bar('Личный кабинет',esc(st.user.nick));
  const u=st.user,p=pts(),lb=board(),me=lb.find(x=>x.me);
  const gap=me.place<=10?0:Math.max(10,lb[9].p-me.p+10);
  const log=[...(st.log||[])].reverse(), opp=opportunities(), tab=ui.seg.pf||'points';
  const herostats=`<div class="herostats"><div><b>${num(p.total)}</b><span>баллов</span></div><div><b>${me.place}</b><span>место${DESK?' в таблице':''}</span></div><div><b>${me.place<=10?'топ-10':num(gap)}</b><span>${me.place<=10?(DESK?'претендуете на мерч':'мерч'):'до топ-10'}</span></div></div>`;
  const mailH=u.email?`<div class="note">Продублирован на ${esc(u.email)}</div>`
    :ui.pmail?`<div class="row pmail"><input class="input ${ui.auth.err?'err':''}" id="pmail" type="email" inputmode="email" autocomplete="email" placeholder="name@mail.ru" value="${esc(ui.pmailVal)}"><button class="btn btn-ghost" data-act="pmailSend">Отправить</button></div>${ui.auth.err?`<div class="err-t">${ui.auth.err}</div>`:''}`
    :`<p class="note"><button class="link" data-act="pmailOpen">Прислать код на почту</button></p>`;
  const codebox=`<div class="codebox"><div class="lbl-s">Персональный код</div><div class="code sm">${u.code}</div>
      <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${u.code}">${svg('copy','width="14" height="14"')} Копировать</button>
      ${mailH}</div>`;
  const logoutH=`<div class="logout">${ui.logout?`<p class="small">Выйти на этом устройстве? Вернуться можно будет только по коду <b>${u.code}</b> — сохраните его.</p><div class="row-c"><button class="btn btn-ghost btn-sm" data-act="logoutNo">Остаться</button><button class="btn btn-ghost btn-sm" data-act="logout">Выйти</button></div>`:`<button class="link" data-act="logoutAsk">Выйти на этом устройстве</button>`}</div>`;
  const bysrc=`<div class="bysrc">${[['quiz',p.q],['forest',p.f],['tree',p.t]].map(([k,val])=>`<div>${por(SRC[k][1],'sm')}<span>${SRC[k][0]}</span><b>${num(val)}</b></div>`).join('')}</div>`;
  const won=st.day>=OPEN.chest&&drawWinners().some(x=>x.me);
  const prize=`<div class="cart prize">${lbl('Розыгрыш «Сундука чудес»','s')}<div class="row"><img src="${A.chest}" alt=""><div><b class="pz">${st.day<OPEN.chest?'Вы участвуете':won?'Вы среди победителей!':'Розыгрыш прошёл'}</b>
      <div class="small ink2">${st.day<OPEN.chest?'Розыгрыш — 25 декабря, среди всех помощников':won?'Для получения приза понадобится персональный код':'Победители — в «Сундуке чудес»'}</div></div></div>
      ${st.day>=OPEN.chest?`<a class="link" href="${href('chest')}">Победители розыгрыша</a>`:''}</div>`;
  const empty=`<p class="tale small">Пока пусто. Первые баллы — за квиз «Спроси дорогу».</p>`;
  const oppH=opp.length?`<div class="opps">${opp.join('')}</div>`:`<p class="tale small">Все доступные баллы собраны — осталось удержаться в таблице.</p>`;
  const oppNote=`<p class="note">Баллы в таблицу дают только испытания маршрута. Сказка-сериал, Пряничная избушка и Сундук чудес — без баллов. Баллы нужны только для таблицы и в баллы магазина мерча не переводятся. Топ-10 по итогам получают мерч.</p>`;
  if(DESK){
    const hist=log.length?`<table class="hist"><thead><tr><th>Дата</th><th>За что</th><th>Баллы</th></tr></thead><tbody>${log.map(e=>`<tr><td class="d">${fmt(e.d,true)}</td><td><b>${SRC[e.k][0]}</b><small>${esc(e.t)}</small></td><td class="p">+${num(e.p)}</td></tr>`).join('')}</tbody><tfoot><tr><td colspan="2">Итого</td><td class="p">${num(p.total)}</td></tr></tfoot></table>`:empty;
    return {L:`${pt('Личный кабинет','Карточка помощника','h1')}
        <div class="herocard">${ava(u.nick,104,true)}<div class="nk">${esc(u.nick)}</div><div class="city">${esc(u.city||'Город не указан')}</div>${herostats}</div>
        ${codebox}${logoutH}${lbl('Мои баллы')}${bysrc}${lbl('История начислений')}${hist}`,
      R:`${pt('Где ещё заработать','Баллы в турнирную таблицу')}${oppH}${prize}${oppNote}`,pn:29,cls:'profile'};
  }
  let body;
  if(tab==='history')body=log.length?`<div class="hist">${log.map(e=>`<div class="hr"><span class="d">${fmt(e.d,true)}</span><span class="w"><b>${SRC[e.k][0]}</b><small>${esc(e.t)}</small></span><span class="p">+${num(e.p)}</span></div>`).join('')}<div class="hr tot"><span class="w"><b>Итого</b></span><span class="p">${num(p.total)}</span></div></div>`:empty;
  else if(tab==='earn')body=`${oppH}${oppNote}`;
  else body=`${bysrc}${codebox}${prize}${logoutH}`;
  return {M:`<div class="pcard">${ava(u.nick,64,true)}<div><b>${esc(u.nick)}</b><span>${esc(u.city||'Город не указан')}</span></div></div>
    ${herostats}${seg('pf',[['points','Баллы'],['history','История'],['earn','Заработать']],tab)}${body}`};
}

/* ===== Архив: после 17 января ===== */
// Испытания, голосования, таблица и кабинеты закрыты. Остаются итоги платформы, цельная сказка и аудиосказки — без входа
function vArchive(){
  bar('Итоги сказки','1 декабря — 17 января');
  const votes=D.CHAPTERS.filter(c=>!c.final).reduce((x,c)=>x+c.votes,0), P=participants(), C=citiesCount(), T=treeCount();
  const S=[[num(P),'помощников'],[C,plural(C,'город','города','городов')],[num(bankTotal()),'подарков собрали в «Лесу»'],
    [num(T),plural(T,'игрушка','игрушки','игрушек')+' на общей ёлке'],[num(votes),'голосов в сказке-сериале'],[num(Math.round(P*24.6)),'ответов в квизе']];
  const hello=say('m_mikhail','Дед Мороз Михаил','спасибо, помощники! Я успел во все одиннадцать полуночей, подарки нашли своих хозяев. Сказку можно перечитать и послушать.','compact');
  const stats=`<div class="astats">${S.map(([b2,t])=>`<div><b>${b2}</b><span>${t}</span></div>`).join('')}</div>`;
  const bookC=`<div class="wcard"><img class="wim" src="${A.book}" alt=""><div class="wb"><span class="lbl-s">Сказка-сериал</span><b>Большая книга сказок</b><span>${num(D.SERIAL_AUTHORS)} сотрудников выбирали, куда повернёт сюжет: шесть глав и пять голосований</span>
    <div class="row tight">${btn({t:'Читать',act:'go',v:'fulltale',gold:1,noarrow:1,cls:'btn-sm'})}${btn({t:`${svg('down','width="16" height="16"')} PDF`,act:'pdf',cls:'btn-sm'})}</div></div></div>`;
  const izbaC=`<div class="wcard"><img class="wim" src="${A.hut}" alt=""><div class="wb"><span class="lbl-s">Для детей</span><b>Пряничная избушка</b><span>Десять аудиосказок народов России — здесь и в плейлистах VK Музыки и Яндекс Музыки</span>${btn({t:'Слушать',act:'go',v:'izba',noarrow:1,cls:'btn-sm'})}</div></div>`;
  const note=`<p class="note">Итоги турнирной таблицы и розыгрыша подведены. Испытания, голосования и личные кабинеты закрыты — спасибо всем, кто участвовал!</p>`;
  return {L:`${pt('Сказка закончилась','Новогодняя ночь длиной в страну · 1 декабря — 17 января','h1')}${hello}${stats}`,
    R:`${pt('Перечитать и послушать','Остаётся с вами')}${bookC}${izbaC}${note}`,
    M:`${pt('Сказка закончилась','1 декабря — 17 января','h1')}${hello}${stats}${lbl('Перечитать и послушать','s')}${bookC}${izbaC}${note}`,
    pn:31,cls:'archive'};
}

/* ===== Закрытый раздел ===== */
function lockView(title,text,img){
  return {one:`${pt(title,'Раздел пока закрыт','h1')}
    <img class="lock-img" src="${A[img||'clock']}" alt="">
    ${text?tale(text):''}
    <p class="note">Сейчас в прототипе — ${fmt(st.day)}. Дату можно сменить в панели «Прототип».</p>`,
    acts:[{t:'На маршрут',act:'go',v:'route',gold:1}],nbt:false};
}

/* ===== Рендер ===== */
const VIEWS={route:vRoute,profile:vProfile,quiz:vQuiz,forest:vForest,tree:vTree,final:vFinal,serial:vSerial,chapter:vChapter,fulltale:vFullTale,izba:vIzba,chest:vChest,rating:vRating};
const MOUNTS={forest:()=>{if(DESK||ui.fmode)mountForest();},chapter:mountChapter,izba:mountIzba};
const FOOT=`<div class="foot"><span class="psb">${LOGO}</span><p>Прототип платформы · Deep × ПСБ · контент и цифры — примеры</p></div>`;
function render(){
  clearTimers();
  const app=$('#app'); ui.bar=null;
  let v, root=false;
  if(st.screen==='prologue')v=vPrologue();
  else if(st.screen==='auth')v=vAuth();
  else if(st.screen==='nick')v=vNick();
  else if(st.screen==='login')v=vLogin();
  else if(ARCH()){root=true;v=st.view==='fulltale'?vFullTale():st.view==='izba'?vIzba():vArchive();}
  else {ensureUser();root=ROOTS.includes(st.view);v=(VIEWS[st.view]||vRoute)();}
  const html=compose(v), inApp=st.screen==='app';
  if(ARCH()&&inApp&&st.view==='route')document.title='Итоги сказки · Новогодняя ночь длиной в страну — ПСБ';
  document.body.dataset.screen=inApp?st.view:(st.screen==='prologue'&&!ui.bookOpen?'cover':st.screen);
  document.body.classList.toggle('desk',DESK);
  document.body.classList.toggle('tabbed',root&&!DESK);
  document.body.classList.toggle('gm-on',!DESK&&inApp&&st.view==='forest'&&!!ui.fmode);
  // Компьютер: шапка с меню, «назад» над разворотом. Телефон: верхняя панель, нижнее меню на главных разделах
  if(DESK)app.innerHTML=(inApp?header():'')+`<main class="app${inApp?'':' solo'}">${ui.bar&&ui.bar.back?crumb(ui.bar.back):''}${html}</main>`+(inApp?FOOT:'');
  else app.innerHTML=(ui.bar?appbar(ui.bar):'')+`<main class="app">${html}${root?FOOT:''}</main>`+(root?tabbar():'');
  if(inApp)(MOUNTS[st.view]||(()=>{}))();
  if(st.screen==='prologue'&&ui.bookOpen&&!DESK)mountPrologue();
  // имя героя: в списках слов — к выбранному слову
  if(st.screen==='nick')$$('.pk-list').forEach(l=>{const on=l.querySelector('.pk-i.on');if(on)l.scrollTop=on.offsetTop-l.offsetTop-l.clientHeight/2+on.offsetHeight/2;});
  if(ui.turn){app.classList.remove('turn');void app.offsetWidth;app.classList.add('turn');clearTimeout(render._t);render._t=setTimeout(()=>app.classList.remove('turn'),900);ui.turn=false;}
  renderDemo();
}
function updateHeader(){$$('.abar .chip.pts b, header.top .chip.pts b').forEach(c=>c.textContent=num(pts().total));}
function go(view,q){save();SS.set('turn',1);clearTimers();location.href=href(view,q);}
let toastT;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2600);}
function copy(t){const done2=()=>toast('Скопировано: '+t);if(navigator.clipboard&&window.isSecureContext){navigator.clipboard.writeText(t).then(done2,()=>fallback());}else fallback();function fallback(){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');done2();}catch(e){toast(t);}a.remove();}}

/* ===== Панель прототипа ===== */
const MARKS=[[0,'1 дек · старт'],[7,'8 дек · «Лес»'],[14,'15 дек · «Ёлка»'],[21,'22 дек · финал'],[24,'25 дек · розыгрыш'],[31,'1 января'],[47,'17 янв · конец'],[48,'18 янв · архив']];
const JUMPS=[['prologue','Обложка'],['nick','Имя героя'],['auth','Персональный код'],['login','Вход по коду'],['route','Маршрут'],['quiz','Квиз'],['forest','Лес'],['tree','Ёлка'],['final','Финал'],['serial','Сериал'],['chapter','Глава + голосование'],['izba','Избушка'],['chest','Сундук'],['rating','Рейтинг'],['profile','Кабинет']];
function renderDemo(){
  const el=$('#demo');
  el.innerHTML=`<button class="demo-fab" data-act="demo" aria-label="Панель прототипа">${svg('sliders')}<span>Прототип</span></button>
  ${ui.demo?`<div class="demo" role="dialog" aria-label="Панель прототипа"><button class="x" data-act="demo" aria-label="Закрыть">×</button>
    <h4>Панель прототипа</h4><p>На платформе её не будет. Двигайте дату — разделы открываются по графику запуска.</p>
    <div class="dl">Дата на платформе</div>
    <div class="dv"><b id="dlab">${fmt(st.day)}${st.day>=31?' 2027':''}</b><span class="small">${st.day<31?nyLeft():''}</span></div>
    <input type="range" min="0" max="${LAST_DAY+1}" value="${st.day}" id="dayr" aria-label="Дата">
    <div class="marks">${MARKS.map(([d,l])=>`<button data-act="setDay" data-d="${d}">${l}</button>`).join('')}</div>
    <div class="dl">Прогресс</div>
    <div class="acts"><button data-act="fillAll">Пройти всё за меня</button><button class="alt" data-act="resetAll">Сбросить</button></div>
    <div class="dl">Розыгрыш «Сундука чудес»</div>
    <div class="acts"><button class="alt" data-act="winToggle">${st.chest&&st.chest.win?'Убрать меня из победителей':'Сделать меня победителем'}</button></div>
    <div class="dl">Перейти к экрану</div>
    <div class="jump">${JUMPS.map(([k,l])=>`<button data-act="jump" data-k="${k}">${l}</button>`).join('')}</div>
    <div class="dl">Для команды</div>
    <div class="jump"><a href="admin.html" target="_blank" rel="noopener">Админка — схема разделов ↗</a></div>
    <p style="margin:14px 0 0;font-size:11px">Прототип Deep × ПСБ. Тексты, цифры и баллы — примеры для демонстрации механик.</p>
  </div>`:''}`;
  const r=$('#dayr');
  if(r){r.addEventListener('input',()=>{$('#dlab').textContent=fmt(+r.value)+(+r.value>=31?' 2027':'');});r.addEventListener('change',()=>setDay(+r.value));}
}
function setDay(d){st.day=d;ui.quizRound=null;ui.sheet=null;save();
  // в архиве открыты только итоги, книга и избушка
  if(ARCH()&&!(st.screen==='app'&&ARCH_PAGES.includes(st.view))){go('route');return;}
  render();}
async function fillAll(){
  ensureUser();
  D.QUIZ.forEach((r,i)=>{if((st.day>=r.open||i===0)&&!(st.quiz[i]&&st.quiz[i].done)){const n=r.qs.length,b=n-2;st.quiz[i]={first:b,best:b,done:true};addLog('quiz',`Набор ${i+1} «${r.title}»: ${b} из ${n} верных`,b*20);}});
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
  pickA:d=>{ui.nick.a=+d.i;if(ui.sheet){ui.sheet=null;render();}else patchNick(false);},
  pickN:d=>{ui.nick.n=+d.i;if(ui.sheet){ui.sheet=null;render();}else patchNick(false);},
  pickPair:d=>{ui.nick={a:+d.a,n:+d.n};patchNick(true);},
  pkOpen:d=>{ui.sheet=d.k==='a'?'pkA':'pkN';render();const on=$('.sheet .pk-i.on');if(on){const l=on.closest('.pk-list');l.scrollTop=on.offsetTop-l.offsetTop-l.clientHeight/2+on.offsetHeight/2;}},
  rndA:()=>{for(let t=0;t<300;t++){const a=Math.floor(Math.random()*D.ADJ.length);if(!nameTaken(a,ui.nick.n)){ui.nick.a=a;break;}}patchNick(true);},
  rndN:()=>{for(let t=0;t<300;t++){const n=Math.floor(Math.random()*NOUNS.length);if(!nameTaken(ui.nick.a,n)){ui.nick.n=n;break;}}patchNick(true);},
  regen:()=>{ui.nick=rndNick();patchNick(true);},
  mailSend:()=>{const v2=$('#email').value.trim();ui.auth.email=v2;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v2)){ui.auth.err='Похоже, в адресе ошибка — проверьте, пожалуйста';return render();}
    ui.auth.err='';ui.auth.sentTo=v2;saveDraft();render();toast('Код отправлен на '+v2);},
  mailEdit:()=>{ui.auth.sentTo=null;saveDraft();render();const e=$('#email');e&&e.focus();},
  saveNick:()=>{if(nameTaken(ui.nick.a,ui.nick.n)){toast('Такое имя уже есть — выберите свободное');const st2=$('#nkStat');if(st2)st2.scrollIntoView({block:'center',behavior:'smooth'});return;}const city=($('#city').value||'').trim();ui.city=city;const n=nickOf(ui.nick);ui.pending={nick:n.nick,g:n.g,city};saveDraft();go('auth');},
  codeNext:()=>{if(!ui.auth.sentTo){ui.svOk=false;ui.sheet='savecode';render();return;}ACT.codeGo();},
  toMail:()=>{ui.sheet=null;render();const e=$('#email');if(e){e.scrollIntoView({block:'center',behavior:reduced()?'auto':'smooth'});e.focus({preventScroll:true});}},
  codeGo:()=>{ui.sheet=null;const p=ui.pending;
    // новый участник начинает с чистого листа; прежний (если был на этом устройстве) остаётся на «сервере»
    if(st.user){REG.put(snapshot());const day=st.day;st=fresh(day);}
    st.user={email:ui.auth.sentTo||'',nick:p.nick,g:p.g,city:p.city,code:ui.auth.code,confirmed:true};st.draft=null;REG.put(snapshot());SS.del('demo');flash(`Добро пожаловать в сказку, ${p.nick}!`);goBack();},
  toLogin:(d,e,ev)=>{ev&&ev.preventDefault&&ev.preventDefault();saveDraft();go('login');},
  login:()=>{const inp=$('#logincode');const raw=inp?inp.value:'';ui.login.code=raw;const code=normCode(raw);
    const fail=m=>{ui.login.err=m;render();const i=$('#logincode');if(i)i.focus();};
    if(!/^PSB-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(code))return fail('Код выглядит иначе: PSB и восемь букв и цифр, например PSB-7KQ2-M9XA');
    const rec=st.user&&st.user.code===code?snapshot():REG.get(code);
    if(rec&&st.user&&st.user.code!==code)REG.put(snapshot());
    if(!rec)return fail('Такой код не найден. Проверьте буквы и цифры — или начните сказку заново');
    const day=st.day;st=Object.assign(fresh(day),rec);st.draft=null;ui.login={code:'',err:''};SS.del('demo');flash(`С возвращением, ${st.user.nick}!`);goBack();},
  logoutAsk:()=>{ui.logout=true;render();}, logoutNo:()=>{ui.logout=false;render();},
  logout:()=>{REG.put(snapshot());const day=st.day;st=fresh(day);save();flash('Вы вышли. Вернуться можно по персональному коду');go('cover');},
  pmailOpen:()=>{ui.pmail=true;ui.auth.err='';render();const e=$('#pmail');if(e)e.focus();},
  pmailSend:()=>{const el=$('#pmail');const v2=(el?el.value:'').trim();ui.pmailVal=v2;
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v2)){ui.auth.err='Похоже, в адресе ошибка — проверьте, пожалуйста';return render();}
    ui.auth.err='';ui.pmail=false;st.user.email=v2;save();render();toast('Код отправлен на '+v2);},
  sheetOpen:d=>{ui.sheet=d.v;render();}, sheetClose:()=>{ui.sheet=null;render();},
  seg:d=>{ui.seg[d.k]=d.v;render();},
  // квиз
  qRound:d=>{ui.quiz=null;st.qrun=null;save();ui.quizRound=+d.i;render();},
  qStart:()=>{const r=ui.quizRound||0,part=st.qpart&&st.qpart[r];
    if(part){ui.quiz=Object.assign({},part);delete st.qpart[r];}else ui.quiz={r,i:0,correct:0,answered:false,pick:null,replay:!!(st.quiz[r]&&st.quiz[r].done)};st.qrun=Object.assign({},ui.quiz);save();ui.sheet=null;ui.turn=true;render();window.scrollTo(0,0);},
  qPick:d=>{const q=ui.quiz;if(q.answered)return;q.pick=+d.i;q.answered=true;if(q.pick===D.QUIZ[q.r].qs[q.i].a)q.correct++;st.qrun=Object.assign({},q);save();ui.sheet=DESK?null:'explain';render();},
  qNext:()=>{const q=ui.quiz,R=D.QUIZ[q.r];ui.sheet=null;
    if(q.i<R.qs.length-1){q.i++;q.answered=false;q.pick=null;st.qrun=Object.assign({},q);save();ui.turn=true;render();window.scrollTo(0,0);return;}
    // в зачёт — первая попытка; повтор только обновляет «лучший» для статистики, без баллов
    const prev=st.quiz[q.r],n=R.qs.length;
    if(prev&&prev.done){q.gain=0;q.replay=true;prev.best=Math.max(prev.best||0,q.correct);}
    else{q.gain=q.correct*20;if(q.gain>0)addLog('quiz',`Набор ${q.r+1} «${R.title}»: ${q.correct} из ${n} верных`,q.gain);st.quiz[q.r]={first:q.correct,best:q.correct,done:true};}
    st.qrun=null;q.finished=true;ui.turn=true;save();render();window.scrollTo(0,0);},
  goQuiz:d=>go('quiz','?set='+(+d.i+1)),
  qAgain:()=>{ui.quiz=null;ui.quizRound=null;st.qrun=null;save();ui.turn=true;render();window.scrollTo(0,0);},
  // лес
  fPlay:()=>{ui.fmode=true;render();},
  fStart:()=>{if(!game)mountForest();const ov=$('#ov');if(ov)ov.classList.add('hidden');const fn=$('#fin');if(fn)fn.classList.remove('hidden');game.start();},
  fAgain:()=>{ui.fmode=true;render();},
  fExit:(d,e,ev)=>{ev&&ev.preventDefault&&ev.preventDefault();if(game&&game.state.run){game.finish();return;}if(DESK)return;ui.fmode=false;render();window.scrollTo(0,0);},
  fLite:(d,e,ev)=>{ev&&ev.preventDefault();if(!DESK){ui.fmode=true;render();}startLite();},
  // ёлка
  tStyle:d=>{ui.tree.style=+d.i;render();},
  tStep:(d,e,ev)=>{ev&&ev.preventDefault();ui.tree.step=+d.s;ui.turn=true;render();window.scrollTo(0,0);},
  tSample:d=>setTreeSrc(AI[d.k]||A[d.k]),
  tMake:()=>makeBall(),
  treeRot:d=>rotateTree(+d.d), treeMine:()=>{if(ui.treeSide!==0)rotateTree(-1,0);},
  // «Повесить» = отправить на проверку: у всех игрушка появится после модерации, баллы — тогда же
  tHang:()=>{if(!ui.pubOk)return;ui.treeSide=0;st.tree.rev={ball:ui.tree.ball,style:ui.tree.style||0};st.tree.made++;save();ui.tree.step=0;ui.pubOk=false;ui.turn=true;render();window.scrollTo({top:0,behavior:'smooth'});toast('Отправили игрушку модератору — после проверки она появится на ёлке у всех');},
  tDownload:()=>download(ui.tree.ball,'novogodnyaya-igrushka.png'),
  tDownloadMine:()=>download(mineBall(),'novogodnyaya-igrushka.png'),
  cardDl:async()=>{toast('Готовим карточку…');const p=pts();const url=await renderHeroCard(st.user,{words:quizWords(),gifts:st.forest.bestGifts,points:p.total},st.tree.ball);download(url,'kartochka-geroya.png');},
  // сериал
  openCh:d=>go('chapter','?ch='+(+d.i+1)),
  vote:d=>{const i=ui.chapter;if(st.serial.votes[i]!=null)return;st.serial.votes[i]=+d.k;save();render();toast('Голос учтён');},
  toVote:()=>{const el=$('#vote');if(el)el.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});},
  ftCh:d=>{ui.seg.ft=+d.i;render();const s=DESK?$('.fulltale .pg.pr'):$('#chsel');if(s&&(!DESK||s.getBoundingClientRect().top<70))s.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});},
  pdf:()=>{const w=window.open('','_blank');if(!w){toast('Разрешите всплывающие окна, чтобы скачать PDF');return;}
    w.document.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Большая книга сказок — ПСБ</title><style>body{font:16px/1.7 Georgia,serif;max-width:680px;margin:40px auto;padding:0 24px;color:#222}h1{text-align:center;font-size:30px}p.sub{text-align:center;color:#777}</style></head><body><h1>Большая книга сказок</h1><p class="sub">Эту сказку написали ${num(D.SERIAL_AUTHORS)} сотрудников ПСБ</p>${fullTaleHTML(true)}<script>setTimeout(()=>print(),300)<\/script></body></html>`);w.document.close();},
  // избушка
  play:d=>{const i=+d.i;if(ui.izba.cur===i){ui.izba.playing=!ui.izba.playing;}else{ui.izba={cur:i,playing:true,pos:0};}render();},
  pp:()=>{ui.izba.playing=!ui.izba.playing;render();},
  // панель прототипа
  demo:()=>{ui.demo=!ui.demo;renderDemo();},
  setDay:d=>setDay(+d.d),
  fillAll:()=>fillAll(),
  winToggle:()=>{ensureUser();st.chest.win=!st.chest.win;save();ui.demo=false;render();toast(st.chest.win?'Вы среди победителей розыгрыша — итоги с 25 декабря':'Вы больше не среди победителей розыгрыша');},
  resetAll:()=>{if(!confirm('Сбросить прогресс прототипа и начать с обложки?'))return;if(st.user)REG.put(snapshot());const day=st.day;st=fresh(day);go('cover');},
  jump:d=>{const k=d.k;SS.set('demo',1);
    if(k==='nick')st.draft=null;
    else if(k==='auth'){if(st.draft)st.draft.auth=null;}
    else if(k!=='prologue'&&k!=='login')ensureUser();
    go(k==='prologue'?'cover':k);}
};
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(a&&!a.dataset.act&&!a.target&&e.button===0&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey&&/^[\w-]+\.html(\?|$)/.test(a.getAttribute('href'))){save();SS.set('turn',1);}});
document.addEventListener('click',e=>{const t=e.target.closest('[data-act]');if(!t||t.disabled)return;const fn=ACT[t.dataset.act];if(fn){if(t.tagName==='A')e.preventDefault();fn(t.dataset,t,e);}});
document.addEventListener('keydown',e=>{
  if(e.key==='Enter'&&e.target.id==='email')ACT.mailSend();
  if(e.key==='Enter'&&e.target.id==='logincode')ACT.login();
  if(e.key==='Enter'&&e.target.id==='pmail')ACT.pmailSend();
  if(e.key==='Escape'){if(ui.sheet){ui.sheet=null;render();}else if($('#gm .sheet'))ACT.fAgain();}
});
document.addEventListener('change',e=>{
  // галочки-подтверждения: «код сохранён» и «можно показать на ёлке»
  if(e.target.id==='svOk'){ui.svOk=e.target.checked;$$('[data-act=codeGo]').forEach(b=>b.disabled=!ui.svOk);}
  if(e.target.id==='pubOk'){ui.pubOk=e.target.checked;$$('[data-act=tHang]').forEach(b=>b.disabled=!ui.pubOk);}
  if(e.target.id==='file'){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>setTreeSrc(r.result);r.readAsDataURL(f);}
});
document.addEventListener('input',e=>{if(e.target.classList.contains('pk-q')){filterPk(e.target);const l=e.target.closest('.pk-box').querySelector('.pk-list');if(l)l.scrollTop=0;}if(e.target.id==='city'){ui.city=e.target.value;saveDraft();const r=$('#nkRow');if(r&&ui.nick)r.innerHTML=nkRow(nickOf(ui.nick).nick);const n=$('#cityNote');if(n)n.textContent=cityNote(ui.city);}});
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
  else if(PAGE==='nick'||PAGE==='auth'||PAGE==='login'){st.screen=PAGE;}
  else {st.screen='app';st.view=PAGE;}
}
// После входа или создания героя — туда, куда человек шёл по ссылке (например, на главу сериала из рассылки)
function goBack(){const b=SS.get('back');SS.del('back');save();SS.set('turn',1);clearTimers();location.href=b&&/^[\w-]+\.html(\?[\w=&%-]*)?$/.test(b)?b:href('route');}
const ONB=['cover','prologue','nick','auth','login'], STEPS1=['nick','auth','login'];
function guard(){
  // Флаг панели «Прототип» живёт, пока идёт знакомство (имя → код), и снимается на любом другом экране
  const demo=SS.get('demo');if(!STEPS1.includes(PAGE))SS.del('demo');
  // После 17 января — архив: итоги, книга сказок и избушка открыты всем, остальные адреса ведут на итоги
  if(ARCH()){if(!ARCH_PAGES.includes(PAGE)){location.replace(href('route'));return true;}return false;}
  // Без героя в разделы не попасть: запоминаем адрес и ведём на обложку, после входа вернём
  if(!st.user&&!ONB.includes(PAGE)&&!demo){SS.set('back',(location.pathname.split('/').pop()||'')+location.search);location.replace(href('cover'));return true;}
  // Герой уже есть — повторно проходить знакомство и вход не нужно
  if(st.user&&STEPS1.includes(PAGE)&&!demo){location.replace(href('route'));return true;}
  return false;
}
(function boot(){
  if(guard())return;
  approveToy();
  applyPage();
  if(PAGE==='quiz'){const n=+QS.get('set');if(n>=1&&n<=D.QUIZ.length&&st.day>=D.QUIZ[n-1].open){ui.quizRound=n-1;if(st.qrun&&st.qrun.r!==n-1)stashRun();
      if(!st.qrun&&st.qpart&&st.qpart[n-1]){st.qrun=st.qpart[n-1];delete st.qpart[n-1];}}
    // незавершённый набор: возвращаем к тому же вопросу
    if(st.qrun){ui.quiz=Object.assign({},st.qrun);ui.quizRound=st.qrun.r;}}
  if(PAGE==='chapter'){const n=+QS.get('ch');if(n>=1&&n<=D.CHAPTERS.length)ui.chapter=n-1;else{let i=0;D.CHAPTERS.forEach((c,j)=>{if(st.day>=c.day)i=j;});ui.chapter=i;}}
  if(PAGE==='profile'){const t=QS.get('tab');if(['points','history','earn'].includes(t))ui.seg.pf=t;}
  if(SS.get('turn')){SS.del('turn');ui.turn=true;}
  render();
  if(PAGE==='nick'||PAGE==='auth')saveDraft();
  const m=SS.get('toast');if(m){SS.del('toast');setTimeout(()=>toast(m),350);}
})();
// Вернулись кнопкой «Назад» из кэша браузера — перечитываем состояние, оно могло измениться на другой странице
window.addEventListener('pageshow',e=>{if(!e.persisted)return;try{st=Object.assign(fresh(),JSON.parse(localStorage.getItem(KEY)||'null')||{});}catch(err){}if(guard())return;applyPage();ui.fmode=false;ui.logout=false;render();});
// Переход через 900 px (поворот планшета, изменение окна) — перерисовываем под другой режим
// Короткие ложные срабатывания (масштаб, снимок экрана, промежуточные размеры окна) игнорируем: перерисовка — только если режим держится 150 мс
let mqT;const onMQ=()=>{clearTimeout(mqT);mqT=setTimeout(()=>{const m=MQ.matches;if(m===DESK)return;DESK=m;ui.sheet=null;if(DESK)ui.fmode=false;render();},150);};
if(MQ.addEventListener)MQ.addEventListener('change',onMQ);else MQ.addListener(onMQ);
