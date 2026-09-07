let characters=[];

const $=s=>document.querySelector(s);

async function load(){
 try{
   characters=await fetch("data/characters.json").then(r=>r.json());
 }catch(e){
   characters=[];
 }
 buildSeries();
 render();
 showcase();
}

function buildSeries(){
 const list=[...new Set(characters.map(c=>c.series))].sort();
 $("#series").innerHTML='<option value="all">All series</option>'+
   list.map(x=>`<option value="${esc(x)}">${esc(x)}</option>`).join("");
}

function filtered(){
 const q=$("#search").value.toLowerCase().trim();
 const s=$("#series").value;
 return characters.filter(c =>
   (!q || `${c.name} ${c.series} ${c.element} ${c.weapon} ${c.role}`.toLowerCase().includes(q)) &&
   (s==="all" || c.series===s)
 );
}

function safeImage(c){
 if(!c.image)return "";
 return `<img src="${esc(c.image)}" alt="${esc(c.name)}"
 onerror="this.style.display='none';this.nextElementSibling.style.display='grid'">`;
}

function art(c){
 return `<div class="art">
   ${safeImage(c)}
   <div class="placeholder" style="display:${c.image?'none':'grid'}">${esc((c.name||"?")[0])}</div>
   <span class="rarity">${"★".repeat(c.rarity||1)}</span>
 </div>`;
}

function card(c){
 return `<article class="card" onclick="openChar('${esc(c.id)}')">
   ${art(c)}
   <div class="info">
     <div><strong>${esc(c.name)}</strong><small>${esc(c.series)}</small></div>
     <em>${esc(c.element||"")}</em>
   </div>
 </article>`;
}

function render(){
 const x=filtered();
 $("#count").textContent=x.length+" results";
 $("#grid").innerHTML=x.map(card).join("") ||
   '<div class="empty">No characters found.</div>';
}

function showcase(){
 $("#showcase").innerHTML=characters.slice(0,3).map(c=>
   `<div class="card" onclick="openChar('${esc(c.id)}')">
     ${art(c)}
     <div class="info"><div><strong>${esc(c.name)}</strong><small>${esc(c.series)}</small></div></div>
   </div>`
 ).join("");
}

function openChar(id){
 const c=characters.find(x=>x.id===id);
 if(!c)return;
 $("#modalContent").innerHTML=`
 <div class="modalBox">
   <div>
     ${safeImage(c)}
     <div class="fallbackBig" style="display:${c.image?'none':'grid'}">${esc((c.name||"?")[0])}</div>
   </div>
   <div>
     <div class="eyebrow">${esc(c.series)}</div>
     <h2>${esc(c.name)}</h2>
     <div class="tags">
       <span>${c.rarity||1}★</span>
       <span>${esc(c.element||"")}</span>
       <span>${esc(c.weapon||"")}</span>
       <span>${esc(c.role||"")}</span>
     </div>
     <p>${esc(c.description||"")}</p>
   </div>
 </div>`;
 $("#modal").classList.remove("hidden");
}

function esc(v){
 return String(v??"").replace(/[&<>"']/g,m=>({
   "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
 }[m]));
}

$("#search").addEventListener("input",render);
$("#series").addEventListener("change",render);
$("#close").onclick=()=>$("#modal").classList.add("hidden");
$("#modal").onclick=e=>{
 if(e.target.id==="modal")$("#modal").classList.add("hidden");
};

load();