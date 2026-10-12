/* Regra única de cor para todos os percentuais apresentados no painel. */
function percentageTone(value){return value<85?'red':value<93?'orange':'green';}
function colorPercentages(){
 const colors={red:'#d51f3d',orange:'#a86600',green:'#008552'};
 document.querySelectorAll('main small, main strong, main td, main span').forEach(el=>{
  if(el.childElementCount)return;
  const text=el.textContent.trim();const match=text.match(/^(\d+(?:[.,]\d+)?)\s*%$/);
  if(match){const value=Number(match[1].replace(',','.'));el.style.setProperty('color',colors[percentageTone(value)],'important');el.dataset.percentageColor='true';}
  else if(el.dataset.percentageColor){el.style.removeProperty('color');delete el.dataset.percentageColor;}
 });
}
colorPercentages();
new MutationObserver(colorPercentages).observe(document.querySelector('main'),{subtree:true,childList:true,characterData:true});
