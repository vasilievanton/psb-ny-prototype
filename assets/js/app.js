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
  jump:'<path d="M12 20V5M5 12l7-7 7 7"/>',
  boost:'<path d="M4 6l6 6-6 6M12 6l6 6-6 6"/>',
  rotate:'<rect x="2" y="9" width="20" height="12" rx="2.5"/><path d="M6.5 6.5a8 8 0 0 1 11 0"/><path d="M17.5 2.8v3.7h-3.7"/>',
  photo:'<rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M8 6l2-3h4l2 3"/>',
  snd:'<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  sndOff:'<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>'
};
function svg(n,a=''){return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ${a}>${I[n]}</svg>`;}
const ICON_STAR='<svg viewBox="0 0 24 24" width="16" height="16"><path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7.1L12 17.3 5.8 21l1.6-7.1L2 9.2l7.1-.6z" fill="#f3c96b"/></svg>';
const STAR_SM=ICON_STAR.replace('width="16" height="16"','width="12" height="12"');
const ICON_GIFT='<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="12" rx="1.5" fill="#d8423a"/><rect x="2" y="7" width="20" height="4" rx="1" fill="#e5574d"/><rect x="10.5" y="7" width="3" height="14" fill="#f6d27a"/><path d="M12 7C9 2 5 4 7 7M12 7c3-5 7-3 5 0" stroke="#f6d27a" stroke-width="2" fill="none"/></svg>';
// Логотип ПСБ для тёмного фона — из брендбука банка (Лого_RGB → Без дескриптора → dark theme). Не перекрашивать
const LOGO='<svg class="psb-logo" xmlns="http://www.w3.org/2000/svg" viewBox="719.99 477.87 479.43 125" role="img" aria-label="ПСБ"><path fill="#ff6200" d="M803.15,477.87l-41.49,41.78h41.49v83.22l41.84-41.43v-83.57h-41.84Z"/><path fill="#8d87ff" d="M761.83,602.87l41.49-41.78h-41.49v-83.22l-41.84,41.43v83.57h41.84Z"/><path fill="#fff" d="M1160.4,573.06h-24.01v-24.69h24.01c9.14,0,13.39,3.92,13.39,12.26s-4.24,12.42-13.39,12.42ZM1110.43,483.31v114.44h51.27c24.33,0,37.72-13.41,37.72-37.11s-13.39-36.95-37.72-36.95h-25.31v-15.2h55.69v-25.18h-81.65ZM1019.31,540.37c0-20.11,11.1-33.84,26.94-33.84,11.92,0,21.23,7.68,23.35,20.27h27.11c-2.78-27.47-23.35-45.77-50.46-45.77-31.68,0-54.05,24.85-54.05,59.34s22.37,59.34,54.05,59.34c27.44,0,48.17-18.96,50.62-46.76h-27.27c-1.63,13.24-11.11,21.25-23.35,21.25-15.84,0-26.94-13.73-26.94-33.84ZM887.37,483.31v114.44h26.62v-88.77h38.21v88.77h26.45v-114.44h-91.28Z"/></svg>';
const PSB=`<span class="psb">${LOGO}</span><i class="vr" aria-hidden="true"></i>`;

/* ===== Состояние ===== */
const KEY='psb-ny-proto-v6';
function fresh(day){return {screen:'prologue',view:'route',day:day==null?14:day,user:null,
  quiz:{},forest:{best:0,bestGifts:0,gifts:0,runs:0},tree:{style:0,ball:null,made:0,on:false,ok:false,pts:false},
  serial:{votes:{}},chest:{win:false,seen:false},log:[]};}
let st;try{st=Object.assign(fresh(),JSON.parse(localStorage.getItem(KEY)||'null')||{});}catch(e){st=fresh();}
function save(){try{localStorage.setItem(KEY,JSON.stringify(st));}catch(e){try{const c=Object.assign({},st,{tree:Object.assign({},st.tree,{ball:null})});localStorage.setItem(KEY,JSON.stringify(c));}catch(e2){}}}
const AUTH0=()=>({code:null,email:'',err:'',sentTo:null});
// Имитация сервера: участники по персональному коду. На платформе это база на бэкенде (README, раздел 11)
const REGKEY='psb-ny-proto-codes';
const REG={all(){try{return JSON.parse(localStorage.getItem(REGKEY)||'{}')||{};}catch(e){return {};}},
  get(c){return this.all()[c]||null;},
  put(s){if(!s||!s.user)return;const a=this.all();a[s.user.code]=s;try{localStorage.setItem(REGKEY,JSON.stringify(a));}catch(e){try{a[s.user.code]=Object.assign({},s,{tree:Object.assign({},s.tree,{ball:null})});localStorage.setItem(REGKEY,JSON.stringify(a));}catch(e2){}}}};
function snapshot(){const {user,quiz,forest,tree,serial,chest,log,qrun,qpart}=st;return JSON.parse(JSON.stringify({user,quiz,forest,tree,serial,chest,log,qrun:qrun||null,qpart:qpart||{}}));}
// Код можно ввести в любом регистре, без дефисов и без «PSB»; кириллические двойники латинских букв
// (набрали в русской раскладке) заменяем на латиницу
const CYR={'А':'A','В':'B','Е':'E','К':'K','М':'M','Н':'H','О':'O','Р':'P','С':'C','Т':'T','Х':'X','У':'Y'};
function normCode(v){let x=String(v||'').toUpperCase().replace(/[АВЕКМНОРСТХУ]/g,c=>CYR[c]).replace(/[^A-Z0-9]/g,'');
  if(x.length===8)x='PSB'+x;
  return x.length===11&&x.startsWith('PSB')?`PSB-${x.slice(3,7)}-${x.slice(7)}`:x;}
const ui={auth:AUTH0(),nick:null,pending:null,city:'',cityQ:null,cityErr:false,treeSide:0,quiz:null,quizRound:null,turn:false,
  tree:{step:1,src:null,style:0,ball:null},chapter:null,izba:{cur:null,playing:false,pos:0},svOk:false,rulesOk:false,pubOk:true,demo:false,
  sheet:null,seg:{ft:0},fmode:false,bar:null,login:{code:'',err:''},logout:false,pmail:false,pmailVal:'',ball:null};
/* ===== Страницы ===== */
// Каждый экран — отдельная HTML-страница. Общее состояние живёт в localStorage, переходы — обычные ссылки.
const PAGE=document.body.dataset.page||'cover';
const PAGES={cover:'index.html',prologue:'index.html',nick:'hero.html',auth:'code.html',login:'login.html',route:'route.html',quiz:'quiz.html',forest:'forest.html',tree:'tree.html',chest:'chest.html',serial:'serial.html',chapter:'chapter.html',fulltale:'tale.html',izba:'izba.html',rating:'rating.html',profile:'profile.html'};
const QS=new URLSearchParams(location.search);
// Режим вёрстки: телефон (основной) или компьютер — от 900 px в ширину. Телефон, повёрнутый горизонтально, остаётся телефоном, даже если экран шире 900 px:
// компьютер — это ещё и окно выше 540 px или управление мышью. То же условие — в медиазапросах style.css
const MQ=window.matchMedia('(min-width:900px) and (min-height:541px), (min-width:900px) and (hover:hover) and (pointer:fine)');
let DESK=MQ.matches;
// Сессионные флаги, которые переходят на следующую страницу: анимация перелистывания и всплывающее сообщение
const SS={get(k){try{return JSON.parse(sessionStorage.getItem('psb-'+k));}catch(e){return null;}},set(k,v){try{sessionStorage.setItem('psb-'+k,JSON.stringify(v));}catch(e){}},del(k){try{sessionStorage.removeItem('psb-'+k);}catch(e){}}};
function href(view,q){return (PAGES[view]||'route.html')+(q||'');}
function flash(m){SS.set('toast',m);}
// Черновик персонажа: живёт между страницами «Имя героя» и «Персональный код», после «В путь» удаляется
function saveDraft(){st.draft={nick:ui.nick,city:ui.city,cityQ:ui.cityQ,pending:ui.pending,auth:{code:ui.auth.code,email:ui.auth.email,sentTo:ui.auth.sentTo}};save();}
if(st.draft){ui.nick=st.draft.nick||null;ui.city=st.draft.city||'';ui.cityQ=st.draft.cityQ!=null?st.draft.cityQ:null;ui.pending=st.draft.pending||null;ui.auth=Object.assign(AUTH0(),st.draft.auth||{});}
let game=null, timers=[];
function clearTimers(){timers.forEach(t=>clearInterval(t));timers=[];if(game){game.destroy();game=null;ForestSound.musicPause();}}

/* ===== Производные ===== */
// Квиз: в таблицу идёт результат первой попытки, повторные прохождения — без баллов
function qFirst(r){return r?(r.first!=null?r.first:(r.best||0)):0;}
// Незаконченная первая попытка не сбрасывается, если уйти в другой набор: данные ответы засчитаны, набор продолжится с того же места
function stashRun(){const q=st.qrun;if(q&&!q.replay)(st.qpart=st.qpart||{})[q.r]=Object.assign({},q);st.qrun=null;}
function qPend(i){return st.qrun&&st.qrun.r===i?st.qrun:(st.qpart&&st.qpart[i])||null;}
function anyPend(){return st.qrun||(st.qpart&&Object.values(st.qpart)[0])||null;}
function pts(){const q=Object.values(st.quiz).reduce((s,r)=>s+qFirst(r)*20,0);const f=(st.forest.bestGifts||0)*10;const t=st.tree.pts?100:0;const s=Object.keys(st.serial.votes||{}).length*VOTE_PTS;return {q,f,t,s,total:q+f+t+s};}
// Разделы открываются в 00:00 мск указанного дня (день 0 — 1 декабря). chest — розыгрыш «Сундука чудес», 25 декабря
const OPEN={quiz:0,forest:7,tree:14,chest:24};
// Голос в сказке-сериале: баллы за каждый голос в окне голосования, в том числе за реакцию на финальную главу (рабочее предложение, как 20 / 10 / 100)
const VOTE_PTS=20;
const done={quiz:()=>Object.values(st.quiz).some(r=>r.done),forest:()=>st.forest.runs>0,tree:()=>!!st.tree.pts};
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
// Город выбирается только из справочника: подсказки по мере ввода, свой вариант не принимается
const CITY_IDX=D.CITIES.map(([n])=>({n,k:n.toLowerCase().replace(/ё/g,'е')}));
const cityNorm=v=>String(v||'').trim().replace(/\s+/g,' ').toLowerCase().replace(/ё/g,'е');
function cityFind(v){const k=cityNorm(v);const c=k&&CITY_IDX.find(x=>x.k===k);return c?c.n:'';}
function citySug(v){const k=cityNorm(v);if(!k)return [];const pre=[],inn=[];
  for(const c of CITY_IDX){if(c.k.startsWith(k)){pre.push(c.n);if(pre.length>=8)break;}else if(inn.length<8&&c.k.includes(k))inn.push(c.n);}
  return pre.concat(inn).slice(0,8);}
function cityQ(){return ui.cityQ!=null?ui.cityQ:ui.city;}
function cityNote(){const q=cityQ();if(ui.cityErr)return 'Выберите город из списка или оставьте поле пустым';
  if(!cityNorm(q)||ui.city)return 'Начните вводить и выберите город из списка — он добавится к имени в турнирной таблице';
  return citySug(q).length?'Выберите город из списка':'Такого города нет в списке. Выберите ближайший или оставьте поле пустым';}
function citySugHTML(){const q=cityQ();if(!cityNorm(q)||ui.city===q)return '';const L=citySug(q);
  return L.map(n=>`<button type="button" class="city-o" role="option" data-act="citySel" data-v="${esc(n)}">${esc(n)}</button>`).join('');}
// Обновить поле города без перерисовки экрана: подсказки, превью строки таблицы, подпись под полем
function patchCity(){const box=$('#citySug'),inp=$('#city'),n=$('#cityNote'),r=$('#nkRow');
  if(box){const h=citySugHTML();box.innerHTML=h;box.hidden=!h;if(inp)inp.setAttribute('aria-expanded',h?'true':'false');}
  if(inp)inp.classList.toggle('err',!!ui.cityErr);
  if(n){n.textContent=cityNote();n.className=ui.cityErr?'err-t':'note left';}
  if(r&&ui.nick)r.innerHTML=nkRow(nickOf(ui.nick).nick);
  placeCitySug();}
// Подсказки — вниз от поля, если хватает места до панели кнопок (на компьютере — до края страницы книги), иначе — вверх
function placeCitySug(){const box=$('#citySug'),inp=$('#city');if(!box||!inp||box.hidden)return;
  const r=inp.getBoundingClientRect(),vh=window.visualViewport?visualViewport.height:innerHeight;
  let lim=vh-8;const ab=!DESK&&$('.actbar');if(ab)lim=Math.min(lim,ab.getBoundingClientRect().top-6);
  const pg=DESK&&inp.closest('.pg');if(pg)lim=Math.min(lim,pg.getBoundingClientRect().bottom-40);
  const top=DESK?72:64,below=lim-r.bottom-6,above=r.top-top-6,need=Math.min(286,box.scrollHeight);
  const up=below<need&&above>below;box.classList.toggle('up',up);box.style.maxHeight=Math.max(120,Math.min(286,up?above:below))+'px';}
function tname(nick,city){const g=cityGen(city);return esc(nick)+(g?` <span class="from">из\u00a0${esc(g)}</span>`:'');}
function addLog(k,t,p){(st.log=st.log||[]).push({d:st.day,k,t,p});}
function nyLeft(){const d=NY_DAY-st.day;return d>0?`до Нового года ${d} ${plural(d,'день','дня','дней')}`:'С Новым годом!';}
function giftsTotal(){const k=st.day-6;return (k>0?Math.round(k*9137+k*k*210):0)+(st.forest.gifts||0);}
function participants(){return Math.min(16800,Math.round(2100+st.day*520));}
function citiesCount(){return Math.min(74,31+st.day*2);}
function treeCount(){const mine=st.tree.on&&st.tree.ok?1:0;return st.day<OPEN.tree?mine:Math.round(1200+(st.day-OPEN.tree)*610)+mine;}
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
// Повторы имён допускаются: в турнирной таблице имя стоит вместе с городом.
// Случайное имя не предлагает тавтологий вроде «Морозный Мороз» или «Звёздная Звезда»
const ODD=new Set(['зимний|зима','вьюжный|вьюга','снежный|снеговик','снежный|снегурочка','лесной|леший']);
function nameOdd(a,n){const x=D.ADJ[a][0].toLowerCase().replace(/ё/g,'е'),y=NOUNS[n].w.toLowerCase().replace(/ё/g,'е');return x.slice(0,4)===y.slice(0,4)||ODD.has(x+'|'+y);}
const rndI=k=>Math.floor(Math.random()*k);
function rndNick(){for(let t=0;t<200;t++){const x={a:rndI(D.ADJ.length),n:rndI(NOUNS.length)};if(!nameOdd(x.a,x.n))return x;}return {a:0,n:0};}
// Аватар — инициалы имени. Своя картинка не загружается: фото — персональные данные
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
// Сцена — главная и регистрация в стиле «Леса»: вместо книжной рамки — снежные панели поверх ночной поляны (фон — у body.scene в style.css)
// Содержимое — строка (одна панель) или массив (каждый кусок — своя панель со своей снежной шапкой, между ними видна поляна).
// stage — то, что стоит прямо на поляне над панелями: заголовок, табличка с именем
function scenePanel(inner,cls){return `<section class="sp ${cls||''}"><div class="sp-in">${inner}</div></section>`;}
function scenePanels(x,cls){return (Array.isArray(x)?x:[x]).filter(Boolean).map(p=>scenePanel(p,cls)).join('');}
function sceneStage(st){return st?`<div class="sc-stage">${st}</div>`:'';}
function sceneBook(L,R,o={}){return `${sceneStage(o.stage)}${o.top?`<div class="scn wide ${o.cls||''}">${scenePanels(o.top,'spw')}</div>`:''}<div class="scn two ${o.cls||''}"><div class="sc-col">${scenePanels(L,'spl')}</div><div class="sc-col">${scenePanels(R,'spr')}</div></div>`;}
function sceneLeaf(C,o={}){return `${sceneStage(o.stage)}${o.top?`<div class="scn wide ${o.cls||''}">${scenePanels(o.top,'spw')}</div>`:''}<div class="scn one ${o.cls||''}">${scenePanels(C)}</div>`;}
const addTail=(x,t)=>t?(Array.isArray(x)?[...x.slice(0,-1),x[x.length-1]+t]:x+t):x;   // «Что дальше» — в последнюю панель
// Сборка экрана под текущий режим
function compose(v){
  if(typeof v==='string')return v;
  if(v.raw!=null)return v.raw;
  const pre=v.pre||'',post=v.post||'';
  if(!DESK){
    const M=v.M!=null?v.M:v.one!=null?v.one:(v.L||'')+(v.R||'');
    return pre+(v.scene?`<div class="scn m ${v.cls||''}">${sceneStage(v.stage)}${scenePanels(M)}</div>`:page(M,{cls:v.cls,sun:v.sun}))+actbar(v.acts||[],v.note)+(v.sheet||'')+post;
  }
  const acts=((v.dacts!==undefined?v.dacts:v.acts)||[]).filter(Boolean);
  const nbH=acts.length?nextBar(acts,v.dnote!==undefined?v.dnote:v.note,v.nbt):'';
  if(v.L==null&&v.one!=null)return pre+(v.scene?sceneLeaf(addTail(v.one,nbH),{cls:v.cls,stage:v.dstage,top:v.top}):leaf(v.one+nbH,{cls:v.cls}))+post;
  // мир сказки одной широкой колонкой: над панелями — то, что стоит на поляне (подводка, шапка испытания)
  if(v.scene&&v.wide!=null)return pre+sceneStage(v.dstage)+`<div class="scn wide ${v.cls||''}">${scenePanels(addTail(v.wide,nbH),'spw')}</div>`+post;
  return pre+(v.scene?sceneBook(v.L||'',addTail(v.R||'',nbH),{cls:v.cls,stage:v.dstage,top:v.top})+(v.full?`<div class="scn wide ${v.cls||''}">${scenePanel(v.full,'spw')}</div>`:'')
    :book(v.L||'',(v.R||'')+nbH,{pn:v.pn,cls:v.cls,full:v.full}))+post;
}

// Неразрывные связки: тире и «·» не начинают строку, короткие слова и цифры не висят в конце строки
function nb(t){const w=String(t).split(' ');return w.map((x,i)=>i<w.length-1?x+(/^[А-Яа-яЁё\d]{1,2}$/.test(x)||/^[—–·]$/.test(w[i+1])?'\u00a0':' '):x).join('');}
// Заголовок: золотое тиснение, под ним — золотая линейка и подзаголовок капителью
function pt(t,sub,tag){
  tag=tag||'h2';
  return `<header class="pt"><${tag} class="ttl"><span class="g">${esc(nb(t))}</span></${tag}><div class="rule"></div>${sub?`<div class="sub">${nb(sub)}</div>`:''}</header>`;
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
    ${ARCH()?'<span class="chip date">Сказка завершилась 17 января</span>':`<span class="chip pts" title="Баллы в турнирной таблице">${ICON_STAR} <b>${num(pts().total)}</b></span>
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

/* ===== Обложка =====
   Вход на платформу — уже в мире сказки, на ночной поляне: название, иллюстрация, кнопка «Стать помощником».
   Пролога нет: завязку рассказывает главная, где её прочитают */
function vCover(){
  const cta=st.user?`${btn({t:'Продолжить: '+esc(st.user.nick),act:'enter',gold:1,cls:'btn-lg'})}`
    :`${btn({t:'Стать помощником Деда Мороза',act:'startAuth',gold:1,cls:'btn-lg'})}<button class="link" data-act="toLogin">У меня уже есть код</button>`;
  return {raw:`<div class="cover-wrap"><section class="sp cvp"><div class="sp-in"><div class="cv">
    <div class="cv-top">${PSB}<span>для сотрудников банка</span></div>
    <h1 class="cv-title"><span>Новогодняя ночь</span><span>длиной в страну</span></h1>
    <div class="cv-rule"></div>
    <div class="cv-win"><img src="${A.hero}" alt="Сотрудники входят в новогоднюю сказку"></div>
    <p class="cv-sub">Сказка, в которую попадает каждый сотрудник</p>
    <div class="cv-cta">${cta}</div>
  </div></div></section>${footLinks()}</div>`,scene:1};
}

/* ===== Правила, поддержка, «Как играть» — окном на компьютере, шторкой на телефоне, с любого экрана ===== */
const SUPPORT_MAIL='[почта поддержки]';   // адрес — после согласования с банком
const CODE_DEADLINE=OPEN.chest-1;          // ввести код на внутренней платформе ПСБ — до 24 декабря, 23:59 мск (дата — по согласованию с банком)
function footLinks(){return `<p class="foot-l"><a class="link" href="#" data-act="sheetOpen" data-v="rules">Правила</a><span>·</span><a class="link" href="#" data-act="sheetOpen" data-v="support">Поддержка</a></p>`;}
function rulesHTML(){
  return `<div class="info"><h3 class="info-t">Правила</h3><ul class="info-l">
    <li><b>Кто участвует.</b> Сотрудники ПСБ. Участник — герой: имя из двух слов и персональный код. Регистрации нет, личных данных мы не собираем.</li>
    <li><b>Сроки.</b> ${fmt(0)} 2026 — ${fmt(LAST_DAY)} 2027. Всё новое открывается в 00:00 по Москве.</li>
    <li><b>Баллы.</b> Спроси дорогу — 20 за верный ответ с первой попытки. Лес — 10 за подарок в лучшем забеге. Ёлка — 100, когда вы впервые повесите игрушку на общую ёлку. Сказка-сериал — ${VOTE_PTS} за голос. Баллы нужны только для турнирной таблицы и в баллы магазина мерча не переводятся.</li>
    <li><b>Турнирная таблица.</b> Десять лучших по итогам получают мерч. При равных баллах выше тот, кто набрал их раньше.</li>
    <li><b>Розыгрыш ${fmt(OPEN.chest)}.</b> Подарки разыгрываются среди тех, кто до ${fmt(CODE_DEADLINE)}, 23:59 мск ввёл свой код на внутренней платформе ПСБ. Победителей выбирает случай.</li>
    <li><b>Код.</b> Персональный код — единственный ключ к герою: по нему входят с другого устройства и подтверждают приз. Сохраните его.</li>
  </ul><p class="note">Полные правила — после согласования с банком</p></div>`;
}
function supportHTML(){
  return `<div class="info"><h3 class="info-t">Поддержка</h3>
    <p class="tale small">Что-то не работает или потерялся код — напишите нам: <b>${SUPPORT_MAIL}</b>. Отвечаем в рабочие дни.</p>
    <p class="note">Если при создании героя вы присылали код на почту, он есть в письме. Без кода вернуть героя нельзя — поэтому мы просим его сохранить.</p></div>`;
}
// Спроси дорогу: перед набором — окно «Готовы?» с правилами (как у Леса). Начатый набор продолжается сразу, без окна
function qRulesHTML(){
  const r=ui.quizRound||0, R=D.QUIZ[r], res=st.quiz[r], n=R.qs.length, again=!!(res&&res.done);
  const rows=['Местные называют слово на своём языке или диалекте — выберите, что оно значит. Есть и вопросы про узоры: чей это край?',
    'После ответа Младший сын расскажет, откуда слово и что оно значит. Ошибаться не страшно.',
    again?'Повтор — для себя, без баллов: в зачёте остаётся первая попытка.':`${n} вопросов, за каждый верный ответ с первой попытки — 20 баллов.`,
    'Бросили набор на середине — продолжите с того же вопроса.'];
  return `<div class="info qrules"><h3 class="info-t">Готовы?</h3><p class="qr-set">Набор ${ROMAN[r]} · ${R.title}</p>
    <ul class="info-l">${rows.map(x=>`<li>${nb(x)}</li>`).join('')}</ul>
    ${again?`<div class="ov-rec"><div class="ov-pill">${ICON_STAR}<div><span>В зачёте</span><b>${qFirst(res)} из ${n}</b></div></div></div>`:''}
    <div class="qr-a">${btn({t:again?'Пройти ещё раз':'Расспросить местных',act:'qGo',gold:1})}</div></div>`;
}
// шар с общей ёлки — поближе: картинка и кто его повесил
function ballHTML(){
  const b=ui.ball||{};
  if(b.me)return `<div class="info ballv"><img class="bv-img" src="${mineBall()}" alt=""><b class="bv-n">Ваша игрушка</b><span class="bv-c">${st.tree.ok?'Висит на общей ёлке — её видят все':'На проверке — у всех появится после модерации'}</span></div>`;
  const pic=b.b>=0?`<img class="bv-img" src="${A['ball'+b.b]}" alt="">`:`<span class="bv-ball" style="--c:${esc(b.col)}"><b>${esc(initials(b.n))}</b></span>`;
  return `<div class="info ballv">${pic}<b class="bv-n">${esc(b.n)}</b>${b.c?`<span class="bv-c">${esc(b.c)}</span>`:''}</div>`;
}
// окно поверх любого экрана: правила, поддержка, «Как играть» у испытаний, шар с ёлки
function infoSheet(){
  const k=ui.sheet;if(!k)return '';
  const x=k==='rules'?rulesHTML():k==='support'?supportHTML():k==='ball'?ballHTML():k==='tale'?taleHTML():k==='qrules'?qRulesHTML():'';
  return x?(DESK?modal(x,{cls:'infom'+(k==='tale'?' talem':'')}):sheet(x,{cls:'infos'+(k==='tale'?' tales-s':'')})):'';
}

/* ===== Формирование персонажа: шаг 1 — имя ===== */
function nkRow(nick){return `<span class="pl">—</span>${ava(nick,32,true)}<span class="n">${tname(nick,ui.city)} <span class="tag">вы</span></span><span class="p">0</span>`;}
const NK_AVA=()=>DESK?96:72;
const lc=w=>String(w).toLowerCase().replace(/ё/g,'е');
// Длинное имя («Смекалистый Можжевельник») — на табличке кегль меньше, чтобы слова не вылезали
const nkLong=n=>n.length>=19||n.split(' ').some(w=>w.length>=11);
function pkItem(k,i,w,on){return `<button class="pk-i${on?' on':''}" data-act="${k==='a'?'pickA':'pickN'}" data-i="${i}" data-w="${lc(w)}"><span>${w}</span></button>`;}
// Списки слов по темам; у первого слова форма — по роду второго
function pkItems(k){
  const g=NOUNS[ui.nick.n].g;
  if(k==='a')return D.ADJ_G.map((t,gi)=>`<div class="pk-g">${t}</div>`+D.ADJ.map((x,i)=>x[2]===gi?pkItem('a',i,x[g],i===ui.nick.a):'').join('')).join('');
  return D.NOUN_G.map((t,gi)=>`<div class="pk-g">${t}</div>`+NOUNS.map((x,j)=>x.gr===gi?pkItem('n',j,x.w,j===ui.nick.n):'').join('')).join('');
}
function pkBox(k,head){return `<div class="pk-box">${head||''}<input class="input pk-q" type="search" placeholder="Найти слово" autocomplete="off" aria-label="Найти слово"><div class="pk-list" data-k="${k}">${pkItems(k)}</div></div>`;}
function vNick(){
  if(!ui.nick||ui.nick.a>=D.ADJ.length||ui.nick.n>=NOUNS.length)ui.nick=rndNick();
  const cur=nickOf(ui.nick);
  bar('Имя героя','Шаг 1 из 2','cover');
  const plate=`<div class="nickplate">${flowers()}<div class="hint">Ваше игровое имя</div><div class="nk${nkLong(cur.nick)?' long':''}" id="nkText">${esc(cur.nick)}</div></div>`;
  const hint=`<p class="note">Имя видно в турнирной таблице вместе с городом</p>`;
  const dice=(act,l)=>`<button class="dice" data-act="${act}" aria-label="${l}" title="${l}">${svg('dice')}</button>`;
  const sug=citySugHTML();
  const city=`<div class="field"><span id="cityLbl">Ваш город — по желанию</span>
      <div class="city-box"><input class="input${ui.cityErr?' err':''}" id="city" placeholder="Начните вводить, например, Казань" value="${esc(cityQ())}" autocomplete="off" autocorrect="off" spellcheck="false"
        role="combobox" aria-labelledby="cityLbl" aria-autocomplete="list" aria-controls="citySug" aria-expanded="${sug?'true':'false'}">
        <div class="city-sug" id="citySug" role="listbox" aria-labelledby="cityLbl"${sug?'':' hidden'}>${sug}</div></div></div>
    <p class="${ui.cityErr?'err-t':'note left'}" id="cityNote">${cityNote()}</p>`;
  const preview=`${lbl('Так вас увидят в турнирной таблице','s')}<div class="lbmini prev"><div class="r me" id="nkRow">${nkRow(cur.nick)}</div></div>`;
  const regen=`<button class="btn btn-ghost btn-block" data-act="regen">${svg('dice','width="18" height="18"')} Другое имя</button>`;
  const acts=[{t:'Дальше: персональный код',act:'saveNick',gold:1}];
  // Компьютер: одна колонка сверху вниз, без деления на левую и правую части — табличка с именем, выбор слов, город, превью в таблице
  if(DESK)return {
    one:`${pt('Имя героя','Шаг 1 из 2','h1')}
      <div class="nick-hero"><img class="mascot" src="${A.bear_juggler}" alt=""><div class="nick-prev"><span id="nkAva">${ava(cur.nick,NK_AVA(),true)}</span>${plate}</div></div>${hint}
      ${regen}
      <div class="pk2">${pkBox('a',`<div class="phd"><span>Первое слово</span>${dice('rndA','Случайное первое слово')}</div>`)}${pkBox('n',`<div class="phd"><span>Второе слово</span>${dice('rndN','Случайное второе слово')}</div>`)}</div>
      ${city}${preview}`,
    acts,nbt:false,dnote:'Уже участвуете? <a class="link" href="#" data-act="toLogin">Войти по коду</a>',cls:'onb nick',scene:1};
  // Телефон: два поля-выбора; список слов с поиском — в шторке
  const picker=(k,l,w)=>`<button class="picker" data-act="pkOpen" data-k="${k}"><span class="pk-tx"><span class="pk-l">${l}</span><b id="pk${k.toUpperCase()}">${esc(w)}</b></span>${svg('chev','width="18" height="18"')}</button>`;
  const N=NOUNS[ui.nick.n];
  const sh=ui.sheet==='pkA'||ui.sheet==='pkN'?sheet(`<h3 class="pk-t">${ui.sheet==='pkA'?'Первое слово':'Второе слово'}</h3>${pkBox(ui.sheet==='pkA'?'a':'n')}`,{cls:'pksheet'}):'';
  // табличка с именем стоит прямо на поляне, выбор слов — на снежной панели под ней
  return {stage:`<div class="nk-prev"><span id="nkAva">${ava(cur.nick,NK_AVA(),true)}</span>${plate}</div>`,
    M:`${hint}${regen}<div class="pickers">${picker('a','Первое слово',D.ADJ[ui.nick.a][N.g])}${picker('n','Второе слово',N.w)}</div>
    ${city}${preview}<p class="note">Уже участвуете? <a class="link" href="#" data-act="toLogin">Войти по коду</a></p>`,acts,sheet:sh,scene:1};
}
// Выбор слова без перерисовки экрана: обновляем табличку, превью, статус и списки (прокрутка и поиск сохраняются)
function patchNick(scroll){
  const cur=nickOf(ui.nick), g=cur.g;
  saveDraft();
  const set=(sel,f)=>{const el=$(sel);if(el)f(el);};
  set('#nkRow',el=>el.innerHTML=nkRow(cur.nick));
  set('#nkText',el=>{el.textContent=cur.nick;el.classList.toggle('long',nkLong(cur.nick));});set('#nkAva',el=>el.innerHTML=ava(cur.nick,NK_AVA(),true));set('#nkHint',el=>el.textContent=`«${initials(cur.nick)}»`);
  set('#pkA',el=>el.textContent=D.ADJ[ui.nick.a][g]);set('#pkN',el=>el.textContent=NOUNS[ui.nick.n].w);
  $$('.pk-list[data-k=a] .pk-i').forEach(b=>{const i=+b.dataset.i,w=D.ADJ[i][g];b.classList.toggle('on',i===ui.nick.a);b.dataset.w=lc(w);b.innerHTML=`<span>${w}</span>`;});
  $$('.pk-list[data-k=n] .pk-i').forEach(b=>b.classList.toggle('on',+b.dataset.i===ui.nick.n));
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
// Почта — по желанию и только личная: рабочую почту ПСБ указать нельзя (список доменов — в настройках админки)
const WORK_DOMAINS=['psbank.ru'];
function workMail(v){const d=(String(v).toLowerCase().split('@')[1]||'').trim();return WORK_DOMAINS.some(w=>d===w||d.endsWith('.'+w));}
function mailErr(v){if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))return 'Похоже, в адресе ошибка — проверьте, пожалуйста';if(workMail(v))return 'Это рабочая почта ПСБ — укажите, пожалуйста, личную';return '';}
// Розыгрыш — среди тех, кто ввёл код на внутренней платформе ПСБ: напоминаем сразу, как только код выдан
function portalHTML(){return `<div class="portal"><img src="${A.chest}" alt=""><div><b>Введите код на внутренней платформе ПСБ</b><span>${nb(`До ${fmt(CODE_DEADLINE)}, 23:59 мск — тогда вы участвуете в розыгрыше подарков ${fmt(OPEN.chest)}`)}</span><button class="link" data-act="portal">Открыть внутреннюю платформу</button></div></div>`;}
// «Сохраните код»: «В путь» — после галочки «Да, код точно сохранён»
function svReady(){return ui.svOk;}
function vAuth(){
  const a=ui.auth;
  if(!a.code)a.code=genCode('PSB');
  if(!ui.pending){const n=nickOf(ui.nick||rndNick());ui.pending={nick:n.nick,g:n.g,city:''};}
  const sent=a.sentTo;
  bar('Персональный код','Шаг 2 из 2','nick');
  const hero=`<div class="code-hero"><img class="mascot" src="${A.bear_archer}" alt="">${tale(`${ui.pending.nick}, это ваш персональный код. По нему можно войти с другого устройства — например, с рабочего компьютера.`)}</div>`;
  const code=`<div class="codebox"><div class="lbl-s">Персональный код</div><div class="code">${a.code}</div>
      <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${a.code}">${svg('copy','width="15" height="15"')} Скопировать</button></div>`;
  const mail=`<p class="tale small">Можно прислать код себе на личную почту — больше она ни для чего не используется.</p>
    <div class="field">
      ${sent?`<div class="sent">${svg('check','width="16" height="16"')}<span>Отправили код на <b>${esc(sent)}</b></span><button class="link" data-act="mailEdit">Изменить</button></div>`
      :`<div class="row"><input class="input ${a.err?'err':''}" id="email" type="email" inputmode="email" autocomplete="email" placeholder="name@mail.ru" value="${esc(a.email)}" aria-label="Личная почта"><button class="btn btn-ghost" data-act="mailSend">Отправить</button></div>
        ${a.err?`<div class="err-t">${a.err}</div>`:''}`}
    </div>`;
  const agree=`<label class="chk agree"><input type="checkbox" id="rulesOk"${ui.rulesOk?' checked':''}><span>Принимаю <a class="link" href="#" data-act="sheetOpen" data-v="rules">правила</a></span></label>`;
  const acts=[{t:'В путь',act:'codeNext',gold:1,cls:ui.rulesOk?'':'is-off'}];   // без галочки кнопка выглядит неактивной, а по нажатию показывает, чего не хватает
  // Почту не указали — перед стартом просим сохранить код: он единственный ключ к прогрессу
  const save=ui.sheet==='savecode'?`<div class="savecode"><h3 class="sv-t">Сохраните код</h3>
      <div class="codebox"><div class="code">${a.code}</div><button class="btn btn-ghost btn-sm" data-act="copy" data-t="${a.code}">${svg('copy','width="15" height="15"')} Скопировать</button></div>
      <p class="sv-w"><b>Это ваш единственный ключ к герою.</b> Без него не получится войти с другого устройства или после выхода.</p>
      <p class="note">Скопируйте код, сделайте скриншот или запишите. Надёжнее всего — прислать его себе на почту.</p>
      <label class="chk"><input type="checkbox" id="svOk"${ui.svOk?' checked':''}><span>Да, код точно сохранён</span></label>
      <div class="sv-acts">${btn({t:'В путь',act:'codeGo',gold:1,disabled:!svReady()})}${btn({t:'Прислать на почту',act:'toMail',noarrow:1})}</div></div>`:'';
  if(DESK)return {one:`${pt('Персональный код','Шаг 2 из 2','h1')}${hero}${code}${portalHTML()}${lbl('Почта — по желанию','s')}${mail}${agree}`,
    acts,nbt:false,dnote:'<a class="link" href="#" data-act="toNick">Изменить имя</a>',cls:'onb',post:save?modal(save):'',scene:1};
  return {stage:hero,M:[`${code}${portalHTML()}`,`${lbl('Почта — по желанию','s')}${mail}${agree}<p class="note"><a class="link" href="#" data-act="toNick">Изменить имя</a></p>`],acts,sheet:save?sheet(save):'',scene:1};
}

