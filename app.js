const TIME_LIMIT=20, MIX_COUNT=10;
const app=document.getElementById("app");
let S=null,T=null;

const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const best=()=>{try{return JSON.parse(localStorage.getItem("ksi-best")||"{}")}catch(e){return{}}};
const saveBest=(k,v)=>{try{const b=best();if(!b[k]||v>b[k]){b[k]=v;localStorage.setItem("ksi-best",JSON.stringify(b))}}catch(e){}};

function home(){
  clearInterval(T);S=null;const b=best();
  app.innerHTML=`<h1>Kuis Sejarah Indonesia</h1>
  <p class="lead">Jawab sebelum waktu habis. Makin cepat dan makin beruntun benar, makin besar skornya.</p>
  <ol class="tl"><li><b>Abad ke-4</b>Kutai</li><li><b>1602</b>VOC</li><li><b>1945</b>Proklamasi</li><li><b>1998</b>Reformasi</li></ol>
  <div class="list">${Object.entries(CATS).map(([k,c])=>`<button class="row" data-k="${k}"><span><b>${c.n}</b><small>${c.d}</small></span><em>${b[k]?"Terbaik "+b[k]:"Belum dimainkan"}</em></button>`).join("")}</div>
  <p class="how">${TIME_LIMIT} detik per soal. Tiap kuis punya satu bantuan 50:50 dan satu tambahan 10 detik. Tekan 1–4 atau A–D untuk menjawab.</p>`;
  app.querySelectorAll(".row").forEach(r=>r.onclick=()=>start(r.dataset.k));
}

function start(k){
  const mk=r=>{const idx=shuffle([0,1,2,3]);return{q:r[0],o:idx.map(i=>r[1][i]),a:idx.indexOf(r[2]),e:r[3]}};
  const all=Object.values(CATS).flatMap(c=>c.q||[]);
  const src=k==="mix"?shuffle(all).slice(0,MIX_COUNT):shuffle(CATS[k].q);
  S={k,qs:src.map(mk),i:0,score:0,streak:0,maxS:0,ok:0,left:TIME_LIMIT,done:false,f:true,t:true,res:[],hid:[],sel:null,gain:0};
  quiz();
}

function startTimer(){
  clearInterval(T);
  T=setInterval(()=>{S.left-=0.1;upd();if(S.left<=0)answer(-1)},100);
}
function upd(){
  const l=Math.max(S.left,0),bar=document.getElementById("tb"),tx=document.getElementById("ts");
  if(!bar)return;
  bar.style.width=Math.min(100,l/TIME_LIMIT*100)+"%";
  tx.textContent=Math.ceil(l)+" detik";
  bar.parentElement.classList.toggle("low",l<=5);
}

