'use strict';

/* ============================================================
   Datos: marcas/pigmentos de referencia y paletas predefinidas
   ============================================================ */
// Winsor & Newton: valores hex tomados de una carta de color escaneada de la línea
// Artists' Oil Colour (125 tonos). El resto de las marcas usa aproximaciones estándar
// de pigmento, ya que no encontramos cartas escaneadas equivalentes de acceso público.
const BRAND_DB = {
  "Winsor & Newton": {
    "Winsor Lemon": "#FBEE34", "Cadmium Yellow Pale": "#FCD700", "Cadmium Yellow": "#ED9A22",
    "Winsor Yellow Deep": "#EEA121", "Naples Yellow": "#F8D877", "Cadmium Orange": "#DD6B26",
    "Winsor Orange": "#E08A2A", "Cadmium Red": "#D31F35", "Winsor Red": "#CC2027",
    "Scarlet Lake": "#D32027", "Alizarin Crimson": "#AC1F25", "Permanent Rose": "#CA1F4B",
    "Quinacridone Magenta": "#B4469A", "Permanent Magenta": "#901D58", "Winsor Violet (Dioxazine)": "#612E81",
    "Ultramarine Violet": "#7D559A", "French Ultramarine": "#054F96", "Winsor Blue (Red Shade)": "#035797",
    "Cobalt Blue": "#006DB4", "Cerulean Blue": "#4BA7C8", "Prussian Blue": "#233C78",
    "Viridian": "#1E9A5E", "Winsor Green (Phthalo)": "#007F4E", "Sap Green": "#236533",
    "Terre Verte": "#A3C08B", "Yellow Ochre": "#C18F32", "Raw Sienna": "#C9822A",
    "Burnt Sienna": "#BB3726", "Light Red": "#89351D", "Indian Red": "#AD452F",
    "Burnt Umber": "#633C16", "Raw Umber": "#523420", "Payne's Gray": "#404348",
    "Ivory Black": "#0C0B0A", "Mars Black": "#161617", "Titanium White": "#F7F5EE"
  },
  "Rembrandt": {
    "Amarillo cadmio claro": "#F9CE2B", "Amarillo cadmio medio": "#F2B01D", "Amarillo ocre": "#C68F30",
    "Naranja de cadmio": "#DE7226", "Rojo cadmio medio": "#D42A2E", "Rojo cadmio oscuro": "#C7301F",
    "Carmín de alizarina": "#A81F2A", "Violeta dioxazina": "#5A2D7C", "Azul ultramar": "#22418E",
    "Azul cobalto": "#0568A8", "Azul ftalo": "#123E7A", "Verde esmeralda": "#0F6B4C",
    "Tierra siena tostada": "#82461F", "Tierra siena natural": "#B3742A", "Sombra tostada": "#5A3A22",
    "Tierra roja": "#9C4430", "Gris de Payne": "#3E434B", "Negro marfil": "#1F1B18",
    "Blanco titanio": "#F7F4EC"
  },
  "Golden (acrílico)": {
    "Amarillo cadmio claro": "#F6CF2A", "Amarillo cadmio medio": "#F3BE20", "Amarillo ocre": "#C4902E",
    "Naranja pirrol": "#DE5A22", "Rojo naftol": "#C62A2A", "Rojo cadmio medio": "#CE2A2E",
    "Quinacridona magenta": "#9C2A63", "Violeta dioxazina": "#4B2568", "Azul ftalo": "#123E7A",
    "Azul ultramar": "#22418E", "Verde ftalo": "#0A5E4D", "Verde óxido de cromo": "#4F6B3A",
    "Siena tostada": "#8B4B2A", "Sombra tostada": "#5A3A22", "Negro marte": "#211D1A",
    "Blanco titanio": "#F6F4ED"
  },
  "Sennelier (óleo)": {
    "Amarillo limón": "#F5E637", "Amarillo cadmio": "#F0A61E", "Ocre amarillo": "#C8933A",
    "Rojo cadmio": "#D2262A", "Laca de granza rosa": "#C43159", "Violeta cobalto": "#7B4D96",
    "Azul ultramar": "#264C93", "Azul cerúleo": "#3F91B8", "Verde vejiga": "#376B3E",
    "Tierra verde": "#7C9165", "Siena tostada": "#8B4726", "Sombra natural": "#6E5A3C",
    "Negro marfil": "#221D1A", "Blanco de plata": "#F5F2E9"
  }
};

