/* FIFO usa exclusivamente a coluna de entrada escolhida no relatório original. */
function fifoDate(value){
 if(value instanceof Date)return isNaN(value)?null:value;
 if(typeof value==='number'){const p=XLSX.SSF.parse_date_code(value);return p?new Date(p.y,p.m-1,p.d,p.H,p.M,p.S):null;}
 const s=String(value??'').trim();if(!s)return null;
 const br=s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
 if(br){if(+(br[4]||0)>23||+(br[5]||0)>59||+(br[6]||0)>59)return null;const d=new Date(+br[3],+br[2]-1,+br[1],+(br[4]||0),+(br[5]||0),+(br[6]||0));return d.getFullYear()===+br[3]&&d.getMonth()===+br[2]-1&&d.getDate()===+br[1]?d:null;}
 const iso=s.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(iso){const d=new Date(+iso[1],+iso[2]-1,+iso[3]);return d.getFullYear()===+iso[1]&&d.getMonth()===+iso[2]-1&&d.getDate()===+iso[3]?d:null;}
 if(!/^\d{4}-\d{2}-\d{2}(?:[ T].*)?$/.test(s))return null;
 const d=new Date(s);return isNaN(d)?null:d;
}
function fifoIsPriority(date,now){return Boolean(date&&date<=now&&(now-date)>72*3600000);}
function fifoDuration(date,now){
 const totalHours=Math.max(0,Math.floor((now-date)/3600000));
 const days=Math.floor(totalHours/24),hours=totalHours%24;
 return `${days} ${days===1?'dia':'dias'} e ${String(hours).padStart(2,'0')} ${hours===1?'hora':'horas'}`;
}
function renderFIFO(base,driver=''){
 const select=document.getElementById('fifoDateColumn');
 const headers=[...new Set(rawRows.flatMap(r=>Object.keys(r.original||{})))];
 const previous=select.value;
 if(select.dataset.headers!==JSON.stringify(headers)){
  select.replaceChildren(new Option('Selecione a coluna de entrada na base',''));
  headers.forEach(h=>select.add(new Option(h,h)));select.dataset.headers=JSON.stringify(headers);
  const normalizeHeader=h=>h.normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/\s+/g,' ');
  const receiptAliases=['recebimento','data de recebimento','data do recebimento','horario de recebimento','hora de recebimento'];
  const receipt=headers.find(h=>receiptAliases.includes(normalizeHeader(h)));
  const aliases=['data de entrada na base','horario de entrada na base','data de recebimento na base','horario de recebimento na base','data de chegada na base'];
  select.value=receipt||(headers.includes(previous)?previous:(headers.find(h=>aliases.includes(normalizeHeader(h)))||''));
 }
 const column=select.value,now=new Date();
 const supervisor=document.getElementById('filterSupervisor').value;
 const scope=filteredRows.filter(r=>!isDelivered(r)&&(!base||r.base===base)&&(!driver||r.driver===driver)&&(!supervisor||supervisorFor(r.base)===supervisor));
 const dated=scope.map(r=>({r,date:fifoDate(r.original?.[column])}));
 const invalid=column?dated.filter(x=>!x.date||x.date>now).length:scope.length;
 const eligible=column?dated.filter(x=>fifoIsPriority(x.date,now)).sort((a,b)=>a.date-b.date||String(a.r.tracking).localeCompare(String(b.r.tracking))):[];
 document.getElementById('awbPrintTitle').textContent=base||'Todas as bases';
 document.getElementById('awbPrintSupervisor').textContent=supervisor|| (base?supervisorFor(base):'Regional SP');
 document.getElementById('awbPrintDriver').textContent=driver||'Todos';
 document.getElementById('awbPrintDate').textContent=now.toLocaleString('pt-BR');
 document.getElementById('awbPendingCount').textContent=eligible.length.toLocaleString('pt-BR');
 document.getElementById('awbDriverCount').textContent=new Set(eligible.map(x=>x.r.driver).filter(Boolean)).size;
 document.getElementById('fifoUnclassified').textContent=invalid.toLocaleString('pt-BR');
 document.getElementById('fifoOldest').textContent=eligible.length?fifoDuration(eligible[0].date,now):'—';
 document.getElementById('fifoDateNotice').textContent=column?`Entrada na base: ${column}. Corte: mais de 72 horas. ${invalid} pendências sem data válida ou com data futura ficaram fora da classificação.`:'Selecione a coluna de entrada na base. Não usamos criação do pedido nem última leitura automaticamente para inferir permanência.';
 const el=document.getElementById('awbPendingList');
 if(!column){el.innerHTML='<div class="empty-state">Para identificar os pedidos com mais de 3 dias, selecione acima a coluna que registra a entrada na base.</div>';return;}
 if(!eligible.length){el.innerHTML='<div class="empty-state">Nenhum pedido não entregue com entrada válida há mais de 72 horas neste filtro.</div>';return;}
 el.innerHTML=`<div class="table-wrap"><table class="data-table fifo-table"><thead><tr><th>Ordem FIFO</th><th>AWB</th><th>Base / DS</th><th>Entrada na base</th><th>Tempo na base</th><th>Status atual</th><th>Motorista</th><th>Prioridade</th></tr></thead><tbody>${eligible.map(({r,date},i)=>`<tr><td>${i+1}</td><td class="awb-code">${escapeHtml(r.tracking||'Sem AWB')}</td><td>${escapeHtml(r.base||'Não informada')}</td><td>${escapeHtml(date.toLocaleString('pt-BR'))}</td><td><strong>${fifoDuration(date,now)}</strong></td><td>${escapeHtml(r.status||'Não informado')}</td><td>${escapeHtml(r.driver||'Não informado')}</td><td><span class="fifo-priority">Entregar hoje</span></td></tr>`).join('')}</tbody></table></div>`;
}
document.getElementById('fifoDateColumn').addEventListener('change',()=>renderFIFO(document.getElementById('awbBaseSelect').value,document.getElementById('awbDriverSelect').value));
setInterval(()=>{if(document.getElementById('awbsPendingView').classList.contains('active'))renderFIFO(document.getElementById('awbBaseSelect').value,document.getElementById('awbDriverSelect').value);},60000);

