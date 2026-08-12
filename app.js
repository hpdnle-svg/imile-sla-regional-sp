const FIELD_ALIASES = {
  tracking: ["Número da Etiqueta", "Numero da Etiqueta", "Tracking Number", "Waybill", "AWB"],
  status: ["Último status", "Ultimo status", "Status"],
  base: ["Station", "Base de recebimento", "Última estação de leitura"],
  driver: ["Motorista", "Nome do Motorista de Coleta"],
  dsp: ["Fornecedor do condutor", "Kwai Vendedor da última milha"],
  occurrenceType: ["Último tipo de insucesso", "Ultimo tipo de insucesso"],
  occurrenceReason: ["Último motivo do insucesso", "Ultimo motivo do insucesso"],
  deliveryTime: ["Horário de entrega", "Horario de entrega", "Tempo de entrega"],
  createdTime: ["Hora de Criação", "Hora de Criacao"]
};

// EDITE AQUI UMA ÚNICA VEZ PARA VINCULAR CADA BASE AO SUPERVISOR.
// Exemplo: "DS VLM": "Nome do Supervisor"
const BASE_SUPERVISORS = {
  "DS VLM": "",
  "DS JDP": "",
  "DS MBI": "",
  "DS GRUI": "",
  "DS PSC": "",
  "DS LBD": "",
  "DS IPR": "",
  "DS ACM": "",
  "DS BLV": "",
  "DS CDR": "",
  "DS SVT": "",
  "DS CPC": "",
  "DS FGO": "",
  "DS ATB": ""
};

let rawRows = [];
let filteredRows = [];
let charts = {};
let activeView = "dashboard";

const $ = id => document.getElementById(id);
const normalize = v => String(v ?? "").trim();
const lower = v => normalize(v).toLocaleLowerCase("pt-BR");

Chart.defaults.color = "#91a6c7";
Chart.defaults.borderColor = "rgba(148,174,217,.10)";
Chart.defaults.font.family = 'Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif';

function resolveColumn(headers, aliases) {
  const exact = aliases.find(alias => headers.includes(alias));
  if (exact) return exact;
  const map = new Map(headers.map(h => [lower(h), h]));
  for (const alias of aliases) if (map.has(lower(alias))) return map.get(lower(alias));
  return null;
}
function buildFieldMap(rows) {
  const headers = rows.length ? Object.keys(rows[0]) : [];
  return Object.fromEntries(Object.entries(FIELD_ALIASES).map(([k,a]) => [k, resolveColumn(headers,a)]));
}
function standardize(rows) {
  const f = buildFieldMap(rows);
  return rows.filter(row => Object.values(row).some(v => normalize(v) !== "")).map((row,index)=>({
    _row:index+2,
    tracking:normalize(row[f.tracking]),
    status:normalize(row[f.status]),
    base:normalize(row[f.base]),
    driver:normalize(row[f.driver]),
    dsp:normalize(row[f.dsp]),
    occurrenceType:normalize(row[f.occurrenceType]),
    occurrenceReason:normalize(row[f.occurrenceReason]),
    deliveryTime:row[f.deliveryTime] ?? "",
    createdTime:row[f.createdTime] ?? "",
    original:row
  })).filter(r=>r.tracking || r.status || r.base);
}
const isDelivered = r => lower(r.status) === "entregue";
const isRoute = r => lower(r.status).includes("rota de entrega");
const pctNum = (v,t) => t ? (v/t*100) : 0;
const pct = (v,t) => `${pctNum(v,t).toFixed(1).replace(".",",")}%`;
const supervisorFor = base => BASE_SUPERVISORS[base] || "Não definido";
const uniqueSorted = (rows,key) => [...new Set(rows.map(r=>r[key]).filter(Boolean))].sort((a,b)=>a.localeCompare(b,"pt-BR"));

