# Раскладка карты маршрута на главной (assets/js/app.js, константа RMAP).
# Запуск из корня репозитория: python3 tools/route_map.py — пересчитывает раскладку и вписывает ее в app.js.
# Фон у главной один (градиент страницы), на нем отдельные картинки. Дорога — одна лента постоянной ширины от верха карты
# до Сундука чудес; ответвления той же ширины начинаются точно на ее оси. Над каждым местом — подпись: место под ней
# (capH × capW) остается пустым — туда не ставим ни деревья, ни фонари. Деревья не закрывают дорогу и места.
# Единицы: ширина карты = 100, высота — H. Раскладка случайная, но с фиксированным зерном — повторяется один в один.
import json, math, random, sys

AR={'quiz':0.961,'forest':0.943,'tree':0.665,'serial':1.091,'izba':0.996,'chest':1.168,'ctree':600/720}
SPR={'tree_1':0.385,'tree_2':0.605,'tree_3':0.618,'birch':0.44,'bush':1.438,'fg_3':1.883,'fg_5':1.656,'fg_6':1.695,'fg_7':1.953,
     'stump':2.211,'izba_1':1.291,'izba_2':1.312,'lamp':0.336,'snowman':0.81,'tree_deco':0.555}
# доля высоты картинки, занятая «телом» (для проверки, что дерево не закрывает дорогу и подписи)
TALL={'tree_1','tree_2','tree_3','birch','tree_deco'}

def cr_bez(P):
    segs=[]
    for i in range(len(P)-1):
        p0=P[i-1] if i>0 else P[i]; p1=P[i]; p2=P[i+1]; p3=P[i+2] if i+2<len(P) else P[i+1]
        c1=(p1[0]+(p2[0]-p0[0])/6, p1[1]+(p2[1]-p0[1])/6)
        c2=(p2[0]-(p3[0]-p1[0])/6, p2[1]-(p3[1]-p1[1])/6)
        segs.append((p1,c1,c2,p2))
    return segs
def path_d(segs):
    f=lambda v:('%.2f'%v).rstrip('0').rstrip('.')
    d=f'M{f(segs[0][0][0])} {f(segs[0][0][1])}'
    for a,b,c,e in segs: d+=f'C{f(b[0])} {f(b[1])} {f(c[0])} {f(c[1])} {f(e[0])} {f(e[1])}'
    return d
def bez(s,t):
    (x0,y0),(x1,y1),(x2,y2),(x3,y3)=s; u=1-t
    return (u**3*x0+3*u*u*t*x1+3*u*t*t*x2+t**3*x3, u**3*y0+3*u*u*t*y1+3*u*t*t*y2+t**3*y3)
def sample(segs,step=0.35):
    pts=[]
    for s in segs:
        for k in range(60): pts.append(bez(s,k/60))
    pts.append(segs[-1][3])
    out=[pts[0]]; acc=0
    for i in range(1,len(pts)):
        acc+=math.dist(pts[i-1],pts[i])
        if acc>=step: out.append(pts[i]); acc=0
    out.append(pts[-1])
    return out
def normal_at(pts,i):
    a=pts[max(0,i-1)]; b=pts[min(len(pts)-1,i+1)]; dx=b[0]-a[0]; dy=b[1]-a[1]; L=math.hypot(dx,dy) or 1
    return (-dy/L, dx/L)
def rect(x,y,w,h,m=0): return (x-m,y-m,x+w+m,y+h+m)
def hit(r,q): return not (r[2]<=q[0] or q[2]<=r[0] or r[3]<=q[1] or q[3]<=r[1])