/* ===== Вход по коду — для тех, кто уже создал героя: другое устройство или после выхода ===== */
function vLogin(){
  bar('Вход по коду','Для тех, кто уже в сказке','cover');
  const L=ui.login;
  const lhero=`<div class="code-hero"><img class="mascot" src="${A.bear_archer}" alt="">${tale('Введите персональный код — его выдали, когда вы создавали героя. Если указывали почту, код есть в письме.')}</div>`;
  const form=`${DESK?lhero:''}
    <label class="field"><span>Персональный код</span>
      <input class="input code-in ${L.err?'err':''}" id="logincode" placeholder="PSB-XXXX-XXXX" value="${esc(L.code)}" autocomplete="off" autocapitalize="characters" autocorrect="off" spellcheck="false" maxlength="20"></label>
    ${L.err?`<div class="err-t">${L.err}</div>`:''}
    <p class="note left">Регистр не важен, дефисы можно не ставить</p>`;
  // «Нет кода?» — к созданию героя; уже выбранное имя (черновик) сохраняется
  const alt='Нет кода? <a class="link" href="#" data-act="toNick">Стать помощником Деда Мороза</a>';
  const acts=[{t:'Войти',act:'login',gold:1}];
  if(DESK)return {one:`${pt('Вход по коду','Для тех, кто уже в сказке','h1')}${form}`,acts,nbt:false,dnote:alt,scene:1};
  return {stage:lhero,M:`${form}<p class="note">${alt}</p>`,acts,scene:1};
}