const PRESETS = {
  custom: {
    label: "Custom — mi paleta",
    desc: "Armá tu propia paleta a partir de lo que tenés en el estudio.",
    pigments: []
  },
  zorn: {
    label: "Paleta de Zorn",
    desc: "Anders Zorn: blanco, ocre amarillo, rojo tierra y negro marfil — sin azul, el \"azul\" sale de mezclar negro y blanco.",
    pigments: [
      {name:"Blanco de titanio", brand:"—", hex:"#F2EFE4"},
      {name:"Amarillo ocre", brand:"—", hex:"#C08A3E"},
      {name:"Rojo de cadmio / tierra roja", brand:"—", hex:"#A83A2C"},
      {name:"Negro marfil", brand:"—", hex:"#201C18"}
    ]
  },
  primarios: {
    label: "Paleta limitada (primarios)",
    desc: "Los tres primarios más blanco y negro — la paleta clásica de aprendizaje.",
    pigments: [
      {name:"Blanco de titanio", brand:"—", hex:"#F5F3EC"},
      {name:"Amarillo de cadmio", brand:"—", hex:"#F3C21B"},
      {name:"Rojo de cadmio", brand:"—", hex:"#D93A2B"},
      {name:"Azul ultramar", brand:"—", hex:"#1B3F8B"},
      {name:"Negro marfil", brand:"—", hex:"#201C18"}
    ]
  },
  tierras: {
    label: "Paleta de tierras",
    desc: "Base terrosa de pigmentos minerales: ocres, siena y sombra, con blanco y negro.",
    pigments: [
      {name:"Blanco de titanio", brand:"—", hex:"#F5F1E6"},
      {name:"Ocre amarillo", brand:"—", hex:"#C08A3E"},
      {name:"Siena tostada", brand:"—", hex:"#8A4A2B"},
      {name:"Sombra tostada", brand:"—", hex:"#5A3A26"},
      {name:"Negro marfil", brand:"—", hex:"#201C18"}
    ]
  },
  impresionista: {
    label: "Paleta impresionista (sin negro)",
    desc: "Alta croma, sin negro — el oscuro se logra mezclando colores complementarios.",
    pigments: [
      {name:"Blanco de titanio", brand:"—", hex:"#F7F4EC"},
      {name:"Amarillo de cadmio", brand:"—", hex:"#F6C21B"},
      {name:"Rojo de cadmio", brand:"—", hex:"#E23A2E"},
      {name:"Alizarina carmesí", brand:"—", hex:"#7C1F2E"},
      {name:"Azul ultramar", brand:"—", hex:"#1B3F8B"},
      {name:"Azul cobalto", brand:"—", hex:"#1E5FA8"},
      {name:"Verde esmeralda", brand:"—", hex:"#147A4E"}
    ]
  }
};

const STORAGE_KEYS = {
  customPalette: 'pigmento:customPalette:v1',
  presetKey: 'pigmento:presetKey:v1',
  activeMap: 'pigmento:activeMap:v1'
};

/* ============================================================
   Color: helpers + modelo de mezcla Kubelka–Munk (constante única)
   ============================================================ */
