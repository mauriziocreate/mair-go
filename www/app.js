/* ===== DIAGNOSTICA (registro errori visibile dal telefono) ===== */
window.__LOG__=[];
function diagLog(tipo,msg){try{window.__LOG__.push('['+new Date().toLocaleTimeString('it-IT')+'] '+tipo+': '+msg);if(window.__LOG__.length>60)window.__LOG__.shift();}catch(e){}}
window.addEventListener('error',function(e){diagLog('ERRORE',(e.message||'?')+' | file: '+(e.filename||'?')+' riga '+(e.lineno||'?'));});
window.addEventListener('unhandledrejection',function(e){diagLog('PROMISE',(e.reason&&e.reason.message)?e.reason.message:String(e.reason));});
function diagOpen(){
  const old=document.getElementById('diagbox');if(old)old.remove();
  const box=document.createElement('div');box.id='diagbox';
  box.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:999999;background:#111;color:#0f0;font:12px/1.5 monospace;padding:10px;overflow:auto');
  const testo=window.__LOG__.length?window.__LOG__.join('\n\n'):'(nessun errore registrato)';
  const info='DIAGNOSTICA MAIR GO!\n'
    +'Versione app.js: 7.4\n'
    +'docViewerOpen esiste: '+(typeof docViewerOpen)+'\n'
    +'textEditorOpen esiste: '+(typeof textEditorOpen)+'\n'
    +'certDocHtml esiste: '+(typeof certDocHtml)+'\n'
    +'pdfDocHtml esiste: '+(typeof pdfDocHtml)+'\n'
    +'actions.printCert esiste: '+(typeof (window.actions&&window.actions.printCert))+'\n'
    +'navigator.share: '+(typeof navigator.share)+'\n'
    +'Capacitor presente: '+(typeof window.Capacitor)+'\n'
    +'Plugin Filesystem: '+(window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Filesystem?'SI':'NO')+'\n'
    +'Plugin Share: '+(window.Capacitor&&window.Capacitor.Plugins&&window.Capacitor.Plugins.Share?'SI':'NO')+'\n'
    +'jsPDF caricato: '+(window.jspdf?'SI':'NO')+'\n'
    +'html2canvas caricato: '+(typeof html2canvas==='function'?'SI':'NO')+'\n'
    +'MediaRecorder: '+(typeof window.MediaRecorder)+'\n'
    +'Formato video: '+(typeof videoMimeSupportato==='function'?(videoMimeSupportato()||'NESSUNO'):'?')+'\n'
    +'captureStream: '+(typeof document.createElement('canvas').captureStream)+'\n'
    +'--------------------------------\n\n';
  const pre=document.createElement('pre');
  pre.setAttribute('style','white-space:pre-wrap;word-break:break-word;margin:0');
  pre.textContent=info+testo;
  const barra=document.createElement('div');
  barra.setAttribute('style','position:sticky;top:0;background:#111;padding-bottom:8px;display:flex;gap:8px;flex-wrap:wrap');
  const b1=document.createElement('button');b1.textContent='Chiudi';
  b1.setAttribute('style','padding:10px 16px;font-size:14px');
  b1.onclick=()=>box.remove();
  const b2=document.createElement('button');b2.textContent='Copia tutto';
  b2.setAttribute('style','padding:10px 16px;font-size:14px');
  b2.onclick=async()=>{try{await navigator.clipboard.writeText(pre.textContent);b2.textContent='Copiato!'}catch(e){b2.textContent='Selezionalo a mano'}};
  const b3=document.createElement('button');b3.textContent='PROVA APRI DOC';
  b3.setAttribute('style','padding:10px 16px;font-size:14px');
  b3.onclick=()=>{
    try{
      const c=db.certificates[0];
      if(!c){alert('Crea prima un certificato');return}
      diagLog('TEST','provo docViewerOpen con certificato: '+(c.title||'senza titolo'));
      docViewerOpen('TEST',certDocHtml(c),'','testo di prova');
      diagLog('TEST','docViewerOpen chiamata SENZA errori');
    }catch(err){
      diagLog('TEST-ERRORE',err&&err.message?err.message:String(err));
      alert('ERRORE: '+(err&&err.message?err.message:err));
    }
  };
  barra.appendChild(b1);barra.appendChild(b2);barra.appendChild(b3);
  box.appendChild(barra);box.appendChild(pre);
  document.body.appendChild(box);
}

const KEY='mairgo-v5-local';
const IDB_NAME='mair-go-local-database';
const IDB_VERSION=1;
const IDB_STORE='state';
const IDB_KEY='main';
let storageDB=null;
let persistenceChain=Promise.resolve();

function openStorageDB(){
  if(storageDB)return Promise.resolve(storageDB);
  return new Promise((resolve,reject)=>{
    const request=indexedDB.open(IDB_NAME,IDB_VERSION);
    request.onupgradeneeded=()=>{
      const database=request.result;
      if(!database.objectStoreNames.contains(IDB_STORE)){
        database.createObjectStore(IDB_STORE);
      }
    };
    request.onsuccess=()=>{
      storageDB=request.result;
      storageDB.onversionchange=()=>storageDB.close();
      resolve(storageDB);
    };
    request.onerror=()=>reject(request.error);
    request.onblocked=()=>console.warn('Database MAIR GO! bloccato da un’altra scheda.');
  });
}

async function readPersistentState(){
  const database=await openStorageDB();
  return new Promise((resolve,reject)=>{
    const tx=database.transaction(IDB_STORE,'readonly');
    const request=tx.objectStore(IDB_STORE).get(IDB_KEY);
    request.onsuccess=()=>resolve(request.result||null);
    request.onerror=()=>reject(request.error);
  });
}

async function writePersistentState(snapshot){
  const database=await openStorageDB();
  return new Promise((resolve,reject)=>{
    const tx=database.transaction(IDB_STORE,'readwrite');
    tx.objectStore(IDB_STORE).put(snapshot,IDB_KEY);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error);
    tx.onabort=()=>reject(tx.error||new Error('Salvataggio annullato'));
  });
}

function queuePersistentSave(){
  const snapshot=clone(db);
  persistenceChain=persistenceChain
    .catch(()=>{})
    .then(()=>writePersistentState(snapshot))
    .catch(error=>{
      console.error('Errore salvataggio IndexedDB:',error);
      toast('Errore di salvataggio locale');
    });
  return persistenceChain;
}

async function initPersistence(){
  try{
    const stored=await readPersistentState();
    if(stored){
      db=merge(clone(defaults),stored);
    }else{
      // Migrazione automatica dalla precedente versione basata su localStorage.
      const legacy=load();
      db=merge(clone(defaults),legacy);
      await writePersistentState(clone(db));
    }
  }catch(error){
    console.error('IndexedDB non disponibile, uso temporaneamente localStorage:',error);
    db=load();
  }
}