/* ===== Маршрут (главная) =====
   Сверху — подводка: название проекта, завязка сценой-комиксом и три пункта о том, что здесь происходит.
   Ниже — карта: тропа через три испытания-плитки (картинка с сутью активности, персонаж выглядывает из угла, сюжетная подпись,
   состояние и одна кнопка — золотая только у следующего шага). От тропы — ветки к сказке-сериалу и Пряничной избушке,
   у третьего испытания — общая ёлка банка (10–20 шаров, их можно открыть), под ёлкой — Сундук чудес */
const STOPS=[
  {k:'quiz',n:1,l:'Квиз',t:'Спроси дорогу',d:'Узнайте у местных, куда ушёл Михаил: в каждом краю говорят по-своему',m:'m_mlad',who:'Младший сын',art:'tile_quiz'},
  {k:'forest',n:2,l:'Игра',t:'Лес',d:'В тайге порвался мешок с подарками — помогите их собрать',m:'m_star',who:'Старший сын',art:'art_forest',pos:'50% 14%'},
  {k:'tree',n:3,l:'Творчество',t:'Ёлка',d:'Подарки собраны — осталось нарядить общую ёлку банка',m:'m_doch',who:'Дочь',art:'tile_tree'}
];
// Состояние плитки: cls — locked / done, note — строка о прогрессе, live — оранжевая метка, cta — кнопка
function stopState(s,now){
  const P=pts(), b=(t,o)=>btn(Object.assign({t,act:'go',v:s.k,cls:'btn-sm',noarrow:1,gold:now?1:0},o||{}));
  if(st.day<OPEN[s.k])return {cls:'locked',cta:soonChip(OPEN[s.k])};
  if(s.k==='quiz'){
    const R=D.QUIZ, isDone=i=>st.quiz[i]&&st.quiz[i].done, nd=R.filter((r,i)=>isDone(i)).length;
    const pq=anyPend();
    if(pq)return {note:`Набор ${pq.r+1}: вопрос ${pq.i+1} из ${R[pq.r].qs.length}`,cta:b('Продолжить',{act:'goQuiz',i:pq.r})};
    const f=R.findIndex((r,i)=>st.day>=r.open&&!isDone(i));
    if(f>=0&&!nd)return {cta:b('Начать',{act:'goQuiz',i:f})};
    const got=`Пройдено ${nd} из ${R.length} · +${num(P.q)} баллов`;
    if(f>=0)return {cls:'done',live:'новый набор',note:got,cta:b(`Пройти набор ${f+1}`,{act:'goQuiz',i:f})};
    const nx=R.find(r=>st.day<r.open);
    return {cls:'done',note:got+(nx?` · следующий набор ${fmt(nx.open,true)}`:''),cta:b('Ещё раз')};
  }
  if(s.k==='forest'){
    if(!done.forest())return {cta:b('Начать')};
    const g=st.forest.bestGifts;
    return {cls:'done',note:`Рекорд ${g} ${plural(g,'подарок','подарка','подарков')} · +${num(P.f)} баллов`,cta:b('Ещё раз')};
  }
  // ёлка: одна игрушка на участника; баллы — когда её впервые повесили на общую ёлку
  if(!st.tree.ball)return {cta:b('Украсить')};
  if(!st.tree.pts)return {note:'Игрушка готова — повесьте её на ёлку',cta:b('Повесить')};
  return {cls:'done',note:`Ваша игрушка на ёлке · +${num(P.t)} баллов`,cta:b('Смотреть')};
}
// Закрыто до даты — плашка вместо кнопки
function soonChip(day){return `<span class="rt-soon">${svg('lock','width="13" height="13"')}<span>Откроется ${fmt(day,!DESK)}</span></span>`;}
function stopCard(s,ns){
  const now=s.k===ns, S=stopState(s,now);
  return `<article class="mp-stop ${S.cls||''}${now?' now':''}" data-k="${s.k}">
    <img class="mp-med" src="${A['med'+s.n]}" alt="Испытание ${s.n}">${S.cls==='done'?`<span class="mp-ok">${svg('check','width="11" height="11" stroke-width="3"')}</span>`:''}
    <div class="mp-art"><img class="mp-pic" src="${A[s.art]}"${s.pos?` style="object-position:${s.pos}"`:''} alt=""><span class="mp-who" title="${s.who}"><img src="${A[s.m]}" alt="${s.who}"></span></div>
    <div class="mp-b">${S.live?`<span class="chip live">${S.live}</span>`:''}<span class="rt-l">${s.l}</span><h3 class="mp-t">${s.t}</h3><p class="mp-d">${nb(s.d)}</p>
      ${S.note?`<span class="rt-s">${S.cls==='done'?svg('check','width="13" height="13" stroke-width="2.6"'):''}<span>${nb(S.note)}</span></span>`:''}<div class="mp-a">${S.cta}</div></div>
  </article>`;
}
// Главное действие на сегодня — ключ раздела или null, если ждём открытия
function nextStep(){
  if(anyPend()||!done.quiz())return 'quiz';
  if(st.day>=OPEN.forest&&!done.forest())return 'forest';
  if(st.day>=OPEN.tree&&!done.tree())return 'tree';
  if(st.day>=OPEN.chest&&!st.chest.seen)return 'chest';
  if(D.QUIZ.some((r,i)=>st.day>=r.open&&!(st.quiz[i]&&st.quiz[i].done)))return 'quiz';   // вышел новый набор квиза
  return null;
}
// Кнопка «дальше по маршруту» для экранов вне маршрута (сериал, глава)
const STEP_NAME={quiz:'Спроси дорогу',forest:'Лес',tree:'Ёлка',chest:'Сундук чудес'};
function routeNext(gold){const k=nextStep();return k?{t:`Дальше: ${STEP_NAME[k]}`,act:'go',v:k,gold:gold?1:0}:{t:'На маршрут',act:'go',v:'route',gold:gold?1:0};}
// Сказка-сериал: что происходит сейчас
function serialState(){
  let cur=-1;D.CHAPTERS.forEach((c,i)=>{if(st.day>=c.day)cur=i;});
  const full=st.day>=D.FULL_TALE_DAY;
  if(cur<0)return {cur,full,kind:'none'};
  const c=D.CHAPTERS[cur],s=chState(cur),voted=st.serial.votes[cur]!=null,nx=D.CHAPTERS[cur+1];
  const live=s==='vote'&&!full;
  return {cur,full,c,nx,live,voted,kind:full?'full':live?(voted?'voted':'vote'):'read'};
}
function talesOpen(){return D.TALES.filter(t=>st.day>=t.open).length;}
// Ветка «Сказка-сериал»: главы раз в 3–4 дня, сюжет решает голосование
function serialSt(){
  const S=serialState(), ch=D.CHAPTERS, cur=S.cur, c=S.c;
  let txt, b=null, live='';
  if(S.kind==='none')txt=`Первая глава выйдет ${fmt(ch[0].day)}`;
  else if(S.kind==='vote'){txt=`Глава ${ROMAN[cur]} вышла — выберите, куда повернёт сюжет. Голосование до ${fmt(c.day+1)}, 23:59 мск`;b={t:'Читать и голосовать',act:'openCh',i:cur,gold:1};live='голосование';}
  else if(S.kind==='voted'){txt=`Ваш голос за главу ${ROMAN[cur]} учтён. Итоги — ${fmt(c.day+2)}`;b={t:'Ход голосования',act:'openCh',i:cur};}
  else if(S.kind==='full'){txt='Все шесть глав собраны в Большую книгу сказок';b={t:'Читать сказку',act:'go',v:'fulltale'};}
  else {txt=S.nx?`Глава ${ROMAN[cur]} вышла. Глава ${ROMAN[cur+1]} — ${fmt(S.nx.day)}`:`Финальная глава вышла. Вся сказка — ${fmt(D.FULL_TALE_DAY)}`;b={t:`Читать главу ${ROMAN[cur]}`,act:'openCh',i:cur};}
  const prog=`<div class="sr-prog" aria-label="Главы сериала">${ch.map((x,i)=>`<span class="${chState(i)}${i===cur&&!S.full?' cur':''}">${ROMAN[i]}</span>`).join('')}<span class="${S.full?'out':'soon'}">✦</span></div>`;
  return `<section class="mp-st st-serial${live?' hot':''}"><div class="mp-sth"><img class="mp-si" src="${A.serial}" alt=""><div><span class="rt-l">Пишем сказку вместе</span><h3 class="mp-t">Сказка-сериал</h3>
      <span class="rt-p">${STAR_SM}${VOTE_PTS} баллов за каждый голос</span></div></div>
    ${live?`<span class="chip live">${live}</span>`:''}<p class="mp-x">${nb(txt)}</p>${prog}
    ${b?`<div class="mp-a">${btn(Object.assign({cls:'btn-sm',noarrow:1},b))}</div>`:''}</section>`;
}
// Ветка «Пряничная избушка»: аудиосказки народов России, две новые каждую неделю
function izbaSt(){
  const T=D.TALES, n=talesOpen(), nx=T.find(t=>st.day<t.open);
  return `<section class="mp-st st-izba"><div class="mp-sth"><img class="mp-si" src="${A.hut}" alt=""><div><span class="rt-l">Аудиосказки на ночь</span><h3 class="mp-t">Пряничная избушка</h3></div></div>
    <p class="mp-x">${nb(`Сказки народов России читает Настасья Петровна. ${nx?`Открыто ${n} из ${T.length}, следующие — ${fmt(nx.open)}`:`Открыты все ${T.length} сказок`}`)}</p>
    <div class="mp-a">${btn({t:'Слушать',act:'go',v:'izba',cls:'btn-sm',noarrow:1})}</div></section>`;
}
// Общая ёлка банка на главной: 16 шаров коллег и своя игрушка у верхушки; шар можно открыть. Под ёлкой — Сундук чудес
function treeSt(ns){
  const open=st.day>=OPEN.tree, tc=treeCount(), mine=st.tree.on?mineBall():null;
  const tree=open?treeSVG(mine,sideBalls(0).slice(0,16),901):treeSVG(null,[],901);
  const lead=open?`${num(tc)} ${plural(tc,'игрушка','игрушки','игрушек')} от сотрудников со всей страны`:`Наряжаем вместе с ${fmt(OPEN.tree)}`;
  const cta=!open?soonChip(OPEN.tree):btn({t:st.tree.pts?'Смотреть всю ёлку':'Повесить свою игрушку',act:'go',v:'tree',cls:'btn-sm',noarrow:1});
  const out=st.day>=OPEN.chest, fresh=out&&!st.chest.seen;
  const chest=`<div class="mp-chest"><img class="mp-ci" src="${A.chest}" alt="">
    <div class="mp-cb"><span class="rt-l">Под ёлкой</span><b class="mp-ct">Сундук чудес${fresh?' <span class="chip live">итоги</span>':''}</b>
      <span class="mp-cs">${nb(out?'Розыгрыш прошёл — посмотрите, кому достались подарки':`Розыгрыш подарков — ${fmt(OPEN.chest)}`)}</span>
      ${btn({t:out?'Итоги розыгрыша':'Как пройдёт розыгрыш',act:'go',v:'chest',cls:'btn-sm',noarrow:1,gold:ns==='chest'?1:0})}</div></div>`;
  return `<section class="mp-st st-tree"><div class="mp-sth"><div><span class="rt-l">Наряжаем вместе</span><h3 class="mp-t">Общая ёлка банка</h3></div></div>
    <p class="mp-x">${nb(lead)}</p><div class="mp-tree" id="mtree">${tree}</div>
    ${open?`<p class="note">${DESK?'Нажмите на шар — увидите его поближе и кто его повесил':'Нажмите на шар — увидите его поближе'}</p>`:''}
    <div class="mp-a">${cta}</div>${chest}</section>`;
}
// Первый экран главной: картинка на фоне, сбоку — название проекта и короткое описание (завязка)
const HERO_LEAD='В новогоднюю ночь Дед Мороз — медведь Михаил Потапыч — идёт через всю страну с востока на запад. Одиннадцать полуночей за одну ночь, и в каждом краю говорят <span class="nw">по-своему</span>. Одному не успеть — нужен помощник, и это вы.';
function heroHTML(){
  return `<section class="hero"><img class="hero-pic" src="${A.story}" alt="Дед Мороз Михаил Потапыч спешит через всю страну, за ним — одиннадцать часов с полуночью">
    <div class="hero-in"><h1 class="sc-t">Новогодняя ночь длиной в${'\u00a0'}страну</h1><p class="hero-lead">${nb(HERO_LEAD)}</p></div></section>`;
}
// Второй экран — карта: заголовок на поляне, ниже панель с тропой
function mapHead(){
  return `<div class="map-h"><h2 class="sc-t">Маршрут помощника</h2><p class="map-sub">${nb('Три испытания открываются по датам — проходите в любом порядке. За каждое — баллы в турнирную таблицу')}</p></div>`;
}
function vRoute(){
  bar('Маршрут');
  const ns=nextStep();
  // карта: тропа через три испытания; на компьютере ветки — справа от тропы, на телефоне — под своими испытаниями
  const rows=[[STOPS[0],serialSt()],[STOPS[1],izbaSt()],[STOPS[2],treeSt(ns)]];
  const map=`<div class="map">${rows.map(([s,x],i)=>`<div class="mp-row r${i+1}">${stopCard(s,ns)}<i class="mp-br" aria-hidden="true"></i>${x}</div>`).join('')}</div>`;
  const head=mapHead();
  return {pre:endBanner()+heroHTML(),wide:[map],M:[map],cls:'home',dstage:head,stage:head,scene:1};
}

/* ===== Испытания: шапка — снежная панель на всю ширину (как у Леса) =====
   Слева — название и подводка: что здесь происходит. Справа — картинка: герой-проводник что-то говорит, реплика — в облачке.
   «Как играть» в шапке нет: в Спроси дорогу и Лесе правила — в окне перед стартом, в Ёлке их рассказывают шаги.
   На телефоне картинка — сверху, подводка — под ней, название раздела — в верхней панели */