function hexToRgb(hex){
  hex = hex.replace('#','');
  if(hex.length===3) hex = hex.split('').map(c=>c+c).join('');
  const n = parseInt(hex,16);
  return {r:(n>>16)&255, g:(n>>8)&255, b:n&255};
}
function rgbToHex(r,g,b){
  const c = v => Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,'0');
  return '#'+c(r)+c(g)+c(b);
}
function ksFromR(rNorm){
  const r = Math.min(0.995, Math.max(0.005, rNorm));
  return (1-r)*(1-r)/(2*r);
}
function rFromKs(ks){
  const r = 1 + ks - Math.sqrt(ks*ks + 2*ks);
  return Math.min(1, Math.max(0, r));
}
function rgbToKs(rgb){
  return { r: ksFromR(rgb.r/255), g: ksFromR(rgb.g/255), b: ksFromR(rgb.b/255) };
}
function ksToRgb(ks){
  return { r: rFromKs(ks.r)*255, g: rFromKs(ks.g)*255, b: rFromKs(ks.b)*255 };
}
function mixKs(pigmentsKs, weights){
  let ks = {r:0,g:0,b:0};
  for(let i=0;i<pigmentsKs.length;i++){
    ks.r += pigmentsKs[i].r * weights[i];
    ks.g += pigmentsKs[i].g * weights[i];
    ks.b += pigmentsKs[i].b * weights[i];
  }
  return ks;
}
function colorDist(a,b){
  const dr=a.r-b.r, dg=a.g-b.g, db=a.b-b.b;
  return Math.sqrt(0.3*dr*dr + 0.59*dg*dg + 0.11*db*db);
}
function optimizeMix(targetRgb, pigments){
  const n = pigments.length;
  if(n===0) return null;
  const ksList = pigments.map(p=>rgbToKs(hexToRgb(p.hex)));
  function evalWeights(w){
    const mixed = ksToRgb(mixKs(ksList, w));
    return {dist: colorDist(mixed, targetRgb), mixed};
  }
  let best = null;
  const RESTARTS = 22;
  const ITERS = 240;
  for(let r=0;r<RESTARTS;r++){
    let w = new Array(n).fill(0).map(()=>-Math.log(Math.random()+1e-9));
    let sum = w.reduce((a,b)=>a+b,0);
    w = w.map(v=>v/sum);
    let cur = evalWeights(w);
    for(let it=0; it<ITERS; it++){
      const i = Math.floor(Math.random()*n);
      let j = Math.floor(Math.random()*n);
      if(j===i) j=(j+1)%n;
      const step = (Math.random()*0.18+0.02) * (1 - it/ITERS);
      if(w[i] < step) continue;
      const w2 = w.slice();
      w2[i]-=step; w2[j]+=step;
      const cand = evalWeights(w2);
      if(cand.dist < cur.dist){ w = w2; cur = cand; }
    }
    if(!best || cur.dist < best.dist) best = {w, dist:cur.dist, mixed:cur.mixed};
  }
  const threshold = 0.015;
  let w = best.w.slice();
  let keepIdx = w.map((v,i)=>({v,i})).filter(o=>o.v>=threshold).map(o=>o.i);
  if(keepIdx.length===0) keepIdx = [w.indexOf(Math.max(...w))];
  let keepSum = keepIdx.reduce((a,i)=>a+w[i],0);
  const trimmed = new Array(n).fill(0);
  keepIdx.forEach(i=> trimmed[i] = w[i]/keepSum);
  const finalMixed = ksToRgb(mixKs(ksList, trimmed));
  const finalDist = colorDist(finalMixed, targetRgb);
  return { weights: trimmed, mixedRgb: finalMixed, dist: finalDist };
}
function whiteBalance(sample, white){
  const scale = c => Math.min(255, sample[c] * (255/Math.max(10,white[c])));
  return {r:scale('r'), g:scale('g'), b:scale('b')};
}
// etiqueta cualitativa de qué tan cerca está la mezcla estimada del objetivo
function matchLabel(dist){
  if(dist < 6) return 'muy cercana';
  if(dist < 14) return 'cercana';
  if(dist < 26) return 'aproximada';
  return 'orientativa — puede requerir ajuste a ojo';
}

/* ============================================================
   Estado
   ============================================================ */
let customPalette = [];
let palette = [];
let currentPresetKey = 'custom';
let pid = 1;
let picks = [];
let pickId = 1;

/* ============================================================
   Persistencia local (localStorage) — sin fotos, solo paleta/estado
   ============================================================ */
function loadStorage(){
  try{
    const cp = localStorage.getItem(STORAGE_KEYS.customPalette);
    if(cp){
      const arr = JSON.parse(cp);
      customPalette = arr.map(p => ({id: pid++, name:p.name, brand:p.brand, hex:p.hex, active:p.active!==false}));
    }
  }catch(e){ console.warn('No se pudo leer la paleta guardada', e); }

  try{
    const pk = localStorage.getItem(STORAGE_KEYS.presetKey);
    if(pk && PRESETS[pk]) currentPresetKey = pk;
  }catch(e){ /* noop */ }
}
function saveCustomPalette(){
  try{
    const arr = customPalette.map(p=>({name:p.name, brand:p.brand, hex:p.hex, active:p.active}));
    localStorage.setItem(STORAGE_KEYS.customPalette, JSON.stringify(arr));
  }catch(e){ console.warn('No se pudo guardar la paleta', e); }
}
function savePresetKey(){
  try{ localStorage.setItem(STORAGE_KEYS.presetKey, currentPresetKey); }catch(e){ /* noop */ }
}
function loadActiveMap(){
  try{
    const raw = localStorage.getItem(STORAGE_KEYS.activeMap);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveActiveMapForPreset(key, pigmentsArr){
  try{
    const map = loadActiveMap();
    map[key] = {};
    pigmentsArr.forEach(p=>{ map[key][p.name] = p.active; });
    localStorage.setItem(STORAGE_KEYS.activeMap, JSON.stringify(map));
  }catch(e){ /* noop */ }
}
function applyStoredActive(key, pigmentsArr){
  const map = loadActiveMap();
  if(map[key]){
    pigmentsArr.forEach(p=>{ if(p.name in map[key]) p.active = map[key][p.name]; });
  }
  return pigmentsArr;
}

/* ============================================================
   Tabs genéricas
   ============================================================ */
document.querySelectorAll('.tabs').forEach(tabgroup=>{
  const btns = tabgroup.querySelectorAll('.tab-btn');
  btns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      btns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const panels = tabgroup.parentElement.querySelectorAll(':scope > .tab-panel');
      panels.forEach(p=>p.classList.remove('active'));
      const target = document.getElementById('tab-'+btn.dataset.tab);
      if(target) target.classList.add('active');
    });
  });
});