const defaults={artworks:[],library:[],collections:[],exhibitions:[],clients:[],sales:[],agenda:[],workspaces:[],pdfProjects:[],certificates:[],settings:{home:{},artist:"Maurizio D'Andrea",bio:'',email:'dandreart.info@gmail.com',phone:'',theme:'atelier',accent:'oro',fontSize:'medium',animations:true,splash:true,pinEnabled:false,pinHash:'',pinLength:4,lastBackup:'',lists:{techniques:['Olio su tela','Acrilico su tela','Acquerello','Tecnica mista','Carboncino','Pastello','Inchiostro','Collage','Digitale','Altro'],supports:['Tela','Tavola','Carta','Cartone','Legno','MDF','Alluminio','Vetro','Stoffa','Altro'],dimensions:['10×10 cm','15×15 cm','20×20 cm','20×30 cm','24×30 cm','30×30 cm','30×40 cm','40×40 cm','40×50 cm','50×50 cm','50×60 cm','50×70 cm','60×60 cm','60×80 cm','70×100 cm','80×80 cm','80×100 cm','90×120 cm','100×100 cm','100×120 cm','100×150 cm','120×120 cm','120×150 cm','150×150 cm','150×200 cm'],frames:['Nessuna','Legno naturale','Bianca','Nera','Dorata','Argento','Cassetta americana','Passe-partout','Personalizzata'],statuses:['Disponibile','Venduto','Riservato','In esposizione','In prestito','Donato','Collezione privata','Non disponibile'],categories:['Catalogo','Scheda tecnica','Contratto','Articolo','Ispirazione','Certificato','Altro']}}};
let db=load(),route=location.hash.slice(1)||'home',currentViewer=null;
const $=s=>document.querySelector(s), app=$('#app'),modal=$('#modal'),viewer=$('#viewer');
function clone(x){return JSON.parse(JSON.stringify(x))}function load(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return merge(clone(defaults),x)}catch{return clone(defaults)}}function merge(a,b){for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k])a[k]=merge(a[k],b[k]);else a[k]=b[k]}return a}function save(){
  // IndexedDB è il salvataggio principale: supporta anche archivi con molte immagini e documenti.
  queuePersistentSave();
  // Mantiene una copia compatibile solo quando entra nei limiti di localStorage.
  try{
    const serialized=JSON.stringify(db);
    if(serialized.length<1500000)localStorage.setItem(KEY,serialized);
  }catch(error){
    console.warn('Copia localStorage non aggiornata:',error);
  }
  updateHeader();
}const uid=()=>crypto.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2);const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));const euro=n=>n?new Intl.NumberFormat('it-IT',{style:'currency',currency:'EUR'}).format(+n):'';function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');setTimeout(()=>x.classList.remove('show'),1800)}function download(blob,name){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
const titles={home:'MAIR GO!',artworks:'Opere',library:'Biblioteca Pro',pdfstudio:'PDF Studio',settings:'Impostazioni',info:'Informazioni',timeline:'Timeline',workspace:'Workspace',exhibitions:'Mostre',clients:'Clienti',sales:'Vendite',agenda:'Agenda',certificates:'Certificati',social:'Zona Social',certpreview:'Certificato',guide:'Guida offline',contact:'Contatti e segnalazioni'};function updateHeader(){document.documentElement.dataset.theme=db.settings.theme;document.documentElement.dataset.accent=db.settings.accent||'oro';document.documentElement.dataset.font=db.settings.fontSize||'medium';document.documentElement.classList.toggle('reduce-motion',db.settings.animations===false);$('#pageTitle').textContent=titles[route]||'MAIR GO!';$('#pageSub').textContent=route==='home'?'Il tuo atelier digitale':db.settings.artist;document.querySelectorAll('.bottomnav button').forEach(b=>b.classList.toggle('active',b.dataset.route===route))}function go(r){route=r;location.hash=r;render();scrollTo(0,0)}function render(){updateHeader();app.innerHTML=(views[route]||views.home)();bind()}function bind(){document.querySelectorAll('[data-go]').forEach(x=>x.onclick=()=>go(x.dataset.go));document.querySelectorAll('[data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x));if(route==='artworks')bindArtworkFilters();if(route==='library')bindLibraryFilters();if(route==='exhibitions')bindSimpleFilter('exSearch','exGrid',db.exhibitions,exhibitionCard);if(route==='clients')bindSimpleFilter('clientSearch','clientGrid',db.clients,clientCard);if(route==='sales')bindSimpleFilter('saleSearch','saleGrid',db.sales,saleCard);if(route==='agenda')bindAgendaFilters()}
function section(t,b=''){return `<div class="sectionhead"><h2>${t}</h2>${b}</div>`}function empty(i,t,b=''){return `<div class="empty"><div style="font-size:2.5rem">${i}</div><p>${t}</p>${b}</div>`}function img(src,alt=''){return src?`<img src="${src}" alt="${esc(alt)}">`:'✦'}function field(label,name,value='',type='text',full=''){return `<div class="field ${full}"><label>${label}</label><input name="${name}" type="${type}" value="${esc(value)}"></div>`}function area(label,name,value='',full='full'){return `<div class="field ${full}"><label>${label}</label><textarea name="${name}">${esc(value)}</textarea></div>`}function selectField(label,name,list,value='',full=''){return `<div class="field ${full}"><label>${label}</label><div class="field-inline"><select name="${name}">${list.map(v=>`<option ${v===value?'selected':''}>${esc(v)}</option>`).join('')}</select><button type="button" class="btn" data-add-list="${name}">＋</button></div></div>`}
function artworkCard(a){return `<article class="card"><div class="cardimg">${img(a.image,a.title)}</div><div class="cardbody"><div class="row spread"><h3>${esc(a.title||'Senza titolo')}</h3><button class="star" data-action="toggleArtworkFav" data-id="${a.id}">${a.favorite?'★':'☆'}</button></div><div class="meta">${esc(a.year||'s.d.')} · ${esc(a.technique||'Tecnica non indicata')}</div><span class="badge">${esc(a.dimensions||'Dimensioni n.d.')}</span><span class="badge">${esc(a.status||'Disponibile')}</span>${a.price?`<span class="badge">${euro(a.price)}</span>`:''}<div class="row" style="margin-top:12px"><button class="btn primary" data-action="editArtwork" data-id="${a.id}">Apri</button><button class="btn danger" data-action="deleteArtwork" data-id="${a.id}">Elimina</button></div></div></article>`}
function libCard(d){const ico=d.mime?.includes('pdf')?'📕':d.mime?.includes('word')||d.name?.endsWith('.docx')?'📘':d.mime?.startsWith('image')?'🖼️':'📄';return `<article class="card"><div class="cardbody"><div class="row spread"><div class="doc-type">${ico}</div><button class="star" data-action="toggleLibFav" data-id="${d.id}">${d.favorite?'★':'☆'}</button></div><h3>${esc(d.title||d.name)}</h3><div class="meta">${esc(d.author||'Autore non indicato')} · ${esc(d.category||'Altro')}</div><p>${esc(d.description||'')}</p>${(d.tags||[]).map(t=>`<span class="badge">${esc(t)}</span>`).join('')}<div class="row" style="margin-top:12px"><button class="btn primary" data-action="openLibrary" data-id="${d.id}">Leggi</button><button class="btn" data-action="editLibrary" data-id="${d.id}">Modifica</button><button class="btn danger" data-action="deleteLibrary" data-id="${d.id}">Elimina</button></div></div></article>`}
const themeOptions=[['atelier','Atelier'],['museum','Museo chiaro'],['dark','Dark Gallery'],['blackgold','Black & Gold'],['ocean','Ocean'],['forest','Forest'],['burgundy','Burgundy'],['paper','Carta editoriale'],['violet','Viola contemporaneo']];
function stat(label,value,icon){return `<div class="stat"><span>${icon}</span><strong>${value}</strong><small>${label}</small></div>`}
const BACKUP_DAYS=3;
function backupDaysAgo(){if(!db.settings.lastBackup)return null;const diff=Date.now()-new Date(db.settings.lastBackup).getTime();return Math.floor(diff/86400000);}
function backupBanner(){
  const days=backupDaysAgo();
  const hasData=db.artworks.length||db.certificates.length||db.library.length||db.sales.length||db.clients.length;
  if(!hasData)return '';
  let cls='backup-banner',icon='💾',msg,sub;
  if(days===null){cls+=' warn';icon='⚠️';msg='Non hai ancora fatto nessun backup';sub='Salva subito una copia: resterà nei Download del telefono e sopravvive alla cancellazione della cache.';}
  else if(days>=BACKUP_DAYS){cls+=' warn';icon='⚠️';msg=`Ultimo backup ${days} giorni fa`;sub='È passato troppo tempo. Fai una nuova copia per non rischiare di perdere i dati.';}
  else {cls+=' ok';icon='✅';msg=days===0?'Backup fatto oggi':`Ultimo backup ${days} giorn${days===1?'o':'i'} fa`;sub='I tuoi dati sono al sicuro nei Download. Continua così.';}
  return `<section class="${cls}"><div class="bb-icon">${icon}</div><div class="bb-text"><strong>${msg}</strong><p>${sub}</p></div><button class="btn primary" data-action="exportBackup">💾 Fai il backup ora</button></section>`;
}
function placeholderView(icon,title,text){return `${section(title)}<section class="hero"><h2>${icon} ${title}</h2><p>${text}</p></section><div class="empty"><div style="font-size:3rem">${icon}</div><p>Modulo predisposto e integrato nella navigazione. I dati resteranno sempre locali.</p></div>`}
/* ===================== HOME PERSONALIZZABILE ===================== */
const HOME_STATS={
  opere:{label:'Opere',icon:'\ud83c\udfa8',calc:()=>db.artworks.length},
  disponibili:{label:'Disponibili',icon:'\u2713',calc:()=>db.artworks.filter(a=>a.status==='Disponibile').length},
  vendute:{label:'Vendute',icon:'\u25c6',calc:()=>db.artworks.filter(a=>a.status==='Venduto').length},
  documenti:{label:'Documenti',icon:'\ud83d\udcda',calc:()=>db.library.length},
  certificati:{label:'Certificati',icon:'\u2726',calc:()=>db.certificates.length},
  mostre:{label:'Mostre',icon:'\ud83c\udfdb\ufe0f',calc:()=>db.exhibitions.length},
  clienti:{label:'Clienti',icon:'\ud83d\udc65',calc:()=>db.clients.length},
  vendite:{label:'Vendite',icon:'\ud83d\udcb6',calc:()=>db.sales.length},
  incassato:{label:'Incassato',icon:'\u20ac',calc:()=>euro(db.sales.reduce((t,x)=>t+Number(x.paid||0),0))},
  agenda:{label:'Impegni',icon:'\ud83d\udcc5',calc:()=>db.agenda.length}
};
const HOME_TILES={
  artworks:{icon:'\ud83c\udfa8',title:'Opere',desc:'Archivio, filtri, immagini e schede complete.',count:()=>db.artworks.length},
  library:{icon:'\ud83d\udcda',title:'Biblioteca Pro',desc:'PDF, DOCX, testi, immagini e appunti.',count:()=>db.library.length},
  pdfstudio:{icon:'\ud83d\udcc4',title:'PDF Studio',desc:'Cataloghi, dossier e stampe d\u2019archivio.',count:()=>db.pdfProjects.length},
  certificates:{icon:'\u2726',title:'Certificati',desc:'Autenticit\u00e0, vendita, provenienza e altro.',count:()=>db.certificates.length},
  workspace:{icon:'\ud83e\uddf0',title:'Workspace',desc:'Progetti con opere, documenti e contatti.',count:()=>db.workspaces.length},
  exhibitions:{icon:'\ud83c\udfdb\ufe0f',title:'Mostre',desc:'Esposizioni, sedi, date e cataloghi.',count:()=>db.exhibitions.length},
  clients:{icon:'\ud83d\udc65',title:'Clienti',desc:'Rubrica collezionisti e galleristi.',count:()=>db.clients.length},
  sales:{icon:'\ud83d\udcb6',title:'Vendite',desc:'Trattative, incassi e ricevute.',count:()=>db.sales.length},
  agenda:{icon:'\ud83d\udcc5',title:'Agenda',desc:'Impegni, scadenze e promemoria.',count:()=>db.agenda.length},
  social:{icon:'\ud83d\udcf1',title:'Social',desc:'Immagini pronte per Instagram, Facebook e TikTok.',count:null},
  timeline:{icon:'\ud83d\udd52',title:'Timeline',desc:'Cronologia delle attivit\u00e0 e degli eventi.',count:null},
  settings:{icon:'\u2699\ufe0f',title:'Impostazioni',desc:'Profilo, aspetto, liste e backup.',count:null},
  guide:{icon:'\ud83d\udcd6',title:'Guida offline',desc:'Come usare ogni sezione dell\u2019app.',count:null},
  info:{icon:'\u2139\ufe0f',title:'Informazioni',desc:'Versione, licenza e note sull\u2019app.',count:null},
  contact:{icon:'\u2709\ufe0f',title:'Contatti',desc:'Segnalazioni e richieste di assistenza.',count:null}
};
const HOME_DEFAULT={
  titolo:'',sottotitolo:'',immagine:'',
  stats:['opere','disponibili','vendute','documenti'],
  tiles:['artworks','library','pdfstudio','certificates','workspace','exhibitions','clients','sales','agenda','social','timeline','settings','guide','info','contact'],
  azione:'newArtwork'
};
function homeCfg(){const h=db.settings.home||{};return Object.assign({},HOME_DEFAULT,h);}

function agendaOggi(){
  const oggi=new Date();oggi.setHours(0,0,0,0);
  const fra7=new Date(oggi.getTime()+7*86400000);
  const cat={scaduti:[],oggi:[],domani:[],settimana:[]};
  (db.agenda||[]).forEach(x=>{
    if(!x.date)return;
    if(x.done)return;
    const d=new Date(x.date);d.setHours(0,0,0,0);
    const diff=Math.round((d-oggi)/86400000);
    if(diff<0)cat.scaduti.push(x);
    else if(diff===0)cat.oggi.push(x);
    else if(diff===1)cat.domani.push(x);
    else if(d<=fra7)cat.settimana.push(x);
  });
  const ord=(a,b)=>new Date(a.date)-new Date(b.date)||String(a.time||'').localeCompare(String(b.time||''));
  Object.keys(cat).forEach(k=>cat[k].sort(ord));
  return cat;
}
function promemoriaOggi(){
  const c=agendaOggi();
  const tot=c.scaduti.length+c.oggi.length+c.domani.length+c.settimana.length;
  if(!tot)return '';
  const voce=x=>'<li><span class="pm-ora">'+(x.time?esc(x.time):'\u2014')+'</span><span class="pm-tit">'+esc(x.title||'Senza titolo')+'</span>'+(x.location?'<span class="pm-luogo">'+esc(x.location)+'</span>':'')+'</li>';
  const gruppo=(tit,arr,cls)=>arr.length?'<div class="pm-gruppo '+cls+'"><h4>'+tit+' <span>'+arr.length+'</span></h4><ul>'+arr.slice(0,5).map(voce).join('')+(arr.length>5?'<li class="pm-altri">+ altri '+(arr.length-5)+'</li>':'')+'</ul></div>':'';
  const urgente=c.scaduti.length||c.oggi.length;
  return '<section class="promemoria'+(urgente?' urgente':'')+'">'
    +'<div class="pm-testa"><h3>\ud83d\udcc5 Da fare</h3><button class="btn" data-go="agenda">Apri agenda</button></div>'
    +gruppo('In ritardo',c.scaduti,'g-rit')
    +gruppo('Oggi',c.oggi,'g-oggi')
    +gruppo('Domani',c.domani,'g-dom')
    +gruppo('Prossimi giorni',c.settimana,'g-set')
    +'</section>';
}

/* ===================== ZONA SOCIAL ===================== */
const SOCIAL_FORMATI=[['1080x1080','Quadrato 1:1 (Instagram)'],['1080x1350','Verticale 4:5 (Instagram)'],['1080x1920','Storia 9:16 (Stories/TikTok)'],['1200x630','Orizzontale (Facebook/X)']];
const SOCIAL_STILI=[['scuro','Fondo scuro elegante'],['chiaro','Fondo chiaro minimal'],['oro','Nero e oro'],['sfumato','Sfumatura artistica']];

function socialView(){
  const sel=db.artworks.filter(a=>a.image);
  return section('Social','<button class="btn primary" data-action="newSocialPost">\u2726 Crea post</button>')
   +'<section class="hero"><h2>\ud83d\udcf1 Zona Social</h2><p>Prepara immagini pronte per Instagram, Facebook e TikTok partendo dalle tue opere. Puoi creare una singola immagine curata o una sequenza fino a 5 opere.</p></section>'
   +(sel.length?'<div class="row" style="gap:10px;flex-wrap:wrap;margin-bottom:16px">'
     +'<button class="btn" data-action="socialSingolo">\ud83d\uddbc\ufe0f Immagine singola</button>'
     +'<button class="btn" data-action="socialSequenza">\ud83d\uddbc\ufe0f Sequenza immagini</button>'
     +'<button class="btn primary" data-action="socialVideo">\ud83c\udfac Crea video</button>'
     +'</div>':'')
   +(sel.length?'<div class="grid">'+sel.slice(0,12).map(a=>'<article class="card"><div class="cardbody"><img src="'+a.image+'" style="width:100%;height:150px;object-fit:cover;border-radius:8px;margin-bottom:10px"><h3>'+esc(a.title||'Senza titolo')+'</h3><div class="meta">'+esc(a.year||'')+' '+esc(a.technique||'')+'</div><button class="btn primary" data-action="socialDaOpera" data-id="'+a.id+'" style="margin-top:10px">Crea post</button></div></article>').join('')+'</div>'
     : empty('\ud83d\udcf1','Nessuna opera con immagine. Aggiungi immagini alle opere per creare post social.'));
}

// disegna una card social su canvas
async function socialCanvas(opera,cfg){
  const [W,H]=(cfg.formato||'1080x1080').split('x').map(Number);
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  const stile=cfg.stile||'scuro';
  const oro='#c9a227';
  // sfondo
  if(stile==='chiaro'){ctx.fillStyle='#f4f1ea';}
  else if(stile==='oro'){ctx.fillStyle='#0d0d0d';}
  else if(stile==='sfumato'){const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#3a2c1c');ctx.fillStyle=g;}
  else {ctx.fillStyle='#141210';}
  ctx.fillRect(0,0,W,H);
  const testoCol=(stile==='chiaro')?'#1a1a1a':'#f5efe2';
  // immagine opera
  if(opera.image){
    const img=await new Promise((ris,rif)=>{const i=new Image();i.onload=()=>ris(i);i.onerror=rif;i.src=opera.image;});
    const areaH=H*0.62, areaW=W*0.82;
    const sc=Math.min(areaW/img.width,areaH/img.height);
    const iw=img.width*sc, ih=img.height*sc;
    const ix=(W-iw)/2, iy=H*0.10;
    ctx.save();
    ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=40;ctx.shadowOffsetY=12;
    ctx.drawImage(img,ix,iy,iw,ih);
    ctx.restore();
    ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.004);
    ctx.strokeRect(ix,iy,iw,ih);
  }
  // testi
  const cx=W/2;
  let y=H*0.79;
  ctx.textAlign='center';
  ctx.fillStyle=oro;
  ctx.font='600 '+Math.round(W*0.028)+'px Georgia, serif';
  ctx.fillText((cfg.etichetta||'OPERA').toUpperCase().split('').join(' '),cx,y);
  y+=H*0.055;
  ctx.fillStyle=testoCol;
  ctx.font='italic 700 '+Math.round(W*0.062)+'px Georgia, serif';
  const tit=String(opera.title||'Senza titolo');
  const maxW=W*0.86;
  let t=tit;
  while(ctx.measureText(t).width>maxW&&t.length>4)t=t.slice(0,-2);
  if(t!==tit)t=t+'\u2026';
  ctx.fillText(t,cx,y);
  y+=H*0.045;
  ctx.fillStyle=(stile==='chiaro')?'#555':'#b9ac93';
  ctx.font='400 '+Math.round(W*0.028)+'px Georgia, serif';
  const dett=[opera.year,opera.technique,opera.dimensions].filter(Boolean).join('  \u00b7  ');
  if(dett)ctx.fillText(dett.slice(0,60),cx,y);
  // firma
  ctx.fillStyle=oro;
  ctx.font='700 '+Math.round(W*0.03)+'px Georgia, serif';
  ctx.fillText(String(db.settings.artist||''),cx,H*0.945);
  // cornice
  ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.005);
  ctx.strokeRect(W*0.035,H*0.03,W*0.93,H*0.94);
  return cv;
}

async function socialPostModal(opera){
  const cfg={formato:'1080x1080',stile:'scuro',etichetta:'Opera'};
  openModal('Post social — '+(opera.title||'Opera'),'<div class="formgrid">'
    +'<div class="field"><label>Formato</label><select name="formato">'+SOCIAL_FORMATI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field"><label>Stile</label><select name="stile">'+SOCIAL_STILI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +field('Etichetta in alto','etichetta','Opera')
    +'<p class="meta full">L\u2019immagine verr\u00e0 generata e potrai salvarla o condividerla sui social.</p>'
  +'</div>',async fd=>{
    modal.close();
    await socialGenera(opera,{formato:fd.get('formato'),stile:fd.get('stile'),etichetta:fd.get('etichetta')||'Opera'});
  });
}

async function socialGenera(opera,cfg){
  try{
    toast('Preparo l\u2019immagine\u2026');
    const cv=await socialCanvas(opera,cfg);
    const dataUrl=cv.toDataURL('image/jpeg',0.94);
    socialAnteprima(dataUrl,safeName(opera.title||'post')+'_social.jpg',opera);
  }catch(e){
    diagLog('SOCIAL-ERRORE',e&&e.message?e.message:String(e));
    alert('Impossibile creare l\u2019immagine: '+(e&&e.message?e.message:e));
  }
}

function socialAnteprima(dataUrl,nome,opera){
  const host=document.createElement('div');host.id='socialview';
  host.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#111;display:flex;flex-direction:column');
  const bar=document.createElement('div');
  bar.setAttribute('style','padding:10px;background:#fff;display:flex;gap:8px;flex-wrap:wrap');
  const mk=(t,pri)=>{const b=document.createElement('button');b.textContent=t;
    b.setAttribute('style','padding:10px 16px;font:600 .95rem system-ui;border:1px solid #bbb;border-radius:8px;'+(pri?'background:#8a6a1f;color:#fff;border-color:#8a6a1f':'background:#fff;color:#111'));
    bar.appendChild(b);return b;};
  const bC=mk('\u2190 Chiudi');
  const bS=mk('\ud83d\udcbe Salva immagine',true);
  const bT=mk('\u270d\ufe0f Testo per il post');
  bC.onclick=()=>host.remove();
  bS.onclick=async()=>{
    const b64=dataUrl.split(',')[1];
    try{
      const Cap=window.Capacitor,FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
      if(FS){
        let res=null,usata='';
        for(const d of ['EXTERNAL','DATA','DOCUMENTS','CACHE']){
          try{res=await FS.writeFile({path:nome,data:b64,directory:d,recursive:true});usata=d;break;}catch(e){}
        }
        if(res){
          diagLog('SOCIAL','salvata in '+usata+': '+nome);
          const Sh=Cap.Plugins&&Cap.Plugins.Share;
          if(Sh&&res.uri){try{await Sh.share({title:nome,url:res.uri,dialogTitle:'Condividi sui social'});return;}catch(e){}}
          alert('Immagine salvata: '+nome);return;
        }
      }
    }catch(e){diagLog('SOCIAL-SAVE',e&&e.message?e.message:String(e));}
    try{const a=document.createElement('a');a.href=dataUrl;a.download=nome;a.click();}catch(e){alert('Impossibile salvare');}
  };
  bT.onclick=()=>{
    const tag=['#arte','#pittura','#artecontemporanea','#'+String(db.settings.artist||'').replace(/\s+/g,'')].join(' ');
    const testo=(opera.title||'Senza titolo')+(opera.year?' ('+opera.year+')':'')+'\n'
      +[opera.technique,opera.dimensions].filter(Boolean).join(' \u00b7 ')+'\n\n'
      +(opera.description||'')+'\n\n'+db.settings.artist+'\n'+tag;
    textEditorOpen('Testo per il post',testo);
  };
  const wrap=document.createElement('div');
  wrap.setAttribute('style','flex:1;overflow:auto;display:flex;align-items:center;justify-content:center;padding:14px');
  const img=document.createElement('img');img.src=dataUrl;
  img.setAttribute('style','max-width:100%;max-height:100%;box-shadow:0 6px 30px rgba(0,0,0,.6)');
  wrap.appendChild(img);
  host.appendChild(bar);host.appendChild(wrap);
  document.body.appendChild(host);
}

async function socialSequenzaModal(){
  const conImg=db.artworks.filter(a=>a.image);
  if(!conImg.length){toast('Nessuna opera con immagine');return}
  openModal('Sequenza social (max 5 opere)','<div class="formgrid">'
    +'<div class="field"><label>Formato</label><select name="formato">'+SOCIAL_FORMATI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field"><label>Stile</label><select name="stile">'+SOCIAL_STILI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field full"><label>Scegli fino a 5 opere</label><div class="chkgrid">'
      +conImg.slice(0,40).map(a=>'<label class="chkline"><input type="checkbox" name="op" value="'+a.id+'"> '+esc(a.title||'Senza titolo')+'</label>').join('')
    +'</div></div>'
  +'</div>',async fd=>{
    const ids=fd.getAll('op').slice(0,5);
    if(!ids.length){toast('Seleziona almeno un\u2019opera');return}
    modal.close();
    const cfg={formato:fd.get('formato'),stile:fd.get('stile'),etichetta:'Opera'};
    const imgs=[];
    for(let i=0;i<ids.length;i++){
      const a=db.artworks.find(x=>x.id===ids[i]);
      if(!a)continue;
      toast('Preparo '+(i+1)+' di '+ids.length+'\u2026');
      const cv=await socialCanvas(a,Object.assign({},cfg,{etichetta:(i+1)+' / '+ids.length}));
      imgs.push({url:cv.toDataURL('image/jpeg',0.94),nome:safeName(a.title||('opera'+(i+1)))+'_social.jpg',opera:a});
    }
    socialGalleria(imgs);
  });
}

function socialGalleria(imgs){
  const host=document.createElement('div');
  host.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#111;display:flex;flex-direction:column');
  const bar=document.createElement('div');
  bar.setAttribute('style','padding:10px;background:#fff;display:flex;gap:8px;flex-wrap:wrap;align-items:center');
  const bC=document.createElement('button');bC.textContent='\u2190 Chiudi';
  bC.setAttribute('style','padding:10px 16px;font:600 .95rem system-ui');
  bC.onclick=()=>host.remove();
  const info=document.createElement('span');
  info.textContent=imgs.length+' immagini pronte \u00b7 tocca una per salvarla';
  info.setAttribute('style','font:13px system-ui;color:#555');
  bar.appendChild(bC);bar.appendChild(info);
  const wrap=document.createElement('div');
  wrap.setAttribute('style','flex:1;overflow:auto;padding:14px;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px');
  imgs.forEach(o=>{
    const c=document.createElement('div');
    c.setAttribute('style','cursor:pointer');
    const im=document.createElement('img');im.src=o.url;
    im.setAttribute('style','width:100%;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.5)');
    c.appendChild(im);
    c.onclick=()=>socialAnteprima(o.url,o.nome,o.opera);
    wrap.appendChild(c);
  });
  host.appendChild(bar);host.appendChild(wrap);
  document.body.appendChild(host);
}

/* ===================== VIDEO SOCIAL ===================== */
function videoMimeSupportato(){
  const cand=['video/mp4;codecs=avc1.42E01E','video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'];
  for(const m of cand){try{if(window.MediaRecorder&&MediaRecorder.isTypeSupported(m))return m;}catch(e){}}
  return '';
}
function vEase(t){return t<0.5?2*t*t:1-Math.pow(-2*t+2,2)/2;}

function vSfondo(ctx,W,H,stile){
  if(stile==='chiaro'){ctx.fillStyle='#f4f1ea';}
  else if(stile==='oro'){ctx.fillStyle='#0d0d0d';}
  else if(stile==='sfumato'){const g=ctx.createLinearGradient(0,0,W,H);g.addColorStop(0,'#1a1410');g.addColorStop(1,'#3a2c1c');ctx.fillStyle=g;}
  else {ctx.fillStyle='#141210';}
  ctx.fillRect(0,0,W,H);
}
function vTestoAdattato(ctx,testo,maxW){
  let t=String(testo||'');
  while(ctx.measureText(t).width>maxW&&t.length>4)t=t.slice(0,-2);
  return t===String(testo||'')?t:t+'\u2026';
}
// disegna una scena opera con effetto scelto
function vScena(ctx,W,H,img,dati,prog,effetto,stile){
  const oro='#c9a227';
  const testoCol=(stile==='chiaro')?'#1a1a1a':'#f5efe2';
  const secCol=(stile==='chiaro')?'#555':'#b9ac93';
  vSfondo(ctx,W,H,stile);
  // apparizione/uscita
  let alpha=1, dx=0, scala=1;
  const fade=0.14;
  if(prog<fade)alpha=prog/fade;
  else if(prog>1-fade)alpha=(1-prog)/fade;
  if(effetto==='scorri'){
    if(prog<fade)dx=(1-prog/fade)*W*0.22;
    else if(prog>1-fade)dx=-(1-(1-prog)/fade)*W*0.22;
  }
  if(effetto==='zoom'){scala=1+0.10*vEase(prog);}
  ctx.save();
  ctx.globalAlpha=Math.max(0,Math.min(1,alpha));
  if(img){
    const areaH=H*0.60, areaW=W*0.80;
    const sc=Math.min(areaW/img.width,areaH/img.height)*scala;
    const iw=img.width*sc, ih=img.height*sc;
    const ix=(W-iw)/2+dx, iy=H*0.11;
    ctx.save();
    ctx.shadowColor='rgba(0,0,0,.55)';ctx.shadowBlur=44;ctx.shadowOffsetY=14;
    ctx.drawImage(img,ix,iy,iw,ih);
    ctx.restore();
    ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.004);
    ctx.strokeRect(ix,iy,iw,ih);
  }
  const cx=W/2+dx;
  ctx.textAlign='center';
  let y=H*0.795;
  if(dati.etichetta){
    ctx.fillStyle=oro;
    ctx.font='600 '+Math.round(W*0.026)+'px Georgia, serif';
    ctx.fillText(String(dati.etichetta).toUpperCase().split('').join(' '),cx,y);
  }
  y+=H*0.056;
  ctx.fillStyle=testoCol;
  ctx.font='italic 700 '+Math.round(W*0.060)+'px Georgia, serif';
  ctx.fillText(vTestoAdattato(ctx,dati.titolo||'Senza titolo',W*0.86),cx,y);
  y+=H*0.042;
  ctx.fillStyle=secCol;
  ctx.font='400 '+Math.round(W*0.027)+'px Georgia, serif';
  const riga=[dati.dimensioni,dati.anno].filter(Boolean).join('  \u00b7  ');
  if(riga)ctx.fillText(vTestoAdattato(ctx,riga,W*0.86),cx,y);
  if(dati.file){
    y+=H*0.036;
    ctx.fillStyle=secCol;
    ctx.font='400 '+Math.round(W*0.021)+'px Georgia, serif';
    ctx.fillText(vTestoAdattato(ctx,dati.file,W*0.8),cx,y);
  }
  ctx.restore();
  // firma e cornice sempre piene
  ctx.fillStyle=oro;
  ctx.textAlign='center';
  ctx.font='700 '+Math.round(W*0.029)+'px Georgia, serif';
  ctx.fillText(String(db.settings.artist||''),W/2,H*0.945);
  ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.005);
  ctx.strokeRect(W*0.035,H*0.03,W*0.93,H*0.94);
}
function vTitolo(ctx,W,H,titolo,sottotitolo,prog,stile){
  const oro='#c9a227';
  const testoCol=(stile==='chiaro')?'#1a1a1a':'#f5efe2';
  vSfondo(ctx,W,H,stile);
  let alpha=1;const fade=0.22;
  if(prog<fade)alpha=prog/fade;else if(prog>1-fade)alpha=(1-prog)/fade;
  ctx.save();ctx.globalAlpha=Math.max(0,Math.min(1,alpha));
  ctx.textAlign='center';
  ctx.fillStyle=oro;
  ctx.font='600 '+Math.round(W*0.026)+'px Georgia, serif';
  ctx.fillText('',W/2,H*0.40);
  ctx.fillStyle=testoCol;
  ctx.font='700 '+Math.round(W*0.075)+'px Georgia, serif';
  ctx.fillText(vTestoAdattato(ctx,titolo||'Opere',W*0.86),W/2,H*0.50);
  if(sottotitolo){
    ctx.fillStyle=(stile==='chiaro')?'#555':'#b9ac93';
    ctx.font='italic 400 '+Math.round(W*0.032)+'px Georgia, serif';
    ctx.fillText(vTestoAdattato(ctx,sottotitolo,W*0.8),W/2,H*0.565);
  }
  ctx.fillStyle=oro;
  ctx.fillRect(W/2-W*0.06,H*0.60,W*0.12,Math.max(2,H*0.003));
  ctx.restore();
  ctx.strokeStyle=oro;ctx.lineWidth=Math.max(2,W*0.005);
  ctx.strokeRect(W*0.035,H*0.03,W*0.93,H*0.94);
}

async function videoGenera(opere,cfg){
  const mime=videoMimeSupportato();
  if(!mime||!window.MediaRecorder){
    diagLog('VIDEO','MediaRecorder non disponibile');
    alert('Questo dispositivo non pu\u00f2 creare video.\nGenero la sequenza di immagini.');
    return null;
  }
  const [W,H]=(cfg.formato||'1080x1350').split('x').map(Number);
  const cv=document.createElement('canvas');cv.width=W;cv.height=H;
  const ctx=cv.getContext('2d');
  // precarico immagini
  const imgs=[];
  for(const a of opere){
    let im=null;
    if(a.image){try{im=await new Promise((ris,rif)=>{const i=new Image();i.onload=()=>ris(i);i.onerror=rif;i.src=a.image;});}catch(e){}}
    imgs.push(im);
  }
  const fps=30;
  const durTit=2.2;
  const durOp=Number(cfg.durata||4);
  const effetti=['dissolvenza','scorri','zoom'];
  const stile=cfg.stile||'scuro';
  const stream=cv.captureStream(fps);
  const chunks=[];
  const rec=new MediaRecorder(stream,{mimeType:mime,videoBitsPerSecond:5000000});
  rec.ondataavailable=e=>{if(e.data&&e.data.size)chunks.push(e.data);};
  const finito=new Promise(ris=>{rec.onstop=()=>ris();});
  rec.start();
  const attesa=ms=>new Promise(r=>setTimeout(r,ms));
  const passo=1000/fps;
  // titolo
  const nTit=Math.round(durTit*fps);
  for(let f=0;f<nTit;f++){
    vTitolo(ctx,W,H,cfg.titolo,cfg.sottotitolo,f/nTit,stile);
    await attesa(passo);
  }
  // opere
  const nOp=Math.round(durOp*fps);
  for(let i=0;i<opere.length;i++){
    const a=opere[i];
    const eff=cfg.effetto==='misto'?effetti[i%effetti.length]:(cfg.effetto||'dissolvenza');
    const dati={
      titolo:a.title||'Senza titolo',
      anno:a.year||'',
      dimensioni:a.dimensions||'',
      file:cfg.mostraFile?(a.code||a.imageName||''):'',
      etichetta:(i+1)+' / '+opere.length
    };
    for(let f=0;f<nOp;f++){
      vScena(ctx,W,H,imgs[i],dati,f/nOp,eff,stile);
      await attesa(passo);
    }
  }
  // chiusura
  const nFin=Math.round(1.8*fps);
  for(let f=0;f<nFin;f++){
    vTitolo(ctx,W,H,db.settings.artist||'',db.settings.email||'',f/nFin,stile);
    await attesa(passo);
  }
  rec.stop();
  await finito;
  const ext=mime.indexOf('mp4')>=0?'mp4':'webm';
  const blob=new Blob(chunks,{type:mime});
  diagLog('VIDEO','creato '+ext+' '+Math.round(blob.size/1024)+'KB mime='+mime);
  return {blob,ext,mime};
}