const QUIZ_LEAD='Чтобы понять, куда идти и где сейчас Михаил, нужно расспросить местных. Но в каждом краю говорят <span class="nw">по-своему</span>: одна просит принести шаньги, другой упоминает камусы, третий зовёт к айрану. Помогите младшему сыну разобраться в словах — не поймёшь слова, не найдёшь тропу.';
const FOREST_LEAD='В тайге мешок Деда Мороза зацепился за еловый сук и порвался — подарки рассыпались по всему лесу. Михаилу нельзя задерживаться: впереди ещё десять полуночей. Помогите его старшему сыну собрать подарки, пока их не замело снегом.';
const TREE_LEAD='Подарки собраны, и Михаил помчался их развозить. Дома осталось последнее дело — нарядить ёлку. В этом году она общая, на весь банк: игрушки на неё вешают сотрудники со всей страны. Дочь Михаила ждёт и вашу.';
const HERO={
  quiz:{t:'Спроси дорогу',img:'quiz_head',alt:'Младший сын Михаила расспрашивает местных у указателя',lead:QUIZ_LEAD,say:'Спросим дорогу!'},
  forest:{t:'Лес',img:'forest_head',alt:'Старший сын Михаила зовёт собирать подарки из порванного мешка',lead:FOREST_LEAD,say:'Бежим собирать!'},
  tree:{t:'Ёлка',img:'tree_head',alt:'Дочь Михаила наряжает ёлку',lead:TREE_LEAD,say:'Нарядим вместе!'}
};
function actHero(k,say){
  const h=HERO[k];
  return `<div class="act-hero ah-${k}"><div class="ah-txt">${DESK?`<h1 class="sc-t">${h.t}</h1>`:''}<p class="ah-lead">${nb(h.lead)}</p></div>
    <div class="ah-pic"><img src="${A[h.img]}" alt="${h.alt}"><span class="ah-say">${nb(say||h.say)}</span></div></div>`;
}

/* ===== Спроси дорогу — квиз =====
   Шапка испытания, ниже — одно окно сверху вниз: слово или узор → варианты → пояснение с картинкой → «Следующий вопрос».
   Кнопка — после пояснения: так его читают */
function roundsList(R){
  return `<div class="rounds">${D.QUIZ.map((r,i)=>{const lk=st.day<r.open;const res=st.quiz[i];return `<button class="rnd ${R===i?'on':''}" data-act="qRound" data-i="${i}" ${lk?'disabled':''}><span class="rn">${ROMAN[i]}</span><span class="rt"><b>${r.title}</b><small>${lk?'Откроется '+fmt(r.open):res&&res.done?`В зачёте: ${qFirst(res)} из ${r.qs.length} · повтор без баллов`:qPend(i)?`Начат: вопрос ${qPend(i).i+1} из ${r.qs.length}`:r.qs.length+' вопросов'}</small></span>${res&&res.done?`<span class="rs">${qFirst(res)}/${r.qs.length}</span>`:''}</button>`;}).join('')}</div>`;
}
function vQuiz(){
  bar('Спроси дорогу',null,'route');
  if(st.day<OPEN.quiz)return lockView('Спроси дорогу откроется 1 декабря');
  const q=ui.quiz;
  if(!q){
    if(ui.quizRound==null){const f=D.QUIZ.findIndex((r,i)=>st.day>=r.open&&!(st.quiz[i]&&st.quiz[i].done));ui.quizRound=f>=0?f:0;}
    const R=ui.quizRound, part=st.qpart&&st.qpart[R], res=st.quiz[R], n=D.QUIZ[R].qs.length;
    const head=actHero('quiz');
    const start={t:part?'Продолжить набор':res&&res.done?'Пройти набор ещё раз':'Расспросить местных',act:'qStart',gold:1};
    const note=part?`Вы остановились на вопросе ${part.i+1} из ${n} — ответы сохранены`:res&&res.done?`Повтор — без баллов. В зачёте первая попытка: ${qFirst(res)} из ${n}`:'';
    const body=`${lbl('Наборы вопросов')}${roundsList(R)}${note?`<p class="note">${note}</p>`:''}`;
    return {top:head,one:body,M:[head,body],acts:[start],nbt:false,cls:'quiz'};
  }
  const R=D.QUIZ[q.r], n=R.qs.length;
  if(q.finished){
    bar('Спроси дорогу',`Набор ${q.r+1} · итог`,'route');
    const top=`${pt('Тропа найдена',`Набор ${q.r+1} · ${R.title}`,'h1')}
      <div class="score"><span class="big">${q.correct}</span><span class="of">из ${n}</span></div>
      <p class="gain">${q.replay?`Повтор — без баллов. В зачёте первая попытка: ${qFirst(st.quiz[q.r])} из ${n}`:q.gain>0?`+${q.gain} баллов в таблицу`:'В этот раз без баллов — зато теперь вы знаете эти слова'}</p>
      ${say('m_mlad','Младший сын','местные показали дорогу! Папа уже в тайге — там его ждёт мой старший брат.','compact')}
      ${st.day<OPEN.forest?`<p class="note">Лес откроется ${fmt(OPEN.forest)}</p>`:''}`;
    const acts=[st.day>=OPEN.forest?{t:'Дальше: Лес',act:'go',v:'forest',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1},{t:'Другой набор',act:'qAgain'}];
    const sets=`${lbl('Все наборы','s')}${roundsList(q.r)}`;
    return {one:`${top}${sets}`,M:[top,sets],acts,dacts:st.day>=OPEN.forest?[...acts,ROUTE_BTN]:acts,nbt:false,cls:'quiz'};
  }
  const Q=R.qs[q.i], ans=q.answered;
  bar('Спроси дорогу',`Набор ${q.r+1} · вопрос ${q.i+1} из ${n}${q.replay?' · без баллов':''}`,'route');
  const nextT=q.i<n-1?'Следующий вопрос':'Узнать, куда идти';
  const qbar=`<div class="qbar" aria-label="Вопрос ${q.i+1} из ${n}">${R.qs.map((_,i)=>`<i class="${i<q.i?'done':i===q.i?'on':''}"></i>`).join('')}</div>`;
  const ask=say('m_mlad','Младший сын',Q.t==='w'?`местные сказали «${Q.w.toLowerCase()}». Что бы это значило?`:`смотри, какой узор на ${Q.on}! Из какого он края?`,'compact');
  // слово — на деревянном указателе (кегль — по длине самого длинного слова), узор — на светлом полотне
  const word=`<div class="qword-wrap ${Q.t==='w'?'is-w':'is-p'}"><div class="plabel">${Q.t==='w'?'Что означает это слово':'Чей это узор?'}</div>
      <div class="qword ${Q.t==='w'?'':'pat'}">${flowers()}${Q.t==='w'?`<div class="w" style="--n:${Math.max(...Q.w.split(' ').map(x=>x.length))}">${Q.w}</div>`:`${patternSVG(Q.p)}<div class="on">Узор на ${Q.on}</div>`}</div></div>`;
  const opts=`<div class="opts ${ans?'answered':''}">${Q.o.map((o,i)=>{let cl='';if(ans){if(i===Q.a)cl='right';else if(i===q.pick)cl='wrong';else cl='dim';}return `<button class="opt ${cl}" data-act="qPick" data-i="${i}"><span>${o}</span></button>`;}).join('')}</div>`;
  // пояснение — в том же окне, под вариантами, с картинкой (в прототипе — заготовка под иллюстрацию)
  const pic=`<div class="ex-pic">${Q.t==='w'?`<span class="ex-w">${Q.w}</span>`:`<span class="ex-p">${svg('photo','width="30" height="30"')}</span>`}<small>${Q.t==='w'?'Иллюстрация к слову':`Фото изделия: узор на ${Q.on}`}</small></div>`;
  const expl=ans?`<div class="parch explain-in" id="expl">${flowers()}<div class="explain">${pic}<div class="where">${Q.where}</div><div class="ttl2">${Q.t==='w'?Q.w:'Узор: '+Q.o[Q.a]}</div><p>${Q.ex}</p>
    <div class="verdict ${q.pick===Q.a?'ok':''}">${q.pick===Q.a?(q.replay?'Верно!':'Верно! +20 баллов'):`Правильный ответ — «${Q.o[Q.a]}». Теперь и вы знаете!`}</div></div></div>
    <button class="btn btn-gold btn-block q-next" data-act="qNext">${nextT} ${svg('arrow','width="18" height="18"')}</button>`:'<p class="note">Выберите вариант — после ответа Младший сын расскажет, что это значит</p>';
  const win=`${word}${opts}${expl}`;
  const head=`<div class="act-head q">${DESK?`<h1 class="sc-t">Спроси дорогу</h1>${q.replay?'<p class="q-rep">Повтор набора — без баллов</p>':''}`:''}${qbar}${ask}</div>`;
  return {one:win,M:win,dstage:head,stage:head,acts:[],sun:false,cls:'quiz'};
}

/* ===== Лес ===== */
const LITE_NOTE='<p class="note">Игра тормозит или не запускается? <a class="link" href="#" data-act="fLite">Альтернативный способ заработать баллы</a> — для старых браузеров и слабых компьютеров</p>';
// Шапка Леса — общая шапка испытаний (actHero): Старший сын зовёт собирать подарки.
// Правила, баллы и рекорд — в окне перед стартом, прямо на поле
// Перед стартом — на самом поле: коротко правила плитками с картинками из игры и кнопка старта.
// Компьютер — пять плиток с пояснениями; телефон (поле невысокое) — четыре компактные
const FIMG=n=>`<img src="assets/img/forest/${n}.png" alt="" onerror="this.style.visibility='hidden'">`;
function forestRules(desk){
  const best=st.forest.bestGifts, runs=st.forest.runs;
  const tiles=desk?[
    [`<span class="ri">${svg('jump')}</span>`,'Прыжок','пробел, ↑ или клик. В воздухе ещё раз — второй прыжок'],
    [`<span class="ri">${svg('boost')}</span>`,'Ускорение','держите → — бег вдвое быстрее, но и препятствия чаще'],
    [FIMG('gift_1'),'Подарки','за них — баллы в турнирную таблицу'],
    [FIMG('heart'),'3 жизни','удар или яма — минус жизнь, сердечко вернёт её'],
    [FIMG('obstacle_stump'),'Препятствия','на пень и бревно можно запрыгнуть, сугроб — только перепрыгнуть']
  ]:[
    [`<span class="ri">${svg('jump')}</span>`,'Прыжок','слева или тап; в воздухе — ещё раз'],
    [`<span class="ri">${svg('boost')}</span>`,'Ускорение','держите кнопку справа'],
    [FIMG('gift_1'),'Подарки','за них — баллы'],
    [FIMG('heart'),'3 жизни','сердечко вернёт']
  ];
  // что делать и как считается результат; если уже бегали — рекорд и прошлый забег
  const lead=desk?'Бегите как можно дальше и собирайте подарки — за каждый 10 баллов. В зачёт идёт лучший забег: рекорд сохраняется, а за новый рекорд добавляются баллы за разницу'
    :'Собирайте как можно больше подарков: в зачёт идёт лучший забег, рекорд сохраняется';
  const last=st.forest.last, gp=n=>`${n} ${plural(n,'подарок','подарка','подарков')}`;
  const prev=runs?`<div class="ov-rec"><div class="ov-pill">${ICON_GIFT}<div><span>Рекорд</span><b>${best}</b></div></div>${last?`<span class="ov-cap">Прошлый забег — ${gp(last.g)} за ${mmss(last.t)}</span>`:''}</div>`:'';
  return `<div class="inner wide"><div class="ov-t">Готовы?</div>
    <p class="ov-lead">${nb(lead)}</p>
    <div class="rules">${tiles.map(([i,b,t])=>`<div>${i}<b>${b}</b><span>${t}</span></div>`).join('')}</div>
    ${prev}
    <button class="btn btn-gold btn-lg" data-act="fStart">${desk?'Бежать!':'Старт'}</button></div>`;
}
// Выключатель звука и музыки «Леса» (выбор запоминается на устройстве)
function sndBtn(){const on=ForestSound.on;return `<button class="snd" data-act="fSound" aria-pressed="${on}" aria-label="Звук" title="${on?'Выключить звук':'Включить звук'}">${svg(on?'snd':'sndOff')}</button>`;}
function vForest(){
  bar('Лес',null,'route');
  if(st.day<OPEN.forest)return lockView('Лес откроется 8 декабря','В тайге у Деда Мороза рвётся мешок — подарки рассыпаются по всему лесу. Собирать их герой будет вместе со Старшим сыном.','m_star');
  const head=actHero('forest');
  if(DESK){
    // Компьютер: шапка испытания на поляне, ниже — одна широкая панель: игровое поле и кнопки.
    // Жизни, подарки и время — на самом поле, рекорд — в окне перед стартом
    const field=`<div class="stage" id="stage"><canvas id="cv" data-ratio=".5625" data-lw="840" data-lh="440"></canvas>
        <div class="overlay" id="ov">${forestRules(true)}</div>${sndBtn()}</div>
      <div class="ctrl" id="ctrl"><button class="btn btn-ghost" id="bJump">${svg('jump','width="18" height="18"')} Прыжок</button><button class="btn btn-ghost" id="bFwd">Ускорение ${svg('boost','width="18" height="18"')}</button></div>
      <p class="note hidden" id="fin"><a class="link" href="#" data-act="fExit">Закончить забег</a> — собранные подарки засчитаются</p>${LITE_NOTE}`;
    return {wide:[head,field],cls:'forest',scene:1};
  }
  if(ui.fmode)return {raw:gameMode()};
  return {scene:1,cls:'forest',
    M:[head,`<p class="rot-hint">${svg('rotate')}<span>Играем горизонтально — поверните телефон</span></p>${LITE_NOTE}`],
    acts:[{t:'Бежать!',act:'fPlay',gold:1}]};
}
// Телефон: игра во весь экран и только горизонтально. В центре поле (жизни и подарки — на нём), по бокам круглые кнопки без подписей под большие пальцы:
// слева «Прыжок», справа «Ускорение». Вертикально вместо игры — «Поверните телефон», идущий забег встаёт на паузу
const ROT_PHONE='<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><rect x="19" y="5" width="26" height="54" rx="6"/><path d="M28 52h8"/></svg>';
function gameMode(){
  return `<div class="gm" id="gm">
    ${sndBtn()}<button class="gm-x" data-act="fExit" aria-label="Закончить забег">×</button>
    <div class="gm-mid"><div class="stage" id="stage"><canvas id="cv" data-ratio="1.15" data-lw="620" data-lh="440"></canvas>
      <div class="overlay" id="ov">${forestRules(false)}</div></div></div>
    <button class="gm-b" id="bJump" aria-label="Прыжок">${svg('jump')}</button>
    <button class="gm-b" id="bFwd" aria-label="Ускорение">${svg('boost')}</button>
    <div class="gm-rot"><div class="rot-ph" aria-hidden="true">${ROT_PHONE}</div>
      <b class="rot-touch">Поверните телефон</b><b class="rot-mouse">Сделайте окно шире</b>
      <span>Играем горизонтально: прыжок — под левым пальцем, ускорение — под правым</span>
      <small class="rot-touch">Экран не поворачивается? Снимите блокировку поворота в быстрых настройках телефона</small></div>
  </div>`;
}
// Android-телефон: игра во весь экран и сразу горизонтально, даже если автоповорот выключен. iPhone так не умеет — там подсказка «Поверните телефон»
function landscapeLock(){
  try{
    const el=document.documentElement, o=screen.orientation;
    if(!/Android/i.test(navigator.userAgent)||Math.min(screen.width,screen.height)>540||!el.requestFullscreen||!o||!o.lock) return;
    el.requestFullscreen({navigationUI:'hide'}).then(()=>o.lock('landscape')).catch(()=>{});
  }catch(e){}
}
function landscapeUnlock(){
  try{ if(screen.orientation&&screen.orientation.unlock)screen.orientation.unlock(); }catch(e){}
  try{ if(document.fullscreenElement&&document.exitFullscreen)document.exitFullscreen().catch(()=>{}); }catch(e){}
}
// Пауза: телефон повернули вертикально посреди забега или ушли из вкладки. Продолжают кнопкой на поле
function pauseRun(){
  if(!game||!game.state.run||game.state.paused) return;
  game.pause(); ForestSound.musicPause(); const f=$('#bFwd'); if(f)f.classList.remove('on');
  const ov=$('#ov'); if(!ov) return;
  ov.innerHTML=`<div class="inner"><div class="ov-t">Пауза</div><button class="btn btn-gold btn-lg" data-act="fResume">Продолжить</button></div>`;
  ov.classList.remove('hidden');
}
const PORTRAIT=window.matchMedia('(orientation:portrait)');
const onPortrait=()=>{if(PORTRAIT.matches&&!DESK&&ui.fmode)pauseRun();};
if(PORTRAIT.addEventListener)PORTRAIT.addEventListener('change',onPortrait);else PORTRAIT.addListener(onPortrait);
document.addEventListener('visibilitychange',()=>{if(document.hidden)pauseRun();});
function mountForest(){
  const cv=$('#cv'); if(!cv) return;
  // Компьютер: поле 16:9, но целиком влезает в окно вместе с кнопками под ним (шапка сверху закреплена)
  if(DESK){const hd=$('header.top');cv.dataset.vfit=String((hd?hd.offsetHeight:64)+112);}
  game=ForestGame(cv,{
    end(S){finishForest(S.gifts,S.score,S.out,S.rt);},
    sfx:(n,o)=>ForestSound.play(n,o),
    best:()=>st.forest.bestGifts||0   // рекорд — для полоски «до рекорда» на поле
  });
  const j=$('#bJump'),f=$('#bFwd');
  j.addEventListener('pointerdown',e=>{e.preventDefault();game&&game.jump();});
  // «Ускорение» работает, пока кнопку держат; подсвечена, пока зажата
  const on=e=>{e.preventDefault();if(!game||!game.state.run||game.state.paused)return;f.classList.add('on');game.boost(true);},off=()=>{f.classList.remove('on');game&&game.boost(false);};
  f.addEventListener('pointerdown',on);f.addEventListener('pointerup',off);f.addEventListener('pointerleave',off);f.addEventListener('pointercancel',off);
  [j,f].forEach(b=>b.addEventListener('contextmenu',e=>e.preventDefault()));   // долгое нажатие на телефоне не открывает меню
}
// Компьютер: на старте поле и кнопки под ним целиком в окне — если не помещаются, страница прокручивается к полю
function fitField(){
  if(!DESK)return; const sg=$('#stage'),ct=$('#ctrl'),hd=$('header.top'); if(!sg)return;
  const top=(hd?hd.offsetHeight:0)+10, a=sg.getBoundingClientRect(), b=(ct||sg).getBoundingClientRect();
  if(a.top>=top&&b.bottom<=innerHeight-6)return;
  window.scrollTo({top:Math.max(0,a.top+scrollY-top),behavior:reduced()?'auto':'smooth'});
}
function finishForest(gifts,score,out,time){
  const prevBest=st.forest.bestGifts;
  st.forest.last={g:gifts,t:Math.round(time||0)};
  ForestSound.musicPause(); if(gifts>prevBest)ForestSound.play('record'); else if(out)ForestSound.play('over');
  st.forest.runs++;st.forest.gifts+=gifts;if(gifts>prevBest){addLog('forest',prevBest?`Новый рекорд: ${gifts} ${plural(gifts,'подарок','подарка','подарков')} (было ${prevBest})`:`Забег: ${gifts} ${plural(gifts,'подарок','подарка','подарков')}`,(gifts-prevBest)*10);st.forest.bestGifts=gifts;}save();
  const head=out?'Жизни закончились':'Забег окончен';
  const nx=st.day>=OPEN.tree?{t:'Дальше: Ёлка',act:'go',v:'tree',gold:1}:{t:'На маршрут',act:'go',v:'route',gold:1};
  const line=out?'уф, споткнулись! Отдышимся — и ещё забег? Подарки, что успели собрать, уже в мешке.':'собрали! Бегу отдать папе мешок — а сестрёнка уже ждёт у ёлки.';
  const rec=`<div><b>${gifts>prevBest?'+'+(gifts-prevBest)*10:st.forest.bestGifts}</b><span>${gifts>prevBest?'баллов — новый рекорд':'ваш рекорд, подарков'}</span></div>`;
  const treeNote=st.day<OPEN.tree?`Ёлка откроется ${fmt(OPEN.tree)}`:'';
  if(DESK){
    // Десктоп: итоги — прямо на поле, крутить страницу не нужно: цифры, реплика Старшего сына, «Ещё забег» и «Дальше».
    // «Дальше» прокручивает к блоку под полем — там переходы: «Ёлка», ещё забег, маршрут
    const fn=$('#fin');if(fn)fn.classList.add('hidden');
    const ov=$('#ov');if(ov){ov.classList.remove('hidden');ov.innerHTML=`<div class="inner wide res"><div class="lbl-s">${head}</div>
      <div class="rcs"><div><b>${gifts}</b><span>собрано подарков</span></div>${rec}<div><b>${mmss(time)}</b><span>время забега</span></div></div>
      ${say('m_star','Старший сын',line,'compact')}
      <div class="ov-acts"><button class="btn btn-gold btn-lg" data-act="fAgain">Ещё забег</button><button class="btn btn-ghost btn-lg" data-act="fNext">Дальше ${svg('chev','width="18" height="18"')}</button></div></div>`;}
    const ctrl=$('#ctrl');if(!ctrl)return;
    ctrl.outerHTML=`<div class="resultcard" id="ctrl">${nextBar([nx,{t:'Ещё забег',act:'fAgain'},nx.v!=='route'?ROUTE_BTN:null],treeNote)}</div>`;
  } else {
    // Телефон: итоги — шторкой поверх игры
    const gm=$('#gm');if(!gm)return;
    const old=gm.querySelector('.sheet');if(old){old.previousElementSibling.remove();old.remove();}
    gm.insertAdjacentHTML('beforeend',sheet(`<div class="lbl-s center">${head}</div>
      <div class="fres"><b>${gifts}</b><span>${plural(gifts,'подарок','подарка','подарков')}</span></div>
      ${say('m_star','Старший сын',line,'compact')}
      <div class="rcs">${rec}<div><b>${mmss(time)}</b><span>время забега</span></div></div>
      <div class="sheet-acts">${btn(nx)}${btn({t:'Ещё забег',act:'fAgain'})}${nx.v!=='route'?btn(ROUTE_BTN):''}</div>
      ${treeNote?`<p class="note">${treeNote}</p>`:''}`,{cls:'darksheet',close:'fAgain'}));
  }
  updateHeader();
}
function startLite(){
  if(game)game.destroy(),game=null;
  const ov=$('#ov'); if(!ov)return; ov.classList.remove('hidden');
  const sg=$('#stage');if(sg)sg.classList.add('lite-on');
  const gm=$('#gm');if(gm)gm.classList.add('gm-lite');   // кнопки игры не нужны, и играть можно в любом положении телефона
  let n=0,got=0,cur=-1;
  ov.innerHTML=`<div class="inner"><div class="lbl-s">Альтернативный способ заработать баллы</div><p class="small">Нажимайте на подарки, пока они не исчезли</p><div class="lite" id="lite">${[...Array(9)].map((_,i)=>`<button data-li="${i}"></button>`).join('')}</div><div class="small" id="liteC">Собрано: 0</div></div>`;
  $('#lite').addEventListener('pointerdown',e=>{const b=e.target.closest('[data-li]');if(b&&+b.dataset.li===cur){got++;cur=-1;ForestSound.play('gift');b.classList.remove('has');b.textContent='';$('#liteC').textContent='Собрано: '+got;}});
  const t=setInterval(()=>{
    $$('#lite button').forEach(b=>{b.classList.remove('has');b.textContent='';});
    if(n>=18){clearInterval(t);finishForest(got,got*10,false,n*.85);return;}
    cur=Math.floor(Math.random()*9);const b=$(`#lite [data-li="${cur}"]`);b.classList.add('has');b.textContent='🎁';n++;
  },850); timers.push(t);
}