/* ============================================================
   Selector de paleta predefinida
   ============================================================ */
const presetSelect = document.getElementById('preset-select');
Object.keys(PRESETS).forEach(key=>{
  const opt = document.createElement('option'); opt.value=key; opt.textContent = PRESETS[key].label;
  presetSelect.appendChild(opt);
});
function applyPreset(key){
  currentPresetKey = key;
  presetSelect.value = key;
  document.getElementById('preset-desc').textContent = PRESETS[key].desc;
  document.getElementById('custom-editor').style.display = key==='custom' ? 'block' : 'none';
  if(key==='custom'){
    palette = customPalette;
  } else {
    palette = PRESETS[key].pigments.map(p=>({id:pid++, name:p.name, brand:p.brand, hex:p.hex, active:true}));
    applyStoredActive(key, palette);
  }
  savePresetKey();
  renderPalette();
}
presetSelect.addEventListener('change', ()=> applyPreset(presetSelect.value));

/* ============================================================
   Pestaña: Buscar marca
   ============================================================ */
const marcaSel = document.getElementById('buscar-marca');
const pigSel = document.getElementById('buscar-pigmento');
const buscarPreview = document.getElementById('buscar-preview');
const buscarInfo = document.getElementById('buscar-info');
Object.keys(BRAND_DB).forEach(brand=>{
  const opt = document.createElement('option'); opt.value=brand; opt.textContent=brand;
  marcaSel.appendChild(opt);
});
function refreshPigOptions(){
  pigSel.innerHTML='';
  Object.keys(BRAND_DB[marcaSel.value]).forEach(name=>{
    const opt = document.createElement('option'); opt.value=name; opt.textContent=name;
    pigSel.appendChild(opt);
  });
  refreshBuscarPreview();
}
function refreshBuscarPreview(){
  const hex = BRAND_DB[marcaSel.value][pigSel.value];
  buscarPreview.style.background = hex;
  buscarInfo.textContent = `${pigSel.value} — ${marcaSel.value} · ${hex}`;
}
marcaSel.addEventListener('change', refreshPigOptions);
pigSel.addEventListener('change', refreshBuscarPreview);
refreshPigOptions();
document.getElementById('buscar-add').addEventListener('click', ()=>{
  const hex = BRAND_DB[marcaSel.value][pigSel.value];
  addPigment(pigSel.value, marcaSel.value, hex);
});

/* ============================================================
   Pestaña: Manual
   ============================================================ */
document.getElementById('manual-add').addEventListener('click', ()=>{
  const name = document.getElementById('manual-nombre').value.trim() || 'Pigmento sin nombre';
  const brand = document.getElementById('manual-marca').value.trim();
  const hex = document.getElementById('manual-color').value;
  addPigment(name, brand, hex);
  document.getElementById('manual-nombre').value='';
  document.getElementById('manual-marca').value='';
});

/* ============================================================
   Pestaña: Foto automática (extracción del pomo sobre hoja blanca)
   ============================================================ */
const fotoCanvas = document.getElementById('foto-canvas');
const fotoCtx = fotoCanvas.getContext('2d', {willReadFrequently:true});
let fotoWhite = null, fotoSample = null, fotoImgLoaded=false;
let fotoClickMode = null;