def build(L, seed):
    rnd=random.Random(seed); H=L['H']; W=L['roadW']
    main=cr_bez(L['road']); mpts=sample(main)
    brs=[]
    for yj,pts in L['branches']:
        j=min(mpts,key=lambda p:abs(p[1]-yj))          # ответвление начинается точно на оси дороги
        brs.append(cr_bez([(round(j[0],2),round(j[1],2))]+pts))
    bpts=[sample(b) for b in brs]
    allpts=mpts+[p for b in bpts for p in b]
    items={}; boxes=[]; caps=[]
    for k,v in L['items'].items():
        x,y,w=v['el']; h=w/AR[k]; v=dict(v); v['h']=round(h,2); items[k]=v
        boxes.append(rect(x+w*.06,y+h*.04,w*.88,h*.96,L['boxPad']))
        cw=L['capW'].get(k,L['capW']['_']); cx=x+w/2
        caps.append((cx-cw/2,y-L['capH'],cx+cw/2,y+h*.04))
    def rect_road(r,m):   # прямоугольник ближе m к оси дороги?
        for px,py in allpts:
            dx=max(r[0]-px,0,px-r[2]); dy=max(r[1]-py,0,py-r[3])
            if math.hypot(dx,dy)<m: return True
        return False
    def free(r): return not any(hit(r,b) for b in boxes) and not any(hit(r,c) for c in caps)
    deco=[]; bases=[]
    def add(kind,x,top,w,flip=False):
        h=w/SPR[kind]; deco.append([kind,round(x,2),round(top,2),round(w,2),round(top+h,2),1 if flip else 0]); bases.append((x+w/2,top+h,w))
    # фонари вдоль главной дороги — по очереди с разных сторон
    lamps=[]; acc=L['lampStep']*0.55; side=1
    for i in range(1,len(mpts)):
        acc+=math.dist(mpts[i-1],mpts[i])
        if acc>=L['lampStep'] and 4<mpts[i][1]<H-12:
            nx,ny=normal_at(mpts,i)
            for sd in (side,-side):
                bx=mpts[i][0]+nx*sd*L['lampOff']; by=mpts[i][1]+ny*sd*L['lampOff']; w=L['lampW']; h=w/SPR['lamp']
                r=rect(bx-w/2,by-h,w,h,0.4)
                if free(r) and -1<bx<101 and not rect_road(rect(bx-w*.3,by-h,w*.6,h),W*.5+.3):
                    add('lamp',bx-w/2,by-h,w); lamps.append([round(bx,2),round(by-h*0.86,2)]); acc=0; side=-sd; break
    # лес: рощи (кучки деревьев) — центры рощ случайные, деревья вокруг центра с разбросом; между рощами — поляны
    def try_add(kind,bx,by,w,gap):
        h=w/SPR[kind]; x=bx-w/2; top=by-h
        if top<-h*0.45 or by>H+h*0.15: return False
        body=rect(x+w*.22,top+h*(.18 if kind in TALL else .3),w*.56,h*(.82 if kind in TALL else .7))
        if not free(body): return False
        if rect_road(body,W*.5+L['roadGap']): return False
        if any(math.hypot(bx-ox,(by-oy)*1.8)<gap*(w+ow)/2 for ox,oy,ow in bases): return False
        add(kind,x,top,w,rnd.random()<0.5); return True
    for x0,x1,y0,y1,ncl,kmin,kmax,spread,kinds,wmin,wmax in L['groves']:
        made=0; tries=0
        while made<ncl and tries<ncl*40:
            tries+=1
            cx=rnd.uniform(x0,x1); cy=rnd.uniform(y0,y1); k=rnd.randint(kmin,kmax); got=0
            for j in range(k*6):
                if got>=k: break
                kind=rnd.choice(kinds); w=rnd.uniform(wmin,wmax)*(1.12 if got==0 else rnd.uniform(.78,1))
                bx=cx+rnd.gauss(0,spread); by=cy+rnd.gauss(0,spread*.55)
                if not (x0-spread<=bx<=x1+spread): continue
                if try_add(kind,bx,by,w,0.42): got+=1
            if got: made+=1
    # мелочи на полянах: кусты, камни в снегу, пни, снеговик
    for x0,x1,y0,y1,count,kinds,wmin,wmax in L['small']:
        placed=0; tries=0
        while placed<count and tries<count*60:
            tries+=1; kind=rnd.choice(kinds); w=rnd.uniform(wmin,wmax)
            if try_add(kind,rnd.uniform(x0,x1),rnd.uniform(y0,y1),w,0.9): placed+=1
    for kind,x,yb,w,fl in L['accents']:
        add(kind,x,yb-w/SPR[kind],w,fl)
    glints=[]
    for pts in [mpts]+bpts:
        for i in range(3,len(pts),L['glintEvery']):
            nx,ny=normal_at(pts,i); o=rnd.uniform(-1,1)*W*0.3
            glints.append([round(pts[i][0]+nx*o,2),round(pts[i][1]+ny*o,2),round(rnd.uniform(0.22,0.5)*L['glintR'],2),round(rnd.uniform(0,3),2)])
    deco.sort(key=lambda d:d[4])
    return {'H':H,'road':path_d(main),'branches':[path_d(b) for b in brs],'lamps':lamps,'glints':glints,'deco':deco,'items':items,'roadW':W}