/* ===== Ёлка =====
   Шапка испытания (Дочь: подарки собраны — осталось нарядить ёлку), ниже — один экран: шаги и окно, которое меняется
   (игрушка → картинка → ИИ → готово). Игрушка у каждого одна — генерация стоит денег: её можно скачать и повесить на общую ёлку —
   сразу +100 баллов; всем она станет видна после проверки модератором. Снять с ёлки и повесить снова можно в любой момент.
   Ниже — общая ёлка банка с поворотом: своя игрушка у верхушки, на других сторонах — игрушки коллег */
function doch(t,cls){return say('m_doch','Дочь',t,cls);}
function treeSides(){return Math.max(1,Math.ceil(treeCount()/40));}
function sideLabel(){const n=treeSides();return `Сторона ${ui.treeSide+1} из ${num(n)}${ui.treeSide===0?' · новые':''}`;}
function sideBalls(side){
  const r=rng(500+side*7);const out=[];const total=treeCount();const cnt=Math.min(40,Math.max(0,total-side*40-(side===0&&st.tree.on&&st.tree.ok?1:0)));
  for(let i=0;i<cnt;i++){const N=NOUNS[Math.floor(r()*NOUNS.length)];out.push({nick:D.ADJ[Math.floor(r()*D.ADJ.length)][N.g]+' '+N.w,city:r()<.25?'Москва':D.CITIES[Math.floor(r()*60)][0],img:r()<.55?Math.floor(r()*6):-1});}
  return out;
}
function mineBall(){return st.tree.ball||null;}
function treeBox(){return treeSVG(ui.treeSide===0&&st.tree.on?mineBall():null,sideBalls(ui.treeSide),900+ui.treeSide);}
function rotateTree(dir,to){
  const n=treeSides();ui.treeSide=to!=null?to:((ui.treeSide+dir)%n+n)%n;
  const box=$('#treebox');if(!box)return render();
  box.classList.add(dir>0?'out-l':'out-r');
  setTimeout(()=>{box.innerHTML=treeBox();box.classList.remove('out-l','out-r');box.classList.add(dir>0?'in-r':'in-l');
    const l=$('#tside');if(l)l.textContent=sideLabel();},230);
  setTimeout(()=>box.classList.remove('in-r','in-l'),560);
}
function treeRotHTML(){return `<div class="rot"><button class="btn btn-ghost btn-sm" data-act="treeRot" data-d="-1" aria-label="Повернуть влево">‹${DESK?' Повернуть':''}</button><div class="rotlab" id="tside">${sideLabel()}</div><button class="btn btn-ghost btn-sm" data-act="treeRot" data-d="1" aria-label="Повернуть вправо">${DESK?'Повернуть ':''}›</button></div>`;}
// Модерация в прототипе: игрушка «проходит проверку» при следующем переходе между страницами. На платформе — очередь в админке
function approveToy(){if(!st.tree.ball||!st.tree.on||st.tree.ok)return;st.tree.ok=true;save();flash('Ваша игрушка прошла проверку — теперь её видят все на общей ёлке');}
// Повесить или снять игрушку. 100 баллов — один раз, когда игрушку впервые повесили; снять можно, баллы остаются
function hangToy(on){
  st.tree.on=on;
  if(on&&!st.tree.pts){st.tree.pts=true;addLog('tree','Игрушка на общей ёлке',100);}
  save();ui.treeSide=0;render();
  toast(!on?'Игрушку сняли с общей ёлки — баллы остаются':st.tree.ok?'Игрушка снова на общей ёлке':'+100 баллов! Игрушка на ёлке — всем покажем после проверки модератором');
}
const TREE_STEPS=[['Выберите игрушку','шар, звезда, колокольчик, сосулька, сердце или фонарик'],['Загрузите картинку','любую: фото, рисунок, открытку'],['ИИ делает игрушку','перерисует картинку в её стиле'],['Повесьте на ёлку','и сразу получите 100 баллов']];
function vTree(){
  bar('Ёлка',null,'route');
  if(st.day<OPEN.tree)return lockView('Ёлка откроется 15 декабря','Когда подарки собраны и Дед Мороз отправился их развозить, Дочь зовёт всех вместе нарядить ёлку к празднику.','m_doch');
  const T=ui.tree, has=!!st.tree.ball, step=T.step||1;
  const head=actHero('tree',!has?'Нарядим вместе!':st.tree.on?'Красота!':'Повесим на ёлку?');
  const tc=treeCount();
  const big=`${lbl('Общая ёлка банка')}<p class="tale small center">${nb(`${num(tc)} ${plural(tc,'игрушка','игрушки','игрушек')} от сотрудников со всей страны. Свежие — на передней стороне, остальные — если повернуть ёлку`)}</p>
    <div class="treebox" id="treebox">${treeBox()}</div>${treeSides()>1?treeRotHTML():''}
    <p class="note">${DESK?'Крутите ёлку стрелками или свайпом. Нажмите на игрушку — увидите её поближе':'Крутите ёлку свайпом. Нажмите на игрушку — увидите её поближе'}</p>`;
  if(has){
    // своя игрушка: одна на участника — скачать, повесить на ёлку или снять
    const S=BALL_STYLES[st.tree.style||0]||BALL_STYLES[0];
    const status=!st.tree.on?'Пока не на ёлке — её видите только вы':st.tree.ok?'Висит на общей ёлке — её видят все':'На ёлке. Всем покажем после проверки модератором';
    const mine=`${lbl('Ваша игрушка')}<div class="mine-c"><div class="mc-img"><img src="${mineBall()}" alt="Ваша игрушка"></div>
      <div class="mc-b"><b class="mc-t">${S.n}</b><span class="mc-s">${status}</span>
        <label class="sw"><input type="checkbox" id="hangSw"${st.tree.on?' checked':''}><span class="sw-t" aria-hidden="true"></span><span>Висит на общей ёлке</span></label>
        <span class="rt-p">${STAR_SM}${st.tree.pts?'100 баллов начислено':'Повесьте — и сразу +100 баллов'}</span>
        <div class="mc-a">${st.tree.on?'':btn({t:'Повесить на ёлку',act:'tHang',gold:1,noarrow:1,cls:'btn-sm'})}${btn({t:`${svg('down','width="16" height="16"')} Скачать`,act:'tDownloadMine',noarrow:1,cls:'btn-sm'})}</div></div></div>`;
    return {wide:[head,mine,big],M:[head,mine,big],cls:'tree'};
  }
  // шаги слева, справа — окно текущего шага
  const steps=`<ol class="tsteps">${TREE_STEPS.map(([t,d],i)=>`<li class="${i+1===step?'on':''} ${i+1<step?'done':''}"><i>${i+1<step?'✓':i+1}</i><span><b>${t}</b><small>${d}</small></span></li>`).join('')}</ol>`;
  let win;
  if(step===1){
    win=`<div class="styles">${BALL_STYLES.map((s,i)=>`<button class="${(T.style||0)===i?'on':''}" data-act="tStyle" data-i="${i}" aria-pressed="${(T.style||0)===i}"><img src="${A['toy'+i]}" alt=""><span>${s.n}</span></button>`).join('')}</div>
      <div class="tw-a">${btn({t:'Дальше: картинка',act:'tStep',s:2,gold:1})}</div>`;
  } else if(step===2){
    win=`<label class="dropzone" id="drop">${T.src?`<img class="pv" src="${T.src}" alt="">`:`<span class="dz">${svg('photo','width="40" height="40"')}</span>`}
        <b>${T.src?'Картинка загружена':DESK?'Нажмите или перетащите файл сюда':'Выбрать картинку'}</b><span class="small">${T.src?'Нажмите, чтобы заменить':'JPG или PNG — с телефона или компьютера'}</span>
        <input type="file" accept="image/*" id="file" class="sr"></label>
      <p class="tw-test"><a class="link" href="#" data-act="tSample">Тестовая картинка</a></p>
      <p class="note">Картинка нужна только для игрушки и удаляется сразу после её создания. Игрушка у каждого одна</p>
      <div class="tw-a">${btn({t:'Создать игрушку',act:'tMake',gold:1,disabled:!T.src})}${btn({t:'Назад',act:'tStep',s:1})}</div>`;
  } else {
    win=`<div class="making"><div class="orb"><img src="${T.src}" alt=""></div><div class="mk" id="mk">Перерисовываем картинку в ёлочную игрушку…</div></div>`;
  }
  const mk=`${lbl('Ваша игрушка')}<div class="tmk">${steps}<div class="twin">${win}</div></div>`;
  return {wide:[head,mk,big],M:[head,mk,big],cls:'tree'};
}
const TEST_PICS=['sample_girl','sample_team','sample_draw'];
function setTreeSrc(src){ui.tree.src=src;render();}
async function makeBall(){
  ui.tree.step=3;render();
  const msgs=['Подбираем стиль…','Добавляем снег и огоньки…','Вешаем петельку…'];let i=0;
  const t=setInterval(()=>{const m=$('#mk');if(m)m.textContent=msgs[i++%msgs.length];},800);timers.push(t);
  const [ball]=await Promise.all([renderBall(ui.tree.src,ui.tree.style||0),new Promise(r=>setTimeout(r,2400))]);
  clearInterval(t);
  // игрушка сохраняется сразу: одна на участника, вернуться к ней можно в любой момент
  st.tree.ball=ball;st.tree.style=ui.tree.style||0;st.tree.made=1;st.tree.on=false;st.tree.ok=false;save();
  ui.tree={step:1,src:null,style:0,ball:null};if(st.view==='tree'){render();window.scrollTo({top:0,behavior:reduced()?'auto':'smooth'});}
}
function download(dataUrl,name){const a=document.createElement('a');a.href=dataUrl;a.download=name;document.body.appendChild(a);a.click();a.remove();}

/* ===== Сундук чудес: розыгрыш =====
   Розыгрыш — 25 декабря, среди тех, кто до 24 декабря, 23:59 мск ввёл свой персональный код на внутренней платформе ПСБ.
   Ввёл ли человек код, платформа узнаёт только перед розыгрышем (список кодов присылает банк), поэтому до розыгрыша у всех одно и то же:
   как всё устроено и напоминание ввести код. После розыгрыша — победители; победителю ничего делать не нужно: код уже введён, с ним свяжутся */