function videoAnteprima(res,nome){
  const url=URL.createObjectURL(res.blob);
  const host=document.createElement('div');
  host.setAttribute('style','position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#111;display:flex;flex-direction:column');
  const bar=document.createElement('div');
  bar.setAttribute('style','padding:10px;background:#fff;display:flex;gap:8px;flex-wrap:wrap;align-items:center');
  const mk=(t,pri)=>{const b=document.createElement('button');b.textContent=t;
    b.setAttribute('style','padding:10px 16px;font:600 .95rem system-ui;border:1px solid #bbb;border-radius:8px;'+(pri?'background:#8a6a1f;color:#fff;border-color:#8a6a1f':'background:#fff;color:#111'));
    bar.appendChild(b);return b;};
  const bC=mk('\u2190 Chiudi');
  const bS=mk('\ud83d\udcbe Salva video',true);
  const info=document.createElement('div');
  info.textContent='Formato '+res.ext.toUpperCase()+' \u00b7 '+Math.round(res.blob.size/1024)+' KB';
  info.setAttribute('style','flex-basis:100%;font:12px system-ui;color:#555');
  bar.appendChild(info);
  bC.onclick=()=>{host.remove();URL.revokeObjectURL(url);};
  bS.onclick=async()=>{
    bS.textContent='\u23f3 Salvo\u2026';bS.disabled=true;
    try{
      const b64=await new Promise((ris,rif)=>{const r=new FileReader();r.onload=()=>ris(String(r.result).split(',')[1]);r.onerror=rif;r.readAsDataURL(res.blob);});
      const Cap=window.Capacitor,FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
      let ok=false;
      if(FS){
        let w=null,usata='';
        for(const d of ['EXTERNAL','DATA','DOCUMENTS','CACHE']){
          try{w=await FS.writeFile({path:nome,data:b64,directory:d,recursive:true});usata=d;break;}
          catch(e){diagLog('VIDEO-DIR','fallita '+d+': '+(e&&e.message?e.message:e));}
        }
        if(w){
          ok=true;diagLog('VIDEO','salvato in '+usata+': '+nome);
          const Sh=Cap.Plugins&&Cap.Plugins.Share;
          if(Sh&&w.uri){try{await Sh.share({title:nome,url:w.uri,dialogTitle:'Salva o condividi il video'});}catch(e){alert('Video salvato: '+nome);}}
          else alert('Video salvato: '+nome);
        }
      }
      if(!ok){const a=document.createElement('a');a.href=url;a.download=nome;a.click();}
    }catch(e){
      diagLog('VIDEO-SAVE-ERRORE',e&&e.message?e.message:String(e));
      alert('Impossibile salvare il video: '+(e&&e.message?e.message:e));
    }finally{bS.textContent='\ud83d\udcbe Salva video';bS.disabled=false;}
  };
  const wrap=document.createElement('div');
  wrap.setAttribute('style','flex:1;display:flex;align-items:center;justify-content:center;padding:14px;overflow:auto');
  const v=document.createElement('video');
  v.src=url;v.controls=true;v.autoplay=true;v.loop=true;v.playsInline=true;
  v.setAttribute('style','max-width:100%;max-height:100%;box-shadow:0 6px 30px rgba(0,0,0,.6)');
  wrap.appendChild(v);
  host.appendChild(bar);host.appendChild(wrap);
  document.body.appendChild(host);
}

function videoModal(){
  const conImg=db.artworks.filter(a=>a.image);
  if(!conImg.length){toast('Nessuna opera con immagine');return}
  openModal('Crea video social','<div class="formgrid">'
    +field('Titolo del video','titolo',db.settings.artist||'Le mie opere','text','full')
    +field('Sottotitolo','sottotitolo','','text','full')
    +'<div class="field"><label>Formato</label><select name="formato">'
      +'<option value="1080x1350">Verticale 4:5</option><option value="1080x1920">Storia 9:16</option>'
      +'<option value="1080x1080">Quadrato 1:1</option><option value="1200x630">Orizzontale</option></select></div>'
    +'<div class="field"><label>Stile</label><select name="stile">'+SOCIAL_STILI.map(([v,l])=>'<option value="'+v+'">'+l+'</option>').join('')+'</select></div>'
    +'<div class="field"><label>Durata per opera</label><select name="durata"><option value="3">3 secondi</option><option value="4" selected>4 secondi</option><option value="5">5 secondi</option></select></div>'
    +'<div class="field"><label>Transizioni</label><select name="effetto">'
      +'<option value="misto" selected>Mescolate</option><option value="dissolvenza">Dissolvenza</option>'
      +'<option value="scorri">Scorrimento</option><option value="zoom">Zoom lento</option></select></div>'
    +'<div class="field full"><label class="chkline"><input type="checkbox" name="mostraFile" checked> Mostra codice/nome file sotto i dati</label></div>'
    +'<div class="field full"><label>Scegli fino a 5 opere</label><div class="chkgrid">'
      +conImg.slice(0,40).map(a=>'<label class="chkline"><input type="checkbox" name="op" value="'+a.id+'"> '+esc(a.title||'Senza titolo')+'</label>').join('')
    +'</div></div>'
    +'<p class="meta full">La creazione avviene in tempo reale: per 5 opere servono circa 25 secondi. Non chiudere l\u2019app durante la lavorazione.</p>'
  +'</div>',async fd=>{
    const ids=fd.getAll('op').slice(0,5);
    if(!ids.length){toast('Seleziona almeno un\u2019opera');return}
    modal.close();
    const opere=ids.map(id=>db.artworks.find(x=>x.id===id)).filter(Boolean);
    const cfg={titolo:fd.get('titolo'),sottotitolo:fd.get('sottotitolo'),formato:fd.get('formato'),
      stile:fd.get('stile'),durata:+fd.get('durata'),effetto:fd.get('effetto'),mostraFile:!!fd.get('mostraFile')};
    const avviso=document.createElement('div');
    avviso.setAttribute('style','position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.88);color:#f0e6d2;display:flex;flex-direction:column;align-items:center;justify-content:center;font:600 1.05rem system-ui;text-align:center;padding:24px');
    avviso.innerHTML='<div style="font-size:2.6rem;margin-bottom:14px">\ud83c\udfac</div><div>Sto creando il video\u2026</div><div style="font-size:.85rem;opacity:.7;margin-top:10px">Circa '+Math.round(2.2+opere.length*cfg.durata+1.8)+' secondi.<br>Lascia lo schermo acceso.</div>';
    document.body.appendChild(avviso);
    let res=null;
    try{res=await videoGenera(opere,cfg);}
    catch(e){diagLog('VIDEO-ERRORE',e&&e.message?e.message:String(e));}
    avviso.remove();
    if(res&&res.blob&&res.blob.size>1000){
      videoAnteprima(res,safeName(cfg.titolo||'video')+'_social.'+res.ext);
    }else{
      alert('Video non riuscito su questo dispositivo.\nPreparo la sequenza di immagini.');
      const imgs=[];
      for(let i=0;i<opere.length;i++){
        const cv=await socialCanvas(opere[i],{formato:cfg.formato,stile:cfg.stile,etichetta:(i+1)+' / '+opere.length});
        imgs.push({url:cv.toDataURL('image/jpeg',0.94),nome:safeName(opere[i].title||('opera'+(i+1)))+'_social.jpg',opera:opere[i]});
      }
      socialGalleria(imgs);
    }
  });
}

function homeView(){
  const h=homeCfg();
  const titolo=h.titolo||db.settings.artist;
  const sub=h.sottotitolo||'Gestisci opere, documenti, cataloghi e attivit\u00e0 artistiche. Tutto resta sul tuo dispositivo.';
  const azioni={newArtwork:'\uff0b Nuova opera',newCertificate:'\u2726 Nuovo certificato',newPdfProject:'\ud83d\udcc4 Nuovo catalogo',newLibrary:'\ud83d\udcda Nuovo documento',newAgenda:'\ud83d\udcc5 Nuovo impegno'};
  const btn=azioni[h.azione]?`<button class="btn primary" data-action="${esc(h.azione)}">${azioni[h.azione]}</button>`:'';
  const hero=`<section class="hero welcome${h.immagine?' has-img':''}"${h.immagine?` style="background-image:linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)),url('${h.immagine}');background-size:cover;background-position:center"`:''}>
    <div><small>ART MANAGEMENT SYSTEM</small><h2>${esc(titolo)}</h2><p>${esc(sub)}</p></div>${btn}</section>`;
  const stats=(h.stats||[]).filter(k=>HOME_STATS[k]).map(k=>{const S=HOME_STATS[k];return stat(S.label,S.calc(),S.icon)}).join('');
  const tiles=(h.tiles||[]).filter(k=>HOME_TILES[k]).map((k,idx)=>{const T=HOME_TILES[k];const n=T.count?T.count():null;
    return `<button class="tile${idx===0?' big':''}" data-go="${k}">${n!==null?`<span class="count">${n}</span>`:''}<span class="symbol">${T.icon}</span><h3>${esc(T.title)}</h3><p>${esc(T.desc)}</p></button>`}).join('');
  return `${hero}${stats?`<div class="stats">${stats}</div>`:''}${h.promemoria!==false?promemoriaOggi():''}
    <div class="row spread" style="margin:18px 0 8px"><h3 style="margin:0">Sezioni</h3><button class="btn" data-action="customizeHome">\u2699\ufe0f Personalizza</button></div>
    <div class="tiles">${tiles||'<p class="meta">Nessuna sezione selezionata. Tocca \u201cPersonalizza\u201d.</p>'}</div>`;
}

function homeCustomizeModal(){
  const h=homeCfg();
  const chk=(nome,mappa,attivi)=>Object.entries(mappa).map(([k,v])=>`<label class="chkline"><input type="checkbox" name="${nome}" value="${k}" ${attivi.includes(k)?'checked':''}> ${v.icon||''} ${esc(v.label||v.title)}</label>`).join('');
  const ordine=(h.tiles||[]).filter(k=>HOME_TILES[k]);
  openModal('Personalizza la schermata principale',`<div class="formgrid">
    ${field('Titolo personale (vuoto = nome artista)','titolo',h.titolo,'text','full')}
    ${area('Sottotitolo / frase di benvenuto','sottotitolo',h.sottotitolo)}
    <div class="field full"><label>Immagine di sfondo (facoltativa)</label><input name="immagine" type="file" accept="image/*">${h.immagine?'<p class="meta">Immagine presente. Carica per sostituirla.</p><label class="chkline"><input type="checkbox" name="rimuoviImg"> Rimuovi immagine attuale</label>':''}</div>
    <div class="field"><label>Pulsante rapido principale</label><select name="azione">
      <option value="" ${!h.azione?'selected':''}>Nessuno</option>
      <option value="newArtwork" ${h.azione==='newArtwork'?'selected':''}>Nuova opera</option>
      <option value="newCertificate" ${h.azione==='newCertificate'?'selected':''}>Nuovo certificato</option>
      <option value="newPdfProject" ${h.azione==='newPdfProject'?'selected':''}>Nuovo catalogo</option>
      <option value="newLibrary" ${h.azione==='newLibrary'?'selected':''}>Nuovo documento</option>
      <option value="newAgenda" ${h.azione==='newAgenda'?'selected':''}>Nuovo impegno</option></select></div>
    <div class="field full"><label class="chkline"><input type="checkbox" name="promemoria" ${h.promemoria!==false?'checked':''}> Mostra il riquadro \u201cDa fare\u201d</label></div>
    <div class="field full"><label>Statistiche da mostrare</label><div class="chkgrid">${chk('stats',HOME_STATS,h.stats||[])}</div></div>
    <div class="field full"><label>Sezioni da mostrare</label><div class="chkgrid">${chk('tiles',HOME_TILES,h.tiles||[])}</div></div>
    <div class="field full"><label>Ordine delle sezioni (una per riga, quelle non elencate vanno in fondo)</label><textarea name="ordine" rows="6">${esc(ordine.map(k=>HOME_TILES[k].title).join('\n'))}</textarea></div>
  </div>`,async fd=>{
    const img=fd.get('immagine');
    const nuovaImg=img&&img.size?await fileData(img):(fd.get('rimuoviImg')?'':h.immagine);
    let tiles=fd.getAll('tiles');
    const testo=(fd.get('ordine')||'').split('\n').map(x=>x.trim()).filter(Boolean);
    const perTitolo={};Object.entries(HOME_TILES).forEach(([k,v])=>perTitolo[v.title.toLowerCase()]=k);
    const ordinati=[];
    testo.forEach(t=>{const k=perTitolo[t.toLowerCase()];if(k&&tiles.includes(k)&&!ordinati.includes(k))ordinati.push(k)});
    tiles.forEach(k=>{if(!ordinati.includes(k))ordinati.push(k)});
    db.settings.home={titolo:fd.get('titolo')||'',sottotitolo:fd.get('sottotitolo')||'',immagine:nuovaImg,
      stats:fd.getAll('stats'),tiles:ordinati,azione:fd.get('azione')||'',promemoria:!!fd.get('promemoria')};
    save();modal.close();go('home');toast('Schermata principale aggiornata');
  });
}

const views={home:()=>homeView(),social:()=>socialView(),artworks:()=>`${section('Archivio opere','<button class="btn primary" data-action="newArtwork">＋ Nuova opera</button>')}<details class="filterpanel"><summary>Filtri avanzati</summary><div class="filtergrid"><input id="artSearch" class="search" placeholder="Cerca in ogni campo…"><select id="artStatus"><option value="">Stato: tutti</option>${db.settings.lists.statuses.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artYear"><option value="">Anno: tutti</option>${[...new Set(db.artworks.map(a=>a.year).filter(Boolean))].sort().reverse().map(x=>`<option>${esc(x)}</option>`)}</select><select id="artTechnique"><option value="">Tecnica: tutte</option>${db.settings.lists.techniques.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artSupport"><option value="">Supporto: tutti</option>${db.settings.lists.supports.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artDimension"><option value="">Dimensione: tutte</option>${db.settings.lists.dimensions.map(x=>`<option>${esc(x)}</option>`)}</select><select id="artFrame"><option value="">Cornice: tutte</option>${db.settings.lists.frames.map(x=>`<option>${esc(x)}</option>`)}</select><input id="artCollection" placeholder="Serie / collezione"><input id="artLocation" placeholder="Posizione"><select id="artFavorite"><option value="">Preferiti: tutti</option><option value="yes">Solo preferiti</option></select><input id="artMinPrice" type="number" placeholder="Prezzo minimo"><input id="artMaxPrice" type="number" placeholder="Prezzo massimo"><button class="btn" data-action="resetArtworkFilters">Azzera filtri</button></div><div id="filterCount" class="meta"></div></details><div id="artGrid" class="grid">${db.artworks.map(artworkCard).join('')||empty('🎨','Non hai ancora inserito opere.','<button class="btn primary" data-action="newArtwork">Aggiungi la prima opera</button>')}</div>`,
library:()=>`${section('Biblioteca Pro','<button class="btn primary" data-action="newLibrary">＋ Carica file</button>')}<div class="toolbar"><input id="libSearch" class="search" placeholder="Cerca titolo, autore, tag, descrizione e note…"><select id="libType"><option value="">Tutti i file</option><option value="pdf">PDF</option><option value="doc">Documenti</option><option value="image">Immagini</option><option value="fav">Preferiti</option><option value="linked">Collegati alle opere</option></select><select id="libCat"><option value="">Tutte le categorie</option>${db.settings.lists.categories.map(x=>`<option>${esc(x)}</option>`)}</select></div><div id="libGrid" class="grid">${db.library.map(libCard).join('')||empty('📚','Carica PDF, DOCX, testi, immagini, cataloghi e schede tecniche.','<button class="btn primary" data-action="newLibrary">Carica il primo file</button>')}</div>`,
pdfstudio:()=>`${section('PDF Studio','<button class="btn primary" data-action="newPdfProject">＋ Nuovo PDF</button>')}<section class="hero"><h2>Documenti altamente personalizzabili</h2><p>Crea stampe dell'archivio, cataloghi di esposizioni e PDF filtrati. Scegli tema, copertina, campi, testi e opere; poi salva in PDF o condividi.</p></section><div class="template-row"><span class="badge">Archivio</span><span class="badge">Catalogo mostra</span><span class="badge">Portfolio</span><span class="badge">Listino</span><span class="badge">Dossier</span><span class="badge">Certificato</span></div><div class="grid">${db.pdfProjects.map(p=>`<article class="card"><div class="cardbody"><h3>${esc(p.title)}</h3><div class="meta">${esc(p.type)} · ${(p.artworkIds||[]).length} opere · ${esc(p.theme)}</div><p>${esc(p.subtitle||'')}</p><div class="row"><button class="btn primary" data-action="openPdfProject" data-id="${p.id}">Apri</button><button class="btn" data-action="editPdfProject" data-id="${p.id}">Modifica</button><button class="btn danger" data-action="deletePdfProject" data-id="${p.id}">Elimina</button></div></div></article>`).join('')||empty('📄','Crea il tuo primo catalogo, inventario o dossier.','<button class="btn primary" data-action="newPdfProject">Nuovo PDF</button>')}</div>`,
settings:()=>settingsView(),info:()=>infoView(),guide:()=>guideView(),contact:()=>contactView(),timeline:()=>timelineView(),workspace:()=>workspaceView(),exhibitions:()=>exhibitionsView(),clients:()=>clientsView(),sales:()=>salesView(),agenda:()=>agendaView(),certificates:()=>certificatesView(),certpreview:()=>certPreviewView(),pdfpreview:()=>pdfPreviewView()};

