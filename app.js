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

// MAPA OFICIAL BASE → SUPERVISOR
const BASE_SUPERVISORS = {
  "DS PIX": "Andre Luis Silveira Pinheiro",
  "DS AIF": "José Henrique",
  "TP BRA 2": "",
  "DS VTP": "Jose Lucas de Freitas Carvalho",
  "DS CPQ": "Andre Luis Silveira Pinheiro",
  "DS JDP": "Daniel Da Silva Coutinho",
  "CDC-SP": "",
  "DS TBT": "Nelson de Siqueira",
  "DS SPL": "Dennis Pereira dos Santos",
  "TP STS": "",
  "DS SAM": "Eduardo Mendes Rocha",
  "DS OUR": "José Henrique",
  "DS GJU": "Carlos Augusto Oliveira Teixeira",
  "DS JAU": "José Henrique",
  "DS PSD": "Jose Lucas de Freitas Carvalho",
  "DS MOG": "Cassio Cesar Ferreira",
  "DS TAMI": "Jefferson Silva Trevizan",
  "DS BUXI": "José Henrique",
  "DS SBD": "Carlos Augusto Oliveira Teixeira",
  "DS RBI": "Dennis Pereira dos Santos",
  "DS VRI": "",
  "DS ITE": "Alex Dantas Marçal",
  "DS MCC": "Gustavo Vilares de Souza",
  "DS PMB": "Nelson de Siqueira",
  "DS RBT": "Renan Burger da Silva",
  "DS AVR": "José Henrique",
  "DS IND": "Valber Da Silva Santos",
  "DS MGI": "Cassio Cesar Ferreira",
  "RDC-SP2": "",
  "DS FRC": "Renan Burger da Silva",
  "DS SFS": "Jose Lucas de Freitas Carvalho",
  "DS STZ": "Renan Burger da Silva",
  "DS IPR": "Daniel Da Silva Coutinho",
  "DS VZP": "Valber Da Silva Santos",
  "DS BTV": "Felippe Campos Vieira da Silva",
  "DS VLM": "Daniel Da Silva Coutinho",
  "Drop PQI": "",
  "DS SJP": "Jose Lucas de Freitas Carvalho",
  "DS IGA": "Felippe Campos Vieira da Silva",
  "DS UBT": "Nelson de Siqueira",
  "DS JER": "Leonardo Oliveira da Silva Bezerra",
  "DS CTD": "Jose Lucas de Freitas Carvalho",
  "DS TAS": "Leonardo Oliveira da Silva Bezerra",
  "RDC-RJ1": "",
  "RDC-MG1": "",
  "DS GPG": "Jefferson Silva Trevizan",
  "DS MRA": "José Henrique",
  "DS JIR": "Dennis Pereira dos Santos",
  "DS EBG": "Jefferson Silva Trevizan",
  "DS GUA": "Eduardo Mendes Rocha",
  "DS VLB": "Eduardo Mendes Rocha",
  "DS GLS": "Eduardo Mendes Rocha",
  "DS BER": "Bruno Souza Da Silva",
  "DS CQL": "Felippe Campos Vieira da Silva",
  "DS SCP": "Alex Gomes da Silva Cunha",
  "Drop SOR 6": "",
  "DS AQR": "Willian Gabriel Guedes de Brito Magalhaes",
  "DS CTI": "Alex Dantas Marçal",
  "DS RCA": "Cassio Cesar Ferreira",
  "DS PIB": "Andre Luis Silveira Pinheiro",
  "DS PQR": "Jefferson Silva Trevizan",
  "DS AMN": "Carlos Augusto Oliveira Teixeira",
  "DS BJP": "Alex Gomes da Silva Cunha",
  "DS SVT": "Daniel Rubio Tavares",
  "DS JIP": "Eduardo Mendes Rocha",
  "DS SBC": "Daniel Rubio Tavares",
  "DS SAS": "Daniel Rubio Tavares",
  "DS SBB": "Carlos Augusto Oliveira Teixeira",
  "DS MLV": "",
  "DS MSL": "Alex Gomes da Silva Cunha",
  "DS VAR": "Bruno Souza Da Silva",
  "DS SRQ": "Alex Dantas Marçal",
  "DS SVM": "Leonardo Oliveira da Silva Bezerra",
  "DS SUZ": "Cassio Cesar Ferreira",
  "DS RCL": "Gustavo Vilares de Souza",
  "DS SCL": "Willian Gabriel Guedes de Brito Magalhaes",
  "DS FCR": "Valber Da Silva Santos",
  "DS SLT": "Valber Da Silva Santos",
  "DS CPJ": "Nelson de Siqueira",
  "DS TAI": "Felippe Campos Vieira da Silva",
  "DS NOV": "Andre Luis Silveira Pinheiro",
  "DS ATB": "Alex Gomes da Silva Cunha",
  "DS MGN": "Gustavo Vilares de Souza",
  "DS CPX": "Andre Luis Silveira Pinheiro",
  "DS SRO": "Felippe Campos Vieira da Silva",
  "DS STL": "Eduardo Mendes Rocha",
  "DS GRT": "Nelson de Siqueira",
  "DS VRE": "Eduardo Mendes Rocha",
  "DS WSC": "Leonardo Oliveira da Silva Bezerra",
  "DS ARO": "Alex Gomes da Silva Cunha",
  "DS MAU": "Dennis Pereira dos Santos",
  "DS ADL": "Alex Gomes da Silva Cunha",
  "DS ARU": "Jose Lucas de Freitas Carvalho",
  "DROP VLM 5": "",
  "DS JAL": "",
  "DS GRUI": "Daniel Da Silva Coutinho",
  "DS MRP": "Valber Da Silva Santos",
  "DS VTT": "Felippe Campos Vieira da Silva",
  "DS SRP": "Jose Lucas de Freitas Carvalho",
  "DS IIG": "Willian Gabriel Guedes de Brito Magalhaes",
  "DS SVL": "Eduardo Mendes Rocha",
  "DS LBD": "Daniel Da Silva Coutinho",
  "DS MAT": "Willian Gabriel Guedes de Brito Magalhaes",
  "DS RST": "Daniel Rubio Tavares",
  "DS IVV": "Renan Burger da Silva",
  "Drop MOC 4": "",
  "DS BLV": "Daniel Da Silva Coutinho",
  "DS JRF": "Jefferson Silva Trevizan",
  "DS CPB": "Bruno Souza Da Silva",
  "DS GHO": "Eduardo Mendes Rocha",
  "DS MGZ": "Cassio Cesar Ferreira",
  "DC-DF2": "",
  "DS CDR": "Leonardo Oliveira da Silva Bezerra",
  "DS IDT": "Valber Da Silva Santos",
  "DS FDL": "",
  "DS BRT": "Jose Lucas de Freitas Carvalho",
  "DS MTS": "Eduardo Mendes Rocha",
  "DS RRA": "Renan Burger da Silva",
  "DS LIM": "Gustavo Vilares de Souza",
  "DS SJO": "Alex Gomes da Silva Cunha",
  "DS CTT": "Nelson de Siqueira",
  "DS SCM": "Alex Gomes da Silva Cunha",
  "DS ARJ": "Cassio Cesar Ferreira",
  "DS GRS": "José Henrique",
  "DS MSO": "Jose Lucas de Freitas Carvalho",
  "DS CBV": "Valber Da Silva Santos",
  "DS CSA": "Carlos Augusto Oliveira Teixeira",
  "DS LSV": "Daniel Rubio Tavares",
  "DS GTS": "Dennis Pereira dos Santos",
  "DS PSS": "Willian Gabriel Guedes de Brito Magalhaes",
  "DS PRJ": "José Henrique",
  "DS DDE": "Daniel Rubio Tavares",
  "DS MTL": "Willian Gabriel Guedes de Brito Magalhaes",
  "DS GTT": "",
  "DS JVC": "Eduardo Mendes Rocha",
  "RDC-SP4": "",
  "DS MBI": "Daniel Da Silva Coutinho",
  "DS CZR": "Nelson de Siqueira",
  "DS FRZ": "Cassio Cesar Ferreira",
  "DS IVA": "Valber Da Silva Santos",
  "DS ADD": "Jose Lucas de Freitas Carvalho",
  "DS GOS": "Eduardo Mendes Rocha",
  "DS BIN": "",
  "DS BAT": "Renan Burger da Silva",
  "DS STD": "Dennis Pereira dos Santos",
  "DS EAR": "Jefferson Silva Trevizan",
  "DS CBL": "Carlos Augusto Oliveira Teixeira",
  "DS JDI": "Valber Da Silva Santos",
  "DS AET": "Dennis Pereira dos Santos",
  "DS CUI": "Bruno Souza Da Silva",
  "DS JBC": "Willian Gabriel Guedes de Brito Magalhaes",
  "RDC-PR1": "",
  "Drop SOR 3": "",
  "DS LZP": "",
  "DS IQQ": "Cassio Cesar Ferreira",
  "Drop MAU 5": "",
  "DS ITC": "Jefferson Silva Trevizan",
  "DS SDS": "Alex Gomes da Silva Cunha",
  "DS CBO": "",
  "DS PQP": "Jefferson Silva Trevizan",
  "DS API": "José Henrique",
  "RDC-SP1": "",
  "DS TPR": "Alex Gomes da Silva Cunha",
  "DS JNI": "",
  "DS SRG": "Alex Gomes da Silva Cunha",
  "DS BBD": "Renan Burger da Silva",
  "DS GNZ": "Cassio Cesar Ferreira",
  "DS CPC": "Bruno Souza Da Silva",
  "TP IMN": "",
  "Drop MOC 3": "",
  "DS ORL": "Renan Burger da Silva",
  "DS RIBI": "",
  "DS BCC": "Leonardo Oliveira da Silva Bezerra",
  "DS FVC": "Dennis Pereira dos Santos",
  "DS CUB": "",
  "DS HOT": "Andre Luis Silveira Pinheiro",
  "RDC-MG3": "",
  "DS IGP": "Daniel Rubio Tavares",
  "DS OCO": "Jefferson Silva Trevizan",
  "DS CPT": "",
  "DS SCR": "Alex Gomes da Silva Cunha",
  "DS PAR": "Carlos Augusto Oliveira Teixeira",
  "Drop SOR 9": "",
  "DS GAU": "Carlos Augusto Oliveira Teixeira",
  "CDC-GU": "",
  "DC-MG2": "",
  "DS PSC": "Daniel Da Silva Coutinho",
  "DS VOT": "Jose Lucas de Freitas Carvalho",
  "RDC-GO2": "",
  "DS AMR": "Andre Luis Silveira Pinheiro",
  "DS AAR": "Gustavo Vilares de Souza",
  "DS JDA": "Alex Dantas Marçal",
  "DS SMO": "Andre Luis Silveira Pinheiro",
  "DS JPL": "Jefferson Silva Trevizan",
  "DC-MT2": "",
  "DS PGD": "Daniel Rubio Tavares",
  "DS TBA": "Valber Da Silva Santos",
  "DS RIT": "",
  "DS JDS": "Leonardo Oliveira da Silva Bezerra",
  "Drop VII 4": "",
  "TP AUR": "",
  "DC-PE2": "",
  "DS VIT": "",
  "Drop VIL 2": "",
  "DS RPT": "Renan Burger da Silva",
  "Drop STP 2": "",
  "DS FM GAR": "",
  "RDC-PR4": "",
  "Drop OSA 15": "",
  "DS ILS": "Jose Lucas de Freitas Carvalho",
  "DS CUT": "",
  "DS LNS": "Jose Lucas de Freitas Carvalho",
  "DS SSR": "",
  "RDC-SP5": "",
  "DS PNP": "",
  "TP GAR": "",
  "DS JANI": "Leonardo Oliveira da Silva Bezerra",
  "RDC-RS2": "",
  "DS SDI": "",
  "DS CUR": "",
  "Drop PER": "",
  "DC-MS1": "",
  "Drop RDJ 12": "",
  "Drop GRU 17": "",
  "DS QHG": "",
  "DS LDA": "",
  "DS FM WCL": "",
  "TP SPS": "",
  "TP IMG": "",
  "TP BAR": "",
  "Drop GRU 11": "",
  "DS MUR": "",
  "DC-ES2": "",
  "DS POO": "",
  "DS ANJ": "",
  "DS OIN": "",
  "DS PSA": "",
  "DS BSX": "",
  "DS ACM": "Daniel Da Silva Coutinho",
  "DS ALP": "",
  "TP SRP 2": "",
  "TP NVS": "",
  "DS FM NOR": "",
  "RDC-BA1": "",
  "DC-BA3": "",
  "DROP VNM 2": "",
  "DS PS": "",
  "DS XAP": "",
  "RDC-SC1": "",
  "Drop COT 9": "",
  "TP TAU": "",
  "DS CRC": "",
  "DS GUP": "",
  "DS TCS": "",
  "DS COD": "",
  "DS FM PAR": "",
  "DS EXM": "",
  "DS PDR": "Alex Gomes da Silva Cunha",
};