const DRAW_N=10;
const PRIZE_DAY=OPEN.chest+5;   // с победителями свяжутся до 30 декабря — дата по согласованию с банком
function drawPool(){return Math.round(Math.min(16800,2100+OPEN.chest*520)*.62);}   // участники розыгрыша — те, кто ввёл код (в прототипе — пример)
function drawWinners(){
  const r=rng(1225),pool=FAKES.slice(),out=[];
  while(out.length<DRAW_N&&pool.length)out.push(pool.splice(Math.floor(r()*pool.length),1)[0]);
  if(st.chest.win&&st.user)out.splice(6,1,{nick:st.user.nick,city:st.user.city,me:true});
  return out;
}
// Шапка раздела вне испытаний: название и реплика героя, без «Как играть»
function pageHead(title,img,who,line){const s=say(img,who,line,'compact');return {d:`<div class="act-head"><h1 class="sc-t">${title}</h1>${s}</div>`,m:`<div class="act-head">${s}</div>`};}
function vChest(){
  bar('Сундук чудес',null,'route');
  const before=st.day<OPEN.chest,u=st.user;
  const img=`<div class="chestimg ${before?'locked':'open'}" id="chestimg"><span class="burst"></span><img src="${A.chest}" alt="Сундук чудес">${before?`<div class="lockb"><span class="chip lock">${svg('lock','width="15" height="15"')} ${fmt(OPEN.chest)}</span></div>`:''}</div>`;
  if(before){
    const d=OPEN.chest-st.day, left=CODE_DEADLINE-st.day;
    const H=pageHead('Сундук чудес','m_mikhail','Дед Мороз Михаил',`в этом сундуке — подарки для ${DRAW_N} помощников. Кому они достанутся, решит случай.`);
    const how=`<ol class="how col">
      <li><i>1</i><span>${nb(`Введите свой персональный код на внутренней платформе ПСБ — до ${fmt(CODE_DEADLINE)}, 23:59 мск`)}</span></li>
      <li><i>2</i><span>${nb(`${fmt(OPEN.chest)} случай выберет ${DRAW_N} победителей среди тех, кто ввёл код`)}</span></li>
      <li><i>3</i><span>${nb('Победителей покажем здесь, с ними свяжутся')}</span></li></ol>`;
    // напоминание висит до самого розыгрыша: платформа не знает, ввёл ли человек код
    const remind=`${lbl('Ваш код для розыгрыша')}<div class="codebox"><div class="code sm">${u.code}</div>
        <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${u.code}">${svg('copy','width="14" height="14"')} Скопировать</button></div>
      <p class="rm-t">${nb(left>0?`Введите его на внутренней платформе ПСБ до ${fmt(CODE_DEADLINE)}, 23:59 мск. Осталось ${left} ${plural(left,'день','дня','дней')}`:'Сегодня последний день: введите код на внутренней платформе ПСБ до 23:59 мск')}</p>
      <div class="rm-a">${btn({t:'Открыть внутреннюю платформу',act:'portal',gold:1,noarrow:1})}</div>`;
    const body=`${img}<p class="ch-when">${nb(`Розыгрыш — ${fmt(OPEN.chest)}, через ${d} ${plural(d,'день','дня','дней')}`)}</p>${how}`;
    return {pre:endBanner(),one:[body,remind],M:[body,remind],dstage:H.d,stage:H.m,cls:'chest'};
  }
  if(!st.chest.seen){st.chest.seen=true;save();}
  const W=drawWinners(),won=W.some(x=>x.me);
  const H=pageHead('Сундук чудес','m_mikhail','Дед Мороз Михаил',won?'поздравляю! Подарок из моего сундука достался вам.':'сундук открыт — подарки нашли своих хозяев. Спасибо всем, кто помогал!');
  const res=won?`<div class="drawres win">${svg('check','width="20" height="20"')}<div><b>Вы среди победителей!</b><span>${nb(`Ваш код уже введён — ничего делать не нужно. С вами свяжутся до ${fmt(PRIZE_DAY)}.`)}</span></div></div>`
    :`<div class="drawres"><div><b>В этот раз удача улыбнулась другим</b><span>${nb(`Спасибо, что помогали Михаилу! Турнирная таблица, сказка-сериал и аудиосказки работают до ${fmt(LAST_DAY)}.`)}</span></div></div>`;
  const list=`${lbl('Победители розыгрыша')}<ol class="wlist">${W.map((x,i)=>`<li class="${x.me?'me':''}"><span class="n">${i+1}</span>${ava(x.nick,DESK?34:32,x.me)}<span class="w">${tname(x.nick,x.city)}${x.me?' <span class="tag">вы</span>':''}</span></li>`).join('')}</ol>
    <p class="note">${nb(`${DRAW_N} из ${num(drawPool())} участников — тех, кто ввёл код на внутренней платформе ПСБ`)}</p>`;
  return {pre:endBanner(),one:[`${img}${res}`,list],M:[`${img}${res}`,list],dstage:H.d,stage:H.m,cls:'chest'};
}