function fmtDate(v){if(!v)return '—';const d=new Date(v);return Number.isNaN(d.getTime())?esc(v):d.toLocaleDateString('it-IT')}
function optionList(arr,value=''){return arr.map(x=>`<option value="${esc(x.id)}" ${x.id===value?'selected':''}>${esc(x.title||x.name||x.company||'Senza nome')}</option>`).join('')}
function workspaceView(){const upcoming=[...db.agenda].filter(x=>x.date).sort((a,b)=>new Date(a.date)-new Date(b.date)).slice(0,5);const recentSales=[...db.sales].sort((a,b)=>new Date(b.date||0)-new Date(a.date||0)).slice(0,4);return `${section('Workspace','<button class="btn primary" data-action="newWorkspace">＋ Nuovo progetto</button>')}<section class="hero welcome"><div><small>CENTRO OPERATIVO</small><h2>Il tuo lavoro, in un solo posto</h2><p>Monitora progetti, mostre, clienti, vendite e prossime scadenze.</p></div><button class="btn" data-action="newAgenda">＋ Promemoria</button></section><div class="stats">${stat('Progetti',db.workspaces.length,'🧰')}${stat('Mostre',db.exhibitions.length,'🏛️')}${stat('Clienti',db.clients.length,'👥')}${stat('Vendite',db.sales.length,'💶')}</div><div class="dashboard-grid"><section class="card"><div class="cardbody"><div class="row spread"><h3>Progetti attivi</h3><button class="btn" data-action="newWorkspace">＋</button></div>${db.workspaces.map(w=>`<div class="record"><div><strong>${esc(w.title)}</strong><div class="meta">${esc(w.status||'In corso')} · ${(w.artworkIds||[]).length} opere · ${(w.documentIds||[]).length} documenti</div></div><div class="row"><button class="btn" data-action="editWorkspace" data-id="${w.id}">Apri</button><button class="btn danger" data-action="deleteWorkspace" data-id="${w.id}">×</button></div></div>`).join('')||'<p class="meta">Nessun progetto. Crea un workspace per riunire materiali e contatti.</p>'}</div></section><section class="card"><div class="cardbody"><h3>Prossime scadenze</h3>${upcoming.map(x=>`<div class="record"><span class="datebox">${fmtDate(x.date)}</span><div><strong>${esc(x.title)}</strong><div class="meta">${esc(x.type||'Evento')} ${x.time?'· '+esc(x.time):''}</div></div></div>`).join('')||'<p class="meta">Agenda libera.</p>'}<button class="btn" data-go="agenda">Apri agenda</button></div></section><section class="card"><div class="cardbody"><h3>Vendite recenti</h3>${recentSales.map(s=>{const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId);return`<div class="record"><div><strong>${esc(a?.title||'Opera')}</strong><div class="meta">${esc(c?.name||'Cliente non indicato')} · ${fmtDate(s.date)}</div></div><strong>${euro(s.total)}</strong></div>`}).join('')||'<p class="meta">Nessuna vendita registrata.</p>'}<button class="btn" data-go="sales">Apri vendite</button></div></section><section class="card"><div class="cardbody"><h3>Azioni rapide</h3><div class="quickgrid"><button class="btn" data-action="newExhibition">🏛️ Nuova mostra</button><button class="btn" data-action="newClient">👤 Nuovo cliente</button><button class="btn" data-action="newSale">💶 Registra vendita</button><button class="btn" data-action="newAgenda">📅 Nuovo evento</button></div></div></section></div>`}
function exhibitionsView(){return `${section('Mostre','<button class="btn primary" data-action="newExhibition">＋ Nuova mostra</button>')}<div class="toolbar"><input id="exSearch" class="search" placeholder="Cerca mostra, luogo, città, curatore…"></div><div id="exGrid" class="grid">${db.exhibitions.map(exhibitionCard).join('')||empty('🏛️','Non hai ancora inserito mostre.','<button class="btn primary" data-action="newExhibition">Crea la prima mostra</button>')}</div>`}
function exhibitionCard(x){return `<article class="card"><div class="cardbody"><div class="row spread"><h3>${esc(x.title||'Mostra senza titolo')}</h3><span class="badge">${esc(x.status||'In programma')}</span></div><p class="meta">${fmtDate(x.startDate)} – ${fmtDate(x.endDate)}<br>${esc([x.venue,x.city].filter(Boolean).join(', '))}</p><p>${esc(x.description||'')}</p><div class="meta">${(x.artworkIds||[]).length} opere · Curatore: ${esc(x.curator||'—')}</div><div class="row" style="margin-top:12px"><button class="btn primary" data-action="editExhibition" data-id="${x.id}">Apri</button><button class="btn" data-action="catalogFromExhibition" data-id="${x.id}">Catalogo PDF</button><button class="btn danger" data-action="deleteExhibition" data-id="${x.id}">Elimina</button></div></div></article>`}
function clientsView(){return `${section('Clienti','<button class="btn primary" data-action="newClient">＋ Nuovo cliente</button>')}<div class="toolbar"><input id="clientSearch" class="search" placeholder="Cerca nome, email, città, preferenze…"></div><div id="clientGrid" class="grid">${db.clients.map(clientCard).join('')||empty('👥','Nessun cliente registrato.','<button class="btn primary" data-action="newClient">Aggiungi il primo cliente</button>')}</div>`}
function clientCard(c){const purchases=db.sales.filter(s=>s.clientId===c.id);return `<article class="card"><div class="cardbody"><h3>${esc(c.name||'Cliente senza nome')}</h3><div class="meta">${esc(c.company||'')} ${c.city?'· '+esc(c.city):''}</div><p>${esc(c.email||'')} ${c.phone?'· '+esc(c.phone):''}</p><div><span class="badge">${purchases.length} acquisti</span><span class="badge">${euro(purchases.reduce((n,s)=>n+Number(s.total||0),0))}</span></div><p class="meta">Preferenze: ${esc(c.preferences||'—')}</p><div class="row"><button class="btn primary" data-action="editClient" data-id="${c.id}">Apri</button><button class="btn" data-action="newSaleForClient" data-id="${c.id}">＋ Vendita</button><button class="btn danger" data-action="deleteClient" data-id="${c.id}">Elimina</button></div></div></article>`}
function salesView(){const total=db.sales.reduce((n,s)=>n+Number(s.total||0),0),paid=db.sales.reduce((n,s)=>n+Number(s.paid||0),0);return `${section('Vendite','<button class="btn primary" data-action="newSale">＋ Registra vendita</button>')}<div class="stats">${stat('Operazioni',db.sales.length,'🧾')}${stat('Totale',euro(total),'💶')}${stat('Incassato',euro(paid),'✓')}${stat('Da incassare',euro(Math.max(0,total-paid)),'◷')}</div><div class="toolbar"><input id="saleSearch" class="search" placeholder="Cerca opera, cliente, pagamento…"></div><div id="saleGrid" class="grid">${db.sales.map(saleCard).join('')||empty('💶','Nessuna vendita registrata.','<button class="btn primary" data-action="newSale">Registra la prima vendita</button>')}</div>`}
function saleCard(s){const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId),due=Number(s.total||0)-Number(s.paid||0);return `<article class="card"><div class="cardbody"><div class="row spread"><h3>${esc(a?.title||'Opera non collegata')}</h3><span class="badge">${due<=0?'Saldato':'Da saldare'}</span></div><div class="meta">${esc(c?.name||'Cliente non indicato')} · ${fmtDate(s.date)}</div><p><strong>${euro(s.total)}</strong> · Incassato ${euro(s.paid)}</p><p class="meta">${esc(s.paymentMethod||'Metodo non indicato')} ${s.delivery?'· '+esc(s.delivery):''}</p><div class="row"><button class="btn primary" data-action="editSale" data-id="${s.id}">Apri</button><button class="btn" data-action="printReceipt" data-id="${s.id}">Ricevuta</button><button class="btn danger" data-action="deleteSale" data-id="${s.id}">Elimina</button></div></div></article>`}
function agendaView(){const sorted=[...db.agenda].sort((a,b)=>new Date(a.date)-new Date(b.date));return `${section('Agenda','<button class="btn primary" data-action="newAgenda">＋ Nuovo evento</button>')}<div class="toolbar"><input id="agendaSearch" class="search" placeholder="Cerca appuntamenti, consegne, mostre…"><select id="agendaType"><option value="">Tutti i tipi</option>${['Appuntamento','Mostra','Consegna','Scadenza','Promemoria','Altro'].map(x=>`<option>${x}</option>`).join('')}</select></div><div id="agendaList" class="agenda-list">${sorted.map(agendaCard).join('')||empty('📅','Nessun evento in agenda.','<button class="btn primary" data-action="newAgenda">Aggiungi un evento</button>')}</div><button class="btn" data-action="exportAgendaIcs" style="margin-top:16px">Esporta agenda .ics</button>`}
function agendaCard(x){return `<article class="agenda-item card"><div class="datebox"><strong>${new Date(x.date).getDate()||''}</strong><small>${x.date?new Date(x.date).toLocaleDateString('it-IT',{month:'short'}):'—'}</small></div><div class="cardbody"><div class="row spread"><h3>${esc(x.title)}</h3><span class="badge">${esc(x.type||'Evento')}</span></div><div class="meta">${fmtDate(x.date)} ${x.time?'· '+esc(x.time):''} ${x.location?'· '+esc(x.location):''}</div><p>${esc(x.notes||'')}</p><div class="row"><button class="btn" data-action="editAgenda" data-id="${x.id}">Modifica</button><button class="btn danger" data-action="deleteAgenda" data-id="${x.id}">Elimina</button></div></div></article>`}
function workspaceModal(w={}){const arts=db.artworks.map(a=>`<label><input type="checkbox" name="arts" value="${a.id}" ${w.artworkIds?.includes(a.id)?'checked':''}> ${esc(a.title)}</label>`).join(''),docs=db.library.map(d=>`<label><input type="checkbox" name="docs" value="${d.id}" ${w.documentIds?.includes(d.id)?'checked':''}> ${esc(d.title||d.name)}</label>`).join(''),clients=db.clients.map(c=>`<label><input type="checkbox" name="clients" value="${c.id}" ${w.clientIds?.includes(c.id)?'checked':''}> ${esc(c.name)}</label>`).join('');openModal(w.id?'Modifica workspace':'Nuovo workspace',`<div class="formgrid">${field('Titolo progetto','title',w.title,'text','full')}${field('Stato','status',w.status||'In corso')}${field('Scadenza','deadline',w.deadline,'date')}${area('Obiettivo / note','notes',w.notes)}<div class="field full"><label>Opere collegate</label><div class="linkbox">${arts||'Nessuna opera disponibile'}</div></div><div class="field full"><label>Documenti collegati</label><div class="linkbox">${docs||'Nessun documento disponibile'}</div></div><div class="field full"><label>Clienti collegati</label><div class="linkbox">${clients||'Nessun cliente disponibile'}</div></div></div>`,fd=>{const o={...w,id:w.id||uid(),title:fd.get('title'),status:fd.get('status'),deadline:fd.get('deadline'),notes:fd.get('notes'),artworkIds:fd.getAll('arts'),documentIds:fd.getAll('docs'),clientIds:fd.getAll('clients'),updated:new Date().toISOString(),created:w.created||new Date().toISOString()};if(w.id)db.workspaces=db.workspaces.map(x=>x.id===w.id?o:x);else db.workspaces.unshift(o);save();modal.close();render();toast('Workspace salvato')})}
function exhibitionModal(x={}){const arts=db.artworks.map(a=>`<label class="checkcard">${a.image?`<img src="${a.image}">`:''}<div><input type="checkbox" name="arts" value="${a.id}" ${x.artworkIds?.includes(a.id)?'checked':''}> ${esc(a.title)}</div></label>`).join('');openModal(x.id?'Modifica mostra':'Nuova mostra',`<div class="formgrid">${field('Titolo','title',x.title,'text','full')}${field('Data inizio','startDate',x.startDate,'date')}${field('Data fine','endDate',x.endDate,'date')}${field('Luogo / galleria','venue',x.venue)}${field('Città','city',x.city)}${field('Curatore','curator',x.curator)}${field('Stato','status',x.status||'In programma')}${area('Descrizione','description',x.description)}${area('Note organizzative','notes',x.notes)}<div class="field full"><label>Opere partecipanti</label><div class="checkgrid">${arts||'Inserisci prima delle opere.'}</div></div></div>`,fd=>{const o={...x,id:x.id||uid(),title:fd.get('title'),startDate:fd.get('startDate'),endDate:fd.get('endDate'),venue:fd.get('venue'),city:fd.get('city'),curator:fd.get('curator'),status:fd.get('status'),description:fd.get('description'),notes:fd.get('notes'),artworkIds:fd.getAll('arts'),updated:new Date().toISOString(),created:x.created||new Date().toISOString()};if(x.id)db.exhibitions=db.exhibitions.map(v=>v.id===x.id?o:v);else db.exhibitions.unshift(o);save();modal.close();render();toast('Mostra salvata')})}
function clientModal(c={}){openModal(c.id?'Modifica cliente':'Nuovo cliente',`<div class="formgrid">${field('Nome e cognome','name',c.name,'text','full')}${field('Azienda / galleria','company',c.company)}${field('Email','email',c.email,'email')}${field('Telefono','phone',c.phone)}${field('Città','city',c.city)}${field('Indirizzo','address',c.address,'text','full')}${area('Preferenze artistiche','preferences',c.preferences)}${area('Note private','notes',c.notes)}</div>`,fd=>{const o={...c,id:c.id||uid(),name:fd.get('name'),company:fd.get('company'),email:fd.get('email'),phone:fd.get('phone'),city:fd.get('city'),address:fd.get('address'),preferences:fd.get('preferences'),notes:fd.get('notes'),updated:new Date().toISOString(),created:c.created||new Date().toISOString()};if(c.id)db.clients=db.clients.map(x=>x.id===c.id?o:x);else db.clients.unshift(o);save();modal.close();render();toast('Cliente salvato')})}
function saleModal(s={}){openModal(s.id?'Modifica vendita':'Registra vendita',`<div class="formgrid"><div class="field"><label>Opera</label><select name="artworkId"><option value="">Seleziona opera</option>${optionList(db.artworks,s.artworkId)}</select></div><div class="field"><label>Cliente</label><select name="clientId"><option value="">Seleziona cliente</option>${optionList(db.clients,s.clientId)}</select></div>${field('Data','date',s.date||new Date().toISOString().slice(0,10),'date')}${field('Prezzo totale','total',s.total,'number')}${field('Importo incassato','paid',s.paid,'number')}${field('Metodo di pagamento','paymentMethod',s.paymentMethod||'Bonifico')}${field('Commissioni','commission',s.commission,'number')}${field('Consegna / spedizione','delivery',s.delivery,'text','full')}${area('Note','notes',s.notes)}</div>`,fd=>{const o={...s,id:s.id||uid(),artworkId:fd.get('artworkId'),clientId:fd.get('clientId'),date:fd.get('date'),total:fd.get('total'),paid:fd.get('paid'),paymentMethod:fd.get('paymentMethod'),commission:fd.get('commission'),delivery:fd.get('delivery'),notes:fd.get('notes'),updated:new Date().toISOString(),created:s.created||new Date().toISOString()};if(s.id)db.sales=db.sales.map(x=>x.id===s.id?o:x);else db.sales.unshift(o);const art=db.artworks.find(a=>a.id===o.artworkId);if(art&&Number(o.paid)>=Number(o.total)&&Number(o.total)>0)art.status='Venduto';save();modal.close();render();toast('Vendita salvata')})}
function agendaModal(x={}){openModal(x.id?'Modifica evento':'Nuovo evento',`<div class="formgrid">${field('Titolo','title',x.title,'text','full')}<div class="field"><label>Tipo</label><select name="type">${['Appuntamento','Mostra','Consegna','Scadenza','Promemoria','Altro'].map(v=>`<option ${x.type===v?'selected':''}>${v}</option>`).join('')}</select></div>${field('Data','date',x.date||new Date().toISOString().slice(0,10),'date')}${field('Ora','time',x.time,'time')}${field('Luogo','location',x.location)}${area('Note','notes',x.notes)}</div>`,fd=>{const o={...x,id:x.id||uid(),title:fd.get('title'),type:fd.get('type'),date:fd.get('date'),time:fd.get('time'),location:fd.get('location'),notes:fd.get('notes'),updated:new Date().toISOString(),created:x.created||new Date().toISOString()};if(x.id)db.agenda=db.agenda.map(v=>v.id===x.id?o:v);else db.agenda.unshift(o);save();modal.close();render();toast('Evento salvato')})}
function catalogFromExhibition(id){const x=db.exhibitions.find(v=>v.id===id);if(!x)return;const p={id:uid(),title:x.title||'Catalogo mostra',subtitle:[x.venue,x.city].filter(Boolean).join(' · '),type:'Catalogo esposizione',theme:'Museo',intro:x.description||'',fields:['year','technique','dimensions','description','status','code'],artworkIds:x.artworkIds||[],created:new Date().toISOString()};db.pdfProjects.unshift(p);save();previewId=p.id;route='pdfpreview';render();toast('Catalogo creato')}
function printReceipt(id){const s=db.sales.find(x=>x.id===id);if(!s)return;window.__PDFCTX__={tipo:'ricevuta',dato:s};docViewerOpen('Ricevuta vendita',receiptDocHtml(s),'',receiptPlain(s))}
function exportAgendaIcs(){
  const dt=x=>{const d=String(x.date||'').replaceAll('-','');const t=x.time?'T'+x.time.replace(':','')+'00':'';return d+t;};
  const esc2=t=>String(t||'').replace(/\\/g,'\\\\').replace(/[,;]/g,' ').replace(/\r?\n/g,'\\n');
  if(!db.agenda.length){toast('Agenda vuota');return}
  const body=db.agenda.map(x=>'BEGIN:VEVENT\r\nUID:'+x.id+'@mairgo.local\r\nDTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z\r\nDTSTART:'+dt(x)+'\r\nSUMMARY:'+esc2(x.title)+'\r\nLOCATION:'+esc2(x.location)+'\r\nDESCRIPTION:'+esc2(x.notes)+'\r\nEND:VEVENT').join('\r\n');
  const ics='BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//MAIR GO!//IT\r\nCALSCALE:GREGORIAN\r\n'+body+'\r\nEND:VCALENDAR';
  salvaFile('MAIR_GO_Agenda.ics',ics,'text/calendar');
}

function guideView(){return `${section('Guida offline')}
<section class="hero"><h2>&#128214; Come usare MAIR GO!</h2><p>Guida completa a tutte le funzioni. Consultabile senza connessione.</p></section>

<div class="guide-wrap">

<details class="guide-item" open><summary><strong>&#9888;&#65039; Backup: leggi prima di tutto il resto</strong></summary>
<p>MAIR GO! conserva i dati <strong>dentro il tuo dispositivo</strong>. Non c'&egrave; un server, non c'&egrave; un account: nessuno pu&ograve; leggere il tuo archivio, ma <strong>nessuno pu&ograve; nemmeno restituirtelo</strong> se lo perdi.</p>
<p><strong>Puoi perdere tutto se:</strong> disinstalli l'app, cancelli i dati dell'app dalle impostazioni di Android, il telefono si rompe o si perde, oppure cambi dispositivo.</p>
<p><strong>La soluzione:</strong> vai in <em>Impostazioni &rarr; Backup &rarr; Esporta ora</em>. L'app crea un file <strong>.mair</strong> che contiene <strong>tutto</strong>: opere con le immagini, documenti, certificati, cataloghi, clienti, vendite, agenda e impostazioni.</p>
<p>Quando premi Esporta si apre il pannello di condivisione di Android: da l&igrave; scegli dove mettere il file &mdash; Google Drive, email a te stesso, WhatsApp, oppure "Salva su file" per una cartella del telefono. <strong>Mandalo fuori dal dispositivo</strong>: un backup che resta solo nel telefono non ti salva se perdi il telefono.</p>
<p>Per ripristinare: <em>Impostazioni &rarr; Backup &rarr; Importa</em>, scegli il file .mair e tutto torna com'era, immagini comprese.</p>
<p>Nella schermata Backup un riquadro colorato ti avverte: <strong>verde</strong> se hai salvato di recente, <strong>giallo</strong> se sono passati 3 giorni o pi&ugrave;. Fai un backup ogni volta che aggiungi lavoro importante.</p>
</details>

<details class="guide-item"><summary><strong>&#128241; Installazione dell'app</strong></summary>
<p>MAIR GO! si installa come <strong>app Android</strong> tramite un file <strong>APK</strong>, non passando dal Play Store.</p>
<p><strong>Come si installa:</strong></p>
<ol>
<li>Ricevi o scarica il file <code>app-debug.apk</code> sul telefono.</li>
<li>Aprilo dalla cartella Download o dalla notifica di download.</li>
<li>Android avvisa che l'app proviene da "fonti sconosciute": &egrave; normale per le app non distribuite dallo Store. Concedi il permesso, viene chiesto una volta sola.</li>
<li>Conferma l'installazione. L'icona compare nella schermata Home.</li>
</ol>
<p><strong>Perch&eacute; compare quell'avviso:</strong> Android mostra un messaggio di cautela per ogni app che non arriva dal Play Store. Non indica un problema dell'app: segnala solo che Google non l'ha verificata, perch&eacute; non &egrave; stata pubblicata sul suo negozio.</p>
<p><strong>Aggiornamenti:</strong> per installare una versione nuova basta aprire il nuovo APK. Se Android rifiuta l'aggiornamento, disinstalla la versione precedente e reinstalla &mdash; <strong>ma fai prima un backup</strong>, perch&eacute; disinstallando i dati vengono cancellati.</p>
<p><strong>iPhone:</strong> gli APK non sono installabili su iOS. &Egrave; una limitazione di Apple, non aggirabile.</p>
</details>

<details class="guide-item"><summary><strong>&#127912; Opere</strong></summary>
<p>L'archivio centrale. Per ogni opera puoi registrare titolo, codice, anno, tecnica, supporto, dimensioni, cornice, stato, prezzo, descrizione e immagine.</p>
<p><strong>Filtri avanzati:</strong> il pannello sotto la barra di ricerca &egrave; chiuso all'apertura; toccalo per espanderlo e filtrare per anno, tecnica, stato o prezzo.</p>
<p><strong>Preferiti:</strong> la stellina segna le opere che vuoi ritrovare in fretta.</p>
<p>Le liste di tecniche, supporti, dimensioni, cornici e stati sono personalizzabili in <em>Impostazioni &rarr; Liste</em>.</p>
</details>

<details class="guide-item"><summary><strong>&#128218; Biblioteca</strong></summary>
<p>Archivio documentale per PDF, DOCX, immagini, testi e appunti: cataloghi, schede tecniche, contratti, articoli, materiale di ispirazione.</p>
<p>Ogni voce ha una categoria (personalizzabile) e pu&ograve; essere aperta direttamente nell'app.</p>
</details>

<details class="guide-item"><summary><strong>&#128196; PDF Studio</strong></summary>
<p>Crea cataloghi e dossier partendo dalle opere in archivio. Scegli titolo, sottotitolo, introduzione, quali opere includere e quali dati mostrare per ciascuna.</p>
<p>Aprendo il progetto e toccando <strong>Apri documento</strong> vedi l'anteprima, poi:</p>
<ul>
<li><strong>Salva PDF</strong> &mdash; genera il file e apre il pannello per scegliere dove metterlo.</li>
<li><strong>Condividi PDF</strong> &mdash; genera e invia direttamente.</li>
<li><strong>Impagina</strong> &mdash; apre le opzioni di impaginazione.</li>
<li><strong>Testo</strong> &mdash; versione testuale modificabile e copiabile.</li>
</ul>
<p><strong>Come esce il catalogo:</strong> copertina, introduzione, indice delle opere, poi <strong>una opera per pagina</strong> con immagine grande e scheda dati, e pagina finale con biografia e contatti. I numeri di pagina sono in basso.</p>
</details>

<details class="guide-item"><summary><strong>&#9881;&#65039; Impaginazione PDF personalizzabile</strong></summary>
<p>Da <em>Impostazioni &rarr; Impaginazione PDF</em> (o dal pulsante Impagina) controlli:</p>
<ul>
<li><strong>Formato</strong>: A4, A5, Letter, A3, verticale o orizzontale.</li>
<li><strong>Margini</strong>: alto, basso, sinistro e destro in millimetri.</li>
<li><strong>Carattere</strong>: Times, Helvetica o Courier.</li>
<li><strong>Colore accento</strong>, corpo del testo e dimensione dei titoli.</li>
<li><strong>Immagini</strong>: altezza massima in percentuale e posizione.</li>
<li><strong>Sezioni</strong>: copertina, introduzione, indice, pagina finale, numeri, intestazione opera, riempimento pagina.</li>
</ul>
<p>Le impostazioni valgono per tutti i documenti generati e restano salvate.</p>
</details>

<details class="guide-item"><summary><strong>&#10022; Certificati</strong></summary>
<p>Cinque modelli pronti e personalizzabili: <strong>Autenticit&agrave;</strong>, <strong>Vendita/Cessione</strong>, <strong>Provenienza</strong>, <strong>Attestato di Esposizione</strong>, <strong>Donazione</strong>.</p>
<p>Scegli il modello, colleghi l'opera dall'archivio (immagine e dati tecnici vengono importati da soli), decidi quali campi mostrare e modifichi liberamente il testo.</p>
<p>Cinque temi grafici disponibili: Classico oro, Museo, Nero galleria, Editoriale, Minimal. La firma pu&ograve; essere testuale o un'immagine caricata.</p>
</details>

<details class="guide-item"><summary><strong>&#128241; Zona Social</strong></summary>
<p>Trasforma le opere in materiale pronto per Instagram, Facebook e TikTok.</p>
<p><strong>Immagine singola:</strong> genera una card curata con cornice dorata, titolo, dati tecnici e la tua firma. Quattro formati (quadrato, verticale 4:5, storia 9:16, orizzontale) e quattro stili grafici.</p>
<p><strong>Sequenza immagini:</strong> fino a 5 opere numerate, ideali per un carosello.</p>
<p><strong>Video:</strong> monta fino a 5 opere in un filmato con titolo iniziale, transizioni miste (dissolvenza, scorrimento, zoom lento), dati di ogni opera e chiusura con i tuoi contatti. Durata regolabile da 3 a 5 secondi per opera.</p>
<p>La creazione del video avviene in tempo reale: per 5 opere servono circa 25 secondi, durante i quali <strong>lo schermo deve restare acceso</strong> e non bisogna uscire dall'app.</p>
<p>Il pulsante <strong>Testo per il post</strong> prepara didascalia e hashtag gi&agrave; pronti da copiare.</p>
</details>

<details class="guide-item"><summary><strong>&#128197; Agenda e promemoria</strong></summary>
<p>Appuntamenti, mostre, consegne, scadenze e promemoria con data, ora e luogo.</p>
<p>Nella schermata principale il riquadro <strong>Da fare</strong> raccoglie automaticamente ci&ograve; che &egrave; <strong>in ritardo</strong>, <strong>oggi</strong>, <strong>domani</strong> e nei <strong>prossimi giorni</strong>. Diventa dorato quando ci sono impegni urgenti. Si pu&ograve; nascondere da Personalizza.</p>
<p><strong>Esporta agenda .ics</strong> crea un file importabile in Google Calendar, Apple Calendario o Outlook.</p>
</details>

<details class="guide-item"><summary><strong>&#127963;&#65039; Mostre, Clienti, Vendite, Workspace</strong></summary>
<p><strong>Mostre:</strong> esposizioni con sede, date e opere collegate. Da una mostra puoi generare direttamente un catalogo.</p>
<p><strong>Clienti:</strong> rubrica di collezionisti e galleristi, con storico delle vendite.</p>
<p><strong>Vendite:</strong> trattative e incassi, con generazione della ricevuta.</p>
<p><strong>Workspace:</strong> progetti che raccolgono insieme opere, documenti e contatti.</p>
</details>

<details class="guide-item"><summary><strong>&#127968; Personalizzare la schermata principale</strong></summary>
<p>Il pulsante <strong>Personalizza</strong> nella Home permette di scegliere:</p>
<ul>
<li>Titolo e frase di benvenuto personali.</li>
<li>Immagine di sfondo per l'intestazione.</li>
<li>Pulsante rapido principale.</li>
<li>Quali statistiche mostrare (dieci disponibili, incluso l'incassato totale).</li>
<li>Quali sezioni mostrare e in che ordine: la prima diventa il riquadro grande.</li>
<li>Se mostrare il riquadro "Da fare".</li>
</ul>
</details>

<details class="guide-item"><summary><strong>&#128274; Sicurezza e aspetto</strong></summary>
<p><strong>PIN:</strong> da 4 a 6 cifre, richiesto all'avvio. Protegge l'accesso all'app, ma non cifra i file: per dati delicati usa anche il blocco schermo del telefono.</p>
<p><strong>Aspetto:</strong> tema, dimensione dei caratteri, animazioni e schermata iniziale sono regolabili in Impostazioni.</p>
</details>

<details class="guide-item"><summary><strong>&#128736; Se qualcosa non funziona</strong></summary>
<p>In <em>Impostazioni &rarr; Diagnostica</em> trovi il registro degli errori dell'app.</p>
<p>Aprilo, tocca <strong>Copia tutto</strong> e invia il testo tramite la sezione Contatti: contiene le informazioni tecniche utili a individuare il problema.</p>
</details>

</div>`}