function escapeHtml(v) {
  return String(v ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
}
function countBy(rows,key) {
  const m = new Map();
  for (const r of rows) {
    const v = normalize(r[key]) || "(vazio)";
    m.set(v,(m.get(v)||0)+1);
  }
  return [...m.entries()].sort((a,b)=>b[1]-a[1]);
}
function fillSelect(id, values, firstLabel) {
  const el=$(id), old=el.value;
  el.innerHTML=`<option value="">${firstLabel}</option>`+values.map(v=>`<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`).join("");
  if(values.includes(old)) el.value=old;
}
function populateFilters() {
  const bases=uniqueSorted(rawRows,"base");
  fillSelect("filterBase",bases,"Todas as bases");
  fillSelect("printBaseSelect",bases,"Selecione uma base");
  fillSelect("driverBaseSelect",bases,"Selecione uma base");
  fillSelect("filterDsp",uniqueSorted(rawRows,"dsp"),"Todos os DSPs");
  fillSelect("filterDriver",uniqueSorted(rawRows,"driver"),"Todos os motoristas");
  fillSelect("filterStatus",uniqueSorted(rawRows,"status"),"Todos os status");
}
function applyFilters() {
  const f={base:$("filterBase").value,dsp:$("filterDsp").value,driver:$("filterDriver").value,status:$("filterStatus").value};
  filteredRows=rawRows.filter(r=>
    (!f.base||r.base===f.base)&&(!f.dsp||r.dsp===f.dsp)&&(!f.driver||r.driver===f.driver)&&(!f.status||r.status===f.status)
  );
  $("supervisorName").textContent = f.base ? supervisorFor(f.base) : "Regional SP";
  renderDashboard();
}
function destroyChart(name){ if(charts[name]){charts[name].destroy();delete charts[name];} }

function renderKpis() {
  const total=filteredRows.length, delivered=filteredRows.filter(isDelivered).length, route=filteredRows.filter(isRoute).length, nd=total-delivered;
  $("kpiTotal").textContent=total.toLocaleString("pt-BR");
  $("kpiDelivered").textContent=delivered.toLocaleString("pt-BR");
  $("kpiRoute").textContent=route.toLocaleString("pt-BR");
  $("kpiPending").textContent=nd.toLocaleString("pt-BR");
  $("kpiDeliveredPct").textContent=pct(delivered,total);
  $("kpiRoutePct").textContent=pct(route,total);
  $("kpiPendingPct").textContent=pct(nd,total);
}
function renderBasePerformanceChart() {
  destroyChart("basePerformance");
  const bases=countBy(filteredRows.filter(r=>r.base),"base").slice(0,12).map(x=>x[0]);
  $("baseCount").textContent=`${uniqueSorted(filteredRows,"base").length} bases`;
  const delivered=bases.map(b=>filteredRows.filter(r=>r.base===b&&isDelivered(r)).length);
  const notDelivered=bases.map(b=>filteredRows.filter(r=>r.base===b&&!isDelivered(r)).length);
  charts.basePerformance=new Chart($("chartBasePerformance"),{
    type:"bar",
    data:{labels:bases,datasets:[
      {label:"Entregues",data:delivered,backgroundColor:"rgba(53,211,154,.82)",borderRadius:6},
      {label:"Não entregues",data:notDelivered,backgroundColor:"rgba(255,189,74,.82)",borderRadius:6}
    ]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{position:"bottom"}},scales:{
      x:{stacked:false,grid:{display:false}},
      y:{stacked:false,beginAtZero:true,grid:{color:"rgba(148,174,217,.08)"}}
    }}
  });
}
function renderStatusChart() {
  destroyChart("status");
  const data=countBy(filteredRows,"status").slice(0,8);
  charts.status=new Chart($("chartStatus"),{
    type:"doughnut",
    data:{labels:data.map(x=>x[0]),datasets:[{data:data.map(x=>x[1]),backgroundColor:["#35d39a","#2c7dff","#ffbd4a","#9b7bff","#ff6b72","#49c5b6","#7e9cc4","#d58fff"],borderColor:"#0c1b32",borderWidth:3}]},
    options:{responsive:true,maintainAspectRatio:false,cutout:"66%",plugins:{legend:{position:"bottom",labels:{boxWidth:10,padding:14}}}}
  });
}
function hourFromValue(v) {
  if(!v) return null;
  if(v instanceof Date && !isNaN(v)) return v.getHours();
  const s=String(v);
  const match=s.match(/(?:\s|T)(\d{1,2}):(\d{2})(?::\d{2})?/);
  if(match) return Number(match[1]);
  const d=new Date(v);
  return isNaN(d)?null:d.getHours();
}
function renderHourlyChart() {
  destroyChart("hourly");
  const delivered=filteredRows.filter(isDelivered);
  const hours=Array.from({length:24},(_,i)=>i);
  const values=hours.map(h=>delivered.filter(r=>hourFromValue(r.deliveryTime)===h).length);
  const first=values.findIndex(v=>v>0);
  let last=values.length-1; while(last>=0 && values[last]===0) last--;
  const start=first>=0?Math.max(0,first-1):0, end=last>=0?Math.min(23,last+1):23;
  const labels=hours.slice(start,end+1).map(h=>`${String(h).padStart(2,"0")}:00`);
  const data=values.slice(start,end+1);
  $("hourlyTotal").textContent=`${data.reduce((a,b)=>a+b,0)} baixas`;
  charts.hourly=new Chart($("chartHourly"),{
    type:"line",
    data:{labels,datasets:[{label:"Baixas",data,fill:true,backgroundColor:"rgba(44,125,255,.14)",borderColor:"#5aa0ff",tension:.28,pointRadius:4,pointHoverRadius:6}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{
      legend:{display:false},
      tooltip:{callbacks:{label:ctx=>`${ctx.parsed.y} baixas`}}
    },scales:{
      x:{grid:{display:false}},
      y:{beginAtZero:true,ticks:{precision:0},grid:{color:"rgba(148,174,217,.08)"}}
    }}
  });
}
function renderOccurrences() {
  const counts=new Map();
  for(const r of filteredRows.filter(r=>r.occurrenceReason||r.occurrenceType)){
    const k=r.occurrenceReason||r.occurrenceType; counts.set(k,(counts.get(k)||0)+1);
  }
  const data=[...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,8), el=$("occurrences");
  if(!data.length){el.className="ranking empty-state";el.textContent="Nenhuma ocorrência encontrada.";return;}
  el.className="ranking";
  el.innerHTML=data.map(([n,v])=>`<div class="rank-row"><div class="rank-name">${escapeHtml(n)}</div><div class="rank-value">${v}</div></div>`).join("");
}
function renderDashboard(){ renderKpis();renderBasePerformanceChart();renderStatusChart();renderHourlyChart();renderOccurrences(); }

function renderBasePrint(base) {
  const rows=rawRows.filter(r=>r.base===base), total=rows.length, delivered=rows.filter(isDelivered).length, route=rows.filter(isRoute).length, nd=total-delivered;
  $("printBaseTitle").textContent=base||"Selecione uma base";
  $("printBaseSupervisor").textContent=supervisorFor(base);
  $("printBaseDate").textContent=new Date().toLocaleDateString("pt-BR");
  $("printBaseTotal").textContent=total;
  $("printBaseDelivered").textContent=delivered;
  $("printBaseDeliveredPct").textContent=pct(delivered,total);
  $("printBaseNotDelivered").textContent=nd;
  $("printBaseNotDeliveredPct").textContent=pct(nd,total);
  $("printBaseRoute").textContent=route;

  const statuses=countBy(rows,"status");
  $("baseStatusTable").innerHTML=statuses.length?statuses.map(([s,n])=>`<tr><td>${escapeHtml(s)}</td><td>${n}</td><td>${pct(n,total)}</td></tr>`).join(""):`<tr><td colspan="3">Selecione uma base</td></tr>`;

  destroyChart("printBaseStatus");
  charts.printBaseStatus=new Chart($("chartPrintBaseStatus"),{
    type:"bar",
    data:{labels:statuses.map(x=>x[0]),datasets:[{label:"Quantidade",data:statuses.map(x=>x[1]),backgroundColor:"rgba(44,125,255,.78)",borderRadius:6}]},
    options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{
      x:{beginAtZero:true,ticks:{precision:0}},y:{grid:{display:false}}
    }}
  });
}
function renderDriversPrint(base) {
  const rows=rawRows.filter(r=>r.base===base), total=rows.length, deliveredTotal=rows.filter(isDelivered).length;
  const grouped=new Map();
  for(const r of rows.filter(r=>r.driver)){
    if(!grouped.has(r.driver)) grouped.set(r.driver,{total:0,delivered:0});
    const g=grouped.get(r.driver); g.total++; if(isDelivered(r)) g.delivered++;
  }
  const offenders=[...grouped.entries()].map(([driver,g])=>({
    driver,total:g.total,delivered:g.delivered,missing:g.total-g.delivered
  })).filter(x=>x.missing>0).sort((a,b)=>b.missing-a.missing || pctNum(b.missing,b.total)-pctNum(a.missing,a.total));

  $("driverPrintTitle").textContent=base||"Selecione uma base";
  $("driverPrintSupervisor").textContent=supervisorFor(base);
  $("driverPrintDate").textContent=new Date().toLocaleDateString("pt-BR");
  $("offenderCount").textContent=offenders.length;
  $("offenderMissing").textContent=offenders.reduce((a,b)=>a+b.missing,0);
  $("offenderDelivered").textContent=deliveredTotal;
  $("offenderPerformance").textContent=pct(deliveredTotal,total);
  $("offenderTable").innerHTML=offenders.length?offenders.map((o,i)=>`
    <tr>
      <td>${i+1}</td><td>${escapeHtml(o.driver)}</td><td>${o.total}</td><td>${o.delivered}</td>
      <td>${o.missing}</td><td>${pct(o.missing,o.total)}</td><td>${pct(o.delivered,o.total)}</td>
    </tr>`).join(""):`<tr><td colspan="7">Nenhum motorista com pendência para a base selecionada.</td></tr>`;
}

