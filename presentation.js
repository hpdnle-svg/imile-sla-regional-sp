// Ícones vetoriais e rótulos de gráficos. Nenhuma transformação de dados.
(() => {
 const paths={
  package:'<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 5v9l9 5 9-5V8M12 13v9M7.5 5.5l9 5"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/>',
  alert:'<path d="m12 3 10 18H2L12 3Z"/><path d="M12 9v5m0 3v1"/>',
  chart:'<path d="M4 20V10m6 10V5m6 15v-8m5 8H2m0-17v17"/>',
  home:'<path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/>',
  rows:'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12M3 15h18"/>',
  driver:'<circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/>',
  awb:'<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7v5m3-5v5m3-5v5m3-5v5M8 16h8"/>'
 };
 const svg=key=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[key]}</svg>`;
 document.querySelectorAll('.kpi-card').forEach(card=>{
  const key=card.classList.contains('performance-card')?'chart':card.classList.contains('success')?'check':card.classList.contains('route')?'clock':card.classList.contains('warning')?'alert':'package';
  const icon=document.createElement('span');icon.className='metric-icon';icon.innerHTML=svg(key);icon.setAttribute('aria-hidden','true');card.prepend(icon);
 });
 const keys={dashboard:'home',baseprint:'rows',driversprint:'driver',awbspending:'awb'};
 document.querySelectorAll('.view-tab').forEach(tab=>tab.insertAdjacentHTML('afterbegin',svg(keys[tab.dataset.view])));
 Chart.register({id:'imileValueLabels',afterDatasetsDraw(chart){
  if(chart.canvas.id!=='chartBasePerformance')return;
  const ctx=chart.ctx;ctx.save();ctx.font='600 11px "Segoe UI",sans-serif';ctx.fillStyle='#153a70';ctx.textAlign='center';
  chart.data.datasets.forEach((dataset,index)=>{
   if(!chart.isDatasetVisible(index))return;
   chart.getDatasetMeta(index).data.forEach((bar,i)=>{const value=dataset.data[i];if(value>0&&bar.width>=20)ctx.fillText(value.toLocaleString('pt-BR'),bar.x,Math.max(chart.chartArea.top+12,bar.y-7));});
  });ctx.restore();
 }});
})();
