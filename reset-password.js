(() => {
 const el=id=>document.getElementById(id),status=text=>el('passwordStatus').textContent=text;
 const config=window.IMILE_CLOUD||{};
 if(!window.supabase||!config.url||!config.publicKey){status('Não foi possível acessar o banco. Volte ao painel e tente novamente.');return;}
 const client=window.supabase.createClient(config.url,config.publicKey);
 const show=session=>{el('passwordForm').hidden=!session;if(session)status('Informe sua nova senha, com pelo menos 8 caracteres.');};
 client.auth.onAuthStateChange((event,session)=>{if(event==='PASSWORD_RECOVERY'||event==='SIGNED_IN')show(session);});
 client.auth.getSession().then(({data,error})=>{
  if(error){status('Link inválido ou expirado. Solicite outro em Esqueci minha senha no painel.');return;}
  show(data.session);if(!data.session)status('Link inválido ou expirado. Solicite outro em Esqueci minha senha no painel.');
 }).catch(()=>status('Não foi possível verificar o link. Confira sua conexão e tente novamente.'));
 el('passwordForm').addEventListener('submit',async e=>{
  e.preventDefault();const password=el('newPassword').value;
  if(password!==el('confirmPassword').value){status('As senhas não coincidem. Confira os dois campos.');return;}
  el('updatePassword').disabled=true;
  try{const {error}=await client.auth.updateUser({password});if(error)throw error;
   el('newPassword').value='';el('confirmPassword').value='';el('passwordForm').hidden=true;
   const {error:logoutError}=await client.auth.signOut();
   status(logoutError?'Senha atualizada. Volte ao painel para continuar.':'Senha atualizada. Volte ao painel e entre com a nova senha.');
   history.replaceState(null,'',location.pathname);
  }catch(error){status('Não foi possível alterar a senha: '+error.message);}finally{el('updatePassword').disabled=false;}
 });
})();