let rawRows = [];
let filteredRows = [];
let charts = {};
let selectedBases = new Set();
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
function normalizeStatus(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLocaleLowerCase("pt-BR");
}
const isDelivered = r => normalizeStatus(r.status) === "entregue";
const isRoute = r => normalizeStatus(r.status).includes("rota de entrega");
const pctNum = (v,t) => t ? (v/t*100) : 0;
const pct = (v,t) => `${pctNum(v,t).toFixed(2).replace(".",",")}%`;
const supervisorFor = base => (base && BASE_SUPERVISORS[base]) ? BASE_SUPERVISORS[base] : "Não definido";
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
  const bases = uniqueSorted(rawRows,"base");
  const supervisors = [...new Set(
    bases.map(base => supervisorFor(base)).filter(name => name && name !== "Não definido")
  )].sort((a,b)=>a.localeCompare(b,"pt-BR"));

  fillSelect("filterSupervisor", supervisors, "Todos os supervisores");
  fillSelect("filterDsp", uniqueSorted(rawRows,"dsp"), "Todos os DSPs");
  fillSelect("filterDriver", uniqueSorted(rawRows,"driver"), "Todos os motoristas");
  fillSelect("filterStatus", uniqueSorted(rawRows,"status"), "Todos os status");

  fillSelect("printBaseSelect", bases, "Selecione uma base");
  fillSelect("driverBaseSelect", bases, "Selecione uma base");

  selectedBases = new Set(bases);
  renderBaseMultiSelect(bases);
}