document.querySelectorAll(".view-tab").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".view-tab").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
  btn.classList.add("active"); activeView=btn.dataset.view;
  const map={dashboard:"dashboardView",baseprint:"basePrintView",driversprint:"driversPrintView"};
  $(map[activeView]).classList.add("active");
  if(activeView==="baseprint") renderBasePrint($("printBaseSelect").value);
  if(activeView==="driversprint") renderDriversPrint($("driverBaseSelect").value);
}));

$("fileInput").addEventListener("change",async e=>{
  const file=e.target.files?.[0]; if(!file)return;
  try{
    const buffer=await file.arrayBuffer();
    const wb=XLSX.read(buffer,{type:"array",cellDates:true});
    const rows=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],{defval:""});
    rawRows=standardize(rows);filteredRows=rawRows;populateFilters();renderDashboard();
    $("lastUpdate").textContent=new Date().toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"});
  }catch(err){console.error(err);alert("Não foi possível ler o Excel.");}
});
["filterBase","filterDsp","filterDriver","filterStatus"].forEach(id=>$(id).addEventListener("change",applyFilters));
$("clearFilters").addEventListener("click",()=>{["filterBase","filterDsp","filterDriver","filterStatus"].forEach(id=>$(id).value="");applyFilters();});
$("printBaseSelect").addEventListener("change",e=>renderBasePrint(e.target.value));
$("driverBaseSelect").addEventListener("change",e=>renderDriversPrint(e.target.value));
async function saveAreaAsPng(areaId, filename) {
  const area = $(areaId);
  if (!area) return;

  try {
    document.body.classList.add("saving-image");

    // Chart.js redraws can be sensitive to capture timing.
    await new Promise(resolve => setTimeout(resolve, 120));

    const canvas = await html2canvas(area, {
      backgroundColor: "#07101f",
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: area.scrollWidth,
      windowHeight: area.scrollHeight
    });

    const link = document.createElement("a");
    link.download = filename;
    link.href = canvas.toDataURL("image/png", 1.0);
    link.click();
  } catch (err) {
    console.error(err);
    alert("Não foi possível gerar a imagem. Tente novamente.");
  } finally {
    document.body.classList.remove("saving-image");
  }
}

$("saveBaseImageBtn").addEventListener("click", () => {
  const base = $("printBaseSelect").value || "base";
  saveAreaAsPng("baseCaptureArea", `iMile_Resumo_${base.replaceAll(" ","_")}.png`);
});

$("saveDriversImageBtn").addEventListener("click", () => {
  const base = $("driverBaseSelect").value || "base";
  saveAreaAsPng("driversCaptureArea", `iMile_Ofensores_${base.replaceAll(" ","_")}.png`);
});
