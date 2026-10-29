/* Админка платформы «Новогодняя ночь длиной в страну» — прототип-схема.
   Показывает, какие разделы и действия будут у команды Deep и банка. Верстка нарочно простая.
   Данные — примеры: контент из data.js, участники и очереди сгенерированы. На сервер ничего не уходит, после перезагрузки всё сбрасывается. */
(function(){
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const num=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,' ');
function rng(seed){return function(){seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function plural(n,a,b,c){n=Math.abs(n)%100;const k=n%10;if(n>10&&n<20)return c;if(k>1&&k<5)return b;if(k===1)return a;return c;}
const MONTHS=['января','февраля','марта','апреля','мая','июня','июля','августа','сентября','октября','ноября','декабря'];
const dOf=d=>new Date(2026,11,1+d);
const fmt=d=>{const t=dOf(d);return t.getDate()+' '+MONTHS[t.getMonth()];};
const dd=d=>{const t=dOf(d);return String(t.getDate()).padStart(2,'0')+'.'+String(t.getMonth()+1).padStart(2,'0')+'.'+t.getFullYear();};
const ROMAN=['I','II','III','IV','V','VI'];
// «Сейчас» в админке — 15 декабря: в 00:00 мск открылись Елка, набор III квиза, глава V и сказки 7–8
const TODAY=14, NOW_T='10:40';
const OPEN={quiz:0,forest:7,tree:14,chest:24}, LAST_DAY=47, DRAW_N=10;
const CODE_DEADLINE=OPEN.chest-1, PRIZE_DAY=OPEN.chest+5;   // код на портале «Ньютон» — до 24 декабря, 23:59 мск; с победителями свяжутся до 30 декабря
const R=rng(4242), pick=a=>a[Math.floor(R()*a.length)];
const NOUNS=D.NOUNS.map(([w,g])=>({w,g}));
const CIT=D.CITIES.slice(0,90).map(c=>c[0]);
const STYLES=BALL_STYLES.map(s=>s.n);
const A1=D.ADJ.filter(a=>a[2]===0), A2=D.ADJ.filter(a=>a[2]>0);
function mkNick(){const N=pick(NOUNS);return pick(A1)[N.g]+' '+pick(A2)[N.g]+' '+N.w;}
function mkCode(){const a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let s='PSB-';for(let i=0;i<8;i++){s+=a[Math.floor(R()*32)];if(i===3)s+='-';}return s;}

/* ---------- данные-примеры ---------- */
const USERS=[];{const seen=new Set();while(USERS.length<160){const nick=mkNick();if(seen.has(nick))continue;seen.add(nick);
  const q=Math.floor(R()*21)*20,f=Math.floor(R()*42)*10,t=R()<.42?100:0;
  if(R()<.34){R();R();}   // здесь раньше генерировалась почта: тянем те же случайные числа, чтобы данные-примеры не поменялись
  const s=(USERS.length*7%5)*20;   // сериал: 20 баллов за голос, к 15 декабря — до 4 голосов
  USERS.push({id:USERS.length+1,nick,city:R()<.28?'Москва':R()<.08?'':pick(CIT),code:mkCode(),q,f,t,s,pts:q+f+t+s,day:Math.floor(R()*(TODAY+1)),blocked:false});}}
USERS.sort((a,b)=>b.pts-a.pts||a.day-b.day);
const TOYS=[...Array(12)].map((_,i)=>{const u=pick(USERS);return {id:i+1,nick:u.nick,city:u.city,src:['sample_draw','sample_team','sample_girl'][i%3],style:(i*5)%6,
  time:String(Math.floor(R()*10)).padStart(2,'0')+':'+String(Math.floor(R()*60)).padStart(2,'0'),st:'wait',img:null,why:''};}).sort((a,b)=>a.time<b.time?-1:1);
let toysReady=false;
const SUSP=[
  {nick:USERS[3].nick,run:'15 дек, 09:12',gifts:74,time:'41 с',why:'Подарков больше, чем было на пройденном пути',st:'wait'},
  {nick:USERS[17].nick,run:'14 дек, 22:47',gifts:39,time:'2 мин 10 с',why:'6 забегов за минуту с одного устройства',st:'wait'},
  {nick:USERS[25].nick,run:'14 дек, 18:03',gifts:52,time:'1 мин 02 с',why:'Длительность меньше возможной для такого пути',st:'wait'}
];
const CH=D.CHAPTERS.map((c,i)=>({t:c.t,img:A[c.img],text:c.p.join('\n\n'),o:(c.o||[]).slice(),day:c.day,final:!!c.final,note:'',sched:false,
  empty:c.day>TODAY+1}));      // глава VI (18 декабря) еще не загружена: ее пишут по итогам голосования главы V
CH.forEach(c=>{if(c.empty){c.t='';c.img='';c.text='';if(!c.final)c.o=['','',''];}});
const LOG=[
  ['10:32','Анна (модератор)','одобрила 46 игрушек на елке'],['09:58','Анна (модератор)','отклонила игрушку: реклама, QR-код'],
  ['09:15','Илья (редактор)','загрузил аудиосказки 9–10, публикация 22 декабря'],['00:00','Система','опубликованы глава V, набор III квиза, сказки 7–8; открыта Елка'],
  ['14 дек, 23:59','Система','закрыто голосование главы IV — победил вариант «Сказать спасибо тем, кто рядом»']
];
let drawRes=null, drawPub=false, codeList=null, sel={ch:4,set:2,q:0,user:null,toyTab:'wait'}, frozen=false;

/* ---------- общие кусочки ---------- */
const st=(t,k)=>`<span class="st ${k||''}">${t}</span>`;
const head=(t,p,right)=>`<div class="head"><div><h1>${t}</h1>${p?`<p>${p}</p>`:''}</div>${right?`<div class="row">${right}</div>`:''}</div>`;
const kpi=(b,s,warn)=>`<div class="kpi ${warn?'warn':''}"><b>${b}</b><span>${s}</span></div>`;
const btn=(t,act,o={})=>`<button class="btn ${o.cls||''}" data-act="${act}"${o.d?Object.entries(o.d).map(([k,v])=>` data-${k}="${esc(v)}"`).join(''):''}${o.dis?' disabled':''}>${t}</button>`;
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('on'),2400);}
function log(who,what){LOG.unshift([NOW_T,who,what]);}
function csv(name,rows){const s='﻿'+rows.map(r=>r.map(x=>{x=String(x==null?'':x);return /[;"\n]/.test(x)?'"'+x.replace(/"/g,'""')+'"':x;}).join(';')).join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([s],{type:'text/csv;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},800);toast('Выгружен файл '+name);}
const waitToys=()=>TOYS.filter(t=>t.st==='wait').length, waitSusp=()=>SUSP.filter(s=>s.st==='wait').length;
function chState(i){const c=CH[i];if(c.empty&&!c.sched)return ['Не загружена','bad'];if(c.day>TODAY)return ['Запланирована на '+fmt(c.day),'acc'];
  if(TODAY<=c.day+1)return ['Голосование до '+fmt(c.day+1)+', 23:59','warn'];return ['Итоги подведены','ok'];}
function votes(i){const c=D.CHAPTERS[i];if(TODAY<c.day)return null;const fr=TODAY>c.day+1?1:TODAY===c.day?.42:.86;const tot=Math.round(c.votes*fr);return {tot,cnt:c.pct.map(p=>Math.round(tot*p/100)),lead:c.pct.indexOf(Math.max(...c.pct)),done:TODAY>c.day+1};}

/* ---------- разделы ---------- */
const SECTIONS=[
  ['dash','Обзор',null],
  ['g1','Модерация'],['tree','Елка',waitToys],
  ['g2','Контент'],['serial','Сказка-сериал',null],['quiz','Квиз',null],['tales','Аудиосказки',null],
  ['g3','Итоги и участники'],['draw','Розыгрыш',null],['rating','Турнирная таблица',waitSusp],['users','Участники и коды',null],
  ['g4','Настройки'],['schedule','Расписание',null],['dict','Справочники',null],['access','Доступы и журнал',null]
];
let cur=(location.hash||'#dash').slice(1);

function vDash(){
  const nx=[[17,'Глава VI (финальная) — нужно загрузить до 17 декабря'],[21,'Набор IV квиза, сказки 9–10'],[CODE_DEADLINE,'Последний день ввести код на портале «Ньютон» — до 23:59'],[OPEN.chest,'Розыгрыш Сундука чудес по списку кодов от банка, цельная сказка (PDF)']];
  return head('Обзор',`Сегодня ${fmt(TODAY)}, ${NOW_T} мск. Разделы и главы открываются в 00:00 мск. Платформа работает до 17 января, после — архив.`)+
  `<div class="grid g4">${kpi(num(2100+TODAY*520),'участников · +520 за сутки')}${kpi('63','города')}${kpi(num(waitToys()),plural(waitToys(),'игрушка ждет','игрушки ждут','игрушек ждут')+' проверки',waitToys()>0)}${kpi(num(waitSusp()),plural(waitSusp(),'подозрительный забег','подозрительных забега','подозрительных забегов')+' в Лесу',waitSusp()>0)}</div>
  <div class="grid g2" style="margin-top:12px">
    <div class="panel"><h2>Требует внимания</h2><table class="tbl">
      <tr class="click" data-go="tree"><td>Игрушки на модерации</td><td class="num">${st(waitToys(),waitToys()?'warn':'ok')}</td></tr>
      <tr class="click" data-go="rating"><td>Подозрительные результаты Леса</td><td class="num">${st(waitSusp(),waitSusp()?'warn':'ok')}</td></tr>
      <tr class="click" data-go="serial"><td>Глава VI не загружена · выход ${fmt(17)}</td><td class="num">${CH[5].empty&&!CH[5].sched?st('нужно сделать','bad'):st('готово','ok')}</td></tr></table></div>
    <div class="panel"><h2>Сейчас на платформе</h2><table class="tbl">
      <tr><td>Голосование главы V</td><td class="num">${num(votes(4).tot)} голосов · до ${fmt(15)}, 23:59</td></tr>
      <tr><td>Квиз · набор III «${esc(D.QUIZ[2].title)}»</td><td class="num">открыт сегодня</td></tr>
      <tr><td>Елка</td><td class="num">открыта сегодня</td></tr>
      <tr><td>Розыгрыш</td><td class="num">${fmt(OPEN.chest)} · через ${OPEN.chest-TODAY} ${plural(OPEN.chest-TODAY,'день','дня','дней')} · код — до ${fmt(CODE_DEADLINE)}, 23:59</td></tr></table></div>
  </div>
  <div class="panel"><h2>Ближайшие публикации</h2><table class="tbl">${nx.map(([d,t])=>`<tr><td style="width:150px">${fmt(d)}, 00:00</td><td>${t}</td></tr>`).join('')}</table>
    <p class="small muted" style="margin:10px 0 0">Полный календарь — в разделе <a href="#schedule">«Расписание»</a>.</p></div>`;
}

function vTree(){
  if(!toysReady){toysReady=true;TOYS.forEach(async t=>{t.img=await renderBall(AI[t.src],t.style);if(cur==='tree')render();});}
  const tab=sel.toyTab, list=TOYS.filter(t=>t.st===tab);
  const card=t=>`<div class="mod ${t.st!=='wait'?'done':''}"><div class="img">${t.img?`<img src="${t.img}" alt="">`:'<span class="small muted" style="color:#9aa">генерация…</span>'}</div>
    <b>${esc(t.nick)}</b><span class="small muted">${esc(t.city||'город не указан')} · ${t.time} · ${STYLES[t.style]}</span>
    ${t.st==='wait'?`<select class="in sm" data-why="${t.id}" style="height:30px;font-size:12.5px"><option value="">Причина отказа…</option><option>Оскорбительное или неуместное</option><option>Чужие персональные данные, документы</option><option>Реклама, ссылки, QR-коды</option><option>Не удалось распознать картинку</option></select>
    <div class="acts">${btn('Одобрить','toyOk',{cls:'ok sm',d:{id:t.id}})}${btn('Отклонить','toyNo',{cls:'bad sm',d:{id:t.id}})}</div>`
    :t.st==='ok'?st('Одобрена — висит на елке','ok'):st('Отклонена: '+(t.why||'без причины'),'bad')}</div>`;
  return head('Модерация елки','100 баллов участник получает сразу, как повесит игрушку на елку, а коллеги видят ее после одобрения — до этого автор видит ее на елке сам. ИИ перерисовывает картинку в стиле елочной игрушки, это уже не фото — согласие на показ не нужно. Исходная картинка удаляется сразу после генерации: модератор видит только готовую игрушку.',
    btn('Одобрить все на странице','toyAll',{cls:'p',dis:tab!=='wait'||!list.length}))+
  `<div class="tabs">${[['wait','На проверке',waitToys()],['ok','Одобрены',TOYS.filter(t=>t.st==='ok').length],['no','Отклонены',TOYS.filter(t=>t.st==='no').length]].map(([k,l,n])=>`<button class="${tab===k?'on':''}" data-act="toyTab" data-k="${k}">${l} · ${n}</button>`).join('')}</div>
  ${list.length?`<div class="mods">${list.map(card).join('')}</div>`:`<div class="note">Здесь пусто.</div>`}
  <p class="note" style="margin-top:14px">Отклоненная игрушка снимается с общей елки, автор видит причину и может сделать новую — единственный случай второй генерации. Начисленные 100 баллов остаются. Срок проверки (SLA) и состав модераторов — уточняются.</p>`;
}

function vSerial(){
  const i=sel.ch, c=CH[i], s=chState(i), v=votes(i);
  const prev=i>0?votes(i-1):null, pc=i>0?D.CHAPTERS[i-1]:null;
  const brief=pc&&prev?`<div class="note i" style="margin:0 0 12px"><b>Основа сюжета:</b> ${prev.done?`в главе ${ROMAN[i-1]} победил вариант «${esc(pc.o[prev.lead])}» — ${pc.pct[prev.lead]}%.`:`голосование главы ${ROMAN[i-1]} идет до ${fmt(pc.day+1)}, 23:59. Сейчас лидирует «${esc(pc.o[prev.lead])}».`} Текст и иллюстрацию генерируем в нейросети по этому выбору и правим вручную.</div>`:'';
  const rows=CH.map((x,k)=>{const s2=chState(k),v2=votes(k);return `<tr class="click ${k===i?'on':''}" data-act="chSel" data-i="${k}"><td><b>${ROMAN[k]}</b></td><td>${x.t?esc(x.t):'<span class="muted">не загружена</span>'}${x.final?' <span class="small muted">· финальная, голосование для настроения</span>':''}</td><td>${fmt(x.day)}, 00:00</td><td>${st(s2[0],s2[1])}</td><td class="num">${v2?num(v2.tot):'—'}</td></tr>`;}).join('');
  const res=v?`<div class="panel"><h2>${v.done?'Итоги голосования':'Голосование идет'} · ${num(v.tot)} голосов</h2><div class="bars">${D.CHAPTERS[i].o.map((o,k)=>{const p=Math.round(v.cnt[k]/v.tot*100);return `<div class="bar ${v.done&&k===v.lead?'win':''}"><i style="width:${p}%"></i><span>${'АБВ'[k]}. ${esc(o)}</span><b>${p}%</b></div>`;}).join('')}</div>
    <p class="small muted" style="margin:10px 0 0">${v.done?(D.CHAPTERS[i].final?'Голосование для настроения: на сюжет не влияет.':`Победивший вариант — основа главы ${ROMAN[i+1]||''}.`):`Участники видят распределение голосов сразу после своего голоса. Голосование закрывается ${fmt(D.CHAPTERS[i].day+1)} в 23:59 мск.`}</p></div>`:'';
  const ed=`<div class="panel"><div class="row" style="margin:0 0 10px"><h2 style="margin:0">Глава ${ROMAN[i]} · ${c.empty&&!c.sched?'загрузка':'редактирование'}</h2><span class="sp"></span>${st(s[0],s[1])}</div>
    ${brief}${c.day<=TODAY?'<div class="note" style="margin:0 0 12px">Глава уже опубликована: исправления появятся у участников сразу после сохранения.</div>':''}
    <div class="grid g2"><div>
      <label class="f"><span>Название</span><input class="in" id="chT" value="${esc(c.t)}" placeholder="Например, «Последнее слово»"></label>
      <label class="f"><span>Текст главы</span><textarea class="in" id="chX" rows="10" placeholder="Сгенерированный и отредактированный текст. Абзацы — через пустую строку">${esc(c.text)}</textarea><small>${c.text?c.text.split(/\n\s*\n/).length+' абз. · '+c.text.length+' знаков':'Рекомендуем 1 500–2 500 знаков: глава читается за 2–3 минуты'}</small></label>
    </div><div>
      <div class="f"><span>Иллюстрация</span>${c.img?`<img class="thumb" id="chImg" src="${c.img}" alt="">`:`<div class="thumb" id="chImg" style="display:grid;place-items:center;color:#9aa3c7">нет картинки</div>`}
        <label class="btn sm" style="margin-top:6px;align-self:flex-start">Загрузить картинку<input type="file" accept="image/*" id="chFile" hidden></label><small>Сгенерирована нейросетью · 4:3, от 1600 px по ширине</small></div>
      ${c.final?`<div class="f"><span>Голосование для настроения — на сюжет не влияет</span>${c.o.map((o,k)=>`<div class="opt"><span class="k">${'АБВ'[k]}</span><input class="in" value="${esc(o)}" readonly></div>`).join('')}<small>Варианты постоянные. За голос — 20 баллов, как в других главах. 25 декабря все главы собираются в цельную сказку (PDF)</small></div>`:`<div class="f"><span>Варианты для голосования</span>${c.o.map((o,k)=>`<div class="opt"><span class="k">${'АБВ'[k]}</span><input class="in" value="${esc(o)}" placeholder="Вариант ${'АБВ'[k]}"></div>`).join('')}</div>`}
      <div class="grid g2"><label class="f"><span>Выход</span><input class="in" value="${dd(c.day)} 00:00 мск" readonly></label>${`<label class="f"><span>Голосование до</span><input class="in" value="${dd(c.day+1)} 23:59 мск" readonly><small>48 часов, считается само</small></label>`}</div>
    </div></div>
    <label class="f"><span>Заметка редактора — не публикуется</span><textarea class="in" rows="2" style="min-height:60px" placeholder="Промпт, источники, что поправили">${esc(c.note)}</textarea></label>
    <div class="row">${btn('Сохранить','chSave',{cls:'p'})}<a class="btn" href="chapter.html?ch=${i+1}" target="_blank" rel="noopener">Предпросмотр на платформе ↗</a>${c.day>TODAY?btn(c.sched?'Снять с публикации':'Запланировать на '+fmt(c.day)+', 00:00','chSched',{cls:c.sched?'':'ok'}):''}</div></div>`;
  return head('Сказка-сериал','Главы генерируем в нейросети и немного правим. Глава = иллюстрация + текст + три варианта продолжения. Голосование — 48 часов, до 23:59 мск следующего дня; результаты участники видят сразу после голоса. За голос — 20 баллов в турнирную таблицу. В финальной главе — голосование для настроения: «Ура, класс!» или «Эх, а я думал, будет по-другому».')+
    `<div class="panel scroll"><table class="tbl"><tr><th>Глава</th><th>Название</th><th>Выход</th><th>Статус</th><th class="num">Голосов</th></tr>${rows}</table></div>${res}${ed}
    <div class="panel"><h2>Цельная сказка · ${fmt(D.FULL_TALE_DAY)}</h2><p class="muted">Собирается автоматически из опубликованных глав: текст, иллюстрации, итоги голосований. Читается на платформе и скачивается в PDF.</p>${btn('Собрать предпросмотр PDF','pdf')}</div>`;
}

function vQuiz(){
  const si=sel.set, S=D.QUIZ[si], qi=Math.min(sel.q,S.qs.length-1), Q=S.qs[qi], r=rng(si*31+7);
  const pct=S.qs.map(()=>Math.round(38+r()*52));
  const sets=D.QUIZ.map((s,k)=>{const open=TODAY>=s.open;return `<tr class="click ${k===si?'on':''}" data-act="setSel" data-i="${k}"><td><b>${ROMAN[k]}</b></td><td>${esc(s.title)}</td><td>${fmt(s.open)}, 00:00</td><td>${s.qs.length}</td><td>${open?st(TODAY===s.open?'Открыт сегодня':'Открыт','ok'):st('Запланирован','acc')}</td><td class="num">${open?num(Math.round((2100+TODAY*520)*(.78-k*.12)*(TODAY===s.open?.2:1))):'—'}</td></tr>`;}).join('');
  const qs=S.qs.map((q,k)=>`<tr class="click ${k===qi?'on':''}" data-act="qSel" data-i="${k}"><td>${k+1}</td><td>${q.t==='w'?'Слово':'Узор'}</td><td><b>${esc(q.t==='w'?q.w:'Узор на '+q.on)}</b></td><td>${esc(q.o[q.a])}</td><td>${esc(q.where)}</td><td class="num">${TODAY>=S.open?pct[k]+'%':'—'}</td></tr>`).join('');
  const ed=`<div class="panel"><h2>Вопрос ${qi+1} · редактирование</h2><div class="grid g2"><div>
      <label class="f"><span>Тип</span><select class="in"><option ${Q.t==='w'?'selected':''}>Слово на диалекте</option><option ${Q.t!=='w'?'selected':''}>Узор — угадать край</option></select></label>
      ${Q.t==='w'?`<label class="f"><span>Слово</span><input class="in" value="${esc(Q.w)}"></label>`:`<div class="f"><span>Узор</span><div style="width:120px;height:120px;border-radius:8px;background:#121a3a;padding:8px">${patternSVG(Q.p)}</div><label class="btn sm" style="margin-top:6px;align-self:flex-start">Загрузить картинку узора<input type="file" accept="image/*" hidden></label></div><label class="f"><span>Где узор</span><input class="in" value="${esc(Q.on)}"></label>`}
      <label class="f"><span>Регион — показывается в пояснении</span><input class="in" value="${esc(Q.where)}"></label></div><div>
      <div class="f"><span>Варианты ответа · отметьте верный</span>${Q.o.map((o,k)=>`<label class="opt"><input type="radio" name="qa" ${k===Q.a?'checked':''}><input class="in" value="${esc(o)}"></label>`).join('')}</div>
      <label class="f"><span>Пояснение после ответа</span><textarea class="in" rows="4" style="min-height:90px">${esc(Q.ex)}</textarea></label></div></div>
    <div class="row">${btn('Сохранить','save',{cls:'p'})}${TODAY>=S.open?'<span class="small muted">Набор уже открыт: правка не меняет начисленные баллы</span>':''}</div></div>`;
  return head('Квиз · Спроси дорогу','Новый набор каждую неделю. 20 баллов за верный ответ с первой попытки; повторное прохождение — без баллов. Верный ответ участник узнаёт только после своего ответа.',btn('Добавить вопрос','save'))+
    `<div class="panel scroll"><table class="tbl"><tr><th>Набор</th><th>Название</th><th>Открытие</th><th>Вопросов</th><th>Статус</th><th class="num">Прошли</th></tr>${sets}</table></div>
    <div class="panel scroll"><h2>Набор ${ROMAN[si]} «${esc(S.title)}»</h2><table class="tbl"><tr><th>№</th><th>Тип</th><th>Вопрос</th><th>Верный ответ</th><th>Регион</th><th class="num">Верно с первой попытки</th></tr>${qs}</table></div>${ed}`;
}

function vTales(){
  const rows=D.TALES.map((t,k)=>{const open=TODAY>=t.open;return `<tr><td>${k+1}</td><td><b>${esc(t.t)}</b><div class="small muted">${esc(t.n)}</div></td><td class="num">${t.d}:00</td><td>${st('mp3 · ИИ-озвучка','ok')}</td><td>${fmt(t.open)}</td><td>${open?st('Опубликована','ok'):st('Запланирована','acc')}</td>
    <td><input class="in" style="height:30px;min-width:150px" placeholder="vk.com/music/…" value="${open&&k<4?'vk.com/music/playlist/…':''}"></td><td><input class="in" style="height:30px;min-width:150px" placeholder="music.yandex.ru/album/…" value="${open&&k<4?'music.yandex.ru/album/…':''}"></td></tr>`;}).join('');
  return head('Аудиосказки · Пряничная избушка','10 сказок народов России, по две в неделю, — из коллекции Марии, жены Михаила; озвучка — нейросеть. На платформе сказка открывается окном: обложка, подводка Марии и плеер. Вне платформы — плейлисты в VK Музыке и Яндекс Музыке (варианты публикации — в README, раздел 6.10).',btn('Загрузить сказку','save',{cls:'p'}))+
  `<div class="panel scroll"><table class="tbl"><tr><th>№</th><th>Сказка</th><th class="num">Длит.</th><th>Аудио</th><th>Открытие</th><th>Статус</th><th>VK Музыка</th><th>Яндекс Музыка</th></tr>${rows}</table></div>
  <div class="panel"><h2>Новая сказка</h2><div class="grid g3">
    <label class="f"><span>Название</span><input class="in" placeholder="Например, «Морозко»"></label><label class="f"><span>Источник</span><input class="in" placeholder="русская народная сказка"></label><label class="f"><span>Открытие</span><input class="in" value="${dd(21)} 00:00 мск"></label>
    <label class="f"><span>Аудио (mp3)</span><input class="in" type="file" accept="audio/*" style="padding-top:6px"></label><label class="f"><span>Обложка</span><input class="in" type="file" accept="image/*" style="padding-top:6px"></label><label class="f"><span>Голос нейросети</span><input class="in" placeholder="сервис и голос"></label></div>
    <label class="f"><span>Подводка Марии — 1–2 предложения в окне сказки</span><input class="in" placeholder="Эту сказку рассказывают…"></label>
    <div class="row" style="margin:0 0 12px"><label class="row"><input type="checkbox" checked> Пометка «озвучено ИИ» в описании</label><label class="row"><input type="checkbox"> Лицензия сервиса озвучки разрешает коммерческое использование</label><label class="row"><input type="checkbox"> Права на текст проверены (народная сказка или договор на обработку)</label></div>
    ${btn('Сохранить','save',{cls:'p'})}</div>`;
}

function vDraw(){
  const before=TODAY<OPEN.chest, L=codeList;
  const res=drawRes?`<div class="panel scroll"><div class="row" style="margin:0 0 10px"><h2 style="margin:0">Победители · ${DRAW_N} из ${num(L.ok)}</h2><span class="sp"></span>${drawPub?st('Опубликовано на платформе','ok'):st('Не опубликовано','warn')}</div>
    <table class="tbl"><tr><th>№</th><th>Герой</th><th>Город</th><th>Персональный код</th><th>Банк связался</th></tr>${drawRes.map((u,k)=>`<tr><td>${k+1}</td><td><b>${esc(u.nick)}</b></td><td>${esc(u.city||'—')}</td><td><code>${u.code}</code></td><td><input type="checkbox" data-conf="${k}" ${u.conf?'checked':''}></td></tr>`).join('')}</table>
    <p class="small muted" style="margin:10px 0">Журнал: розыгрыш проведен ${fmt(TODAY)}, ${NOW_T} мск · в розыгрыше ${num(L.ok)} кодов из списка банка · зерно генератора <code>${drawRes.seed}</code> — по нему результат можно воспроизвести и проверить.</p>
    <div class="row">${btn('Опубликовать итоги на платформе','drawPub',{cls:'ok',dis:drawPub})}${btn('Выгрузить для банка (CSV)','drawCsv')}${btn('Провести заново','drawRun',{dis:drawPub})}</div></div>`:'';
  const list=L?`<table class="tbl"><tr><td>Кодов в списке банка</td><td class="num">${num(L.total)}</td></tr><tr><td>Найдены на платформе</td><td class="num">${num(L.found)}</td></tr><tr><td>Не найдены — опечатка или чужой код</td><td class="num">${num(L.miss)}</td></tr><tr><td>Заблокированы — не участвуют</td><td class="num">${num(L.blocked)}</td></tr><tr><td><b>Участвуют в розыгрыше</b></td><td class="num"><b>${num(L.ok)}</b></td></tr></table>
      <p class="small muted" style="margin:10px 0">Файл ${esc(L.file)} · загружен ${fmt(TODAY)}, ${NOW_T}</p>`
    :`<p class="muted">Банк присылает список после ${fmt(CODE_DEADLINE)}, 23:59 мск: CSV, один столбец — персональный код. Платформа сверяет коды со своими.</p>`;
  return head('Розыгрыш Сундука чудес',`Участвуют только те, кто до ${fmt(CODE_DEADLINE)}, 23:59 мск ввел свой персональный код на портале «Ньютон». Список введенных кодов присылает банк: загружаем его, платформа сверяет коды и случайно выбирает победителей. Победителям ничего делать не нужно — их код уже введен, банк свяжется с ними до ${fmt(PRIZE_DAY)}.`)+
  `<div class="grid g2"><div class="panel"><h2>1. Список кодов от банка</h2>${list}<div class="row">${btn(L?'Загрузить другой список':'Загрузить список (CSV)','codesLoad',{cls:L?'':'p'})}</div></div>
    <div class="panel"><h2>2. Розыгрыш</h2><div class="grid g2">
      <label class="f"><span>Дата</span><input class="in" value="${dd(OPEN.chest)}, после загрузки списка" readonly><small>Итоги видны на платформе в Сундуке чудес сразу после публикации</small></label>
      <label class="f"><span>Победителей</span><input class="in" type="number" value="${DRAW_N}" min="1"><small>Количество — уточняется с банком</small></label></div>
      <div class="row">${btn(drawRes?'Розыгрыш проведен':'Провести розыгрыш','drawRun',{cls:'p',dis:!!drawRes||!L})}${!L?'<span class="small muted">Сначала загрузите список кодов</span>':before?`<span class="small muted">По плану — ${fmt(OPEN.chest)}. В прототипе можно нажать заранее</span>`:''}</div></div></div>${res}
  <p class="note">Один человек может создать несколько героев, но в розыгрыше участвует только код, введенный на портале «Ньютон». Заблокированные участники не участвуют.</p>`;
}

function vRating(){
  const top=USERS.filter(u=>!u.blocked).slice(0,10);
  return head('Турнирная таблица','Баллы дают испытания и голоса в сериале: Спроси дорогу — 20 за верный ответ с первой попытки, Лес — 10 за подарок в лучшем забеге, Елка — 100, когда игрушку впервые повесили на елку, сказка-сериал — 20 за голос. Топ-10 получают мерч. При равенстве выше тот, кто набрал баллы раньше. На платформе участник видит топ-20 и свою строку.',
    btn('Выгрузить таблицу (CSV)','topCsv')+btn(frozen?'Таблица зафиксирована':'Зафиксировать таблицу','freeze',{cls:'p',dis:frozen}))+
  `<div class="panel scroll"><table class="tbl"><tr><th>Место</th><th>Герой</th><th>Город</th><th>Код</th><th class="num">Квиз</th><th class="num">Лес</th><th class="num">Елка</th><th class="num">Сериал</th><th class="num">Итого</th></tr>
    ${top.map((u,k)=>`<tr><td>${k+1}</td><td><b>${esc(u.nick)}</b></td><td>${esc(u.city||'—')}</td><td><code>${u.code}</code></td><td class="num">${u.q}</td><td class="num">${u.f}</td><td class="num">${u.t}</td><td class="num">${u.s}</td><td class="num"><b>${u.pts}</b></td></tr>`).join('')}</table>
    <p class="small muted" style="margin:10px 0 0">Дата фиксации и состав мерча — уточняются с банком.</p></div>
  <div class="panel scroll"><h2>Подозрительные результаты Леса</h2><p class="muted">Сервер проверяет забег по зерну уровня: подарков не больше, чем было на пройденном пути, длительность правдоподобна. Сомнительные результаты не начисляются, пока их не проверят.</p>
    <table class="tbl"><tr><th>Герой</th><th>Забег</th><th class="num">Подарков</th><th class="num">Время</th><th>Причина</th><th></th></tr>
    ${SUSP.map((x,k)=>`<tr><td><b>${esc(x.nick)}</b></td><td>${x.run}</td><td class="num">${x.gifts}</td><td class="num">${x.time}</td><td>${x.why}</td><td>${x.st==='wait'?`<div class="row">${btn('Аннулировать','suspNo',{cls:'bad sm',d:{i:k}})}${btn('Засчитать','suspOk',{cls:'sm',d:{i:k}})}</div>`:st(x.st,x.st==='Засчитан'?'ok':'bad')}</td></tr>`).join('')}</table></div>`;
}

function vUsers(){
  const q=(sel.uq||'').trim().toLowerCase();
  const list=USERS.filter(u=>!q||u.nick.toLowerCase().includes(q)||u.code.toLowerCase().includes(q)||(u.city||'').toLowerCase().includes(q)).slice(0,40);
  const u=sel.user!=null?USERS.find(x=>x.id===sel.user):null;
  const drawer=u?`<div class="drawer"><button class="btn sm x" data-act="uClose">Закрыть</button><h2>${esc(u.nick)}</h2><p class="muted">${esc(u.city||'город не указан')} · с ${fmt(u.day)}</p>
    <table class="tbl"><tr><td>Персональный код</td><td><code>${u.code}</code></td></tr><tr><td>Квиз</td><td class="num">${u.q}</td></tr><tr><td>Лес</td><td class="num">${u.f}</td></tr><tr><td>Елка</td><td class="num">${u.t}</td></tr><tr><td>Сказка-сериал</td><td class="num">${u.s}</td></tr><tr><td><b>Итого</b></td><td class="num"><b>${u.pts}</b></td></tr><tr><td>Статус</td><td>${u.blocked?st('Заблокирован','bad'):st('Активен','ok')}</td></tr></table>
    <h3 style="margin-top:14px">История</h3><table class="tbl small">${[[u.day,'Создан герой'],[Math.min(TODAY,u.day+1),`Квиз: +${u.q}`],u.f?[Math.min(TODAY,u.day+2),`Лес: рекорд ${u.f/10} подарков`]:null,u.t?[TODAY,'Елка: игрушка на елке, +100']:null,u.s?[Math.min(TODAY,u.day+1),`Сказка-сериал: ${u.s/20} ${plural(u.s/20,'голос','голоса','голосов')}, +${u.s}`]:null].filter(Boolean).map(([d,t])=>`<tr><td>${fmt(d)}</td><td>${t}</td></tr>`).join('')}</table>
    <div class="row" style="margin-top:14px">${btn(u.blocked?'Разблокировать':'Заблокировать','uBlock',{cls:u.blocked?'':'bad',d:{id:u.id}})}${btn('Выгрузить данные участника','uCsv',{d:{id:u.id}})}</div>
    <p class="small muted" style="margin-top:12px">Заблокированный участник не виден в таблице и не участвует в розыгрыше; войти по коду может.</p></div>`:'';
  return head('Участники и коды','Регистрации нет: участник — это герой и его персональный код. Коды храним у себя и передаем банку по запросу, например для проверки победителей.',
    btn('Выгрузить коды для банка (CSV)','usersCsv',{cls:'p'}))+
  `<div class="panel"><input class="in" id="uq" placeholder="Код, имя героя или город" value="${esc(sel.uq||'')}" style="max-width:420px"><div class="scroll" style="margin-top:12px"><table class="tbl"><tr><th>Герой</th><th>Город</th><th>Код</th><th class="num">Баллы</th><th>С</th><th>Статус</th></tr>
    ${list.map(x=>`<tr class="click ${sel.user===x.id?'on':''}" data-act="uOpen" data-id="${x.id}"><td><b>${esc(x.nick)}</b></td><td>${esc(x.city||'—')}</td><td><code>${x.code}</code></td><td class="num">${x.pts}</td><td>${fmt(x.day)}</td><td>${x.blocked?st('Заблокирован','bad'):st('Активен','ok')}</td></tr>`).join('')||'<tr><td colspan="6" class="muted">Никого не нашли</td></tr>'}</table></div>
    <p class="small muted" style="margin:10px 0 0">Показаны ${list.length} из ${num(2100+TODAY*520)} — в прототипе список сокращен</p></div>${drawer}`;
}

function vSchedule(){
  const ev=[];const add=(d,t,k)=>ev.push({d,t,k:k||'00:00'});
  add(0,'Старт платформы: обложка, создание героя, маршрут');
  D.QUIZ.forEach((q,k)=>add(q.open,`Квиз: набор ${ROMAN[k]} «${q.title}»`));
  add(OPEN.forest,'Испытание Лес');add(OPEN.tree,'Испытание Елка — начинается модерация игрушек');
  D.CHAPTERS.forEach((c,k)=>{add(c.day,`Сериал: глава ${ROMAN[k]}${c.final?' (финальная)':''}`);add(c.day+1,`Сериал: закрывается ${c.final?'голосование для настроения':'голосование'} главы ${ROMAN[k]}`,'23:59');});
  [...new Set(D.TALES.map(t=>t.open))].forEach(o=>{const ks=D.TALES.map((t,k)=>t.open===o?k+1:0).filter(Boolean);add(o,`Пряничная избушка: сказки ${ks[0]}–${ks[ks.length-1]}`);});
  add(D.FULL_TALE_DAY,'Цельная сказка: чтение и PDF');add(CODE_DEADLINE,'Последний момент ввести код на портале «Ньютон» для розыгрыша','23:59');
  add(OPEN.chest,'Розыгрыш Сундука чудес: банк присылает список введенных кодов, проводим розыгрыш, итоги — на платформе','днем');
  add(LAST_DAY,'Последний день работы платформы','23:59');add(LAST_DAY+1,'Архив: итоги, книга сказок, аудиосказки. Испытания, голосования и кабинеты закрыты');
  ev.sort((a,b)=>a.d-b.d||(a.k>b.k?1:-1));
  return head('Расписание','Всё открывается автоматически по серверному времени: разделы и главы — в 00:00 мск, голосования закрываются в 23:59 мск. На Камчатке это 09:00, в Калининграде — 23:00 накануне.')+
  `<div class="panel scroll"><table class="tbl"><tr><th>Дата</th><th>Время (мск)</th><th>Что происходит</th><th>Статус</th></tr>${ev.map(e=>`<tr><td style="white-space:nowrap">${fmt(e.d)}</td><td>${e.k}</td><td>${esc(e.t)}</td><td>${e.d<TODAY?st('Прошло'):e.d===TODAY?st('Сегодня','warn'):st('Запланировано','acc')}</td></tr>`).join('')}</table></div>`;
}

function vDict(){
  const q=(sel.cq||'').trim().toLowerCase().replace(/ё/g,'е');
  const found=q?D.CITIES.filter(c=>c[0].toLowerCase().replace(/ё/g,'е').startsWith(q)).slice(0,12):[];
  const group=(names,items)=>names.map((g,k)=>{const w=items.filter(x=>x.g===k);return `<div style="margin:0 0 10px"><b class="small">${esc(g)} · ${w.length}</b><div class="chips" style="margin-top:4px">${w.slice(0,14).map(x=>`<span class="chip">${esc(x.w)}</span>`).join('')}${w.length>14?`<span class="chip">+${w.length-14}</span>`:''}</div></div>`;}).join('');
  return head('Справочники','Имя героя собирается из трех слов: первое — черта характера; второе — зимнее, сказочное слово или цвет; третье — всегда персонаж: зверь, птица, сказочный или зимний герой. Слова участник не выбирает — только «Другое имя». Город — только из справочника.')+
  `<div class="grid g2"><div class="panel"><h2>Первое и второе слово · ${A1.length} + ${A2.length}</h2>${group(D.ADJ_G,D.ADJ.map(a=>({w:a[0],g:a[2]})))}
      <div class="grid g3"><input class="in" placeholder="мужской род"><input class="in" placeholder="женский род"><select class="in">${D.ADJ_G.map(g=>`<option>${esc(g)}</option>`).join('')}</select></div><div style="margin-top:8px">${btn('Добавить','save',{cls:'sm'})}</div></div>
    <div class="panel"><h2>Третье слово · ${D.NOUNS.length}</h2>${group(D.NOUN_G,D.NOUNS.map(n=>({w:n[0],g:n[2]})))}
      <div class="grid g3"><input class="in" placeholder="слово"><select class="in"><option>мужской род</option><option>женский род</option></select><select class="in">${D.NOUN_G.map(g=>`<option>${esc(g)}</option>`).join('')}</select></div><div style="margin-top:8px">${btn('Добавить','save',{cls:'sm'})}</div></div></div>
  <div class="note i" style="margin:0 0 16px">Сочетаний: ${num(A1.length)} × ${num(A2.length)} × ${num(D.NOUNS.length)} = ${num(A1.length*A2.length*D.NOUNS.length)} — в пять раз больше, чем сотрудников банка. Имена не повторяются: новому участнику выдается только свободное сочетание.</div>
  <div class="panel"><h2>Города · ${num(D.CITIES.length)}</h2><p class="muted">Справочник городов России (hflabs/city, CC BY-SA 4.0) с готовой формой «из …» для турнирной таблицы. Перед запуском сверяем со списком городов, где работают сотрудники банка, и добавляем недостающие.</p>
    <div class="grid g3" style="margin:0 0 10px"><input class="in" placeholder="Город"><input class="in" placeholder="Форма «из …», например «из Барнаула»"><div>${btn('Добавить город','save',{cls:'sm'})}</div></div>
    <input class="in" id="cq" placeholder="Найти город" value="${esc(sel.cq||'')}" style="max-width:320px">
    ${found.length?`<table class="tbl" style="margin-top:10px"><tr><th>Город</th><th>В таблице</th></tr>${found.map(c=>`<tr><td>${esc(c[0])}</td><td>из ${esc(c[1])}</td></tr>`).join('')}</table>`:q?'<p class="muted" style="margin-top:10px">Нет в справочнике — такой город пройдет через проверку</p>':''}</div>`;
}

function vAccess(){
  return head('Доступы и журнал','Кто что может в админке. Все действия пишутся в журнал.')+
  `<div class="panel scroll"><table class="tbl"><tr><th>Роль</th><th>Кто</th><th>Что может</th></tr>
    <tr><td><b>Администратор</b></td><td>Deep</td><td>Всё, включая расписание, доступы и выгрузки</td></tr>
    <tr><td><b>Модератор</b></td><td>Deep</td><td>Елка: одобрить или отклонить игрушку; подозрительные забеги Леса</td></tr>
    <tr><td><b>Редактор контента</b></td><td>Deep</td><td>Главы сериала, квиз, аудиосказки, справочники</td></tr>
    <tr><td><b>Наблюдатель</b></td><td>Банк</td><td>Просмотр, статистика, выгрузки, загрузка списка введенных кодов, отметка «банк связался» у победителей</td></tr></table>
    <p class="small muted" style="margin:10px 0 0">Вход в админку — по личным учетным записям с двухфакторной аутентификацией; кто со стороны банка — уточняется.</p></div>
  <div class="panel scroll"><h2>Журнал действий</h2><table class="tbl">${LOG.map(([t,w,x])=>`<tr><td style="white-space:nowrap">${t}</td><td style="white-space:nowrap">${esc(w)}</td><td>${esc(x)}</td></tr>`).join('')}</table></div>`;
}

const VIEWS={dash:vDash,tree:vTree,serial:vSerial,quiz:vQuiz,tales:vTales,draw:vDraw,rating:vRating,users:vUsers,schedule:vSchedule,dict:vDict,access:vAccess};

function nav(){
  return SECTIONS.map(([k,l,c])=>l==null||!VIEWS[k]?`<div class="grp">${esc(l||'')}</div>`:`<a href="#${k}" class="${cur===k?'on':''}"><span>${esc(l)}</span>${c&&c()?`<span class="cnt">${c()}</span>`:''}</a>`).join('');
}
function render(){
  if(!VIEWS[cur])cur='dash';
  $('#side').innerHTML=nav();
  $('#main').innerHTML=`<select class="in navsel" id="navsel" aria-label="Раздел">${SECTIONS.filter(([k])=>VIEWS[k]).map(([k,l])=>`<option value="${k}" ${k===cur?'selected':''}>${esc(l)}</option>`).join('')}</select>`+VIEWS[cur]();
}

/* ---------- действия ---------- */
const ACT={
  save:()=>toast('Сохранено — в прототипе без сервера'),
  toyTab:d=>{sel.toyTab=d.k;render();},
  toyOk:d=>{const t=TOYS.find(x=>x.id==d.id);t.st='ok';log('Анна (модератор)',`одобрила игрушку героя «${t.nick}»`);render();toast('Игрушка видна всем на общей елке');},
  toyNo:d=>{const t=TOYS.find(x=>x.id==d.id);const s=$(`select[data-why="${d.id}"]`);if(!s||!s.value){toast('Выберите причину отказа');if(s)s.focus();return;}t.st='no';t.why=s.value;log('Анна (модератор)',`отклонила игрушку героя «${t.nick}»: ${t.why}`);render();toast('Отклонено — автор увидит причину');},
  toyAll:()=>{let n=0;TOYS.forEach(t=>{if(t.st==='wait'){t.st='ok';n++;}});log('Анна (модератор)',`одобрила ${n} ${plural(n,'игрушку','игрушки','игрушек')}`);render();toast(`Одобрено: ${n}`);},
  chSel:d=>{sel.ch=+d.i;render();},
  chSave:()=>{const c=CH[sel.ch];const t=$('#chT'),x=$('#chX');c.t=t.value.trim();c.text=x.value;if(c.empty&&c.t&&c.text)c.empty=false;
    $$('.opt .in').forEach((inp,k)=>{c.o[k]=inp.value;});log('Илья (редактор)',`сохранил главу ${ROMAN[sel.ch]}${c.t?' «'+c.t+'»':''}`);render();toast('Глава сохранена');},
  chSched:()=>{const c=CH[sel.ch];if(!c.sched&&(!($('#chT').value.trim())||!($('#chX').value.trim())||!c.img)){toast('Для публикации нужны название, текст и иллюстрация');return;}
    ACT.chSave();c.sched=!c.sched;log('Илья (редактор)',`${c.sched?'запланировал':'снял с публикации'} главу ${ROMAN[sel.ch]}`);render();toast(c.sched?`Глава ${ROMAN[sel.ch]} выйдет ${fmt(c.day)} в 00:00 мск`:'Публикация отменена');},
  setSel:d=>{sel.set=+d.i;sel.q=0;render();},
  qSel:d=>{sel.q=+d.i;render();},
  pdf:()=>toast('Предпросмотр PDF — в прототипе платформы: «Большая книга сказок» → «Скачать PDF»'),
  // список от банка: в прототипе — пример (в розыгрыш попадают 4 из 5 участников выборки); на платформе — сверка кодов из CSV
  codesLoad:()=>{const ids=USERS.filter((u,k)=>k%5!==3).map(u=>u.id),blocked=USERS.filter(u=>u.blocked&&ids.includes(u.id)).length;
    codeList={file:'kody_vvedeny_'+dd(CODE_DEADLINE)+'.csv',total:9077,found:9040,miss:37,blocked,ok:9040-blocked,ids};drawRes=null;drawPub=false;
    log('Ольга (администратор)',`загрузила список кодов от банка: ${num(codeList.total)}`);render();toast('Список загружен — коды сверены с платформой');},
  drawRun:()=>{if(!codeList){toast('Сначала загрузите список кодов от банка');return;}const r=rng(Date.now()%100000),pool=USERS.filter(u=>!u.blocked&&codeList.ids.includes(u.id)),out=[];
    while(out.length<DRAW_N&&pool.length){const u=pool.splice(Math.floor(r()*pool.length),1)[0];out.push(Object.assign({},u,{conf:false}));}
    out.seed=Math.floor(r()*0xffffffff).toString(16).padStart(8,'0');drawRes=out;drawPub=false;log('Ольга (администратор)','провела розыгрыш Сундука чудес');render();toast('Победители выбраны — проверьте и опубликуйте');},
  drawPub:()=>{drawPub=true;log('Ольга (администратор)','опубликовала итоги розыгрыша на платформе');render();toast('Итоги опубликованы: участники видят список в Сундуке чудес');},
  drawCsv:()=>csv('pobediteli_rozygrysha.csv',[['№','Герой','Город','Персональный код','Банк связался'],...drawRes.map((u,k)=>[k+1,u.nick,u.city,u.code,u.conf?'да':'нет'])]),
  topCsv:()=>csv('turnirnaya_tablica_top10.csv',[['Место','Герой','Город','Код','Квиз','Лес','Елка','Сериал','Итого'],...USERS.filter(u=>!u.blocked).slice(0,10).map((u,k)=>[k+1,u.nick,u.city,u.code,u.q,u.f,u.t,u.s,u.pts])]),
  freeze:()=>{frozen=true;log('Ольга (администратор)','зафиксировала турнирную таблицу');render();toast('Таблица зафиксирована: топ-10 больше не меняется');},
  suspNo:d=>{SUSP[+d.i].st='Аннулирован';log('Анна (модератор)','аннулировала подозрительный забег');render();},
  suspOk:d=>{SUSP[+d.i].st='Засчитан';log('Анна (модератор)','засчитала забег после проверки');render();},
  uOpen:d=>{sel.user=+d.id;render();},
  uClose:()=>{sel.user=null;render();},
  uBlock:d=>{const u=USERS.find(x=>x.id==d.id);u.blocked=!u.blocked;log('Ольга (администратор)',`${u.blocked?'заблокировала':'разблокировала'} героя «${u.nick}»`);render();},
  uCsv:d=>{const u=USERS.find(x=>x.id==d.id);csv('uchastnik_'+u.code+'.csv',[['Герой','Город','Код','Квиз','Лес','Елка','Сериал','Итого'],[u.nick,u.city,u.code,u.q,u.f,u.t,u.s,u.pts]]);},
  usersCsv:()=>csv('kody_uchastnikov.csv',[['Герой','Город','Персональный код','Баллы','Создан','Статус'],...USERS.map(u=>[u.nick,u.city,u.code,u.pts,dd(u.day),u.blocked?'заблокирован':'активен'])])
};
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){location.hash=g.dataset.go;return;}
  const t=e.target.closest('[data-act]');if(!t||t.disabled)return;const f=ACT[t.dataset.act];if(f){e.preventDefault();f(t.dataset,t);}});
document.addEventListener('change',e=>{
  if(e.target.id==='navsel'){location.hash=e.target.value;}
  if(e.target.id==='chFile'){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{CH[sel.ch].img=r.result;render();toast('Картинка загружена — не забудьте сохранить');};r.readAsDataURL(f);}
  if(e.target.dataset.conf!=null&&drawRes){drawRes[+e.target.dataset.conf].conf=e.target.checked;}
});
document.addEventListener('input',e=>{
  if(e.target.id==='uq'){sel.uq=e.target.value;const p=e.target.selectionStart;render();const i=$('#uq');i.focus();i.setSelectionRange(p,p);}
  if(e.target.id==='cq'){sel.cq=e.target.value;const p=e.target.selectionStart;render();const i=$('#cq');i.focus();i.setSelectionRange(p,p);}
});
window.addEventListener('hashchange',()=>{cur=(location.hash||'#dash').slice(1);sel.user=null;render();window.scrollTo(0,0);});
render();
})();