function basesForSupervisor(supervisor) {
  const allBases = uniqueSorted(rawRows, "base");
  if (!supervisor) return allBases;
  return allBases.filter(base => supervisorFor(base) === supervisor);
}

function renderBaseMultiSelect(availableBases = null) {
  const supervisor = $("filterSupervisor")?.value || "";
  const bases = availableBases || basesForSupervisor(supervisor);
  const list = $("baseCheckboxList");
  if (!list) return;

  // Remove bases no longer available under current supervisor.
  selectedBases = new Set([...selectedBases].filter(base => bases.includes(base)));

  list.innerHTML = bases.map(base => `
    <label class="base-check">
      <input type="checkbox" value="${escapeHtml(base)}" ${selectedBases.has(base) ? "checked" : ""}>
      <span>${escapeHtml(base)}</span>
      <span class="supervisor-badge">${escapeHtml(supervisorFor(base))}</span>
    </label>
  `).join("");

  list.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    cb.addEventListener("change", () => {
      if (cb.checked) selectedBases.add(cb.value);
      else selectedBases.delete(cb.value);
      updateBaseMultiLabel(bases);
      applyFilters();
    });
  });

  updateBaseMultiLabel(bases);
}

function updateBaseMultiLabel(availableBases = null) {
  const supervisor = $("filterSupervisor")?.value || "";
  const bases = availableBases || basesForSupervisor(supervisor);
  const count = [...selectedBases].filter(base => bases.includes(base)).length;
  const label = $("baseMultiLabel");
  if (!label) return;

  if (!bases.length) {
    label.textContent = "Nenhuma base";
  } else if (count === 0) {
    label.textContent = "Nenhuma base selecionada";
  } else if (count === bases.length) {
    label.textContent = supervisor ? `Todas (${count})` : `Todas as bases (${count})`;
  } else if (count === 1) {
    label.textContent = [...selectedBases].find(base => bases.includes(base)) || "1 base";
  } else {
    label.textContent = `${count} bases selecionadas`;
  }
}