function contactView(){return `${section('Contatti e segnalazioni')}
<section class="hero"><h2>&#9993;&#65039; Scrivi all'autore</h2><p>Segnalazioni, malfunzionamenti, suggerimenti o richieste.</p></section>
<div class="formgrid">
${field('Il tuo nome','contactName','','text','full')}
${field('La tua email','contactEmail','','email','full')}
<div class="field full"><label>Categoria</label><select id="contactCategory">
<option>Malfunzionamento</option><option>Suggerimento</option><option>Domanda sull'uso</option><option>Collaborazione</option><option>Altro</option>
</select></div>
${field('Oggetto','contactSubject','','text','full')}
${area('Messaggio','contactMessage','')}
<div class="row full"><button class="btn primary" data-action="prepareEmail">&#9993;&#65039; Prepara email</button><button class="btn" data-action="copyContactEmail">Copia indirizzo</button></div>
<p class="meta full">Il pulsante apre la tua app di posta con il messaggio gi&agrave; compilato. Per i malfunzionamenti, allega il testo copiato dalla Diagnostica.</p>
</div>`}

function infoView(){return `${section('Informazioni')}<section class="legal-card"><div class="about-logo">M</div><h2>MAIR GO!</h2>
<p class="lead"><strong>Art Management System creato dall'artista internazionale Maurizio D'Andrea.</strong></p>
<p>Applicazione gratuita per gestire opere, documenti, cataloghi, certificati, mostre, clienti, vendite e agenda. Distribuita senza servizio di assistenza garantito.</p>

<h3>&#128274; La tua privacy, in concreto</h3>
<p><strong>I tuoi dati non escono dal tuo dispositivo.</strong> Non c'&egrave; un server che li riceve, non c'&egrave; un cloud che li conserva, non esiste un archivio centrale. Tutto quello che scrivi e carichi resta fisicamente nel telefono o nel computer che stai usando.</p>
<p>Questo significa che <strong>nessuno pu&ograve; leggere il tuo archivio</strong>: n&eacute; l'autore dell'app, n&eacute; terze parti, n&eacute; societ&agrave; pubblicitarie. Non perch&eacute; ci sia una promessa di non guardare, ma perch&eacute; <strong>tecnicamente non esiste il luogo dove guardare</strong>.</p>

<h3>&#9881;&#65039; Come funziona davvero</h3>
<p>L'app salva i dati in due depositi interni al dispositivo:</p>
<ul>
<li><strong>Archivio principale</strong>: contiene opere, immagini, documenti, certificati, clienti e vendite. Regge anche file pesanti come le foto delle opere.</li>
<li><strong>Copia di servizio</strong>: un secondo deposito pi&ugrave; piccolo, usato come riserva quando i dati sono contenuti.</li>
</ul>
<p>Il salvataggio &egrave; automatico: avviene a ogni modifica e anche quando chiudi l'app o la mandi in secondo piano.</p>

<h3>&#128241; Cosa l'app NON fa</h3>
<ul>
<li>Non richiede registrazione n&eacute; crea account.</li>
<li>Non chiede email, password o numero di telefono per funzionare.</li>
<li>Non mostra pubblicit&agrave; e non profila l'utente.</li>
<li>Non accede da sola a rubrica, chiamate, SMS, microfono, fotocamera, posizione GPS.</li>
<li>Non invia statistiche d'uso n&eacute; segnalazioni automatiche.</li>
</ul>
<p>L'accesso a file e immagini avviene <strong>soltanto</strong> quando sei tu a selezionarli. Condivisioni, invio di email e apertura di siti partono unicamente da un tuo comando esplicito.</p>

<h3>&#127760; Quando qualcosa esce dal dispositivo</h3>
<p>Succede solo su tua richiesta, e sempre con un tocco tuo: quando salvi un PDF, esporti un backup, generi un'immagine o un video per i social, o usi il pulsante di condivisione. In quel momento &egrave; il sistema del telefono a gestire il file, e sei tu a scegliere dove mandarlo.</p>

<h3>&#128273; Il PIN</h3>
<p>Il PIN impedisce di aprire l'app a chi prende in mano il tuo dispositivo. &Egrave; una <strong>protezione di accesso, non una cifratura</strong>: non rende illeggibili i file sottostanti. Per dati molto sensibili, affiancalo al blocco schermo del telefono.</p>

<h3>&#9888;&#65039; Il rovescio della medaglia</h3>
<p>Il fatto che i dati siano solo tuoi ha un prezzo: <strong>se il dispositivo si perde, si rompe o viene ripulito, non esiste nessuno da cui recuperarli</strong>. Non c'&egrave; un "recupero password", perch&eacute; non c'&egrave; un account. Per questo il backup non &egrave; un optional: &egrave; l'unica rete di sicurezza. Trovi la spiegazione completa nella Guida.</p>

<h3>&#9878;&#65039; Responsabilit&agrave;</h3>
<p>L'utilizzo avviene sotto la piena responsabilit&agrave; dell'utente. L'autore non garantisce continuit&agrave; del servizio, compatibilit&agrave; con ogni dispositivo o recupero dei dati, e non risponde di perdite o danni derivanti dall'uso dell'app, nei limiti consentiti dalla legge applicabile.</p>

<h3>&#9993;&#65039; Contatti</h3>
<p><a href="mailto:dandreart.info@gmail.com">dandreart.info@gmail.com</a><br><a href="https://www.dandreart.info" target="_blank" rel="noopener">www.dandreart.info</a></p>
<p class="meta">MAIR GO! 7.3 &middot; Software gratuito &middot; Dati sul dispositivo &middot; Nessun account &middot; Nessuna pubblicit&agrave;</p></section>`}