TREES=['tree_2','tree_3','tree_1','tree_2','tree_3','birch']
FIRS=['tree_2','tree_3','tree_1','tree_3']
SMALL=['bush','fg_5','fg_6','fg_7','fg_3','stump']
# телефон: места по краям, дорога по центру
M={'H':398,'roadW':6.4,'roadGap':1.6,'boxPad':0.6,'capH':25,'capW':{'_':44,'ctree':46},
   'lampStep':34,'lampOff':6.6,'lampW':3.6,'glintEvery':8,'glintR':1,
   'road':[(50,-8),(50,4),(52.5,20),(53,40),(50.5,60),(49,80),(48.5,100),(49.5,120),(50.5,140),(49.5,160),(48.5,180),(48.5,200),(47.5,220),(46.5,242),(45.6,264),(45.4,286),
           (45.6,310),(45.6,332),(45,350),(42.5,363),(36,370.5),(27,372.5)],
   'branches':[(96,[(58,106),(66,115),(75,120.5)]),(188,[(57,196),(65,205),(73,212)]),(300,[(54,316),(62,332),(70,345)])],
   'items':{'quiz':{'el':[4,36,42]},'serial':{'el':[57,86,41]},'forest':{'el':[4,130,42]},'izba':{'el':[57,178,37]},
            'tree':{'el':[9,222,31]},'ctree':{'el':[46,286,52]},'chest':{'el':[7,360,28]}},
   # рощи: x0,x1,y0,y1, сколько рощ, деревьев в роще (от-до), разброс, виды, ширина дерева (от-до)
   'groves':[(-6,2,6,396,12,2,3,4,FIRS,10,15),(98,106,6,396,12,2,3,4,FIRS,10,15),
             (64,92,14,56,2,2,3,5,TREES,9,13),(58,94,224,262,2,2,3,5,TREES,9,13),(6,40,274,330,2,2,3,5,TREES,9,13),(52,96,356,396,2,2,4,6,TREES,9,13)],
   'small':[(8,42,84,104,2,SMALL,8,11),(62,94,128,150,2,SMALL,8,11),(8,44,178,198,2,SMALL+['snowman'],8,11),(44,70,380,398,2,SMALL,7,10),(4,40,388,398,2,SMALL,8,11)],
   'accents':[]}
# компьютер: дорога по центру, испытания слева, ветки справа; по бокам (и за краем контента) — лес
D={'H':132,'roadW':3.1,'roadGap':0.9,'boxPad':0.3,'capH':10.5,'capW':{'_':22,'ctree':26},
   'lampStep':13,'lampOff':3.3,'lampW':1.6,'glintEvery':7,'glintR':0.42,
   'road':[(50,-6),(50,2),(48.5,12),(48.5,24),(50.8,34),(50.8,46),(48.6,58),(48.6,70),(50,80),(48.4,90),(47.6,100),(47.4,108),(45.5,115.5),(38,118.6)],
   'branches':[(33,[(55,36.5),(62,39.6),(67.5,40.6)]),(64,[(55,68),(62,71.6),(67.5,72.6)]),(94,[(55,101),(62,108),(68.5,114)])],
   'items':{'quiz':{'el':[20,9,22]},'serial':{'el':[58,21,22]},'forest':{'el':[20,43,22]},'izba':{'el':[59,53,20]},
            'tree':{'el':[23.5,77.5,15]},'ctree':{'el':[56,84,26]},'chest':{'el':[28,112,14]}},
   'groves':[(-64,-2,4,134,28,3,6,4.5,TREES,6.5,10),(102,164,4,134,28,3,6,4.5,TREES,6.5,10),
             (0,17,4,134,9,2,4,3,TREES,6,9),(83,100,4,134,9,2,4,3,TREES,6,9),
             (58,82,3,14,1,2,3,3,TREES,4.5,6.5),(16,46,104,132,2,2,3,3,TREES,5,7.5),(50,84,120,132,2,2,3,3,TREES,4.5,7)],
   'small':[(-60,-4,8,132,10,SMALL+['snowman'],3,4.5),(104,160,8,132,10,SMALL+['snowman'],3,4.5),(0,18,8,132,4,SMALL,2.8,4),(82,100,8,132,4,SMALL,2.8,4),
            (26,46,2,8,1,SMALL,2.5,3.5),(52,62,46,54,1,SMALL,2.5,3.5),(18,46,104,132,2,SMALL+['snowman'],2.6,3.6)],
   'accents':[('izba_1',70,11,8,False),('izba_2',2,68,8.5,True),('izba_1',-30,42,9,True),('izba_2',122,102,9,False)]}

if __name__=='__main__':
    import os
    out={'m':build(M,7),'d':build(D,11)}
    js='const RMAP='+json.dumps(out,ensure_ascii=False,separators=(',',':'))+';'
    p=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','assets','js','app.js')
    src=open(p,encoding='utf-8').read(); a=src.index('const RMAP='); b=src.index('\n',a)
    open(p,'w',encoding='utf-8').write(src[:a]+js+src[b:])
    for k in out: print(k,'H',out[k]['H'],'деревьев и мелочей',len(out[k]['deco']),'фонарей',len(out[k]['lamps']))