function autoExtractFromCanvas(ctx, w, h){
  const data = ctx.getImageData(0,0,w,h).data;
  const n = w*h;
  const brightness = new Float32Array(n);
  for(let i=0;i<n;i++){
    const o=i*4;
    brightness[i] = (data[o]+data[o+1]+data[o+2])/3;
  }
  const sortedIdx = Array.from({length:n}, (_,i)=>i).sort((a,b)=>brightness[b]-brightness[a]);
  const whiteCount = Math.max(50, Math.floor(n*0.03));
  let wr=0,wg=0,wb=0;
  for(let k=0;k<whiteCount;k++){
    const o = sortedIdx[k]*4;
    wr+=data[o]; wg+=data[o+1]; wb+=data[o+2];
  }
  const white = {r:wr/whiteCount, g:wg/whiteCount, b:wb/whiteCount};
  let pr=0,pg=0,pb=0,pc=0;
  for(let i=0;i<n;i++){
    const o=i*4;
    const r=data[o], g=data[o+1], b=data[o+2];
    const sat = Math.max(r,g,b)-Math.min(r,g,b);
    const dark = brightness[i] < white.r*0.8;
    if(sat>18 || dark){ pr+=r; pg+=g; pb+=b; pc++; }
  }
  if(pc < n*0.01){
    const darkCount = Math.floor(n*0.15);
    pr=pg=pb=0;
    for(let k=n-darkCount;k<n;k++){
      const o = sortedIdx[k]*4;
      pr+=data[o]; pg+=data[o+1]; pb+=data[o+2];
    }
    pc = darkCount;
  }
  return { white, rawSample: {r:pr/pc, g:pg/pc, b:pb/pc} };
}

function loadImageFromFile(file, onReady){
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (ev)=>{
    const img = new Image();
    img.onload = ()=> onReady(img);
    img.onerror = ()=> alert('No se pudo leer esa imagen. Probá con otra foto.');
    img.src = ev.target.result;
  };
  reader.onerror = ()=> alert('No se pudo leer el archivo.');
  reader.readAsDataURL(file);
}

function handleFotoFile(file){
  loadImageFromFile(file, (img)=>{
    const ratio = Math.min(360/img.width, 260/img.height, 1);
    const w = Math.round(img.width*ratio), h = Math.round(img.height*ratio);
    fotoCanvas.width = w; fotoCanvas.height = h;
    fotoCtx.clearRect(0,0,w,h);
    fotoCtx.drawImage(img, 0, 0, w, h);
    fotoImgLoaded = true;
    const {white, rawSample} = autoExtractFromCanvas(fotoCtx, w, h);
    fotoWhite = white;
    fotoSample = rawSample;
    document.getElementById('foto-status').textContent = 'Color extraído automáticamente. Si no es correcto, usá los botones de abajo para corregir tocando la foto.';
    updateFotoChips();
  });
}
document.getElementById('foto-file').addEventListener('change', (e)=> handleFotoFile(e.target.files[0]));
document.getElementById('foto-file-camera').addEventListener('change', (e)=> handleFotoFile(e.target.files[0]));