function quiz(){
  const q=S.qs[S.i],n=S.qs.length,L="ABCD";
  const ticks=S.qs.map((_,i)=>`<i class="${i<S.res.length?(S.res[i]?"ok":"bad"):i===S.i?"cur":""}"></i>`).join("");
  const opts=q.o.map((t,i)=>{
    let c="opt",m="";
    if(S.done){if(i===q.a){c+=" ok";m="<s>✓ Benar</s>"}else if(i===S.sel){c+=" bad";m="<s>✗ Salah</s>"}else c+=" off"}
    else if(S.hid.includes(i))c+=" off";
    return `<button class="${c}" data-i="${i}" ${S.done||S.hid.includes(i)?"disabled":""}><i>${L[i]}</i><span>${t}</span>${m}</button>`}).join("");
  const right=S.sel===q.a;
  const fb=S.done?`<div class="fb ${right?"":"bad"}" role="status"><b>${right?"Benar! +"+S.gain+" poin"+(S.streak>1?", beruntun "+S.streak+"×":""):S.sel<0?"Waktu habis.":"Belum tepat."}</b><p>Jawaban: ${q.o[q.a]}. ${q.e}</p></div><button class="btn" id="nx">${S.i+1<n?"Soal berikutnya":"Lihat hasil"}</button>`
  :`<div class="tools"><button class="ghost" id="f5" ${S.f?"":"disabled"}>50:50</button><button class="ghost" id="pt" ${S.t?"":"disabled"}>+10 detik</button></div>`;
  app.innerHTML=`<div class="top"><button id="bk">← Menu</button><span class="pts">Skor ${S.score}</span></div>
  <div class="ticks" aria-hidden="true">${ticks}</div>
  <div class="tm"><div id="tb"></div></div>
  <div class="meta"><span>Soal ${S.i+1} dari ${n}</span><span id="ts"></span></div>
  <h2>${q.q}</h2>${opts}${fb}`;
  app.querySelectorAll(".opt").forEach(b=>b.onclick=()=>answer(+b.dataset.i));
  document.getElementById("bk").onclick=()=>{if(confirm("Keluar dari kuis? Skor tidak disimpan."))home()};
  if(S.done){const nx=document.getElementById("nx");nx.onclick=next;nx.focus();upd()}
  else{
    document.getElementById("f5").onclick=()=>{if(!S.f)return;S.f=false;S.hid=shuffle([0,1,2,3].filter(x=>x!==q.a)).slice(0,2);quiz()};
    document.getElementById("pt").onclick=()=>{if(!S.t)return;S.t=false;S.left=Math.min(S.left+10,30);quiz()};
    upd();startTimer();
  }
}

function answer(p){
  if(S.done)return;
  clearInterval(T);S.done=true;S.sel=p;
  const q=S.qs[S.i],good=p===q.a;
  if(good){S.streak++;S.maxS=Math.max(S.maxS,S.streak);S.gain=100+Math.ceil(Math.max(S.left,0))*4+Math.min(S.streak-1,4)*25;S.score+=S.gain;S.ok++}
  else{S.streak=0;S.gain=0}
  S.res.push(good);quiz();
}

function next(){
  if(S.i+1<S.qs.length){S.i++;S.left=TIME_LIMIT;S.done=false;S.hid=[];S.sel=null;quiz()}
  else result();
}

function result(){
  clearInterval(T);
  const n=S.qs.length,acc=S.ok/n;
  const rank=acc>=.9?"Sejarawan":acc>=.7?"Arkeolog Muda":acc>=.5?"Murid Rajin":"Perlu Buka Buku Lagi";
  saveBest(S.k,S.score);
  const wrong=S.qs.filter((_,i)=>!S.res[i]);
  app.innerHTML=`<div class="top"><span>${CATS[S.k].n}</span></div>
  <div class="big">${S.score}</div><div class="rank">${rank}</div>
  <div class="stats"><span><b>${S.ok} dari ${n}</b>jawaban benar</span><span><b>${S.maxS}×</b>beruntun terbaik</span><span><b>${best()[S.k]||S.score}</b>skor terbaik</span></div>
  ${wrong.length?`<h2 class="sub">Yang perlu diulang</h2>${wrong.map(q=>`<div class="rev"><b>${q.q}</b><span>Jawaban: ${q.o[q.a]}. ${q.e}</span></div>`).join("")}`:`<p class="rec">Semua benar. Tidak ada yang perlu diulang.</p>`}
  <div class="btns"><button class="btn" id="again">Main lagi</button><button class="btn alt" id="menu">Pilih topik lain</button></div>`;
  document.getElementById("again").onclick=()=>start(S.k);
  document.getElementById("menu").onclick=home;
  document.getElementById("again").focus();
}

document.addEventListener("keydown",e=>{
  if(!S||e.ctrlKey||e.metaKey||e.altKey||S.done)return;
  const m="1234abcd".indexOf(e.key.toLowerCase());
  if(m>=0){const i=m%4;if(!S.hid.includes(i))answer(i)}
});
home();