function settingsView(){const L=db.settings.lists;return `${section('Impostazioni')}<div class="settings-tabs"><a href="#appearance">Aspetto</a><a href="#security">Sicurezza</a><a href="#profile">Profilo</a><a href="#lists">Liste</a><a href="#backup">Backup</a></div><div class="formgrid"><div class="card" id="appearance"><div class="cardbody"><h3>🎨 Aspetto</h3><div class="field"><label>Tema dell'app</label><select id="themeSetting">${themeOptions.map(([v,l])=>`<option value="${v}" ${db.settings.theme===v?'selected':''}>${l}</option>`).join('')}</select></div><div class="field"><label>Dimensione caratteri</label><select id="fontSetting"><option value="small" ${db.settings.fontSize==='small'?'selected':''}>Piccola</option><option value="medium" ${db.settings.fontSize==='medium'?'selected':''}>Media</option><option value="large" ${db.settings.fontSize==='large'?'selected':''}>Grande</option></select></div><label class="switchrow"><input id="animationsSetting" type="checkbox" ${db.settings.animations!==false?'checked':''}> Animazioni</label><label class="switchrow"><input id="splashSetting" type="checkbox" ${db.settings.splash!==false?'checked':''}> Mostra splash all'avvio</label><button class="btn primary" data-action="saveAppearance">Salva aspetto</button></div></div><div class="card" id="security"><div class="cardbody"><h3>🔒 Sicurezza</h3><label class="switchrow"><input id="pinEnabled" type="checkbox" ${db.settings.pinEnabled?'checked':''}> Richiedi PIN all'avvio</label><div class="field"><label>Nuovo PIN (4–6 cifre)</label><input id="newPin" type="password" inputmode="numeric" maxlength="6" placeholder="Lascia vuoto per non cambiarlo"></div><div class="field"><label>Conferma PIN</label><input id="confirmPin" type="password" inputmode="numeric" maxlength="6"></div><button class="btn primary" data-action="savePin">Salva sicurezza</button><p class="meta">Il PIN è una protezione locale di accesso, non una cifratura dei file.</p></div></div><div class="card" id="profile"><div class="cardbody"><h3>👤 Profilo artista</h3>${field('Nome artista / atelier','artist',db.settings.artist)}${area('Biografia','bio',db.settings.bio,'')}${field('Email','email',db.settings.email,'email')}${field('Telefono','phone',db.settings.phone)}<button class="btn primary" data-action="saveProfile">Salva profilo</button></div></div><div class="card"><div class="cardbody"><h3>📄 Impaginazione PDF</h3><p class="meta">Formato, margini, caratteri, colori, immagini e sezioni dei documenti generati.</p><button class="btn" data-action="pdfSettings">Configura impaginazione</button></div></div><div class="card"><div class="cardbody"><h3>🛠 Diagnostica</h3><p class="meta">Se qualcosa non funziona, apri il registro errori e invia il testo allo sviluppatore.</p><button class="btn" data-action="openDiag">Apri diagnostica</button></div></div><div class="card" id="backup"><div class="cardbody"><h3>⬇️ Backup</h3>${backupBanner()}<p>Il file <strong>.mair</strong> contiene <strong>tutto</strong>: opere con le immagini, documenti, certificati, cataloghi, clienti, vendite, agenda e impostazioni.</p><p>Premendo Esporta si apre il pannello di condivisione: scegli dove mettere il file — Google Drive, email a te stesso, WhatsApp o una cartella del telefono. <strong>Mandalo fuori dal dispositivo</strong>: se il telefono si perde o si rompe, un backup rimasto solo lì non ti aiuta. Senza backup i dati non sono recuperabili da nessuno.</p><div class="row"><button class="btn primary" data-action="exportBackup">💾 Esporta ora</button><button class="btn" data-action="importBackup">Importa</button></div><p class="meta">Ultimo backup: ${db.settings.lastBackup?new Date(db.settings.lastBackup).toLocaleString('it-IT'):'mai'}</p></div></div></div><h2 id="lists" style="margin-top:28px">Liste personalizzabili</h2><div class="grid">${Object.entries({techniques:'Tecniche',supports:'Supporti',dimensions:'Dimensioni',frames:'Cornici',statuses:'Stati',categories:'Categorie Biblioteca'}).map(([k,t])=>`<article class="card"><div class="cardbody"><h3>${t}</h3><div class="list-manager">${L[k].map((v,i)=>`<div class="list-row"><input value="${esc(v)}" data-list-key="${k}" data-list-i="${i}"><button class="btn danger" data-action="removeListItem" data-id="${k}:${i}">×</button></div>`).join('')}<button class="btn" data-action="addListItem" data-id="${k}">＋ Aggiungi voce</button><button class="btn primary" data-action="saveLists">Salva modifiche</button></div></div></article>`).join('')}</div>`}
function openModal(title,html,onSave,saveLabel='Salva'){ $('#modalTitle').textContent=title;$('#modalBody').innerHTML=html;$('#modalSave').textContent=saveLabel;modal.showModal();document.querySelectorAll('[data-add-list]').forEach(b=>b.onclick=()=>{const key={technique:'techniques',support:'supports',dimensions:'dimensions',frame:'frames',status:'statuses',category:'categories'}[b.dataset.addList];const v=prompt('Nuova voce');if(v){db.settings.lists[key].push(v);save();const s=b.previousElementSibling;s.insertAdjacentHTML('beforeend',`<option selected>${esc(v)}</option>`)}});$('#modalSave').onclick=e=>{e.preventDefault();onSave(new FormData($('#modalForm')))}}
async function fileData(file){return new Promise((res,rej)=>{const r=new FileReader;r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(file)})}async function fileText(file){try{return await file.text()}catch{return ''}}
function artworkModal(a={}){openModal(a.id?'Modifica opera':'Nuova opera',`<div class="formgrid">${field('Titolo','title',a.title,'text','full')}${field('Anno','year',a.year)}${field('Codice opera','code',a.code||('MG-'+String(db.artworks.length+1).padStart(4,'0')))}${selectField('Tecnica','technique',db.settings.lists.techniques,a.technique)}${selectField('Supporto','support',db.settings.lists.supports,a.support)}${selectField('Dimensioni','dimensions',db.settings.lists.dimensions,a.dimensions)}${selectField('Cornice','frame',db.settings.lists.frames,a.frame)}${selectField('Stato','status',db.settings.lists.statuses,a.status||'Disponibile')}${field('Prezzo (€)','price',a.price,'number')}${field('Serie / collezione','collection',a.collection)}${field('Posizione attuale','location',a.location)}${area('Descrizione','description',a.description)}${area('Note private','notes',a.notes)}<div class="field full"><label>Immagine principale</label><input name="imageFile" type="file" accept="image/*"></div></div>`,async fd=>{const file=fd.get('imageFile');const obj={...a,id:a.id||uid(),title:fd.get('title'),year:fd.get('year'),code:fd.get('code'),technique:fd.get('technique'),support:fd.get('support'),dimensions:fd.get('dimensions'),frame:fd.get('frame'),status:fd.get('status'),price:fd.get('price'),collection:fd.get('collection'),location:fd.get('location'),description:fd.get('description'),notes:fd.get('notes'),image:file?.size?await fileData(file):a.image||'',updated:new Date().toISOString(),created:a.created||new Date().toISOString()};if(a.id)db.artworks=db.artworks.map(x=>x.id===a.id?obj:x);else db.artworks.unshift(obj);save();modal.close();render();toast('Opera salvata')})}
function libraryModal(d={}){const arts=db.artworks.map(a=>`<option value="${a.id}" ${d.artworkId===a.id?'selected':''}>${esc(a.title)}</option>`).join('');openModal(d.id?'Modifica documento':'Carica nella Biblioteca',`<div class="formgrid">${!d.id?`<div class="field full"><label>File locale</label><input name="file" type="file" accept=".pdf,.docx,.doc,.txt,image/*" required></div>`:''}${field('Titolo','title',d.title,'text','full')}${field('Autore','author',d.author)}${selectField('Categoria','category',db.settings.lists.categories,d.category||'Catalogo')}${field('Tag separati da virgola','tags',(d.tags||[]).join(', '),'text','full')}${area('Descrizione','description',d.description)}<div class="field full"><label>Opera collegata</label><select name="artworkId"><option value="">Nessuna</option>${arts}</select></div>${area('Appunti di studio','notes',d.notes)}</div>`,async fd=>{let obj={...d,id:d.id||uid(),title:fd.get('title'),author:fd.get('author'),category:fd.get('category'),tags:String(fd.get('tags')||'').split(',').map(x=>x.trim()).filter(Boolean),description:fd.get('description'),artworkId:fd.get('artworkId'),notes:fd.get('notes'),date:d.date||new Date().toISOString()};if(!d.id){const f=fd.get('file');if(!f?.size)return alert('Seleziona un file');obj.name=f.name;obj.mime=f.type||mimeFromName(f.name);obj.data=await fileData(f);if(obj.mime.startsWith('text/')||/\.txt$/i.test(f.name))obj.text=await fileText(f);if(!obj.title)obj.title=f.name.replace(/\.[^.]+$/,'')}if(d.id)db.library=db.library.map(x=>x.id===d.id?obj:x);else db.library.unshift(obj);save();modal.close();render();toast('Documento salvato')})}function mimeFromName(n){if(/\.pdf$/i.test(n))return'application/pdf';if(/\.docx?$/i.test(n))return'application/vnd.openxmlformats-officedocument.wordprocessingml.document';if(/\.(png|jpe?g|webp|gif)$/i.test(n))return'image/*';return'text/plain'}
function openLibrary(id){const d=db.library.find(x=>x.id===id);if(!d)return;currentViewer=d;$('#viewerTitle').textContent=d.title;const type=d.mime||'';let content;if(type.includes('pdf'))content=`<embed src="${d.data}" type="application/pdf">`;else if(type.startsWith('image'))content=`<img src="${d.data}" alt="${esc(d.title)}">`;else if(type.startsWith('text')||d.text)content=`<pre>${esc(d.text||'Anteprima testuale non disponibile. Usa “Scarica” per aprire il documento originale.')}</pre>`;else content=`<pre>Anteprima DOCX: il file resta completamente locale. Alcuni browser non mostrano DOCX direttamente; usa “Scarica” per aprirlo nell’app Word/LibreOffice del dispositivo.\n\nTitolo: ${esc(d.title)}\nAutore: ${esc(d.author)}\nDescrizione: ${esc(d.description)}</pre>`;$('#viewerBody').innerHTML=`<div class="viewer-layout"><div class="viewer-main">${content}</div><aside class="study"><h3>Appunti di studio</h3><textarea id="studyNotes" placeholder="Annota idee senza uscire dal documento…">${esc(d.notes||'')}</textarea><button class="btn primary" id="saveStudy">Salva appunti</button><hr><p class="meta">Categoria: ${esc(d.category)}<br>Tag: ${esc((d.tags||[]).join(', '))}<br>${d.artworkId?'Collegato a: '+esc(db.artworks.find(a=>a.id===d.artworkId)?.title||'Opera'):''}</p></aside></div>`;$('#saveStudy').onclick=()=>{d.notes=$('#studyNotes').value;save();toast('Appunti salvati')};$('#viewerDownload').onclick=()=>download(dataURLtoBlob(d.data),d.name||d.title);viewer.showModal()}
function dataURLtoBlob(u){const [h,b]=u.split(','),m=(h.match(/:(.*?);/)||[])[1]||'application/octet-stream',bin=atob(b),a=new Uint8Array(bin.length);for(let i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return new Blob([a],{type:m})}
function pdfProjectModal(p={}){const checks=db.artworks.map(a=>`<label class="checkcard">${a.image?`<img src="${a.image}">`:''}<div class="row spread"><strong>${esc(a.title||'Senza titolo')}</strong><input type="checkbox" name="arts" value="${a.id}" ${p.artworkIds?.includes(a.id)?'checked':''}></div></label>`).join('');openModal(p.id?'Modifica progetto PDF':'Nuovo progetto PDF',`<div class="formgrid">${field('Titolo','title',p.title||'Catalogo opere','text','full')}${field('Sottotitolo','subtitle',p.subtitle||db.settings.artist,'text','full')}<div class="field"><label>Tipo</label><select name="type">${['Stampa archivio','Catalogo esposizione','Archivio filtrato','Portfolio','Listino prezzi','Dossier galleria'].map(x=>`<option ${p.type===x?'selected':''}>${x}</option>`)}</select></div><div class="field"><label>Tema</label><select name="theme">${['Minimal','Museo','Black Gallery','Editoriale','Atelier','Black & Gold','Ocean','Forest'].map(x=>`<option ${p.theme===x?'selected':''}>${x}</option>`)}</select></div>${area('Testo introduttivo','intro',p.intro)}<div class="field full"><label>Campi visibili</label><div class="row" style="flex-wrap:wrap">${['year:Anno','technique:Tecnica','dimensions:Dimensioni','description:Descrizione','price:Prezzo','status:Stato','frame:Cornice','code:Codice'].map(x=>{const[k,l]=x.split(':');return`<label><input type="checkbox" name="fields" value="${k}" ${!p.fields||p.fields.includes(k)?'checked':''}> ${l}</label>`}).join('')}</div></div><div class="field full"><label>Opere</label><div class="checkgrid">${checks||'<p>Inserisci prima almeno un’opera.</p>'}</div></div></div>`,fd=>{const obj={...p,id:p.id||uid(),title:fd.get('title'),subtitle:fd.get('subtitle'),type:fd.get('type'),theme:fd.get('theme'),intro:fd.get('intro'),fields:fd.getAll('fields'),artworkIds:fd.getAll('arts'),created:p.created||new Date().toISOString()};if(p.id)db.pdfProjects=db.pdfProjects.map(x=>x.id===p.id?obj:x);else db.pdfProjects.unshift(obj);save();modal.close();render();toast('Progetto PDF salvato')})}
/* ===================== CERTIFICATI ===================== */
const CERT_TEMPLATES={
  autenticita:{label:'Certificato di Autenticità',icon:'✦',
    title:"Certificato di Autenticità",
    fields:['code','year','technique','support','dimensions','frame','edition','signature'],
    body:"Con il presente documento l'artista dichiara che l'opera qui descritta è autentica, originale e realizzata di propria mano. Il certificato è parte integrante dell'opera e ne attesta la piena autenticità."},
  vendita:{label:'Certificato di Vendita / Cessione',icon:'🧾',
    title:"Certificato di Vendita",
    fields:['code','year','technique','dimensions','price','buyer','place','signature'],
    body:"Si attesta che l'opera qui descritta è stata ceduta e venduta all'acquirente indicato. Con l'acquisto si trasferisce la proprietà dell'opera, restando all'artista i diritti morali e d'autore secondo la legge vigente."},
  provenienza:{label:'Certificato di Provenienza',icon:'📜',
    title:"Certificato di Provenienza",
    fields:['code','year','technique','dimensions','collection','provenance','signature'],
    body:"Il presente documento attesta la provenienza e la storia dell'opera qui descritta, garantendone la tracciabilità e l'appartenenza dichiarata."},
  esposizione:{label:'Attestato di Esposizione',icon:'🏛️',
    title:"Attestato di Esposizione",
    fields:['code','year','technique','dimensions','exhibition','place','date','signature'],
    body:"Si attesta che l'opera qui descritta è stata esposta nell'ambito dell'esposizione indicata, come parte del percorso espositivo e curatoriale dell'artista."},
  donazione:{label:'Certificato di Donazione',icon:'🎁',
    title:"Certificato di Donazione",
    fields:['code','year','technique','dimensions','donee','place','date','signature'],
    body:"Con il presente atto l'artista dichiara di donare l'opera qui descritta al beneficiario indicato, a titolo gratuito, trasferendone la proprietà."}
};
const CERT_FIELD_LABELS={code:'Codice opera',year:'Anno',technique:'Tecnica',support:'Supporto',dimensions:'Dimensioni',frame:'Cornice',edition:'Edizione / Tiratura',price:'Prezzo / Valore',buyer:'Acquirente',donee:'Beneficiario',collection:'Collezione',provenance:'Provenienza',exhibition:'Esposizione',place:'Luogo',date:'Data',signature:'Firma dell\'artista'};
const CERT_THEMES=[['classic','Classico oro'],['museum','Museo chiaro'],['dark','Nero galleria'],['editorial','Editoriale'],['minimal','Minimal']];

function certificatesView(){
  return `${section('Certificati','<button class="btn primary" data-action="newCertificate">＋ Nuovo certificato</button>')}
  <section class="hero"><h2>✦ Certificati personalizzabili</h2><p>Scegli il modello, seleziona il quadro dall'archivio, personalizza campi, testo, tema e firma. Poi stampa o salva in PDF. Tutto resta locale.</p></section>
  <div class="template-row">${Object.values(CERT_TEMPLATES).map(t=>`<span class="badge">${t.icon} ${esc(t.label)}</span>`).join('')}</div>
  <div class="grid">${db.certificates.map(certCard).join('')||empty('✦','Nessun certificato creato.','<button class="btn primary" data-action="newCertificate">Crea il primo certificato</button>')}</div>`;
}
function certCard(c){const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;const a=db.artworks.find(x=>x.id===c.artworkId);return `<article class="card"><div class="cardbody"><div class="row spread"><h3>${esc(c.title||tpl.title)}</h3><span class="badge">${tpl.icon}</span></div><div class="meta">${esc(tpl.label)}${a?' · '+esc(a.title):''}${c.certNumber?' · N. '+esc(c.certNumber):''}</div><p class="meta">${esc(c.place||'')} ${c.date?'· '+fmtDate(c.date):''}</p><div class="row" style="margin-top:12px"><button class="btn primary" data-action="openCertificate" data-id="${c.id}">Apri</button><button class="btn" data-action="editCertificate" data-id="${c.id}">Modifica</button><button class="btn danger" data-action="deleteCertificate" data-id="${c.id}">Elimina</button></div></div></article>`;}

function certificateModal(c={}){
  const isNew=!c.id;
  const tplKey=c.template||'autenticita';
  const arts=db.artworks.map(a=>`<option value="${a.id}" ${c.artworkId===a.id?'selected':''}>${esc(a.title||'Senza titolo')}</option>`).join('');
  const extraFieldsHtml=fld=>fld.filter(k=>!['signature'].includes(k)).map(k=>{
    const v=(c.values&&c.values[k])||'';
    return `<label><input type="checkbox" name="fields" value="${k}" ${(!c.fields||c.fields.includes(k))?'checked':''}> ${esc(CERT_FIELD_LABELS[k]||k)}</label>`;
  }).join('');
  openModal(isNew?'Nuovo certificato':'Modifica certificato',`<div class="formgrid">
    <div class="field full"><label>Modello di certificato</label><select name="template">${Object.entries(CERT_TEMPLATES).map(([k,t])=>`<option value="${k}" ${tplKey===k?'selected':''}>${t.icon} ${esc(t.label)}</option>`).join('')}</select></div>
    <div class="field full"><label>Quadro / opera (dall'archivio)</label><select name="artworkId"><option value="">— Nessuna opera / compilazione manuale —</option>${arts}</select></div>
    ${field('Titolo del certificato','title',c.title,'text','full')}
    ${field('Numero certificato','certNumber',c.certNumber||('CERT-'+String(db.certificates.length+1).padStart(4,'0')))}
    ${field('Luogo','place',c.place)}
    ${field('Data','date',c.date||new Date().toISOString().slice(0,10),'date')}
    ${field('Nome artista','artist',c.artist||db.settings.artist,'text','full')}
    ${area('Testo del certificato','body',c.body||CERT_TEMPLATES[tplKey].body)}
    ${field('Acquirente / Beneficiario','buyer',c.buyer)}
    ${field('Provenienza / Collezione','provenance',c.provenance)}
    ${field('Esposizione','exhibition',c.exhibition)}
    ${field('Edizione / Tiratura','edition',c.edition)}
    ${field('Valore / Prezzo (€)','price',c.price,'number')}
    <div class="field"><label>Tema grafico</label><select name="theme">${CERT_THEMES.map(([v,l])=>`<option value="${v}" ${c.theme===v?'selected':''}>${l}</option>`).join('')}</select></div>
    <div class="field"><label>Firma</label><select name="sigMode"><option value="text" ${c.sigMode!=='image'?'selected':''}>Firma testuale (nome)</option><option value="image" ${c.sigMode==='image'?'selected':''}>Immagine firma</option></select></div>
    <div class="field full"><label>Immagine firma (facoltativa, PNG con sfondo trasparente)</label><input name="sigFile" type="file" accept="image/*"></div>
    <div class="field full"><label>Campi da mostrare nel certificato</label><div class="row" style="flex-wrap:wrap">${extraFieldsHtml(CERT_TEMPLATES[tplKey].fields)}</div></div>
  </div>`,async fd=>{
    const sigF=fd.get('sigFile');
    const obj={...c,id:c.id||uid(),
      template:fd.get('template'),
      artworkId:fd.get('artworkId'),
      title:fd.get('title'),
      certNumber:fd.get('certNumber'),
      place:fd.get('place'),
      date:fd.get('date'),
      artist:fd.get('artist'),
      body:fd.get('body'),
      buyer:fd.get('buyer'),
      provenance:fd.get('provenance'),
      exhibition:fd.get('exhibition'),
      edition:fd.get('edition'),
      price:fd.get('price'),
      theme:fd.get('theme'),
      sigMode:fd.get('sigMode'),
      fields:fd.getAll('fields'),
      signatureImg:sigF&&sigF.size?await fileData(sigF):(c.signatureImg||''),
      updated:new Date().toISOString(),created:c.created||new Date().toISOString()};
    if(c.id)db.certificates=db.certificates.map(x=>x.id===c.id?obj:x);else db.certificates.unshift(obj);
    save();modal.close();certPreviewId=obj.id;go('certpreview');toast('Certificato salvato');
  });
}

let certPreviewId=null;
function certPreviewView(){
  const c=db.certificates.find(x=>x.id===certPreviewId);
  if(!c)return empty('✦','Certificato non trovato.');
  const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;
  const a=db.artworks.find(x=>x.id===c.artworkId)||{};
  const F=c.fields||tpl.fields;
  const rowsSrc={
    code:a.code||'', year:a.year||'', technique:a.technique||'', support:a.support||'',
    dimensions:a.dimensions||'', frame:a.frame||'',
    edition:c.edition||'', price:c.price?euro(c.price):'',
    buyer:c.buyer||'', donee:c.buyer||'', collection:a.collection||c.provenance||'',
    provenance:c.provenance||'', exhibition:c.exhibition||'', place:c.place||'', date:c.date?fmtDate(c.date):''
  };
  const rows=F.filter(k=>k!=='signature'&&rowsSrc[k]).map(k=>`<tr><td class="ck">${esc(CERT_FIELD_LABELS[k]||k)}</td><td>${esc(rowsSrc[k])}</td></tr>`).join('');
  const sig=c.sigMode==='image'&&c.signatureImg?`<img class="cert-sig-img" src="${c.signatureImg}" alt="firma">`:`<span class="cert-sig-name">${esc(c.artist||db.settings.artist)}</span>`;
  return `<div class="toolbar no-print"><button class="btn" data-action="backCert">← Certificati</button><button class="btn primary" data-action="printCert">📄 Apri documento</button><button class="btn" data-action="shareCert">✍️ Testo modificabile</button></div>
  <article class="cert-page" data-cert-theme="${esc(c.theme||'classic')}">
    <div class="cert-frame">
      <header class="cert-head"><div class="cert-mark">M</div><small>${esc(tpl.label)}</small><h1>${esc(c.title||tpl.title)}</h1>${c.certNumber?`<p class="cert-num">N. ${esc(c.certNumber)}</p>`:''}</header>
      ${a.image?`<div class="cert-img"><img src="${a.image}" alt="${esc(a.title||'')}"></div>`:''}
      ${a.title?`<h2 class="cert-artwork">«${esc(a.title)}»</h2>`:''}
      <p class="cert-body">${esc(c.body||tpl.body)}</p>
      ${rows?`<table class="cert-table"><tbody>${rows}</tbody></table>`:''}
      <div class="cert-footer">
        <div class="cert-sig">${sig}<hr><small>${esc(c.artist||db.settings.artist)} · Artista</small></div>
        <div class="cert-meta"><small>${esc(c.place||'')}${c.place&&c.date?', ':''}${c.date?fmtDate(c.date):''}</small></div>
      </div>
      <p class="cert-note">${esc(db.settings.email||'')}${db.settings.email?' · ':''}www.dandreart.info</p>
    </div>
  </article>`;
}

function shareCertText(c){const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;const a=db.artworks.find(x=>x.id===c.artworkId);return `${tpl.label}\n${c.title||tpl.title}${c.certNumber?' · N. '+c.certNumber:''}\n${a?'Opera: '+a.title+'\\n':''}${c.body||tpl.body}\n${c.artist||db.settings.artist}${c.place?' · '+c.place:''}${c.date?' · '+fmtDate(c.date):''}`;}

/* ===== ESPORTAZIONE DOCUMENTI (compatibile app Android) ===== */
function docShell(title,inner,extraCss){return `<!DOCTYPE html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title><style>
*{box-sizing:border-box}body{font-family:Georgia,'Times New Roman',serif;margin:0;padding:24px;background:#fff;color:#111;line-height:1.6}
.doc-actions{position:sticky;top:0;background:#fff;padding:12px 0;border-bottom:1px solid #ddd;margin-bottom:20px;display:flex;gap:10px;flex-wrap:wrap}
.doc-actions button{font:600 1rem system-ui;padding:12px 20px;border:0;border-radius:8px;background:#8a6a1f;color:#fff}
h1{font-size:1.9rem;margin:.2em 0}h2{font-size:1.3rem}
table{width:100%;border-collapse:collapse;margin:16px 0}td{padding:9px 12px;border-bottom:1px solid #ddd}
img{max-width:100%;height:auto}
.art{display:flex;gap:20px;margin:26px 0;page-break-inside:avoid;flex-wrap:wrap}
.art img{max-width:260px;border:1px solid #ccc}
.art>div{flex:1 1 240px}
@media print{.doc-actions{display:none}body{padding:0}}
${extraCss||''}
</style></head><body><div class="doc-actions"><button onclick="window.print()">🖨️ Stampa / Salva come PDF</button></div>${inner}</body></html>`;}

function safeName(t){return String(t||'documento').replace(/[^\w\sÀ-ÿ-]/g,'').trim().replace(/\s+/g,'_').slice(0,50);}
function certDocHtml(c){
  const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;
  const a=db.artworks.find(x=>x.id===c.artworkId)||{};
  const F=c.fields||tpl.fields;
  const src={code:a.code||'',year:a.year||'',technique:a.technique||'',support:a.support||'',dimensions:a.dimensions||'',frame:a.frame||'',edition:c.edition||'',price:c.price?euro(c.price):'',buyer:c.buyer||'',donee:c.buyer||'',collection:a.collection||c.provenance||'',provenance:c.provenance||'',exhibition:c.exhibition||'',place:c.place||'',date:c.date?fmtDate(c.date):''};
  const rows=F.filter(k=>k!=='signature'&&src[k]).map(k=>'<tr><td style="font-weight:700;width:40%">'+esc(CERT_FIELD_LABELS[k]||k)+'</td><td>'+esc(src[k])+'</td></tr>').join('');
  const sig=(c.sigMode==='image'&&c.signatureImg)?'<img src="'+c.signatureImg+'" style="max-height:80px">':'<span style="font-style:italic;font-size:1.6rem">'+esc(c.artist||db.settings.artist)+'</span>';
  return '<div style="border:2px solid #8a6a1f;padding:26px">'
   +'<div style="text-align:center;margin-bottom:18px"><small style="letter-spacing:.2em;text-transform:uppercase;color:#8a6a1f;font-weight:700">'+esc(tpl.label)+'</small>'
   +'<h1 style="margin:.2em 0">'+esc(c.title||tpl.title)+'</h1>'
   +(c.certNumber?'<p style="color:#8a6a1f;font-weight:700">N. '+esc(c.certNumber)+'</p>':'')+'</div>'
   +(a.image?'<div style="text-align:center;margin:16px 0"><img src="'+a.image+'" style="max-height:340px;border:1px solid #ccc"></div>':'')
   +(a.title?'<h2 style="text-align:center;font-style:italic">\u00ab'+esc(a.title)+'\u00bb</h2>':'')
   +'<p style="text-align:justify">'+esc(c.body||tpl.body)+'</p>'
   +(rows?'<table>'+rows+'</table>':'')
   +'<div style="display:flex;justify-content:space-between;align-items:flex-end;margin-top:40px;flex-wrap:wrap;gap:16px">'
   +'<div style="text-align:center;min-width:200px">'+sig+'<hr style="border:0;border-top:1px solid #111;margin:6px 0 4px"><small>'+esc(c.artist||db.settings.artist)+' \u00b7 Artista</small></div>'
   +'<div><small>'+esc(c.place||'')+(c.place&&c.date?', ':'')+(c.date?fmtDate(c.date):'')+'</small></div></div></div>';
}
function pdfDocHtml(p){
  const arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean);
  const F=p.fields||[];
  const riga=(lab,val)=>val?'<p><strong>'+lab+':</strong> '+esc(val)+'</p>':'';
  return '<header style="border-bottom:3px solid #8a6a1f;padding-bottom:18px;margin-bottom:24px">'
   +'<small>MAIR GO! \u00b7 '+esc(p.type||'')+'</small><h1 style="margin:.2em 0">'+esc(p.title||'')+'</h1>'
   +'<h2>'+esc(p.subtitle||'')+'</h2><p>'+esc(p.intro||'')+'</p></header>'
   +arts.map(a=>'<section class="art"><div>'+(a.image?'<img src="'+a.image+'">':'')+'</div><div>'
     +'<h2>'+esc(a.title||'')+'</h2>'
     +(F.includes('year')?riga('Anno',a.year):'')
     +(F.includes('code')?riga('Codice',a.code):'')
     +(F.includes('technique')?riga('Tecnica',a.technique?(a.technique+(a.support?' su '+a.support:'')):''):'')
     +(F.includes('dimensions')?riga('Dimensioni',a.dimensions):'')
     +(F.includes('frame')?riga('Cornice',a.frame):'')
     +(F.includes('status')?riga('Stato',a.status):'')
     +(F.includes('price')&&a.price?'<p><strong>Prezzo:</strong> '+euro(a.price)+'</p>':'')
     +(F.includes('description')&&a.description?'<p>'+esc(a.description)+'</p>':'')
     +'</div></section>').join('')
   +'<footer style="border-top:1px solid #bbb;padding-top:16px;margin-top:32px"><strong>'+esc(db.settings.artist)+'</strong><br>'+esc(db.settings.email||'')+' '+esc(db.settings.phone||'')+'</footer>';
}
function receiptDocHtml(s){
  const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId);
  return '<h1>Ricevuta / riepilogo vendita</h1><p><strong>'+esc(db.settings.artist)+'</strong></p>'
   +'<table><tr><td>Opera</td><td>'+esc(a&&a.title||'\u2014')+'</td></tr>'
   +'<tr><td>Cliente</td><td>'+esc(c&&c.name||'\u2014')+'</td></tr>'
   +'<tr><td>Data</td><td>'+fmtDate(s.date)+'</td></tr>'
   +'<tr><td>Totale</td><td>'+euro(s.total)+'</td></tr>'
   +'<tr><td>Incassato</td><td>'+euro(s.paid)+'</td></tr>'
   +'<tr><td>Metodo</td><td>'+esc(s.paymentMethod||'\u2014')+'</td></tr></table>'
   +'<p>'+esc(s.notes||'')+'</p><p style="margin-top:36px">Firma _______________________</p>';
}

function certPlain(c){const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;const a=db.artworks.find(x=>x.id===c.artworkId);const F=c.fields||tpl.fields;const src={code:a?.code,year:a?.year,technique:a?.technique,support:a?.support,dimensions:a?.dimensions,frame:a?.frame,edition:c.edition,price:c.price?euro(c.price):'',buyer:c.buyer,donee:c.buyer,collection:a?.collection||c.provenance,provenance:c.provenance,exhibition:c.exhibition,place:c.place,date:c.date?fmtDate(c.date):''};
const righe=F.filter(k=>k!=='signature'&&src[k]).map(k=>`${CERT_FIELD_LABELS[k]||k}: ${src[k]}`).join('\n');
return `${tpl.label}\n${c.title||tpl.title}${c.certNumber?'\nN. '+c.certNumber:''}\n\n${a?'Opera: '+(a.title||'')+'\n':''}${righe?righe+'\n':''}\n${c.body||tpl.body}\n\n${c.artist||db.settings.artist}${c.place?'\n'+c.place:''}${c.date?' · '+fmtDate(c.date):''}`;}
function pdfPlain(p){const arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean);
return `${p.title||''}\n${p.subtitle||''}\n\n${p.intro||''}\n\n`+arts.map(a=>`• ${a.title||''}${a.year?' ('+a.year+')':''}${a.technique?' — '+a.technique:''}${a.dimensions?' — '+a.dimensions:''}`).join('\n')+`\n\n${db.settings.artist}`;}
function receiptPlain(s){const a=db.artworks.find(x=>x.id===s.artworkId),c=db.clients.find(x=>x.id===s.clientId);
return `Ricevuta vendita\n${db.settings.artist}\n\nOpera: ${a?.title||'—'}\nCliente: ${c?.name||'—'}\nData: ${fmtDate(s.date)}\nTotale: ${euro(s.total)}\nIncassato: ${euro(s.paid)}\nMetodo: ${s.paymentMethod||'—'}`;}