/* ===== Сказка-сериал ===== */
function chState(i){const c=D.CHAPTERS[i];if(st.day<c.day)return 'soon';if(st.day<=c.day+1)return 'vote';return 'out';}
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
  const stats=`<div class="stats3"><div><b>3–4 дня</b><span>новая глава</span></div><div><b>48 часов</b><span>на голосование</span></div><div><b>${VOTE_PTS}</b><span>баллов за голос</span></div></div>`;
  const toc=`<div class="toc">${ch.map((c,i)=>{const s=chState(i);return `<button class="tocr ${s}" data-act="openCh" data-i="${i}" ${s==='soon'?'disabled':''}><span class="rn">${ROMAN[i]}</span><span class="rt"><b>${s==='soon'?'Скоро':c.t}</b><small>${s==='soon'?'Выйдет '+fmt(c.day):s==='vote'?(st.serial.votes[i]!=null?'Ваш голос учтён':'Идёт голосование'):c.final?'Финальная глава':`Выбор читателей: «${c.o[c.win]}»`}</small></span>${s==='vote'?`<span class="chip live">${st.serial.votes[i]!=null?'учтён':'голосуем'}</span>`:`<span class="dots"></span><span class="pg-n">${fmt(c.day,true)}</span>`}</button>`;}).join('')}
      <button class="tocr fin ${st.day<D.FULL_TALE_DAY?'soon':''}" data-act="go" data-v="fulltale" ${st.day<D.FULL_TALE_DAY?'disabled':''}><span class="rn">✦</span><span class="rt"><b>Цельная сказка</b><small>${st.day<D.FULL_TALE_DAY?'Выйдет '+fmt(D.FULL_TALE_DAY):'Читать и скачать PDF'}</small></span><span class="dots"></span><span class="pg-n">${fmt(D.FULL_TALE_DAY,true)}</span></button></div>`;
  return {pre:endBanner(),
    L:`${pt('Сказка-сериал','Пишут все вместе','h1')}${head}${stats}`,
    R:`${pt('Оглавление','Шесть глав и цельная сказка')}${toc}`,
    M:`${head}${stats}${lbl('Оглавление','s')}${toc}`,
    acts:serialActs(),pn:19,cls:'serial'};
}
// Голосование — прямо под текстом главы, без всплывающих окон
function voteBlock(i,cd){
  const c=D.CHAPTERS[i],s=chState(i),myv=st.serial.votes[i],open=s==='vote',nx=D.CHAPTERS[i+1];
  const frac=open?(st.day===c.day?.55:.88):1;
  const tot=Math.round(c.votes*frac)+(ui.liveBump||0)+(myv!=null?1:0);
  const cnt=c.pct.map((p,k)=>Math.round(tot*p/100)+(myv===k?1:0));
  const sum=cnt.reduce((a,b)=>a+b,0), show=myv!=null||!open;
  const lead=open?(myv==null?(c.final?`Голосование для настроения — на сюжет оно уже не влияет. За голос — ${VOTE_PTS} баллов. До ${fmt(c.day+1)}, 23:59\u00a0мск.`
      :`Выберите вариант — большинство решит, что будет дальше. За голос — ${VOTE_PTS} баллов. Голосование до ${fmt(c.day+1)}, 23:59\u00a0мск.`):`Спасибо! Ваш голос учтён, +${VOTE_PTS} баллов — следите за счётчиком.`)
    :c.final?`Голосование завершено: «${c.o[c.win]}» — ${c.pct[c.win]}%.`:`Голосование завершено. Вариант «${c.o[c.win]}» лёг в основу главы ${ROMAN[i+1]}.`;
  const vt=c.final?'Как вам финал?':'Как продолжится сказка?';
  return `<section class="vote ${open&&myv==null?'todo':''}" id="vote">${DESK?pt(vt,open?(myv==null?'Выбор за вами':'Ваш голос учтён'):'Голосование завершено'):lbl(vt)}
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
  if(open&&myv==null)acts=[{t:'К голосованию',act:'toVote',gold:1,noarrow:1}];
  else if(c.final)acts=[full?{t:'Читать сказку целиком',act:'go',v:'fulltale',gold:1}:routeNext(true),{t:'Все главы',act:'go',v:'serial'}];   // когда выйдет цельная сказка — в абзаце под голосованием
  else{acts=[nxOut?{t:`Читать главу ${ROMAN[i+1]}`,act:'openCh',i:i+1,gold:1}:routeNext(true),{t:'Все главы',act:'go',v:'serial'}];if(nx&&!nxOut&&!open)note=`Глава ${ROMAN[i+1]} выйдет ${fmt(nx.day)}`;}
  const text=`<div class="parch story">${flowers()}${c.p.map((x,k)=>tale(x,k===0)).join('')}${c.final?'<div class="fin">Конец</div>':''}</div>`;
  const cd=open?`<div class="vote-h"><span class="chip live" id="vcd2">${countdown(c.day)}</span></div>`:'';
  const fin=c.final?`<p class="tale small center">${full?'Цельная сказка уже собрана — её можно прочитать целиком и скачать.':`Это последняя глава. Цельная сказка с инфографикой голосований выйдет ${fmt(D.FULL_TALE_DAY)}.`}</p>`:'';
  return {
    L:`${pt(c.t,`Глава ${ROMAN[i]} · ${fmt(c.day)}`,'h1')}<div class="illu"><img src="${A[c.img]}" alt=""></div>${text}`,
    R:`${voteBlock(i,cd)}${fin}`,
    M:`<div class="illu"><img src="${A[c.img]}" alt=""></div>${pt(c.t,`Глава ${ROMAN[i]} · ${fmt(c.day)}`,'h1')}${cd}${text}${voteBlock(i,'')}${fin}`,
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

/* ===== Пряничная избушка =====
   Книга: слева — избушка и Настасья Петровна, справа — сказки. Нажали на сказку — окно: обложка, подводка Настасьи Петровны и плеер,
   сказка сразу начинает играть. Закрыли окно — сказка продолжает играть в мини-плеере внизу экрана, по нему окно открывается снова */
function taleCover(t,i){const [a,b]=t.c;return `<svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="tc${i}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="#0b1538"/></linearGradient></defs><rect width="160" height="120" fill="url(#tc${i})"/>
  <circle cx="${30+i*11%100}" cy="28" r="12" fill="${b}" opacity=".9"/>${[...Array(7)].map((_,k)=>`<circle cx="${(k*37+i*13)%160}" cy="${(k*23+i*7)%60+6}" r="1.2" fill="#fff"/>`).join('')}
  <path d="M0 96 Q40 76 80 92 T160 86 V120 H0Z" fill="#eef4ff" opacity=".9"/><path d="M14 96 l12-30 12 30z M120 92 l10-26 10 26z" fill="#173a5c"/>
  <g fill="none" stroke="${b}" stroke-width="1.4" opacity=".7"><path d="M70 112 l6-6 6 6 6-6 6 6"/></g></svg>`;}
// Подводка к сказке — заготовка: откуда сказка. Финальные подводки пишутся вместе с текстами озвучки
const TALE_WHERE={'русская народная':'по всей России','нанайская':'нанайцы на Амуре','ненецкая':'ненцы в тундре','чукотская':'на Чукотке','татарская':'в Татарстане',
  'мордовская':'в Мордовии','бурятская':'в Бурятии','коми-пермяцкая':'коми-пермяки в Прикамье','мансийская':'манси в Югре'};
function taleLead(t){const w=TALE_WHERE[t.n.replace(/ сказка$/,'')];return `${w?`эту сказку рассказывают ${w}. `:''}Устраивайтесь поудобнее — начинаю.`;}
function taleTime(){const T=D.TALES[ui.izba.cur];return {pct:ui.izba.pos/(T.d*60)*100,txt:`${mmss(ui.izba.pos)} / ${T.d}:00`};}
function ppBtn(){const pl=ui.izba.playing;return `<button class="pp" data-act="pp" aria-label="${pl?'Пауза':'Слушать'}">${pl?svg('pause'):svg('play')}</button>`;}
// Окно сказки: обложка, подводка, плеер
function taleHTML(){
  const i=ui.izba.cur,t=D.TALES[i];if(!t)return '';
  const tm=taleTime();
  return `<div class="info tsh"><div class="tsh-cv">${taleCover(t,i)}</div>
    <h3 class="info-t">${t.t}</h3><p class="tsh-n">${t.n} · ${t.d} мин</p>
    ${say('m_zhena','Настасья Петровна',taleLead(t),'compact')}
    <div class="tsh-pl">${ppBtn()}<div class="tsh-m"><div class="bar"><i class="pbar" style="width:${tm.pct}%"></i></div><span class="ptm">${tm.txt}</span></div></div></div>`;
}
function vIzba(){
  bar('Пряничная избушка','Аудиосказки на ночь');
  const cur=ui.izba.cur;
  // мини-плеер — когда окно сказки закрыто, а сказка выбрана
  const tm=cur!=null?taleTime():null;
  const player=cur!=null&&ui.sheet!=='tale'?`<div class="player"><span class="face"><img src="${A.m_zhena}" alt=""></span>${ppBtn()}
    <button class="meta" data-act="taleOpen"><b>${D.TALES[cur].t}</b><span>${D.TALES[cur].n} · читает Настасья Петровна</span><span class="bar"><i class="pbar" style="width:${tm.pct}%"></i></span></button>
    <span class="tm-l ptm">${tm.txt}</span></div>`:'';
  const hello=say('m_zhena','Настасья Петровна','устраивайтесь поудобнее. Каждую неделю я читаю две новые сказки — заходите почаще!','compact');
  const stats=`<div class="stats3"><div><b>${talesOpen()} из 10</b><span>сказок доступно</span></div><div><b>+2</b><span>каждую неделю</span></div><div><b>5–10</b><span>минут сказка</span></div></div>`;
  const tales=`<div class="tales">${D.TALES.map((t,i)=>{const lk=st.day<t.open;return `<button class="tale-r ${cur===i?'playing':''}" data-act="play" data-i="${i}" ${lk?'disabled':''}><span class="cv">${taleCover(t,i)}</span><span class="tt"><b>${t.t}</b><small>${t.n} · ${lk?'откроется '+fmt(t.open):t.d+' мин'}</small></span><span class="pl">${lk?svg('lock'):cur===i&&ui.izba.playing?svg('pause'):svg('play')}</span></button>`;}).join('')}</div>`;
  const stream=`<div class="stream"><span class="small ink2">Слушайте и вне платформы:</span><div class="row-c"><button class="btn btn-ghost btn-sm" data-act="toast" data-m="Ссылка на плейлист появится после публикации">VK Музыка</button><button class="btn btn-ghost btn-sm" data-act="toast" data-m="Ссылка на плейлист появится после публикации">Яндекс Музыка</button></div><p class="note">Сказки озвучены нейросетью</p></div>`;
  return {pre:endBanner(),
    L:`${pt('Пряничная избушка','Для детей · сказка на ночь','h1')}<img class="illo wide" src="${A.izba}" alt="">${hello}${stats}${stream}`,
    R:`${pt('Сказки на ночь',`Доступно ${talesOpen()} из 10`)}${tales}`,
    M:`<img class="illo" src="${A.izba}" alt="">${hello}${stats}${lbl('Сказки на ночь','s')}${tales}${stream}`,
    post:player,pn:25,cls:'izba'};
}
function mmss(s){s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
// Пауза и плей — без перерисовки экрана: окно сказки не мигает
function patchPlayer(){
  const pl=ui.izba.playing;
  $$('[data-act=pp]').forEach(b=>{b.innerHTML=pl?svg('pause'):svg('play');b.setAttribute('aria-label',pl?'Пауза':'Слушать');});
  $$('.tale-r').forEach(r=>{const on=+r.dataset.i===ui.izba.cur;r.classList.toggle('playing',on);const p=r.querySelector('.pl');if(p&&!r.disabled)p.innerHTML=on&&pl?svg('pause'):svg('play');});
}
function mountIzba(){
  if(ui.izba.cur==null)return;
  const t=setInterval(()=>{if(!ui.izba.playing)return;const T=D.TALES[ui.izba.cur];ui.izba.pos=Math.min(T.d*60,ui.izba.pos+1);
    const tm=taleTime();$$('.pbar').forEach(b=>b.style.width=tm.pct+'%');$$('.ptm').forEach(m=>m.textContent=tm.txt);
    if(ui.izba.pos>=T.d*60){ui.izba.playing=false;patchPlayer();}},1000);timers.push(t);
}

/* ===== Рейтинг =====
   Без пояснений: плашка о себе (имя, место, баллы), ниже — топ-20. Если вы ниже — своя строка под списком, выделена.
   Мерч получают первые десять: после десятой строки — черта. Медалей у первых трёх нет — победители все десять */
const LB_TOP=20;
function lbRow(x){return `<li class="lbr${x.me?' me':''}"><span class="pl">${x.place}</span>${ava(x.nick,DESK?36:32,x.me)}<span class="nm"><b>${tname(x.nick,x.city)}</b>${x.me?' <span class="tag">вы</span>':''}</span><span class="p">${num(x.p)}</span></li>`;}
function vRating(){
  bar('Турнирная таблица');
  const lb=board(),me=lb.find(x=>x.me);
  const mine=`<div class="myrank">${ava(me.nick,DESK?60:52,true)}<b class="mr-n">${esc(me.nick)}</b>
    <div class="mr-k"><div><b>${me.place}</b><span>место</span></div><div><b>${num(me.p)}</b><span>${plural(me.p,'балл','балла','баллов')}</span></div></div></div>`;
  const rows=lb.slice(0,LB_TOP).map((x,i)=>lbRow(x)+(i===9?'<li class="lb-cut" aria-hidden="true"><span>топ-10 получают мерч</span></li>':'')).join('');
  const tail=me.place>LB_TOP?`<li class="lb-gap" aria-hidden="true"><span></span><span></span><span></span></li>${lbRow(me)}`:'';
  const list=`<ol class="lb2">${rows}${tail}</ol><div class="lb-earn">${btn({t:'Где ещё заработать баллы',href:href('profile','#points'),gold:1})}</div>`;
  const head=`<div class="act-head"><h1 class="sc-t">Турнирная таблица</h1><p class="sc-sub">Топ-10 по итогам получат мерч</p></div>`;
  return {pre:endBanner(),one:[mine,list],M:[mine,list],dstage:head,cls:'rating'};
}

/* ===== Личный кабинет =====
   Слева — кто вы: табличка с инициалами и именем, баллы и место в таблице, персональный код, история начислений; в самом низу — «Выйти».
   Справа — «Мои баллы»: блок на каждое испытание и сериал — сколько заработано из возможного, что открыто, что и когда откроется.
   На телефоне — то же одной колонкой, без вкладок: баллы и место, «Мои баллы», код, история */
const SRC={quiz:'Спроси дорогу',forest:'Лес',tree:'Ёлка',serial:'Сказка-сериал'};
function pbHead(title,got,max,img,ic){
  const pct=max?Math.min(100,Math.round(got/max*100)):0;
  return `<div class="pb-h"><img class="pb-i${ic?' ic':''}" src="${A[img]}" alt=""><div class="pb-t"><b>${title}</b>${max?`<span class="pb-bar" aria-hidden="true"><i style="width:${pct}%"></i></span>`:''}</div>
    <span class="pb-v"><b>${num(got)}</b><small>${max?'из '+num(max):'без потолка'}</small></span></div>`;
}
function pbRow(t,s,right,cls){return `<div class="pb-r ${cls||''}"><div class="pb-rt"><b>${nb(t)}</b>${s?`<small>${nb(s)}</small>`:''}</div>${right?`<div class="pb-ra">${right}</div>`:''}</div>`;}
const pbLock=d=>`<span class="pb-lock">${svg('lock','width="12" height="12"')}${fmt(d,true)}</span>`;
const pbGot=p=>`<span class="pb-got">${svg('check','width="13" height="13" stroke-width="2.6"')}+${num(p)}</span>`;
const pbBtn=(t,o)=>btn(Object.assign({t,cls:'btn-sm',noarrow:1},o));
function pointsBlocks(){
  const P=pts();
  // Спроси дорогу: четыре набора — пройден, начат, доступен или закрыт до даты
  const qmax=D.QUIZ.reduce((s,r)=>s+r.qs.length*20,0);
  const qrows=D.QUIZ.map((r,i)=>{const res=st.quiz[i],n=r.qs.length,pq=qPend(i),name=`Набор ${i+1} · ${r.title}`;
    if(st.day<r.open)return pbRow(name,`до ${n*20} баллов · откроется ${fmt(r.open)}`,pbLock(r.open),'locked');
    if(res&&res.done)return pbRow(name,`${qFirst(res)} из ${n} верных`,pbGot(qFirst(res)*20),'done');
    if(pq)return pbRow(name,`остановились на вопросе ${pq.i+1} из ${n}`,pbBtn('Продолжить',{act:'goQuiz',i,gold:1}));
    return pbRow(name,`${n} вопросов · до ${n*20} баллов`,pbBtn('Пройти',{act:'goQuiz',i,gold:1}));}).join('');
  // Лес: баллы за лучший забег, потолка нет
  const g=st.forest.bestGifts||0;
  const frow=st.day<OPEN.forest?pbRow('Забег за подарками',`10 баллов за подарок · откроется ${fmt(OPEN.forest)}`,pbLock(OPEN.forest),'locked')
    :st.forest.runs?pbRow(`Рекорд — ${g} ${plural(g,'подарок','подарка','подарков')}`,'каждый подарок сверх рекорда — ещё 10 баллов',pbBtn('Побить рекорд',{act:'go',v:'forest'}))
    :pbRow('Забег за подарками','10 баллов за каждый подарок',pbBtn('Бежать',{act:'go',v:'forest',gold:1}));
  // Ёлка: 100 баллов — когда игрушку впервые повесили на общую ёлку
  const trow=st.day<OPEN.tree?pbRow('Игрушка на общей ёлке',`откроется ${fmt(OPEN.tree)}`,pbLock(OPEN.tree),'locked')
    :st.tree.pts?pbRow('Игрушка на общей ёлке',st.tree.on?'висит на ёлке':'сейчас снята с ёлки',pbGot(100),'done')
    :st.tree.ball?pbRow('Игрушка готова','повесьте её на ёлку — и сразу 100 баллов',pbBtn('Повесить',{act:'go',v:'tree',gold:1}))
    :pbRow('Игрушка на общей ёлке','сделайте свою и повесьте — 100 баллов',pbBtn('Сделать',{act:'go',v:'tree',gold:1}));
  // Сказка-сериал: голос за каждую главу, в том числе за финальную
  const ch=D.CHAPTERS,S=serialState(),nv=Object.keys(st.serial.votes||{}).length,nx=ch.findIndex(c=>st.day<c.day);
  const chips=`<div class="pb-ch">${ch.map((c,i)=>{const s=chState(i),v=st.serial.votes[i]!=null;return `<span class="${v?'got':s==='vote'?'live':s==='soon'?'soon':'miss'}" title="Глава ${ROMAN[i]}: ${v?'голос учтён':s==='vote'?'идёт голосование':s==='soon'?'выйдет '+fmt(c.day):'голосование прошло'}">${ROMAN[i]}</span>`;}).join('')}</div>`;
  const srow=S.kind==='vote'?pbRow(`Глава ${ROMAN[S.cur]}: идёт голосование`,`до ${fmt(S.c.day+1)}, 23:59 мск`,pbBtn('Голосовать',{act:'openCh',i:S.cur,gold:1}))
    :nx>=0?pbRow(`Глава ${ROMAN[nx]} выйдет ${fmt(nx>=0?ch[nx].day:0)}`,`голосование — 48 часов · ваших голосов ${nv} из ${ch.length}`,pbLock(ch[nx].day),'locked')
    :pbRow('Все голосования прошли',`ваших голосов — ${nv} из ${ch.length}`,'','done');
  return `<section class="pb">${pbHead('Спроси дорогу',P.q,qmax,'tile_quiz')}${qrows}</section>
    <section class="pb">${pbHead('Лес',P.f,0,'art_forest')}${frow}</section>
    <section class="pb">${pbHead('Ёлка',P.t,100,'tile_tree')}${trow}</section>
    <section class="pb">${pbHead('Сказка-сериал',P.s,ch.length*VOTE_PTS,'serial',1)}${chips}${srow}</section>`;
}
function vProfile(){
  bar('Личный кабинет');
  const u=st.user,p=pts(),me=board().find(x=>x.me),log=[...(st.log||[])].reverse();
  // табличка: аватар из инициалов и имя героя
  const plate=`<div class="pf-plate"><div class="nk-prev">${ava(u.nick,58,true)}<div class="nickplate"><div class="nk${nkLong(u.nick)?' long':''}">${esc(u.nick)}</div></div></div></div>`;
  const won=st.day>=OPEN.chest&&drawWinners().some(x=>x.me);
  const stats=`<div class="pf-k"><div><b>${num(p.total)}</b><span>${plural(p.total,'балл','балла','баллов')}</span></div><a href="${href('rating')}"><b>${me.place}</b><span>место в таблице</span></a></div>
    ${won?`<a class="pf-win" href="${href('chest')}">${svg('check','width="16" height="16"')}<span>${nb(`Вы среди победителей розыгрыша — с вами свяжутся до ${fmt(PRIZE_DAY)}`)}</span></a>`:''}`;
  const mailH=u.email?`<div class="note">Продублирован на ${esc(u.email)}</div>`
    :ui.pmail?`<div class="row pmail"><input class="input ${ui.auth.err?'err':''}" id="pmail" type="email" inputmode="email" autocomplete="email" placeholder="name@mail.ru" value="${esc(ui.pmailVal)}" aria-label="Личная почта"><button class="btn btn-ghost" data-act="pmailSend">Отправить</button></div>${ui.auth.err?`<div class="err-t">${ui.auth.err}</div>`:''}`
    :`<p class="note"><button class="link" data-act="pmailOpen">Прислать код на почту</button></p>`;
  const code=`${lbl('Персональный код')}<div class="codebox"><div class="code sm">${u.code}</div>
      <button class="btn btn-ghost btn-sm" data-act="copy" data-t="${u.code}">${svg('copy','width="14" height="14"')} Скопировать</button>${mailH}</div>
    ${st.day<=CODE_DEADLINE?portalHTML():''}`;
  const hist=`${lbl('История начислений')}${log.length?`<div class="hist">${log.map(e=>`<div class="hr"><span class="d">${fmt(e.d,true)}</span><span class="w"><b>${SRC[e.k]}</b><small>${esc(e.t)}</small></span><span class="p">+${num(e.p)}</span></div>`).join('')}</div>`
    :'<p class="tale small">Пока пусто — первые баллы даёт Спроси дорогу.</p>'}`;
  // выход — в самом низу и неприметно: вернуться можно только по коду
  const out=`<div class="logout">${ui.logout?`<p class="small">Выйти на этом устройстве? Вернуться можно будет только по коду <b>${u.code}</b> — сохраните его.</p><div class="row-c"><button class="btn btn-ghost btn-sm" data-act="logoutNo">Остаться</button><button class="btn btn-ghost btn-sm" data-act="logout">Выйти</button></div>`
    :'<button class="link" data-act="logoutAsk">Выйти</button>'}</div>`;
  const mine=`<div id="points">${lbl('Мои баллы')}${pointsBlocks()}</div>`;
  if(DESK)return {L:[`${stats}${code}`,`${hist}${out}`],R:[mine],dstage:plate,cls:'profile'};
  return {stage:plate,M:[stats,mine,code,`${hist}${out}`],cls:'profile'};
}

/* ===== Архив: после 17 января ===== */
// Испытания, голосования, таблица и кабинеты закрыты. Остаются итоги платформы, цельная сказка и аудиосказки — без входа
function vArchive(){
  bar('Итоги сказки','1 декабря — 17 января');
  const votes=D.CHAPTERS.filter(c=>!c.final).reduce((x,c)=>x+c.votes,0), P=participants(), C=citiesCount(), T=treeCount();
  const S=[[num(P),'помощников'],[C,plural(C,'город','города','городов')],[num(giftsTotal()),'подарков собрали в Лесу'],
    [num(T),plural(T,'игрушка','игрушки','игрушек')+' на общей ёлке'],[num(votes),'голосов в сказке-сериале'],[num(Math.round(P*24.6)),'ответов в квизе']];
  const hello=say('m_mikhail','Дед Мороз Михаил','спасибо, помощники! Я успел во все одиннадцать полуночей, подарки нашли своих хозяев. Сказку можно перечитать и послушать.','compact');
  const stats=`<div class="astats">${S.map(([b2,t])=>`<div><b>${b2}</b><span>${t}</span></div>`).join('')}</div>`;
  const bookC=`<div class="wcard"><img class="wim" src="${A.book}" alt=""><div class="wb"><span class="lbl-s">Сказка-сериал</span><b>Большая книга сказок</b><span>${num(D.SERIAL_AUTHORS)} сотрудников выбирали, куда повернёт сюжет: шесть глав и пять голосований</span>
    <div class="row tight">${btn({t:'Читать',act:'go',v:'fulltale',gold:1,noarrow:1,cls:'btn-sm'})}${btn({t:`${svg('down','width="16" height="16"')} PDF`,act:'pdf',cls:'btn-sm'})}</div></div></div>`;
  const izbaC=`<div class="wcard"><img class="wim" src="${A.hut}" alt=""><div class="wb"><span class="lbl-s">Для детей</span><b>Пряничная избушка</b><span>Десять аудиосказок народов России — здесь и в плейлистах VK Музыки и Яндекс Музыки</span>${btn({t:'Слушать',act:'go',v:'izba',noarrow:1,cls:'btn-sm'})}</div></div>`;
  const note=`<p class="note">Итоги турнирной таблицы и розыгрыша подведены. Испытания, голосования и личные кабинеты закрыты — спасибо всем, кто участвовал!</p>`;
  const head=sub=>`<h1 class="sc-t">Сказка закончилась</h1><p class="sc-sub">${sub}</p>`;
  return {L:`${hello}${stats}`,
    R:`${pt('Перечитать и послушать','Остаётся с вами')}${bookC}${izbaC}${note}`,
    dstage:`<div class="sc-title">${head('Новогодняя ночь длиной в страну · 1 декабря — 17 января')}</div>`,
    stage:`<div class="sc-hero"><img class="sc-ava" src="${A.bear_moroz}" alt=""><div class="sc-hb">${head('1 декабря — 17 января')}</div></div>`,
    M:[`${hello}${stats}`,`${lbl('Перечитать и послушать','s')}${bookC}${izbaC}${note}`],
    pn:31,cls:'archive',scene:1};
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
// Правило оформления: «в книге читают, в мире действуют». Мир сказки (сцена «Ночная поляна») — регистрация, маршрут, испытания, рейтинг, кабинет, сундук.
// Книга — обложка, пролог, сказка-сериал и главы, финал с историей пути, большая книга сказок, Пряничная избушка
const WORLD=['route','quiz','forest','tree','chest','rating','profile'];
const VIEWS={route:vRoute,profile:vProfile,quiz:vQuiz,forest:vForest,tree:vTree,serial:vSerial,chapter:vChapter,fulltale:vFullTale,izba:vIzba,chest:vChest,rating:vRating};
const MOUNTS={route:()=>{if(location.hash==='#tree'){const t=$('#tree');if(t)setTimeout(()=>t.scrollIntoView({block:'start'}),60);}},
  profile:()=>{if(location.hash==='#points'&&!render._pts){render._pts=1;const t=$('#points');if(t)setTimeout(()=>{const y=t.getBoundingClientRect().top+scrollY-(DESK?96:70);window.scrollTo({top:Math.max(0,y)});},60);}},forest:()=>{if(DESK||ui.fmode)mountForest(); if(DESK&&ui.fauto&&game){ui.fauto=false;ACT.fStart();}},chapter:mountChapter,izba:mountIzba};
const FOOT=()=>`<div class="foot"><span class="psb">${LOGO}</span>${footLinks()}<p>Прототип платформы · Deep × ПСБ · контент и цифры — примеры</p></div>`;
function render(){
  clearTimers();
  const app=$('#app'); ui.bar=null;
  let v, root=false;
  if(st.screen==='prologue')v=vCover();
  else if(st.screen==='auth')v=vAuth();
  else if(st.screen==='nick')v=vNick();
  else if(st.screen==='login')v=vLogin();
  else if(ARCH()){root=true;v=st.view==='fulltale'?vFullTale():st.view==='izba'?vIzba():vArchive();}
  else {ensureUser();root=ROOTS.includes(st.view);v=(VIEWS[st.view]||vRoute)();if(v&&typeof v==='object'&&v.scene==null&&WORLD.includes(st.view))v.scene=1;}
  const html=compose(v), inApp=st.screen==='app';
  document.body.classList.toggle('scene',!!(v&&v.scene));
  if(ARCH()&&inApp&&st.view==='route')document.title='Итоги сказки · Новогодняя ночь длиной в страну — ПСБ';
  document.body.dataset.screen=inApp?st.view:(st.screen==='prologue'?'cover':st.screen);
  document.body.classList.toggle('desk',DESK);
  document.body.classList.toggle('tabbed',root&&!DESK);
  document.body.classList.toggle('gm-on',!DESK&&inApp&&st.view==='forest'&&!!ui.fmode);
  // Компьютер: шапка с меню, «назад» над разворотом. Телефон: верхняя панель, нижнее меню на главных разделах
  // правила, поддержка и «Как играть» — поверх любого экрана
  const info=infoSheet();
  if(DESK)app.innerHTML=(inApp?header():'')+`<main class="app${inApp?'':' solo'}">${ui.bar&&ui.bar.back?crumb(ui.bar.back):''}${html}</main>`+(inApp?FOOT():'')+info;
  else app.innerHTML=(ui.bar?appbar(ui.bar):'')+`<main class="app">${html}${root?FOOT():''}</main>`+(root?tabbar():'')+info;
  if(inApp)(MOUNTS[st.view]||(()=>{}))();
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
const MARKS=[[0,'1 дек · старт'],[7,'8 дек · Лес'],[14,'15 дек · Ёлка'],[21,'22 дек · набор IV'],[24,'25 дек · розыгрыш'],[31,'1 января'],[47,'17 янв · конец'],[48,'18 янв · архив']];
const JUMPS=[['prologue','Обложка'],['nick','Имя героя'],['auth','Персональный код'],['login','Вход по коду'],['route','Маршрут'],['quiz','Квиз'],['forest','Лес'],['tree','Ёлка'],['serial','Сериал'],['chapter','Глава + голосование'],['izba','Избушка'],['chest','Сундук'],['rating','Рейтинг'],['profile','Кабинет']];
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
    <div class="dl">Розыгрыш Сундука чудес</div>
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
  if(!st.tree.pts){if(!st.tree.ball)st.tree.ball=await renderBall(AI.sample_girl,0);st.tree.made=1;st.tree.on=true;st.tree.ok=true;st.tree.pts=true;addLog('tree','Игрушка на общей ёлке',100);}
  save();
  if(st.screen!=='app'){flash('Готово: все испытания отмечены пройденными');go('route');return;}
  ui.demo=false;render();toast('Готово: все испытания отмечены пройденными');
}

/* ===== События ===== */
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const ACT={
  go:d=>go(d.v), enter:()=>{ensureUser();go('route');},
  toast:(d,e,ev)=>{ev.preventDefault();toast(d.m);}, copy:d=>copy(d.t),
  startAuth:()=>{if(st.user){go('route');return;}st.draft=null;go('nick');},
  toNick:(d,e,ev)=>{ev.preventDefault();saveDraft();go('nick');},
  pickA:d=>{ui.nick.a=+d.i;if(ui.sheet){ui.sheet=null;render();}else patchNick(false);},
  pickN:d=>{ui.nick.n=+d.i;if(ui.sheet){ui.sheet=null;render();}else patchNick(false);},
  pkOpen:d=>{ui.sheet=d.k==='a'?'pkA':'pkN';render();const on=$('.sheet .pk-i.on');if(on){const l=on.closest('.pk-list');l.scrollTop=on.offsetTop-l.offsetTop-l.clientHeight/2+on.offsetHeight/2;}},
  rndA:()=>{for(let t=0;t<100;t++){const a=rndI(D.ADJ.length);if(a!==ui.nick.a&&!nameOdd(a,ui.nick.n)){ui.nick.a=a;break;}}patchNick(true);},
  rndN:()=>{for(let t=0;t<100;t++){const n=rndI(NOUNS.length);if(n!==ui.nick.n&&!nameOdd(ui.nick.a,n)){ui.nick.n=n;break;}}patchNick(true);},
  regen:()=>{ui.nick=rndNick();patchNick(true);},
  mailSend:()=>{const v2=$('#email').value.trim();ui.auth.email=v2;const er=mailErr(v2);if(er){ui.auth.err=er;return render();}
    ui.auth.err='';ui.auth.sentTo=v2;saveDraft();render();toast('Код отправлен на '+v2);},
  mailEdit:()=>{ui.auth.sentTo=null;saveDraft();render();const e=$('#email');e&&e.focus();},
  saveNick:()=>{const q=cityQ();ui.city=cityFind(q);if(cityNorm(q)&&!ui.city){ui.cityErr=true;patchCity();const f=$('#city');if(f){f.scrollIntoView({block:'center',behavior:reduced()?'auto':'smooth'});f.focus({preventScroll:true});}return;}
    ui.cityQ=ui.city;const city=ui.city;const n=nickOf(ui.nick);ui.pending={nick:n.nick,g:n.g,city};saveDraft();go('auth');},
  citySel:d=>{ui.city=d.v;ui.cityQ=d.v;ui.cityErr=false;saveDraft();const f=$('#city');if(f){f.value=d.v;f.blur();}patchCity();},
  codeNext:()=>{if(!ui.rulesOk){toast('Отметьте, что принимаете правила');const c=$('.chk.agree');if(c){c.scrollIntoView({block:'center',behavior:reduced()?'auto':'smooth'});c.classList.remove('nudge');void c.offsetWidth;c.classList.add('nudge');}return;}if(!ui.auth.sentTo){ui.svOk=false;ui.sheet='savecode';render();return;}ACT.codeGo(null,null,null,true);},
  portal:(d,e,ev)=>{ev&&ev.preventDefault&&ev.preventDefault();toast('Ссылку на внутреннюю платформу даст банк');},
  toMail:()=>{ui.sheet=null;render();const e=$('#email');if(e){e.scrollIntoView({block:'center',behavior:reduced()?'auto':'smooth'});e.focus({preventScroll:true});}},
  codeGo:(d,e,ev,mailed)=>{if(!mailed&&!svReady())return;ui.sheet=null;const p=ui.pending;
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
    const er=mailErr(v2);if(er){ui.auth.err=er;return render();}
    ui.auth.err='';ui.pmail=false;st.user.email=v2;save();render();toast('Код отправлен на '+v2);},
  sheetOpen:(d,e,ev)=>{ev&&ev.preventDefault&&ev.preventDefault();ui.sheet=d.v;render();}, sheetClose:()=>{ui.sheet=null;render();},
  ballView:d=>{ui.ball=d.me?{me:1}:{n:d.n,c:d.c,b:+d.b,col:d.col};ui.sheet='ball';render();},
  seg:d=>{ui.seg[d.k]=d.v;render();},
  // квиз
  qRound:d=>{ui.quiz=null;st.qrun=null;save();ui.quizRound=+d.i;render();},
  qStart:()=>{const r=ui.quizRound||0;if(st.qpart&&st.qpart[r]){ACT.qGo();return;}ui.sheet='qrules';render();},
  qGo:()=>{const r=ui.quizRound||0,part=st.qpart&&st.qpart[r];
    if(part){ui.quiz=Object.assign({},part);delete st.qpart[r];}else ui.quiz={r,i:0,correct:0,answered:false,pick:null,replay:!!(st.quiz[r]&&st.quiz[r].done)};st.qrun=Object.assign({},ui.quiz);save();ui.sheet=null;ui.turn=true;render();window.scrollTo(0,0);},
  qPick:d=>{const q=ui.quiz;if(q.answered)return;q.pick=+d.i;q.answered=true;if(q.pick===D.QUIZ[q.r].qs[q.i].a)q.correct++;st.qrun=Object.assign({},q);save();ui.sheet=null;render();
    // пояснение — в том же окне: подводим к нему, если оно ушло за край экрана
    const ex=$('#expl');if(ex){const r=ex.getBoundingClientRect();if(r.top>innerHeight*.55)window.scrollBy({top:r.top-(DESK?120:90),behavior:reduced()?'auto':'smooth'});}},
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
  fPlay:()=>{landscapeLock();ui.fmode=true;render();},
  fStart:()=>{ForestSound.unlock();if(!game)mountForest();const ov=$('#ov');if(ov)ov.classList.add('hidden');const fn=$('#fin');if(fn)fn.classList.remove('hidden');game.start();ForestSound.musicPlay();fitField();},
  fAgain:()=>{if(DESK){ui.fauto=true;render();return;}landscapeLock();ui.fmode=true;render();},   // компьютер: новый забег стартует сразу
  fNext:()=>{const c=$('#ctrl');if(c)c.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'center'});},
  fResume:()=>{ForestSound.unlock();const ov=$('#ov');if(ov)ov.classList.add('hidden');if(game){game.resume();ForestSound.musicPlay();}},
  fSound:(d,t)=>{ForestSound.unlock();ForestSound.set(!ForestSound.on);const on=ForestSound.on;
    $$('.snd').forEach(b=>{b.innerHTML=svg(on?'snd':'sndOff');b.setAttribute('aria-pressed',on);b.title=on?'Выключить звук':'Включить звук';});if(t&&t.blur)t.blur();},
  fExit:(d,e,ev)=>{ev&&ev.preventDefault&&ev.preventDefault();if(game&&game.state.run){game.finish();return;}if(DESK)return;ForestSound.musicPause();landscapeUnlock();ui.fmode=false;render();window.scrollTo(0,0);},
  fLite:(d,e,ev)=>{ev&&ev.preventDefault();if(!DESK){ui.fmode=true;render();}startLite();},
  // ёлка
  tStyle:d=>{ui.tree.style=+d.i;render();},
  tStep:(d,e,ev)=>{ev&&ev.preventDefault();ui.tree.step=+d.s;render();},
  // «Тестовая картинка» — подставляет готовую, чтобы попробовать без своего файла; каждое нажатие — следующая из трёх
  tSample:()=>{const k=TEST_PICS[ui.tree.ti=((ui.tree.ti==null?-1:ui.tree.ti)+1)%TEST_PICS.length];setTreeSrc(AI[k]||A[k]);},
  tMake:()=>makeBall(),
  treeRot:d=>rotateTree(+d.d),
  // «Повесить» — сразу +100 баллов; у всех игрушка появится после проверки модератором
  tHang:()=>hangToy(true),
  tDownloadMine:()=>download(mineBall(),'novogodnyaya-igrushka.png'),
  // сериал
  openCh:d=>go('chapter','?ch='+(+d.i+1)),
  vote:d=>{const i=ui.chapter;if(st.serial.votes[i]!=null)return;st.serial.votes[i]=+d.k;addLog('serial',D.CHAPTERS[i].final?`Голос «Как вам финал?» · глава ${ROMAN[i]}`:`Голос за продолжение · глава ${ROMAN[i]}`,VOTE_PTS);save();render();toast(`Голос учтён · +${VOTE_PTS} баллов`);},
  toVote:()=>{const el=$('#vote');if(el)el.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});},
  ftCh:d=>{ui.seg.ft=+d.i;render();const s=DESK?$('.fulltale .pg.pr'):$('#chsel');if(s&&(!DESK||s.getBoundingClientRect().top<70))s.scrollIntoView({behavior:reduced()?'auto':'smooth',block:'start'});},
  pdf:()=>{const w=window.open('','_blank');if(!w){toast('Разрешите всплывающие окна, чтобы скачать PDF');return;}
    w.document.write(`<!doctype html><html lang="ru"><head><meta charset="utf-8"><title>Большая книга сказок — ПСБ</title><style>body{font:16px/1.7 Georgia,serif;max-width:680px;margin:40px auto;padding:0 24px;color:#222}h1{text-align:center;font-size:30px}p.sub{text-align:center;color:#777}</style></head><body><h1>Большая книга сказок</h1><p class="sub">Эту сказку написали ${num(D.SERIAL_AUTHORS)} сотрудников ПСБ</p>${fullTaleHTML(true)}<script>setTimeout(()=>print(),300)<\/script></body></html>`);w.document.close();},
  // избушка
  play:d=>{const i=+d.i;if(ui.izba.cur!==i)ui.izba={cur:i,playing:true,pos:0};ui.sheet='tale';render();},
  taleOpen:()=>{if(ui.izba.cur==null)return;ui.sheet='tale';render();},
  pp:()=>{if(ui.izba.cur==null)return;const T=D.TALES[ui.izba.cur];if(!ui.izba.playing&&ui.izba.pos>=T.d*60)ui.izba.pos=0;ui.izba.playing=!ui.izba.playing;patchPlayer();},
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
  if(e.target.id==='city'||e.target.classList.contains('city-o')){const o=$$('#citySug .city-o'),i=o.indexOf(document.activeElement);
    if(e.key==='ArrowDown'&&o.length){e.preventDefault();(o[i+1]||o[0]).focus();}
    if(e.key==='ArrowUp'&&o.length){e.preventDefault();if(i>0)o[i-1].focus();else $('#city').focus();}
    if(e.key==='Enter'&&e.target.id==='city'&&o.length===1){e.preventDefault();o[0].click();}
    if(e.key==='Escape'){const b=$('#citySug');if(b&&!b.hidden){e.stopPropagation();b.hidden=true;return;}}}
  if(e.key==='Enter'&&e.target.id==='email')ACT.mailSend();
  if(e.key==='Enter'&&e.target.id==='logincode')ACT.login();
  if(e.key==='Enter'&&e.target.id==='pmail')ACT.pmailSend();
  if(e.key==='Escape'){if(ui.sheet){ui.sheet=null;render();}else if($('#gm .sheet'))ACT.fAgain();}
});
document.addEventListener('change',e=>{
  // галочки-подтверждения: «код сохранён» и «можно показать на ёлке»
  if(e.target.id==='svOk'){ui.svOk=e.target.checked;$$('[data-act=codeGo]').forEach(b=>b.disabled=!svReady());}
  if(e.target.id==='rulesOk'){ui.rulesOk=e.target.checked;$$('[data-act=codeNext]').forEach(b=>b.classList.toggle('is-off',!ui.rulesOk));const c=$('.chk.agree');if(c)c.classList.remove('nudge');}
  if(e.target.id==='hangSw')hangToy(e.target.checked);
  if(e.target.id==='file'){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>setTreeSrc(r.result);r.readAsDataURL(f);}
});
document.addEventListener('input',e=>{
  if(e.target.classList.contains('pk-q')){filterPk(e.target);const l=e.target.closest('.pk-box').querySelector('.pk-list');if(l)l.scrollTop=0;}if(e.target.id==='city'){ui.cityQ=e.target.value;ui.city=cityFind(ui.cityQ);if(ui.city)ui.cityQ=ui.city;ui.cityErr=false;saveDraft();patchCity();}});