document.getElementById('foto-fix-white').addEventListener('click', ()=>{ fotoClickMode = 'white'; setFotoModeButtons(); });
document.getElementById('foto-fix-color').addEventListener('click', ()=>{ fotoClickMode = 'color'; setFotoModeButtons(); });
function setFotoModeButtons(){
  document.getElementById('foto-fix-white').classList.toggle('active-mode', fotoClickMode==='white');
  document.getElementById('foto-fix-color').classList.toggle('active-mode', fotoClickMode==='color');
}
function fotoCanvasPointToPixel(clientX, clientY){
  const rect = fotoCanvas.getBoundingClientRect();
  const x = Math.round((clientX-rect.left) * (fotoCanvas.width/rect.width));
  const y = Math.round((clientY-rect.top) * (fotoCanvas.height/rect.height));
  return {x: Math.min(fotoCanvas.width-1, Math.max(0,x)), y: Math.min(fotoCanvas.height-1, Math.max(0,y))};
}
fotoCanvas.addEventListener('pointerup', (e)=>{
  if(!fotoImgLoaded || !fotoClickMode) return;
  const {x,y} = fotoCanvasPointToPixel(e.clientX, e.clientY);
  const px = fotoCtx.getImageData(x,y,1,1).data;
  const rgb = {r:px[0], g:px[1], b:px[2]};
  if(fotoClickMode==='white') fotoWhite = rgb; else fotoSample = rgb;
  fotoClickMode = null;
  setFotoModeButtons();
  updateFotoChips();
});
function updateFotoChips(){
  const wc = document.getElementById('foto-white-chip');
  const wt = document.getElementById('foto-white-txt');
  const sc = document.getElementById('foto-sample-chip');
  const st = document.getElementById('foto-sample-txt');
  if(fotoWhite){ wc.style.background = rgbToHex(fotoWhite.r,fotoWhite.g,fotoWhite.b); wt.textContent = rgbToHex(fotoWhite.r,fotoWhite.g,fotoWhite.b); }
  else { wc.style.background='#3a352c'; wt.textContent='—'; }
  if(fotoWhite && fotoSample){
    const bal = whiteBalance(fotoSample, fotoWhite);
    sc.style.background = rgbToHex(bal.r,bal.g,bal.b);
    st.textContent = rgbToHex(bal.r,bal.g,bal.b);
  } else { sc.style.background='#3a352c'; st.textContent='—'; }
}
document.getElementById('foto-add').addEventListener('click', ()=>{
  if(!fotoSample){ alert('Subí primero una foto del pomo sobre hoja blanca.'); return; }
  const name = document.getElementById('foto-nombre').value.trim() || 'Pigmento sin nombre';
  const brand = document.getElementById('foto-marca').value.trim();
  const rgb = fotoWhite ? whiteBalance(fotoSample, fotoWhite) : fotoSample;
  addPigment(name, brand, rgbToHex(rgb.r,rgb.g,rgb.b));
  document.getElementById('foto-nombre').value=''; document.getElementById('foto-marca').value='';
  fotoWhite=null; fotoSample=null; fotoImgLoaded=false;
  fotoCtx.clearRect(0,0,fotoCanvas.width,fotoCanvas.height);
  document.getElementById('foto-status').textContent = 'Subí la foto: el color se extrae automáticamente detectando el área de pintura sobre el blanco de la hoja.';
  updateFotoChips();
});

/* ============================================================
   Paleta: alta / baja / render
   ============================================================ */