function textEditorOpen(title,text){
  const host=document.createElement('div');host.id='txteditor';
  host.innerHTML=`<div class="dv-bar">
    <button class="btn" id="txClose">← Chiudi</button>
    <button class="btn primary" id="txCopy">📋 Copia</button>
    <button class="btn" id="txShare">📤 Condividi</button>
  </div><div class="tx-wrap"><textarea id="txArea" spellcheck="false"></textarea></div>`;
  document.body.appendChild(host);
  const css=document.createElement('style');css.id='txteditor-css';
  css.textContent=`#txteditor{position:fixed;inset:0;z-index:9999;background:var(--panel,#fff);display:flex;flex-direction:column}
  #txteditor .dv-bar{display:flex;gap:8px;padding:10px;border-bottom:1px solid #ccc;flex-wrap:wrap}
  #txteditor .tx-wrap{flex:1;padding:12px;display:flex}
  #txteditor textarea{flex:1;width:100%;border:1px solid #ccc;border-radius:8px;padding:14px;font:1rem/1.6 system-ui;resize:none;background:#fff;color:#111}`;
  document.head.appendChild(css);
  const ta=host.querySelector('#txArea');ta.value=text;
  const closeIt=()=>{host.remove();css.remove()};
  host.querySelector('#txClose').onclick=closeIt;
  host.querySelector('#txCopy').onclick=async()=>{try{await navigator.clipboard.writeText(ta.value);toast('Testo copiato')}catch(e){ta.select();toast('Seleziona e copia')}};
  host.querySelector('#txShare').onclick=async()=>{try{if(navigator.share)await navigator.share({title,text:ta.value});else{await navigator.clipboard.writeText(ta.value);toast('Testo copiato')}}catch(e){}};
}

/* ===== IMPAGINAZIONE PDF PROFESSIONALE ===== */
const PDF_DEFAULT={
  formato:'a4', orientamento:'p',
  mTop:18,mBottom:20,mLeft:16,mRight:16,
  font:'times', corpo:11, titolo:24, colore:'#8a6a1f',
  copertina:true, intro:true, indice:true, colophon:true, numeri:true,
  intestazione:true, imgMax:70, imgPos:'centro',
  operaPerPagina:true, riempi:true
};
function pdfCfg(){return Object.assign({},PDF_DEFAULT,db.settings.pdf||{});}
const PDF_FONTS=[['times','Times (classico)'],['helvetica','Helvetica (moderno)'],['courier','Courier (macchina)']];
const PDF_FORMATI=[['a4','A4 (21×29,7)'],['a5','A5 (14,8×21)'],['letter','Letter (21,6×27,9)'],['a3','A3 (29,7×42)']];

function pdfMisure(pdf,C){
  C=C||pdfCfg();
  const pw=pdf.internal.pageSize.getWidth(), ph=pdf.internal.pageSize.getHeight();
  return {pw,ph,mt:C.mTop,mb:C.mBottom,ml:C.mLeft,mr:C.mRight,
    utileW:pw-C.mLeft-C.mRight, utileH:ph-C.mTop-C.mBottom};
}

// disegna un elemento DOM in una pagina, scalandolo per stare nell'area utile
async function pdfBloccoInPagina(pdf,el,opt){
  const C=(opt&&opt.C)||pdfCfg();
  const M=pdfMisure(pdf,C);
  const canvas=await html2canvas(el,{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false});
  let w=M.utileW, h=canvas.height*w/canvas.width;
  const maxH=(opt&&opt.maxH)||M.utileH;
  if(h>maxH){h=maxH;w=canvas.width*h/canvas.height;}
  const x=M.ml+(M.utileW-w)/2;
  const y=(opt&&opt.y!=null)?opt.y:M.mt;
  pdf.addImage(canvas.toDataURL('image/jpeg',0.92),'JPEG',x,y,w,h);
  return y+h;
}

// crea un contenitore fuori schermo per rendere i blocchi alla larghezza giusta
function pdfStage(C){
  C=C||pdfCfg();
  const fam=C.font==='helvetica'?'Helvetica,Arial,sans-serif':(C.font==='courier'?'Courier New,monospace':'Georgia,Times New Roman,serif');
  const st=document.createElement('div');
  st.setAttribute('style','position:fixed;left:-10000px;top:0;width:794px;background:#fff;color:#111;line-height:1.6;font-family:'+fam+';font-size:'+(C.corpo*1.35)+'px');
  document.body.appendChild(st);
  return st;
}

function pdfPiePagina(pdf,num,tot,testo,C){
  C=C||pdfCfg();
  const M=pdfMisure(pdf,C);
  pdf.setFontSize(8);pdf.setTextColor(120);
  if(testo)pdf.text(String(testo).slice(0,70),M.ml,M.ph-9);
  pdf.text(String(num)+' / '+String(tot),M.pw-M.mr,M.ph-9,{align:'right'});
  pdf.setTextColor(0);
}

// genera il PDF impaginato di un progetto catalogo
async function pdfCatalogoImpaginato(p){
  const C=pdfCfg();
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:C.orientamento,unit:'mm',format:C.formato});
  const M=pdfMisure(pdf,C);
  const st=pdfStage(C);
  const arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean);
  const F=p.fields||[];
  const autore=esc(db.settings.artist||'');
  const col=C.colore||'#8a6a1f';
  const T=(n)=>Math.round(C.titolo*n);
  let prima=true;
  const nuovaPagina=()=>{if(prima){prima=false;}else{pdf.addPage();}};
  try{
    // ---- COPERTINA ----
    if(C.copertina){
      nuovaPagina();
      const sub=(p.subtitle&&p.subtitle.trim()&&p.subtitle.trim()!==autore)?'<h2 style="font-size:'+T(0.82)+'px;font-weight:400;font-style:italic;margin:0 0 18px">'+esc(p.subtitle)+'</h2>':'';
      st.innerHTML='<div style="padding:40px 30px;text-align:center;min-height:900px;display:flex;flex-direction:column;justify-content:center">'
        +'<div style="border:3px solid '+col+';padding:56px 30px">'
        +'<div style="letter-spacing:.28em;text-transform:uppercase;font-size:'+T(0.5)+'px;color:'+col+';font-weight:700">'+esc(p.type||'Catalogo')+'</div>'
        +'<h1 style="font-size:'+T(1.7)+'px;margin:26px 0 12px;line-height:1.2">'+esc(p.title||'')+'</h1>'
        +sub
        +'<div style="width:70px;height:2px;background:'+col+';margin:26px auto"></div>'
        +'<div style="font-size:'+T(0.8)+'px;font-weight:700">'+autore+'</div>'
        +'<div style="font-size:'+T(0.55)+'px;color:#555;margin-top:8px">'+arts.length+(arts.length===1?' opera':' opere')+'</div>'
        +'</div></div>';
      await pdfBloccoInPagina(pdf,st,{C,maxH:M.utileH});
    }
    // ---- INTRODUZIONE ----
    if(C.intro&&p.intro&&p.intro.trim()){
      nuovaPagina();
      st.innerHTML='<div style="padding:6px">'
        +'<h2 style="font-size:'+T(1)+'px;border-bottom:2px solid '+col+';padding-bottom:8px;margin:0 0 18px;color:'+col+'">Introduzione</h2>'
        +'<div style="text-align:justify;white-space:pre-wrap">'+esc(p.intro)+'</div></div>';
      await pdfBloccoInPagina(pdf,st,{C,maxH:M.utileH});
    }
    // ---- INDICE ----
    if(C.indice&&arts.length>1){
      nuovaPagina();
      st.innerHTML='<div style="padding:6px">'
        +'<h2 style="font-size:'+T(1)+'px;border-bottom:2px solid '+col+';padding-bottom:8px;margin:0 0 18px;color:'+col+'">Indice delle opere</h2>'
        +'<table style="width:100%;border-collapse:collapse">'
        +arts.map((a,i)=>'<tr><td style="padding:8px 4px;border-bottom:1px solid #e2e2e2;width:38px;color:'+col+';font-weight:700">'+(i+1)+'</td>'
          +'<td style="padding:8px 4px;border-bottom:1px solid #e2e2e2">'+esc(a.title||'Senza titolo')+(a.year?' <span style="color:#777">('+esc(a.year)+')</span>':'')+'</td></tr>').join('')
        +'</table></div>';
      await pdfBloccoInPagina(pdf,st,{C,maxH:M.utileH});
    }
    // ---- OPERE ----
    const riga=(lab,val)=>val?'<tr><td style="padding:6px 8px;border-bottom:1px solid #e6e6e6;font-weight:700;width:36%;color:'+col+'">'+lab+'</td><td style="padding:6px 8px;border-bottom:1px solid #e6e6e6">'+esc(val)+'</td></tr>':'';
    const allinea=C.imgPos==='sinistra'?'flex-start':(C.imgPos==='destra'?'flex-end':'center');
    for(let i=0;i<arts.length;i++){
      const a=arts[i];
      nuovaPagina();
      const dati=(F.includes('year')?riga('Anno',a.year):'')
        +(F.includes('code')?riga('Codice',a.code):'')
        +(F.includes('technique')?riga('Tecnica',a.technique?(a.technique+(a.support?' su '+a.support:'')):''):'')
        +(F.includes('dimensions')?riga('Dimensioni',a.dimensions):'')
        +(F.includes('frame')?riga('Cornice',a.frame):'')
        +(F.includes('status')?riga('Stato',a.status):'')
        +((F.includes('price')&&a.price)?riga('Prezzo',euro(a.price)):'');
      const testa=C.intestazione?'<div style="display:flex;justify-content:space-between;align-items:baseline;border-bottom:1px solid #ddd;padding-bottom:6px;margin-bottom:16px">'
        +'<span style="font-size:'+T(0.46)+'px;letter-spacing:.16em;text-transform:uppercase;color:'+col+';font-weight:700">Opera '+(i+1)+' di '+arts.length+'</span>'
        +'<span style="font-size:'+T(0.46)+'px;color:#888">'+esc(p.title||'')+'</span></div>':'';
      const altezzaImg=Math.round(9*(C.imgMax||70));
      st.innerHTML='<div style="padding:6px;'+(C.riempi?'min-height:940px;display:flex;flex-direction:column;':'')+'">'
        +testa
        +(a.image?'<div style="text-align:'+(C.imgPos==='centro'?'center':C.imgPos)+';margin-bottom:18px;display:flex;justify-content:'+allinea+'"><img src="'+a.image+'" style="max-width:100%;max-height:'+altezzaImg+'px;object-fit:contain;border:1px solid #ccc"></div>':'')
        +'<h2 style="font-size:'+T(1)+'px;font-style:italic;text-align:center;margin:0 0 4px">'+esc(a.title||'Senza titolo')+'</h2>'
        +(a.year?'<div style="text-align:center;color:#777;margin-bottom:16px">'+esc(a.year)+'</div>':'<div style="margin-bottom:12px"></div>')
        +(dati?'<table style="width:100%;border-collapse:collapse;margin-bottom:14px">'+dati+'</table>':'')
        +((F.includes('description')&&a.description)?'<div style="text-align:justify;color:#333;border-top:1px solid #eee;padding-top:12px;white-space:pre-wrap">'+esc(a.description)+'</div>':'')
        +'</div>';
      await pdfBloccoInPagina(pdf,st,{C,maxH:M.utileH});
    }
    // ---- COLOPHON ----
    if(C.colophon){
      nuovaPagina();
      st.innerHTML='<div style="padding:40px 20px;text-align:center">'
        +'<div style="width:60px;height:2px;background:'+col+';margin:0 auto 22px"></div>'
        +'<div style="font-size:'+T(0.8)+'px;font-weight:700;margin-bottom:10px">'+autore+'</div>'
        +(db.settings.bio?'<div style="color:#444;max-width:440px;margin:0 auto 18px;text-align:justify;white-space:pre-wrap">'+esc(db.settings.bio)+'</div>':'')
        +'<div style="color:#666">'+esc(db.settings.email||'')+(db.settings.phone?' \u00b7 '+esc(db.settings.phone):'')+'</div>'
        +'<div style="font-size:'+T(0.46)+'px;color:#999;margin-top:24px">Catalogo generato con MAIR GO! \u00b7 '+new Date().toLocaleDateString('it-IT')+'</div>'
        +'</div>';
      await pdfBloccoInPagina(pdf,st,{C,maxH:M.utileH});
    }
    // ---- NUMERI ----
    if(C.numeri){
      const tot=pdf.internal.getNumberOfPages();
      const da=C.copertina?2:1;
      for(let n=da;n<=tot;n++){pdf.setPage(n);pdfPiePagina(pdf,n,tot,p.title||'',C);}
    }
  } finally { st.remove(); }
  return pdf;
}

// genera il PDF di un certificato (pagina singola, centrata)
async function pdfCertificatoImpaginato(c){
  const C=pdfCfg();
  const {jsPDF}=window.jspdf;
  const pdf=new jsPDF({orientation:C.orientamento,unit:'mm',format:C.formato});
  const M=pdfMisure(pdf,C);
  const st=pdfStage(C);
  try{
    st.innerHTML='<div style="padding:6px">'+certDocHtml(c)+'</div>';
    await pdfBloccoInPagina(pdf,st,{C,maxH:M.utileH});
  } finally { st.remove(); }
  return pdf;
}

/* ===== PANNELLO CONFIGURAZIONE PDF ===== */
function pdfSettingsModal(){
  const C=pdfCfg();
  const sel=(nome,lista,val)=>'<select name="'+nome+'">'+lista.map(([v,l])=>'<option value="'+v+'"'+(String(val)===String(v)?' selected':'')+'>'+l+'</option>').join('')+'</select>';
  const chk=(nome,label,val)=>'<label class="chkline"><input type="checkbox" name="'+nome+'"'+(val?' checked':'')+'> '+label+'</label>';
  openModal('Impaginazione PDF','<div class="formgrid">'
    +'<div class="field"><label>Formato pagina</label>'+sel('formato',PDF_FORMATI,C.formato)+'</div>'
    +'<div class="field"><label>Orientamento</label>'+sel('orientamento',[['p','Verticale'],['l','Orizzontale']],C.orientamento)+'</div>'
    +'<div class="field"><label>Margine alto (mm)</label><input name="mTop" type="number" min="5" max="60" value="'+C.mTop+'"></div>'
    +'<div class="field"><label>Margine basso (mm)</label><input name="mBottom" type="number" min="5" max="60" value="'+C.mBottom+'"></div>'
    +'<div class="field"><label>Margine sinistro (mm)</label><input name="mLeft" type="number" min="5" max="60" value="'+C.mLeft+'"></div>'
    +'<div class="field"><label>Margine destro (mm)</label><input name="mRight" type="number" min="5" max="60" value="'+C.mRight+'"></div>'
    +'<div class="field"><label>Carattere</label>'+sel('font',PDF_FONTS,C.font)+'</div>'
    +'<div class="field"><label>Colore accento</label><input name="colore" type="color" value="'+C.colore+'"></div>'
    +'<div class="field"><label>Corpo del testo</label><input name="corpo" type="number" min="7" max="18" value="'+C.corpo+'"></div>'
    +'<div class="field"><label>Dimensione titoli</label><input name="titolo" type="number" min="14" max="48" value="'+C.titolo+'"></div>'
    +'<div class="field"><label>Altezza max immagine (%)</label><input name="imgMax" type="number" min="20" max="100" value="'+C.imgMax+'"></div>'
    +'<div class="field"><label>Posizione immagine</label>'+sel('imgPos',[['centro','Centrata'],['left','A sinistra'],['right','A destra']],C.imgPos)+'</div>'
    +'<div class="field full"><label>Sezioni del documento</label><div class="chkgrid">'
      +chk('copertina','Copertina',C.copertina)
      +chk('intro','Introduzione',C.intro)
      +chk('indice','Indice opere',C.indice)
      +chk('colophon','Pagina finale',C.colophon)
      +chk('numeri','Numeri di pagina',C.numeri)
      +chk('intestazione','Intestazione opera',C.intestazione)
      +chk('riempi','Riempi la pagina',C.riempi)
    +'</div></div>'
    +'<p class="meta full">Le impostazioni valgono per tutti i cataloghi e certificati generati.</p>'
  +'</div>',fd=>{
    db.settings.pdf={
      formato:fd.get('formato'),orientamento:fd.get('orientamento'),
      mTop:+fd.get('mTop'),mBottom:+fd.get('mBottom'),mLeft:+fd.get('mLeft'),mRight:+fd.get('mRight'),
      font:fd.get('font'),colore:fd.get('colore'),corpo:+fd.get('corpo'),titolo:+fd.get('titolo'),
      imgMax:+fd.get('imgMax'),imgPos:fd.get('imgPos'),
      copertina:!!fd.get('copertina'),intro:!!fd.get('intro'),indice:!!fd.get('indice'),
      colophon:!!fd.get('colophon'),numeri:!!fd.get('numeri'),intestazione:!!fd.get('intestazione'),
      riempi:!!fd.get('riempi')
    };
    save();modal.close();toast('Impaginazione salvata');
  });
}

/* ===== SALVATAGGIO FILE COMPATIBILE ANDROID ===== */
async function salvaFile(nome,contenuto,mime,condividi){
  try{
    const Cap=window.Capacitor;
    const FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
    if(FS){
      const b64=btoa(unescape(encodeURIComponent(contenuto)));
      const dirs=['EXTERNAL','DATA','DOCUMENTS','CACHE'];
      let res=null,usata='';
      for(const d of dirs){
        try{res=await FS.writeFile({path:nome,data:b64,directory:d,recursive:true});usata=d;break;}
        catch(e){diagLog('FILE-DIR','fallita '+d+': '+(e&&e.message?e.message:e));}
      }
      if(res){
        diagLog('FILE','salvato in '+usata+': '+nome);
        const Sh=Cap.Plugins&&Cap.Plugins.Share;
        if(Sh&&res.uri){
          try{await Sh.share({title:nome,text:nome,url:res.uri,dialogTitle:'Salva o invia '+nome});return true;}
          catch(e){diagLog('FILE-SHARE',e&&e.message?e.message:String(e));}
        }
        alert('File creato: '+nome);
        return true;
      }
    }
  }catch(e){diagLog('FILE-ERRORE',e&&e.message?e.message:String(e));}
  try{download(new Blob([contenuto],{type:mime||'text/plain'}),nome);return true;}
  catch(e){diagLog('FILE-DOWNLOAD-ERRORE',e&&e.message?e.message:String(e));alert('Impossibile salvare il file.');return false;}
}