// Поле города: стрелка вниз — к подсказкам, Esc — закрыть; при уходе из поля подсказки прячутся
document.addEventListener('focusout',e=>{if(e.target.id==='city'||e.target.classList.contains('city-o'))setTimeout(()=>{const a=document.activeElement;if(a&&(a.id==='city'||a.classList.contains('city-o')))return;const b=$('#citySug');if(b){b.hidden=true;const i=$('#city');if(i)i.setAttribute('aria-expanded','false');}},150);});
document.addEventListener('focusin',e=>{if(e.target.id!=='city')return;patchCity();
  // телефон: поднимаем поле к верху экрана, чтобы под ним поместились подсказки
  if(!DESK)setTimeout(()=>{const f=$('#city');if(!f||document.activeElement!==f)return;const y=f.getBoundingClientRect().top-76;if(y>0)window.scrollBy({top:y,behavior:reduced()?'auto':'smooth'});setTimeout(placeCitySug,reduced()?0:350);},300);});
// мышью по подсказке — фокус остаётся в поле, список не закрывается до выбора
document.addEventListener('mousedown',e=>{if(e.target.closest('.city-o'))e.preventDefault();});
document.addEventListener('dragover',e=>{const d=e.target.closest('#drop');if(d){e.preventDefault();d.classList.add('over');}});
document.addEventListener('dragleave',e=>{const d=e.target.closest('#drop');if(d)d.classList.remove('over');});
document.addEventListener('drop',e=>{const d=e.target.closest('#drop');if(!d)return;e.preventDefault();const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/')){const r=new FileReader();r.onload=()=>setTreeSrc(r.result);r.readAsDataURL(f);}});
let swX=null;
document.addEventListener('pointerdown',e=>{if(e.target.closest('#treebox'))swX=e.clientX;});
document.addEventListener('pointerup',e=>{if(swX==null)return;const dx=e.clientX-swX;swX=null;if(Math.abs(dx)>40&&$('#treebox'))rotateTree(dx<0?1:-1);});
let tipEl=null;
document.addEventListener('mouseover',e=>{const g=e.target.closest('[data-tip]');if(!g){if(tipEl){tipEl.remove();tipEl=null;}return;}if(!tipEl){tipEl=document.createElement('div');tipEl.className='tip';document.body.appendChild(tipEl);}tipEl.textContent=g.dataset.tip;});
document.addEventListener('mousemove',e=>{if(tipEl){tipEl.style.left=(e.clientX+14)+'px';tipEl.style.top=(e.clientY+14)+'px';}});

/* ===== Старт страницы ===== */
function applyPage(){
  if(PAGE==='cover'||PAGE==='prologue'){st.screen='prologue';}
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
// Старый формат ёлки (до 26 октября: hung / rev) → одна игрушка с переключателем «на ёлке»
function migrateTree(){const t=st.tree;if(!t||!('hung' in t||'rev' in t))return;
  if(t.rev){t.ball=t.rev.ball;t.on=true;t.ok=false;t.pts=true;}else if(t.hung){t.ball=t.ball||A.toy0;t.on=true;t.ok=true;t.pts=true;}else{t.on=!!t.on;t.ok=!!t.ok;t.pts=!!t.pts;}
  delete t.hung;delete t.rev;save();}
(function boot(){
  if(guard())return;
  migrateTree();approveToy();
  applyPage();
  if(PAGE==='quiz'){const n=+QS.get('set');if(n>=1&&n<=D.QUIZ.length&&st.day>=D.QUIZ[n-1].open){ui.quizRound=n-1;if(st.qrun&&st.qrun.r!==n-1)stashRun();
      if(!st.qrun&&st.qpart&&st.qpart[n-1]){st.qrun=st.qpart[n-1];delete st.qpart[n-1];}}
    // незавершённый набор: возвращаем к тому же вопросу
    if(st.qrun){ui.quiz=Object.assign({},st.qrun);ui.quizRound=st.qrun.r;}}
  if(PAGE==='chapter'){const n=+QS.get('ch');if(n>=1&&n<=D.CHAPTERS.length)ui.chapter=n-1;else{let i=0;D.CHAPTERS.forEach((c,j)=>{if(st.day>=c.day)i=j;});ui.chapter=i;}}
  if(SS.get('turn')){SS.del('turn');ui.turn=true;}
  render();
  if(PAGE==='nick'||PAGE==='auth')saveDraft();
  const m=SS.get('toast');if(m){SS.del('toast');setTimeout(()=>toast(m),350);}
})();
// Вернулись кнопкой «Назад» из кэша браузера — перечитываем состояние, оно могло измениться на другой странице
window.addEventListener('pageshow',e=>{if(!e.persisted)return;try{st=Object.assign(fresh(),JSON.parse(localStorage.getItem(KEY)||'null')||{});}catch(err){}if(guard())return;migrateTree();applyPage();ui.fmode=false;ui.logout=false;render();});
// Переход через 900 px (поворот планшета, изменение окна) — перерисовываем под другой режим
// Короткие ложные срабатывания (масштаб, снимок экрана, промежуточные размеры окна) игнорируем: перерисовка — только если режим держится 150 мс
let mqT;const onMQ=()=>{clearTimeout(mqT);mqT=setTimeout(()=>{const m=MQ.matches;if(m===DESK)return;DESK=m;ui.sheet=null;if(DESK)ui.fmode=false;render();},150);};
if(MQ.addEventListener)MQ.addEventListener('change',onMQ);else MQ.addListener(onMQ);