function addPigment(name, brand, hex){
  const p = {id: pid++, name, brand, hex, active:true};
  if(currentPresetKey==='custom'){
    customPalette.push(p); palette = customPalette; saveCustomPalette();
  } else {
    palette.push(p);
  }
  renderPalette();
}
function removePigment(id){
  palette = palette.filter(p=>p.id!==id);
  if(currentPresetKey==='custom'){ customPalette = palette; saveCustomPalette(); }
  renderPalette();
}
function renderPalette(){
  const grid = document.getElementById('lib-grid');
  const empty = document.getElementById('lib-empty');
  grid.innerHTML='';
  empty.style.display = palette.length===0 ? 'block' : 'none';
  palette.forEach(p=>{
    const card = document.createElement('div');
    card.className='pigcard';
    card.innerHTML = `
      <div class="swatch" style="background:${p.hex};"></div>
      <div class="info">
        <div class="name">${escapeHtml(p.name)}</div>
        <div class="brand">${p.brand && p.brand!=='—' ? escapeHtml(p.brand) : 'Sin marca'}</div>
      </div>
      <div class="ctrl">
        <label><input type="checkbox" ${p.active?'checked':''} data-id="${p.id}" class="chk-active"> Disponible</label>
        <button class="del" data-id="${p.id}" type="button" aria-label="Quitar">✕</button>
      </div>
    `;
    grid.appendChild(card);
  });
  grid.querySelectorAll('.chk-active').forEach(chk=>{
    chk.addEventListener('change', (e)=>{
      const id = Number(e.target.dataset.id);
      const p = palette.find(pp=>pp.id===id);
      p.active = e.target.checked;
      if(currentPresetKey==='custom') saveCustomPalette();
      else saveActiveMapForPreset(currentPresetKey, palette);
    });
  });
  grid.querySelectorAll('.del').forEach(btn=>{
    btn.addEventListener('click', (e)=> removePigment(Number(e.target.dataset.id)));
  });
  document.getElementById('recalc-all').hidden = picks.length===0;
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

/* ============================================================
   Foto de referencia + gotero táctil con lupa
   ============================================================ */
const targetCanvas = document.getElementById('target-canvas');
const targetCtx = targetCanvas.getContext('2d', {willReadFrequently:true});
const targetWrap = document.getElementById('target-photo-wrap');
const targetEmpty = document.getElementById('target-empty');
let targetImgLoaded = false;

function handleTargetFile(file){
  loadImageFromFile(file, (img)=>{
    const maxW = 900, maxH = 560;
    const ratio = Math.min(maxW/img.width, maxH/img.height, 1);
    const w = Math.round(img.width*ratio), h = Math.round(img.height*ratio);
    targetCanvas.width = w; targetCanvas.height = h;
    targetCtx.clearRect(0,0,w,h);
    targetCtx.drawImage(img, 0, 0, w, h);
    targetImgLoaded = true;
    targetEmpty.style.display = 'none';
  });
}
document.getElementById('target-file').addEventListener('change', (e)=> handleTargetFile(e.target.files[0]));
document.getElementById('target-file-camera').addEventListener('change', (e)=> handleTargetFile(e.target.files[0]));

// --- lupa ---
const loupe = document.getElementById('loupe');
let loupeCanvas = document.createElement('canvas');
loupeCanvas.width = 208; loupeCanvas.height = 208;
loupeCanvas.style.width='100%'; loupeCanvas.style.height='100%';
loupe.appendChild(loupeCanvas);
const loupeCtx = loupeCanvas.getContext('2d');
const LOUPE_ZOOM = 3.2;

function targetPointToPixel(clientX, clientY){
  const rect = targetCanvas.getBoundingClientRect();
  const x = (clientX-rect.left) * (targetCanvas.width/rect.width);
  const y = (clientY-rect.top) * (targetCanvas.height/rect.height);
  return {
    x: Math.min(targetCanvas.width-1, Math.max(0, Math.round(x))),
    y: Math.min(targetCanvas.height-1, Math.max(0, Math.round(y)))
  };
}
function showLoupeAt(clientX, clientY, imgX, imgY){
  const wrapRect = targetWrap.getBoundingClientRect();
  loupe.style.left = (clientX - wrapRect.left) + 'px';
  loupe.style.top = (clientY - wrapRect.top) + 'px';
  loupe.hidden = false;

  const srcSize = loupeCanvas.width / LOUPE_ZOOM;
  const sx = Math.min(Math.max(0, imgX - srcSize/2), targetCanvas.width - srcSize);
  const sy = Math.min(Math.max(0, imgY - srcSize/2), targetCanvas.height - srcSize);
  loupeCtx.imageSmoothingEnabled = false;
  loupeCtx.clearRect(0,0,loupeCanvas.width, loupeCanvas.height);
  loupeCtx.drawImage(targetCanvas, sx, sy, srcSize, srcSize, 0, 0, loupeCanvas.width, loupeCanvas.height);
  // crosshair
  loupeCtx.strokeStyle = 'rgba(255,255,255,0.9)';
  loupeCtx.lineWidth = 1;
  const cx = loupeCanvas.width/2, cy = loupeCanvas.height/2;
  loupeCtx.beginPath();
  loupeCtx.moveTo(cx-9,cy); loupeCtx.lineTo(cx+9,cy);
  loupeCtx.moveTo(cx,cy-9); loupeCtx.lineTo(cx,cy+9);
  loupeCtx.stroke();
}
function hideLoupe(){ loupe.hidden = true; }

let pointerActive = false;
let lastImgPoint = null;
let startClient = null;
let moved = false;

targetCanvas.addEventListener('pointerdown', (e)=>{
  if(!targetImgLoaded) return;
  e.preventDefault();
  targetCanvas.setPointerCapture(e.pointerId);
  pointerActive = true; moved = false;
  startClient = {x:e.clientX, y:e.clientY};
  const {x,y} = targetPointToPixel(e.clientX, e.clientY);
  lastImgPoint = {x,y};
  if(e.pointerType === 'touch'){
    showLoupeAt(e.clientX, e.clientY, x, y);
  }
  previewAtPixel(x,y);
});
targetCanvas.addEventListener('pointermove', (e)=>{
  if(!pointerActive || !targetImgLoaded) return;
  e.preventDefault();
  if(Math.hypot(e.clientX-startClient.x, e.clientY-startClient.y) > 4) moved = true;
  const {x,y} = targetPointToPixel(e.clientX, e.clientY);
  lastImgPoint = {x,y};
  if(e.pointerType === 'touch'){
    showLoupeAt(e.clientX, e.clientY, x, y);
  }
  previewAtPixel(x,y);
});
function endPointer(e){
  if(!pointerActive) return;
  pointerActive = false;
  hideLoupe();
  if(lastImgPoint){
    const px = targetCtx.getImageData(lastImgPoint.x, lastImgPoint.y, 1, 1).data;
    const hex = rgbToHex(px[0],px[1],px[2]);
    document.getElementById('cursor-preview').style.background = hex;
    document.getElementById('cursor-hex').textContent = hex.toUpperCase();
    addPick(hex);
  }
}
targetCanvas.addEventListener('pointerup', endPointer);
targetCanvas.addEventListener('pointercancel', ()=>{ pointerActive=false; hideLoupe(); });
targetCanvas.addEventListener('contextmenu', (e)=> e.preventDefault());

function previewAtPixel(x,y){
  const px = targetCtx.getImageData(x,y,1,1).data;
  const hex = rgbToHex(px[0],px[1],px[2]);
  document.getElementById('cursor-preview').style.background = hex;
  document.getElementById('cursor-hex').textContent = hex.toUpperCase();
}

document.getElementById('manual-target-add').addEventListener('click', ()=>{
  addPick(document.getElementById('target-color-input').value);
});
document.getElementById('recalc-all').addEventListener('click', ()=>{
  picks.forEach(p=>{
    const active = palette.filter(pg=>pg.active);
    p.active = active;
    p.result = optimizeMix(hexToRgb(p.hex), active);
  });
  renderPicks();
});

function addPick(hex){
  const active = palette.filter(p=>p.active);
  if(active.length===0){ alert('Agregá y activá al menos un pigmento en tu paleta primero.'); return; }
  const targetRgb = hexToRgb(hex);
  const result = optimizeMix(targetRgb, active);
  picks.unshift({id: pickId++, hex, active, result});
  renderPicks();
  document.getElementById('recalc-all').hidden = false;
}
function removePick(id){
  picks = picks.filter(p=>p.id!==id);
  renderPicks();
  document.getElementById('recalc-all').hidden = picks.length===0;
}
function renderPicks(){
  const list = document.getElementById('picks-list');
  const empty = document.getElementById('picks-empty');
  list.innerHTML='';
  empty.style.display = picks.length===0 ? 'block' : 'none';
  picks.forEach(pick=>{
    const row = document.createElement('div');
    row.className = 'pick-row';
    const targetCol = document.createElement('div');
    targetCol.className = 'pick-target';
    targetCol.innerHTML = `<div class="sw" style="background:${pick.hex};"></div><div class="hex">${pick.hex.toUpperCase()}</div>`;
    const arrow = document.createElement('div');
    arrow.className = 'pick-arrow';
    arrow.textContent = '→';
    const recipeCol = document.createElement('div');
    recipeCol.className = 'pick-recipe';
    let html = `<button class="pick-del" data-id="${pick.id}" type="button">quitar ✕</button>`;
    const mixedHex = rgbToHex(pick.result.mixedRgb.r, pick.result.mixedRgb.g, pick.result.mixedRgb.b);
    const items = pick.active.map((p,i)=>({p, w:pick.result.weights[i]}))
      .filter(o=>o.w>0.001).sort((a,b)=>b.w-a.w);
    items.forEach(o=>{
      const pct = Math.round(o.w*1000)/10;
      html += `<div class="rline"><div class="dot" style="background:${o.p.hex};"></div>${escapeHtml(o.p.name)}<b>${pct}%</b></div>`;
    });
    html += `<div class="rmeta">Resultado estimado ${mixedHex.toUpperCase()} · mezcla <span class="estimate-flag">${matchLabel(pick.result.dist)}</span> (no es una fórmula exacta — ajustá a ojo al pintar)</div>`;
    recipeCol.innerHTML = html;
    row.appendChild(targetCol);
    row.appendChild(arrow);
    row.appendChild(recipeCol);
    list.appendChild(row);
  });
  list.querySelectorAll('.pick-del').forEach(btn=>{
    btn.addEventListener('click', (e)=> removePick(Number(e.target.dataset.id)));
  });
}

/* ============================================================
   Init
   ============================================================ */
loadStorage();
if(currentPresetKey==='custom'){
  palette = customPalette;
  presetSelect.value = 'custom';
  document.getElementById('preset-desc').textContent = PRESETS.custom.desc;
} else {
  applyPreset(currentPresetKey);
}
renderPalette();
renderPicks();

/* ============================================================
   Service worker (PWA) — offline para interfaz y motor de mezcla
   ============================================================ */
if('serviceWorker' in navigator){
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('sw.js').catch(err=>{
      console.warn('No se pudo registrar el service worker', err);
    });
  });
}