function docViewerOpen(title,inner,extraCss,plainText){
  try{
    const old=document.getElementById('docviewer');if(old)old.remove();
    const oldc=document.getElementById('docviewer-css');if(oldc)oldc.remove();
    const css=document.createElement('style');css.id='docviewer-css';
    css.textContent='#docviewer{position:fixed;top:0;left:0;right:0;bottom:0;z-index:99999;background:#eee;display:flex;flex-direction:column}'
      +'#docviewer .dv-bar{display:flex;gap:8px;padding:10px;background:#fff;border-bottom:1px solid #ccc;flex-wrap:wrap}'
      +'#docviewer .dv-bar button{font:600 .95rem system-ui;padding:10px 14px;border:1px solid #bbb;border-radius:8px;background:#fff;color:#111}'
      +'#docviewer .dv-bar button.pri{background:#8a6a1f;color:#fff;border-color:#8a6a1f}'
      +'#docviewer .dv-scroll{flex:1;overflow-y:auto;padding:12px}'
      +'#docviewer .dv-paper{background:#fff;color:#111;max-width:900px;margin:0 auto;padding:22px;font-family:Georgia,serif;line-height:1.6}'
      +'#docviewer .dv-paper img{max-width:100%;height:auto}'
      +'#docviewer .dv-paper table{width:100%;border-collapse:collapse;margin:14px 0}'
      +'#docviewer .dv-paper td{padding:9px 12px;border-bottom:1px solid #ddd}'
      +'#docviewer .dv-paper .art{display:flex;gap:18px;margin:22px 0;flex-wrap:wrap}'
      +'#docviewer .dv-paper .art img{max-width:240px;border:1px solid #ccc}'
      +'#docviewer .dv-paper .art>div{flex:1 1 220px}'
      +'@media print{#app,header,nav,.topbar,#toast{display:none!important}'
      +'#docviewer{position:static!important;background:#fff!important}'
      +'#docviewer .dv-bar{display:none!important}'
      +'#docviewer .dv-scroll{overflow:visible!important;padding:0!important}'
      +'#docviewer .dv-paper{max-width:none!important;padding:0!important}}'
      +(extraCss||'');
    document.head.appendChild(css);

    const host=document.createElement('div');host.id='docviewer';
    const bar=document.createElement('div');bar.className='dv-bar';
    const mk=(txt,pri)=>{const b=document.createElement('button');b.textContent=txt;if(pri)b.className='pri';bar.appendChild(b);return b;};
    const bClose=mk('\u2190 Chiudi');
    const bPrint=mk('\ud83d\udcc4 Salva PDF',true);
    const bShare=mk('\ud83d\udce4 Condividi PDF');
    const bCfg=mk('\u2699\ufe0f Impagina');
    const bText=mk('\u270d\ufe0f Testo');
    const bCopy=mk('\ud83d\udccb Copia');
    host.appendChild(bar);

    const scroll=document.createElement('div');scroll.className='dv-scroll';
    const paper=document.createElement('div');paper.className='dv-paper';
    paper.innerHTML=inner||'<p>Documento vuoto.</p>';
    scroll.appendChild(paper);host.appendChild(scroll);
    document.body.appendChild(host);

    const closeIt=()=>{host.remove();css.remove()};
    bClose.onclick=closeIt;
    const generaPDF=async(condividi)=>{
      const btn=condividi?bShare:bPrint;
      const originale=btn.textContent;
      btn.textContent='\u23f3 Attendere...';bPrint.disabled=true;bShare.disabled=true;
      try{
        if(typeof html2canvas!=='function'||!window.jspdf){throw new Error('Librerie PDF non caricate');}
        const {jsPDF}=window.jspdf;
        let pdf;
        const ctx=window.__PDFCTX__||{};
        try{
          if(ctx.tipo==='catalogo'&&ctx.dato){
            diagLog('PDF','impaginazione catalogo professionale');
            pdf=await pdfCatalogoImpaginato(ctx.dato);
          }else if(ctx.tipo==='certificato'&&ctx.dato){
            diagLog('PDF','impaginazione certificato');
            pdf=await pdfCertificatoImpaginato(ctx.dato);
          }
        }catch(errImp){
          diagLog('PDF-IMPAG-ERRORE',errImp&&errImp.message?errImp.message:String(errImp));
          pdf=null;
        }
        if(!pdf){
          // generico: cattura semplice con margini
          diagLog('PDF','impaginazione generica');
          pdf=new jsPDF({orientation:'p',unit:'mm',format:'a4'});
          const M=pdfMisure(pdf);
          const canvas=await html2canvas(paper,{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false});
          const img=canvas.toDataURL('image/jpeg',0.92);
          const iw=M.utileW, ih=canvas.height*iw/canvas.width;
          let resto=ih, pos=PDF_MARG.top;
          pdf.addImage(img,'JPEG',PDF_MARG.left,pos,iw,ih);
          resto-=M.utileH;
          while(resto>0){pos-=M.utileH;pdf.addPage();pdf.addImage(img,'JPEG',PDF_MARG.left,pos,iw,ih);resto-=M.utileH;}
        }
        const nome=safeName(title)+'.pdf';
        let fatto=false;
        try{
          const Cap=window.Capacitor;
          const FS=Cap&&Cap.Plugins&&Cap.Plugins.Filesystem;
          if(FS){
            const b64=pdf.output('datauristring').split(',')[1];
            try{
              if(FS.checkPermissions){
                const st=await FS.checkPermissions();
                diagLog('PDF-PERM','stato: '+JSON.stringify(st));
                if(st&&st.publicStorage!=='granted'&&FS.requestPermissions){
                  const r=await FS.requestPermissions();
                  diagLog('PDF-PERM','richiesti: '+JSON.stringify(r));
                }
              }
            }catch(e){diagLog('PDF-PERM-ERRORE',e&&e.message?e.message:String(e));}
            // provo piu' destinazioni: alcune richiedono permessi non concessi
            const dirs=['EXTERNAL','DATA','DOCUMENTS','CACHE'];
            let res=null,usata='';
            for(const d of dirs){
              try{
                res=await FS.writeFile({path:nome,data:b64,directory:d,recursive:true});
                usata=d;break;
              }catch(err){
                diagLog('PDF-DIR','fallita '+d+': '+(err&&err.message?err.message:err));
              }
            }
            if(!res)throw new Error('Nessuna cartella scrivibile');
            fatto=true;
            diagLog('PDF-NATIVO','salvato in '+usata+': '+nome);
            if(condividi){
              const Sh=Cap.Plugins&&Cap.Plugins.Share;
              if(Sh&&res&&res.uri){try{await Sh.share({title:nome,url:res.uri});}catch(e){}}
              else{toast('Condivisione non disponibile');}
            }else{
              toast('PDF creato');
              if(usata==='DOCUMENTS'){
                alert('PDF salvato nella cartella Documenti:\n\n'+nome);
              }else{
                // Android non consente la scrittura diretta nelle cartelle pubbliche:
                // apro la condivisione di sistema, dove si puo' scegliere "Salva su file"
                const Sh=Cap.Plugins&&Cap.Plugins.Share;
                if(Sh&&res&&res.uri){
                  try{
                    await Sh.share({title:nome,text:nome,url:res.uri,dialogTitle:'Salva o invia il PDF'});
                    diagLog('PDF-SHARE','condivisione aperta per salvataggio');
                  }catch(e){
                    diagLog('PDF-SHARE-ERRORE',e&&e.message?e.message:String(e));
                    alert('PDF creato:\n\n'+nome+'\n\nSi trova nello spazio dell\u2019app. Usa \u201cCondividi PDF\u201d per spostarlo.');
                  }
                }else{
                  alert('PDF creato:\n\n'+nome);
                }
              }
            }
          }
        }catch(e){diagLog('PDF-NATIVO-ERRORE',e&&e.message?e.message:String(e));}
        if(!fatto){
          try{
            const blob=pdf.output('blob');
            const url=URL.createObjectURL(blob);
            const a=document.createElement('a');a.href=url;a.download=nome;
            document.body.appendChild(a);a.click();a.remove();
            setTimeout(()=>URL.revokeObjectURL(url),4000);
            toast('PDF creato');
          }catch(e){
            diagLog('PDF-DOWNLOAD-ERRORE',e&&e.message?e.message:String(e));
            alert('Impossibile salvare il PDF su questo dispositivo.');
          }
        }
      }catch(e){
        diagLog('PDF-ERRORE',e&&e.message?e.message:String(e));
        alert('Impossibile creare il PDF: '+(e&&e.message?e.message:e));
      }finally{
        btn.textContent=originale;bPrint.disabled=false;bShare.disabled=false;
      }
    };
    bPrint.onclick=()=>generaPDF(false);
    bShare.onclick=()=>generaPDF(true);
    bCfg.onclick=()=>pdfSettingsModal();
    bText.onclick=()=>{textEditorOpen(title,plainText||paper.innerText)};
    bCopy.onclick=async()=>{
      try{await navigator.clipboard.writeText(plainText||paper.innerText);toast('Testo copiato')}
      catch(e){toast('Copia non riuscita')}
    };
  }catch(err){
    alert('Errore apertura documento: '+(err&&err.message?err.message:err));
  }
}

let previewId=null;function pdfPreviewView(){const p=db.pdfProjects.find(x=>x.id===previewId);if(!p)return empty('📄','Progetto non trovato.');const arts=(p.artworkIds||[]).map(id=>db.artworks.find(a=>a.id===id)).filter(Boolean),F=p.fields||[];return `<div class="toolbar no-print"><button class="btn" data-action="backPdf">← PDF Studio</button><button class="btn primary" data-action="printPdf">📄 Apri documento</button><button class="btn" data-action="sharePdf">✍️ Testo modificabile</button></div><article class="pdf-page" data-theme="${esc(p.theme)}"><header style="border-bottom:3px solid var(--accent);padding-bottom:28px;margin-bottom:35px"><small>MAIR GO! · ${esc(p.type)}</small><h1>${esc(p.title)}</h1><h2>${esc(p.subtitle)}</h2><p>${esc(p.intro||'')}</p></header>${arts.map(a=>`<section class="pdf-art"><div>${a.image?`<img src="${a.image}" alt="${esc(a.title)}">`:''}</div><div><h2>${esc(a.title)}</h2>${F.includes('year')?`<p><strong>Anno:</strong> ${esc(a.year)}</p>`:''}${F.includes('code')?`<p><strong>Codice:</strong> ${esc(a.code)}</p>`:''}${F.includes('technique')?`<p><strong>Tecnica:</strong> ${esc(a.technique)}${a.support?' su '+esc(a.support):''}</p>`:''}${F.includes('dimensions')?`<p><strong>Dimensioni:</strong> ${esc(a.dimensions)}</p>`:''}${F.includes('frame')?`<p><strong>Cornice:</strong> ${esc(a.frame)}</p>`:''}${F.includes('status')?`<p><strong>Stato:</strong> ${esc(a.status)}</p>`:''}${F.includes('price')&&a.price?`<p><strong>Prezzo:</strong> ${euro(a.price)}</p>`:''}${F.includes('description')?`<p>${esc(a.description)}</p>`:''}</div></section>`).join('')}<footer style="border-top:1px solid #bbb;padding-top:20px;margin-top:40px"><strong>${esc(db.settings.artist)}</strong><br>${esc(db.settings.email)} ${esc(db.settings.phone)}</footer></article>`}
const actions={openDiag:()=>diagOpen(),newSocialPost:()=>{const a=db.artworks.filter(x=>x.image);if(!a.length){toast('Aggiungi immagini alle opere');return}socialPostModal(a[0])},socialSingolo:()=>{const a=db.artworks.filter(x=>x.image);if(a.length)socialPostModal(a[0])},socialSequenza:()=>socialSequenzaModal(),socialVideo:()=>videoModal(),socialDaOpera:id=>{const a=db.artworks.find(x=>x.id===id);if(a)socialPostModal(a)},pdfSettings:()=>pdfSettingsModal(),customizeHome:()=>homeCustomizeModal(),prepareEmail:()=>{const name=document.querySelector('[name=contactName]')?.value||'',from=document.querySelector('[name=contactEmail]')?.value||'',cat=$('#contactCategory')?.value||'Altro',sub=document.querySelector('[name=contactSubject]')?.value||'Contatto da MAIR GO!',msg=document.querySelector('[name=contactMessage]')?.value||'';const body=`Nome: ${name}\nEmail: ${from}\nCategoria: ${cat}\n\n${msg}`;location.href=`mailto:dandreart.info@gmail.com?subject=${encodeURIComponent('MAIR GO! - '+cat+' - '+sub)}&body=${encodeURIComponent(body)}`},copyContactEmail:async()=>{await navigator.clipboard.writeText('dandreart.info@gmail.com');toast('Indirizzo copiato')},newWorkspace:()=>workspaceModal(),editWorkspace:id=>workspaceModal(db.workspaces.find(x=>x.id===id)),deleteWorkspace:id=>del('workspaces',id),newExhibition:()=>exhibitionModal(),editExhibition:id=>exhibitionModal(db.exhibitions.find(x=>x.id===id)),deleteExhibition:id=>del('exhibitions',id),catalogFromExhibition:id=>catalogFromExhibition(id),newClient:()=>clientModal(),editClient:id=>clientModal(db.clients.find(x=>x.id===id)),deleteClient:id=>del('clients',id),newSale:()=>saleModal(),newSaleForClient:id=>saleModal({clientId:id}),editSale:id=>saleModal(db.sales.find(x=>x.id===id)),deleteSale:id=>del('sales',id),printReceipt:id=>printReceipt(id),newAgenda:()=>agendaModal(),editAgenda:id=>agendaModal(db.agenda.find(x=>x.id===id)),deleteAgenda:id=>del('agenda',id),exportAgendaIcs:()=>exportAgendaIcs(),newArtwork:()=>artworkModal(),editArtwork:id=>artworkModal(db.artworks.find(x=>x.id===id)),deleteArtwork:id=>del('artworks',id),toggleArtworkFav:id=>{const x=db.artworks.find(a=>a.id===id);x.favorite=!x.favorite;save();render()},newLibrary:()=>libraryModal(),editLibrary:id=>libraryModal(db.library.find(x=>x.id===id)),openLibrary:id=>openLibrary(id),deleteLibrary:id=>del('library',id),toggleLibFav:id=>{const x=db.library.find(a=>a.id===id);x.favorite=!x.favorite;save();render()},newPdfProject:()=>pdfProjectModal(),editPdfProject:id=>pdfProjectModal(db.pdfProjects.find(x=>x.id===id)),deletePdfProject:id=>del('pdfProjects',id),openPdfProject:id=>{previewId=id;route='pdfpreview';render()},newCertificate:()=>certificateModal(),editCertificate:id=>certificateModal(db.certificates.find(x=>x.id===id)),deleteCertificate:id=>del('certificates',id),openCertificate:id=>{certPreviewId=id;go('certpreview')},backCert:()=>go('certificates'),printCert:()=>{diagLog('CLICK','printCert premuto');const c=db.certificates.find(x=>x.id===certPreviewId);if(!c)return;const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;window.__PDFCTX__={tipo:'certificato',dato:c};docViewerOpen(c.title||tpl.title,certDocHtml(c),'',certPlain(c))},shareCert:()=>{const c=db.certificates.find(x=>x.id===certPreviewId);if(!c)return;const tpl=CERT_TEMPLATES[c.template]||CERT_TEMPLATES.autenticita;textEditorOpen(c.title||tpl.title,certPlain(c))},backPdf:()=>go('pdfstudio'),printPdf:()=>{diagLog('CLICK','printPdf premuto');const p=db.pdfProjects.find(x=>x.id===previewId);if(!p)return;window.__PDFCTX__={tipo:'catalogo',dato:p};docViewerOpen(p.title||'Catalogo',pdfDocHtml(p),'',pdfPlain(p))},sharePdf:()=>{const p=db.pdfProjects.find(x=>x.id===previewId);if(!p)return;textEditorOpen(p.title||'Catalogo',pdfPlain(p))},saveProfile:()=>{db.settings.artist=$('[name=artist]').value;db.settings.bio=$('[name=bio]').value;db.settings.email=$('[name=email]').value;db.settings.phone=$('[name=phone]').value;save();toast('Profilo salvato')},saveAppearance:()=>{db.settings.theme=$('#themeSetting').value;db.settings.fontSize=$('#fontSetting').value;db.settings.animations=$('#animationsSetting').checked;db.settings.splash=$('#splashSetting').checked;save();render();toast('Aspetto salvato')},savePin:async()=>{const enabled=$('#pinEnabled').checked,p=$('#newPin').value,c=$('#confirmPin').value;if(p&&(!/^\d{4,6}$/.test(p)||p!==c))return alert('Inserisci due PIN uguali di 4–6 cifre.');if(p)db.settings.pinHash=await hashPin(p);if(enabled&&!db.settings.pinHash)return alert('Imposta prima un PIN.');db.settings.pinEnabled=enabled;save();toast('Sicurezza salvata')},resetArtworkFilters:()=>{document.querySelectorAll('.filtergrid input,.filtergrid select').forEach(x=>x.value='');bindArtworkFilters();},addListItem:k=>{const v=prompt('Nuova voce');if(v){db.settings.lists[k].push(v);save();render()}},removeListItem:id=>{const[k,i]=id.split(':');db.settings.lists[k].splice(+i,1);save();render()},saveLists:()=>{document.querySelectorAll('[data-list-key]').forEach(x=>db.settings.lists[x.dataset.listKey][+x.dataset.listI]=x.value.trim());save();toast('Liste salvate')},exportBackup:async()=>{db.settings.lastBackup=new Date().toISOString();save();const ok=await salvaFile('MAIR_GO_Backup_'+new Date().toISOString().slice(0,10)+'.mair',JSON.stringify(db),'application/json');if(ok)toast('Backup creato');if(route==='home'||route==='settings')render()},importBackup:()=>{const i=document.createElement('input');i.type='file';i.accept='.mair,.json';i.onchange=async()=>{try{db=merge(clone(defaults),JSON.parse(await i.files[0].text()));save();render();toast('Backup ripristinato')}catch{alert('Backup non valido')}};i.click()}};window.actions=actions;function del(k,id){if(confirm('Eliminare definitivamente?')){db[k]=db[k].filter(x=>x.id!==id);save();render()}}

function bindSimpleFilter(inputId,gridId,arr,cardFn){const i=$('#'+inputId),g=$('#'+gridId);if(!i||!g)return;const run=()=>{const q=i.value.toLowerCase();g.innerHTML=arr.filter(x=>JSON.stringify(x).toLowerCase().includes(q)).map(cardFn).join('')||empty('⌕','Nessun risultato.');document.querySelectorAll('#'+gridId+' [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x))};i.oninput=run}
function bindAgendaFilters(){const q=$('#agendaSearch'),t=$('#agendaType'),g=$('#agendaList');if(!q||!t||!g)return;const run=()=>{const s=q.value.toLowerCase();g.innerHTML=[...db.agenda].filter(x=>(!t.value||x.type===t.value)&&JSON.stringify(x).toLowerCase().includes(s)).sort((a,b)=>new Date(a.date)-new Date(b.date)).map(agendaCard).join('')||empty('⌕','Nessun evento.');document.querySelectorAll('#agendaList [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x))};q.oninput=t.onchange=run}

function bindArtworkFilters(){const ids=['artSearch','artStatus','artYear','artTechnique','artSupport','artDimension','artFrame','artCollection','artLocation','artFavorite','artMinPrice','artMaxPrice'];const E=Object.fromEntries(ids.map(id=>[id,$('#'+id)]));const run=()=>{const q=(E.artSearch?.value||'').toLowerCase(),min=Number(E.artMinPrice?.value||0),max=Number(E.artMaxPrice?.value||Infinity);const arr=db.artworks.filter(a=>(!E.artStatus.value||a.status===E.artStatus.value)&&(!E.artYear.value||a.year===E.artYear.value)&&(!E.artTechnique.value||a.technique===E.artTechnique.value)&&(!E.artSupport.value||a.support===E.artSupport.value)&&(!E.artDimension.value||a.dimensions===E.artDimension.value)&&(!E.artFrame.value||a.frame===E.artFrame.value)&&(!E.artCollection.value||String(a.collection||'').toLowerCase().includes(E.artCollection.value.toLowerCase()))&&(!E.artLocation.value||String(a.location||'').toLowerCase().includes(E.artLocation.value.toLowerCase()))&&(!E.artFavorite.value||a.favorite)&&Number(a.price||0)>=min&&Number(a.price||0)<=max&&JSON.stringify(a).toLowerCase().includes(q));$('#artGrid').innerHTML=arr.map(artworkCard).join('')||empty('⌕','Nessuna opera trovata.');if($('#filterCount'))$('#filterCount').textContent=`${arr.length} opere visualizzate su ${db.artworks.length}`;document.querySelectorAll('#artGrid [data-action]').forEach(x=>x.onclick=()=>actions[x.dataset.action]?.(x.dataset.id,x))};ids.forEach(id=>{const x=E[id];if(x)x.oninput=x.onchange=run});run()}
function bindLibraryFilters(){const s=$('#libSearch'),t=$('#libType'),c=$('#libCat');const run=()=>{const q=s.value.toLowerCase();const arr=db.library.filter(d=>(!c.value||d.category===c.value)&&(!t.value||(t.value==='pdf'&&d.mime?.includes('pdf'))||(t.value==='doc'&&(d.mime?.includes('word')||d.mime?.includes('text')))||(t.value==='image'&&d.mime?.startsWith('image'))||(t.value==='fav'&&d.favorite)||(t.value==='linked'&&d.artworkId))&&JSON.stringify({...d,data:''}).toLowerCase().includes(q));$('#libGrid').innerHTML=arr.map(libCard).join('')||empty('⌕','Nessun documento trovato.');bind()};s.oninput=t.onchange=c.onchange=run}
async function hashPin(pin){const data=new TextEncoder().encode('MAIR-GO-'+pin);const digest=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(digest)].map(b=>b.toString(16).padStart(2,'0')).join('')}
function showLock(){const lock=$('#lockScreen');lock.classList.remove('hidden');setTimeout(()=>$('#pinInput').focus(),100);$('#unlockBtn').onclick=async()=>{if(await hashPin($('#pinInput').value)===db.settings.pinHash){lock.classList.add('hidden');$('#pinInput').value=''}else{toast('PIN errato');$('#pinInput').select()}};$('#pinInput').onkeydown=e=>{if(e.key==='Enter')$('#unlockBtn').click()};$('#pinHelp').onclick=()=>alert('Per tutelare i dati, il PIN non può essere recuperato. È possibile ripristinare un backup precedente oppure cancellare i dati del sito dal browser.')}
function startup(){const splash=$('#splash');if(db.settings.splash===false)splash.remove();else setTimeout(()=>splash.classList.add('splash-out'),1500);setTimeout(()=>{splash?.remove();if(db.settings.pinEnabled&&db.settings.pinHash)showLock()},1900)}
$('#homeBtn').onclick=()=>go('home');$('#themeBtn').onclick=()=>{const i=themeOptions.findIndex(x=>x[0]===db.settings.theme);db.settings.theme=themeOptions[(i+1)%themeOptions.length][0];save();render();toast(themeOptions[(i+1)%themeOptions.length][1])};document.querySelectorAll('.bottomnav button').forEach(b=>b.onclick=()=>go(b.dataset.route));$('#viewerClose').onclick=()=>viewer.close();window.addEventListener('hashchange',()=>{route=location.hash.slice(1)||'home';render()});let deferredInstallPrompt=null;function installAvailable(){const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;const b=$('#installBtn');if(b)b.classList.toggle('hidden',standalone||!deferredInstallPrompt)}window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredInstallPrompt=e;installAvailable()});window.addEventListener('appinstalled',()=>{deferredInstallPrompt=null;installAvailable();toast('MAIR GO! installata')});$('#installBtn').onclick=async()=>{if(!deferredInstallPrompt)return;deferredInstallPrompt.prompt();await deferredInstallPrompt.userChoice;deferredInstallPrompt=null;installAvailable()};async function boot(){
  await initPersistence();
  if('serviceWorker'in navigator){
    try{
      const registration=await navigator.serviceWorker.register('./service-worker.js',{scope:'./'});
      registration.update().catch(()=>{});
    }catch(error){
      console.warn('Service worker non registrato:',error);
    }
  }
  render();
  installAvailable();
  startup();
}
window.addEventListener('pagehide',()=>{queuePersistentSave()});
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')queuePersistentSave()});
boot();
