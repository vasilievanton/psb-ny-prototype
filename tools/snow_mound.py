# Сугробы под деревьями, домиками и фонарями на карте главной (assets/img/route/mound_1.webp, mound_2.webp).
# Запуск из корня репозитория: python3 tools/snow_mound.py assets/img/route
# Мягкий снежный холмик, свет сверху-слева: карта высот (мягкое объединение гауссовых бугров), затенение по нормали,
# снизу чуть темнее, снежная крупка. Рисуем вчетверо крупнее и уменьшаем — края гладкие
import numpy as np, sys
from PIL import Image, ImageFilter
def mound(W,H,bumps,seed,out):
    S=4; w,h=W*S,H*S
    rng=np.random.default_rng(seed)
    y,x=np.mgrid[0:h,0:w].astype(np.float32)
    xn=x/w; yn=y/h
    # силуэт: верхняя кромка — сумма бугров, низ — пологий эллипс
    top=np.zeros(w,np.float32)
    xs=np.linspace(0,1,w)
    acc=np.zeros(w,np.float32)
    for cx,sx,hh in bumps:
        acc+=(hh*np.exp(-((xs-cx)/sx)**2))**4
    top=acc**.25                                   # мягкое объединение бугров — без складок на стыках
    edge=np.clip(1-((xs-.5)/.5)**2,0,1)**.35
    top=top*edge
    base=0.86                      # линия основания (доля высоты)
    ytop=base-top*0.78             # верх холмика
    ybot=base+0.10*edge            # низ: небольшая подушка ниже основания
    inside=(yn>=ytop[None,:])&(yn<=ybot[None,:])
    # высота поверхности для освещения: купол между ytop и ybot
    t=np.clip((yn-ytop[None,:])/np.maximum(ybot-ytop,1e-3)[None,:],0,1)
    hgt=np.sin(np.pi*np.clip(t*0.85+0.08,0,1))*np.maximum(top,0.05)[None,:]
    gy,gx=np.gradient(hgt*h*0.6)
    nz=1.0; nl=np.sqrt(gx**2+gy**2+nz**2); nx_,ny_,nz_=-gx/nl,-gy/nl,nz/nl
    L=np.array([-0.45,-0.75,0.5]); L=L/np.linalg.norm(L)
    lam=np.clip(nx_*L[0]+ny_*L[1]+nz_*L[2],0,1)
    lam=0.35+0.65*lam
    # цвет: свет — белый, тень — холодный голубой; внизу — чуть темнее
    lit=np.array([246,248,255],np.float32); mid=np.array([218,227,255],np.float32); sh=np.array([150,166,222],np.float32)
    k=np.clip((lam-0.35)/0.65,0,1)[...,None]
    col=np.where(k>0.55,mid+(lit-mid)*((k-0.55)/0.45),sh+(mid-sh)*(k/0.55))
    col=col*(1-0.18*np.clip((t[...,None]-0.6)/0.4,0,1))     # низ темнее
    # снежная крупка
    n=rng.normal(0,1,(h,w)).astype(np.float32)
    n=np.array(Image.fromarray(((n*20)+128).clip(0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(np.float32)-128
    col=col+n[...,None]*0.25
    sp=(rng.random((h,w))>0.9985)&(k[...,0]>0.6)
    col[sp]=255
    a=inside.astype(np.float32)
    A=Image.fromarray((a*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(S*0.9))
    a=np.array(A).astype(np.float32)/255
    rgba=np.dstack([col.clip(0,255),a*255]).astype(np.uint8)
    im=Image.fromarray(rgba,'RGBA').resize((W,H),Image.LANCZOS)
    im.save(out,quality=88,method=6); print(out,im.size)
D=sys.argv[1]
mound(360,120,[(.5,.30,.62),(.32,.16,.48),(.68,.18,.55),(.2,.12,.3),(.82,.1,.28)],1,D+'/mound_1.webp')
mound(360,120,[(.45,.26,.58),(.66,.2,.62),(.28,.14,.4),(.8,.12,.3)],2,D+'/mound_2.webp')