function applyFilters() {
  const f = {
    supervisor: $("filterSupervisor")?.value || "",
    dsp: $("filterDsp").value,
    driver: $("filterDriver").value,
    status: $("filterStatus").value
  };

  filteredRows = rawRows.filter(r =>
    (!f.supervisor || supervisorFor(r.base) === f.supervisor) &&
    (selectedBases.size === 0 ? false : selectedBases.has(r.base)) &&
    (!f.dsp || r.dsp === f.dsp) &&
    (!f.driver || r.driver === f.driver) &&
    (!f.status || r.status === f.status)
  );

  $("supervisorName").textContent = f.supervisor || "Regional SP";
  renderDashboard();
}
function destroyChart(name){ if(charts[name]){charts[name].destroy();delete charts[name];} }

function renderKpis() {
  const total = filteredRows.length;
  const delivered = filteredRows.filter(isDelivered).length;
  const route = filteredRows.filter(isRoute).length;
  const notDelivered = Math.max(0, total - delivered);
  const performance = pctNum(delivered, total);

  $("kpiTotal").textContent = total.toLocaleString("pt-BR");
  $("kpiDelivered").textContent = delivered.toLocaleString("pt-BR");
  $("kpiRoute").textContent = route.toLocaleString("pt-BR");
  $("kpiPending").textContent = notDelivered.toLocaleString("pt-BR");

  $("kpiDeliveredPct").textContent = pct(delivered, total);
  $("kpiRoutePct").textContent = pct(route, total);
  $("kpiPendingPct").textContent = pct(notDelivered, total);
  $("kpiPerformance").textContent = `${performance.toFixed(2).replace(".", ",")}%`;

  const card = $("performanceCard");
  card.classList.remove("performance-red","performance-yellow","performance-green");

  if (performance < 80) {
    card.classList.add("performance-red");
  } else if (performance < 93) {
    card.classList.add("performance-yellow");
  } else {
    card.classList.add("performance-green");
  }
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
["filterDsp","filterDriver","filterStatus"].forEach(id => {
  $(id).addEventListener("change", applyFilters);
});

$("filterSupervisor").addEventListener("change", () => {
  const supervisor = $("filterSupervisor").value;
  const bases = basesForSupervisor(supervisor);

  // Ao escolher supervisor, todas as bases dele vêm selecionadas automaticamente.
  selectedBases = new Set(bases);
  renderBaseMultiSelect(bases);
  $("supervisorName").textContent = supervisor || "Regional SP";
  applyFilters();
});

$("baseMultiToggle").addEventListener("click", (e) => {
  e.stopPropagation();
  $("baseMultiSelect").classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!$("baseMultiSelect").contains(e.target)) {
    $("baseMultiSelect").classList.remove("open");
  }
});

$("selectAllBases").addEventListener("click", () => {
  const bases = basesForSupervisor($("filterSupervisor").value);
  selectedBases = new Set(bases);
  renderBaseMultiSelect(bases);
  applyFilters();
});

$("clearAllBases").addEventListener("click", () => {
  selectedBases.clear();
  renderBaseMultiSelect(basesForSupervisor($("filterSupervisor").value));
  applyFilters();
});

$("clearFilters").addEventListener("click", () => {
  $("filterSupervisor").value = "";
  ["filterDsp","filterDriver","filterStatus"].forEach(id => $(id).value = "");
  const bases = uniqueSorted(rawRows,"base");
  selectedBases = new Set(bases);
  renderBaseMultiSelect(bases);
  $("supervisorName").textContent = "Regional SP";
  applyFilters();
});applyFilters();});
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
