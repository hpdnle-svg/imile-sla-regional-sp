/* Sincronização opcional. As métricas continuam sendo calculadas pelo app.js original. */
(() => {
 const el=id=>document.getElementById(id);
 const config=window.IMILE_CLOUD||{};
 let client=null,session=null,busy=false,dirty=false,viewingHistory=false,lastFile='Relatório Excel',shownId=null;
 const status=text=>{el('cloudStatus').textContent=text;};
 const enabled=()=>Boolean(client&&session);
 function controls(){
  el('cloudLogin').hidden=Boolean(session);
  el('cloudConnected').hidden=!session;
  ['cloudSave','cloudRefresh','cloudHistory'].forEach(id=>el(id).disabled=busy||!enabled());
  el('cloudSave').disabled ||= !rawRows.length;
 }
 async function action(fn){if(busy)return;busy=true;controls();try{await fn();}catch(e){status('Não foi possível sincronizar: '+e.message);}finally{busy=false;controls();}}
 async function history(){
  const previous=el('cloudHistory').value;
  const {data,error}=await client.from('imile_reports').select('id,filename,created_at').order('created_at',{ascending:false}).limit(50);
  if(error)throw error;
  el('cloudHistory').replaceChildren(new Option('Histórico • últimos 50 relatórios',''));
  for(const row of data)el('cloudHistory').add(new Option(new Date(row.created_at).toLocaleString('pt-BR')+' • '+row.filename,row.id));
  el('cloudHistory').value=previous;
  return data;
 }
 function revive(rows){
  // Excel pode fornecer objetos Date. Reconstitui-os antes das mesmas fórmulas.
  return rows.map(row=>{
   const copy={...row};
   for(const key of ['deliveryTime','createdTime','lastReadTime'])if(typeof copy[key]==='string'&&/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d/.test(copy[key]))copy[key]=new Date(copy[key]);
   return copy;
  });
 }
 async function load(id){
  const {data,error}=await client.from('imile_reports').select('*').eq('id',id).single();if(error)throw error;
  if(!Array.isArray(data.payload))throw new Error('Formato de relatório inválido.');
  rawRows=revive(data.payload);filteredRows=rawRows;selectedBases=new Set();
  ['filterSupervisor','filterDsp','filterDriver','filterStatus'].forEach(id=>el(id).value='');
  populateFilters();applyFilters();
  el('lastUpdate').textContent=new Date(data.created_at).toLocaleString('pt-BR');
  lastFile=data.filename;shownId=data.id;dirty=false;el('cloudHistory').value=id;
  status('Relatório online carregado • '+new Date(data.created_at).toLocaleString('pt-BR'));
 }
 async function latest(automatic=false){
  const list=await history();if(!list.length){status('Conectado. Importe um Excel no computador para sincronizar.');return;}
  if(automatic&&(dirty||list[0].id===shownId))return;
  await load(list[0].id);
 }
 async function save(){
  if(!enabled()||!rawRows.length)return;
  status('Enviando relatório ao banco…');
  const {data,error}=await client.from('imile_reports').insert({filename:lastFile,payload:rawRows}).select('id,created_at').single();
  if(error)throw error;shownId=data.id;dirty=false;await history();el('cloudHistory').value=data.id;
  status('Sincronizado • disponível no celular com a mesma conta.');
 }
 el('cloudLogin').addEventListener('submit',e=>{e.preventDefault();action(async()=>{
  if(!client)throw new Error('Configure cloud-config.js e execute o SQL de instalação.');
  const {data,error}=await client.auth.signInWithPassword({email:el('cloudEmail').value.trim(),password:el('cloudPassword').value});
  el('cloudPassword').value='';if(error)throw error;session=data.session;
  if(dirty&&rawRows.length){await history();status('Conectado. Use Salvar relatório online para enviar o Excel importado.');}
  else await latest();
 });});
 el('cloudLogout').addEventListener('click',()=>action(async()=>{await client.auth.signOut();session=null;shownId=null;el('cloudHistory').replaceChildren();status('Desconectado. Os dados da tela permanecem locais.');}));
 el('cloudForgotPassword').addEventListener('click',()=>action(async()=>{
  if(!client)throw new Error('Banco indisponível.');
  const email=el('cloudEmail').value.trim();
  if(!email||!el('cloudEmail').checkValidity()){el('cloudEmail').reportValidity();throw new Error('Informe seu e-mail para recuperar a senha.');}
  const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:config.recoveryUrl});
  if(error)throw error;
  status('Se este e-mail estiver cadastrado, você receberá um link para criar uma nova senha. Confira também o spam.');
 }));
 el('cloudSave').addEventListener('click',()=>action(save));
 el('cloudRefresh').addEventListener('click',()=>action(()=>latest()));
 el('cloudHistory').addEventListener('change',e=>{const id=e.target.value;if(id)action(()=>load(id));});
 document.addEventListener('imile:imported',e=>{
  lastFile=e.detail.filename;dirty=true;controls();
  if(enabled())action(save);else status('Relatório local. Entre na conta para salvar e acessar no celular.');
 });
 if(config.url&&config.publicKey&&window.supabase){
  try{client=window.supabase.createClient(config.url,config.publicKey);
   client.auth.onAuthStateChange((_event,current)=>{session=current;controls();});
   action(async()=>{const {data,error}=await client.auth.getSession();if(error)throw error;session=data.session;if(session)await latest();else status('Entre com a mesma conta no computador e no celular.');});
  }catch(e){status('Configuração inválida: '+e.message);}
 }else status('Modo local • sincronização aguardando configuração do banco.');
 controls();
 // Atualiza o celular a cada 30 s, sem substituir um Excel local ainda não salvo.
 setInterval(()=>{if(enabled()&&!busy&&!dirty&&!document.hidden&&!viewingHistory)action(()=>latest(true));},30000);
 // Ao selecionar um relatório antigo, suspenda a atualização até "Abrir mais recente".
 el('cloudHistory').addEventListener('change',()=>{viewingHistory=true;});
 el('cloudRefresh').addEventListener('click',()=>{viewingHistory=false;});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&enabled()&&!busy&&!dirty&&!viewingHistory)action(()=>latest(true));});
})();
